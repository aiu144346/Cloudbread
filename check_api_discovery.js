require('dotenv').config();
const axios = require('axios');

async function checkApi() {
    const key = process.env.GEMINI_API_KEY;
    console.log(`Checking API with key: ${key.substring(0, 10)}...`);
    
    // Test both v1beta and v1
    const versions = ['v1beta', 'v1'];

    for (const ver of versions) {
        const url = `https://generativelanguage.googleapis.com/${ver}/models?key=${key}`;
        console.log(`\nFetching: ${url}`);
        try {
            const response = await axios.get(url);
            console.log(`✅ Success! Found ${response.data.models ? response.data.models.length : 0} models.`);
            if (response.data.models) {
                response.data.models.forEach(m => {
                    const isGen = m.supportedGenerationMethods.includes('generateContent');
                    if (isGen && (m.name.includes('flash') || m.name.includes('pro'))) {
                         console.log(` - ${m.name}`);
                    }
                });
            }
        } catch (e) {
            console.error(`❌ Failed: ${e.message}`);
            if (e.response) {
                console.error(`   Status: ${e.response.status}`);
                console.error(`   Data:`, JSON.stringify(e.response.data));
            }
        }
    }
}

checkApi();
