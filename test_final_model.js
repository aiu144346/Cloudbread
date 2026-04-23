require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testFinal() {
    console.log("Testing gemini-2.5-flash...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent("What time is it?");
        console.log("✅ Success!");
        console.log(result.response.text());
    } catch (e) {
        console.error("❌ Failed:", e.message);
    }
}
testFinal();
