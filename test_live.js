const https = require('https');

function testEndpoint(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    bodySize: data.length,
                    sample: data.substring(0, 200)
                });
            });
        }).on('error', reject);
    });
}

async function runTests() {
    console.log("Testing drive_index.json...");
    try {
        const indexRes = await testEndpoint('https://cloudbread.me/drive_index.json');
        console.log("Index Status:", indexRes.statusCode);
        console.log("Index Body Size:", indexRes.bodySize);
        console.log("Index Sample:", indexRes.sample);
    } catch(e) {
        console.error("Index fetch error:", e);
    }

    console.log("\nTesting Proxy with a known ID...");
    try {
        // ID for 10강_실무적용_기획서/slide1.png from earlier logs if possible, or just a sample
        const proxyRes = await testEndpoint('https://cloudbread.me/api/proxy?id=1GaRfGQsObMn53tfdTTv2W5GUV-d-ytul');
        console.log("Proxy Status:", proxyRes.statusCode);
        console.log("Proxy Headers:", JSON.stringify(proxyRes.headers, null, 2));
        console.log("Proxy Body Size:", proxyRes.bodySize);
        console.log("Proxy Sample:", proxyRes.sample);
    } catch(e) {
        console.error("Proxy fetch error:", e);
    }
}

runTests();
