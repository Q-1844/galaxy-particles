// 分析代码中的粒子颜色值
const colors1 = [16751052, 16737971, 16744627, 16751052, 16737996];
const colors2 = [16757721, 16764139, 16770802, 16773367, 16775423];

console.log('第一组粒子颜色:');
colors1.forEach((color, index) => {
  const rgb = {
    r: (color >> 16) & 0xFF,
    g: (color >> 8) & 0xFF,
    b: color & 0xFF
  };
  const brightness = (rgb.r + rgb.g + rgb.b) / 3;
  console.log(`颜色${index + 1}: 0x${color.toString(16).toUpperCase()} = RGB(${rgb.r}, ${rgb.g}, ${rgb.b}), 亮度: ${brightness.toFixed(1)}`);
});

console.log('\n第二组粒子颜色:');
colors2.forEach((color, index) => {
  const rgb = {
    r: (color >> 16) & 0xFF,
    g: (color >> 8) & 0xFF,
    b: color & 0xFF
  };
  const brightness = (rgb.r + rgb.g + rgb.b) / 3;
  console.log(`颜色${index + 1}: 0x${color.toString(16).toUpperCase()} = RGB(${rgb.r}, ${rgb.g}, ${rgb.b}), 亮度: ${brightness.toFixed(1)}`);
});

console.log('\n结论:');
console.log('这些颜色都是高亮度的红色/橙色系，本身就非常亮！');
console.log('降低材质参数1000倍没用，因为颜色值本身就很亮！');
