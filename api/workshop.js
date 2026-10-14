const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const workshopPath = path.join(process.cwd(), 'workshop_submissions.json');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    function getSubmissions() {
        try {
            if (fs.existsSync(workshopPath)) {
                return JSON.parse(fs.readFileSync(workshopPath, 'utf8'));
            }
        } catch (e) {
            console.error("Error reading workshop submissions:", e);
        }
        return [];
    }

    if (req.method === 'GET') {
        const submissions = getSubmissions();
        return res.status(200).json(submissions);
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body || '{}');

                if (data.action === 'like') {
                    const submissions = getSubmissions();
                    const target = submissions.find(s => s.id === data.id);
                    if (target) {
                        target.likes = (target.likes || 0) + 1;
                        try { fs.writeFileSync(workshopPath, JSON.stringify(submissions, null, 2)); } catch(e) {}
                        return res.status(200).json({ success: true, likes: target.likes });
                    }
                    return res.status(404).send('Not found');
                }

                if (!data.projectTitle || !data.team) {
                    return res.status(400).send('Missing required fields');
                }

                const submissions = getSubmissions();
                const newSubmission = {
                    id: 'sub-' + (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)),
                    team: data.team,
                    projectTitle: data.projectTitle,
                    author: data.author || '신규 주무관',
                    problem: data.problem || '',
                    techSolution: data.techSolution || '',
                    adminSolution: data.adminSolution || '',
                    promptLog: data.promptLog || '',
                    expectedEffect: data.expectedEffect || '',
                    fileName: data.fileName || null,
                    fileData: data.fileData || null,
                    createdAt: new Date().toISOString(),
                    likes: 0
                };

                submissions.unshift(newSubmission);
                try { fs.writeFileSync(workshopPath, JSON.stringify(submissions, null, 2)); } catch(e) {}

                return res.status(200).json({ success: true, submission: newSubmission });
            } catch (err) {
                console.error("Workshop serverless error:", err);
                return res.status(500).send('Server Error');
            }
        });
    }
};
