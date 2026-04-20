const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'subscribers.json');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const { email } = JSON.parse(body);
                if (!email) return res.status(400).send('Invalid Email');
                
                let subscribers = [];
                if (fs.existsSync(dbPath)) {
                    subscribers = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
                }
                
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    fs.writeFileSync(dbPath, JSON.stringify(subscribers, null, 2));
                }
                return res.status(200).json({ success: true, message: 'Subscribed successfully' });
            } catch (e) {
                return res.status(500).send('Server Error');
            }
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
