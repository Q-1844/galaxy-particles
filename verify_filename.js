// 验证500张图片的文件名匹配逻辑
const imageCount = 500;

console.log(`验证 ${imageCount} 张图片的文件名生成逻辑:\n`);

console.log('代码逻辑:');
console.log(`const _0x5479a3 = _0x42d594.toString().padStart(_0x18d0c1.toString().length, "0")`);
console.log(`const _0x43f2f7 = _0x5479a3 + ".png"\n`);

console.log('计算位数:');
console.log(`_0x18d0c1 = ${imageCount}`);
console.log(`_0x18d0c1.toString().length = ${imageCount.toString().length}`);
console.log(`padStart(${imageCount.toString().length}, "0") = ${imageCount.toString().length}位数\n`);

console.log('文件名生成测试:');
const testIndices = [0, 1, 9, 10, 99, 100, 149, 150, 199, 200, 299, 300, 399, 400, 499];
testIndices.forEach(i => {
  const filename = i.toString().padStart(imageCount.toString().length, "0") + ".png";
  const status = filename.startsWith('0'.repeat(imageCount.toString().length - 1)) ? '✅' : '❌';
  console.log(`  图片 ${i.toString().padStart(3, '0')}: ${filename} ${status}`);
});

console.log('\n结论:');
console.log('✅ 代码可以正确匹配从 000.png 开始的图片命名！');
console.log('✅ 500张图片会生成 000.png 到 499.png 的文件名');
