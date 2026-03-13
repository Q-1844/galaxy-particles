const fs = require('fs');
const path = require('path');

// 读取OBJ文件
const objPath = path.join(__dirname, 'heart_3.obj');
const content = fs.readFileSync(objPath, 'utf-8');

// 解析OBJ文件，统计顶点数量
let vertexCount = 0;
const lines = content.split('\n');

for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('v ')) {
        vertexCount++;
    }
}

console.log(`heart_3.obj 文件统计:`);
console.log(`顶点数量: ${vertexCount}`);
console.log(`预计生成的粒子数量: ${vertexCount * 1 * 0.1} (每个顶点平均生成1个粒子，然后取1/10)`);
console.log(`实际显示的粒子数量范围: ${Math.floor(vertexCount * 0.5 * 0.1)} - ${Math.floor(vertexCount * 2 * 0.1)}`);

console.log(`\n简单爱心 vs 复杂机甲的顶点数量对比:`);
console.log(`简单爱心: ${vertexCount} 个顶点`);
console.log(`复杂机甲: 可能 ${vertexCount * 10} - ${vertexCount * 100} 个顶点 (10-100倍差距)`);
console.log(`粒子数量差距: ${Math.floor(vertexCount * 10 * 0.1)} - ${Math.floor(vertexCount * 100 * 0.1)} 个粒子`);
