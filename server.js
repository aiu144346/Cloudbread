const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';
const authClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const port = 3001;
const SESSIONS_FILE = path.join(__dirname, 'sessions.json');
const BOARD_FILE = path.join(__dirname, 'board.json');

// Helper to parse cookies
function parseCookies(request) {
    const list = {};
    const rc = request.headers.cookie;
    rc && rc.split(';').forEach(function(cookie) {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

// Helpers for reading/writing simple JSON DBs
function readJsonDb(dbPath, defaultObj) {
    try {
        if (fs.existsSync(dbPath)) {
            return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
    } catch(e) { console.error(`Error reading ${dbPath}`, e); }
    return defaultObj;
}

function writeJsonDb(dbPath, data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch(e) { console.error("Vercel readonly filesystem write ignored", e); }
}

const requestListener = async (req, res) => {
    const cleanUrl = req.url.split('?')[0];
    const decodedUrl = decodeURIComponent(cleanUrl).replace(/^\//, '');
    let filePath = path.join(__dirname, decodedUrl === '' ? 'index.html' : decodedUrl);

    // Dynamic API Routes
    
    // 1. Config API (Used by frontend to init Google Sign In)
    if (req.method === 'GET' && cleanUrl === '/api/config') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ googleClientId: GOOGLE_CLIENT_ID }));
    }

    // 2. Auth: Verify Google Credential
    if (req.method === 'POST' && cleanUrl === '/api/auth/google') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const { credential } = JSON.parse(body);
                const ticket = await authClient.verifyIdToken({
                    idToken: credential,
                    audience: GOOGLE_CLIENT_ID
                });
                const payload = ticket.getPayload();
                
                // Create a session
                const sessionId = crypto.randomBytes(32).toString('hex');
                const sessions = readJsonDb(SESSIONS_FILE, {});
                
                const user = {
                    email: payload.email,
                    name: payload.name,
                    picture: payload.picture,
                    googleId: payload.sub
                };
                
                sessions[sessionId] = {
                    user: user,
                    createdAt: Date.now()
                };
                writeJsonDb(SESSIONS_FILE, sessions);

                // Set Cookie (HttpOnly for security)
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
                });
                res.end(JSON.stringify({ success: true, user }));
            } catch (err) {
                console.error("Auth error:", err);
                res.writeHead(401); res.end('Unauthorized');
            }
        });
        return;
    }

    // 3. Auth: Check Current Session
    if (req.method === 'GET' && cleanUrl === '/api/auth/me') {
        const cookies = parseCookies(req);
        const sessions = readJsonDb(SESSIONS_FILE, {});
        const session = sessions[cookies.sessionId];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (session) {
            return res.end(JSON.stringify({ user: session.user }));
        } else {
            return res.end(JSON.stringify({ user: null }));
        }
    }

    // 4. Auth: Logout
    if (req.method === 'POST' && cleanUrl === '/api/auth/logout') {
        const cookies = parseCookies(req);
        if (cookies.sessionId) {
            const sessions = readJsonDb(SESSIONS_FILE, {});
            delete sessions[cookies.sessionId];
            writeJsonDb(SESSIONS_FILE, sessions);
        }
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': `sessionId=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
        });
        return res.end(JSON.stringify({ success: true }));
    }

    // 5. Board: Get Posts
    if (req.method === 'GET' && cleanUrl === '/api/board') {
        const posts = readJsonDb(BOARD_FILE, []);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(posts));
    }

    // 6. Board: Create Post
    if (req.method === 'POST' && cleanUrl === '/api/board') {
        const cookies = parseCookies(req);
        const sessions = readJsonDb(SESSIONS_FILE, {});
        const session = sessions[cookies.sessionId];

        if (!session) {
            res.writeHead(401);
            return res.end('Unauthorized');
        }

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const { title, content } = JSON.parse(body);
                if (!title || !content) {
                    res.writeHead(400); return res.end('Missing fields');
                }

                const posts = readJsonDb(BOARD_FILE, []);
                const newPost = {
                    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
                    title: title,
                    content: content,
                    authorEmail: session.user.email,
                    authorName: session.user.name,
                    authorPicture: session.user.picture,
                    createdAt: Date.now()
                };
                
                // Add to start of array
                posts.unshift(newPost);
                writeJsonDb(BOARD_FILE, posts);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, post: newPost }));
            } catch (err) {
                res.writeHead(500); res.end('Server Error');
            }
        });
        return;
    }

    // 7. Proxy API for Google Drive Images
    if (req.method === 'GET' && cleanUrl === '/api/proxy') {
        const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
        const driveId = urlParams.get('id');
        if (!driveId) {
            res.writeHead(400); return res.end('Missing id');
        }

        const targetUrl = `https://drive.google.com/uc?id=${driveId}`;
        try {
            const fetchRes = await fetch(targetUrl);
            if (!fetchRes.ok) {
                res.writeHead(fetchRes.status);
                return res.end('Proxy upstream error');
            }
            const arrayBuffer = await fetchRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            res.writeHead(fetchRes.status, {
                'Content-Type': fetchRes.headers.get('content-type') || 'application/octet-stream',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=86400'
            });
            res.end(buffer);
        } catch (err) {
            console.error('Proxy error:', err);
            res.writeHead(500); res.end('Proxy Error');
        }
        return;
    }

    // Existing Subscription API
    if (req.method === 'POST' && cleanUrl === '/subscribe') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const { email } = JSON.parse(body);
                if (!email) { res.writeHead(400); return res.end('Invalid Email'); }
                const dbPath = path.join(__dirname, 'subscribers.json');
                const subscribers = readJsonDb(dbPath, []);
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    writeJsonDb(dbPath, subscribers);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Subscribed successfully' }));
            } catch (e) { res.writeHead(500); res.end('Server Error'); }
        });
        return;
    }

    // Existing Stats API
    const statsPath = path.join(__dirname, 'stats.json');
    if (cleanUrl === '/api/stats') {
        if (req.method === 'GET') {
            try {
                const stats = fs.readFileSync(statsPath, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(stats);
            } catch (e) { res.writeHead(500); return res.end('Error reading stats'); }
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                try {
                    const { key, subKey } = JSON.parse(body);
                    const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
                    if (subKey) {
                        if (!stats[key]) stats[key] = {};
                        stats[key][subKey] = (stats[key][subKey] || 0) + 1;
                    } else {
                        stats[key] = (stats[key] || 0) + 1;
                    }
                    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, stats }));
                } catch (e) { res.writeHead(500); res.end('Error updating stats'); }
            });
            return;
        }
    }

    // Static File Serving
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.jpeg': contentType = 'image/jpeg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
        case '.json': contentType = 'application/json'; break;
        case '.pdf': contentType = 'application/pdf'; break;
        case '.pptx': contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'; break;
        case '.mp4': contentType = 'video/mp4'; break;
        case '.webm': contentType = 'video/webm'; break;
    }

    fs.readFile(filePath, (error, content) => {
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
};

// Vercel Serverless Function export
module.exports = requestListener;

// Local Development
if (require.main === module) {
    http.createServer(requestListener).listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}
