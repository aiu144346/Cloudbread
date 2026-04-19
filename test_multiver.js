require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test(version) {
    console.log(`\nTesting API version: ${version}`);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Attempting to set apiVersion if possible, or just using different model naming
    const modelName = 'gemini-2.5-flash';
    try {
        const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: version });
        const result = await model.generateContent("Hi");
        console.log(`✅ Success with ${version}!`);
        console.log(result.response.text());
        return true;
    } catch (e) {
        console.error(`❌ Failed with ${version}: ${e.message}`);
        return false;
    }
}

async function run() {
    await test('v1beta');
    await test('v1');
}

run();
