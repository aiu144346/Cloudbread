require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro',
    'gemini-2.0-flash-exp',
    'gemini-pro',
    'gemini-1.0-pro'
];

async function test() {
    for (const modelName of models) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log("✅ SUCCESS");
            process.exit(0);
        } catch (e) {
            console.log(`❌ FAILED: ${e.message}`);
        }
    }
}

test();
