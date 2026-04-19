require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testExplicitV1() {
    console.log("Testing with explicit apiVersion: 'v1'...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    try {
        // Passing apiVersion in the request options
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }, { apiVersion: 'v1' });
        const result = await model.generateContent("Hello");
        console.log("✅ Success with v1 API!");
        console.log("Response:", result.response.text());
    } catch (e) {
        console.error("❌ Failed with v1 API:", e.message);
    }
}

testExplicitV1();
