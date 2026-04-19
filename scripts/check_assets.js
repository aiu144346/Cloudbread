const fs = require('fs');
const path = require('path');

/**
 * Lecture Asset Health Checker
 * Scans data.js and verifies local/remote assets.
 */

const baseDir = path.join(__dirname, '..');
const dataPath = path.join(baseDir, 'data.js');
const driveIndexPath = path.join(baseDir, 'drive_index.json');
const assetsDir = path.join(baseDir, 'assets', 'lectures');

console.log('--- Lecture Asset Health Check ---');

// 1. Load data.js
if (!fs.existsSync(dataPath)) {
    console.error('Error: data.js not found');
    process.exit(1);
}
const dataContent = fs.readFileSync(dataPath, 'utf8');
let lectureData;
try {
    // Treat as simple JS and extract lectureData
    const sandbox = {};
    eval(dataContent); // This defines lectureData in the global/local scope
    lectureData = global.lectureData || (typeof lectureData !== 'undefined' ? lectureData : null);
    
    // Fallback if eval in local scope didn't work as expected in Node
    if (!lectureData) {
        // Try a more aggressive approach for Node
        const script = new (require('vm').Script)(dataContent + '\nlectureData;');
        lectureData = script.runInThisContext();
    }
} catch (e) {
    console.error('Error parsing data.js:', e.message);
    process.exit(1);
}

// 2. Load drive_index.json
let driveIndex = {};
if (fs.existsSync(driveIndexPath)) {
    driveIndex = JSON.parse(fs.readFileSync(driveIndexPath, 'utf8'));
    console.log(`Loaded drive_index.json with ${Object.keys(driveIndex).length} entries.`);
} else {
    console.warn('Warning: drive_index.json not found. Remote asset check will be limited.');
}

const report = {
    totalLectures: 0,
    missingThumbnails: [],
    missingSlides: [],
    missingCommentary: [],
    missingDriveMapping: []
};

// 3. Scan each lecture
for (const year in lectureData) {
    lectureData[year].forEach(lecture => {
        report.totalLectures++;
        const id = lecture.id;
        const totalSlides = lecture.totalSlides || 0;
        const lectureDir = path.join(assetsDir, id);

        // Check Thumbnail
        const thumbPath = path.join(baseDir, lecture.img);
        if (!fs.existsSync(thumbPath)) {
            report.missingThumbnails.push({ id, path: lecture.img });
        }

        // Check Slides and Drive Mappings
        for (let i = 1; i <= totalSlides; i++) {
            const slideName = `slide${i}.png`;
            const localSlidePath = path.join(lectureDir, slideName);
            const driveKey = `${id}/${slideName}`;

            const existsLocally = fs.existsSync(localSlidePath);
            const existsInDrive = !!driveIndex[driveKey];

            if (!existsLocally) {
                report.missingSlides.push({ id, slide: slideName });
            }
            if (!existsInDrive) {
                report.missingDriveMapping.push({ id, slide: slideName });
            }
        }

        // Check Commentary
        const commPath = path.join(lectureDir, 'commentary.json');
        const commDriveKey = `${id}/commentary.json`;
        if (!fs.existsSync(commPath) && !driveIndex[commDriveKey]) {
            report.missingCommentary.push(id);
        }
    });
}

// 4. Summary Output
console.log(`\nSummary:`);
console.log(`- Total Lectures: ${report.totalLectures}`);
console.log(`- Missing Local Thumbnails: ${report.missingThumbnails.length}`);
console.log(`- Missing Local Slides: ${report.missingSlides.length}`);
console.log(`- Missing Drive Mappings: ${report.missingDriveMapping.length}`);
console.log(`- Missing Commentary: ${report.missingCommentary.length}`);

if (report.missingThumbnails.length > 0) {
    console.log('\n--- Missing Thumbnails ---');
    report.missingThumbnails.slice(0, 10).forEach(m => console.log(`[${m.id}] ${m.path}`));
    if (report.missingThumbnails.length > 10) console.log('...');
}

if (report.missingCommentary.length > 0) {
    console.log('\n--- Missing Commentary (Neither Local nor Drive) ---');
    report.missingCommentary.slice(0, 10).forEach(id => console.log(id));
    if (report.missingCommentary.length > 10) console.log('...');
}

console.log('\nRun "python convert_pptx.py" to generate missing local assets.');
console.log('Update the Google Drive Indexer to sync missing remote assets.');
