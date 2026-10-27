const contentData = {
    business: {
        title: "기업/비즈니스 자동화",
        image: "assets/images/infographic_business_ai.png",
        courseTitle: "Agentic AI 기반 엔터프라이즈 업무 자동화 & 생산성 300% 극대화 워크플로우",
        slogan: "단순 질의응답을 넘어 조직의 실행력을 자동화하는 기업형 맞춤 AI 에이전트 구축",
        badgeTarget: "기업 임직원 / 팀장 및 기획·마케팅·인사 실무진",
        badgeDuration: "1일 집중 워크숍 (6시간) / 2주 심화",
        badgeLevel: "실무 ~ 심화",
        metrics: [
            { label: "실습 및 프로젝트 비중", value: "70%", icon: "fa-solid fa-chart-pie" },
            { label: "업무 생산성 향상 지표", value: "업무시간 65% 절감 & 속도 3배 향상", icon: "fa-solid fa-bolt" },
            { label: "즉시 적용 실습 산출물", value: "사내 커스텀 봇 1종 + 템플릿 3종", icon: "fa-solid fa-box-archive" }
        ],
        roadmap: [
            {
                step: "STEP 1",
                tag: "패러다임 전환 & AI 이해",
                title: "생성형 AI 3.0 엔터프라이즈 트렌드 & 기업 보안 가이드",
                desc: "텍스트 생성을 넘어 자율 실행형 에이전틱 AI(Agentic AI) 시대로의 진화, 기업 데이터 보안 및 프라이버시 컴플라이언스 준수 전략, 비즈니스 부서별 최적 도입 ROI 분석",
                time: "1.5시간"
            },
            {
                step: "STEP 2",
                tag: "직무 밀착형 핵심 실습",
                title: "직무 특화 고효율 프롬프트 & 멀티모달 분석 실전",
                desc: "시장조사 및 경쟁사 분석을 위한 심층 리서치 프롬프트(ToT, Few-Shot), 대용량 엑셀/PDF 데이터 분석 및 시각화 차트 자동 추출, 보도자료/제안서 초안 톤앤매너 튜닝",
                time: "2.5시간"
            },
            {
                step: "STEP 3",
                tag: "자동화 & 현업 적용",
                title: "노코드 AI 워크플로우 & 사내 전용 에이전트 구축",
                desc: "우리 팀 전용 사내 지식 기반 Custom GPT / Claude Project 생성 실습, Make/Zapier를 연동한 이메일·스프레드시트 무인 자동화 파이프라인 구현, 현업 즉시 적용 프로젝트 패키징",
                time: "2.0시간"
            }
        ],
        tools: ["ChatGPT Team (Custom GPTs)", "Claude 3.7 Sonnet", "Perplexity Pro", "Make (노코드 자동화)"],
        deliverables: "사내 전용 지식베이스 챗봇 1종, 업무 자동화 워크플로우 정의서, 직무별 프롬프트 치트시트",
        insights: [
            "조직 내 AI 내재화를 위한 기업 맞춤형 AI 도입 전략 수립 및 임직원 실무 교육",
            "개인별 업무 생산성 300% 향상을 위한 직무 특화 고효율 프롬프트 엔지니어링 실무 컨설팅",
            "의사결정 최적화 및 비용 절감을 위한 엔터프라이즈급 AI 자동화 워크플로우 설계 가이드라인"
        ]
    },
    public: {
        title: "공공기관/행정혁신",
        image: "assets/images/infographic_public_ai.png",
        courseTitle: "데이터 기반 지능형 공공행정 & 공직자 스마트 AI 보좌관 실전 가이드",
        slogan: "보안 걱정 없는 신뢰 기반 행정 혁신과 시민 체감형 스마트 공공 서비스 구현",
        badgeTarget: "중앙부처·전국 지자체 공무원 및 공공기관 재직자",
        badgeDuration: "3시간 공직자 특강 / 반일(4시간) 실습",
        badgeLevel: "입문 ~ 실무",
        metrics: [
            { label: "실습 및 프로젝트 비중", value: "60%", icon: "fa-solid fa-chart-pie" },
            { label: "행정 효율성 혁신 지표", value: "기안문 작성 시간 70% 단축", icon: "fa-solid fa-bolt" },
            { label: "즉시 적용 실습 산출물", value: "공공 표준 기안문 템플릿 4종 + FAQ", icon: "fa-solid fa-box-archive" }
        ],
        roadmap: [
            {
                step: "STEP 1",
                tag: "정책 기조 & 보안 규정",
                title: "정부 AI 정책 기조와 공공부문 보안 가이드라인",
                desc: "국가 인공지능 전략과 디지털플랫폼정부(DPG) 실현 로드맵, 공공망 보안 규정 및 비공개·민감정보 취급 지침, 화성시 스마트시티 및 순창군 행정 혁신 사례 벤치마킹",
                time: "1.0시간"
            },
            {
                step: "STEP 2",
                tag: "행정 보고서 혁신 실습",
                title: "공문서·보고서 작성 혁신과 지능형 행정 보좌관",
                desc: "기획서, 주간업무보고, 보도자료, 의회 답변서의 공공 표준 서식 프롬프트, 공공 통계·빅데이터 교차 검증 및 Fact-Checking 기법을 통한 할루시네이션(환각) 원천 차단",
                time: "1.5시간"
            },
            {
                step: "STEP 3",
                tag: "대민 서비스 & 체감도 제고",
                title: "시민 소통 강화 & 대민 서비스 체감도 제고",
                desc: "복잡한 조례·정책을 알기 쉬운 카드뉴스 문구 및 시민 친화적 언어로 변환, 취약계층 맞춤형 복지 행정 안내 및 고질 민원 분석 자동화 실습, 공직 사회 AI 일상화 문화 정착",
                time: "1.0시간"
            }
        ],
        tools: ["Gov-Safe AI 프레임워크", "ChatGPT / Claude (안전 모드)", "Wrtn(뤼튼) 기업/공공 모드", "Perplexity"],
        deliverables: "유형별 공공 기안문 프롬프트 매뉴얼, 정책 데이터 시각화 리포트, 시민 안내문 템플릿",
        insights: [
            "화성시청 및 순창군 사례 기반의 데이터 중심 지능형 행정 서비스 및 스마트 시티 정책 컨설팅",
            "공직자 실무 역량 강화를 위한 AI 보좌관 활용법 및 행정 프로세스 혁신 교육 솔루션",
            "지역 사회 문제 해결과 시민 체감도 향상을 위한 공공 부문 디지털 전환(DX) 전략 수립 및 자문"
        ]
    },
    citizen: {
        title: "일반인/직장인/시민",
        image: "assets/images/infographic_career_ai.png",
        courseTitle: "퇴근을 2시간 앞당기는 커리어 AI 툴체인 & 올인원 일상 스마트 라이프",
        slogan: "직무 경쟁력을 강화하는 필수 생성형 AI 도구 마스터와 나만의 디지털 브랜딩",
        badgeTarget: "2040 직장인, 취업준비생, 크리에이터 및 평생학습 시민",
        badgeDuration: "4주 완성 (주 1회 2시간) / 주말 부트캠프",
        badgeLevel: "입문 ~ 실무",
        metrics: [
            { label: "실습 및 프로젝트 비중", value: "80%", icon: "fa-solid fa-chart-pie" },
            { label: "역량 강화 달성 지표", value: "정보 검색 시간 80% 절감", icon: "fa-solid fa-bolt" },
            { label: "즉시 적용 실습 산출물", value: "AI 커리어 로드맵 + 콘텐츠 1세트", icon: "fa-solid fa-box-archive" }
        ],
        roadmap: [
            {
                step: "STEP 1",
                tag: "기본기 탄탄 & 스마트 검색",
                title: "생성형 AI 기본기 탄탄 다지기 & 똑똑한 일상 비서",
                desc: "ChatGPT, Claude, Gemini, Perplexity 각 엔진별 장단점 및 용도별 분업 전략, 원하는 결과를 단번에 얻는 4단계 마법 프롬프트 공식, 일정·어학·독서 등 라이프스타일 비서 활용",
                time: "2.0시간"
            },
            {
                step: "STEP 2",
                tag: "오피스 생산성 점프업",
                title: "오피스 워크 생산성 점프업 (직장인 실무 마스터)",
                desc: "10분 만에 끝내는 프레젠테이션(PPT) 개요 및 발표 대본 자동 생성, 이메일·회의록 요약·엑셀 수식 자동화, 나만의 전문 지식을 학습시킨 맞춤형 이력서·포트폴리오 업그레이드",
                time: "3.0시간"
            },
            {
                step: "STEP 3",
                tag: "멀티모달 창작 & 브랜딩",
                title: "멀티모달 창작 & 1인 미디어 콘텐츠 크리에이션",
                desc: "이미지 생성 AI(Midjourney, DALL-E)를 활용한 감각적인 시각 콘텐츠 제작, 숏폼 영상 스크립트 작성 및 음성 AI(TTS) 결합 미디어 제작 실습, AI 윤리와 저작권 체크리스트",
                time: "3.0시간"
            }
        ],
        tools: ["ChatGPT", "Claude", "Perplexity", "Gamma (PPT 생성)", "Canva AI", "ElevenLabs"],
        deliverables: "완성형 기획서 및 PPT 슬라이드 1부, 멀티모달 비주얼 콘텐츠 3종, 개인 맞춤형 AI 프롬프트북",
        insights: [
            "'2025 화성시민 AI 교육' 1,000여 명 수료 실적으로 증명된 전 연령대 맞춤형 AI 리터러시 교육",
            "커리어 성장을 위한 직장인 필수 AI 툴체인 구축 및 실무 생산성 극대화 코칭 프로그램",
            "시민의 일상을 바꾸는 생성형 AI 활용법 기반의 디지털 포용성 강화 및 미래 기술 교육"
        ]
    },
    senior: {
        title: "시니어/디지털 리터러시",
        image: "assets/images/infographic_senior_ai.png",
        courseTitle: "말 한마디로 시작하는 100세 시대 AI 동행 라이프 & 시니어 전문 강사 양성과정",
        slogan: "타자 없이 음성으로 즐기는 스마트 AI 생활과 인생 2막 시니어 디지털 일자리 창출",
        badgeTarget: "50~70대 신중년·액티브 시니어 & 시니어 강사 지망생",
        badgeDuration: "기초 2회 (각 2시간) + 심화 강사 코스",
        badgeLevel: "입문 ~ 강사 양성",
        metrics: [
            { label: "실습 및 프로젝트 비중", value: "85%", icon: "fa-solid fa-chart-pie" },
            { label: "디지털 자신감 회복 지표", value: "스마트폰 생활 편의 활용률 90%+", icon: "fa-solid fa-bolt" },
            { label: "즉시 적용 실습 산출물", value: "인생 회고록 1편 + 가족 포토카드", icon: "fa-solid fa-box-archive" }
        ],
        roadmap: [
            {
                step: "STEP 1",
                tag: "음성 대화 & 안전 수칙",
                title: "자판이 필요 없는 음성(Voice) 대화형 AI 첫걸음",
                desc: "키보드 대신 마이크로 친구처럼 대화하는 스마트폰 AI 비서(ChatGPT Voice, 클로바), 건강 정보·복지 혜택·길 찾기 실습, 보이스피싱과 스미싱을 구별하는 안전한 AI 보안 수칙",
                time: "2.0시간"
            },
            {
                step: "STEP 2",
                tag: "인생 기록 & 디지털 추억",
                title: "AI와 함께 쓰는 내 인생 이야기 & 디지털 추억 앨범",
                desc: "옛 사진 복원 및 음성 인터뷰를 통해 기록하는 '나의 삶 자서전 한 페이지', 손주·자녀를 위한 맞춤형 AI 구연동화 및 축하 카드 제작, 감성적인 시 짓기와 힐링 음악 체험",
                time: "2.0시간"
            },
            {
                step: "STEP 3",
                tag: "시니어 강사 & 일자리 창출",
                title: "시니어 AI 코치로 도약하는 전문 강사 양성과정",
                desc: "동년배의 눈높이에서 막힘없는 실습을 돕는 '시니어 맞춤형 티칭 스킬', 복지관·경로당 출강을 위한 표준 강의 교안 시연, 울산 동구노동자센터 등 검증된 시니어 일자리 연계",
                time: "8.0시간"
            }
        ],
        tools: ["ChatGPT Voice 모드", "네이버 클로바X", "뤼튼 모바일 앱", "DALL-E", "스마트폰 카메라/음성녹음기"],
        deliverables: "AI 음성 인터뷰 기록집(전자책 초안), 손주 선물용 AI 카드/동화책, 시니어 AI 코치 수료 포트폴리오",
        insights: [
            "울산시 동구노동자센터 사례 등 전문 강사 양성과정을 통한 시니어 디지털 일자리 창출 전략",
            "6070 세대의 눈높이에 맞춘 단계별 생성형 AI 실전 활용 및 디지털 격차 해소 교육",
            "100세 시대 삶의 질 향상을 위한 AI 동행 서비스 활용 및 시니어 맞춤형 사회 참여 솔루션"
        ]
    }
};

