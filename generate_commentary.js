require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 1. Google Gemini API 설정
// 루트 디렉토리의 .env 파일에 GEMINI_API_KEY가 등록되어 있어야 합니다.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const lecturesDir = path.join(__dirname, 'assets', 'lectures');

// API Quota 초과를 방지하기 위한 딜레이 유틸리티
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function extractTextFromImage(imagePath) {
    // 이미지를 읽어서 Base64 형태로 변환
    const imageBuffer = fs.readFileSync(imagePath);
    const mimeType = 'image/png';
    const imagePart = {
        inlineData: {
            data: imageBuffer.toString('base64'),
            mimeType
        }
    };

    // 가장 빠른 처리에 유리한 gemini-2.5-flash 모델 사용
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = '이 프리젠테이션 슬라이드 스크린샷 이미지의 내용의 핵심을 파악하여, 웹사이트를 방문한 독자에게 설명하는 친절하고 부드러운 도슨트(강사) 톤으로 2~3문장의 해설을 작성해줘. 인사말 없이 바로 해설을 시작해줘.';

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text();
}

async function processLectures() {
    if (!process.env.GEMINI_API_KEY) {
        console.error('❌ Error: GEMINI_API_KEY가 환경변수에 설정되어 있지 않습니다.');
        console.error('프로젝트 최상단 폴더에 .env 파일을 만들고 GEMINI_API_KEY=당신의_키 를 입력해주세요.');
        return;
    }

    const folders = fs.readdirSync(lecturesDir).filter(f => fs.statSync(path.join(lecturesDir, f)).isDirectory());
    console.log(`📂 총 ${folders.length}개의 강의 폴더를 스캔합니다.`);

    for (const folder of folders) {
        const folderPath = path.join(lecturesDir, folder);
        const files = fs.readdirSync(folderPath);
        
        let commentary = {};
        const commentaryPath = path.join(folderPath, 'commentary.json');
        
        // 기존 해설 파일이 있다면 불러오기 (끊겼을 때 이어서 작업하기 위함)
        if (fs.existsSync(commentaryPath)) {
            try {
                commentary = JSON.parse(fs.readFileSync(commentaryPath, 'utf8'));
            } catch (e) {
                console.error(`⚠️ Error parsing commentary.json in ${folder}:`, e);
            }
        }

        // slide1.png, slide2.png 파일들을 찾아 숫자 순서대로 정렬
        const slideFiles = files.filter(f => f.match(/^slide\d+\.png$/)).sort((a, b) => {
            const numA = parseInt(a.replace('slide', '').replace('.png', ''));
            const numB = parseInt(b.replace('slide', '').replace('.png', ''));
            return numA - numB;
        });

        if (slideFiles.length === 0) continue;

        let updated = false;

        for (const slide of slideFiles) {
            const slideNum = slide.replace('slide', '').replace('.png', '');
            
            // 이미 생성된 해설이 있다면 불필요한 API 요청 스킵
            if (commentary[slideNum] && commentary[slideNum].length > 0) {
                continue;
            }

            const slidePath = path.join(folderPath, slide);
            console.log(`[${folder}] 슬라이드 ${slideNum} 해설 생성 중...`);

            try {
                const text = await extractTextFromImage(slidePath);
                commentary[slideNum] = text.trim();
                updated = true;
                console.log(` 👉 완료: ${text.substring(0, 40).replace(/\n/g, ' ')}...`);
                
                // Gemini API 무료 티어(15 RPM) 제한을 피하기 위해 넉넉히 4초(4000ms) 대기
                await delay(4000); 
            } catch (error) {
                console.error(`❌ [오류] ${folder}/${slide}:`, error.message);
                if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('Too Many Requests')) {
                    console.log('⚠️ API 할당량 초과 감지. 60초간 로직을 잠시 쉬었다가 재시도합니다...');
                    await delay(60000);
                    // 이번 슬라이드는 실패로 두고 다음으로 넘기며, 다음 스크립트 실행 시 다시 시도하게 됨
                }
            }
        }

        // 업데이트된 내용이 있을 때만 파일에 저장
        if (updated) {
            fs.writeFileSync(commentaryPath, JSON.stringify(commentary, null, 2), 'utf8');
            console.log(`✅ [${folder}] commentary.json 작성 완료`);
        }
    }
    
    console.log('🎉 전체 파이프라인 자동화 생성이 작업 완료되었습니다.');
}

processLectures();
