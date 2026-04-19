const fs = require('fs');

const driveIndexStr = fs.readFileSync('drive_index.json', 'utf8');
const driveIndex = JSON.parse(driveIndexStr);

// We want to extract lectureData from data.js
let dataJsContent = fs.readFileSync('data.js', 'utf8');

// A simple regex to find the IDs
const regex = /id:\s*"([^"]+)"/g;
let match;
let countTotal = 0;
let countMatch = 0;

console.log("--- Mismatch Report ---");
while ((match = regex.exec(dataJsContent)) !== null) {
    const lectureId = match[1];
    const testPath = `${lectureId}/slide1.png`;
    countTotal++;
    
    if (driveIndex[testPath]) {
        countMatch++;
    } else {
        console.log(`[Missing in Index] ${testPath}`);
    }
}

console.log(`Total checked: ${countTotal}`);
console.log(`Matches found: ${countMatch}`);
console.log(`Missing: ${countTotal - countMatch}`);
