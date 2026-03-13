// 详细分析图片切换逻辑
console.log('=== 图片切换逻辑详细分析 ===\n');

console.log('关键参数:');
console.log('_0xa72680 = 24 (基础帧率)');
console.log('_0x369725 = x位置参数');
console.log('_0x3ecbbb = y位置参数');
console.log('_0x112be8.length = 实际加载的图片数量\n');

console.log('帧率计算:');
console.log('_0x394cb0 = 24 + x位置 * y位置 * 5');
console.log('间隔时间 = 1000 / _0x394cb0 毫秒\n');

console.log('偏移量计算:');
console.log('_0x14d92a = |x位置*10| + |y位置*10|');

console.log('索引计算:');
console.log('_0x1c27db = (_0x1c27db + 1) % 图片数量');
console.log('_0x5bfacd = (_0x1c27db + 偏移量) % 图片数量\n');

console.log('4个十字架的详细计算:');
console.log('第1个: x=0, y=0.95');
console.log('  帧率 = 24 + 0*0.95*5 = 24帧/秒');
console.log('  间隔 = 1000/24 = 41.67毫秒');
console.log('  偏移量 = |0*10| + |0.95*10| = 0 + 9 = 9');
console.log('  索引递增 = (当前+1) % 330');
console.log('  显示索引 = (当前+1+9) % 330\n');

console.log('第2个: x=-1, y=1.5');
console.log('  帧率 = 24 + (-1)*1.5*5 = 16.5帧/秒');
console.log('  间隔 = 1000/16.5 = 60.61毫秒');
console.log('  偏移量 = |-1*10| + |1.5*10| = 10 + 15 = 25');
console.log('  索引递增 = (当前+1) % 330');
console.log('  显示索引 = (当前+1+25) % 330\n');

console.log('第3个: x=1, y=1.5');
console.log('  帧率 = 24 + 1*1.5*5 = 31.5帧/秒');
console.log('  间隔 = 1000/31.5 = 31.75毫秒');
console.log('  偏移量 = |1*10| + |1.5*10| = 10 + 15 = 25');
console.log('  索引递增 = (当前+1) % 330');
console.log('  显示索引 = (当前+1+25) % 330\n');

console.log('第4个: x=0, y=1.8');
console.log('  帧率 = 24 + 0*1.8*5 = 24帧/秒');
console.log('  间隔 = 1000/24 = 41.67毫秒');
console.log('  偏移量 = |0*10| + |1.8*10| = 0 + 18 = 18');
console.log('  索引递增 = (当前+1) % 330');
console.log('  显示索引 = (当前+1+18) % 330\n');

console.log('=== 问题分析 ===\n');
console.log('1. 代码设置500张，实际加载330张');
console.log('2. 偏移量导致显示索引跳跃');
console.log('3. 11秒视频，30帧应该是330张');
console.log('4. 但实际显示感觉只有5秒');
console.log('5. 可能原因：偏移量导致某些图片被跳过');
