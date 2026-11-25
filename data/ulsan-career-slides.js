// 2026 울산광역시·권역 청소년진로지원센터 AX 전략 60분 시네마틱 슬라이드 마스터 데이터 (58장 · M1~M4)
window.ULSAN_CAREER_MODULES = [
    { id: 'M1', code: 'M1', title: 'AX 패러다임 시프트', time: '15:30~15:42 (12분)', startIdx: 0, count: 14, accent: '#10B981', secondary: '#38BDF8', orb1: '#065F46', orb2: '#1E3A8A' },
    { id: 'M2', code: 'M2', title: '초개인화 진로·학습 지도', time: '15:42~15:58 (16분)', startIdx: 14, count: 16, accent: '#38BDF8', secondary: '#A78BFA', orb1: '#075985', orb2: '#4C1D95' },
    { id: 'M3', code: 'M3', title: '보안 거버넌스 & 울산 협력망', time: '15:58~16:15 (17분)', startIdx: 30, count: 16, accent: '#F43F5E', secondary: '#10B981', orb1: '#881337', orb2: '#065F46' },
    { id: 'M4', code: 'M4', title: '현장 Q&A & 액션 플랜', time: '16:15~16:30 (15분)', startIdx: 46, count: 12, accent: '#F59E0B', secondary: '#10B981', orb1: '#78350F', orb2: '#064E3B' }
];

window.ULSAN_CAREER_PROMPTS = {
    p1: `[역할] 너는 대한민국 울산광역시 청소년진로지원센터의 15년 차 수석 진로상담 코치다.
[핵심 원칙] 학생에게 특정 직업을 단정하거나 정답을 주지 마라. 학생이 모국어로 자신의 생각·가치관·강점을 깊이 언어화할 수 있도록 소크라테스식 열린 질문만 설계하라.
[비식별 학생 정보]
- 학년/계열: [예: 울산 소재 일반고 1학년]
- 흥미·몰입 경험: [예: 드론 조립, 친구들 고민 들어주기, 영상 편집]
- 선호 활동 스타일: [예: 혼자 책 읽기보다 팀으로 결과물 만들기 선호]
- 현재 고민: [예: 성적에 맞춰 학과를 가야 할지, 좋아하는 걸 해야 할지 혼란]
[요청 산출물]
1. 학생의 숨은 강점과 가치관을 끌어내는 3단계 소크라테스식 상담 질문 (탐색 3문항 → 심화 3문항 → 가치판단 2문항)
2. 상담사가 피해야 할 닫힌 질문 예시 2가지와 대안 표현
3. 학생이 상담 후 집에서 스스로 적어볼 '나만의 1줄 핵심 질문' 워크시트 문항`,

    p2: `[역할] 너는 지역 산업 전환(AX)과 미래 노동시장에 정통한 청소년 진로 전략가다.
[지역 맥락] 울산광역시의 산업 전환 축(① 미래차·전기차·제조 AI ② 조선해양·스마트선박 ③ 이차전지·수소·그린에너지 ④ AI 데이터센터·디지털 인프라 ⑤ AI 서비스·지역문화·헬스케어)을 반영하라.
[비식별 학생 키워드] [예: 중3 / 수학보다 시각 디자인과 환경 문제에 관심 많음]
[요청 산출물]
1. 학생의 키워드와 울산의 미래 산업 전환을 교차 결합한 '융합 신직군/역할' 3가지 (전통 직업명 나열 금지, 수행 과업 중심으로 설명)
2. 각 트랙별로 울산 5개 구·군 진로센터 및 꿈길에서 연계할 만한 오프라인 체험 아이디어
3. 고교 진학~대학/직업교육(VET) 단계별 3년 동적 탐색 로드맵 (표 형식)
[제약] 존재하지 않는 대학 학과나 국가자격증을 지어내지 말고, 확인이 필요한 정보는 [현장 확인 필요]로 표기하라.`,

    p3: `[역할] 너는 청소년의 '인지 부채(Cognitive Debt)'를 예방하고 모국어 기반 비판적 사고력을 길러주는 AI 리터러시 교육 설계자다.
[대상] [예: 중학교 2학년 진로캠프 참가자 20명 / 50분 오프라인 수업]
[주제] [예: "AI가 바꿀 10년 뒤 나의 직업, 인간만이 지켜야 할 가치는 무엇일까?"]
[요청 산출물]
1. 50분 오프라인 활동 구성안 (도입 10분 - AI 답변 오류 찾기 15분 - 모국어 질문 재설계 15분 - 가치판단 토론 10분)
2. 학생들이 AI에게 던진 '나쁜 1차원 질문' 3개와 이를 '본질을 꿰뚫는 좋은 질문'으로 업그레이드하는 비교 예시표
3. 학생 스스로 AI 답변을 검증하는 3단계 팩트체크 질문 카드 (출처 · 편향 · 나의 가치관)`,

    p4: `[역할] 너는 따뜻하고 전문적인 공공 청소년진로지원센터의 진로상담사다.
[입력: MASK-5 비식별 상담 메모]
- 대상: [학생A / 중3]
- 오늘 상담에서 발견한 강점 3가지: [키워드 입력]
- 학생이 직접 표현한 관심사/고민: [키워드 입력]
- 추천 후속 오프라인 활동(울산 센터/꿈길): [활동명 입력]
[요청 산출물]
1. [학생용] 자기효능감을 높여주는 격려 메시지 + 다음 2주간 실천할 작은 탐색 미션 2가지 (친근하고 존중하는 어조, 300자 내외)
2. [학부모용] 사교육 불안 대신 가정에서 나눌 수 있는 긍정적 진로 대화 질문 3가지 + 센터 후속 프로그램 안내 (정중하고 신뢰감 있는 어조, 400자 내외)
[필수 하단 표기 — 2026 AI 기본법 준수]
"※ 본 안내문은 비식별화된 상담 핵심 키워드를 바탕으로 생성형 AI의 초안 작성을 보조받아, 담당 진로상담사가 최종 검수·확정하였습니다."`,

    p5: `[역할] 너는 공공 교육기관 성과 분석 및 권역 협력 프로그램 기획 컨설턴트다.
[입력 데이터] (개인정보가 완전히 제거된 익명 설문 주관식 응답 30건 붙여넣기)
[요청 산출물]
1. 청소년·학부모 주관식 응답의 핵심 긍정 요인 TOP 3와 개선 요구 TOP 3 (빈도 및 대표 익명 인용 포함)
2. 울산 5개 구·군 진로센터(중·남·동·북·울주)가 특화 인프라를 분담해 공동 개설할 수 있는 차기 분기 프로그램 2종 기획안
3. 지자체·교육청 성과공유회 보고용 5줄 요약(Executive Summary) 및 차기 예산 제안 논거 3가지`
};

