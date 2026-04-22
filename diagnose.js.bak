const fs = require('fs');
const path = require('path');

// data.js 파일 읽기 (임시로 변수 추출)
const dataContent = fs.readFileSync('./data.js', 'utf8');
const idRegex = /id: \"(.*?)\"/g;
let match;
const dataIds = [];
while ((match = idRegex.exec(dataContent)) !== null) {
    dataIds.push(match[1]);
}

// 실제 폴더 목록 읽기
const lecturePath = './assets/lectures';
const folders = fs.readdirSync(lecturePath).filter(f => fs.statSync(path.join(lecturePath, f)).isDirectory());

console.log(`Total IDs in data.js: ${dataIds.length}`);
console.log(`Total folders on disk: ${folders.length}`);

const missing = dataIds.filter(id => !folders.includes(id));
console.log('\n❌ Missing folders (ID in data.js but not on disk):');
console.log(missing);

const extra = folders.filter(f => !dataIds.includes(f));
console.log('\n⚠️ Extra folders (On disk but not in data.js):');
console.log(extra);
