const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3002;

http.createServer((req, res) => {
    // URL 디코딩 및 앞부분의 '/' 제거 (윈도우 경로 호환성 정규화)
    const decodedUrl = decodeURIComponent(req.url).replace(/^\//, '');
    let filePath = path.join(__dirname, decodedUrl === '' ? 'index.html' : decodedUrl);

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
    }

    console.log('REQUEST:', req.url, '\nDECODED:', decodeURIComponent(req.url), '\nFILEPATH:', filePath); fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('File Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(port);

console.log(`Server running at http://localhost:${port}/`);
