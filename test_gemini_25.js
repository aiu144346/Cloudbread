require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
    const modelName = 'gemini-2.5-flash';
    console.log(`Testing ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hi");
        console.log("✅ Success!");
        console.log(result.response.text());
    } catch (e) {
        console.error(`❌ Failed: ${e.message}`);
    }
}
test();
