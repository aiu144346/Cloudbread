require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function runTargeted() {
    const lectureId = '울산데이터센터_20260422';
    const lectureDir = path.join(__dirname, 'assets', 'lectures', lectureId);
    
    if (!fs.existsSync(lectureDir)) {
        console.error(`❌ 폴더를 찾을 수 없습니다: ${lectureDir}`);
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = '이 프리젠테이션 슬라이드 스크린샷 이미지의 내용의 핵심을 파악하여, 웹사이트를 방문한 독자에게 설명하는 친절하고 부드러운 도슨트(강사) 톤으로 2~3문장의 해설을 작성해줘. 인사말 없이 바로 해설을 시작해줘.';

    console.log(`🚀 [${lectureId}] 도슨트 해설 생성을 시작합니다.`);

    const images = fs.readdirSync(lectureDir)
        .filter(f => f.startsWith('slide') && f.endsWith('.png'))
        .sort((a, b) => {
            const numA = parseInt(a.replace('slide', '').replace('.png', ''));
            const numB = parseInt(b.replace('slide', '').replace('.png', ''));
            return numA - numB;
        });

    console.log(`📸 총 ${images.length}개의 슬라이드 발견.`);

    const commentaryFile = path.join(lectureDir, 'commentary.json');
    let commentary = {};
    if (fs.existsSync(commentaryFile)) {
        try { commentary = JSON.parse(fs.readFileSync(commentaryFile, 'utf8')); } catch(e) {}
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < images.length; i++) {
        const imgName = images[i];
        const slideNum = imgName.replace('slide', '').replace('.png', '');
        
        // 이미 생성된 것은 스킵
        if (commentary[slideNum]) {
            console.log(`[${i+1}/${images.length}] 슬라이드 ${slideNum} 스킵 (이미 존재)`);
            continue;
        }

        console.log(`[${i+1}/${images.length}] 슬라이드 ${slideNum} 처리 중...`);
        
        try {
            const imgPath = path.join(lectureDir, imgName);
            const imagePart = {
                inlineData: {
                    data: fs.readFileSync(imgPath).toString("base64"),
                    mimeType: "image/png"
                }
            };

            const result = await model.generateContent([prompt, imagePart]);
            const text = result.response.text().trim();
            commentary[slideNum] = text;
            console.log(` 👉 완료: ${text.substring(0, 30)}...`);

            // 매번 저장 (중단 대비)
            fs.writeFileSync(commentaryFile, JSON.stringify(commentary, null, 2));

            // API 속도 제한 고려 (1초로 단축 - Flash 모델은 충분함)
            await delay(1000); 
        } catch (e) {
            console.error(`❌ 오류 (슬라이드 ${slideNum}): ${e.message}`);
            if (e.message.includes('429')) {
                console.log("속도 제한 도달. 30초 대기...");
                await delay(30000);
                i--; // 현재 슬라이드 재시도
            }
        }
    }

    console.log(`\n✅ [${lectureId}] commentary.json 작성 완료!`);
}

runTargeted();
