const JSZip = require('./yasuojszip.min.js');
const fs = require('fs');

// 读取Main.zip文件
fs.readFile('./Main.zip', (err, data) => {
    if (err) {
        console.error('读取Main.zip失败:', err);
        return;
    }
    
    // 使用JSZip解析ZIP文件
    JSZip.loadAsync(data).then(zip => {
        console.log('Main.zip包含的文件:');
        
        // 遍历ZIP文件中的所有文件
        Object.keys(zip.files).forEach(filename => {
            console.log(`- ${filename}`);
        });
    }).catch(err => {
        console.error('解析Main.zip失败:', err);
    });
});