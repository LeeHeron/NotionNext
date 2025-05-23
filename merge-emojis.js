const fs = require('fs');
const path = require('path');

// 读取 JSON 文件辅助函数
function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error(`Error parsing JSON from ${filePath}:`, e);
    return {};
  }
}

// 合并两个数据对象
function mergeData(baseData, newData) {
  for (const id in newData) {
    if (!baseData[id]) baseData[id] = {};
    for (const emoji in newData[id]) {
      baseData[id][emoji] = (baseData[id][emoji] || 0) + newData[id][emoji];
    }
  }
  return baseData;
}

function main() {
  const emojisPath = path.resolve(__dirname, 'data', 'emojis.json');
  const pendingPath = path.resolve(__dirname, 'pending-emojis.json'); // 这是管理页面导出的文件

  const baseData = readJSON(emojisPath);
  const newData = readJSON(pendingPath);

  const merged = mergeData(baseData, newData);

  fs.writeFileSync(emojisPath, JSON.stringify(merged, null, 2), 'utf-8');

  // 也可以选择删除或重命名 pending 文件，避免重复合并
  // fs.unlinkSync(pendingPath);

  console.log('数据合并完成，写入到 data/emojis.json');
}

main();
