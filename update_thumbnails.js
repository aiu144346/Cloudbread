const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const re = /{ id: "(.*?)",(.*?)img: "(.*?)",(.*?)totalSlides: (.*?)\s*}/g;

dataContent = dataContent.replace(re, (match, id, beforeImg, oldImg, afterImg, totalSlides) => {
    let newImg = oldImg;
    if (parseInt(totalSlides) > 0) {
        newImg = `assets/lectures/${id}/slide1.png`;
    }
    return `{ id: "${id}",${beforeImg}img: "${newImg}",${afterImg}totalSlides: ${totalSlides} }`;
});

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log('Updated data.js with real thumbnails.');
