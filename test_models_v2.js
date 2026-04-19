require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testV1() {
    console.log("Testing v1 API...");
    // The SDK might not expose apiVersion easily in all versions, 
    // but we can try to pass it if supported or just try other models.
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const modelsToCheck = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro'
    ];

    for (const modelName of modelsToCheck) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`✅ Success with ${modelName}`);
        } catch (e) {
            console.error(`❌ Failed with ${modelName}: ${e.message}`);
        }
    }
}

testV1();
