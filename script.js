const contentData = {
    business: {
        title: "기업/비즈니스 자동화",
        image: "assets/images/infographic_business_ai.png",
        insights: [
            "조직 내 AI 내재화를 위한 기업 맞춤형 AI 도입 전략 수립 및 임직원 실무 교육",
            "개인별 업무 생산성 300% 향상을 위한 직무 특화 고효율 프롬프트 엔지니어링 실무 컨설팅",
            "의사결정 최적화 및 비용 절감을 위한 엔터프라이즈급 AI 자동화 워크플로우 설계 가이드라인"
        ]
    },
    public: {
        title: "공공기관/행정혁신",
        image: "assets/images/infographic_public_ai.png",
        insights: [
            "화성시청 및 순창군 사례 기반의 데이터 중심 지능형 행정 서비스 및 스마트 시티 정책 컨설팅",
            "공직자 실무 역량 강화를 위한 AI 보좌관 활용법 및 행정 프로세스 혁신 교육 솔루션",
            "지역 사회 문제 해결과 시민 체감도 향상을 위한 공공 부문 디지털 전환(DX) 전략 수립 및 자문"
        ]
    },
    citizen: {
        title: "일반인/직장인/시민",
        image: "assets/images/infographic_career_ai.png",
        insights: [
            "'2025 화성시민 AI 교육' 1,000여 명 수료 실적으로 증명된 전 연령대 맞춤형 AI 리터러시 교육",
            "커리어 성장을 위한 직장인 필수 AI 툴체인 구축 및 실무 생산성 극대화 코칭 프로그램",
            "시민의 일상을 바꾸는 생성형 AI 활용법 기반의 디지털 포용성 강화 및 미래 기술 교육"
        ]
    },
    senior: {
        title: "시니어/디지털 리터러시",
        image: "assets/images/infographic_senior_ai.png",
        insights: [
            "울산시 동구노동자센터 사례 등 전문 강사 양성과정을 통한 시니어 디지털 일자리 창출 전략",
            "6070 세대의 눈높이에 맞춘 단계별 생성형 AI 실전 활용 및 디지털 격차 해소 교육",
            "100세 시대 삶의 질 향상을 위한 AI 동행 서비스 활용 및 시니어 맞춤형 사회 참여 솔루션"
        ]
    }
};

