// 深入分析偏移量问题和图片显示逻辑
console.log('=== 深入分析偏移量问题 ===\n');

console.log('当前代码设置:');
console.log('const _0x18d0c1 = 330');
console.log('for (let _0x42d594 = 1; _0x42d594 <= _0x18d0c1; _0x42d594++)\n');

console.log('偏移量计算:');
console.log('_0x14d92a = Math.abs(Math.floor(_0x369725 * 10)) + Math.abs(Math.floor(_0x3ecbbb * 10))');

console.log('4个十字架的偏移量:');
console.log('第1个: x=0, y=0.95');
console.log('  偏移量 = |0*10| + |0.95*10| = 0 + 9 = 9');
console.log('第2个: x=-1, y=1.5');
console.log('  偏移量 = |-1*10| + |1.5*10| = 10 + 15 = 25');
console.log('第3个: x=1, y=1.5');
console.log('  偏移量 = |1*10| + |1.5*10| = 10 + 15 = 25');
console.log('第4个: x=0, y=1.8');
console.log('  偏移量 = |0*10| + |1.8*10| = 0 + 18 = 18\n');

console.log('问题分析:');
console.log('1. 第2个和第3个十字架偏移量相同（都是25）');
console.log('2. 这会导致两个十字架显示相同的图片序列');
console.log('3. 偏移量越大，跳跃越大，显示越不连贯');
console.log('4. 11秒视频，30帧，应该切换330次');
console.log('5. 但由于偏移量，实际显示的图片可能远少于330张\n');

console.log('blob URL错误原因:');
console.log('1. 图片加载过程中被取消');
console.log('2. 可能是页面刷新导致的');
console.log('3. 可能是内存不足导致的');
console.log('4. 4个十字架同时加载，可能超出浏览器限制\n');

console.log('建议解决方案:');
console.log('1. 减小偏移量，使图片显示更连贯');
console.log('2. 修改索引计算逻辑，避免重复显示');
console.log('3. 添加图片加载错误处理，避免blob URL被中止');