const mediaData = [
    { title: "[테크 인사이트] 사무직군 AX의 본질: 고립된 로컬 데이터를 실시간 협업 대시보드로 깨우다 (JPDC 사례)", type: "column", source: "테크저널리스트 특별기고", url: "article-jpdc-ax.html", date: "2026.10", ogImage: "assets/images/jpdc_lecture_onsite_2026.jpg" },
    { title: "정우진 “구민배심원단 50인과 북구 대개조 100일 플랜 실현”", type: "article", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=179513676709502", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20180417/p179513676709502_688.jpg" },
    { title: "[울산人터뷰] 워커홀릭에 진심, 어공 정우진", type: "article", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065564671845236", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20230211/p1065564671845236_237_thum.jpg" },
    { title: "울산人터뷰 영상 보도", type: "video", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065580712197790", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20230319/p1065580712197790_681.jpg" },
    { title: "[AI 뉴스 트렌드] “페르소나 챗봇 1.0 설치하기”", type: "column", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065602165191363", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240704/p1065602165191363_545_thum.jpg" },
    { title: "[AI 뉴스 트렌드] Claude 3.5 Sonnet: 우리 곁으로 다가온 미래의 AI", type: "article", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065622970111027", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240718/p1065622970111027_494_thum.jpg" },
    { title: "[AI 뉴스 트렌드] SF에서 현실이 된 기술 혁명", type: "column", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065618893520262", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240815/p1065618893520262_372_thum.jpg" },
    { title: "[AI 뉴스 트렌드] ChatGPT 어디까지 사용해 보셨나요?", type: "article", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065622091260292", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240905/p1065622091260292_758_thum.jpg" },
    { title: "[AI 뉴스 트렌드] 미래를 향한 나침반: 가트너 2024 전략 기술 동향", type: "article", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065601120341534", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20241107/p1065601120341534_313_thum.jpg" },
    { title: "[AI 뉴스 트렌드] DOGE 이니셔티브와 글로벌 AI 주권의 재편", type: "article", source: "울산저널", url: "https://www.usjournal.kr/news/newsview.php?ncode=1065615007506281", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20250102/p1065615007506281_262_thum.jpg" },
    { title: "울산 AI 데이터센터, '에너지 하마'를 '녹색 미래'로 전환할 시민의 역할", type: "column", source: "희망울산", url: "https://hopeulsan.mixon.io/posts/70texwd", date: "2024", ogImage: "https://hopeulsan.mixon.io/_storage_/public/314/hglasfcp3rnwe1q15ra7a38vvplg" },
    { title: "지역현안 강연 시리즈 - 인공지능과 사회 혁신", type: "article", source: "희망울산", url: "http://hopeulsan.net/bbs/board.php?bo_table=review&wr_id=176", date: "2024", ogImage: "http://hopeulsan.net/data/file/WLMSS/1935354467_bY3KDxmg_c044349bab62ff73e3987d9b6441568be00e223f.jpg" },
    { title: "[논설] 울산시교육청에 바란다: 디지털 교육의 방향", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065621242060554", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20230817/p1065621242060554_359_thum.jpg" },
    { title: "[논설] 에너지 도시 울산광역시의 ESG 명(明)과 암(暗)", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065564631079595", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20221128/p1065564631079595_460_thum.jpg" },
    { title: "메타버스 시대, 영상 제작에 도전한 시민 감독들", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065577386551553", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20221208/p1065577386551553_264_thum.jpg" },
    { title: "“이제는 정말 정치를 전환시켜야 할 때” 전국 첫 대전환 정치개혁 토론회", type: "column", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065603006805190", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20230126/p1065603006805190_915_thum.jpg" },
    { title: "[논설] ChatGPT가 “특이점”(Singularity)의 시대를 열다", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065623149212961", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20230302/p1065623149212961_795_thum.jpg" },
    { title: "[논설] 생성형 인공지능기술로 장애 극복", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065560161747557", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20230519/p1065560161747557_597_thum.jpg" },
    { title: "[논단] 울산의 랜드마크 정책, 울산이 창피해진다", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065563504670568", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20231013/p1065563504670568_182_thum.jpg" },
    { title: "[논설] 생성형 인공지능의 이중 얼굴: 파멸인가? 기회인가?", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065568431676459", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20231124/p1065568431676459_241_thum.jpg" },
    { title: "[논설] 시간을 사다 – X세대 버전", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065615800270246", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240125/p1065615800270246_814_thum.jpg" },
    { title: "[논설] 이번 투표 ‘단디’ 해야 한다", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065571113068780", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240405/p1065571113068780_816_thum.jpg" },
    { title: "“일본의 라인 인수는 8억 명 실시간 데이터 AI 자원화 전략”", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065596740741040", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240516/p1065596740741040_400_thum.jpg" },
    { title: "[논설] 일본의 네이버 라인 사태: AI 시대를 향한 일본의 대담한 도전?", type: "article", source: "울산저널", url: "https://m.usjournal.kr/news/newsview.php?ncode=1065606991926285", date: "2024", ogImage: "https://www.usjournal.kr/news/data/20240516/p1065606991926285_601_thum.jpg" },
    { title: "울산지역위원회 활동 소식 - 노무현재단", type: "article", source: "노무현재단", url: "https://www.knowhow.or.kr/region/region_news_detail.php?pri_no=999435511", date: "2024", ogImage: "https://www.knowhow.or.kr/data/new_board/202401/202401261706250984.png" },
    { title: "활동 기록 및 일상 - 옥장군 블로그", type: "blog", source: "네이버 블로그", url: "https://blog.naver.com/06rnftkrrl/224198183186", date: "2024", ogImage: "" },
    { title: "[기고] 부울경 메가시티의 두 번째 단추, 디지털 교육 혁신 플랫폼", type: "article", source: "경상일보", url: "https://www.ksilbo.co.kr/news/articleView.html?idxno=791395", date: "2024", ogImage: "https://cdn.ksilbo.co.kr/news/thumbnail/202103/791395_458105_853_v150.jpg" },
    { title: "빠르게 변화하는 AI시대, 미래지향적 역량 기른다", type: "article", source: "충남일보", url: "https://www.chungnamilbo.co.kr/news/articleView.html?idxno=770543", date: "2024", ogImage: "https://cdn.chungnamilbo.co.kr/news/thumbnail/202405/770543_352625_537_v150.jpg" },
    { title: "ENI 원격평생교육원 AI 전문가 과정", type: "article", source: "ENI에듀", url: "https://www.eniedu.co.kr/course_view?id=79", date: "2024", ogImage: "https://www.eniedu.co.kr/img/hp_img.jpg" },
    { title: "마이에듀 내일배움카드 교육 리스트", type: "article", source: "마이에듀", url: "https://www.nebeca.co.kr/course/view.asp?LecCD=260004&submenu=3", date: "2024", ogImage: "https://www.nebeca.co.kr/images/og_nebeca_logo.jpg" },
    { title: "'AI 기초부터 제작, 행정 실습까지'...화성시 시민대상 AI 교육", type: "article", source: "KPI뉴스", url: "https://www.kpinews.kr/newsView/1065588989607541", date: "2024", ogImage: "https://kpinews.kr/data/upi/image/2025/11/11/p1065588989607541_631_thum.jpg" },
    { title: "AI 전문가 정우진 특강 1", type: "video", source: "YouTube", url: "https://www.youtube.com/watch?v=cGunZLVi66Y", date: "2024", ogImage: "https://img.youtube.com/vi/cGunZLVi66Y/maxresdefault.jpg" },
    { title: "비즈니스 AI 실무 전략 2", type: "video", source: "YouTube", url: "https://www.youtube.com/watch?v=Qu45L-UkHDQ", date: "2024", ogImage: "https://img.youtube.com/vi/Qu45L-UkHDQ/maxresdefault.jpg" },
    { title: "생성형 AI의 미래 인터뷰 3", type: "video", source: "YouTube", url: "https://www.youtube.com/watch?v=zOoh-KpAHvU", date: "2024", ogImage: "https://img.youtube.com/vi/zOoh-KpAHvU/maxresdefault.jpg" },
    { title: "디지털 리터러시 교육 현장 4", type: "video", source: "YouTube", url: "https://www.youtube.com/watch?v=dKkGQP5k3Ew", date: "2024", ogImage: "https://img.youtube.com/vi/dKkGQP5k3Ew/maxresdefault.jpg" },
    { title: "맞춤형 AI 솔루션 가이드 5", type: "video", source: "YouTube", url: "https://www.youtube.com/watch?v=C-5oTXZDFV0", date: "2024", ogImage: "https://img.youtube.com/vi/C-5oTXZDFV0/maxresdefault.jpg" }
];

const videoData = [
    { title: "에이전트 AI 시대 구글 I/O 2026 완전 분석", cat: "business", youtubeId: "8XULBBz4KM0", thumb: "assets/yt_8XULBBz4KM0.png", isNew: true },
    { title: "울산데이터센터 AI 시대의 가속기인가? 기후위기의 주범인가?", cat: "lecture", youtubeId: "ykMc7gc9lxI", isNew: true },
    { title: "AI 시대를 지배하는 프롬프트 공식 (CRAFT, CoT, ToT)", cat: "prompt", youtubeId: "amGfOKXBvXY", thumb: "assets/yt_amGfOKXBvXY.PNG", isNew: true, lectureId: "17강_티이핑으로_이미지를_생성하다_20230831" },
    { title: "AI로 변화하는 비즈니스 지형", cat: "business", thumb: "assets/yt_business.png", isNew: true, lectureId: "14강_비즈니스_컨설팅_GAI활용_20230831" },
    { title: "시니어들을 위한 스마트폰 AI", cat: "senior", thumb: "assets/yt_senior.png", lectureId: "동구노동자센터" },
    { title: "GPT-4o 실무 활용법 마스터", cat: "prompt", thumb: "assets/yt_prompt.png", lectureId: "2강_ChatGPT_EI_20230818" },
    { title: "행정 업무 효율화 200% 비결", cat: "business", thumb: "assets/yt_business.png", lectureId: "북구청공무원특강_20240827" }
];

// --- Global Video Modal Open Function ---
function openVideo(youtubeId) {
    const videoModal = document.getElementById("video-modal");
    const videoIframe = document.getElementById("video-iframe");
    if (!videoModal || !videoIframe) return;
    videoIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    videoModal.style.display = "block";
    document.body.style.overflow = "hidden";
}
window.openVideo = openVideo;

document.addEventListener("DOMContentLoaded", () => {
    // YouTube Hub Logic - Enhanced for Hybrid
    const videoGrid = document.getElementById("video-grid");
    const featuredVideoGrid = document.getElementById("video-grid-featured");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // --- Video Modal Close Logic ---
    const videoModal = document.getElementById("video-modal");
    const closeVideoModal = document.querySelector(".close-video-modal");

    if (closeVideoModal) {
        closeVideoModal.onclick = () => {
            const modal = document.getElementById("video-modal");
            const iframe = document.getElementById("video-iframe");
            if (modal) modal.style.display = "none";
            if (iframe) iframe.src = "";
            document.body.style.overflow = "auto";
        };
    }

    if (videoModal) {
        window.addEventListener("click", (event) => {
            const modal = document.getElementById("video-modal");
            if (event.target == modal) {
                const iframe = document.getElementById("video-iframe");
                modal.style.display = "none";
                if (iframe) iframe.src = "";
                document.body.style.overflow = "auto";
            }
        });
    }

    function renderVideos(filter, container) {
        if (!container) return;
        container.innerHTML = "";

        let filtered = filter === "all" ? videoData : videoData.filter(v => v.cat === filter);

        if (container.id === "video-grid-featured") {
            filtered = filtered.slice(0, 4);
        }

        filtered.forEach(video => {
            const card = document.createElement("div");
            card.className = "video-card reveal";

            const badge = video.isNew ? `<div class="new-badge">NEW</div>` : "";
            const lectureLink = video.lectureId ? `<a href="archive.html?id=${video.lectureId}" class="btn-mini btn-mini-blue">관련 강의안 →</a>` : "";

            const thumbSrc = video.thumb ? video.thumb : (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg` : "");

            card.innerHTML = `
                ${badge}
                <div class="video-thumb" ${video.youtubeId ? `style="cursor:pointer;" onclick="openVideo('${video.youtubeId}')"` : ""}>
                    <img src="${thumbSrc}" alt="${video.title}" style="width:100%; height:180px; object-fit:cover;" onerror="this.src='assets/ai_lecture_slide_preview.png';">
                    ${video.youtubeId ? '<div class="play-overlay"><i class="fas fa-play"></i></div>' : ''}
                </div>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <div class="card-actions">
                        <a href="javascript:void(0)" class="peek-btn" ${video.youtubeId ? `onclick="openVideo('${video.youtubeId}')"` : `onclick="alert('영상 준비 중입니다.')"`}>영상 시청</a>
                        ${lectureLink}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function renderLatestContent() {
        const latestGrid = document.getElementById("latest-content-grid");
        if (!latestGrid) return;

        const latestVideos = videoData.slice(0, 2);

        let latestLectures = [];
        if (typeof lectureData !== 'undefined' && lectureData['2026']) {
            latestLectures = lectureData['2026'].slice(0, 2);
        }

        const items = [];
        latestVideos.forEach(v => items.push({ ...v, type: 'Video', link: 'youtube.html' }));
        latestLectures.forEach(l => {
            const thumbPath = l.id + "/slide1.png";
            const proxyThumb = `/api/proxy?path=${encodeURIComponent(thumbPath)}`;
            items.push({ ...l, type: 'Lecture', link: `archive.html?id=${l.id}`, thumb: proxyThumb });
        });

        latestGrid.innerHTML = "";
        items.forEach(item => {
            const card = document.createElement("a");
            card.href = item.link;
            card.className = "latest-item reveal";
            card.innerHTML = `
                <div class="latest-thumb">
                    <img src="${item.thumb || 'assets/ai_lecture_slide_preview.png'}" alt="${item.title}" onerror="this.src='assets/ai_lecture_slide_preview.png';">
                </div>
                <div class="latest-info">
                    <span class="meta">${item.type} <span class="type-label">Update</span></span>
                    <h4>${item.title}</h4>
                    <div class="peek-btn" style="padding: 5px 10px; font-size: 0.8rem; display: inline-block;">내용 확인하기 →</div>
                </div>
            `;
            latestGrid.appendChild(card);
        });
    }

    function initShowcase() {
        const insightList = document.getElementById("insight-list");
        if (!insightList) return;

        const urlParams = new URLSearchParams(window.location.search);
        const initialTarget = urlParams.get('target') || 'business';

        function renderCurriculumDashboard(target) {
            const dashContainer = document.getElementById("curriculum-dashboard");
            if (!dashContainer) return;
            const data = contentData[target];
            if (!data) return;

            dashContainer.innerHTML = `
                <div class="dash-card dash-overview-card">
                    <div class="dash-badge-row">
                        <span class="dash-pill pill-target"><i class="fa-solid fa-users"></i> ${data.badgeTarget}</span>
                        <span class="dash-pill pill-duration"><i class="fa-solid fa-clock"></i> ${data.badgeDuration}</span>
                        <span class="dash-pill pill-level"><i class="fa-solid fa-layer-group"></i> ${data.badgeLevel}</span>
                    </div>
                    <h2 class="dash-course-title">${data.courseTitle}</h2>
                    <p class="dash-course-slogan"><i class="fa-solid fa-quote-left" style="opacity:0.35; margin-right:8px;"></i>${data.slogan}<i class="fa-solid fa-quote-right" style="opacity:0.35; margin-left:8px;"></i></p>
                </div>

                <div class="dash-metrics-grid">
                    ${data.metrics.map(m => `
                        <div class="metric-box">
                            <div class="metric-icon-wrap"><i class="${m.icon}"></i></div>
                            <div class="metric-content">
                                <span class="metric-title">${m.label}</span>
                                <strong class="metric-num">${m.value}</strong>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="dash-card dash-roadmap-box">
                    <div class="dash-section-header">
                        <div>
                            <h3 class="dash-section-title"><i class="fa-solid fa-route" style="color:var(--accent-solid);"></i> 3단계 맞춤형 커리큘럼 로드맵</h3>
                            <p class="dash-section-sub">기초 패러다임 이해부터 실무 워크플로우 자동화까지 현장 밀착형 설계</p>
                        </div>
                        <span class="dash-custom-badge"><i class="fa-solid fa-sliders"></i> 기관·기업 맞춤 커스터마이징 가능</span>
                    </div>
                    <div class="roadmap-grid">
                        ${data.roadmap.map(r => `
                            <div class="roadmap-step-item">
                                <div class="step-head">
                                    <span class="step-badge">${r.step}</span>
                                    <span class="step-phase">${r.tag}</span>
                                    <span class="step-duration"><i class="fa-regular fa-clock"></i> ${r.time}</span>
                                </div>
                                <h4 class="step-name">${r.title}</h4>
                                <p class="step-description">${r.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="dash-bottom-grid">
                    <div class="dash-card dash-tools-box">
                        <h4 class="dash-sub-title"><i class="fa-solid fa-screwdriver-wrench" style="color:#0284c7;"></i> 실습 AI 툴체인</h4>
                        <div class="dash-tools-list">
                            ${data.tools.map(tool => `<span class="tool-chip"><i class="fa-solid fa-check" style="color:#0284c7;"></i> ${tool}</span>`).join('')}
                        </div>
                    </div>
                    <div class="dash-card dash-deliverables-box">
                        <h4 class="dash-sub-title"><i class="fa-solid fa-gift" style="color:#10b981;"></i> 수강생 최종 기대 산출물</h4>
                        <div class="deliverables-content"><i class="fa-solid fa-circle-check" style="color:#10b981; margin-right:8px;"></i>${data.deliverables}</div>
                    </div>
                </div>

                ${target === 'business' ? `
                    <div style="background: linear-gradient(135deg, #070F2B 0%, #14213D 60%, #0E7C7B 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 30px rgba(14, 124, 123, 0.25); border:1px solid rgba(255,255,255,0.15);">
                        <div>
                            <span style="background:rgba(0,240,255,0.2); color:#00F0FF; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">🏢 실전 엔터프라이즈 ERM 포털 오픈</span>
                            <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">제주개발공사(JPDC) 전사적 리스크 대응과 조직의 실행 (ERM) 마스터클래스</h3>
                            <p style="font-size:0.9rem; color:#CBD5E1; margin:4px 0 0 0;">COSO ERM 5대 전략, 10인 실시간 협업 PESTEL · SWOT-Risk · 5×5 리스크 평가 매트릭스 전용 대시보드</p>
                        </div>
                        <a href="lecture-jpdc.html" style="background:#00F0FF; color:#030712; font-weight:800; font-size:0.95rem; padding:12px 24px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:transform 0.2s;"><i class="fa-solid fa-arrow-up-right-from-square"></i> 전용 실습 대시보드 입장하기 →</a>
                    </div>
                ` : ''}

                ${target === 'public' ? `
                    <div style="background: linear-gradient(135deg, #002D62 0%, #0047AB 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 30px rgba(0, 71, 171, 0.2); border:1px solid rgba(255,255,255,0.15);">
                        <div>
                            <span style="background:rgba(0,240,255,0.2); color:#00F0FF; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">🏛️ 실전 마스터클래스 전용 포털 오픈</span>
                            <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">울산 북구청 신규 공무원 AI 행정혁신 120분 마스터클래스</h3>
                            <p style="font-size:0.9rem; color:#CBD5E1; margin:4px 0 0 0;">행정×기술 투트랙 실시간 프롬프트 랩, 과제 실시간 업로드 및 라이브 쇼케이스 전용 페이지</p>
                        </div>
                        <a href="lecture-ubs.html" style="background:#00F0FF; color:#030712; font-weight:800; font-size:0.95rem; padding:12px 24px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:transform 0.2s;"><i class="fa-solid fa-arrow-up-right-from-square"></i> 전용 실습 대시보드 입장하기 →</a>
                    </div>
                ` : ''}

                ${target === 'citizen' ? `
                    <div style="display:flex; flex-direction:column; gap:1.2rem; margin-top:2rem;">
                        <!-- 배너 1: Streamlit RAG 실습 -->
                        <div class="rag-card" style="background: linear-gradient(135deg, #070F2B 0%, #0F172A 50%, #1E3A8A 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 30px rgba(30, 58, 138, 0.25); border:1px solid rgba(0, 240, 255, 0.35);">
                            <div style="max-width:650px;">
                                <span style="background:rgba(0,240,255,0.2); color:#00F0FF; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">🤖 지능형 문서 검색 &amp; Q&amp;A 랩</span>
                                <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">CloudBread 올인원 RAG 챗봇 실습 포털</h3>
                                <p style="font-size:0.9rem; color:#CBD5E1; margin:6px 0 0 0;">사내 문서 및 대용량 PDF 지식 기반 검색증강생성(RAG) 파이프라인 실시간 체험 대시보드</p>
                            </div>
                            <div class="rag-card-actions">
                                <a href="https://cloudbread-rag.streamlit.app" target="_blank" style="background:#00F0FF; color:#030712; font-weight:800; font-size:0.95rem; padding:12px 24px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-arrow-up-right-from-square"></i> RAG 챗봇 실습 입장하기 →</a>
                            </div>
                        </div>

                        <!-- 배너 2: 중구 조례 Semantic RAG -->
                        <div class="rag-card" style="background: linear-gradient(135deg, #002D62 0%, #0047AB 60%, #0284C7 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 30px rgba(0, 71, 171, 0.25); border:1px solid rgba(255,255,255,0.2);">
                            <div style="max-width:650px;">
                                <span style="background:rgba(0,240,255,0.2); color:#00F0FF; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">🏛️ 기초 자치법규 AI 어드바이저</span>
                                <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">울산광역시 중구청 조례 Semantic RAG 마스터랩</h3>
                                <p style="font-size:0.9rem; color:#CBD5E1; margin:6px 0 0 0;">432개 지자체 조례 및 372개 정밀 조문 청크 기반 법조문 인용 및 의도 분석 실시간 답변 포털</p>
                            </div>
                            <div class="rag-card-actions" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                                <a href="rag-ordinance.html" style="background:#00F0FF; color:#030712; font-weight:800; font-size:0.9rem; padding:11px 20px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-robot"></i> 챗봇 체험하기 →</a>
                                <a href="lecture-rag-ordinance.html" style="background:rgba(255,255,255,0.12); border:1px solid rgba(0,240,255,0.4); color:#00F0FF; font-weight:700; font-size:0.9rem; padding:11px 18px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-chalkboard-user"></i> 강의안 보기</a>
                            </div>
                        </div>

                        <!-- 배너 3: 울산시(광역) 조례 Semantic RAG -->
                        <div class="rag-card" style="background: linear-gradient(135deg, #042f2e 0%, #0f766e 50%, #0284c7 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 30px rgba(15, 118, 110, 0.25); border:1px solid rgba(0, 240, 255, 0.35);">
                            <div style="max-width:650px;">
                                <span style="background:rgba(0,240,255,0.2); color:#00F0FF; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">🌆 광역 자치법규 AI 어드바이저</span>
                                <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">울산광역시(광역) 조례 Semantic RAG 마스터랩</h3>
                                <p style="font-size:0.9rem; color:#CBD5E1; margin:6px 0 0 0;">청년 기본 조례, 저출생/난임 지원, 소상공인 경영안정자금, 침수방지시설, 교통약자 부름콜 등 104개 조항 실시간 시맨틱 검색</p>
                            </div>
                            <div class="rag-card-actions" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                                <a href="rag-ulsan.html" style="background:#00F0FF; color:#030712; font-weight:800; font-size:0.9rem; padding:11px 20px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-city"></i> 울산시 RAG 체험 →</a>
                                <a href="lecture-rag-ulsan.html" style="background:rgba(255,255,255,0.12); border:1px solid rgba(0,240,255,0.4); color:#00F0FF; font-weight:700; font-size:0.9rem; padding:11px 18px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-chalkboard-user"></i> 강의안 보기</a>
                            </div>
                        </div>

                        <!-- 배너 4: 울산광역시 5개 구·군 보건소 생애주기 활용 Semantic RAG -->
                        <div class="rag-card" style="background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #0d9488 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 30px rgba(16, 185, 129, 0.28); border:1px solid rgba(52, 211, 153, 0.45);">
                            <div style="max-width:650px;">
                                <span style="background:rgba(16,185,129,0.25); color:#6EE7B7; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">🏥 생애주기별 공공의료 AI 어드바이저</span>
                                <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">울산광역시 보건소 생애주기 활용 Semantic RAG 마스터랩</h3>
                                <p style="font-size:0.9rem; color:#D1FAE5; margin:6px 0 0 0;">영유아 예방접종·임산부 엽산/철분/산후조리·성인 보건증/금연·어르신 치매검진/대상포진 등 5개 구·군 보건소 혜택 &amp; 법규 통합 가이드</p>
                            </div>
                            <div class="rag-card-actions" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                                <a href="rag-health.html" style="background:#34D399; color:#030712; font-weight:800; font-size:0.9rem; padding:11px 20px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-hospital-user"></i> 보건소 RAG 체험 →</a>
                                <a href="lecture-rag-health.html" style="background:rgba(255,255,255,0.12); border:1px solid rgba(52,211,153,0.5); color:#6EE7B7; font-weight:700; font-size:0.9rem; padding:11px 18px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-chalkboard-user"></i> 강의안 보기</a>
                            </div>
                        </div>

                        <!-- 배너 5: 구글 안티그래비티 활용 대시보드 구축 강의 -->
                        <div class="rag-card" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 30px rgba(79, 70, 229, 0.3); border:1px solid rgba(165, 180, 252, 0.45);">
                            <div style="max-width:650px;">
                                <span style="background:rgba(129,140,248,0.25); color:#A5B4FC; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">📊 구글 안티그래비티 노코드 AI 시각화</span>
                                <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">구글 안티그래비티 활용 대시보드 구축 강의</h3>
                                <p style="font-size:0.9rem; color:#E0E7FF; margin:6px 0 0 0;">코딩 없는 자연어 지시로 엑셀·CSV·공공데이터를 반응형 웹 대시보드로 시각화하고 웹에 원클릭 배포하는 직장인·시민 실전 마스터 클래스</p>
                            </div>
                            <div class="rag-card-actions" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                                <a href="dashboard-demo.html" style="background:#818CF8; color:#030712; font-weight:800; font-size:0.9rem; padding:11px 20px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-chart-line"></i> 대시보드 라이브 체험 →</a>
                                <a href="clinic-dashboard.html" style="background:rgba(16,185,129,0.2); border:1px solid rgba(52,211,153,0.5); color:#6EE7B7; font-weight:700; font-size:0.9rem; padding:11px 18px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-user-doctor"></i> 피부과 CRM 데모</a>
                                <a href="lecture-dashboard.html" style="background:rgba(255,255,255,0.12); border:1px solid rgba(165,180,252,0.5); color:#C7D2FE; font-weight:700; font-size:0.9rem; padding:11px 18px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-chalkboard-user"></i> 강의안 보기</a>
                            </div>
                        </div>

                        <!-- 배너 6: 실시간 하이브리드 통합 관제 대시보드 마스터랩 -->
                        <div class="rag-card" style="background: linear-gradient(135deg, #0b132b 0%, #1c2541 40%, #0f4c5c 75%, #00b4d8 100%); color:#FFFFFF; border-radius:18px; padding:1.8rem 2.2rem; display:flex; justify-content:space-between; align-items:center; gap:1.5rem; flex-wrap:wrap; box-shadow:0 12px 35px rgba(0, 180, 216, 0.32); border:1px solid rgba(0, 240, 255, 0.5);">
                            <div style="max-width:650px;">
                                <span style="background:rgba(0,240,255,0.2); color:#00F0FF; font-size:0.8rem; font-weight:800; padding:4px 12px; border-radius:9999px; display:inline-block; margin-bottom:8px;">⚡ [실속형] 멀티 포맷 파싱 &amp; 실시간 DB 연동</span>
                                <h3 style="font-size:1.35rem; font-weight:800; margin:0; color:#FFFFFF;">실시간 하이브리드 통합 관제 대시보드 마스터랩</h3>
                                <p style="font-size:0.9rem; color:#E0F2FE; margin:6px 0 0 0;">code_artifact (1) 기반 6대 관제탑! 엑셀·PDF·워드·MD 직접 업로드와 Supabase/Webhook 실시간 동기화, 4가지 디자인 모드를 지원하는 엔터프라이즈 통합 대시보드</p>
                            </div>
                            <div class="rag-card-actions" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                                <a href="hybrid-dashboard.html" style="background:#00F0FF; color:#030712; font-weight:800; font-size:0.92rem; padding:12px 22px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s; box-shadow:0 4px 15px rgba(0,240,255,0.4);"><i class="fa-solid fa-gauge-high"></i> 통합 대시보드 입장하기 →</a>
                                <a href="hybrid-dashboard.html?tab=raw" style="background:rgba(255,255,255,0.12); border:1px solid rgba(0,240,255,0.5); color:#00F0FF; font-weight:700; font-size:0.9rem; padding:11px 18px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-cloud-arrow-up"></i> 데이터 업로드 허브</a>
                                <a href="lecture-dashboard.html" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.25); color:#E2E8F0; font-weight:700; font-size:0.9rem; padding:11px 18px; border-radius:10px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:all 0.2s;"><i class="fa-solid fa-chalkboard-user"></i> 강의안 보기</a>
                            </div>
                        </div>
                    </div>
                ` : ''}

                ${target === 'senior' ? `
                    <div style="margin-top:2.2rem; display:flex; flex-direction:column; gap:1.4rem;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:0.8rem; border-bottom: 2px solid #F1F5F9; padding-bottom: 1rem;">
                            <div>
                                <span style="background:#EEF2FF; color:#4F46E5; font-size:0.82rem; font-weight:800; padding:5px 14px; border-radius:9999px; display:inline-block; margin-bottom:6px; border:1px solid #C7D2FE;">
                                    🎓 중학생 AI 3대 핵심 과목 실전 학습 플랫폼
                                </span>
                                <h3 style="font-size:1.45rem; font-weight:800; color:#0F172A; margin:0; letter-spacing:-0.02em;">
                                    중학 AI 자기주도 학습관 (영단어 · 수학 · 과학)
                                </h3>
                                <p style="font-size:0.92rem; color:#64748B; margin:6px 0 0 0; line-height:1.5;">
                                    소크라테스 AI 유도 문답 · 게이미피케이션 인출 훈련 · 실시간 60FPS 가상실험으로 완성하는 3대 과목 대시보드
                                </p>
                            </div>
                            <div style="display:flex; gap:0.6rem; align-items:center;">
                                <a href="study/slides/" target="_blank" style="background:#4F46E5; color:#FFFFFF; font-weight:800; font-size:0.88rem; padding:11px 18px; border-radius:12px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; box-shadow:0 6px 18px rgba(79,70,229,0.25); transition:all 0.2s;">
                                    <i class="fa-solid fa-chalkboard-user"></i> 강의 슬라이드 센터 📖
                                </a>
                                <a href="study/" target="_blank" style="background:#0F172A; color:#FFFFFF; font-weight:800; font-size:0.88rem; padding:11px 18px; border-radius:12px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; box-shadow:0 6px 18px rgba(15,23,42,0.15); transition:all 0.2s;">
                                    <i class="fa-solid fa-graduation-cap" style="color:#38BDF8;"></i> 종합 학습관 전체보기 →
                                </a>
                            </div>
                        </div>

                        <!-- 3-Column Subject Cards Grid (Clean Modern White Glass Cards) -->
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.4rem;">

                            <!-- 카드 1: 영어 (Voca9) -->
                            <div style="background:#FFFFFF; border-radius:20px; padding:2rem 1.8rem; border:1px solid #E2E8F0; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 8px 24px rgba(15,23,42,0.04); transition:transform 0.2s, box-shadow 0.2s;">
                                <div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                                        <span style="background:#EEF2FF; color:#4F46E5; font-size:0.78rem; font-weight:800; padding:4px 12px; border-radius:8px; border:1px solid #C7D2FE;">
                                            교육부 필수 1,800단어
                                        </span>
                                        <span style="font-size:1.6rem;">🔤</span>
                                    </div>
                                    <h4 style="font-size:1.25rem; font-weight:800; color:#0F172A; margin:0 0 8px 0; letter-spacing:-0.02em;">
                                        중학 영단어 9레벨 마스터 (Voca9)
                                    </h4>
                                    <p style="font-size:0.9rem; color:#475569; line-height:1.6; margin:0 0 16px 0;">
                                        4지선다 좀비 디펜스 게임과 마이크로 스토리텔링 &amp; 소크라테스 수무고개 추리 퀴즈로 1,800단어를 완전 정복합니다.
                                    </p>
                                    <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px; padding:12px; background:#F8FAFC; border-radius:12px; border:1px solid #F1F5F9;">
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#334155; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#4F46E5;"></i> <span>4지선다 좀비 디펜스 게임</span>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#334155; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#4F46E5;"></i> <span>원어민 음성 TTS &amp; 9레벨 진단</span>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#334155; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#4F46E5;"></i> <span>AI 4대 암기비법 숏폼 스토리</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="display:flex; flex-direction:column; gap:8px;">
                                    <a href="study/slides/english.html" target="_blank" style="background:#0F172A; color:#FFFFFF; font-weight:800; font-size:0.86rem; padding:10px 16px; border-radius:10px; text-decoration:none; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s; border:1px solid #334155;">
                                        <i class="fa-solid fa-chalkboard-user" style="color:#A5B4FC;"></i> 학생용 활용법 슬라이드 강의 📖
                                    </a>
                                    <a href="study/?subject=voca" target="_blank" style="background:#4F46E5; color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:11px 16px; border-radius:10px; text-decoration:none; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s; box-shadow:0 4px 14px rgba(79,70,229,0.25);">
                                        <i class="fa-solid fa-gamepad"></i> 영단어 대시보드 바로가기 →
                                    </a>
                                </div>
                            </div>

                            <!-- 카드 2: 수학 (AI 수학) -->
                            <div style="background:#FFFFFF; border-radius:20px; padding:2rem 1.8rem; border:1px solid #E2E8F0; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 8px 24px rgba(15,23,42,0.04); transition:transform 0.2s, box-shadow 0.2s;">
                                <div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                                        <span style="background:#EFF6FF; color:#2563EB; font-size:0.78rem; font-weight:800; padding:4px 12px; border-radius:8px; border:1px solid #BFDBFE;">
                                            2022 개정 21개 전 단원
                                        </span>
                                        <span style="font-size:1.6rem;">📐</span>
                                    </div>
                                    <h4 style="font-size:1.25rem; font-weight:800; color:#0F172A; margin:0 0 8px 0; letter-spacing:-0.02em;">
                                        소크라테스 AI 수학 (수포자 탈출)
                                    </h4>
                                    <p style="font-size:0.9rem; color:#475569; line-height:1.6; margin:0 0 16px 0;">
                                        선행 개념 징검다리 무기 장착과 스스로 답을 유도하는 3단계 힌트, 편의점·게임 실생활 3-Scene 웹툰 비유를 제공합니다.
                                    </p>
                                    <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px; padding:12px; background:#F8FAFC; border-radius:12px; border:1px solid #F1F5F9;">
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#334155; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#2563EB;"></i> <span>선행 필수 개념 징검다리 무기</span>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#2563EB; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#2563EB;"></i> <span>소크라테스 3단계 힌트 유도</span>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#334155; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#2563EB;"></i> <span>일일 30분 맞춤 플래너 &amp; KaTeX</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="study/?subject=math" target="_blank" style="background:#2563EB; color:#FFFFFF; font-weight:800; font-size:0.92rem; padding:13px 18px; border-radius:12px; text-decoration:none; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s; box-shadow:0 4px 14px rgba(37,99,235,0.25);">
                                    <i class="fa-solid fa-square-root-variable"></i> 수학 대시보드 바로가기 →
                                </a>
                            </div>

                            <!-- 카드 3: 과학 (AI 사이언스 랩) -->
                            <div style="background:#FFFFFF; border-radius:20px; padding:2rem 1.8rem; border:1px solid #E2E8F0; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 8px 24px rgba(15,23,42,0.04); transition:transform 0.2s, box-shadow 0.2s;">
                                <div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                                        <span style="background:#ECFEFF; color:#0891B2; font-size:0.78rem; font-weight:800; padding:4px 12px; border-radius:8px; border:1px solid #A5F3FC;">
                                            물리·화학·생명·지구 4대 영역
                                        </span>
                                        <span style="font-size:1.6rem;">🔬</span>
                                    </div>
                                    <h4 style="font-size:1.25rem; font-weight:800; color:#0F172A; margin:0 0 8px 0; letter-spacing:-0.02em;">
                                        AI 사이언스 랩 (과학 상상 공작소)
                                    </h4>
                                    <p style="font-size:0.9rem; color:#475569; line-height:1.6; margin:0 0 16px 0;">
                                        워터파크 슬라이드 옴의 법칙, 댄스파티 분자 운동, 광합성 팩토리, 된장찌개 판구조론 60FPS 실시간 가상실험을 제공합니다.
                                    </p>
                                    <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px; padding:12px; background:#F8FAFC; border-radius:12px; border:1px solid #F1F5F9;">
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#334155; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#0891B2;"></i> <span>60FPS 캔버스 실시간 가상실험</span>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#0891B2; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#0891B2;"></i> <span>변인 통제 실험대 (Lock 🔒 기능)</span>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#334155; font-weight:600;">
                                            <i class="fa-solid fa-circle-check" style="color:#0891B2;"></i> <span>흔한 오개념 타파 3D 플립 카드</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="study/?subject=science" target="_blank" style="background:#0891B2; color:#FFFFFF; font-weight:800; font-size:0.92rem; padding:13px 18px; border-radius:12px; text-decoration:none; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s; box-shadow:0 4px 14px rgba(8,145,178,0.25);">
                                    <i class="fa-solid fa-flask-vial"></i> 과학 대시보드 바로가기 →
                                </a>
                            </div>

                        </div>
                    </div>
                ` : ''}

                <div class="dash-cta-box">
                    <div class="dash-cta-text">
                        <strong>💡 [${data.title}] 맞춤형 출강 및 교육 제안서가 필요하신가요?</strong>
                        <span>귀 조직의 목표와 대상자의 눈높이에 맞춘 상세 커리큘럼 교안 및 견적서를 신속하게 제공해 드립니다.</span>
                    </div>
                    <a href="index.html#cta" class="dash-cta-btn"><i class="fa-solid fa-paper-plane"></i> 강의 및 컨설팅 문의하기</a>
                </div>
            `;
        }

        function updateShowcase(target) {
            const data = contentData[target];
            if (!data) return;

            const previewImg = document.querySelector(".slide-preview-wrapper img");
            if (previewImg) {
                previewImg.style.opacity = 0;
                setTimeout(() => {
                    previewImg.src = data.image;
                    previewImg.style.opacity = 1;
                }, 200);
            }

            insightList.innerHTML = data.insights.map(i => `<li>${i}</li>`).join('');

            document.querySelectorAll(".target-btn").forEach(btn => {
                btn.classList.toggle("active", btn.dataset.target === target);
            });

            renderCurriculumDashboard(target);
        }

        document.querySelectorAll(".target-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.dataset.target;
                updateShowcase(target);
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?target=' + target;
                window.history.pushState({ path: newUrl }, '', newUrl);
            });
        });

        updateShowcase(initialTarget);
    }

    initShowcase();
    renderLatestContent();

    if (videoGrid) renderVideos("all", videoGrid);
    if (featuredVideoGrid) renderVideos("all", featuredVideoGrid);

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderVideos(btn.dataset.filter, videoGrid || featuredVideoGrid);
        });
    });

    const mediaGrid = document.getElementById("media-grid-dynamic");
    const featuredMediaGrid = document.getElementById("media-grid-featured");
    const loadMoreBtn = document.getElementById("load-more-media");
    let currentMediaIndex = 0;
    const itemsPerLoad = 8;

    function renderMedia(start, items, container) {
        if (!container) return;

        const isFeatured = container.id === "media-grid-featured";
        const slice = isFeatured ? mediaData.slice(0, 4) : mediaData.slice(start, start + items);

        slice.forEach(item => {
            const card = document.createElement("div");
            card.className = "media-card reveal glass-panel";
            let tagLabel = "활동내역";
            if (item.type === "article") tagLabel = "신문보도";
            else if (item.type === "column") tagLabel = "전문칼럼";
            else if (item.type === "blog") tagLabel = "블로그 활동";
            else if (item.type === "video") tagLabel = "방송/영상";

            const thumbImg = item.ogImage ? `<img src="${item.ogImage}" alt="${item.title}" class="media-thumb-img" onerror="this.src='assets/media_placeholder.png';">` : `<div class="media-placeholder">📰</div>`;

            card.innerHTML = `
                <div class="media-thumb">${thumbImg}</div>
                <div class="media-content">
                    <div class="media-tag">${tagLabel}</div>
                    <h4>${item.title}</h4>
                    <p class="media-source">${item.source} | ${item.date}</p>
                    <a href="${item.url}" target="_blank" class="media-link">전문 보기 →</a>
                </div>
            `;
            container.appendChild(card);
        });

        if (!isFeatured) {
            currentMediaIndex += items;
            if (currentMediaIndex >= mediaData.length && loadMoreBtn) {
                loadMoreBtn.style.display = "none";
            }
        }
    }

    if (mediaGrid) {
        renderMedia(0, itemsPerLoad, mediaGrid);
        const sentinel = document.createElement("div");
        sentinel.style.height = "10px";
        mediaGrid.after(sentinel);

        const scrollObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && currentMediaIndex < mediaData.length) {
                renderMedia(currentMediaIndex, itemsPerLoad, mediaGrid);
            }
        }, { threshold: 0.1 });
        scrollObserver.observe(sentinel);
    }

    if (featuredMediaGrid) renderMedia(0, 4, featuredMediaGrid);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Book Modal Logic
    const bookDetails = {
        metaverse: {
            title: "A Deep Dive into the Metaverse from ChatGPT",
            sub: "110 Questions, 110 Answers",
            img: "assets/book_metaverse.jpg",
            desc: "10명의 비전문가가 ChatGPT와 함께 단 12시간 만에 메타버스의 본질을 규명하고 서적으로 출간한 혁신적인 프로젝트의 기록입니다. 이 책은 AI가 단순한 도구를 넘어 지식 창조의 파트너가 될 수 있음을 증명합니다.",
            highlights: [
                "제3의 지식 혁명: 문자와 컴퓨터에 이은 AI 기반 지식 생산 패러다임 전환",
                "지식의 민주화: 전문가와 비전문가의 격차를 해소하고 누구나 생산자가 되는 시대",
                "실전 사례: AI를 활용한 폭발적인 생산성과 지식 큐레이션 노하우 공개"
            ],
            link: "https://www.amazon.com/Deep-Dive-into-Metaverse-ChatGPT-ebook/dp/B0BWJYF35F"
        },
        gpt_engineering: {
            title: "챗GPT 엔지니어링",
            sub: "입문자를 위한 생성형 AI 마법상자 열기",
            img: "assets/book_gpt_engineering.jfif",
            desc: "생성형 AI의 기초부터 실무 적용까지, 프롬프트 엔지니어링의 핵심 원리를 다룹니다. 복잡한 기술적 배경지식 없이도 누구나 AI를 비즈니스에 즉시 활용할 수 있도록 돕는 실무 지침서입니다.",
            highlights: [
                "프롬프트 엔지니어링의 핵심 5원칙 마스터",
                "업무 효율을 300% 높여주는 AI 워크플로우 자동화",
                "실제 비즈니스 시나리오별 맞춤형 프롬프트 예제 제공"
            ],
            link: "https://www.yes24.com/product/goods/124154157"
        },
        all_is_well: {
            title: "모든 것이 잘 되고 있어 (ALL IS WELL)",
            sub: "마음과 몸을 치유하는 긍정 확언의 과학",
            img: "assets/book_all_is_well.jfif",
            desc: "루이스 헤이의 치유 철학을 현대 과학과 결합한 명저입니다. 마음의 상태가 신체 건강에 어떻게 영향을 미치는지 탐구하며, 긍정 확언을 통해 더 나은 삶을 만드는 실제적인 방법을 제시합니다.",
            highlights: [
                "심신 상관 의학(Mind-Body Medicine)의 정수를 담은 가이드",
                "내면의 치유력을 깨우는 상황별 긍정 확언 리스트",
                "과학적 연구 데이터로 뒷받침된 회복의 철학"
            ],
            link: "https://www.yes24.com/product/goods/144685063"
        }
    };

    const bookModal = document.getElementById("book-modal");
    const modalBody = document.getElementById("modal-body");
    const closeModal = document.querySelector(".close-modal");

    document.querySelectorAll(".clickable-book").forEach(card => {
        card.addEventListener("click", () => {
            const id = card.dataset.bookId;
            const data = bookDetails[id];
            if (!data) return;

            modalBody.innerHTML = `
                <div class="modal-grid">
                    <img src="${data.img}" alt="${data.title}">
                    <div>
                        <h2 class="modal-title">${data.title}</h2>
                        <p class="modal-sub">${data.sub}</p>
                        <p class="modal-text">${data.desc}</p>
                        <div class="modal-highlights">
                            <ul>
                                ${data.highlights.map(h => `<li>${h}</li>`).join('')}
                            </ul>
                        </div>
                        <a href="${data.link}" target="_blank" class="modal-btn">도서 정보 더보기 →</a>
                    </div>
                </div>
            `;
            bookModal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    if (closeModal) {
        closeModal.onclick = () => {
            bookModal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    if (bookModal) {
        window.onclick = (event) => {
            if (event.target == bookModal) {
                bookModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        };
    }

    // --- Interactive Impact Counter ---
    const impactSection = document.querySelector(".impact-strip") || document.querySelector(".cta-impact");
    let counterStarted = false;

    function runImpactCounters() {
        if (counterStarted) return;
        counterStarted = true;
        const el1 = document.getElementById("attendee-count");
        const el2 = document.getElementById("age-range-start");
        const el3 = document.getElementById("age-range-end");

        if (el1) smoothCountUp(el1, 0, 8092, 2800, true);
        if (el2) smoothCountUp(el2, 1, 6, 1600, false);
        if (el3) smoothCountUp(el3, 10, 88, 2400, false);
    }

    function smoothCountUp(el, start, target, duration, formatComma = true) {
        if (!el) return;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: smooth deceleration
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * ease);
            el.innerText = formatComma ? current.toLocaleString() : current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = formatComma ? target.toLocaleString() : target;
            }
        }
        requestAnimationFrame(update);
    }

    function animateCount(el, target, duration) {
        smoothCountUp(el, 0, target, duration, true);
    }

    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runImpactCounters();
            }
        }, { threshold: 0.2 });
        observer.observe(impactSection);

        // Immediate trigger if already in viewport on load
        setTimeout(() => {
            const rect = impactSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                runImpactCounters();
            }
        }, 350);
    } else {
        setTimeout(runImpactCounters, 400);
    }

    // --- Scroll Reveal Animation Logic ---
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(el => revealObserver.observe(el));
    };

    // --- Subscription Logic ---
    const subscribeBtn = document.getElementById("subscribe-btn");
    const subscribeEmail = document.getElementById("subscribe-email");

    if (subscribeBtn && subscribeEmail) {
        subscribeBtn.addEventListener("click", () => {
            const email = subscribeEmail.value.trim();
            if (!email || !email.includes('@')) {
                alert("올바른 이메일 주소를 입력해 주세요.");
                return;
            }

            subscribeBtn.disabled = true;
            subscribeBtn.textContent = "처리 중...";

            fetch("/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("성공적으로 구독되었습니다! 업데이트 소식을 보내드릴게요.");
                        subscribeEmail.value = "";
                    } else {
                        alert("오류가 발생했습니다. 다시 시도해 주세요.");
                    }
                })
                .catch(err => {
                    console.error("Subscription error:", err);
                    alert("서버 연결에 실패했습니다.");
                })
                .finally(() => {
                    subscribeBtn.disabled = false;
                    subscribeBtn.textContent = "강의안 업데이트 소식 받기";
                });
        });
    }

    // --- Real-time Stats Logic ---
    let currentStats = { total_visitors: 20000, slide_clicks: 3000 };

    function fetchStats() {
        fetch("/api/stats")
            .then(res => res.json())
            .then(stats => {
                currentStats = stats;
                updateDisplay();
            })
            .catch(err => console.error("Stats fetch error:", err));
    }

    function updateDisplay() {
        const visitorEl = document.getElementById("visitor-count-display");
        if (visitorEl) {
            animateCount(visitorEl, currentStats.total_visitors, 1000);
        }

        document.querySelectorAll("[data-stat-key='downloads']").forEach(el => {
            const subKey = el.dataset.statSubkey;
            if (subKey && currentStats.downloads && currentStats.downloads[subKey]) {
                let badge = el.querySelector(".stat-badge");
                if (!badge) {
                    badge = document.createElement("span");
                    badge.className = "stat-badge";
                    el.appendChild(badge);
                }
                badge.textContent = ` ${currentStats.downloads[subKey]}회 다운로드`;
            }
        });

        const slideEl = document.getElementById("slide-click-display");
        if (slideEl) {
            animateCount(slideEl, currentStats.slide_clicks, 1000);
        }
    }

    function incrementStat(key, subKey = null) {
        fetch("/api/stats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key, subKey })
        })
            .then(res => res.json())
            .then(data => {
                if (data.stats) currentStats = data.stats;
                updateDisplay();
            })
            .catch(err => console.error("Stats increment error:", err));
    }

    setInterval(() => {
        if (Math.random() > 0.7) {
            currentStats.total_visitors += 1;
            updateDisplay();
        }
    }, 15000);

    document.addEventListener("click", (e) => {
        const target = e.target.closest("[data-stat-key]");
        if (target) {
            const key = target.dataset.statKey;
            const subKey = target.dataset.statSubkey;
            incrementStat(key, subKey);
        }
    });

    fetchStats();
    setTimeout(() => incrementStat("total_visitors"), 2000);

    // --- Notice Bar Logic ---
    const topNoticeBar = document.getElementById("top-notice-bar");
    const noticeTicker = document.getElementById("notice-ticker");
    const closeNoticeBtn = document.getElementById("close-notice-bar");

    if (topNoticeBar) {
        document.body.classList.add("has-notice-bar");

        fetch('notices.json')
            .then(res => res.json())
            .then(data => {
                const latestNotice = data[0];
                if (latestNotice && noticeTicker) {
                    noticeTicker.innerHTML = `<span class="ticker-item">${latestNotice.title}</span>`;
                }
            })
            .catch(err => console.error("Ticker load error:", err));

        if (closeNoticeBtn) {
            closeNoticeBtn.addEventListener("click", () => {
                topNoticeBar.style.transform = "translateY(-100%)";
                document.body.classList.remove("has-notice-bar");
                setTimeout(() => {
                    topNoticeBar.style.display = "none";
                }, 300);
            });
        }
    }

    revealElements();

    const hamburger = document.getElementById("hamburger");
    const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
    const mobileSidebar = document.getElementById("mobile-sidebar");
    const menuOverlay = document.getElementById("menu-overlay");

    if ((hamburger || mobileMenuTrigger) && mobileSidebar && menuOverlay) {
        const toggleMenu = () => {
            if (hamburger) hamburger.classList.toggle("active");
            mobileSidebar.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            document.body.style.overflow = mobileSidebar.classList.contains("active") ? "hidden" : "auto";
        };

        if (hamburger) hamburger.addEventListener("click", toggleMenu);
        if (mobileMenuTrigger) mobileMenuTrigger.addEventListener("click", toggleMenu);
        menuOverlay.addEventListener("click", toggleMenu);

        mobileSidebar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", toggleMenu);
        });
    }

    // --- Activity Marquee & Full Grid Logic ---
    const rows = [
        document.getElementById("activity-row-1"),
        document.getElementById("activity-row-2"),
        document.getElementById("activity-row-3")
    ];
    const previewRow = document.getElementById("activity-row-preview");
    const fullPhotoGrid = document.getElementById("full-photo-grid");

    if (rows[0] || previewRow || fullPhotoGrid) {
        const photoCount = 45;
        const photosPerRow = 15;
        const extensions = ['jpg', 'png', 'jfif', 'webp', 'jpeg'];

        // 1. 아카이브 전용: 전체 사진 그리드
        if (fullPhotoGrid) {
            for (let i = 1; i <= photoCount; i++) {
                const photoNum = i.toString().padStart(3, '0');
                const card = document.createElement("div");
                card.className = "photo-card reveal";

                const img = document.createElement("img");
                img.loading = "lazy";

                let extIdx = 0;
                const tryLoad = () => {
                    if (extIdx < extensions.length) {
                        img.src = `assets/activity/activity_${photoNum}.${extensions[extIdx]}`;
                        extIdx++;
                    } else { card.remove(); }
                };
                img.onerror = tryLoad;
                tryLoad();

                card.appendChild(img);
                fullPhotoGrid.appendChild(card);
            }
        }

        // 2. 메인 페이지 약식 노출 (12개만)
        if (previewRow) {
            for (let j = 0; j < 12; j++) {
                const photoNum = (j + 1).toString().padStart(3, '0');
                const img = document.createElement("img");
                img.className = "activity-img";
                let extIdx = 0;
                const tryLoad = () => {
                    if (extIdx < extensions.length) {
                        img.src = `assets/activity/activity_${photoNum}.${extensions[extIdx]}`;
                        extIdx++;
                    } else { img.remove(); }
                };
                img.onerror = tryLoad;
                tryLoad();
                previewRow.appendChild(img);
            }
        }

        // 3. 서브페이지 마퀴 노출 (무한 루프)
        rows.forEach((row, rowIndex) => {
            if (!row) return;
            const startIdx = rowIndex * photosPerRow + 1;
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < photosPerRow; j++) {
                    const photoNum = (startIdx + j).toString().padStart(3, '0');
                    const img = document.createElement("img");
                    img.className = "activity-img";
                    let extIdx = 0;
                    const tryLoadMarquee = () => {
                        if (extIdx < extensions.length) {
                            img.src = `assets/activity/activity_${photoNum}.${extensions[extIdx]}`;
                            extIdx++;
                        } else { img.remove(); }
                    };
                    img.onerror = tryLoadMarquee;
                    tryLoadMarquee();
                    row.appendChild(img);
                }
            }
        });
    }

    // Hero Badge Slider Logic
    const badgeText = document.getElementById("typewriter-text");
    if (badgeText) {
        const keywords = ["전략 기획자", "생성형 AI 전문가", "치유 철학가", "디지털 전환 가이드"];
        let count = 0;

        setInterval(() => {
            badgeText.style.opacity = 0;
            setTimeout(() => {
                count = (count + 1) % keywords.length;
                badgeText.textContent = keywords[count];
                badgeText.style.opacity = 1;
            }, 500);
        }, 3000);
    }
});
