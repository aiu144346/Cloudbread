const fs = require('fs');
const path = require('path');

// Read the data.js content
const dataPath = path.join(__dirname, 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Match all objects in the arrays
const re = /{ id: "(.*?)",([^}]*)}/g;

dataContent = dataContent.replace(re, (match, id, rest) => {
    let slideCount = 0;
    const folderPath = path.join(__dirname, 'assets', 'lectures', id);
    if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        slideCount = files.filter(f => f.startsWith('slide') && f.endsWith('.png')).length;
    }
    
    // Check if totalSlides already exists
    if (!match.includes('totalSlides:')) {
        return `{ id: "${id}",${rest.replace(/,\s*$/, '')}, totalSlides: ${slideCount} }`;
    }
    return match;
});

// For 강의안_Day_01_Part1, since it failed it has 0, but let's default to 0.
fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log('Updated data.js with actual slide counts.');
