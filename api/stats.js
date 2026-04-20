const fs = require('fs');
const path = require('path');

const statsPath = path.join(process.cwd(), 'stats.json');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'GET') {
        try {
            const stats = fs.readFileSync(statsPath, 'utf8');
            return res.status(200).json(JSON.parse(stats));
        } catch (e) {
            return res.status(500).send('Error reading stats');
        }
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
                return res.status(200).json({ success: true, stats });
            } catch (e) {
                return res.status(500).send('Error updating stats');
            }
        });
    }
};