window.ULSAN_CAREER_SLIDES = [
    // ================= M1 (01 ~ 14) =================
    {
        num: 1, mod: 'M1', trans: 'zoom', sec: 40,
        badge: '2026.12.03 · 울산광역시·권역 청소년진로지원센터 AX 마스터클래스',
        title: 'AI 시대, 청소년 진로센터의<br><span class="grad-emerald">새 판을 짜다</span>',
        layout: 'hero',
        subtitle: '청소년 초개인화 학습·진로 지도 극대화 및 안전한 데이터 보안 기반 기관 간 AX 협력 전략',
        meta: ['강사: 정우진 (『챗GPT 엔지니어링』 저자 · CloudBread)', '대상: 울산 5개 구·군 진로센터 · 진로상담사 · 교육청/지자체 담당자', '총 60분 · 4모듈 58슬라이드 시네마틱 에디션'],
        notes: '안녕하십니까, 『챗GPT 엔지니어링』 저자 정우진입니다. 오늘 60분 동안 울산광역시와 5개 구·군 청소년진로지원센터, 교육청·지자체 담당자 여러분과 함께 AI 시대 초개인화 진로지도와 기관 간 협력의 새 판을 설계해 보겠습니다.'
    },
    {
        num: 2, mod: 'M1', trans: 'morph', sec: 50,
        badge: '울산제일일보 기고 칼럼 (2026.11.19)',
        title: '수능 고사장은 <span class="grad-rose">스마트 기기 단속</span> 전장이었다',
        layout: 'editorial-focus',
        bigText: '2026.11.19',
        points: [
            { icon: 'fa-radar', title: '탐지 장비와 단속 인력 총동원', desc: '수능·LEET 등 국가시험 첨단 기기 악용 우려 속 소극적 방어전' },
            { icon: 'fa-bolt', title: '낡은 시험 제도의 파열음', desc: '단순 일탈이 아니라 거대한 문명 충돌의 서막' },
            { icon: 'fa-brain', title: '생성형 AI가 수능 만점을 받는 시대', desc: '기기를 막는 단속만으로 시대의 물줄기를 결코 막을 수 없다' }
        ],
        notes: '불과 2주 전, 11월 19일 수능 고사장은 스마트 기기 탐지 전장이었습니다. 기기를 막는 소극적 방어전만으로는 시대의 물줄기를 막을 수 없습니다. AI가 이미 수능 만점을 받는 시대에 낡은 시험 제도의 틈새에서 터져 나오는 거대한 문명 충돌의 파열음입니다.'
    },
    {
        num: 3, mod: 'M1', trans: 'morph', sec: 50,
        badge: 'PARADIGM SHIFT · 18세기 → 21세기 AX',
        title: '18세기 산업혁명형 <span class="grad-cyan">암기 교육</span>은 수명을 다했다',
        layout: 'vs-split',
        leftTitle: '수명이 다한 18세기 교육 모델',
        leftItems: ['단순 암기와 지식 재생산', '기계적 계산과 반복 문제풀이', '정형화된 외국어 구사력 중심 평가', '획일적 표준화 시험과 줄 세우기'],
        rightTitle: 'AI가 무료·실시간으로 대체한 영역',
        rightItems: ['초고속 지식 검색·요약·구조화', '복잡한 수식·데이터·코드 즉시 연산', '실시간 다국어 동시 통·번역', '이제 교육을 재정의할 골든타임'],
        notes: '챗GPT가 등장한 2022년 11월 30일 이후 단순 암기, 기계적 계산, 정형화된 외국어에 매달려온 18세기 산업혁명형 모델은 이미 수명을 다했습니다. 교육을 재정의할 골든타임이 지금 흐르고 있습니다.'
    },
    {
        num: 4, mod: 'M1', trans: 'push-h', sec: 50, timeline: 'GLOBAL CONSENSUS · 01 / 04',
        badge: 'OECD · 안드레아스 슐라이허 교육국장',
        title: '"AI는 문을 두드리지 않고 <span class="grad-emerald">Wi-Fi</span>를 타고 들어왔다"',
        layout: 'quote-hero',
        quote: '“생성형 AI는 학교 문을 예의 바르게 두드리지 않았다. Wi-Fi를 타고 이미 들어왔다. 이제 모든 교육체계가 마주한 질문은 하나다. AI를 우연에 방치할 것인가, 아니면 설계(Design)로 이끌 것인가?”',
        quoteEn: '“Generative AI did not knock politely on the schoolhouse door. It came in through the Wi-Fi... Will AI drift into classrooms by accident, or will we govern it by design?”',
        author: '안드레아스 슐라이허 (Andreas Schleicher, OECD 교육국장)',
        tags: ['#ThinkBeforeYouPrompt', '#PISA_AI리터러시', '#OECD_ODiCY'],
        notes: 'OECD 안드레아스 슐라이허 교육국장은 AI를 우연에 방치할 것인가 설계로 통제할 것인가를 묻습니다. OECD는 학생들이 프롬프트를 입력하기 전에 먼저 생각하는 법(Think before they prompt)을 배워야 한다고 강조합니다.'
    },
    {
        num: 5, mod: 'M1', trans: 'push-h', sec: 50, timeline: 'GLOBAL CONSENSUS · 02 / 04',
        badge: 'UNESCO AI 역량 프레임워크 (2024.08)',
        title: '챗봇 조작을 넘어 <span class="grad-cyan">4대 영역 · 12개 역량</span>으로',
        layout: 'four-pillars',
        pillars: [
            { num: '01', title: '인간 중심 마인드셋', desc: '인간의 주체성(Agency), 감독 책임, 존엄과 웰빙을 최우선에 두는 태도' },
            { num: '02', title: 'AI 윤리 (Ethics)', desc: '알고리즘 편향, 프라이버시, 데이터센터 환경 영향과 사회적 책임' },
            { num: '03', title: 'AI 기술과 응용', desc: '머신러닝·데이터·확률적 작동 원리의 구조적 이해' },
            { num: '04', title: 'AI 시스템 설계', desc: '수동적 소비자를 넘어 지속 가능한 AI를 공동 창작(Co-create)하는 힘' }
        ],
        footerBar: '3단계 숙달 경로: 이해 (Understand)  →  적용 (Apply)  →  창조 (Create)',
        notes: '유네스코가 2024년 8월 발표한 학생 AI 역량 프레임워크는 단순 프롬프트 조작을 넘어 4대 영역 12개 역량을 제시합니다. 1순위가 기술이 아니라 인간 중심 마인드셋과 AI 윤리라는 점에 주목해야 합니다.'
    },
    {
        num: 6, mod: 'M1', trans: 'push-h', sec: 55, timeline: 'GLOBAL CONSENSUS · 03 / 04',
        badge: 'WEF Future of Jobs 2025 & OECD PISA',
        title: '기술은 질주하는데, <span class="grad-gold">청소년의 진로 나침반</span>은 멈춰 있다',
        layout: 'dual-kpi',
        kpis: [
            { val: 39, suffix: '%', label: '2030년까지 변화할 핵심 직무 역량', sub: 'WEF Future of Jobs Report 2025 — AI·빅데이터 급증과 동시에 분석적·창의적 사고·공감이 최상위 유지', color: '#38BDF8' },
            { val: 40, suffix: '%', label: '미래 진로에 불확실성·혼란을 호소하는 15세 청소년', sub: 'OECD PISA 진로 준비도 조사 — 전통적 직업 선호와 실제 미래 노동시장 수요 간의 심각한 미스매치', color: '#F59E0B' }
        ],
        notes: 'WEF 2025 보고서에 따르면 2030년까지 핵심 직무 역량의 39%가 바뀝니다. 동시에 OECD PISA 조사에서 만 15세 청소년의 약 40%, 10명 중 4명이 진로 불확실성을 호소합니다. 이것이 진로센터 AX의 절박한 근거입니다.'
    },
    {
        num: 7, mod: 'M1', trans: 'push-h', sec: 40, timeline: 'GLOBAL CONSENSUS · 04 / 04',
        badge: 'Stanford HAI & ISTE · ASCD',
        title: '기술 속도와 <span class="grad-cyan">정책 지체(Policy Lag)</span>의 간극을 메우라',
        layout: 'two-cards',
        cards: [
            { tag: 'Stanford HAI · Accelerator for Learning', title: '학습과학 기반 생태계 전환', desc: 'AI 모델의 기하급수적 발전 속도와 학교 정책 간의 거대한 Policy Lag 경고. 개별 툴 보급을 넘어 연구-실천 생태계 구축 촉구.' },
            { tag: 'ISTE · ASCD AI Framework', title: '목적 중심 AI 통합 (Purpose-driven)', desc: '부정행위 공포와 기술만능주의를 모두 경계. 교사·상담사가 직접 윤리적 가드레일을 공동 설계하고 인간관계를 보호.' }
        ],
        notes: '스탠퍼드 HAI는 기술 속도와 정책 지체의 간극을 경고하고, ISTE는 공포나 기술만능주의를 넘어 현장의 교사·상담사가 직접 가드레일을 설계하는 목적 중심 통합을 주문합니다.'
    },
    {
        num: 8, mod: 'M1', trans: 'morph', sec: 55,
        badge: '세계적 석학 5인의 진단 (1/2)',
        title: '크리스 디디(하버드) & <span class="grad-emerald">에단 몰릭(와튼)</span>',
        layout: 'scholar-pair',
        scholars: [
            { name: '크리스 디디 (Chris Dede)', role: '하버드 교육대학원 석좌교수', quote: '“사회의 다른 모든 영역이 극적으로 변하는 시대에, 아이들을 과거와 똑같이 가르치는 것이야말로 우리가 행할 수 있는 가장 위험한 실험이다.”', tags: ['지능 증강(IA)', '목표·교육과정·평가 동시 재설계'] },
            { name: '에단 몰릭 (Ethan Mollick)', role: '펜실베이니아대 와튼스쿨 · 『Co-Intelligence』', quote: '“AI가 교육에 가하는 가장 큰 위협은 숙제의 파괴가 아니라, 정규 교육 이후에 존재하던 ‘도제(신입 수련) 사다리’의 붕괴다.”', tags: ['공동지능', '소크라테스 튜터·코치·시뮬레이터'] }
        ],
        notes: '하버드 크리스 디디 교수는 과거 방식 그대로 가르치는 것이 가장 위험한 실험이라 경고하고, 와튼 에단 몰릭 교수는 신입이 초급 업무를 통해 크던 도제 사다리의 붕괴를 경고합니다. 진로센터가 실전 문제해결 경험을 미리 설계해야 하는 이유입니다.'
    },
    {
        num: 9, mod: 'M1', trans: 'morph', sec: 55,
        badge: '세계적 석학 5인의 진단 (2/2)',
        title: '살만 칸 · <span class="grad-cyan">로즈 럭킨</span> · 용 자오',
        layout: 'three-bento',
        items: [
            { icon: 'fa-graduation-cap', title: '살만 칸 (칸아카데미)', sub: '『Brave New Words』 (2024)', desc: '1:1 개인 교습의 블룸 2-시그마 문제를 소크라테스 AI 튜터로 대중화 → 고가 사교육 격차 해소.' },
            { icon: 'fa-lightbulb', title: '로즈 럭킨 (UCL 교수)', sub: '7-Step AI Readiness Framework', desc: '“AI는 단어를 이해하지 못한다. 의미를 부여할 수 있는 존재는 오직 인간뿐. AI는 우리를 더 똑똑하게 만드는 도구여야 한다.”' },
            { icon: 'fa-compass', title: '용 자오 (캔자스대 교수)', sub: '기술만능주의(Tech-Solutionism) 비판', desc: '19세기 표준화 학교 틀에 챗봇만 얹어선 안 된다. 학생 고유 강점과 지역 맥락에 뿌리내린 주체적 진로(Agency)로 전환.' }
        ],
        notes: '살만 칸은 1:1 개인 교습의 대중화를, 로즈 럭킨은 오직 인간만이 의미를 부여할 수 있음을, 용 자오는 19세기 틀에 챗봇만 얹지 말고 학생 강점과 지역 맥락을 살리는 주체적 진로를 강조합니다.'
    },
    {
        num: 10, mod: 'M1', trans: 'morph', sec: 65,
        badge: 'KILLER EMPIRICAL EVIDENCE · WHARTON / PNAS 2025',
        title: '가드레일 없는 AI의 역설: <span class="grad-emerald">+48%</span>의 착시와 <span class="grad-rose">-17%</span>의 충격',
        layout: 'chart-wharton',
        notes: '오늘 강연의 킬러 데이터입니다. 와튼스쿨 연구진이 고교생 약 1,000명을 실험한 결과, 일반 ChatGPT는 연습 점수를 +48% 끌어올렸지만 AI를 치운 본시험에서는 미사용 집단보다 오히려 -17% 하락했습니다. 반면 소크라테스 힌트 가드레일을 넣은 GPT Tutor는 학습 손실을 완벽히 방어했습니다. 단기 산출물(생산성)과 장기 역량(학습)은 다릅니다.'
    },
    {
        num: 11, mod: 'M1', trans: 'morph', sec: 55,
        badge: '뇌과학(MIT) & HCI(Microsoft Research) 실증 경고',
        title: '<span class="grad-rose">인지 부채(Cognitive Debt)</span>와 신뢰의 역설',
        layout: 'two-cards',
        cards: [
            { tag: 'MIT Media Lab EEG 연구 (Kosmyna et al., 2025 · N=54)', title: '“Your Brain on ChatGPT” — 인지 부채 누적', desc: '뇌파(EEG) 측정 결과 Brain-only > 검색 > LLM 순으로 신경 연결성 급감. AI 제거 후에도 뇌 활성·기억 인출 저하 지속, 글에 대한 주인의식(Ownership) 최저치.' },
            { tag: 'Microsoft Research (Lee et al., CHI 2025 · ~1,000건 과업)', title: '신뢰의 역설 (Confidence Paradox)', desc: '생성형 AI에 대한 신뢰도가 높을수록 사용자의 비판적 사고 노력은 유의미하게 감소. 반면 자기 판단 확신이 높을수록 비판적 검증 활성화.' }
        ],
        notes: '2025년 MIT 미디어랩 EEG 뇌파 연구는 LLM 의존이 뇌 신경 연결성을 약화시키고 인지 부채를 쌓는다는 것을, 마이크로소프트 연구는 AI를 믿을수록 비판적 사고가 줄어드는 신뢰의 역설을 증명했습니다.'
    },
    {
        num: 12, mod: 'M1', trans: 'zoom', sec: 60,
        badge: '아놀드 토인비의 ‘도전과 응전’ · 강연자 핵심 철학',
        title: 'AI를 부리는 <span class="grad-gold">인간 고유의 2대 경쟁력</span>',
        layout: 'two-pillars-gold',
        pillars: [
            { num: '01', title: '모국어를 깊이 있게 다루는 힘', desc: '모국어로 정교하게 사유하고, 본질을 꿰뚫는 질문을 던지며, 맥락을 읽어내는 능력 — AI를 부리는 가장 단단한 토대' },
            { num: '02', title: '인간 본성에 뿌리를 둔 가치판단과 철학적 사유', desc: 'AI는 확률과 데이터로 답할 뿐, 삶의 무게와 윤리적 책임을 짊어지는 인간 고유의 판단 체계를 결코 대신할 수 없다' }
        ],
        notes: '토인비가 말한 도전과 응전처럼, 방금 보신 뇌과학·교육경제학 연구가 입증한 인간 최후의 경쟁력은 두 가지입니다. 모국어로 깊이 사유하고 질문하는 힘, 그리고 삶의 무게와 윤리적 책임을 지는 인간 고유의 가치판단입니다.'
    },
    {
        num: 13, mod: 'M1', trans: 'morph', sec: 55,
        badge: 'CAREER GUIDANCE PARADIGM SHIFT',
        title: '정적(Static) 탐색에서 <span class="grad-emerald">동적·초개인화(Dynamic)</span> 지도로',
        layout: 'compare-table',
        headers: ['비교 차원', '기존 정적(Static) 진로 탐색', 'AI 시대 동적·초개인화(Dynamic) 진로 지도'],
        rows: [
            ['진단 주기', '학기 초 1회성 적성·흥미 검사 (스냅샷)', '학습·체험 반응에 따라 수시 갱신되는 상시 프로파일링'],
            ['직업 정보', '인쇄된 직업사전·고정 직업명 중심', 'WEF·울산 산업 AX 반영 실시간 과업·역량(Skill) 매핑'],
            ['상담 방식', '상담사 1인의 다수 일방향 설명', 'AI 1차 종합 + 상담사 1:1 심층 공감 (증강 상담)'],
            ['학생 역할', '검사 결과의 수동적 소비자', '소크라테스 질문에 모국어로 답하는 능동적 설계자(Agent)']
        ],
        notes: '이제 1회성 검사지와 고정된 직업사전의 시대를 끝내고, 실시간 산업 변화와 학생의 반응을 연결하는 동적·초개인화 증강 상담으로 전환해야 합니다.'
    },
    {
        num: 14, mod: 'M1', trans: 'morph', sec: 40,
        badge: 'M1 BRIDGE → MODULE 02',
        title: '지방 <span class="grad-rose">AI 사교육 격차</span>를 막는 최후의 방파제',
        layout: 'bridge',
        lead: '‘모두의 AI’ 시대에도 일선 현장이 일회성 특강에 머물면, 지방 청소년은 또다시 고가의 AI 사교육 부담으로 내몰린다.',
        highlight: '초기 진입 장벽을 넘는 해법 = 오프라인 현장 밀착 교육망 → 울산 청소년진로지원센터',
        nextLabel: 'NEXT · M2 생성형 AI 활용 초개인화 진로·학습 지도법 (16분)',
        notes: '수도권 중심과 일회성 특강에 머물면 지방은 또다시 AI 사교육 격차로 내몰립니다. 오프라인 밀착 교육망의 심장이 바로 여기 울산 진로센터입니다. 이제 M2에서 세계 선도 사례와 실무 프롬프트 5종을 살펴보겠습니다.'
    },

    // ================= M2 (15 ~ 30) =================
    {
        num: 15, mod: 'M2', trans: 'zoom', sec: 40,
        badge: 'MODULE 02 · 15:42 ~ 15:58 (16분)',
        title: '정답 자판기에서 <span class="grad-cyan">소크라테스식 AI 코치</span>로',
        layout: 'module-opener',
        subtitle: '글로벌 공교육 선도 사례(싱가포르·에스토니아·미국)부터 울산 진로상담사 전용 프롬프트 5종 실전 해부까지',
        metrics: ['글로벌 3개국 심층 벤치마킹', '울산 관내 학교 실전 검증', '현장 즉시 복사 프롬프트 5종'],
        notes: '두 번째 모듈입니다. AI를 정답 자판기가 아니라 학생 스스로 질문하게 만드는 소크라테스식 진로 코치로 바꾸는 글로벌 사례와 실무 프롬프트 5종을 확인하겠습니다.'
    },
    {
        num: 16, mod: 'M2', trans: 'morph', sec: 55,
        badge: 'THEORETICAL FOUNDATION · BLOOM 2-SIGMA',
        title: '1:1 개인 교습의 마법을 <span class="grad-emerald">공공 진로센터</span>로',
        layout: 'three-bento',
        items: [
            { icon: 'fa-ban', title: '원칙 1. 정답 금지 (No Direct Answers)', sub: '인지 부채 원천 차단', desc: '특정 직업이나 학과를 단정하지 않고, 학생 스스로 탐색하도록 열린 질문만 제시.' },
            { icon: 'fa-stairs', title: '원칙 2. 비계 설정 (Scaffolding)', sub: '블룸 2-시그마 대중화', desc: '학생의 현재 수준과 흥미에 맞춰 한 단계씩 사고를 확장하는 맞춤형 힌트 제공.' },
            { icon: 'fa-user-shield', title: '원칙 3. 인간 감독 (Human-in-the-loop)', sub: '상담사 1:1 밀착 코칭', desc: 'AI는 정보 종합·초안 생성을 맡고, 정서적 공감과 최종 판단은 반드시 상담사가 수행.' }
        ],
        notes: '1:1 개인 교습 시 성취도가 표준편차 2배 상승한다는 블룸의 2-시그마 문제를 이제 공공 진로센터가 소크라테스 3원칙—정답 금지, 비계 설정, 인간 감독—으로 보편화할 수 있습니다.'
    },
    {
        num: 17, mod: 'M2', trans: 'push-h', sec: 60, timeline: 'GLOBAL CASE TOUR · 01 / 04',
        badge: 'SINGAPORE · MOE EdTech Masterplan 2030',
        title: '싱가포르: 국가 플랫폼(<span class="grad-cyan">SLS</span>)에 심은 소크라테스 AI',
        layout: 'three-bento',
        items: [
            { icon: 'fa-comments', title: 'LEA (Learning Assistant)', sub: '가드레일 스캐폴딩', desc: '정답을 직접 주지 않고 유도 질문을 던지며 주제 이탈 프롬프트를 자동 차단.' },
            { icon: 'fa-check-double', title: 'ShortAnsFA & ACP', sub: '교사 승인 강제 시스템', desc: '피드백·수업 초안을 AI가 생성하되, 반드시 교사가 최종 검토·승인해야 학생에게 전달.' },
            { icon: 'fa-file-signature', title: 'Appraiser Testimonial', sub: '보안 LLM 행정 감축', desc: '보안 통제 환경에서 학생 추천서·진로 평가서 초안을 작성해 교사 행정 시간 대폭 절감.' }
        ],
        notes: '싱가포르 교육부는 일반 챗봇을 방치하지 않고 국가 학습 플랫폼 SLS 안에 소크라테스 AI(LEA)를 내장했습니다. 특히 모든 AI 피드백이 교사 승인 버튼을 거쳐야만 학생에게 전달되도록 설계했습니다.'
    },
    {
        num: 18, mod: 'M2', trans: 'push-h', sec: 50, timeline: 'GLOBAL CASE TOUR · 02 / 04',
        badge: 'SINGAPORE · 연령별 단계화 & 생애주기 진로',
        title: '어릴수록 <span class="grad-emerald">오프라인 중심</span>, 성장할수록 생애 진로로',
        layout: 'steps-3',
        steps: [
            { step: 'PHASE 1 · 초등 P1~P3', title: '인쇄물·대면 중심 (챗봇 전면 배제)', desc: '기초 문해력과 사고력 보호를 위해 챗봇 직접 노출 차단, 일상 속 AI 개념만 체험.' },
            { step: 'PHASE 2 · 초등 고학년~중고등', title: '통제된 SLS 가드레일 AI 순차 개방', desc: '발달 단계에 맞춰 소크라테스식 학습 보조와 비판적 검증 훈련 단계적 확대.' },
            { step: 'PHASE 3 · 청년·성인 MySkillsFuture', title: '국가 AI 준비도 진단 & 인증 연계', desc: '학령기 교육이 성인기 평생 진로·직업 역량 인증 포털로 끊김 없이 연결.' }
        ],
        notes: '싱가포르의 지혜는 연령별 단계화입니다. 초등 저학년은 챗봇을 아예 쓰지 않고 기초 문해력을 다지며, 성장하면서 가드레일 AI와 성인기 MySkillsFuture 생애 진로로 자연스럽게 이어집니다.'
    },
    {
        num: 19, mod: 'M2', trans: 'push-h', sec: 65, timeline: 'GLOBAL CASE TOUR · 03 / 04',
        badge: 'ESTONIA · AI Leap (TI Hüpe, 2025~2026)',
        title: '에스토니아 전국 고교 전면 도입이 증명한 <span class="grad-cyan">교사 우선 AX</span>',
        layout: 'chart-estonia',
        notes: '2025~2026년 세계 교육계가 가장 주목한 에스토니아 AI Leap 프로젝트입니다. 전국 고등학교 156개교 중 154개교에 전면 도입한 결과, 교사 AI 활용률 94%, 교수법 근본 재설계 63%, 주당 평균 2시간의 행정 시간 절감이라는 경이로운 성과를 냈습니다.'
    },
    {
        num: 20, mod: 'M2', trans: 'push-h', sec: 55, timeline: 'GLOBAL CASE TOUR · 04 / 04',
        badge: 'ESTONIA · 자국어 튜터 ‘ITI’ & 직업계고(VET) 확장',
        title: '모국어 사고를 깨우는 <span class="grad-emerald">‘ITI’</span>와 직업계고(VET) 확산',
        layout: 'two-cards',
        cards: [
            { tag: '자국어 소크라테스 튜터 앱 ITI', title: '완성 답안 금지 · 모국어 사고 구조화', desc: 'OpenAI와 에스토니아 교육·언어 연구진이 공동 개발. 에스토니아어(모국어)로 생각을 구조화하고 스스로 결론을 내도록 질문만 유도.' },
            { tag: '2026/27학년도 전면 확장 전략', title: '교사 PLC 우선 → 직업계고(VET) 확산', desc: '학생보다 교사에게 먼저 유료 모델과 동료 학습공동체(PLC)를 지원. 2026/27학년도부터 직업교육훈련(VET)으로 전면 확대 중.' }
        ],
        notes: '에스토니아의 ITI 앱은 자국어로 생각을 구조화하도록 유도 질문만 던지며, 2026/27학년도에는 직업계고(VET)로 전면 확장 중입니다. 산업도시 울산의 특성화고와 진로센터가 즉각 벤치마킹해야 할 모델입니다.'
    },
    {
        num: 21, mod: 'M2', trans: 'push-h', sec: 50,
        badge: 'USA · Khanmigo 공립학군 & 애리조나주립대(ASU)',
        title: '가상 직업인 롤플레잉과 <span class="grad-cyan">안전한 진로 시뮬레이션</span>',
        layout: 'two-cards',
        cards: [
            { tag: '미국 공립학군 · Khanmigo', title: '가상 직업인 인터뷰 & 교사 도구 무료화', desc: '소크라테스 코칭에 더해 관심 직업인·역사 인물과 대화하는 진로 롤플레잉 제공. 교사용 행정 도구 무료화로 공립학군 장벽 해소.' },
            { tag: '애리조나주립대 (ASU)', title: 'Zero-Data-Retention 전 캠퍼스 진로 코치', desc: '학생 데이터 학습을 차단한 엔터프라이즈 보안 협약 아래 전공 탐색 코치와 가상 면접·커뮤니케이션 시뮬레이터 보급.' }
        ],
        notes: '미국 공립학군과 애리조나주립대는 학생이 사회에 나가기 전에 안전한 AI 시뮬레이션 공간에서 가상 직업인과 인터뷰하고 면접을 수십 번 연습할 수 있게 지원합니다.'
    },
    {
        num: 22, mod: 'M2', trans: 'morph', sec: 60,
        badge: 'KOREA & ULSAN · 국내 인프라와 울산 학교 현장 실전',
        title: '커리어넷·꿈길의 한계를 넘어 <span class="grad-emerald">울산 현장</span>으로',
        layout: 'two-cards',
        cards: [
            { tag: '교육부 · 커리어넷 & 꿈길 (2025~2026)', title: '1차 AI 탐색 → 2차 오프라인 심층 상담', desc: '6대 표준 체험유형과 인증제 인프라는 탄탄하나, 체험 전·후를 잇는 초개인화 동적 포트폴리오와 상담사 문서 자동화 공백 존재.' },
            { tag: 'CloudBread 울산 관내 중·고교 실전 검증', title: '농소중·고헌중·천곡중·삼산고·성신고·화봉중', desc: '“답은 주지 말고 힌트만 줘” 소크라테스 코칭 실습으로 숙제 베끼기 차단 및 자기주도 질문력 폭발 확인 → 이제 진로센터 표준 무기로!' }
        ],
        notes: '울산의 농소중·고헌중·천곡중·삼산고·성신고 등 현장에서 아이들에게 정답 대신 힌트를 요구하는 소크라테스 코칭을 직접 가르쳐 본 결과 반응이 폭발적이었습니다. 이제 이것을 진로센터의 표준 도구로 장착할 때입니다.'
    },
    {
        num: 23, mod: 'M2', trans: 'morph', sec: 60,
        badge: 'PROMPT ENGINEERING FRAMEWORK',
        title: '진로상담사를 위한 프롬프트 4대 황금 원칙 (<span class="grad-cyan">R-C-G-F</span>)',
        layout: 'four-pillars',
        pillars: [
            { num: 'R', title: 'Role (전문 역할)', desc: '“울산광역시 청소년진로지원센터 15년 차 수석 진로상담 코치”로 명확한 페르소나 부여' },
            { num: 'C', title: 'Context (비식별 맥락)', desc: 'MASK-5로 개인정보를 지운 학생 흥미·몰입 경험과 울산 지역 산업 맥락 주입' },
            { num: 'G', title: 'Guardrail (소크라테스 제약)', desc: '“직업을 단정하거나 정답을 주지 말고, 모국어 사유를 여는 열린 질문만 설계하라”' },
            { num: 'F', title: 'Format & Verify (구조·검증)', desc: '표/워크시트 양식 지정 + “미확인 학과·자격증은 [현장 확인 필요] 표기”로 환각 차단' }
        ],
        footerBar: '지금부터 R-C-G-F 공식이 적용된 울산 진로상담사 실무 프롬프트 5종을 원클릭 복사할 수 있습니다.',
        notes: '현장 상담사가 바로 쓸 수 있는 R-C-G-F 4원칙입니다. 역할, 비식별 맥락, 정답 금지 가드레일, 출력 양식 및 환각 방지 조건—이 네 가지만 지켜도 AI 결과물의 품질이 완전히 달라집니다.'
    },
    {
        num: 24, mod: 'M2', trans: 'morph', sec: 65,
        badge: 'PRACTICAL PROMPT 01 / 05 · 원클릭 복사 가능',
        title: '[실무 ①] 비식별 프로파일 기반 <span class="grad-emerald">소크라테스 진로 질문</span> 생성기',
        layout: 'prompt-card',
        promptKey: 'p1',
        useCase: '상담 5분 전 준비 (소요 2분) · 탐색→심화→가치판단 3단계 열린 질문 8문항 & 닫힌 질문 대안 자동 생성',
        notes: '첫 번째 실무 프롬프트입니다. 상담 5분 전 비식별 키워드 4줄만 넣으면 탐색·심화·가치판단 3단계 열린 질문 8개와 피해야 할 닫힌 질문 대안까지 뽑아줍니다. 화면의 복사 버튼으로 바로 가져가실 수 있습니다.'
    },
    {
        num: 25, mod: 'M2', trans: 'morph', sec: 65,
        badge: 'PRACTICAL PROMPT 02 / 05 · 울산 특화',
        title: '[실무 ②] <span class="grad-cyan">울산 주력산업 AX</span> · 미래직업 동적 로드맵 설계기',
        layout: 'prompt-card',
        promptKey: 'p2',
        useCase: '울산 5대 산업 AX 축(미래차·조선·이차전지/수소·AIDC·AI서비스) × 학생 키워드 융합 신직군 3종 & 3년 로드맵',
        notes: '두 번째는 울산 특화 프롬프트입니다. 울산의 5대 산업 AX 축을 고정 맥락으로 넣어두면, 디자인과 환경을 좋아하는 중학생에게도 전통 직업이 아닌 울산 미래 산업과 교차하는 융합 신직군과 3년 체험 로드맵을 그려줍니다.'
    },
    {
        num: 26, mod: 'M2', trans: 'morph', sec: 55,
        badge: 'PRACTICAL PROMPT 03 / 05 · 집단 진로캠프용',
        title: '[실무 ③] <span class="grad-gold">모국어 질문력</span> & AI 비판적 검증 훈련 워크시트',
        layout: 'prompt-card',
        promptKey: 'p3',
        useCase: '50분 오프라인 진로캠프 설계 · AI 오류 찾기(15분) → 모국어 질문 재설계(15분) → 가치판단 토론(10분)',
        notes: '세 번째는 단체 진로캠프용입니다. 학생들이 직접 AI의 할루시네이션을 찾아내고, 1차원 질문을 본질적 모국어 질문으로 고쳐 쓰는 50분 오프라인 활동지를 3분 만에 설계할 수 있습니다.'
    },
    {
        num: 27, mod: 'M2', trans: 'morph', sec: 65,
        badge: 'PRACTICAL PROMPT 04 / 05 · 행정 시간 70% 절감',
        title: '[실무 ④] 상담 후 <span class="grad-emerald">학생·학부모 맞춤형 멘토링 리포트</span> 자동화',
        layout: 'prompt-card',
        promptKey: 'p4',
        useCase: '상담 직후 5분 완성(초안 3분 + 검수 2분) · 학생용 2주 미션 + 학부모용 가정 대화 질문 3종 + 2026 AI 기본법 표시 문구 자동 포함',
        notes: '현장에서 가장 반응이 뜨거운 네 번째 프롬프트입니다. 비식별 메모 5줄로 학생 응원 편지와 학부모 대화 질문 3가지를 3분 만에 초안 생성하고, 2분 검수 후 2026 AI 기본법 준수 문구와 함께 발송하십시오.'
    },
    {
        num: 28, mod: 'M2', trans: 'morph', sec: 55,
        badge: 'PRACTICAL PROMPT 05 / 05 · 센터 운영·지자체 보고',
        title: '[실무 ⑤] 5개 구·군 <span class="grad-cyan">공동 프로그램 기획</span> & 익명 만족도 분석',
        layout: 'prompt-card',
        promptKey: 'p5',
        useCase: '익명 주관식 설문 30건 → 긍정/개선 TOP 3 + 5개 구·군 인프라 분담 차기 프로그램 2종 + 지자체 예산 제안 논거 3가지',
        notes: '다섯 번째는 센터 기획자와 지자체 담당자용입니다. 엑셀에 잠든 익명 주관식 설문을 분석해 5개 구·군 공동 프로그램 기획안과 지자체 예산 설득 논거를 1분 만에 구조화합니다.'
    },
    {
        num: 29, mod: 'M2', trans: 'split', sec: 60,
        badge: 'AUGMENTED COUNSELING · 효과와 한계',
        title: 'AI 증강 상담의 <span class="grad-emerald">정량 효과</span>와 반드시 통제할 <span class="grad-rose">3대 한계</span>',
        layout: 'vs-split',
        leftTitle: 'AI 증강 상담의 압도적 효과',
        leftItems: ['반복 문서·리포트·초안 작성 시간 60~70% 단축', '회수된 시간을 위기·미결정 청소년 1:1 대면 코칭에 집중', '외곽·취약계층 청소년에게도 최상위 개인화 탐색 제공', '5개 구·군 센터 간 상담 품질 상향 평준화'],
        rightTitle: '반드시 인간이 통제할 3대 한계',
        rightItems: ['할루시네이션: 없는 학과·자격증·체험처 오정보 생성', '알고리즘 편향: 성별·지역·계층 고정관념 재생산 위험', '정서적 유대 결여: 아이의 눈물·가정의 아픔은 오직 인간만 품는다', '결론: AI는 대체재가 아닌 상담사 역량 증강 파트너'],
        notes: 'AI는 행정 시간을 70% 줄여주지만 환각, 알고리즘 편향, 그리고 무엇보다 아이의 눈물을 공감할 수 없는 정서적 한계가 분명합니다. AI는 상담사를 대체하는 게 아니라 상담사가 가장 인간다운 일에 집중하게 해주는 증강 파트너입니다.'
    },
    {
        num: 30, mod: 'M2', trans: 'morph', sec: 40,
        badge: 'M2 BRIDGE → MODULE 03',
        title: '“아무리 좋은 프롬프트도 <span class="grad-rose">보안이 무너지면 0점</span>이다”',
        layout: 'bridge',
        lead: '2026년 1월 시행된 「인공지능기본법」과 5월 개인정보보호위원회 가이드라인 아래, 우리 센터는 어디까지 안전하게 입력할 수 있는가?',
        highlight: '보안 리스크 제로화(MASK-5 · 신호등) + 울산 ‘1+5+N’ 기관 협력망',
        nextLabel: 'NEXT · M3 기관 간 협력망 구축 및 2026 청소년 데이터 보안 거버넌스 (17분)',
        notes: '아무리 훌륭한 프롬프트도 공공기관에서 개인정보 보안이 무너지면 0점입니다. 이어지는 M3에서는 2026년 시행 법령 기준의 완벽한 청소년 데이터 보안 수칙과 울산 5개 구·군 협력 거버넌스를 정리하겠습니다.'
    },

    // ================= M3 (31 ~ 46) =================
    {
        num: 31, mod: 'M3', trans: 'zoom', sec: 40,
        badge: 'MODULE 03 · 15:58 ~ 16:15 (17분)',
        title: '<span class="grad-rose">보안 리스크 제로화</span> & <span class="grad-emerald">울산 ‘1+5+N’ AX 협력망</span>',
        layout: 'module-opener',
        subtitle: 'Part A. 2026 법령·MASK-5 비식별화·보안 신호등  |  Part B. 울산 주력산업 AX·5개 구·군 협력망·4단계 성장 사다리',
        metrics: ['2026 AI 기본법 · PIPC · 국정원 완벽 대응', 'MASK-5 실시간 모핑 시연', '울산 1+5+N & 20h~160h 사다리'],
        notes: '세 번째 모듈은 공공 진로센터의 가장 중요한 두 기둥—전반부 2026 법령 기반 청소년 데이터 보안 수칙과 후반부 울산 5개 구·군 기관 협력 거버넌스—를 다룹니다.'
    },
    {
        num: 32, mod: 'M3', trans: 'push-h', sec: 60, timeline: '2026 AI GOVERNANCE · 01 / 03',
        badge: 'GLOBAL REGULATION · EU · UK · USA',
        title: '글로벌 교육·청소년 AI 규제 <span class="grad-rose">3대 기준</span>',
        layout: 'three-bento',
        items: [
            { icon: 'fa-scale-balanced', title: 'EU AI Act (2024/1689)', sub: '감정인식 금지 2025.02 시행', desc: 'Annex III 제3항 교육 평가·배치·시험감독을 고위험 AI 분류(2027.12 전면 의무). 학교 내 AI 감정인식 전면 금지.' },
            { icon: 'fa-shield-halved', title: '영국 DfE 안전 표준 (2025~26)', sub: 'Generative AI Product Safety', desc: '아동 보호(KCSIE) 연계, 탈옥·아첨(Sycophancy) 차단, 학생 데이터의 상업적 모델 학습 전면 금지.' },
            { icon: 'fa-lock', title: '미국 FERPA & COPPA', sub: '학생교육기록 · 13세 미만 보호', desc: '일반 무료 챗봇은 기본 비준수. 학교 관계자 예외 서면 계약 없이 자유 텍스트 프롬프트에 학생 기록 입력 금지.' }
        ],
        notes: '글로벌 기준은 이미 명확합니다. EU는 2025년 2월부터 학교 내 감정인식 AI를 전면 금지했고, 영국 DfE는 학생 데이터 상업 학습을 막으며, 미국 FERPA·COPPA는 무료 개인 계정 입력을 엄격히 통제합니다.'
    },
    {
        num: 33, mod: 'M3', trans: 'push-h', sec: 65, timeline: '2026 AI GOVERNANCE · 02 / 03',
        badge: 'KOREA 2026 · 법령 및 개인정보보호위원회',
        title: '2026년 한국 필수 기준 ①: <span class="grad-rose">AI 기본법</span> & <span class="grad-gold">PIPC 가이드</span>',
        layout: 'two-cards',
        cards: [
            { tag: '2026년 1월 22일 시행 · 「인공지능기본법」', title: 'AI 생성물 표시 의무 & 고영향 AI 통제', desc: '① AI 보조로 만든 진로 리포트·안내문에 AI 활용 사실 사전 고지·표시 의무. ② 유아·초·중등 교육 평가 등 기본권 중대 영역(고영향 AI) 단독 결정 금지.' },
            { tag: '2026년 5월 발간 · 개인정보보호위원회(PIPC)', title: '「생성형 AI 이용자 개인정보 보호 가이드」', desc: '① 프롬프트 입력의 모델 학습 재사용 주의(Opt-out 필수) ② 화면 삭제 후에도 백업 서버 잔존 한계 ③ 해외 서버 이전 리스크 ④ 타인·식별 단서 입력 금지.' }
        ],
        notes: '한국도 2026년 1월 22일 인공지능기본법이 시행되었고, 5월에는 개인정보보호위원회 이용자 가이드가 나왔습니다. 생성물 표시 의무, 고영향 AI 인간 감독, 그리고 계정 Opt-out 설정과 비식별화가 핵심입니다.'
    },
    {
        num: 34, mod: 'M3', trans: 'push-h', sec: 60, timeline: '2026 AI GOVERNANCE · 03 / 03',
        badge: 'KOREA 2026 · 공공기관 보안 및 교육 현장',
        title: '2026년 한국 필수 기준 ②: <span class="grad-cyan">국정원 가이드북</span> & <span class="grad-emerald">교육부 지침</span>',
        layout: 'two-cards',
        cards: [
            { tag: '2025년 12월 전면 개정 · 국가정보원 (KISA 2026.03 연계)', title: '『국가·공공기관 AI보안 가이드북』', desc: 'AI 수명주기별 15대 위협(T01~T15)·30대 대책(M01~M30) 코드화. AI-DLP·금칙어 필터링 강조. 공공기관 사이버보안 실태평가에 직접 반영!' },
            { tag: '2026학년도 전면 적용 · 교육부', title: '「수행평가 시 AI 활용 관리 방안」', desc: '실명·생년월일·연락처·얼굴 사진 입력 차단, ‘학생A’ 등 가명·일반화 입력 원칙, 교사·상담사의 실질적 관리·감독(Human-in-the-loop) 아래 운용.' }
        ],
        notes: '국정원 AI보안 가이드북의 15대 위협·30대 대책 준수 여부는 공공기관 사이버보안 실태평가에 직접 반영됩니다. 교육부 2026 수행평가 지침 역시 학생A 가명 원칙을 못 박았습니다.'
    },
    {
        num: 35, mod: 'M3', trans: 'morph', sec: 55,
        badge: 'PUBLIC CENTER SECURITY REDLINES',
        title: '복잡한 법령, 현장에서는 <span class="grad-rose">4대 레드라인</span>만 지켜라',
        layout: 'four-pillars',
        pillars: [
            { num: '01', title: '원문 PII 입력 절대 금지', desc: '실명·학교·연락처·가족·심리/의료 민감정보의 외부 상용 AI 직접 입력 원천 차단' },
            { num: '02', title: 'Opt-out & 임시 채팅 전용', desc: '모델 학습 데이터 활용 거부 상시 활성화 · 만 14세 미만 법정대리인 동의 원칙 엄수' },
            { num: '03', title: 'AI 단독 판정·감정분석 금지', desc: '진로·적성 최종 판단과 정서 상담은 반드시 인간 상담사가 검수·책임(Human Oversight)' },
            { num: '04', title: '생성물 표시 & 30초 팩트체크', desc: 'AI 보조 문서 하단 표시 문구 명시(2026 AI 기본법) + 학과·자격증 1차 출처 교차 검증' }
        ],
        footerBar: '이 4대 안전벨트만 매면, 공공 진로센터도 법적 리스크 없이 당당하게 AX를 실행할 수 있습니다.',
        notes: '수백 페이지 법령을 다 외울 필요 없습니다. 원문 입력 금지, Opt-out 설정, AI 단독 판정 금지, 생성물 표시와 팩트체크—이 4대 레드라인만 지키면 완벽히 안전합니다.'
    },
    {
        num: 36, mod: 'M3', trans: 'morph', sec: 65,
        badge: 'PII DE-IDENTIFICATION PROTOCOL',
        title: '청소년 상담 비식별화 5대 공식: <span class="grad-emerald">MASK-5</span>',
        layout: 'mask5-grid',
        items: [
            { letter: 'M', word: 'Mask Names & IDs', desc: '실명·학교명·반/번호·연락처 → [학생A], [울산 소재 일반고 2학년]으로 치환' },
            { letter: 'A', word: 'Abstract Family & Medical', desc: '부모 직업·소득·다문화·ADHD/우울 진단 → 절대 입력 금지 (필요 시 일반화)' },
            { letter: 'S', word: 'Strip Scores & Locations', desc: '정확한 내신 등급·거주지 동/아파트 → “이공계 중상위권”, “울산 공업권역” 구간화' },
            { letter: 'K', word: 'Keep Interest Signals', desc: '진로 설계에 꼭 필요한 흥미·몰입 경험·선호 활동·고민 질문만 추출' },
            { letter: '5', word: 'Opt-out & Temp Chat', desc: '학습 거부(Opt-out) + 임시 채팅 또는 공공 승인/엔터프라이즈 환경 전용' }
        ],
        notes: '현장에서 바로 외워 쓰는 MASK-5 비식별화 공식입니다. 이름·학교를 가리고(M), 가족·질병은 절대 넣지 않으며(A), 성적·주소를 구간화하고(S), 흥미 신호만 남긴 뒤(K), Opt-out 환경(5)에 입력합니다.'
    },
    {
        num: 37, mod: 'M3', trans: 'morph', sec: 70,
        badge: 'LIVE INTERACTIVE DEMO · MASK-5 모핑 변환',
        title: '[실전 시연] 위험 원문(<span class="grad-rose">Red</span>) → 안전 변환문(<span class="grad-emerald">Green</span>)',
        layout: 'mask5-simulator',
        notes: '실제 울산 상담 시나리오로 MASK-5 변환을 라이브 시연해 보겠습니다. 버튼을 누르면 실명, 연락처, 거주지, 부모 직장, ADHD 약물 같은 위험 요소가 순식간에 사라지고, 울산 미래 모빌리티·드론 진로 로드맵 설계에 필요한 핵심 신호만 안전하게 남습니다.'
    },
    {
        num: 38, mod: 'M3', trans: 'morph', sec: 65,
        badge: 'INTERACTIVE SECURITY TRAFFIC LIGHT',
        title: '공공 진로센터 AI 데이터 보안 <span class="grad-gold">신호등 수칙</span>',
        layout: 'traffic-light',
        notes: '모든 상담석 PC 옆에 A4 한 장으로 붙여둘 보안 신호등입니다. 빨간불은 외부 AI 절대 금지, 노란불은 MASK-5 비식별화와 Opt-out 후 조건부 허용, 초록불인 공개 통계와 교안·프롬프트 개발은 마음껏 활용하십시오.'
    },
    {
        num: 39, mod: 'M3', trans: 'zoom', sec: 55,
        badge: 'PART B · 울산광역시·권역 AX 협력 거버넌스',
        title: '개별 센터의 고립을 깨고, <span class="grad-emerald">울산형 AX 생태계</span>로',
        layout: 'editorial-focus',
        bigText: 'ULSAN AX',
        points: [
            { icon: 'fa-link-slash', title: '개별 센터 단편 운영의 한계', desc: '구·군별 중복 행정, 일회성 특강 반복, 상담사 역량 편차 심화' },
            { icon: 'fa-industry', title: '울산은 대한민국 최대 실물 산업 AX 격변기', desc: '지역 산업의 빛의 속도 변화를 개별 센터 혼자 진로지도로 소화 불가' },
            { icon: 'fa-network-wired', title: '5개 구·군 + 교육청 + 산학민 연대', desc: '칸막이를 허물고 공동 프롬프트 풀과 오프라인 거점을 연결할 골든타임' }
        ],
        notes: '이제 보안 토대 위에 기관 간 협력망을 세워보겠습니다. 지금 울산은 대한민국에서 가장 거대한 실물 산업 AX 격변기를 맞고 있습니다. 개별 센터가 따로 움직여서는 이 거대한 변화를 아이들 진로에 담아낼 수 없습니다.'
    },
    {
        num: 40, mod: 'M3', trans: 'push-h', sec: 70,
        badge: 'ULSAN INDUSTRIAL TRANSFORMATION (2025~2026)',
        title: '울산 = <span class="grad-cyan">AI 데이터센터</span> + <span class="grad-gold">실물 제조 AX</span>의 심장',
        layout: 'four-pillars',
        pillars: [
            { num: '01', title: '울산미포 AI 데이터센터', desc: 'SK·AWS 대규모 AIDC 건설·확장(향후 1GW급) — 피지컬 AI·로봇·자율주행의 척추' },
            { num: '02', title: '자동차 · 헤비듀티 제조 AI', desc: '현대차 전기차 신공장 가동, 공정 지능화 및 숙련 명장 노하우의 울산형 sLLM 데이터화' },
            { num: '03', title: '이차전지 글로벌 마더 팩토리', desc: '삼성SDI 전고체 배터리 및 ESS용 LFP 거점 투자 — 차세대 에너지 제조 메카' },
            { num: '04', title: '수소·해상풍력 & AI 서비스', desc: '수소 모빌리티·선박 + 장치산업 고용 한계를 보완할 청년·여성 선호 AI 서비스 신직군 발굴' }
        ],
        footerBar: '울산 듀얼 트랙 진로 과제: ① 제조 공정 이해형 AI 융합 인재  +  ② 청년·여성 정주형 AI 서비스 신직군 균형 탐색',
        notes: '울산미포산단 SK·AWS AI 데이터센터, 현대차 전기차와 헤비듀티 제조 AI, 삼성SDI 이차전지, 수소와 해상풍력까지—울산 산업이 급변하고 있습니다. 동시에 청년과 여성이 선호하는 AI 서비스 신직군을 함께 발굴하는 듀얼 트랙 진로지도가 필수입니다.'
    },
    {
        num: 41, mod: 'M3', trans: 'morph', sec: 65,
        badge: 'ULSAN 5 DISTRICTS · 오프라인 특화 인프라',
        title: '이미 울산에는 <span class="grad-emerald">5개 구·군 최강 오프라인 보물</span>이 있다',
        layout: 'ulsan-5',
        districts: [
            { name: '중구 센터', loc: '학성동', strength: '찾아가는 진로멘토단 · 마을교육 공동체 연계 · 인문/지역콘텐츠 AI' },
            { name: '남구 센터', loc: '옥동 차오름센터', strength: '미디어실 · 3D프린터실 · 목공/요리 메이커 스페이스 · 멀티모달 AI' },
            { name: '동구 센터', loc: '동구청소년센터 연계', strength: '진로 DNA · 초등창의진로 · 학부모 참여형 체험 · 조선해양 AX' },
            { name: '북구 센터', loc: '북구청소년문화의집', strength: '자기주도적 진로 설계 · 진로고민 해소 · 미래차/모빌리티 AX' },
            { name: '울주군 센터', loc: '울주남부청소년수련관', strength: '4차산업 ‘알·쓸·미·잡’ · 6차산업 스마트팜 · 에너지/배터리 AX' }
        ],
        notes: '울산 5개 구·군 진로센터는 이미 서로 다른 훌륭한 보물을 갖고 있습니다. 중구 마을 멘토단, 남구 메이커·미디어, 동구 진로DNA·학부모, 북구 자기주도·미래차, 울주군 4차·6차산업까지—서로 교차 개방하면 울산 전역이 하나의 거대한 진로 캠퍼스가 됩니다.'
    },
    {
        num: 42, mod: 'M3', trans: 'zoom', sec: 75,
        badge: 'ULSAN REGIONAL AX GOVERNANCE MODEL',
        title: '울산광역시·권역 특화 <span class="grad-emerald">‘1 + 5 + N’</span> AX 진로 협력망',
        layout: 'governance-15n',
        notes: '제가 제안하는 울산형 1+5+N 협력 거버넌스입니다. 울산시교육청 진로진학지원센터와 시청이 보안 표준과 공유 프롬프트 풀의 컨트롤타워(1)를 맡고, 5개 구·군 센터(5)가 특화 공간을 교차 개방하며, UNIST·울산대·주력기업·민간 전문가(N)가 최신 직무 데이터와 멘토링을 공급하는 구조입니다.'
    },
    {
        num: 43, mod: 'M3', trans: 'morph', sec: 60,
        badge: 'LOW-COST HIGH-IMPACT COLLABORATION',
        title: '공유 프롬프트 풀 & <span class="grad-cyan">월간 실무자 AI PLC</span>',
        layout: 'two-cards',
        cards: [
            { tag: '울산 권역 공유 프롬프트 풀 (Prompt Pool)', title: '노력은 1/5로 줄이고, 성과는 5배로 확산', desc: '5개 구·군이 각자 개발하던 프롬프트·교안·울산 산업 브리핑을 공동 저장소(노션/구글독스)에 누적하여 실시간 공동 활용.' },
            { tag: '월간 60분 실무자 AI PLC (에스토니아 벤치마킹)', title: '베테랑 상담사 + 디지털 숙련 직원 2인 1조', desc: '매월 마지막 주 60분 ‘베스트 프롬프트 1개 + 실패 사례 1개’ 교환회 운영. 기술과 도메인 통찰의 자연스러운 융합.' }
        ],
        notes: '큰 예산이 필요 없습니다. 에스토니아 PLC처럼 매달 한 번 5개 구·군 실무자가 60분만 모여 잘 먹힌 프롬프트 1개와 실패 사례 1개를 나누면, 노력은 5분의 1로 줄고 성과는 5배로 커집니다.'
    },
    {
        num: 44, mod: 'M3', trans: 'push-h', sec: 70,
        badge: '강연자 칼럼 핵심 제언 · 단계별 역량 인증 사다리',
        title: '일회성 특강을 끝내는 <span class="grad-gold">4단계 성장 사다리</span> (20h~160h)',
        layout: 'ladder-4',
        tiers: [
            { hrs: '20h+', level: '1단계 · 기본', youth: '모국어 질문력 · AI 윤리 · 소크라테스 스터디 코치', staff: '2026 AI 기본법 · MASK-5 보안 · 행정 자동화' },
            { hrs: '40h+', level: '2단계 · 중급', youth: '동적 진로 포트폴리오 · 가상 직업인 면접 시뮬레이션', staff: '소크라테스 프롬프트 5종 · 5분 멘토링 리포트 실전' },
            { hrs: '80h+', level: '3단계 · 고급', youth: '울산 주력산업·지역문제 팀 프로젝트 프로토타입', staff: '만족도 데이터 시각화 · 구·군 공동 PLC 리드' },
            { hrs: '160h+', level: '4단계 · 실무', youth: 'UNIST·울산대·지역기업 연계 캡스톤 & 지역 인증', staff: '울산 권역 AX 진로 마스터(강사·컨설턴트) 인증' }
        ],
        notes: '제가 칼럼에서 제안한 20시간·40시간·80시간·160시간 단계별 성장 사다리를 청소년과 상담사 이중 트랙으로 구체화했습니다. 핀란드 Elements of AI와 싱가포르 SkillsFuture처럼 배움이 공신력 있는 인증과 성장으로 이어져야 합니다.'
    },
    {
        num: 45, mod: 'M3', trans: 'morph', sec: 60,
        badge: 'PROVEN PUBLIC AX · cloudbread.me/showcase?target=public',
        title: '먼 해외 이야기가 아니다 — <span class="grad-emerald">울산·국내 공공 현장</span> 검증 자산',
        layout: 'three-bento',
        items: [
            { icon: 'fa-city', title: '울산 지자체 Semantic RAG', sub: '북구청 · 중구/광역 조례 · 5개 구·군 보건소', desc: '이미 울산 행정·복지 법규를 구조화해 시민 AI 어드바이저로 구현 → 울산 진로체험처·산업 진로 RAG로 즉시 확장 가능.' },
            { icon: 'fa-chart-line', title: '화성시인재육성재단 AX 포털', sub: '만족도 5+2 표준 지표 & 시민 1,000명+ 수료', desc: '엑셀에 잠든 교육만족도를 실시간 시각화 대시보드로 전환해 지자체 예산·정책 설득력 극대화.' },
            { icon: 'fa-chalkboard-user', title: '울산 동구 현장 강사 양성', sub: '지역 기반 단계별 교육 → 일자리 선순환', desc: '오프라인 밀착 교육으로 지역 내 자체 강사·코치를 키워내는 지속 가능한 생태계 이미 증명.' }
        ],
        notes: '이미 울산 북구청·중구청·광역 조례와 5개 구·군 보건소 데이터를 묶은 AI 어드바이저, 화성시인재육성재단의 실시간 교육만족도 대시보드가 현장에서 작동 중입니다. 같은 모델을 울산 진로센터에 바로 얹을 수 있습니다.'
    },
    {
        num: 46, mod: 'M3', trans: 'morph', sec: 40,
        badge: 'M3 BRIDGE → MODULE 04',
        title: '“완벽한 예산 승인을 기다리지 마라 — <span class="grad-gold">내일 아침 9시</span>부터 시작하라”',
        layout: 'bridge',
        lead: '예산·인력·보안·역량 편차라는 현실의 벽을 넘어, 우리 센터가 내일 당장 실행할 첫 단추는 무엇인가?',
        highlight: 'Quick Win 5대 과제 · 30/60/90일 로드맵 · 15항목 자가점검 & 라이브 Q&A',
        nextLabel: 'NEXT · M4 현장 Q&A 및 울산 센터별 즉시 실천 액션 플랜 (15분)',
        notes: '보안 원칙과 울산 1+5+N 협력 그림을 모두 완성했습니다. 마지막 15분 동안은 현장 장벽을 깨는 Quick Win 5대 과제와 90일 로드맵을 확정하고 여러분의 질문을 직접 받겠습니다.'
    },

    // ================= M4 (47 ~ 58) =================
    {
        num: 47, mod: 'M4', trans: 'zoom', sec: 35,
        badge: 'MODULE 04 · 16:15 ~ 16:30 (15분)',
        title: '현장의 벽을 넘어, <span class="grad-gold">내일부터 실행하는 울산 AX</span>',
        layout: 'module-opener',
        subtitle: '4대 정체성 전환 · 현장 장벽 돌파 해법 · Quick Win 5대 과제 · 30/60/90일 로드맵 & 라이브 Q&A',
        metrics: ['예산 0원 Quick Win 5선', '15항목 실시간 체크리스트', '현장 Q&A 10선 뱅크'],
        notes: '마지막 4부입니다. 강의를 듣고 박수만 치고 끝나지 않도록, 내일 오전 9시 센터에 출근해 바로 실행할 과제와 90일 로드맵을 확정하고 현장 Q&A를 진행하겠습니다.'
    },
    {
        num: 48, mod: 'M4', trans: 'morph', sec: 60,
        badge: 'STRATEGIC IDENTITY SHIFT',
        title: '‘직업체험 중개소’ → <span class="grad-emerald">‘울산형 초개인화 AX 진로 허브’</span> 4대 축',
        layout: 'four-pillars',
        pillars: [
            { num: '01', title: '기능 전환', desc: '행정·체험 매칭 시간 60~70% 회수 → 위기·미결정 청소년 1:1 심층 대면 코칭 집중' },
            { num: '02', title: '산업 연계 전환', desc: '울산 듀얼 트랙 AX (제조·에너지·AIDC 융합 + 청년·여성 선호 AI 서비스 신직군)' },
            { num: '03', title: '교육 방식 전환', desc: '1회성 특강 탈피 → 오프라인 밀착 기본교육망 & 5개 구·군 특화 공간 교차 개방' },
            { num: '04', title: '협력 체계 전환', desc: '각자도생 탈피 → 울산 ‘1+5+N’ 공유 프롬프트 풀 & 표준 보안 거버넌스 정착' }
        ],
        footerBar: '목표: 울산 청소년 누구나 사교육 없이 최상위 1:1 초개인화 진로 코칭을 누리는 공공 생태계',
        notes: '향후 3년 울산 진로센터가 나아갈 4대 정체성 전환입니다. 행정 시간을 아이 눈을 맞추는 시간으로, 일회성 특강을 오프라인 밀착 협력망으로 바꾸는 것입니다.'
    },
    {
        num: 49, mod: 'M4', trans: 'morph', sec: 75,
        badge: 'BARRIER BREAKTHROUGH',
        title: '공공 현장 <span class="grad-rose">4대 도입 장벽</span>과 정면 돌파 해법',
        layout: 'compare-table',
        headers: ['현장 장벽', '실무자의 실제 우려', '현실적 돌파 해법'],
        rows: [
            ['① 예산·인력 부족', '자체 AI 플랫폼 구축 예산도 인원도 빠듯함', '기존 도구(Opt-out) + 무료 공동 프롬프트 풀 + 5개 구·군 공동 연수 경량 모델'],
            ['② 보안·징계 우려', '학생 개인정보 유출 시 담당자 책임 두려움', 'MASK-5 & 신호등 수칙 기관 공식 규정 명문화 → Red 데이터 원천 차단'],
            ['③ 직원 역량 편차', '디지털 숙련 직원과 베테랑 상담사 간 격차', '핵심은 모국어 질문 역량 — 베테랑 + AI 숙련자 2인 1조 페어 코칭(PLC)'],
            ['④ AI 과의존·대체', '상담사 일자리 축소 및 아이들 사고력 저하 우려', 'Wharton(-17%)·MIT(인지 부채) 근거로 인간 상담사의 윤리적 감독 가치 폭등 입증']
        ],
        notes: '예산, 보안 책임, 역량 편차, AI 과의존—현장 4대 장벽은 모두 검증된 해법이 있습니다. 특히 MASK-5를 기관 공식 지침으로 세우고 2인 1조 페어 코칭을 돌리면 저항이 협력으로 바뀝니다.'
    },
    {
        num: 50, mod: 'M4', trans: 'push-h', sec: 70, timeline: 'QUICK WIN ACTIONS · 01 / 02',
        badge: 'TOMORROW 09:00 AM · 예산 0원 즉시 실행 (①~③)',
        title: '내일 아침 9시, <span class="grad-emerald">우리 센터 혼자</span> 바로 시작하는 3가지',
        layout: 'three-bento',
        items: [
            { icon: 'fa-traffic-light', title: 'Quick Win ① MASK-5 & 신호등 게시', sub: '소요 15분 · 전 직원', desc: 'A4 1장으로 인쇄해 모든 상담석·PC 옆에 부착하고 전 직원 AI 계정 Opt-out 설정 완료.' },
            { icon: 'fa-file-lines', title: 'Quick Win ② 5분 멘토링 리포트', sub: '행정 70% 절감 · 진로상담사', desc: '비식별 메모 5줄로 학생 2주 미션 + 학부모 대화 질문 + AI 기본법 표시 문구 초안 생성·검수.' },
            { icon: 'fa-circle-question', title: 'Quick Win ③ 소크라테스 3질문 카드', sub: '체험 품질 업그레이드 · 담당자', desc: '기존 꿈길 직업체험 시작 전·종료 후 학생 맞춤형 성찰 질문 3개 오프라인 활동지 제공.' }
        ],
        notes: '내일 오전 9시 예산 0원으로 바로 할 수 있는 3가지입니다. PC 옆 신호등 부착, 5분 멘토링 리포트, 꿈길 체험 소크라테스 3질문 카드—이 세 가지만으로도 센터의 체감 품질이 즉각 달라집니다.'
    },
    {
        num: 51, mod: 'M4', trans: 'push-h', sec: 65, timeline: 'QUICK WIN ACTIONS · 02 / 02',
        badge: 'TOMORROW COLLABORATION · 5개 구·군 함께 실행 (④~⑤)',
        title: '울산 5개 구·군이 <span class="grad-cyan">함께 여는 협력</span>의 첫 단추 2가지',
        layout: 'two-cards',
        cards: [
            { tag: 'Quick Win ④ · 매월 마지막 주 60분', title: '울산 5개 구·군 ‘월간 프롬프트 1+1 교환회’', desc: '각 센터가 현장에서 검증한 베스트 프롬프트 1개 + 실패 사례 1개를 공동 저장소(노션/구글독스)에 누적 → 예산 0원 권역 프롬프트 풀 자연 형성.' },
            { tag: 'Quick Win ⑤ · 노력 1/5, 효과 5배', title: '‘울산 주력산업 AX 진로 브리핑 1장 카드’ 분담 제작', desc: '북구(미래차) · 동구(조선해양) · 울주(에너지/배터리) · 남구(미디어/메이커) · 중구(지역문화/AI서비스)가 분기별 1장씩 분담 제작 후 5개 구·군 상호 배포.' }
        ],
        notes: '그리고 5개 구·군이 함께 시작할 2가지입니다. 월간 프롬프트 1+1 교환회, 그리고 5개 구·군이 각자 특화 산업 브리핑 카드를 분기당 딱 1장씩만 만들어 서로 나누는 것입니다.'
    },
    {
        num: 52, mod: 'M4', trans: 'push-h', sec: 75,
        badge: 'EXECUTION ROADMAP · 30 · 60 · 90 DAYS',
        title: '울산 진로센터 <span class="grad-gold">30 · 60 · 90일</span> AX 전환 실행 로드맵',
        layout: 'steps-3',
        steps: [
            { step: 'DAY 1 ~ 30 · 안전 기반 & Quick Win', title: '보안 안전벨트 + 프롬프트 시범 적용', desc: 'MASK-5·신호등 5개 구·군 공동 채택 / 소크라테스 프롬프트 5종 시범 운용 / 계정 Opt-out 및 AI 표시 문구 표준화.' },
            { step: 'DAY 31 ~ 60 · 5개 구·군 PLC 가동', title: '협력망 출범 + 학부모 오프라인 연계', desc: '월간 실무자 AI 프롬프트 교환회(PLC) 출범 / 특화 공간 교차 공유 파일럿 / 학부모 ‘질문력·진로 대화법’ 오프라인 워크숍.' },
            { step: 'DAY 61 ~ 90 · 울산형 AX 허브 제도화', title: '공유 풀 v1.0 + 20h~40h 사다리 설계', desc: '울산 공유 프롬프트·우수사례 풀 v1.0 공식 오픈 / 20h 기본~40h 중급 성장 사다리 설계 / 만족도·진로확신도 표준 데이터 교육청·지자체 보고.' }
        ],
        notes: '딱 90일 로드맵입니다. 30일 안전 기반, 60일 5개 구·군 PLC와 학부모 워크숍, 90일 공유 풀 v1.0 오픈과 20시간 기본 과정 설계까지—무리하지 않고 90일이면 울산 진로센터가 완전히 진화합니다.'
    },
    {
        num: 53, mod: 'M4', trans: 'morph', sec: 60,
        badge: 'INTERACTIVE SELF-ASSESSMENT · 클릭해서 점수 확인',
        title: '진로센터 <span class="grad-emerald">보안(8) & 운영·협력(7)</span> 15항목 자가점검',
        layout: 'checklist-15',
        notes: '웹 슬라이드에서 직접 클릭해 우리 센터의 준비도 점수를 확인할 수 있는 15항목 체크리스트입니다. 내일 팀 회의에서 함께 점검하시고, 미충족 항목부터 2027년 실행 과제로 채워 나가십시오.'
    },
    {
        num: 54, mod: 'M4', trans: 'morph', sec: 90,
        badge: 'LIVE Q&A BANK ① · 카드를 클릭해 답변 확인',
        title: '상담사·실무자가 가장 많이 묻는 <span class="grad-cyan">핵심 질문 5선</span>',
        layout: 'qa-cards',
        qas: [
            { q: 'Q1. 무료 ChatGPT/Gemini로도 상담 준비가 가능한가요?', a: '가능하나 반드시 계정 설정에서 ‘모델 학습 활용 거부(Opt-out)’ 또는 임시 채팅을 켜고, MASK-5 비식별화(Yellow/Green)만 입력해야 합니다.' },
            { q: 'Q2. 위기청소년(자해·학대·심리 문제) 상담에도 AI를 써도 되나요?', a: '절대 불가(🔴 Red)입니다. 위기·의료·가정사 원문은 외부 AI 입력을 전면 금지하며, 오직 인간 전문상담사와 지역 위기연계망이 전담해야 합니다.' },
            { q: 'Q3. AI가 없는 대학 학과나 자격증을 지어내면 어떡하죠?', a: '프롬프트에 [현장 확인 필요] 제약 조건을 걸고, 최종 전달 전 커리어넷·대학 입학처·큐넷 1차 출처로 30초 팩트체크를 생활화하십시오.' },
            { q: 'Q4. AI가 진로상담을 다 하면 상담사 일자리가 줄지 않을까요?', a: '반대입니다. 와튼(-17%)·MIT(인지 부채) 연구가 증명했듯 가드레일 없는 AI는 위험하므로, 질문을 설계하고 정서적 유대와 윤리적 판단을 책임지는 상담사의 가치가 폭등합니다.' },
            { q: 'Q5. “AI 쓰면 공부 안 한다”는 학부모 우려는 어떻게 설득하나요?', a: '학부모 오프라인 워크숍에서 ‘정답 자판기 vs 소크라테스 코치’ 차이를 직접 시연하고, 가정 내 모국어 진로 대화 질문 3가지를 제공하십시오.' }
        ],
        notes: '현장 실무자분들이 가장 많이 질문하시는 5가지 핵심 Q&A입니다. 카드를 클릭하면 바로 실전 답변이 펼쳐집니다. 지금 현장에서 궁금한 점도 편하게 손들고 질문해 주십시오.'
    },
    {
        num: 55, mod: 'M4', trans: 'morph', sec: 90,
        badge: 'LIVE Q&A BANK ② · 카드를 클릭해 답변 확인',
        title: '센터장·지자체 정책 담당자 <span class="grad-gold">핵심 질문 5선</span>',
        layout: 'qa-cards',
        qas: [
            { q: 'Q6. 지자체 의회·예산 부서를 어떻게 설득해야 할까요?', a: 'OECD PISA 진로 불확실성 40% · WEF 핵심역량 39% 변화 통계 + 에스토니아·화성시 행정시간 절감/만족도 지표 + 지방 AI 사교육비 절감 논리를 결합해 제시하십시오.' },
            { q: 'Q7. 2026년 시행 AI 기본법 위반 소지가 없는지 걱정됩니다.', a: 'AI 단독 진로 판정을 배제하고, AI 보조 문서 하단에 ‘AI 초안·상담사 검수 완료’ 표시 문구와 MASK-5 원칙을 지키면 법령 취지에 완벽히 부합합니다.' },
            { q: 'Q8. 5개 구·군 센터 간 예산·규모가 다른데 협력이 될까요?', a: '동일 분담이 아니라 강점 분담(중구 멘토·남구 메이커·동구 학부모·북구 모빌리티·울주 에너지)과 무료 공유 프롬프트 풀로 시작하면 소규모 센터가 가장 큰 혜택을 봅니다.' },
            { q: 'Q9. 어떤 KPI(성과지표)로 사업 효과를 측정해야 하나요?', a: '단순 참여 인원을 넘어 ① 상담사 행정 절감 시간 ② 학생 진로자기효능감 사전·사후 변화 ③ 20h→40h 단계별 후속 이수율 ④ 학부모 NPS로 고도화하십시오.' },
            { q: 'Q10. 지역 대학·민간 AI 교육업체와는 어떻게 연계하나요?', a: '오프라인 기본교육망(20h~40h)은 센터·민간 전문가가 밀착 운영하고, 고급·실무(80h~160h)는 UNIST·울산대·주력기업 현직자 멘토와 연결하는 역할 분담이 최적입니다.' }
        ],
        notes: '센터장님과 교육청·지자체 담당자분들의 예산·법령·KPI·거버넌스 핵심 질문 5가지입니다. 성과지표를 진로자기효능감 변화와 단계별 이수율로 바꾸는 순간 예산 설득력이 달라집니다.'
    },
    {
        num: 56, mod: 'M4', trans: 'morph', sec: 55,
        badge: 'SUSTAINABLE NETWORK PROPOSAL',
        title: '오늘을 <span class="grad-emerald">‘울산 청소년 진로 AX 네트워크’</span>의 출범일로',
        layout: 'steps-3',
        steps: [
            { step: '2026년 12월 (이번 달)', title: '5개 구·군 공유 폴더(v0.1) 개설', desc: '오늘 참석한 5개 구·군 실무자 연락망 결성 및 MASK-5·프롬프트 5종 공동 폴더 가동.' },
            { step: '2027년 1분기 (1~3월)', title: '월간 PLC 정례화 & 산업 카드 5종 발행', desc: '매월 60분 프롬프트 교환회 정례화 + 울산 5대 산업 AX 진로 카드 공동 발행·배포.' },
            { step: '2027년 상반기 (6월)', title: '울산 권역 AX 성과공유회 개최', desc: '울산시교육청·5개 구·군 공동 초개인화 진로지도 우수사례 및 성과 대시보드 전국 선도 발표.' }
        ],
        notes: '오늘 이 특강이 1회성 행사로 끝나지 않고, 이번 달 5개 구·군 공유 폴더 개설부터 내년 상반기 성과공유회까지 이어지는 울산 청소년 진로 AX 네트워크의 출범일이 되기를 제안합니다.'
    },
    {
        num: 57, mod: 'M4', trans: 'zoom', sec: 50,
        badge: 'CLOSING QUOTE · OECD',
        title: '“이제는 <span class="grad-cyan">배움 자체가 일</span>이다”',
        layout: 'quote-hero',
        quote: '“과거에는 일을 하기 위해 배웠지만, 이제는 배움 자체가 일이다. 훌륭한 일터는 학습 허브가 되어야 하고, 훌륭한 교육기관은 어제가 아닌 내일의 노동 수요를 내다봐야 한다.”',
        quoteEn: '“We used to learn to do our work, now learning is the work. So every great workplace must double as a learning hub, and every great school must learn to anticipate tomorrow’s labour demand – not yesterday’s.”',
        author: '안드레아스 슐라이허 (Andreas Schleicher, OECD 교육국장)',
        tags: ['#LearningIsTheWork', '#울산AX진로허브', '#내일의수요를내다보다'],
        notes: 'OECD 슐라이허 교육국장의 말처럼 이제는 배움 자체가 일입니다. 우리 울산의 진로센터가 어제의 시험지가 아니라 내일의 세상을 내다보는 학습 허브가 되어야 합니다.'
    },
    {
        num: 58, mod: 'M4', trans: 'zoom', sec: 45,
        badge: 'FINAL CLOSING · THANK YOU',
        title: '지방 현장에서부터 <span class="grad-gold">새 판을 짜자</span>',
        layout: 'closing',
        quote: '“기기를 막는 소극적 방어전을 끝내고 암기 교육의 시대에 마침표를 찍을 때다. 전 국민 AI 역량의 새 판을, 바로 여기 울산 진로센터 현장에서부터 제대로 짜자.”',
        author: '정우진 · 『챗GPT 엔지니어링』 저자 / CloudBread 대표',
        links: [
            { label: '공공기관 AX 쇼케이스', url: 'showcase.html?target=public', icon: 'fa-arrow-left' },
            { label: '울산제일일보 기고 칼럼 원문', url: 'http://www.ujeil.com/news/articleView.html?idxno=395546', icon: 'fa-newspaper', external: true }
        ],
        notes: '기기를 막는 소극적 방어전을 끝내고 암기 교육의 시대에 마침표를 찍을 때입니다. 모국어로 깊이 질문하고 인간다운 가치판단을 지키는 새 판을, 바로 여기 울산 진로센터 현장에서부터 함께 짜나가겠습니다. 경청해 주셔서 진심으로 감사합니다!'
    }
];
