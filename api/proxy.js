const fs = require('fs');
const path = require('path');

let driveIndexCache = null;

function loadDriveIndexSync() {
    if (driveIndexCache) return;
    try {
        const possiblePaths = [
            path.join(process.cwd(), 'drive_index.json'),
            path.join(__dirname, 'drive_index.json'),
            path.join(__dirname, '..', 'drive_index.json')
        ];
        let foundPath = null;
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                foundPath = p;
                break;
            }
        }
        if (foundPath) {
            driveIndexCache = JSON.parse(fs.readFileSync(foundPath, 'utf8'));
            console.log(`[Proxy] index loaded (${Object.keys(driveIndexCache).length} items)`);
        }
    } catch (e) {
        console.error("[Proxy] index error:", e);
    }
}

module.exports = async (req, res) => {
    loadDriveIndexSync();

    const url = new URL(req.url, `http://${req.headers.host}`);
    const assetPath = url.searchParams.get('path');
    let driveId = url.searchParams.get('id');

    if (assetPath && driveIndexCache) {
        driveId = driveIndexCache[assetPath] || 
                  driveIndexCache[assetPath.normalize('NFC')] || 
                  driveIndexCache[assetPath.normalize('NFD')];
    }

    if (!driveId) {
        return res.status(400).send('Missing or invalid id/path');
    }

    const isJson = assetPath && (assetPath.toLowerCase().endsWith('.json') || req.url.includes('commentary.json'));
    const targetUrl = isJson 
        ? `https://drive.google.com/uc?export=download&id=${driveId}`
        : `https://lh3.googleusercontent.com/d/${driveId}`;

    try {
        const fetchRes = await fetch(targetUrl);
        if (!fetchRes.ok) {
            return res.status(fetchRes.status).send(`Upstream error: ${fetchRes.status}`);
        }

        let contentType = fetchRes.headers.get('content-type') || 'application/octet-stream';
        if (contentType === 'application/octet-stream' || contentType === 'application/force-download') {
            if (assetPath && assetPath.toLowerCase().endsWith('.png')) contentType = 'image/png';
            else if (isJson) contentType = 'application/json';
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=86400');

        const buffer = await fetchRes.arrayBuffer();
        res.status(200).send(Buffer.from(buffer));
    } catch (err) {
        console.error('[Proxy] overall error:', err);
        res.status(500).send('Proxy Error');
    }
};
