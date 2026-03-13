from PIL import Image
import colorsys
import math
import zipfile
import os

# ==================== 【核心调参区】 ====================
TOTAL_FRAMES = 62
IMAGE_SIZE = 512
OUTPUT_ZIP = "Heart_Animation_Sequence.zip"

# 1. 基准外观（保持你想要的低亮度紫色）
BASE_HUE = 0.78           # 紫色基准：0.78
HUE_VARIATION = 0.04      # **色相变化幅度**：0.04的偏移会让颜色在“蓝紫”和“红紫”间微妙流动
BASE_SATURATION = 0.60    # 饱和度：适中
BASE_BRIGHTNESS = 0.25    # **亮度基准**：0.25是柔和的起点

# 2. 动态强度（关键！决定62帧内的变化幅度）
BRIGHTNESS_VARIATION = 0.30  # **亮度变化**：0.30意味着亮度会在0.175到0.325之间波动，变化明显
SIZE_VARIATION = 0.35        # **光晕大小变化**：0.35意味着核心区域会明显缩放
# ======================================================

print(f"生成 {TOTAL_FRAMES} 帧动态序列，用于4平面叠加动画...")
print(f"变化强度：亮度 {BRIGHTNESS_VARIATION}, 大小 {SIZE_VARIATION}")

os.makedirs("seq_frames", exist_ok=True)
center = IMAGE_SIZE // 2
base_radius = IMAGE_SIZE * 0.35  # 基础光晕半径

for frame in range(TOTAL_FRAMES):
    # 计算当前帧在循环中的相位 (0 到 2π)
    phase = frame / TOTAL_FRAMES * 2 * math.pi
    
    # **计算当前帧的动态属性**
    # 1. 亮度：主要变化，一个完整的呼吸周期
    brightness_factor = 0.5 + 0.5 * math.sin(phase)  # 映射到 0~1
    current_brightness = BASE_BRIGHTNESS * (1 - BRIGHTNESS_VARIATION + brightness_factor * BRIGHTNESS_VARIATION)
    
    # 2. 色相：次要变化，速度是亮度的一半，产生更丰富的叠加
    hue_offset = HUE_VARIATION * math.sin(phase * 0.5)  # 更慢的变化
    current_hue = (BASE_HUE + hue_offset) % 1.0
    
    # 3. 大小：辅助变化，与亮度略有不同步，增加复杂度
    size_factor = 0.5 + 0.5 * math.sin(phase * 1.2)  # 稍快的速度
    current_radius = base_radius * (1 - SIZE_VARIATION + size_factor * SIZE_VARIATION)
    
    # 创建新图像
    img = Image.new('RGBA', (IMAGE_SIZE, IMAGE_SIZE), (0, 0, 0, 0))
    
    # 生成平滑的径向渐变
    for y in range(IMAGE_SIZE):
        for x in range(IMAGE_SIZE):
            dx = x - center
            dy = y - center
            dist = math.sqrt(dx*dx + dy*dy)
            
            if dist <= current_radius:
                # 计算衰减：使用平滑的指数衰减曲线
                falloff = 1.0 - (dist / current_radius) ** 2
                falloff = max(0.0, falloff ** 0.8)  # 让衰减更平缓
                
                # 当前像素的最终亮度 = 基准亮度 × 衰减
                pixel_brightness = current_brightness * falloff
                
                # HSV 转 RGB
                r_float, g_float, b_float = colorsys.hsv_to_rgb(
                    current_hue, 
                    BASE_SATURATION, 
                    pixel_brightness
                )
                
                # 透明度：中心不透明，向边缘渐隐
                alpha = int(255 * (falloff ** 0.6))
                
                img.putpixel((x, y), (
                    int(r_float * 255),
                    int(g_float * 255),
                    int(b_float * 255),
                    alpha
                ))
    
    # 保存为 00.png, 01.png ... 61.png
    img.save(f"seq_frames/{frame:02d}.png", "PNG")

# 打包为ZIP
with zipfile.ZipFile(OUTPUT_ZIP, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for i in range(TOTAL_FRAMES):
        zipf.write(f"seq_frames/{i:02d}.png", arcname=f"{i:02d}.png")

print(f"✅ 动态序列生成完成！文件: {OUTPUT_ZIP}")
print("🔁 这是一个无缝循环的序列，第61帧会平滑过渡回第0帧。")
print("📤 请重命名为 'Main.zip' 并替换，然后清除浏览器缓存测试。")