const mediaData = [
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
    { title: "울산데이터센터 AI 시대의 가속기인가? 기후위기의 주범인가?", cat: "lecture", youtubeId: "ykMc7gc9lxI", isNew: true },
    { title: "최신 프롬프트 엔지니어링 기법", cat: "prompt", thumb: "assets/yt_prompt.png", isNew: true, lectureId: "17강_티이핑으로_이미지를_생성하다_20230831" },
    { title: "AI로 변화하는 비즈니스 지형", cat: "business", thumb: "assets/yt_business.png", isNew: true, lectureId: "14강_비즈니스_컨설팅_GAI활용_20230831" },
    { title: "시니어들을 위한 스마트폰 AI", cat: "senior", thumb: "assets/yt_senior.png", lectureId: "동구노동자센터" },
    { title: "GPT-4o 실무 활용법 마스터", cat: "prompt", thumb: "assets/yt_prompt.png", lectureId: "2강_ChatGPT_EI_20230818" },
    { title: "행정 업무 효율화 200% 비결", cat: "business", thumb: "assets/yt_business.png", lectureId: "북구청공무원특강_20240827" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Note: Legacy interactive showcase logic (selector/indicator) removed in favor of Maven-style grid.

    // YouTube Hub Logic - Enhanced for Hybrid
    const videoGrid = document.getElementById("video-grid");
    const featuredVideoGrid = document.getElementById("video-grid-featured");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // --- Video Modal Logic ---
    const videoModal = document.getElementById("video-modal");
    const videoIframe = document.getElementById("video-iframe");
    const closeVideoModal = document.querySelector(".close-video-modal");

    function openVideo(youtubeId) {
        if (!videoModal || !videoIframe) return;
        videoIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        videoModal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    if (closeVideoModal) {
        closeVideoModal.onclick = () => {
            videoModal.style.display = "none";
            videoIframe.src = "";
            document.body.style.overflow = "auto";
        };
    }

    if (videoModal) {
        window.addEventListener("click", (event) => {
            if (event.target == videoModal) {
                videoModal.style.display = "none";
                videoIframe.src = "";
                document.body.style.overflow = "auto";
            }
        });
    }

    // Export openVideo to global scope
    window.openVideo = openVideo;

    function renderVideos(filter, container) {
        if (!container) return;
        container.innerHTML = "";

        let filtered = filter === "all" ? videoData : videoData.filter(v => v.cat === filter);

        // 메인 페이지일 경우 상위 4개만 노출
        if (container.id === "video-grid-featured") {
            filtered = filtered.slice(0, 4);
        }

        filtered.forEach(video => {
            const card = document.createElement("div");
            card.className = "video-card reveal";

            const badge = video.isNew ? `<div class="new-badge">NEW</div>` : "";
            const lectureLink = video.lectureId ? `<a href="archive.html?id=${video.lectureId}" class="btn-mini btn-mini-blue">관련 강의안 →</a>` : "";

            // Use youtubeId if available, otherwise fallback to local thumb
            const thumbSrc = video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg` : video.thumb;

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

    // --- Phase 4: Dynamic Latest Content Grid ---
    function renderLatestContent() {
        const latestGrid = document.getElementById("latest-content-grid");
        if (!latestGrid) return;

        // 1. Get Latest Video
        const latestVideo = videoData[0];

        // 2. Get Latest Lecture (from data.js lectureData['2026'])
        let latestLecture = null;
        if (typeof lectureData !== 'undefined' && lectureData['2026']) {
            latestLecture = lectureData['2026'][0];
        }

        const items = [];
        if (latestVideo) items.push({ ...latestVideo, type: 'Video', link: 'youtube.html' });
        if (latestLecture) items.push({ ...latestLecture, type: 'Lecture', link: `archive.html?id=${latestLecture.id}`, thumb: latestLecture.img });

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

    // --- Showcase Page Initialization ---
    function initShowcase() {
        const insightList = document.getElementById("insight-list");
        if (!insightList) return; // Not on showcase page

        const urlParams = new URLSearchParams(window.location.search);
        const initialTarget = urlParams.get('target') || 'business';

        function updateShowcase(target) {
            const data = contentData[target];
            if (!data) return;

            // 1. Update Image
            const previewImg = document.querySelector(".slide-preview-wrapper img");
            if (previewImg) {
                previewImg.style.opacity = 0;
                setTimeout(() => {
                    previewImg.src = data.image;
                    previewImg.style.opacity = 1;
                }, 200);
            }

            // 2. Update Insights
            insightList.innerHTML = data.insights.map(i => `<li>${i}</li>`).join('');

            // 3. Update Buttons
            document.querySelectorAll(".target-btn").forEach(btn => {
                btn.classList.toggle("active", btn.dataset.target === target);
            });

            // 4. Update Section Subtitle (Optional enhancement)
            const heroSubtitle = document.querySelector(".hero-subtitle");
            if (heroSubtitle && data.title) {
                // Keep the general desc but can add specific context if needed
            }
        }

        // Add Listeners to switcher buttons
        document.querySelectorAll(".target-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.dataset.target;
                updateShowcase(target);
                // Update URL without reload for better UX
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?target=' + target;
                window.history.pushState({ path: newUrl }, '', newUrl);
            });
        });

        // Initial Load
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

    // Press & Media Loop Logic - Enhanced for Hybrid & Infinite Scroll
    const mediaGrid = document.getElementById("media-grid-dynamic");
    const featuredMediaGrid = document.getElementById("media-grid-featured");
    const loadMoreBtn = document.getElementById("load-more-media");
    let currentMediaIndex = 0;
    const itemsPerLoad = 8;

    function renderMedia(start, items, container) {
        if (!container) return;

        const isFeatured = container.id === "media-grid-featured";
        const slice = isFeatured ? mediaData.slice(0, 3) : mediaData.slice(start, start + items);

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

        // 상세페이지용 무한 스크롤 관찰자
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

    if (featuredMediaGrid) renderMedia(0, 3, featuredMediaGrid);

    // Smooth Scroll
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
                        <div class="modal-title">${data.title}</div>
                        <div class="modal-sub">${data.sub}</div>
                        <div class="modal-text">${data.desc}</div>
                        <div class="modal-highlights">
                            <ul>${data.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
                        </div>
                        <a href="${data.link}" target="_blank" class="modal-btn">상세보기 / 구매하기</a>
                    </div>
                </div>
            `;
            bookModal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    if (closeModal) {
        closeModal.onclick = () => {
            if (bookModal) bookModal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (event) => {
        if (bookModal && event.target == bookModal) {
            bookModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
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

        // 1. 아카이브 전용: 전체 사진 그리드 렌더링
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

        // 2. 메인 페이지 요약 노출 (12장만)
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

    // Impact Counter Animation Logic (Looping)
    const animateCount = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16);
        const update = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        update();
    };

    const impactSection = document.querySelector(".impact-strip");
    if (impactSection) {
        let loopStarted = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loopStarted) {
                loopStarted = true;
                const el1 = document.getElementById("attendee-count");
                const el2 = document.getElementById("age-range-start");
                const el3 = document.getElementById("age-range-end");

                const runCounters = () => {
                    if (el1) animateCount(el1, 20000, 2000);
                    if (el2) animateCount(el2, 8, 1500);
                    if (el3) animateCount(el3, 80, 1500);
                };

                runCounters(); // Initial trigger
                setInterval(runCounters, 8000); // Pulse every 8 seconds
            }
        }, { threshold: 0.5 });
        observer.observe(impactSection);
    }

    // --- Scroll Reveal Animation Logic ---
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // threshold를 0.05로 낮추어 살짝만 보여도 애니메이션 실행
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
        // Update total visitors
        const visitorEl = document.getElementById("visitor-count-display");
        if (visitorEl) {
            const startVal = parseInt(visitorEl.textContent.replace(/,/g, '')) || 0;
            animateCount(visitorEl, currentStats.total_visitors, 1000);
        }

        // Update Project Badges
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

        // Update Slide Clicks
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

    // Live growth simulation (Increment visitor count occasionally while on page)
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 15s to simulated a new hit
            currentStats.total_visitors += 1;
            updateDisplay();
        }
    }, 15000);

    // Global Event Listener for Stats
    document.addEventListener("click", (e) => {
        const target = e.target.closest("[data-stat-key]");
        if (target) {
            const key = target.dataset.statKey;
            const subKey = target.dataset.statSubkey;
            incrementStat(key, subKey);
        }
    });

    // Initial Load
    fetchStats();
    setTimeout(() => incrementStat("total_visitors"), 2000); // Record visit after 2s

    revealElements(); // Initialize scroll reveal

    // --- Mobile Menu Toggle Logic ---
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

        // Close menu when clicking a link
        mobileSidebar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", toggleMenu);
        });
    }
});
