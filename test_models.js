require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // There is no direct listModels in the official high-level JS SDK usually,
        // but we can try to run a simple generateContent with a fallback model to test connectivity.
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-1.5-flash!");
    } catch (e) {
        console.error("Failed with gemini-1.5-flash:", e.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-1.5-flash-latest!");
    } catch (e) {
        console.error("Failed with gemini-1.5-flash-latest:", e.message);
    }
}

listModels();
