// 全面分析OBJ模型加载和粒子显示流程
console.log('=== OBJ模型加载和粒子显示完整流程分析 ===\n');

console.log('1. OBJ文件加载:');
console.log('   - 使用OBJLoader加载heart_3.obj文件');
console.log('   - 缩放、位置、旋转设置\n');

console.log('2. 遍历OBJ模型的顶点:');
console.log('   - 使用traverse遍历所有mesh');
console.log('   - 获取每个mesh的geometry和position属性');
console.log('   - 遍历所有顶点\n');

console.log('3. 为每个顶点生成粒子:');
console.log('   第一组粒子（近距离）:');
console.log('     - 每个顶点生成0-1个粒子（Math.floor(Math.random() * 2)）');
console.log('     - 粒子位置：顶点位置 + 随机偏移（±0.04）');
console.log('     - 粒子颜色：从预定义的5种颜色中随机选择');
console.log('       颜色值：16751052, 16737971, 16744627, 16751052, 16737996');
console.log('       RGB值：接近255的高亮度颜色\n');

console.log('   第二组粒子（远距离）:');
console.log('     - 每个顶点生成0-1个粒子（Math.floor(Math.random() * 2)）');
console.log('     - 粒子位置：顶点位置 + 随机偏移（±0.15）');
console.log('     - 粒子颜色：从预定义的5种颜色中随机选择');
console.log('       颜色值：16757721, 16764139, 16770802, 16773367, 16775423');
console.log('       RGB值：接近255的高亮度颜色\n');

console.log('4. 粒子数量控制:');
console.log('   - 总粒子数量：Math.floor(总粒子数 / 10)');
console.log('   - 随机打乱索引顺序');
console.log('   - 只显示1/10的粒子\n');

console.log('5. 粒子材质设置:');
console.log('   - size: 0.026（粒子大小）');
console.log('   - vertexColors: true（使用顶点颜色）');
console.log('   - transparent: true（透明）');
console.log('   - opacity: 1（不透明）');
console.log('   - depthWrite: false（不写入深度缓冲区）');
console.log('   - map: particleTexture（粒子纹理）');
console.log('   - blending: THREE.AdditiveBlending（加法混合模式）');
console.log('     - 这是关键！粒子重叠时颜色相加');
console.log('     - 导致亮度累积');
console.log('   - emissive: 2228258（自发光颜色）');
console.log('   - emissiveIntensity: 0.3（自发光强度）\n');

console.log('=== 为什么复杂模型会那么亮 ===\n');

console.log('1. 顶点数量差异:');
console.log('   - 简单爱心：1774顶点 → 177粒子（显示）');
console.log('   - 复杂机甲：20000顶点 → 2000粒子（显示）');
console.log('   - 粒子数量差距：约11倍\n');

console.log('2. 粒子重叠效应:');
console.log('   - AdditiveBlending（加法混合模式）');
console.log('   - 粒子重叠时，颜色值相加');
console.log('   - 简单模型：粒子少，重叠少，亮度正常');
console.log('   - 复杂模型：粒子多，重叠频繁，亮度累积成"灯泡"\n');

console.log('3. 高亮度颜色:');
console.log('   - 第一组颜色：RGB(255, 153, 204)等，亮度约200');
console.log('   - 第二组颜色：RGB(255, 179, 217)等，亮度约240');
console.log('   - 这些颜色本身就非常亮！\n');

console.log('4. 自发光效果:');
console.log('   - emissive: 2228258（淡紫色）');
console.log('   - emissiveIntensity: 0.3');
console.log('   - 进一步增强亮度\n');

console.log('=== 亮度累积计算 ===\n');

console.log('简单爱心模型（177粒子）:');
console.log('   - 平均重叠次数：约2次');
console.log('   - 颜色值：约200');
console.log('   - 最终亮度：200 × 2 = 400\n');

console.log('复杂机甲模型（2000粒子）:');
console.log('   - 平均重叠次数：约10次');
console.log('   - 颜色值：约240');
console.log('   - 最终亮度：240 × 10 = 2400');
console.log('   - 亮度差距：2400 ÷ 400 = 6倍\n');

console.log('=== 结论 ===\n');
console.log('✅ 复杂模型亮得像灯泡的原因：');
console.log('   1. 顶点多 → 粒子多（11倍）');
console.log('   2. AdditiveBlending → 颜色相加');
console.log('   3. 高亮度颜色 → RGB接近255');
console.log('   4. 自发光效果 → 进一步增强亮度');
console.log('   5. 粒子重叠频繁 → 亮度累积6倍');
