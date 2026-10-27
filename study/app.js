/**
 * 중학 영단어 9레벨 마스터 플랫폼 프론트엔드 애플리케이션 (app.js)
 * - 부여된 학생 아이디 로그인 & 교사용 학생 발급 관리
 * - 9레벨 어휘 진단 테스트 (Level 1 ~ Level 9 자동 판정)
 * - 학생 개인 일정 맞춤 공부 플래너 (요일, 일일 목표 단어 수, 완주 예상일 계산)
 * - 학습 진도 대시보드 (9레벨 로드맵, 출석/진도 캘린더, 마스터리 현황)
 * - 플러그인형 단어 암기/습득 엔진 (원어민 발음 TTS + 4단계 학습 & 추후 암기법 플랜 연동 슬롯)
 */

const app = {
  state: {
    user: null,
    activeTab: 'dashboard',
    dashboardData: null,
    accountsPreview: [],
    // 레벨 테스트 상태
    levelTest: {
      inProgress: false,
      questions: [],
      currentIndex: 0,
      answers: [],
      result: null
    },
    // 오늘의 단어 학습 세션 상태
    studySession: {
      loading: false,
      words: [],
      currentIndex: 0,
      step: 1, // 1: 시각/발음 탐색, 2: 예문 빈칸 맥락, 3: 4지선다 인출, 4: 스펠링 타이핑
      results: [], // [{ wordId, status, correctCount, wrongCount }]
      completed: false,
      feedbackMessage: null,
      quizAnswered: false
    },
    // 단어장 필터 상태
    wordbook: {
      selectedLevel: 1,
      searchQuery: '',
      words: []
    },
    // 관리자 페이지 상태
    admin: {
      students: []
    },
    // AI 사이언스 랩 학습 상태 (ai_Science.md)
    science: {
      curriculum: [],
      selectedDomain: 'all', // 'all' | 'physics' | 'chemistry' | 'biology' | 'earth'
      selectedGrade: 'all', // 'all' | 1 | 2 | 3
      selectedUnitId: 'phys_ohm',
      currentUnit: null,
      unitLogs: [],
      quizScores: {},
      isMastered: false,
      simParams: {
        voltage: 12,
        resistance: 4,
        temperature: 20,
        volume: 80,
        lightIntensity: 60,
        co2Level: 2,
        bioTemp: 25,
        mantleHeat: 2,
        boundaryType: 1,
        height: 50,
        mass: 500,
        waterTemp: 60,
        soluteAdded: 80,
        orbitAngle: 90
      },
      paramLocks: {},
      circuitSwitchOn: true,
      flipCardFlipped: false,
      coachChatLog: [],
      activeQuizIndex: 0,
      selectedQuizOption: null,
      quizAnswerResult: null,
      simAnimId: null,
      particles: []
    },
    // AI 수학 학습 상태
    math: {
      curriculum: null,
      selectedGrade: 1,
      selectedUnitId: 1,
      selectedLevel: 'medium',
      currentUnit: null,
      currentProblem: null,
      steppingStoneDone: false,
      steppingStoneFeedback: null,
      revealedHintStep: 0,
      showingStoryModal: false,
      showPlannerModal: false,
      showPhotoModal: false,
      plannerData: null,
      photoQuery: '',
      photoResult: null,
      problemAnswered: false,
      userChoice: null,
      answerResult: null
    }
  },

  async init() {
    const savedUser = localStorage.getItem('voca9_user');
    await this.loadAccountsPreview();

    const urlParams = new URLSearchParams(window.location.search);
    const hasSubject = urlParams.get('subject') || urlParams.get('tab');

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        await this.loginWithCredentials(parsed.id, '1234', true);
        return;
      } catch (e) {
        localStorage.removeItem('voca9_user');
      }
    }

    // 쇼케이스나 외부 링크에서 과목 딥링크로 접속한 경우 기본 학생 계정(mid01)으로 원클릭 자동 로그인
    if (hasSubject || (this.state.accountsPreview && this.state.accountsPreview.length > 0)) {
      const defaultStudent = this.state.accountsPreview.find(a => a.role === 'student') || { id: 'mid01' };
      await this.loginWithCredentials(defaultStudent.id, '1234', true);
      return;
    }

    this.renderLogin();
  },

  showToast(msg) {
    const box = document.getElementById('toastBox');
    const text = document.getElementById('toastMessage');
    if (!box || !text) return;
    text.textContent = msg;
    box.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      box.classList.add('hidden');
    }, 3200);
  },

  // 원어민 발음 재생 (Web Speech API)
  speakWord(text) {
    if (!('speechSynthesis' in window)) {
      this.showToast('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  },

  async loadAccountsPreview() {
    try {
      const res = await fetch('/api/accounts-preview');
      const data = await res.json();
      this.state.accountsPreview = data.accounts || [];
    } catch (e) {
      console.error(e);
    }
  },

  async loginWithCredentials(id, password, silent = false) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
      });
      const data = await res.json();
      if (!res.ok) {
        if (!silent) this.showToast(data.error || '로그인에 실패했습니다.');
        this.renderLogin();
        return;
      }

      this.state.user = data.user;
      localStorage.setItem('voca9_user', JSON.stringify(data.user));
      this.updateHeaderUI();

      const urlParams = new URLSearchParams(window.location.search);
      const targetSubject = urlParams.get('subject') || urlParams.get('tab');

      if (targetSubject === 'math') {
        await this.switchTab('math');
      } else if (targetSubject === 'science') {
        await this.switchTab('science');
      } else if (targetSubject === 'zombie') {
        await this.switchTab('zombie');
      } else if (targetSubject === 'voca') {
        await this.switchTab('wordbook');
      } else if (data.user.role === 'admin') {
        await this.switchTab('admin');
      } else if (!data.user.levelTestCompleted) {
        this.showToast('환영합니다! 먼저 9레벨 어휘 진단 테스트를 진행해 나의 레벨을 설정해보세요.');
        await this.switchTab('leveltest');
      } else {
        await this.switchTab('dashboard');
      }
    } catch (e) {
      this.showToast('서버 연결 오류가 발생했습니다.');
    }
  },

  logout() {
    this.state.user = null;
    this.state.dashboardData = null;
    localStorage.removeItem('voca9_user');
    document.getElementById('mainNav').classList.add('hidden');
    document.getElementById('mobileNav').classList.add('hidden');
    const vocaSub = document.getElementById('vocaSubNav');
    if (vocaSub) vocaSub.classList.add('hidden');
    document.getElementById('userHeaderArea').classList.add('hidden');
    this.loadAccountsPreview().then(() => this.renderLogin());
  },

  goHome() {
    if (!this.state.user) {
      this.renderLogin();
    } else if (this.state.user.role === 'admin') {
      this.switchTab('admin');
    } else {
      this.switchTab('dashboard');
    }
  },

  updateHeaderUI() {
    const user = this.state.user;
    if (!user) return;

    document.getElementById('mainNav').classList.remove('hidden');
    document.getElementById('mobileNav').classList.remove('hidden');
    const userArea = document.getElementById('userHeaderArea');
    userArea.classList.remove('hidden');
    userArea.classList.add('flex');

    document.getElementById('headerUserName').textContent = user.name;
    document.getElementById('headerUserId').textContent = `부여 아이디: ${user.id} · ${user.grade}`;

    const badge = document.getElementById('headerUserLevelBadge');
    if (user.role === 'admin') {
      badge.textContent = '교사 관리자';
      badge.className = 'text-xs font-bold px-2 py-0.5 rounded-md bg-amber-600 text-white';
      document.getElementById('adminTabBtn').classList.remove('hidden');
      document.getElementById('mobileAdminTabBtn').classList.remove('hidden');
    } else {
      badge.textContent = user.assignedLevel ? `Level ${user.assignedLevel}` : '레벨 미진단';
      badge.className = 'text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white';
      document.getElementById('adminTabBtn').classList.add('hidden');
      document.getElementById('mobileAdminTabBtn').classList.add('hidden');
    }
  },

  async switchTab(tabName) {
    this.stopZombieAllTimers();
    if (this.state.science && this.state.science.simAnimId) {
      cancelAnimationFrame(this.state.science.simAnimId);
      this.state.science.simAnimId = null;
    }
    this.state.activeTab = tabName;

    // 분류 결정: 영단어(voca) vs 수학(math) vs 과학(science) vs 대시보드(dashboard) vs 관리자(admin)
    const vocaTabs = ['zombie', 'ailab', 'study', 'planner', 'leveltest', 'wordbook'];
    let mainCategory = 'dashboard';
    if (vocaTabs.includes(tabName)) {
      mainCategory = 'voca';
    } else if (tabName === 'math') {
      mainCategory = 'math';
    } else if (tabName === 'science') {
      mainCategory = 'science';
    } else if (tabName === 'admin') {
      mainCategory = 'admin';
    }

    // 4대 메인 탭바 활성화 상태 업데이트
    document.querySelectorAll('.main-tab-btn').forEach(btn => {
      const tab = btn.getAttribute('data-main-tab');
      btn.classList.remove('tab-active', 'tab-active-math', 'tab-active-science', 'tab-active-dashboard');
      if (tab === mainCategory) {
        if (mainCategory === 'math') {
          btn.classList.add('tab-active-math');
        } else if (mainCategory === 'science') {
          btn.classList.add('tab-active-science');
        } else if (mainCategory === 'dashboard') {
          btn.classList.add('tab-active-dashboard');
        } else {
          btn.classList.add('tab-active');
        }
      }
    });

    // 영단어 2차 보조 서브 툴바 제어
    const vocaSub = document.getElementById('vocaSubNav');
    if (vocaSub) {
      if (mainCategory === 'voca') {
        vocaSub.classList.remove('hidden');
        document.querySelectorAll('.voca-sub-btn').forEach(subBtn => {
          const subKey = subBtn.getAttribute('data-voca-sub');
          if (subKey === tabName) {
            subBtn.className = 'voca-sub-btn whitespace-nowrap px-3 py-1 rounded-lg text-xs voca-sub-active transition';
          } else {
            subBtn.className = 'voca-sub-btn whitespace-nowrap px-3 py-1 rounded-lg text-xs voca-sub-inactive transition';
          }
        });
      } else {
        vocaSub.classList.add('hidden');
      }
    }

    if (tabName === 'dashboard') {
      await this.loadDashboard();
      this.renderDashboard();
    } else if (tabName === 'zombie') {
      await this.loadDashboard();
      await this.initZombieGameWave();
    } else if (tabName === 'math') {
      await this.loadDashboard();
      await this.initMathApp();
    } else if (tabName === 'science') {
      await this.loadDashboard();
      await this.initScienceApp();
    } else if (tabName === 'ailab') {
      await this.loadDashboard();
      await this.initAiLab();
    } else if (tabName === 'study') {
      await this.loadDashboard();
      await this.startStudySession('daily');
    } else if (tabName === 'planner') {
      await this.loadDashboard();
      this.renderPlanner();
    } else if (tabName === 'leveltest') {
      await this.loadDashboard();
      this.renderLevelTestIntro();
    } else if (tabName === 'wordbook') {
      const defaultLv = (this.state.user && this.state.user.assignedLevel) || 1;
      this.state.wordbook.selectedLevel = defaultLv;
      await this.loadWordbook(defaultLv, '');
      this.renderWordbook();
    } else if (tabName === 'admin') {
      await this.loadAdminStudents();
      this.renderAdmin();
    }
  },

  async loadDashboard() {
    if (!this.state.user) return;
    const targetId = this.state.user.role === 'admin' ? 'mid02' : this.state.user.id;
    const res = await fetch(`/api/student/dashboard?studentId=${encodeURIComponent(targetId)}`);
    if (res.ok) {
      this.state.dashboardData = await res.json();
      if (this.state.user.role !== 'admin') {
        this.state.user.assignedLevel = this.state.dashboardData.student.assignedLevel;
        this.state.user.levelTestCompleted = this.state.dashboardData.student.levelTestCompleted;
        this.state.user.studyPlan = this.state.dashboardData.student.studyPlan;
        this.updateHeaderUI();
      }
    }
  },

  // =========================================================================
  // 1. 로그인 화면 (부여된 학생 ID로 접속 + 원클릭 데모 계정 선택)
  // =========================================================================
  renderLogin() {
    const root = document.getElementById('appRoot');
    const studentAccounts = this.state.accountsPreview.filter(a => a.role === 'student');
    const adminAccount = this.state.accountsPreview.find(a => a.role === 'admin');

    root.innerHTML = `
      <div class="max-w-4xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- 좌측 소개 영역 -->
        <div class="lg:col-span-6 space-y-5">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            ✨ 대한민국 교육부 지정 중학교 필수 영단어 완벽 수록
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            나의 레벨에 딱 맞춘<br />
            <span class="text-indigo-600">9레벨 스마트 영단어</span> 학습 플랫폼
          </h1>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            레벨 테스트를 통해 중학교 필수 어휘를 <strong>Level 1(중1 기초)부터 Level 9(중3 심화)</strong>까지 진단받고,
            나만의 요일별 학습 플랜과 진도 대시보드로 매일 성취감을 경험하세요.
          </p>

          <div class="grid grid-cols-2 gap-3 pt-2">
            <div class="bg-white p-4 rounded-2xl border border-slate-200 card-shadow">
              <div class="text-xl mb-1">🎯</div>
              <div class="font-bold text-sm text-slate-900">9단계 정밀 레벨 테스트</div>
              <p class="text-xs text-slate-500 mt-1">학년·난이도별 어휘 진단으로 내게 꼭 맞는 출발 레벨 배정</p>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200 card-shadow">
              <div class="text-xl mb-1">📅</div>
              <div class="font-bold text-sm text-slate-900">맞춤형 공부 스케줄러</div>
              <p class="text-xs text-slate-500 mt-1">공부 요일과 일일 단어 수를 정하면 완주일 자동 계산</p>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200 card-shadow">
              <div class="text-xl mb-1">📊</div>
              <div class="font-bold text-sm text-slate-900">실시간 진도 대시보드</div>
              <p class="text-xs text-slate-500 mt-1">9레벨 로드맵 게이지와 일일 학습 캘린더 한눈에 확인</p>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200 card-shadow">
              <div class="text-xl mb-1">🔌</div>
              <div class="font-bold text-sm text-slate-900">플러그인 암기 엔진</div>
              <p class="text-xs text-slate-500 mt-1">원어민 발음 + 단계별 인출 훈련 및 맞춤 암기법 확장 구조</p>
            </div>
          </div>
        </div>

        <!-- 우측 아이디 로그인 박스 -->
        <div class="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 card-shadow">
          <h2 class="text-xl font-extrabold text-slate-900">부여받은 학생 아이디로 시작하기</h2>
          <p class="text-xs text-slate-500 mt-1">선생님께 부여받은 고유 아이디(ID)와 비밀번호를 입력하세요.</p>

          <form onsubmit="event.preventDefault(); app.handleLoginForm();" class="space-y-4 mt-6">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">학생 / 교사 아이디 (ID)</label>
              <input id="loginIdInput" type="text" required placeholder="예: mid01, mid02, mid03, teacher"
                class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">비밀번호 (PIN)</label>
              <input id="loginPwInput" type="password" value="1234" required placeholder="기본값: 1234"
                class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <button type="submit"
              class="w-full py-3.5 rounded-xl gradient-header text-white font-bold text-sm shadow-md hover:opacity-95 transition">
              학습 플랫폼 입장하기 →
            </button>
          </form>

          <!-- 원클릭 체험용 학생 아이디 카드 -->
          <div class="mt-7 pt-6 border-t border-slate-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-slate-700">⚡ 클릭 한 번으로 바로 체험하기 (사전 발급된 아이디)</span>
              <span class="text-[11px] text-slate-400">비밀번호 공통: 1234</span>
            </div>
            <div class="space-y-2">
              ${studentAccounts.map(acc => `
                <button onclick="app.loginWithCredentials('${acc.id}', '1234')"
                  class="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition flex items-center justify-between group">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm text-slate-900 group-hover:text-indigo-700">${acc.name}</span>
                      <span class="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">ID: ${acc.id}</span>
                    </div>
                    <p class="text-xs text-slate-500 mt-0.5">${acc.grade} · ${acc.levelTestCompleted ? `배정 레벨: Level ${acc.assignedLevel}` : '레벨 테스트 미응시 (신규 학생 플로우)'}</p>
                  </div>
                  <span class="text-xs font-bold text-indigo-600">바로 입장 →</span>
                </button>
              `).join('')}

              ${adminAccount ? `
                <button onclick="app.loginWithCredentials('${adminAccount.id}', '1234')"
                  class="w-full text-left p-3 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 transition flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm text-amber-900">👩‍🏫 ${adminAccount.name}</span>
                      <span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">ID: ${adminAccount.id}</span>
                    </div>
                    <p class="text-xs text-amber-700 mt-0.5">학생 신규 아이디 발급 및 전체 학생 학습 진도율 모니터링</p>
                  </div>
                  <span class="text-xs font-bold text-amber-800">관리자 접속 →</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  handleLoginForm() {
    const id = document.getElementById('loginIdInput').value;
    const pw = document.getElementById('loginPwInput').value;
    this.loginWithCredentials(id, pw);
  },

  // =========================================================================
  // 2. 학생용 메인 학습 진도 대시보드 (Dashboard)
  // =========================================================================
  renderDashboard() {
    const root = document.getElementById('appRoot');
    const d = this.state.dashboardData;
    if (!d) {
      root.innerHTML = `<div class="p-12 text-center text-slate-500">대시보드를 불러오는 중입니다...</div>`;
      return;
    }

    const { student, summary, levelStats, upcomingSchedule, reviewWords, memoryEngineConfig } = d;
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const studyDaysText = (student.studyPlan?.studyDays || [1, 2, 3, 4, 5]).map(day => dayNames[day]).join('·');

    root.innerHTML = `
      <div class="space-y-6">
        <!-- 상단 배너: 학생 환영 메시지 & 오늘의 학습 바로가기 -->
        <div class="gradient-header rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
              <span>🎓 ${student.grade}</span>
              <span>·</span>
              <span>현재 목표: Level ${summary.currentLevel} 마스터</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold">
              안녕하세요, ${student.name} 학생! 👋
            </h2>
            <p class="text-indigo-100 text-sm">
              나의 공부 일정: <strong>매주 [${studyDaysText}]요일</strong> · 하루 <strong>${summary.dailyTarget}단어</strong> 목표
              (Level ${summary.currentLevel} 예상 완주일: <strong>${summary.estimatedCompletionDate}</strong>)
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button onclick="app.switchTab('zombie')"
              class="px-6 py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg hover:bg-emerald-300 transition flex items-center gap-2">
              🧟 좀비 디펜스 게임으로 암기하기 (Lv.${summary.currentLevel} 자동장전)
            </button>
            <button onclick="app.switchTab('study')"
              class="px-5 py-3.5 rounded-2xl bg-white text-indigo-700 font-extrabold text-sm shadow-md hover:bg-indigo-50 transition flex items-center gap-2">
              🧠 4단계 학습 (${summary.todayStudied}/${summary.dailyTarget}단어)
            </button>
            <button onclick="app.switchTab('ailab')"
              class="px-4 py-3.5 rounded-2xl bg-indigo-900/40 border border-white/30 text-white font-bold text-xs hover:bg-indigo-900/60 transition">
              🤖 AI 4대 암기비법
            </button>
          </div>
        </div>

        ${!student.levelTestCompleted ? `
          <div class="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div class="font-bold text-amber-900 text-sm">📢 아직 9레벨 어휘 진단 테스트를 완료하지 않았습니다!</div>
              <p class="text-xs text-amber-800 mt-0.5">레벨 테스트를 먼저 응시하면 나의 실력에 딱 맞는 레벨(Level 1~9)과 맞춤 공부 플랜이 설정됩니다.</p>
            </div>
            <button onclick="app.switchTab('leveltest')" class="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold whitespace-nowrap">
              지금 레벨 테스트 시작 →
            </button>
          </div>
        ` : ''}

        <!-- 핵심 지표 4개 카드 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white rounded-2xl p-5 border border-slate-200 card-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">현재 배정 학습 레벨</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">9단계 중 ${summary.currentLevel}단계</span>
            </div>
            <div class="text-2xl font-extrabold text-slate-900 mt-2">Level ${summary.currentLevel}</div>
            <div class="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div class="bg-indigo-600 h-full rounded-full" style="width: ${summary.currentLevelProgressPercent}%"></div>
            </div>
            <p class="text-xs text-slate-500 mt-2">레벨 진도율: <strong>${summary.currentLevelMastered} / ${summary.currentLevelTotal}단어 (${summary.currentLevelProgressPercent}%)</strong></p>
          </div>

          <div class="bg-white rounded-2xl p-5 border border-slate-200 card-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">오늘의 목표 달성률</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">일일 목표 ${summary.dailyTarget}개</span>
            </div>
            <div class="text-2xl font-extrabold text-slate-900 mt-2">${summary.todayGoalPercent}% 달성</div>
            <div class="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div class="bg-emerald-500 h-full rounded-full" style="width: ${summary.todayGoalPercent}%"></div>
            </div>
            <p class="text-xs text-slate-500 mt-2">오늘 학습한 단어: <strong>${summary.todayStudied}단어</strong> (완전 습득 ${summary.todayMastered}개)</p>
          </div>

          <div class="bg-white rounded-2xl p-5 border border-slate-200 card-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">누적 마스터 영단어</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">전체 9레벨 합산</span>
            </div>
            <div class="text-2xl font-extrabold text-slate-900 mt-2">${summary.totalMasteredAllLevels} <span class="text-sm font-semibold text-slate-400">/ ${summary.totalWordsInSystem}단어</span></div>
            <p class="text-xs text-slate-500 mt-3">현재 암기 중(복습 필요): <strong class="text-amber-600">${summary.totalLearningAllLevels}단어</strong></p>
          </div>

          <div class="bg-white rounded-2xl p-5 border border-slate-200 card-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500">Level ${summary.currentLevel} 완주 예상</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">남은 학습 ${summary.sessionsNeededForLevel}회</span>
            </div>
            <div class="text-xl font-extrabold text-slate-900 mt-2">${summary.estimatedCompletionDate}</div>
            <p class="text-xs text-slate-500 mt-3">주 ${(student.studyPlan?.studyDays || []).length}회 · 하루 ${summary.dailyTarget}단어 스케줄 기준</p>
          </div>
        </div>

        <!-- 중단 그리드: 9레벨 전체 로드맵 현황 & 14일 맞춤 학습 캘린더 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- 좌측 7칸: 중학교 필수 영단어 9레벨 로드맵 -->
          <div class="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 card-shadow">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-extrabold text-base text-slate-900">🗺️ 대한민국 중학교 필수단어 9레벨 로드맵</h3>
                <p class="text-xs text-slate-500 mt-0.5">원하는 레벨 카드를 클릭하면 해당 레벨로 학습 목표를 즉시 변경하거나 단어장을 볼 수 있습니다.</p>
              </div>
              <button onclick="app.switchTab('wordbook')" class="text-xs font-bold text-indigo-600 hover:underline">전체 단어장 보기 →</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${levelStats.map(st => {
                const isCurrent = st.level === summary.currentLevel;
                return `
                  <div onclick="app.quickChangeLevel(${st.level})"
                    class="cursor-pointer p-3.5 rounded-xl border transition ${isCurrent ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-indigo-300 bg-slate-50/40'}">
                    <div class="flex items-center justify-between">
                      <span class="font-extrabold text-sm ${isCurrent ? 'text-indigo-700' : 'text-slate-800'}">Level ${st.level}</span>
                      <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}">
                        ${isCurrent ? '현재 학습중' : st.gradeGroup}
                      </span>
                    </div>
                    <div class="mt-2.5 flex items-baseline justify-between text-xs">
                      <span class="text-slate-500">마스터 <strong class="text-slate-800">${st.masteredCount}</strong>/${st.totalWords}</span>
                      <span class="font-bold ${st.progressPercent > 0 ? 'text-indigo-600' : 'text-slate-400'}">${st.progressPercent}%</span>
                    </div>
                    <div class="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div class="bg-indigo-600 h-full rounded-full" style="width: ${st.progressPercent}%"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 우측 5칸: 나의 14일 일정 기반 공부 스케줄 캘린더 -->
          <div class="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 card-shadow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="font-extrabold text-base text-slate-900">📅 내 일정 맞춤 학습 캘린더 (2주)</h3>
                  <p class="text-xs text-slate-500 mt-0.5">설정한 학습 요일(${studyDaysText})에 맞춰 자동 배분된 일일 할당량입니다.</p>
                </div>
                <button onclick="app.switchTab('planner')" class="text-xs font-bold text-indigo-600 hover:underline">일정 수정</button>
              </div>

              <div class="grid grid-cols-7 gap-1.5 text-center">
                ${upcomingSchedule.map(day => {
                  const shortDate = day.date.slice(5).replace('-', '/');
                  let boxClass = 'bg-slate-50 border-slate-200 text-slate-400';
                  let badge = '휴식';
                  if (day.isDone) {
                    boxClass = 'bg-emerald-50 border-emerald-400 text-emerald-900';
                    badge = `✅ ${day.completedWords}개`;
                  } else if (day.isToday) {
                    boxClass = 'bg-indigo-600 border-indigo-600 text-white shadow-sm';
                    badge = `오늘 ${day.plannedWords}개`;
                  } else if (day.isStudyDay && day.plannedWords > 0) {
                    boxClass = 'bg-indigo-50/70 border-indigo-200 text-indigo-900';
                    badge = `예정 ${day.plannedWords}개`;
                  }
                  return `
                    <div class="p-2 rounded-xl border ${boxClass} flex flex-col items-center justify-center">
                      <span class="text-[10px] font-bold opacity-75">${day.dayLabel}</span>
                      <span class="text-xs font-extrabold mt-0.5">${shortDate}</span>
                      <span class="text-[10px] font-bold mt-1">${badge}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- 추후 연동될 단어 암기법 엔진 안내 박스 -->
            <div class="mt-5 p-3.5 rounded-xl bg-slate-900 text-white">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-indigo-300">🔌 단어 암기·습득 엔진 모듈 상태</span>
                <span class="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Pluggable Ready</span>
              </div>
              <div class="text-xs font-bold mt-1">${memoryEngineConfig.activeMethodName}</div>
              <p class="text-[11px] text-slate-300 mt-0.5">${memoryEngineConfig.description}</p>
            </div>
          </div>
        </div>

        <!-- 하단: 오답 노트 & 집중 복습 단어 리스트 -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200 card-shadow">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 class="font-extrabold text-base text-slate-900">📝 나만의 오답/복습 필요 단어장 (${reviewWords.length}단어)</h3>
              <p class="text-xs text-slate-500 mt-0.5">학습 중 틀렸거나 '헷갈려요(암기 중)'로 표시된 단어들입니다. 원어민 발음을 들으며 다시 복습해보세요.</p>
            </div>
            ${reviewWords.length > 0 ? `
              <button onclick="app.startStudySession('review')" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition">
                🔄 복습 필요 단어만 집중 학습하기
              </button>
            ` : ''}
          </div>

          ${reviewWords.length === 0 ? `
            <div class="p-6 text-center bg-slate-50 rounded-xl text-xs text-slate-500">
              현재 복습이 밀린 취약 단어가 없습니다! [오늘의 단어 학습]을 시작해 새로운 단어를 마스터해보세요.
            </div>
          ` : `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              ${reviewWords.map(w => `
                <div class="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between">
                      <span class="font-extrabold text-base text-slate-900">${w.word}</span>
                      <button onclick="app.speakWord('${w.word}')" class="text-xs px-2 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100">🔊 발음</button>
                    </div>
                    <div class="text-xs text-slate-500 mt-0.5">${w.partOfSpeech} · Level ${w.level}</div>
                    <div class="font-bold text-sm text-indigo-700 mt-1.5">${w.meaningKo}</div>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-2 pt-2 border-t border-amber-200/60 italic">"${w.exampleEn}"</p>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  async quickChangeLevel(level) {
    if (!this.state.dashboardData) return;
    const plan = this.state.dashboardData.student.studyPlan || { dailyTarget: 10, studyDays: [1, 2, 3, 4, 5] };
    await fetch('/api/student/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: this.state.dashboardData.student.id,
        currentLevel: level,
        dailyTarget: plan.dailyTarget,
        studyDays: plan.studyDays
      })
    });
    this.showToast(`학습 목표 레벨이 Level ${level}(으)로 변경되었습니다!`);
    await this.loadDashboard();
    this.renderDashboard();
  },

  // =========================================================================
  // 3. 9레벨 진단 레벨 테스트 (Placement Test)
  // =========================================================================
  renderLevelTestIntro() {
    const root = document.getElementById('appRoot');
    const student = this.state.dashboardData?.student || this.state.user;
    const history = student?.levelTestHistory || [];

    root.innerHTML = `
      <div class="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 card-shadow">
        <div class="text-center space-y-3">
          <span class="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold">
            🎯 9레벨 정밀 어휘력 진단 시스템
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">
            중학교 필수 영단어 9레벨 진단 테스트
          </h2>
          <p class="text-sm text-slate-600 max-w-xl mx-auto">
            Level 1(중1 기초)부터 Level 9(중3 심화·고교 연계)까지 단계별로 추출된 <strong>총 18문항</strong>을 풀면,
            학생의 현재 어휘 수준을 분석하여 <strong>가장 적합한 학습 시작 레벨(1~9)</strong>을 설정해 줍니다.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div class="text-xs font-bold text-slate-500">중1 필수 어휘군</div>
            <div class="font-extrabold text-base text-slate-900 mt-1">Level 1 ~ Level 3</div>
            <p class="text-xs text-slate-500 mt-1">기초 생활·학교 필수 어휘</p>
          </div>
          <div class="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-center">
            <div class="text-xs font-bold text-indigo-600">중2 필수 어휘군</div>
            <div class="font-extrabold text-base text-indigo-900 mt-1">Level 4 ~ Level 6</div>
            <p class="text-xs text-indigo-700 mt-1">교과 확장·핵심 독해 어휘</p>
          </div>
          <div class="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-center">
            <div class="text-xs font-bold text-purple-600">중3 필수 어휘군</div>
            <div class="font-extrabold text-base text-purple-900 mt-1">Level 7 ~ Level 9</div>
            <p class="text-xs text-purple-700 mt-1">심화 추상·고교 내신 연계</p>
          </div>
        </div>

        <div class="flex justify-center">
          <button onclick="app.startLevelTest()"
            class="px-8 py-4 rounded-2xl gradient-header text-white font-extrabold text-base shadow-lg hover:opacity-95 transition">
            🚀 지금 9레벨 진단 테스트 시작하기 (약 3분 소요)
          </button>
        </div>

        ${history.length > 0 ? `
          <div class="mt-8 pt-6 border-t border-slate-100">
            <h4 class="text-xs font-bold text-slate-500 mb-3">최근 레벨 테스트 진단 기록</h4>
            <div class="space-y-2">
              ${history.map(h => `
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                  <span class="text-slate-600">응시일: <strong>${h.date}</strong></span>
                  <span class="text-slate-700">정답: <strong>${h.correctCount}/${h.totalQuestions}문항 (${h.score}점)</strong></span>
                  <span class="font-extrabold text-indigo-600 px-2.5 py-1 rounded bg-indigo-50">판정: Level ${h.assignedLevel}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  async startLevelTest() {
    const res = await fetch('/api/level-test/questions');
    const data = await res.json();
    this.state.levelTest = {
      inProgress: true,
      questions: data.questions || [],
      currentIndex: 0,
      answers: [],
      result: null
    };
    this.renderLevelTestQuestion();
  },

  renderLevelTestQuestion() {
    const root = document.getElementById('appRoot');
    const lt = this.state.levelTest;
    const q = lt.questions[lt.currentIndex];
    const progressPct = Math.round(((lt.currentIndex + 1) / lt.questions.length) * 100);

    root.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 card-shadow">
        <div class="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>🎯 9레벨 진단 테스트 진행 중 (${q.gradeGroup} · 난이도 Lv.${q.level})</span>
          <span>문항 ${lt.currentIndex + 1} / ${lt.questions.length}</span>
        </div>
        <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
          <div class="bg-indigo-600 h-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <div class="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200 px-4">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">${q.partOfSpeech}</span>
          <div class="flex items-center justify-center gap-3 mt-3">
            <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">${q.word}</h3>
            <button onclick="app.speakWord('${q.word}')" class="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-sm" title="발음 듣기">🔊</button>
          </div>
          <p class="text-xs text-slate-500 mt-3 italic">예문 힌트: "${q.exampleCloze}"</p>
        </div>

        <div class="mt-6 space-y-2.5">
          <div class="text-xs font-bold text-slate-600 mb-2">다음 중 위 단어의 알맞은 뜻은 무엇인가요?</div>
          ${q.options.map((opt, idx) => `
            <button onclick="app.submitLevelTestAnswer(${idx})"
              class="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/60 font-bold text-sm text-slate-800 transition flex items-center gap-3">
              <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-extrabold">${idx + 1}</span>
              <span>${opt}</span>
            </button>
          `).join('')}

          <button onclick="app.submitLevelTestAnswer(-1)"
            class="w-full text-center py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition mt-2">
            잘 모르겠어요 (건너뛰기) →
          </button>
        </div>
      </div>
    `;
  },

  async submitLevelTestAnswer(optionIndex) {
    const lt = this.state.levelTest;
    const q = lt.questions[lt.currentIndex];
    const chosen = optionIndex >= 0 ? q.options[optionIndex] : null;
    const isCorrect = chosen === q.correctAnswer;

    lt.answers.push({
      wordId: q.wordId,
      level: q.level,
      isCorrect
    });

    if (lt.currentIndex + 1 < lt.questions.length) {
      lt.currentIndex++;
      this.renderLevelTestQuestion();
    } else {
      // 최종 결과 제출
      const studentId = this.state.dashboardData?.student?.id || this.state.user.id;
      const res = await fetch('/api/level-test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          answers: lt.answers
        })
      });
      const result = await res.json();
      lt.result = result;
      await this.loadDashboard();
      this.renderLevelTestResult();
    }
  },

  renderLevelTestResult() {
    const root = document.getElementById('appRoot');
    const res = this.state.levelTest.result;
    if (!res) return;

    root.innerHTML = `
      <div class="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 card-shadow text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold">
          🎉 9레벨 어휘 진단 완료!
        </div>

        <div>
          <p class="text-sm text-slate-500 font-semibold">학생에게 배정된 맞춤형 시작 레벨은</p>
          <div class="text-5xl font-extrabold text-indigo-600 mt-2">Level ${res.assignedLevel}</div>
          <p class="text-sm font-bold text-slate-700 mt-3 max-w-lg mx-auto">${res.levelDescription}</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-xs text-slate-500">정답 문항 수</div>
            <div class="text-xl font-extrabold text-slate-900 mt-1">${res.totalCorrect} / ${res.totalQuestions}</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-xs text-slate-500">종합 진단 점수</div>
            <div class="text-xl font-extrabold text-indigo-600 mt-1">${res.scorePercent}점</div>
          </div>
          <div class="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
            <div class="text-xs text-indigo-600">배정 레벨</div>
            <div class="text-xl font-extrabold text-indigo-900 mt-1">Level ${res.assignedLevel} / 9</div>
          </div>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="app.switchTab('planner')"
            class="w-full sm:w-auto px-6 py-3.5 rounded-2xl gradient-header text-white font-extrabold text-sm shadow-md">
            📅 Level ${res.assignedLevel} 맞춤 공부 플랜 세우기 →
          </button>
          <button onclick="app.switchTab('study')"
            class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm">
            🧠 바로 오늘의 단어 학습 시작하기
          </button>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 4. 학생 맞춤형 공부 플래너 (Study Schedule Generator)
  // =========================================================================
  renderPlanner() {
    const root = document.getElementById('appRoot');
    const d = this.state.dashboardData;
    if (!d) return;

    const plan = d.student.studyPlan || {
      currentLevel: d.student.assignedLevel || 1,
      dailyTarget: 10,
      studyDays: [1, 2, 3, 4, 5]
    };

    const dayList = [
      { dow: 1, label: '월요일' },
      { dow: 2, label: '화요일' },
      { dow: 3, label: '수요일' },
      { dow: 4, label: '목요일' },
      { dow: 5, label: '금요일' },
      { dow: 6, label: '토요일' },
      { dow: 0, label: '일요일' }
    ];

    root.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 card-shadow">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
            <div>
              <span class="text-xs font-bold text-indigo-600">📅 개인 일정 맞춤형 공부 플랜 설정</span>
              <h2 class="text-2xl font-extrabold text-slate-900 mt-1">나만의 9레벨 단어 학습 스케줄러</h2>
              <p class="text-xs text-slate-500 mt-1">나의 목표 레벨, 공부할 요일, 하루 암기할 단어 수를 선택하면 예상 완주 일정이 자동 계산됩니다.</p>
            </div>
          </div>

          <div class="space-y-6 mt-6">
            <!-- 1. 학습할 레벨 선택 (1~9) -->
            <div>
              <label class="block text-sm font-extrabold text-slate-800 mb-2">
                1️⃣ 학습할 목표 레벨 선택 (레벨 테스트 추천: Level ${d.student.assignedLevel || 1})
              </label>
              <div class="grid grid-cols-3 sm:grid-cols-9 gap-2">
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lv => `
                  <button type="button" onclick="app.selectPlannerLevel(${lv})" data-plan-level="${lv}"
                    class="plan-lv-btn py-3 rounded-xl border text-center font-extrabold text-sm transition ${plan.currentLevel === lv ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-400'}">
                    Lv.${lv}
                  </button>
                `).join('')}
              </div>
              <p class="text-xs text-slate-500 mt-2">
                * Level 1~3: 중1 기초 어휘 | Level 4~6: 중2 중급 어휘 | Level 7~9: 중3 심화·고교 연계 어휘
              </p>
            </div>

            <!-- 2. 공부할 요일 선택 -->
            <div>
              <label class="block text-sm font-extrabold text-slate-800 mb-2">
                2️⃣ 매주 공부할 요일 선택 (복수 선택)
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-7 gap-2">
                ${dayList.map(item => {
                  const active = (plan.studyDays || []).includes(item.dow);
                  return `
                    <button type="button" onclick="app.togglePlannerDay(${item.dow})" data-plan-day="${item.dow}"
                      class="plan-day-btn py-3 rounded-xl border font-bold text-xs transition ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200'}">
                      ${item.label}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- 3. 하루 목표 단어 수 선택 -->
            <div>
              <label class="block text-sm font-extrabold text-slate-800 mb-2">
                3️⃣ 하루에 암기할 목표 단어 수
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                ${[
                  { count: 10, desc: '가볍게 매일 꾸준히 (추천)' },
                  { count: 15, desc: '표준 중학생 학습 속도' },
                  { count: 25, desc: '빠른 레벨업 집중 코스' },
                  { count: 50, desc: '방학/시험기간 단기 마스터' }
                ].map(opt => `
                  <button type="button" onclick="app.selectPlannerTarget(${opt.count})" data-plan-target="${opt.count}"
                    class="plan-target-btn p-4 rounded-2xl border text-left transition ${plan.dailyTarget === opt.count ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300'}">
                    <div class="font-extrabold text-lg text-slate-900">하루 ${opt.count}단어</div>
                    <div class="text-xs text-slate-500 mt-1">${opt.desc}</div>
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button onclick="app.savePlanner()"
                class="px-8 py-3.5 rounded-2xl gradient-header text-white font-extrabold text-sm shadow-md hover:opacity-95 transition">
                💾 나만의 공부 플랜 저장 및 대시보드 반영하기
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this._tempPlan = {
      currentLevel: plan.currentLevel,
      dailyTarget: plan.dailyTarget,
      studyDays: [...(plan.studyDays || [1, 2, 3, 4, 5])]
    };
  },

  selectPlannerLevel(lv) {
    this._tempPlan.currentLevel = lv;
    document.querySelectorAll('.plan-lv-btn').forEach(btn => {
      const btnLv = Number(btn.getAttribute('data-plan-level'));
      btn.className = `plan-lv-btn py-3 rounded-xl border text-center font-extrabold text-sm transition ${btnLv === lv ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-400'}`;
    });
  },

  togglePlannerDay(dow) {
    const idx = this._tempPlan.studyDays.indexOf(dow);
    if (idx >= 0) {
      if (this._tempPlan.studyDays.length <= 1) {
        this.showToast('최소 주 1일 이상은 학습 요일로 선택해야 합니다.');
        return;
      }
      this._tempPlan.studyDays.splice(idx, 1);
    } else {
      this._tempPlan.studyDays.push(dow);
    }
    document.querySelectorAll('.plan-day-btn').forEach(btn => {
      const d = Number(btn.getAttribute('data-plan-day'));
      const active = this._tempPlan.studyDays.includes(d);
      btn.className = `plan-day-btn py-3 rounded-xl border font-bold text-xs transition ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200'}`;
    });
  },

  selectPlannerTarget(count) {
    this._tempPlan.dailyTarget = count;
    document.querySelectorAll('.plan-target-btn').forEach(btn => {
      const c = Number(btn.getAttribute('data-plan-target'));
      btn.className = `plan-target-btn p-4 rounded-2xl border text-left transition ${c === count ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300'}`;
    });
  },

  async savePlanner() {
    const studentId = this.state.dashboardData?.student?.id || this.state.user.id;
    const res = await fetch('/api/student/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId,
        ...this._tempPlan
      })
    });
    if (res.ok) {
      this.showToast('맞춤 공부 플랜이 저장되었습니다!');
      await this.switchTab('dashboard');
    }
  },

  // =========================================================================
  // 5. 오늘의 단어 암기/습득 학습 모듈 (Pluggable Study Engine)
  // =========================================================================
  async startStudySession(mode = 'daily') {
    this.state.activeTab = 'study';
    const studentId = this.state.dashboardData?.student?.id || this.state.user.id;
    const res = await fetch(`/api/study/session?studentId=${encodeURIComponent(studentId)}&mode=${mode}`);
    const data = await res.json();

    this.state.studySession = {
      loading: false,
      mode,
      level: data.level,
      words: data.words || [],
      currentIndex: 0,
      step: 1,
      results: [],
      completed: false,
      feedbackMessage: null,
      quizAnswered: false,
      memoryEngineConfig: data.memoryEngineConfig
    };

    this.renderStudySession();
  },

  renderStudySession() {
    const root = document.getElementById('appRoot');
    const s = this.state.studySession;

    if (s.completed) {
      this.renderStudyComplete();
      return;
    }

    if (!s.words || s.words.length === 0) {
      root.innerHTML = `<div class="p-12 text-center bg-white rounded-3xl border">학습할 단어가 없습니다.</div>`;
      return;
    }

    const w = s.words[s.currentIndex];
    const progressPct = Math.round(((s.currentIndex) / s.words.length) * 100);
    const steps = [
      { num: 1, label: '1. 발음·시각 각인' },
      { num: 2, label: '2. 예문 빈칸 맥락' },
      { num: 3, label: '3. 빠른 뜻 인출' },
      { num: 4, label: '4. 스펠링 완성' }
    ];

    root.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-4">
        <!-- 상단 진행바 및 플러그인 엔진 배지 -->
        <div class="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-indigo-600 text-white">Level ${s.level}</span>
              <span class="text-sm font-extrabold text-slate-900">오늘의 필수 영단어 암기 세션 (${s.currentIndex + 1} / ${s.words.length})</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">🔌 ${s.memoryEngineConfig?.activeMethodName || '4단계 멀티센서리 암기 엔진'}</p>
          </div>
          <div class="flex items-center gap-1.5">
            ${steps.map(st => `
              <span class="text-[11px] font-bold px-2.5 py-1 rounded-lg ${s.step === st.num ? 'bg-indigo-600 text-white' : s.step > st.num ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}">
                ${st.label}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- 메인 단어 학습 카드 -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 card-shadow">
          ${this.renderStudyStepContent(w, s.step)}
        </div>
      </div>
    `;
  },

  renderStudyStepContent(w, step) {
    // 1단계: 단어 시각 확인 + 원어민 발음 듣기 + 음절 쪼개기
    if (step === 1) {
      return `
        <div class="text-center space-y-5">
          <span class="inline-block text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
            Step 1 · 눈으로 보고 귀로 원어민 발음을 익히세요
          </span>

          <div class="py-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="text-xs font-bold text-slate-400 mb-1">${w.gradeGroup} · ${w.partOfSpeech}</div>
            <div class="flex items-center justify-center gap-3">
              <h2 class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">${w.word}</h2>
              <button onclick="app.speakWord('${w.word}')"
                class="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow hover:bg-indigo-700 transition">
                🔊 발음 듣기
              </button>
            </div>
            <div class="text-xs text-slate-400 mt-2">음절 쪼개기: <strong class="text-slate-600">${(w.learningMetadata?.syllableChunks || [w.word]).join(' · ')}</strong></div>
            <div class="mt-5 pt-5 border-t border-slate-200/80">
              <div class="text-2xl sm:text-3xl font-extrabold text-indigo-600">${w.meaningKo}</div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-left">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-indigo-700">📘 교과서 핵심 예문</span>
              <button onclick="app.speakWord('${w.exampleEn.replace(/'/g, "\\'")}')" class="text-xs font-bold text-indigo-600 hover:underline">🔊 예문 전체 듣기</button>
            </div>
            <p class="font-bold text-sm text-slate-900 mt-1">"${w.exampleEn}"</p>
            <p class="text-xs text-slate-600 mt-0.5">${w.exampleKo}</p>
          </div>

          <div class="pt-2 flex justify-center">
            <button onclick="app.nextStudyStep()"
              class="w-full sm:w-auto px-10 py-4 rounded-2xl gradient-header text-white font-extrabold text-sm shadow-md">
              단어와 뜻을 확인했어요 (2단계 예문 맥락으로) →
            </button>
          </div>
        </div>
      `;
    }

    // 2단계: 예문 빈칸(Cloze) 맥락 연상
    if (step === 2) {
      return `
        <div class="text-center space-y-5">
          <span class="inline-block text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            Step 2 · 예문 속 빈칸에 들어갈 단어를 머릿속으로 떠올려 보세요
          </span>

          <div class="py-8 px-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div class="text-lg sm:text-xl font-extrabold text-slate-900">"${w.learningMetadata?.clozeExample}"</div>
            <div class="text-sm text-slate-600">${w.exampleKo}</div>
            <div class="pt-3">
              <span class="inline-block px-3 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
                힌트: ${w.meaningKo} (${w.learningMetadata?.firstLetterHint})
              </span>
            </div>
          </div>

          <div class="pt-2 flex justify-center gap-3">
            <button onclick="app.speakWord('${w.word}'); app.nextStudyStep();"
              class="w-full sm:w-auto px-10 py-4 rounded-2xl gradient-header text-white font-extrabold text-sm shadow-md">
              정답 [${w.word}] 확인 완료! (3단계 퀴즈 인출로) →
            </button>
          </div>
        </div>
      `;
    }

    // 3단계: 4지선다 빠른 뜻 인출 테스트
    if (step === 3) {
      return `
        <div class="space-y-5">
          <div class="text-center">
            <span class="inline-block text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700">
              Step 3 · 방금 익힌 단어의 뜻을 빠르게 골라보세요!
            </span>
            <h2 class="text-4xl font-extrabold text-slate-900 mt-4">${w.word}</h2>
            <p class="text-xs text-slate-400 mt-1">${w.partOfSpeech}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            ${w.quizOptions.map((opt, idx) => `
              <button onclick="app.handleStep3Quiz('${opt.replace(/'/g, "\\'")}')"
                class="p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 font-bold text-sm text-slate-800 text-left flex items-center gap-3 transition">
                <span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-extrabold">${idx + 1}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 4단계: 직접 스펠링 타이핑 완성 (또는 자기평가)
    return `
      <div class="text-center space-y-5">
        <span class="inline-block text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
          Step 4 · 마지막 단계! 한글 뜻을 보고 영어 철자(Spelling)를 완성하세요
        </span>

        <div class="py-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <div class="text-2xl font-extrabold text-indigo-700">${w.meaningKo}</div>
          <div class="text-xs text-slate-500">초성/글자수 힌트: <strong>${w.learningMetadata?.firstLetterHint}</strong></div>
          <button onclick="app.speakWord('${w.word}')" class="text-xs font-bold text-indigo-600 hover:underline">🔊 발음 힌트 다시 듣기</button>
        </div>

        <form onsubmit="event.preventDefault(); app.checkStep4Spelling();" class="max-w-md mx-auto space-y-3">
          <input id="spellingInput" type="text" autocomplete="off" placeholder="영어 단어를 입력하세요 (예: ${w.word})"
            class="w-full px-4 py-3.5 rounded-2xl border-2 border-indigo-300 text-center text-lg font-extrabold focus:outline-none focus:border-indigo-600" />
          <div class="flex gap-2">
            <button type="submit"
              class="flex-1 py-3.5 rounded-2xl gradient-header text-white font-extrabold text-sm shadow-md">
              ✅ 스펠링 정답 확인 (마스터)
            </button>
            <button type="button" onclick="app.markCurrentWordAs('learning')"
              class="px-4 py-3.5 rounded-2xl border border-amber-300 bg-amber-50 text-amber-800 font-bold text-xs">
              😅 아직 헷갈려요 (복습장 추가)
            </button>
          </div>
        </form>
      </div>
    `;
  },

  nextStudyStep() {
    this.state.studySession.step++;
    this.renderStudySession();
  },

  handleStep3Quiz(chosenMeaning) {
    const s = this.state.studySession;
    const w = s.words[s.currentIndex];
    if (chosenMeaning === w.meaningKo) {
      this.speakWord(w.word);
      s.step = 4;
      this.renderStudySession();
      setTimeout(() => {
        const inp = document.getElementById('spellingInput');
        if (inp) inp.focus();
      }, 50);
    } else {
      this.showToast(`아쉬워요! 정답은 [${w.meaningKo}] 입니다. 다시 한 번 기억해보세요.`);
      w._hadWrong = true;
    }
  },

  checkStep4Spelling() {
    const s = this.state.studySession;
    const w = s.words[s.currentIndex];
    const inp = document.getElementById('spellingInput');
    const typed = (inp ? inp.value : '').trim().toLowerCase();

    if (typed === w.word.toLowerCase()) {
      this.speakWord(w.word);
      this.markCurrentWordAs(w._hadWrong ? 'learning' : 'mastered');
    } else {
      this.showToast(`철자가 조금 달라요! 정답 철자는 [${w.word}] 입니다. 한 번 더 입력해보세요!`);
      w._hadWrong = true;
      if (inp) inp.value = w.word;
    }
  },

  async markCurrentWordAs(status) {
    const s = this.state.studySession;
    const w = s.words[s.currentIndex];

    s.results.push({
      wordId: w.id,
      status,
      correctCount: status === 'mastered' ? 1 : 0,
      wrongCount: status === 'learning' || w._hadWrong ? 1 : 0
    });

    if (s.currentIndex + 1 < s.words.length) {
      s.currentIndex++;
      s.step = 1;
      this.renderStudySession();
    } else {
      // 세션 종료 및 서버 저장
      const studentId = this.state.dashboardData?.student?.id || this.state.user.id;
      const res = await fetch('/api/study/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          results: s.results
        })
      });
      if (res.ok) {
        const data = await res.json();
        this.state.dashboardData = data.dashboard;
      }
      s.completed = true;
      this.renderStudyComplete();
    }
  },

  renderStudyComplete() {
    const root = document.getElementById('appRoot');
    const s = this.state.studySession;
    const masteredCnt = s.results.filter(r => r.status === 'mastered').length;
    const learningCnt = s.results.length - masteredCnt;

    root.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 card-shadow">
        <div class="text-5xl">🏆</div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">오늘의 목표 단어 학습을 완료했습니다!</h2>
        <p class="text-sm text-slate-600">
          총 <strong>${s.results.length}단어</strong> 학습 완료 · 완전 마스터 <strong class="text-emerald-600">${masteredCnt}단어</strong> · 복습 노트 추가 <strong class="text-amber-600">${learningCnt}단어</strong>
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <button onclick="app.switchTab('dashboard')"
            class="px-6 py-3.5 rounded-2xl gradient-header text-white font-extrabold text-sm shadow-md">
            📊 대시보드에서 올라간 진도율 확인하기 →
          </button>
          <button onclick="app.startStudySession('daily')"
            class="px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm">
            🔥 다음 단어 세트 추가로 더 공부하기
          </button>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 6. 9레벨 전체 필수 단어장 브라우저 (Wordbook)
  // =========================================================================
  async loadWordbook(level, search) {
    const studentId = this.state.dashboardData?.student?.id || this.state.user?.id || '';
    const res = await fetch(`/api/words?level=${level}&studentId=${encodeURIComponent(studentId)}&search=${encodeURIComponent(search || '')}`);
    const data = await res.json();
    this.state.wordbook.selectedLevel = level;
    this.state.wordbook.searchQuery = search || '';
    this.state.wordbook.words = data.words || [];
  },

  renderWordbook() {
    const root = document.getElementById('appRoot');
    const wb = this.state.wordbook;

    root.innerHTML = `
      <div class="space-y-6">
        <div class="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 class="text-xl font-extrabold text-slate-900">📚 대한민국 중학교 1~3학년 필수 1,800 영단어 9레벨 데이터베이스</h2>
              <p class="text-xs text-slate-500 mt-0.5">교육과정 기준 총 1,800단어 (각 레벨당 200단어 × 9레벨). 발음, 예문, 품사 및 AI 암기팁, 나의 습득 상태(마스터/암기중/학습전)를 확인할 수 있습니다.</p>
            </div>
            <div class="flex gap-2">
              <input id="wbSearchInput" type="text" value="${wb.searchQuery}" placeholder="영단어 또는 한글 뜻 검색..."
                onkeydown="if(event.key==='Enter') app.handleWordbookSearch()"
                class="px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button onclick="app.handleWordbookSearch()" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold">검색</button>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lv => `
              <button onclick="app.changeWordbookLevel(${lv})"
                class="px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${wb.selectedLevel === lv ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                Level ${lv} (${lv <= 3 ? '중1' : lv <= 6 ? '중2' : '중3'} · 200단어)
              </button>
            `).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${wb.words.map(w => {
            let statusBadge = `<span class="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">학습 전</span>`;
            if (w.studentStatus === 'mastered') {
              statusBadge = `<span class="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">✅ 마스터</span>`;
            } else if (w.studentStatus === 'learning') {
              statusBadge = `<span class="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">🔄 암기 중</span>`;
            }
            return `
              <div class="bg-white rounded-2xl p-5 border border-slate-200 card-shadow flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="text-xl font-extrabold text-slate-900">${w.word}</span>
                      <span class="text-xs text-slate-400 font-semibold">${w.partOfSpeech}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      ${statusBadge}
                      <button onclick="app.speakWord('${w.word}')" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs">🔊</button>
                    </div>
                  </div>
                  <div class="text-base font-bold text-indigo-600 mt-2">${w.meaningKo}</div>
                </div>
                <div class="mt-3 pt-3 border-t border-slate-100 text-xs">
                  <p class="font-medium text-slate-800">"${w.exampleEn}"</p>
                  <p class="text-slate-500 mt-0.5">${w.exampleKo}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  async changeWordbookLevel(lv) {
    await this.loadWordbook(lv, '');
    this.renderWordbook();
  },

  async handleWordbookSearch() {
    const q = document.getElementById('wbSearchInput').value;
    await this.loadWordbook(this.state.wordbook.selectedLevel, q);
    this.renderWordbook();
  },

  // =========================================================================
  // 7. 교사(관리자)용 학생 고유 아이디(ID) 발급 및 전체 학생 진도 관리 화면
  // =========================================================================
  async loadAdminStudents() {
    const res = await fetch('/api/admin/students');
    const data = await res.json();
    this.state.admin.students = data.students || [];
  },

  renderAdmin() {
    const root = document.getElementById('appRoot');
    const students = this.state.admin.students;

    root.innerHTML = `
      <div class="space-y-6">
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow">
          <h2 class="text-xl font-extrabold text-slate-900">👩‍🏫 학생 고유 아이디(ID) 발급 및 학습 진도 통합 관리</h2>
          <p class="text-xs text-slate-500 mt-1">학생들에게 부여할 아이디를 생성하고, 각 학생의 9레벨 진단 결과 및 일일 학습 달성률을 실시간으로 확인합니다.</p>

          <!-- 신규 학생 아이디 생성 폼 -->
          <form onsubmit="event.preventDefault(); app.createNewStudent();" class="mt-5 p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">부여할 학생 ID</label>
              <input id="newStuId" type="text" required placeholder="예: mid04" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">학생 이름</label>
              <input id="newStuName" type="text" required placeholder="예: 최유진" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">학년 구분</label>
              <select id="newStuGrade" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white">
                <option value="중학교 1학년">중학교 1학년</option>
                <option value="중학교 2학년">중학교 2학년</option>
                <option value="중학교 3학년">중학교 3학년</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">초기 레벨 설정</label>
              <select id="newStuLevel" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white">
                <option value="">학생이 직접 레벨테스트 응시</option>
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lv => `<option value="${lv}">Level ${lv} 직접 배정</option>`).join('')}
              </select>
            </div>
            <button type="submit" class="py-2.5 px-4 rounded-xl gradient-header text-white font-extrabold text-xs shadow">
              + 학생 ID 발급하기
            </button>
          </form>
        </div>

        <!-- 전체 학생 현황 테이블 -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 card-shadow overflow-x-auto">
          <h3 class="font-extrabold text-base text-slate-900 mb-4">📊 등록된 학생 계정 및 학습 진도 현황 (${students.length}명)</h3>
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 text-slate-500">
                <th class="py-3 px-3">부여 아이디 (PW)</th>
                <th class="py-3 px-3">이름 / 학년</th>
                <th class="py-3 px-3">진단 레벨</th>
                <th class="py-3 px-3">현재 레벨 진도율</th>
                <th class="py-3 px-3">오늘 학습 달성률</th>
                <th class="py-3 px-3">누적 마스터 단어</th>
                <th class="py-3 px-3 text-right">학생 화면 전환</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${students.map(st => `
                <tr class="hover:bg-slate-50">
                  <td class="py-3.5 px-3 font-mono font-bold text-indigo-700">${st.id} <span class="text-slate-400 font-normal">(${st.password})</span></td>
                  <td class="py-3.5 px-3 font-bold text-slate-900">${st.name} <span class="text-slate-500 font-normal">· ${st.grade}</span></td>
                  <td class="py-3.5 px-3">
                    ${st.levelTestCompleted
                      ? `<span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-extrabold">Level ${st.summary.currentLevel}</span>`
                      : `<span class="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">미진단</span>`}
                  </td>
                  <td class="py-3.5 px-3">
                    <div class="flex items-center gap-2">
                      <div class="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div class="bg-indigo-600 h-full" style="width: ${st.summary.currentLevelProgressPercent}%"></div>
                      </div>
                      <span class="font-bold">${st.summary.currentLevelProgressPercent}%</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-3 font-bold text-emerald-700">${st.summary.todayStudied} / ${st.summary.dailyTarget}단어 (${st.summary.todayGoalPercent}%)</td>
                  <td class="py-3.5 px-3 font-bold">${st.summary.totalMasteredAllLevels}단어</td>
                  <td class="py-3.5 px-3 text-right">
                    <button onclick="app.loginWithCredentials('${st.id}', '${st.password}')"
                      class="px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100">
                      이 학생으로 접속 →
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  async createNewStudent() {
    const id = document.getElementById('newStuId').value;
    const name = document.getElementById('newStuName').value;
    const grade = document.getElementById('newStuGrade').value;
    const assignedLevel = document.getElementById('newStuLevel').value;

    const res = await fetch('/api/admin/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, grade, assignedLevel })
    });
    const data = await res.json();
    if (!res.ok) {
      this.showToast(data.error || '학생 생성 실패');
      return;
    }
    this.showToast(data.message);
    await this.loadAccountsPreview();
    await this.loadAdminStudents();
    this.renderAdmin();
  },

  // =========================================================================
  // 8. 🧟 좀비 단어 디펜스 슈팅 게임 (30초 AI 브리핑 + 1~9번 총탄 & Spacebar 발사)
  // =========================================================================
  stopZombieAllTimers() {
    if (this._zombieBriefTimer) {
      clearInterval(this._zombieBriefTimer);
      this._zombieBriefTimer = null;
    }
    if (this._zombieGameLoop) {
      clearInterval(this._zombieGameLoop);
      this._zombieGameLoop = null;
    }
    if (this._zombieKeyHandler) {
      window.removeEventListener('keydown', this._zombieKeyHandler);
      this._zombieKeyHandler = null;
    }
  },

  // Web Audio API 기반 타격/발사 사운드 효과 (외부 오디오 파일 불필요)
  playGameSfx(type) {
    try {
      const ctx = this._audioCtx || (this._audioCtx = new (window.AudioContext || window.webkitAudioContext)());
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'reload') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.14);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'miss') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(170, now);
        osc.frequency.setValueAtTime(130, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {
      // 오디오 컨텍스트 제한 시 무시
    }
  },

  async initZombieGameWave(customOpts = {}) {
    this.stopZombieAllTimers();

    const prevG = this.state.zombieGame || {};
    const studentId = this.state.dashboardData?.student?.id || this.state.user?.id || 'mid02';
    const level = customOpts.level || prevG.level || this.state.dashboardData?.summary?.currentLevel || this.state.user?.assignedLevel || 1;
    const sortMode = customOpts.sortMode || prevG.sortMode || 'story';
    const theme = customOpts.theme || prevG.theme || 'all';
    const interest = customOpts.interest || prevG.interest || 'minecraft';

    const url = `/api/game/wave?studentId=${encodeURIComponent(studentId)}&level=${level}&sortMode=${sortMode}&theme=${encodeURIComponent(theme)}&interest=${interest}`;
    const res = await fetch(url);
    const data = await res.json();

    this.state.zombieGame = {
      phase: 'briefing', // 'briefing' (30초 단어 암기) | 'playing' (좀비 슈팅) | 'boss' (소크라테스/RPG 보스) | 'shield' (스펠링 부활) | 'result'
      level: data.level,
      sortMode: data.sortMode,
      theme,
      interest: data.interest,
      difficultyConfig: data.difficultyConfig,
      microStory: data.microStory,
      waveWords: data.waveWords || [],
      bossRiddleWord: data.bossRiddleWord,
      rpgEscapeWord: data.rpgEscapeWord,
      // 30초 카운트다운 상태
      briefingTimeLeft: 30,
      briefingPaused: false,
      selectedCardSlot: 1,
      // 전투 상태
      hp: 5,
      maxHp: 5,
      score: 0,
      combo: 0,
      maxCombo: 0,
      selectedSlot: 1, // 1~9번 한국어 뜻 총탄 선택 번호
      spawnQueue: [],
      activeZombies: [],
      defeatedCount: 0,
      totalWaveZombies: 9,
      wordResultsMap: {}, // wordId -> { status, wrongCount }
      shieldTargetZombie: null,
      bossStageIndex: 0, // 0: 소크라테스 스무고개 보스, 1: 텍스트 RPG 마법문 보스
      laserBeamInfo: null
    };

    this.renderZombieBriefing();
    this.startBriefingCountdown();
    this.bindZombieKeyboard();
  },

  startBriefingCountdown() {
    if (this._zombieBriefTimer) clearInterval(this._zombieBriefTimer);
    this._zombieBriefTimer = setInterval(() => {
      const g = this.state.zombieGame;
      if (!g || g.phase !== 'briefing' || g.briefingPaused) return;
      g.briefingTimeLeft--;
      const timerEl = document.getElementById('briefingTimerNumber');
      const barEl = document.getElementById('briefingTimerBar');
      if (timerEl) timerEl.textContent = g.briefingTimeLeft;
      if (barEl) barEl.style.width = `${Math.max(0, (g.briefingTimeLeft / 30) * 100)}%`;

      if (g.briefingTimeLeft <= 0) {
        clearInterval(this._zombieBriefTimer);
        this._zombieBriefTimer = null;
        this.startZombieBattlePhase();
      }
    }, 1000);
  },

  addBriefingTime(sec = 15) {
    const g = this.state.zombieGame;
    if (!g) return;
    g.briefingTimeLeft = Math.min(60, g.briefingTimeLeft + sec);
    const timerEl = document.getElementById('briefingTimerNumber');
    if (timerEl) timerEl.textContent = g.briefingTimeLeft;
    this.showToast(`⏱️ 암기 시간이 +${sec}초 연장되었습니다!`);
  },

  toggleBriefingPause() {
    const g = this.state.zombieGame;
    if (!g) return;
    g.briefingPaused = !g.briefingPaused;
    const btn = document.getElementById('briefingPauseBtn');
    if (btn) {
      btn.textContent = g.briefingPaused ? '▶️ 타이머 재개' : '⏸️ 타이머 일시정지';
    }
  },

  // STEP 1: 30초 단어 암기 & AI 브리핑 화면 렌더링
  renderZombieBriefing() {
    const root = document.getElementById('appRoot');
    const g = this.state.zombieGame;
    if (!g) return;

    const sortModes = [
      { id: 'story', label: '① 📖 지문·스토리 문맥순' },
      { id: 'alphabet', label: '② 🔤 알파벳(A~Z)순' },
      { id: 'theme', label: '③ 🎨 테마·주제별 묶음' },
      { id: 'wordorder', label: '④ 🧩 어순(명사→동사→수식어)순' }
    ];

    const interests = [
      { id: 'minecraft', label: '⛏️ 마인크래프트' },
      { id: 'brawlstars', label: '💥 브롤스타즈' },
      { id: 'soccer', label: '⚽ 손흥민 축구' },
      { id: 'kpop', label: '🎤 K-POP 아이돌' },
      { id: 'magic', label: '🪄 마법학교 RPG' }
    ];

    root.innerHTML = `
      <div class="space-y-5">
        <!-- 상단 컨트롤 바: 레벨 자동 제시 & 4가지 단어 배열 방식 & 관심사 선택 -->
        <div class="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold">
                  ⚡ 레벨별 자동 단어 큐레이션 완료
                </span>
                <span class="text-xs text-slate-400">${g.difficultyConfig.gradeGroup}</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-extrabold mt-1">
                🧟 좀비 디펜스 웨이브 브리핑 — <span class="text-emerald-400">Level ${g.level}</span> 목표 단어 9개
              </h2>
              <p class="text-xs text-slate-300 mt-0.5">
                30초 동안 <strong>1번~9번 단어와 한국어 뜻 총탄 번호</strong>를 기억하세요! 카운트가 <strong>0</strong>이 되면 위에서 영어단어 좀비 떼가 내려옵니다.
              </p>
            </div>

            <!-- 30초 대형 타이머 & 출격 버튼 -->
            <div class="flex items-center gap-3 bg-slate-950/90 px-4 py-3 rounded-2xl border border-slate-800">
              <div class="text-center pr-3 border-r border-slate-800">
                <div class="text-[10px] font-bold text-amber-400 uppercase">전투 시작까지</div>
                <div class="text-3xl font-black text-amber-400 font-mono leading-none mt-0.5">
                  <span id="briefingTimerNumber">${g.briefingTimeLeft}</span><span class="text-sm">초</span>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <button onclick="app.startZombieBattlePhase()"
                  class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow transition">
                  🚀 지금 바로 출격! [Spacebar]
                </button>
                <div class="flex gap-1">
                  <button id="briefingPauseBtn" onclick="app.toggleBriefingPause()"
                    class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                    ⏸️ 타이머 일시정지
                  </button>
                  <button onclick="app.addBriefingTime(15)"
                    class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold">
                    +15초 연장
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 타이머 게이지 바 -->
          <div class="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div id="briefingTimerBar" class="bg-gradient-to-r from-emerald-400 to-amber-400 h-full transition-all duration-500" style="width: 100%"></div>
          </div>

          <!-- 옵션 선택 행: ① 레벨 변경 ② 4대 단어 배열 방식 ③ 내 관심사 스토리 테마 -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-4 pt-2 text-xs">
            <div class="lg:col-span-3 flex items-center gap-1.5">
              <span class="font-bold text-slate-400 whitespace-nowrap">🎯 출제 레벨:</span>
              <select onchange="app.initZombieGameWave({ level: Number(this.value) })"
                class="flex-1 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl px-3 py-2 focus:outline-none">
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lv => `
                  <option value="${lv}" ${g.level === lv ? 'selected' : ''}>
                    Level ${lv} (${lv <= 3 ? '중1 기초' : lv <= 6 ? '중2 중급' : '중3 심화'}) ${lv === (this.state.user?.assignedLevel || 1) ? '★내 레벨' : ''}
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="lg:col-span-5 flex flex-wrap items-center gap-1">
              <span class="font-bold text-slate-400 mr-1">📚 배열법:</span>
              ${sortModes.map(m => `
                <button onclick="app.initZombieGameWave({ sortMode: '${m.id}' })"
                  class="px-2.5 py-1.5 rounded-lg font-bold transition ${g.sortMode === m.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                  ${m.label}
                </button>
              `).join('')}
            </div>

            <div class="lg:col-span-4 flex flex-wrap items-center gap-1">
              <span class="font-bold text-slate-400 mr-1">✨ 관심사:</span>
              ${interests.map(it => `
                <button onclick="app.initZombieGameWave({ interest: '${it.id}' })"
                  class="px-2.5 py-1.5 rounded-lg font-bold transition ${g.interest === it.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                  ${it.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- AI 관심사 밀착형 마이크로 스토리 배너 (정교화 부호화) -->
        <div class="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 text-white rounded-2xl p-4 sm:p-5 border border-indigo-500/30 shadow">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-amber-300">${g.microStory.title}</span>
            <span class="text-[11px] px-2 py-0.5 rounded bg-white/10 text-indigo-200">인지심리: 정교화 부호화(Elaborative Encoding)</span>
          </div>
          <p class="text-sm font-bold text-white mt-2 leading-relaxed">${g.microStory.en}</p>
          <p class="text-xs text-indigo-200 mt-1">${g.microStory.ko}</p>
        </div>

        <!-- 1~9번 목표 단어 & 총탄 매칭 그리드 (이중 부호화 암기팁 포함) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${g.waveWords.map(w => `
            <div onclick="app.speakWord('${w.word}')"
              class="cursor-pointer bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-indigo-500 card-shadow transition flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded-xl bg-slate-900 group-hover:bg-indigo-600 text-amber-400 group-hover:text-white font-black text-sm flex items-center justify-center shadow">
                      #${w.slotNumber}
                    </span>
                    <div>
                      <span class="text-xl font-black text-slate-900 tracking-tight">${w.word}</span>
                      <span class="text-xs text-slate-400 font-bold ml-1">${w.partOfSpeech}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">${w.theme}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">${w.curationTag}</span>
                    <button type="button" class="text-xs px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200">🔊</button>
                  </div>
                </div>

                <!-- 매칭될 한국어 총탄 뜻 -->
                <div class="mt-2.5 p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                  <span class="text-xs font-bold text-indigo-500">🔫 [${w.slotNumber}번 총탄 뜻]</span>
                  <span class="text-base font-extrabold text-indigo-900">${w.meaningKo}</span>
                </div>

                <!-- AI 이중 부호화 1초 암기 팁 -->
                <div class="mt-2.5 space-y-1 text-xs">
                  <div class="text-slate-700 font-semibold">💡 <strong class="text-amber-700">연상팁:</strong> ${w.learningMetadata?.acousticTip}</div>
                  <div class="text-slate-500 text-[11px]">🧩 <strong>구조:</strong> ${w.learningMetadata?.etymologyTip}</div>
                </div>
              </div>

              <div class="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span class="truncate">"${w.exampleEn}"</span>
                <span class="text-indigo-600 font-bold whitespace-nowrap ml-2">${w.wordOrderRole?.label.slice(0, 8)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // STEP 2: 30초 종료 후 본격 좀비 디펜스 전투 시작
  startZombieBattlePhase() {
    this.stopZombieAllTimers();
    const g = this.state.zombieGame;
    if (!g) return;

    g.phase = 'playing';
    g.hp = 5;
    g.score = 0;
    g.combo = 0;
    g.selectedSlot = 1;
    g.defeatedCount = 0;
    g.activeZombies = [];

    // 9개 단어를 랜덤 순서로 출현 큐에 배치 (총 9마리 웨이브)
    g.spawnQueue = [...g.waveWords].sort(() => Math.random() - 0.5);
    g.totalWaveZombies = g.spawnQueue.length;
    this._lastSpawnTime = 0;

    this.renderZombieBattleArena();
    this.bindZombieKeyboard();

    // 첫 좀비 즉시 스폰
    this.spawnNextZombie();
    this._lastSpawnTime = Date.now();

    // 50ms 간격 실시간 게임 루프 구동
    this._zombieGameLoop = setInterval(() => {
      this.tickZombieBattle();
    }, 50);
  },

  spawnNextZombie() {
    const g = this.state.zombieGame;
    if (!g || g.spawnQueue.length === 0) return;

    const wordObj = g.spawnQueue.shift();
    const zombieSprites = ['🧟', '🧟‍♂️', '🧟‍♀️', '🧛', '👾'];
    const sprite = zombieSprites[wordObj.slotNumber % zombieSprites.length];

    // 1~9번 레인(가로 위치) 중 겹치지 않게 분산 배치
    const laneIndex = ((wordObj.slotNumber - 1) % 9); // 0 ~ 8
    const xPercent = 6 + laneIndex * 10.2;

    const baseSpeed = 100 / ((g.difficultyConfig?.fallDurationSec || 12) * 20); // 50ms 틱당 하강 %

    g.activeZombies.push({
      uid: 'z_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      wordObj,
      sprite,
      xPercent,
      yPercent: 4,
      speedPerTick: baseSpeed * (0.9 + Math.random() * 0.22),
      showHintBubble: false,
      stunnedTicks: 0
    });
  },

  focusZombieByUid(uid) {
    const g = this.state.zombieGame;
    if (!g) return;
    g.manualTargetUid = uid;
    const z = g.activeZombies.find(item => item.uid === uid);
    if (z) {
      this.speakWord(z.wordObj.word);
      this.showToast(`🎯 [${z.wordObj.word}] 좀비를 조준했습니다! 알맞은 뜻 총탄(1~9)을 골라 Spacebar를 누르세요!`);
    }
    this.updateZombieFieldDOM();
  },

  tickZombieBattle() {
    const g = this.state.zombieGame;
    if (!g || g.phase !== 'playing') return;

    const now = Date.now();
    const spawnInterval = g.difficultyConfig?.spawnIntervalMs || 2800;

    // 화면에 좀비가 4마리 미만이고 스폰 큐가 남아있으면 추가 스폰
    if (g.spawnQueue.length > 0 && g.activeZombies.length < 4 && (now - this._lastSpawnTime >= spawnInterval)) {
      this.spawnNextZombie();
      this._lastSpawnTime = now;
    }

    // 활성 좀비 이동 업데이트
    for (let i = g.activeZombies.length - 1; i >= 0; i--) {
      const z = g.activeZombies[i];
      if (z.stunnedTicks > 0) {
        z.stunnedTicks--;
        continue;
      }
      z.yPercent += z.speedPerTick;

      // 바리케이드 방어선(82%) 도달 시 -> 전통적 스펠링 타이핑 실드(부활 미션) 발동!
      if (z.yPercent >= 82) {
        this.triggerEmergencySpellingShield(z);
        return;
      }
    }

    // 모든 일반 좀비 처치 완료 시 -> 보스 웨이브(소크라테스 수수께끼 & 텍스트 RPG 탈출) 진입!
    if (g.spawnQueue.length === 0 && g.activeZombies.length === 0) {
      this.enterBossWavePhase();
      return;
    }

    this.updateZombieFieldDOM();
  },

  // 3-Zone 아케이드 전투 화면 렌더링
  renderZombieBattleArena() {
    const root = document.getElementById('appRoot');
    const g = this.state.zombieGame;
    if (!g) return;

    // 현재 포탑에 장전된 총탄 (1~4 슬롯 중 하나)
    const activeAmmoList = this.getActive4AmmoList();
    const selectedWord = activeAmmoList.find(w => w.choiceSlot === g.selectedSlot) || activeAmmoList[0] || g.waveWords[0];

    root.innerHTML = `
      <div id="zombieArenaContainer" class="select-none space-y-3">
        <!-- [ZONE A] 상단 전술 HUD 바 -->
        <div class="bg-slate-900 text-white rounded-2xl px-4 py-3 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div class="flex items-center gap-4">
            <div>
              <div class="text-[10px] font-bold text-slate-400">방어선 체력 (HP)</div>
              <div id="hudHpHearts" class="text-base font-black tracking-widest text-rose-500">
                ${'❤️'.repeat(g.hp)}${'🖤'.repeat(Math.max(0, g.maxHp - g.hp))}
              </div>
            </div>
            <div class="pl-3 border-l border-slate-800">
              <div class="text-[10px] font-bold text-slate-400">현재 레벨 · 웨이브</div>
              <div class="text-sm font-extrabold text-emerald-400">Level ${g.level} · 남은 좀비 <span id="hudRemainCount">${g.spawnQueue.length + g.activeZombies.length}</span>마리</div>
            </div>
            <div class="pl-3 border-l border-slate-800">
              <div class="text-[10px] font-bold text-slate-400">점수 & 콤보</div>
              <div class="text-sm font-extrabold text-amber-400">
                <span id="hudScore">${g.score.toLocaleString()}</span>점 · <span id="hudCombo">${g.combo}</span> COMBO 🔥
              </div>
            </div>
          </div>

          <!-- 최우선 위험 타겟 레이더 표시 -->
          <div class="flex items-center gap-3 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
            <span class="text-xs font-extrabold text-rose-400">🎯 최우선 조준:</span>
            <span id="hudPriorityWord" class="text-base font-black text-white font-mono">탐색 중...</span>
            <button onclick="app.speakPriorityZombie()" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200">
              🔊 발음
            </button>
            <button onclick="app.initZombieGameWave()" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 font-bold">
              📋 30초 브리핑 다시보기
            </button>
          </div>
        </div>

        <!-- [ZONE B] 중앙 다크 네온 좀비 디펜스 전장 -->
        <div id="zombieBattleStage" class="zombie-arena-bg relative w-full h-[410px] sm:h-[440px] rounded-3xl border-2 border-indigo-950 overflow-hidden shadow-2xl">
          <!-- 상단 레인 가이드라인 -->
          <div class="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-15">
            ${[1, 2, 3, 4].map(n => `
              <div class="border-r border-indigo-400/30 flex flex-col items-center pt-2">
                <span class="text-xs font-mono text-indigo-200">SECTOR ${n}</span>
              </div>
            `).join('')}
          </div>

          <!-- 레이저 빔 SVG 오버레이 -->
          <svg id="laserSvgOverlay" class="absolute inset-0 w-full h-full pointer-events-none z-20"></svg>

          <!-- 실시간 하강하는 영어단어 좀비 컨테이너 -->
          <div id="zombieEntitiesLayer" class="absolute inset-0 z-10"></div>

          <!-- 최후 방어 바리케이드 라인 (82% 지점) -->
          <div class="absolute left-0 right-0 bottom-[14%] h-2 bg-gradient-to-r from-rose-600 via-amber-400 to-rose-600 opacity-80 flex items-center justify-center">
            <span class="px-3 py-0.5 rounded-full bg-rose-950 border border-rose-500 text-[10px] font-extrabold text-rose-200 tracking-wider">
              🛡️ 최후 방어 바리케이드 라인 (돌파 시 긴급 스펠링 실드 가동!) 🛡️
            </span>
          </div>

          <!-- 중앙 하단 레이저 터렛 포탑 & 현재 장전된 한국어 총탄 표시 -->
          <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-slate-950/95 border-2 border-emerald-400 px-5 py-2 rounded-2xl shadow-xl">
            <div class="text-2xl">🔫</div>
            <div>
              <div class="text-[10px] font-bold text-emerald-400">장전된 총탄 (키보드 1~4번 또는 마우스 클릭 발사)</div>
              <div id="turretLoadedText" class="text-sm sm:text-base font-black text-white">
                [${selectedWord.choiceSlot || 1}번 탄환] ${selectedWord.meaningKo}
              </div>
            </div>
            <button onclick="app.fireZombieLaser()"
              class="ml-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition">
              발사! [Spacebar] ⚡
            </button>
          </div>
        </div>

        <!-- [ZONE C] 하단 직관적인 4지선다 한국어 뜻 총탄 메뉴바 (키패드 1~4 + 마우스 원클릭 즉시 발사!) -->
        <div class="bg-slate-900 rounded-3xl p-4 border border-slate-800 shadow-xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5 px-1">
            <div class="text-xs font-extrabold text-white">
              🖱️ <span class="text-amber-400">마우스로 클릭하면 즉시 발사</span>되거나, <span class="text-emerald-400">키보드 숫자 [1]~[4]</span> 선택 후 <span class="text-cyan-400">[Spacebar]</span>를 누르세요!
            </div>
            <span class="text-[11px] font-bold text-emerald-400">✨ 4개 집중 선택 모드 활성화됨</span>
          </div>

          <div id="ammoBarGrid" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${activeAmmoList.map(w => {
              const isSelected = w.choiceSlot === g.selectedSlot;
              return `
                <button type="button" id="ammoSlotBtn_${w.choiceSlot}"
                  onclick="app.clickAmmoToFire(${w.choiceSlot})"
                  class="p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 border-white shadow-xl -translate-y-1 font-black ring-4 ring-emerald-500/30'
                      : 'bg-slate-800 text-white border-slate-700 hover:border-emerald-400 hover:bg-slate-750'
                  }">
                  <div class="flex items-center justify-between w-full">
                    <span class="px-2.5 py-0.5 rounded-lg text-xs font-black ${isSelected ? 'bg-slate-950 text-emerald-300' : 'bg-slate-950 text-amber-400'}">
                      [${w.choiceSlot}]번 총탄
                    </span>
                    <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-black/20 text-slate-300">
                      클릭 시 즉시 발사 ⚡
                    </span>
                  </div>
                  <div class="mt-2.5 text-base sm:text-lg font-black leading-snug break-keep">
                    ${w.meaningKo}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.updateZombieFieldDOM();
  },

  // 4개 총탄 리스트 동적 생성 (현재 조준 좀비의 정답 1개 + 매력적인 오답 3개 = 총 4지선다)
  getActive4AmmoList() {
    const g = this.state.zombieGame;
    if (!g || !g.waveWords || g.waveWords.length === 0) return [];

    // 현재 조준 중인 좀비 찾기
    let targetZombie = null;
    if (g.manualTargetUid) {
      targetZombie = g.activeZombies.find(z => z.uid === g.manualTargetUid);
    }
    if (!targetZombie && g.activeZombies.length > 0) {
      g.activeZombies.forEach(z => {
        if (!targetZombie || z.yPercent > targetZombie.yPercent) targetZombie = z;
      });
    }

    const correctWord = targetZombie ? targetZombie.wordObj : g.waveWords[0];

    // 기존에 캐싱된 4개 선택지가 있고, 그 안에 여전히 correctWord가 들어있다면 깜빡임 방지를 위해 유지
    if (g._current4Choices && g._current4Choices.targetWordId === correctWord.id) {
      return g._current4Choices.list;
    }

    // 다른 단어들 중 오답 3개 무작위 추출
    const otherWords = g.waveWords.filter(w => w.id !== correctWord.id);
    const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3);

    // 정답 1개 + 오답 3개 합쳐서 4개 구성
    const fourOptions = [correctWord, ...distractors].sort(() => Math.random() - 0.5);
    const list = fourOptions.map((w, idx) => ({
      ...w,
      choiceSlot: idx + 1 // 1, 2, 3, 4
    }));

    g._current4Choices = {
      targetWordId: correctWord.id,
      list
    };

    return list;
  },

  // 마우스 클릭 시 장전과 동시에 즉시 발사!
  clickAmmoToFire(choiceSlot) {
    this.selectAmmoSlot(choiceSlot);
    this.fireZombieLaser();
  },

  updateZombieFieldDOM() {
    const g = this.state.zombieGame;
    if (!g || g.phase !== 'playing') return;

    const layer = document.getElementById('zombieEntitiesLayer');
    if (!layer) return;

    // 가장 아래로 내려온 최우선 위험 좀비(또는 수동 조준 좀비) 찾기
    let priorityZombie = null;
    if (g.manualTargetUid) {
      priorityZombie = g.activeZombies.find(z => z.uid === g.manualTargetUid) || null;
    }
    if (!priorityZombie) {
      g.activeZombies.forEach(z => {
        if (!priorityZombie || z.yPercent > priorityZombie.yPercent) {
          priorityZombie = z;
        }
      });
    }

    const priorityEl = document.getElementById('hudPriorityWord');
    if (priorityEl) {
      priorityEl.textContent = priorityZombie ? `${priorityZombie.wordObj.word} (${priorityZombie.wordObj.partOfSpeech})` : '대기 중...';
    }
    const remainEl = document.getElementById('hudRemainCount');
    if (remainEl) remainEl.textContent = g.spawnQueue.length + g.activeZombies.length;
    const scoreEl = document.getElementById('hudScore');
    if (scoreEl) scoreEl.textContent = g.score.toLocaleString();
    const comboEl = document.getElementById('hudCombo');
    if (comboEl) comboEl.textContent = g.combo;

    layer.innerHTML = g.activeZombies.map(z => {
      const isPriority = priorityZombie && priorityZombie.uid === z.uid;
      return `
        <div onclick="app.focusZombieByUid('${z.uid}')"
          style="left: ${z.xPercent}%; top: ${z.yPercent}%;"
          class="cursor-pointer absolute -translate-x-1/2 transition-none flex flex-col items-center">
          ${z.showHintBubble ? `
            <div class="mb-1 px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-extrabold shadow whitespace-nowrap">
              💡 힌트: ${z.wordObj.learningMetadata?.acousticTip.slice(0, 28)}...
            </div>
          ` : ''}
          <div class="px-3.5 py-2 rounded-2xl border-2 ${
            isPriority
              ? 'bg-rose-950/95 border-rose-400 text-white priority-target-glow scale-105'
              : 'bg-slate-900/95 border-indigo-400/70 text-white hover:border-amber-300'
          } shadow-xl flex items-center gap-2 whitespace-nowrap">
            <span class="text-xl">${z.sprite}</span>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-base sm:text-lg font-black tracking-tight">${z.wordObj.word}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-indigo-200 font-bold">${z.wordObj.partOfSpeech}</span>
              </div>
              ${isPriority ? `<div class="text-[10px] font-extrabold text-rose-300">🎯 조준됨! 알맞은 뜻 총탄(1~9) + Space!</div>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  speakPriorityZombie() {
    const g = this.state.zombieGame;
    if (!g || !g.activeZombies.length) return;
    let priorityZombie = g.activeZombies[0];
    g.activeZombies.forEach(z => {
      if (z.yPercent > priorityZombie.yPercent) priorityZombie = z;
    });
    if (priorityZombie) this.speakWord(priorityZombie.wordObj.word);
  },

  selectAmmoSlot(slotNum) {
    const g = this.state.zombieGame;
    if (!g) return;
    g.selectedSlot = slotNum;
    this.playGameSfx('reload');

    const activeList = this.getActive4AmmoList();
    const selectedWord = activeList.find(w => w.choiceSlot === slotNum) || g.waveWords.find(w => w.slotNumber === slotNum);
    const turretText = document.getElementById('turretLoadedText');
    if (turretText && selectedWord) {
      turretText.textContent = `[${slotNum}번 탄환] ${selectedWord.meaningKo}`;
    }

    // 1~4번 총탄 버튼 하이라이트 업데이트
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`ammoSlotBtn_${i}`);
      if (!btn) continue;
      if (i === slotNum) {
        btn.className = 'p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer active:scale-95 bg-emerald-400 text-slate-950 border-white shadow-xl -translate-y-1 font-black ring-4 ring-emerald-500/30';
      } else {
        btn.className = 'p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer active:scale-95 bg-slate-800 text-white border-slate-700 hover:border-emerald-400 hover:bg-slate-750';
      }
    }
  },

  // Spacebar 발사: 현재 장전된 1~4번 총탄으로 현재 타겟 좀비를 조준 사격!
  fireZombieLaser() {
    const g = this.state.zombieGame;
    if (!g) return;

    if (g.phase === 'briefing') {
      this.startZombieBattlePhase();
      return;
    }

    if (g.phase === 'boss') {
      this.fireBossWaveAnswer();
      return;
    }

    if (g.phase !== 'playing') return;

    // 현재 4지선다 리스트에서 선택된 총탄 가져오기
    const activeList = this.getActive4AmmoList();
    const chosenAmmo = activeList.find(w => w.choiceSlot === g.selectedSlot);
    if (!chosenAmmo) return;

    // 현재 조준 중인 좀비(수동 지정 또는 가장 아래로 내려온 최우선 위험 좀비)
    let targetIndex = -1;
    if (g.manualTargetUid) {
      targetIndex = g.activeZombies.findIndex(z => z.uid === g.manualTargetUid);
    }
    if (targetIndex < 0 && g.activeZombies.length > 0) {
      let lowestY = -1;
      g.activeZombies.forEach((z, idx) => {
        if (z.yPercent > lowestY) {
          lowestY = z.yPercent;
          targetIndex = idx;
        }
      });
    }

    if (targetIndex >= 0) {
      const targetZ = g.activeZombies[targetIndex];

      // 정답 판정: 선택한 4개 총탄 중 하나의 뜻이 타겟 좀비의 뜻과 일치하는가?
      if (chosenAmmo.meaningKo === targetZ.wordObj.meaningKo || chosenAmmo.id === targetZ.wordObj.id) {
        // 명중!
        this.playGameSfx('laser');
        this.drawLaserBeamEffect(targetZ.xPercent, targetZ.yPercent, '#34d399');
        this.speakWord(targetZ.wordObj.word);

        g.combo++;
        if (g.combo > g.maxCombo) g.maxCombo = g.combo;
        g.score += 150 + g.combo * 30;
        g.defeatedCount++;

        const wKey = String(targetZ.wordObj.id);
        if (!g.wordResultsMap[wKey]) {
          g.wordResultsMap[wKey] = { wordId: targetZ.wordObj.id, status: 'mastered', correctCount: 1, wrongCount: 0 };
        }

        g.activeZombies.splice(targetIndex, 1);
        g.manualTargetUid = null;
        g._current4Choices = null; // 타겟이 바뀌었으므로 다음 좀비에 맞춰 4개 보기 재구성

        // 화면에 좀비가 비었으면 다음 좀비 즉시 스폰
        if (g.activeZombies.length === 0 && g.spawnQueue.length > 0) {
          this.spawnNextZombie();
          this._lastSpawnTime = Date.now();
        }

        // 4개 총탄 버튼 UI 리프레시
        this.refresh4AmmoBarUI();
        this.updateZombieFieldDOM();
      } else {
        // 오답 발사 -> 불발 및 힌트 팝업
        this.playGameSfx('miss');
        g.combo = 0;
        const arena = document.getElementById('zombieBattleStage');
        if (arena) {
          arena.classList.remove('shake-effect');
          void arena.offsetWidth;
          arena.classList.add('shake-effect');
        }

        targetZ.showHintBubble = true;
        const wKey = String(targetZ.wordObj.id);
        g.wordResultsMap[wKey] = {
          wordId: targetZ.wordObj.id,
          status: 'learning',
          correctCount: 0,
          wrongCount: 1
        };
        this.showToast(`💥 불발! [${targetZ.wordObj.word}]의 올바른 뜻을 4개 보기 중에서 골라보세요!`);
        this.updateZombieFieldDOM();
      }
    }
  },

  refresh4AmmoBarUI() {
    const g = this.state.zombieGame;
    if (!g || g.phase !== 'playing') return;
    const ammoBar = document.getElementById('ammoBarGrid');
    if (!ammoBar) return;

    const activeList = this.getActive4AmmoList();
    ammoBar.innerHTML = activeList.map(w => {
      const isSelected = w.choiceSlot === g.selectedSlot;
      return `
        <button type="button" id="ammoSlotBtn_${w.choiceSlot}"
          onclick="app.clickAmmoToFire(${w.choiceSlot})"
          class="p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer active:scale-95 ${
            isSelected
              ? 'bg-emerald-400 text-slate-950 border-white shadow-xl -translate-y-1 font-black ring-4 ring-emerald-500/30'
              : 'bg-slate-800 text-white border-slate-700 hover:border-emerald-400 hover:bg-slate-750'
          }">
          <div class="flex items-center justify-between w-full">
            <span class="px-2.5 py-0.5 rounded-lg text-xs font-black ${isSelected ? 'bg-slate-950 text-emerald-300' : 'bg-slate-950 text-amber-400'}">
              [${w.choiceSlot}]번 총탄
            </span>
            <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-black/20 text-slate-300">
              클릭 시 즉시 발사 ⚡
            </span>
          </div>
          <div class="mt-2.5 text-base sm:text-lg font-black leading-snug break-keep">
            ${w.meaningKo}
          </div>
        </button>
      `;
    }).join('');

    const selectedWord = activeList.find(w => w.choiceSlot === g.selectedSlot) || activeList[0];
    const turretText = document.getElementById('turretLoadedText');
    if (turretText && selectedWord) {
      turretText.textContent = `[${selectedWord.choiceSlot}번 탄환] ${selectedWord.meaningKo}`;
    }
  },

  drawLaserBeamEffect(targetXPercent, targetYPercent, color = '#34d399') {
    const svg = document.getElementById('laserSvgOverlay');
    if (!svg) return;
    svg.innerHTML = `
      <line x1="50%" y1="92%" x2="${targetXPercent}%" y2="${targetYPercent}%"
        stroke="${color}" stroke-width="5" stroke-linecap="round" />
      <circle cx="${targetXPercent}%" cy="${targetYPercent}%" r="18" fill="${color}" fill-opacity="0.45" />
    `;
    setTimeout(() => {
      if (svg) svg.innerHTML = '';
    }, 180);
  },

  // 키보드 이벤트 바인딩: 숫자키 [1]~[9]로 총탄 선택 + [Spacebar] 발사
  bindZombieKeyboard() {
    if (this._zombieKeyHandler) {
      window.removeEventListener('keydown', this._zombieKeyHandler);
    }
    this._zombieKeyHandler = (e) => {
      if (this.state.activeTab !== 'zombie') return;
      const g = this.state.zombieGame;
      if (!g) return;

      // 입력창(스펠링 실드 타이핑 등) 포커스 중일 때는 숫자/스페이스바 가로채지 않음
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const num = Number(e.key);
        this.selectAmmoSlot(num);
      } else if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        this.fireZombieLaser();
      }
    };
    window.addEventListener('keydown', this._zombieKeyHandler);
  },

  // STEP 2-B: 방어선 돌파 위기 시 전통적 '연습장 스펠링 직접 쓰기' 긴급 실드 발동!
  triggerEmergencySpellingShield(zombie) {
    const g = this.state.zombieGame;
    if (!g) return;
    g.phase = 'shield';
    g.shieldTargetZombie = zombie;

    const w = zombie.wordObj;
    const wKey = String(w.id);
    g.wordResultsMap[wKey] = { wordId: w.id, status: 'learning', correctCount: 0, wrongCount: 1 };

    const root = document.getElementById('appRoot');
    root.innerHTML = `
      <div class="max-w-xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-rose-500 shadow-2xl text-center space-y-5">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-extrabold">
          🚨 방어선 돌파 위기! 긴급 스펠링 실드(Shield) 가동!
        </div>
        <h3 class="text-2xl font-extrabold">
          [${w.meaningKo}] 좀비를 막으려면<br />영어 스펠링을 직접 타이핑하세요!
        </h3>
        <p class="text-xs text-slate-300">
          전통적인 스펠링 쓰기 암기법으로 손끝 기억을 깨웁니다. 아래 철자를 정확히 입력하면 체력을 잃지 않고 좀비를 정화합니다!
        </p>

        <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div class="text-xs text-amber-400 font-bold">정답 스펠링 가이드 (보고 똑같이 타이핑하세요)</div>
          <div class="text-3xl font-black tracking-widest text-emerald-400 font-mono">${w.word}</div>
          <div class="text-xs text-slate-400">${w.learningMetadata?.acousticTip}</div>
        </div>

        <form onsubmit="event.preventDefault(); app.submitEmergencyShield();" class="space-y-3">
          <input id="shieldSpellingInput" type="text" autocomplete="off" required
            placeholder="${w.word} 입력 후 Enter"
            class="w-full px-4 py-3.5 rounded-2xl bg-slate-800 border-2 border-emerald-400 text-white text-center text-lg font-extrabold focus:outline-none" />
          <button type="submit"
            class="w-full py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-lg">
            🛡️ 스펠링 실드 발동하여 좀비 격퇴하기!
          </button>
        </form>
      </div>
    `;

    setTimeout(() => {
      const inp = document.getElementById('shieldSpellingInput');
      if (inp) inp.focus();
    }, 60);
  },

  submitEmergencyShield() {
    const g = this.state.zombieGame;
    if (!g || !g.shieldTargetZombie) return;
    const targetWord = g.shieldTargetZombie.wordObj.word.toLowerCase();
    const inp = document.getElementById('shieldSpellingInput');
    const typed = (inp ? inp.value : '').trim().toLowerCase();

    if (typed === targetWord) {
      this.speakWord(targetWord);
      this.showToast(`🛡️ 스펠링 실드 성공! [${targetWord}] 좀비를 완벽히 격퇴했습니다!`);
      g.activeZombies = g.activeZombies.filter(z => z.uid !== g.shieldTargetZombie.uid);
      g.shieldTargetZombie = null;
      g.phase = 'playing';
      this.renderZombieBattleArena();
      this._lastSpawnTime = Date.now();
    } else {
      this.playGameSfx('miss');
      this.showToast(`철자를 정확히 입력해주세요: ${targetWord}`);
    }
  },

  // STEP 2-C: 보스 웨이브 (메모 4-2 소크라테스 추리 스무고개 & 메모 4-4 텍스트 RPG 탈출 미션)
  enterBossWavePhase() {
    const g = this.state.zombieGame;
    if (!g) return;
    g.phase = 'boss';
    g.bossStageIndex = 0;
    this.renderBossWaveArena();
  },

  renderBossWaveArena() {
    const root = document.getElementById('appRoot');
    const g = this.state.zombieGame;
    if (!g) return;

    const isRpgStage = g.bossStageIndex === 1;
    const targetWord = isRpgStage ? g.rpgEscapeWord : g.bossRiddleWord;

    // 보스전용 4지선다 리스트 생성 (정답 1개 + 오답 3개)
    if (!g._boss4Choices || g._boss4Choices.targetWordId !== targetWord.id) {
      const otherWords = g.waveWords.filter(w => w.id !== targetWord.id);
      const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5);
      const distractors = shuffledOthers.slice(0, 3);
      const fourOptions = [targetWord, ...distractors].sort(() => Math.random() - 0.5);
      g._boss4Choices = {
        targetWordId: targetWord.id,
        list: fourOptions.map((w, idx) => ({ ...w, choiceSlot: idx + 1 }))
      };
      g.selectedSlot = 1;
    }

    const bossAmmoList = g._boss4Choices.list;
    const selectedWord = bossAmmoList.find(w => w.choiceSlot === g.selectedSlot) || bossAmmoList[0];

    root.innerHTML = `
      <div class="space-y-4">
        <div class="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400/70 shadow-2xl text-center space-y-5">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-extrabold">
            ${isRpgStage ? '🏰 FINAL STAGE · 텍스트 RPG 마법문 탈출 미션 (상황 학습 이론)' : '🕵️ BOSS WAVE · 소크라테스식 추리형 스무고개 보스 (능동적 인출 훈련)'}
          </div>

          <div class="text-5xl">${isRpgStage ? '🚪✨🧙‍♂️' : '🕵️‍♂️🧟👑'}</div>

          <h3 class="text-xl sm:text-2xl font-black">
            ${isRpgStage
              ? '마지막 마법문을 열기 위해 문맥 빈칸에 들어갈 단어 총탄을 마우스로 클릭하거나 [1]~[4]로 쏘세요!'
              : '보스 좀비가 단어를 숨겼습니다! 3단계 추리 단서를 읽고 4개 총탄 중 정답을 쏘세요!'}
          </h3>

          ${!isRpgStage ? `
            <div class="max-w-2xl mx-auto text-left space-y-2.5 bg-slate-900/90 p-5 rounded-2xl border border-indigo-500/40">
              <div class="text-xs font-bold text-indigo-300">🔍 ${targetWord.learningMetadata?.socraticRiddle?.hint1}</div>
              <div class="text-sm font-extrabold text-white">🔍 ${targetWord.learningMetadata?.socraticRiddle?.hint2}</div>
              <div class="text-xs font-bold text-amber-300">🔍 ${targetWord.learningMetadata?.socraticRiddle?.hint3}</div>
            </div>
          ` : `
            <div class="max-w-2xl mx-auto text-left space-y-2.5 bg-slate-900/90 p-5 rounded-2xl border border-purple-500/40">
              <div class="text-sm font-extrabold text-amber-300">${targetWord.learningMetadata?.rpgMissionText}</div>
              <div class="text-xs text-indigo-200">힌트: 첫 글자 ${targetWord.learningMetadata?.firstLetterHint} · 뜻 "${targetWord.meaningKo}"</div>
            </div>
          `}

          <!-- 장전된 탄환 및 스페이스바 발사 -->
          <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div class="px-5 py-3 rounded-2xl bg-slate-900 border border-emerald-400 text-sm font-extrabold">
              🔫 현재 장전: <span id="turretLoadedText" class="text-emerald-300">[${selectedWord.choiceSlot}번 탄환] ${selectedWord.meaningKo} (${selectedWord.word})</span>
            </div>
            <button onclick="app.fireBossWaveAnswer()"
              class="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition">
              ⚡ 보스에게 발사! [Spacebar]
            </button>
          </div>
        </div>

        <!-- 하단 4개 총탄 선택 바 (원클릭 즉시 발사 지원) -->
        <div class="bg-slate-900 rounded-3xl p-4 border border-slate-800 shadow-xl">
          <div class="flex items-center justify-between mb-2 px-1">
            <div class="text-xs font-bold text-slate-300">
              🖱️ <span class="text-amber-400">마우스로 클릭하면 즉시 보스에게 발사</span>되거나, 키보드 <span class="text-emerald-400">[1] ~ [4]</span> + <span class="text-cyan-400">[Spacebar]</span>를 누르세요!
            </div>
            <span class="text-[11px] font-bold text-amber-400">보스전 4지선다</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${bossAmmoList.map(w => {
              const isSelected = w.choiceSlot === g.selectedSlot;
              return `
                <button type="button" id="ammoSlotBtn_${w.choiceSlot}"
                  onclick="app.clickBossAmmoToFire(${w.choiceSlot})"
                  class="p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 border-white shadow-xl -translate-y-1 font-black ring-4 ring-emerald-500/30'
                      : 'bg-slate-800 text-white border-slate-700 hover:border-emerald-400 hover:bg-slate-750'
                  }">
                  <div class="flex items-center justify-between w-full">
                    <span class="px-2 py-0.5 rounded-md text-xs font-black ${isSelected ? 'bg-slate-950 text-emerald-300' : 'bg-slate-950 text-amber-400'}">
                      [${w.choiceSlot}]번 총탄
                    </span>
                    <span class="text-[11px] font-bold opacity-75">${w.partOfSpeech}</span>
                  </div>
                  <div class="mt-2 text-base sm:text-lg font-black leading-snug break-keep">
                    ${w.meaningKo} (${w.word})
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  clickBossAmmoToFire(choiceSlot) {
    this.selectAmmoSlot(choiceSlot);
    this.fireBossWaveAnswer();
  },

  async fireBossWaveAnswer() {
    const g = this.state.zombieGame;
    if (!g || g.phase !== 'boss') return;

    const targetWord = g.bossStageIndex === 0 ? g.bossRiddleWord : g.rpgEscapeWord;
    const bossList = g._boss4Choices?.list || [];
    const chosenAmmo = bossList.find(w => w.choiceSlot === g.selectedSlot);

    if (chosenAmmo && (chosenAmmo.id === targetWord.id || chosenAmmo.meaningKo === targetWord.meaningKo)) {
      this.playGameSfx('laser');
      this.speakWord(targetWord.word);
      g.score += 300;
      if (g.bossStageIndex === 0) {
        this.showToast('🎉 소크라테스 추리 보스 격파! 마지막 마법문 탈출 미션으로 이동합니다!');
        g.bossStageIndex = 1;
        g._boss4Choices = null; // 다음 스테이지를 위해 4지선다 리셋
        this.renderBossWaveArena();
      } else {
        await this.finishZombieWaveAndSync();
      }
    } else {
      this.playGameSfx('miss');
      this.showToast(`💥 보스 방어막에 막혔습니다! 단서의 뜻 [${targetWord.meaningKo}]에 맞는 총탄을 골라보세요!`);
    }
  },

  async finishZombieWaveAndSync() {
    this.stopZombieAllTimers();
    const g = this.state.zombieGame;
    if (!g) return;
    g.phase = 'result';

    const results = g.waveWords.map(w => {
      const rec = g.wordResultsMap[String(w.id)];
      return rec || { wordId: w.id, status: 'mastered', correctCount: 1, wrongCount: 0 };
    });

    const studentId = this.state.dashboardData?.student?.id || this.state.user?.id || 'mid02';
    const res = await fetch('/api/study/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, results })
    });
    if (res.ok) {
      const data = await res.json();
      this.state.dashboardData = data.dashboard;
    }

    const masteredCount = results.filter(r => r.status === 'mastered').length;
    const root = document.getElementById('appRoot');

    root.innerHTML = `
      <div class="max-w-3xl mx-auto bg-slate-900 text-white rounded-3xl p-8 border-2 border-emerald-400 shadow-2xl text-center space-y-6">
        <div class="text-5xl">🏆🧟‍♂️✨</div>
        <div class="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold">
          Level ${g.level} 웨이브 클리어 & 대시보드 진도 자동 반영 완료!
        </div>
        <h2 class="text-3xl font-black">좀비 디펜스 웨이브 완벽 승리!</h2>
        <p class="text-sm text-slate-300">
          이번 웨이브 목표 단어 9개 중 <strong class="text-emerald-400">${masteredCount}단어 완벽 마스터</strong>!
          획득 점수 <strong class="text-amber-400">${g.score.toLocaleString()}점</strong> (최대 콤보 ${g.maxCombo}회)
        </p>

        <div class="grid grid-cols-3 sm:grid-cols-9 gap-2 text-left">
          ${g.waveWords.map(w => `
            <div class="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
              <div class="text-[10px] text-amber-400 font-bold">#${w.slotNumber}</div>
              <div class="font-extrabold text-xs text-white mt-0.5">${w.word}</div>
              <div class="text-[11px] text-emerald-300 mt-0.5">${w.meaningKo}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button onclick="app.initZombieGameWave()"
            class="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-lg">
            🧟 다음 9단어 웨이브 연속 출격하기!
          </button>
          <button onclick="app.switchTab('dashboard')"
            class="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm">
            📊 대시보드에서 올라간 진도 확인하기
          </button>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 9. 🤖 AI 4대 암기 비법 연구소 (메모의 4가지 인지심리학 프롬프트 & 인터랙티브 실습)
  // =========================================================================
  async initAiLab() {
    const level = this.state.dashboardData?.summary?.currentLevel || this.state.user?.assignedLevel || 1;
    const studentId = this.state.dashboardData?.student?.id || this.state.user?.id || 'mid02';
    const res = await fetch(`/api/game/wave?studentId=${encodeURIComponent(studentId)}&level=${level}&sortMode=story&interest=minecraft`);
    const data = await res.json();

    this.state.aiLab = {
      level: data.level,
      interest: '마인크래프트 야생 생존기',
      words: data.waveWords || [],
      selectedMethod: 1 // 1: 마이크로 스토리텔링, 2: 소크라테스 스무고개, 3: 이중 부호화 3종 힌트, 4: 텍스트 RPG 탈출 미션
    };

    this.renderAiLab();
  },

  renderAiLab() {
    const root = document.getElementById('appRoot');
    const lab = this.state.aiLab;
    if (!lab) return;

    const top3Words = lab.words.slice(0, 3);
    const wordListStr = top3Words.map(w => w.word).join(', ');
    const targetOne = top3Words[0] || { word: 'environment', meaningKo: '환경', learningMetadata: {} };

    const prompts = {
      1: `[역할] 재미있는 숏폼 스토리 작가\n[내가 외울 단어]: ${wordListStr}\n[내 관심사]: ${lab.interest}\n[요청사항]:\n1. 내 관심사를 배경으로 위 3개 단어가 모두 들어간 4문장짜리 초간단 영어 이야기를 써줘.\n2. 중학생이 읽기 쉽게 쉬운 단어 위주로 쓰고, 내가 외울 단어는 [굵게] 표시해 줘.\n3. 이야기 아래에 각 단어가 이 이야기 속에서 어떤 뜻으로 쓰였는지 중학생 눈높이로 설명해 줘.`,
      2: `[역할] 탐정 퀴즈 마스터\n[단어 리스트]: ${wordListStr}\n[진행 방식]:\n1. 위 단어 중 하나를 마음속으로 골라. 단, 단어 스펠링이나 뜻은 절대 말하지 마.\n2. 나에게 중학생 수준의 쉬운 영어로 [상황 묘사 힌트] 2문장을 줘.\n   (예: "이것은 유리컵이나 계란처럼 쉽게 깨질 수 있는 물건을 다룰 때 쓰는 말이야.")\n3. 내가 영어 단어를 맞히면 칭찬과 함께 다음 단어로 넘어가고, 틀리면 첫 글자 힌트를 줘.`,
      3: `[역할] 영단어 기억술 멘토\n[단어]: ${targetOne.word} (${targetOne.meaningKo})\n[요청사항]:\n중학생이 이 단어를 한 번 보고 안 까먹게 아래 3가지 기억 힌트를 만들어줘.\n1. [어원 쪼개기]: 어원의 기본 원리를 아주 쉽게 설명\n2. [말장난 암기팁]: 발음과 뜻을 재미있게 엮은 1초 암기 공식\n3. [머릿속 그림]: 이 단어를 떠올릴 때 머릿속에 그릴 수 있는 웃기거나 인상적인 만화 장면 1컷 묘사`,
      4: `[역할] 인터랙티브 텍스트 어드벤처 게임 진행자\n[테마]: 버려진 마법 학교 탈출하기\n[오늘 쓸 필수 마법 주문(단어)]: ${wordListStr}\n[규칙]:\n1. 지금 방 안에 갇힌 상황을 영어 2문장, 한국어 번역 1문장으로 짧게 묘사해 줘.\n2. 위 3개 단어 중 상황에 맞는 단어를 빈칸이나 선택지로 제시해 줘.\n3. 내가 그 단어를 정확히 골라 문장을 완성하면 문이 열리고 다음 구역으로 이동해.`
    };

    root.innerHTML = `
      <div class="space-y-6">
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
            <div>
              <span class="text-xs font-extrabold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                🤖 인지심리학 기반 AI 영단어 단기 비법 워크숍
              </span>
              <h2 class="text-2xl font-extrabold text-slate-900 mt-2">
                중학생 AI 4대 암기 방법론 & 실시간 생성기 (Level ${lab.level} 자동 연동)
              </h2>
              <p class="text-xs text-slate-500 mt-1">
                나의 현재 레벨(Level ${lab.level}) 필수 단어가 자동으로 세팅되어 있습니다. 4가지 AI 암기법을 즉시 체험하거나 프롬프트를 복사해 활용하세요.
              </p>
            </div>
            <button onclick="app.switchTab('zombie')"
              class="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs whitespace-nowrap shadow">
              🧟 이 단어들로 좀비 디펜스 게임하기 →
            </button>
          </div>

          <!-- 4대 방법론 탭 버튼 -->
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-5">
            ${[
              { id: 1, icon: '📖', title: '1. 마이크로 스토리텔링', sub: '정교화 부호화 (관심사 결합)' },
              { id: 2, icon: '🕵️', title: '2. 소크라테스 스무고개', sub: '능동적 인출 연습 (역추리)' },
              { id: 3, icon: '🎨', title: '3. 이중 부호화 연상힌트', sub: '어원 + 말장난 + 머릿속 그림' },
              { id: 4, icon: '🏰', title: '4. 텍스트 RPG 탈출 미션', sub: '상황 학습 이론 & 게이미피케이션' }
            ].map(m => `
              <button onclick="app.selectAiLabMethod(${m.id})"
                class="p-4 rounded-2xl border-2 text-left transition ${
                  lab.selectedMethod === m.id
                    ? 'border-purple-600 bg-purple-50/70 shadow-sm'
                    : 'border-slate-200 bg-slate-50/50 hover:border-purple-300'
                }">
                <div class="text-xl">${m.icon}</div>
                <div class="font-extrabold text-sm text-slate-900 mt-1">${m.title}</div>
                <div class="text-[11px] text-slate-500 mt-0.5">${m.sub}</div>
              </button>
            `).join('')}
          </div>

          <!-- 하단: 좌측 AI 즉시 시뮬레이션 결과 & 우측 학생 실습 프롬프트 복사기 -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div class="lg:col-span-7 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-extrabold text-purple-700">✨ 내 레벨 핵심 단어 3개 즉시 적용 결과</span>
                <span class="text-xs font-bold text-slate-500">대상 단어: ${wordListStr}</span>
              </div>

              <div class="space-y-3">
                ${top3Words.map(w => `
                  <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-lg font-black text-slate-900">${w.word}</span>
                        <span class="text-xs text-slate-400 font-bold ml-1">${w.partOfSpeech}</span>
                        <span class="text-sm font-extrabold text-indigo-600 ml-2">${w.meaningKo}</span>
                      </div>
                      <button onclick="app.speakWord('${w.word}')" class="text-xs px-2 py-1 rounded bg-slate-100">🔊 발음</button>
                    </div>
                    <div class="text-xs text-slate-700">🧩 <strong>[어원 쪼개기]:</strong> ${w.learningMetadata?.etymologyTip}</div>
                    <div class="text-xs text-amber-800 font-semibold">💡 <strong>[말장난 암기팁]:</strong> ${w.learningMetadata?.acousticTip}</div>
                    <div class="text-xs text-slate-600">🕵️ <strong>[추리 단서]:</strong> ${w.learningMetadata?.socraticRiddle?.hint2}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-extrabold text-amber-300">📋 맞춤형 AI 실습 프롬프트 (자동 완성)</span>
                  <button onclick="app.copyAiPrompt()" class="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold">
                    프롬프트 복사하기
                  </button>
                </div>
                <div class="mb-3">
                  <label class="block text-[11px] text-slate-400 mb-1">내 관심사 키워드 변경:</label>
                  <input type="text" value="${lab.interest}"
                    onchange="app.updateAiLabInterest(this.value)"
                    class="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white" />
                </div>
                <pre id="aiLabPromptBox" class="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-wrap font-mono leading-relaxed">${prompts[lab.selectedMethod]}</pre>
              </div>
              <p class="text-[11px] text-slate-400 mt-3">
                💡 위 프롬프트는 나의 현재 레벨 단어(${wordListStr})가 자동으로 채워져 있습니다. 복사해서 AI 챗봇에 붙여넣거나 바로 위 좀비 게임에서 실습해보세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  selectAiLabMethod(methodId) {
    if (!this.state.aiLab) return;
    this.state.aiLab.selectedMethod = methodId;
    this.renderAiLab();
  },

  updateAiLabInterest(val) {
    if (!this.state.aiLab) return;
    this.state.aiLab.interest = val;
    this.renderAiLab();
  },

  copyAiPrompt() {
    const el = document.getElementById('aiLabPromptBox');
    if (!el) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
      this.showToast('📋 AI 실습 프롬프트가 클립보드에 복사되었습니다!');
    });
  },

  // =========================================================================
  // 12. [AI 수학(수포자 탈출)] 대시보드 및 소크라테스 코칭 엔진
  // =========================================================================

  async initMathApp() {
    await this.loadMathCurriculum();
    const curGrade = this.state.math.selectedGrade || 1;
    const gradeUnits = (this.state.math.curriculum && this.state.math.curriculum[curGrade]) || [];
    const targetUnitId = this.state.math.selectedUnitId || (gradeUnits[0] ? gradeUnits[0].unitId : 1);
    await this.loadMathProblem(curGrade, targetUnitId, this.state.math.selectedLevel || 'medium');
  },

  async loadMathCurriculum() {
    if (!this.state.user) return;
    try {
      const res = await fetch(`/api/math/curriculum?studentId=${encodeURIComponent(this.state.user.id)}`);
      if (res.ok) {
        const data = await res.json();
        this.state.math.curriculum = data.unitsByGrade;
        this.state.math.completedCount = data.completedCount;
        this.state.math.totalUnits = data.totalUnits;
        this.state.math.progressPercent = data.progressPercent;
        if (data.mathProgress && data.mathProgress.planner) {
          this.state.math.plannerData = data.mathProgress.planner;
        }
      }
    } catch (e) {
      console.error('Failed to load math curriculum', e);
    }
  },

  async selectMathGrade(grade) {
    this.state.math.selectedGrade = Number(grade);
    const gradeUnits = (this.state.math.curriculum && this.state.math.curriculum[grade]) || [];
    const firstUnitId = gradeUnits[0] ? gradeUnits[0].unitId : 1;
    await this.loadMathProblem(grade, firstUnitId, this.state.math.selectedLevel || 'medium');
  },

  async selectMathUnit(unitId) {
    await this.loadMathProblem(this.state.math.selectedGrade, Number(unitId), this.state.math.selectedLevel || 'medium');
  },

  async selectMathLevel(level) {
    this.state.math.selectedLevel = level;
    await this.loadMathProblem(this.state.math.selectedGrade, this.state.math.selectedUnitId, level);
  },

  async loadMathProblem(grade, unitId, level, problemId) {
    this.state.math.selectedGrade = Number(grade);
    this.state.math.selectedUnitId = Number(unitId);
    this.state.math.selectedLevel = level;
    this.state.math.steppingStoneDone = false;
    this.state.math.steppingStoneFeedback = null;
    this.state.math.revealedHintStep = 0;
    this.state.math.problemAnswered = false;
    this.state.math.userChoice = null;
    this.state.math.answerResult = null;
    this.state.math.showingStoryModal = false;

    let url = `/api/math/problem?grade=${grade}&unitId=${unitId}&level=${level}`;
    if (problemId) url += `&problemId=${problemId}`;

    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.state.math.currentUnit = data.unit;
        this.state.math.currentProblem = data.problem;
        this.state.math.availableLevels = data.availableLevels || [];
      }
    } catch (e) {
      console.error('Failed to load math problem', e);
    }

    this.renderMath();
    this.renderMathKaTeX();
  },

  submitSteppingStone(choiceIdx) {
    const prob = this.state.math.currentProblem;
    if (!prob || !prob.steppingStoneQuiz) return;
    const quiz = prob.steppingStoneQuiz;
    const isCorrect = (choiceIdx === quiz.correctAnswer);

    if (isCorrect) {
      this.state.math.steppingStoneDone = true;
      this.state.math.steppingStoneFeedback = {
        isCorrect: true,
        text: '🎉 정답입니다! 선행 필수 무기를 성공적으로 장착했습니다. 이제 아래 본 문제에 도전하세요!'
      };
      this.showToast('🛡️ 선행 개념 무기 장착 완료!');
    } else {
      this.state.math.steppingStoneFeedback = {
        isCorrect: false,
        text: `💡 아쉬워요! [힌트: ${quiz.explanation || '선행 개념을 다시 읽어보세요'}] 다시 번호를 선택해볼까요?`
      };
    }
    this.renderMath();
    this.renderMathKaTeX();
  },

  skipOrUnlockProblem() {
    this.state.math.steppingStoneDone = true;
    this.renderMath();
    this.renderMathKaTeX();
  },

  revealNextHint() {
    if (this.state.math.revealedHintStep < 3) {
      this.state.math.revealedHintStep += 1;
      this.renderMath();
      this.renderMathKaTeX();
    }
  },

  openStoryModal() {
    this.state.math.showingStoryModal = true;
    this.renderMath();
    this.renderMathKaTeX();
  },

  closeStoryModal() {
    this.state.math.showingStoryModal = false;
    this.renderMath();
    this.renderMathKaTeX();
  },

  async submitMathAnswer(choiceIdx) {
    const prob = this.state.math.currentProblem;
    if (!prob || !prob.problem) return;
    if (this.state.math.problemAnswered && this.state.math.answerResult?.isCorrect) return;

    const isCorrect = (choiceIdx === prob.problem.correctAnswer);
    this.state.math.problemAnswered = true;
    this.state.math.userChoice = choiceIdx;
    this.state.math.answerResult = {
      isCorrect,
      selected: choiceIdx,
      correctAnswer: prob.problem.correctAnswer
    };

    try {
      const res = await fetch('/api/math/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.state.user.id,
          problemId: prob.id,
          grade: prob.grade,
          unitId: prob.unitId,
          isCorrect,
          usedHintCount: this.state.math.revealedHintStep,
          usedStorytelling: this.state.math.showingStoryModal
        })
      });
      if (res.ok) {
        if (isCorrect) {
          this.showToast('🎉 정답입니다! 단원 마스터 완료!');
          await this.loadMathCurriculum();
        } else {
          this.showToast('🤔 오답입니다! 소크라테스 힌트를 확인해보세요.');
        }
      }
    } catch (e) {
      console.error(e);
    }

    this.renderMath();
    this.renderMathKaTeX();
  },

  openPlannerModal() {
    this.state.math.showPlannerModal = true;
    this.renderMath();
  },

  closePlannerModal() {
    this.state.math.showPlannerModal = false;
    this.renderMath();
  },

  async saveMathPlanner() {
    const mins = Number(document.getElementById('mathPlanMins')?.value || 30);
    const goal = document.getElementById('mathPlanGoal')?.value || '기초 개념 완전 정복';
    const dayCheckboxes = document.querySelectorAll('.math-day-chk:checked');
    const days = Array.from(dayCheckboxes).map(cb => Number(cb.value));

    try {
      const res = await fetch('/api/math/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.state.user.id,
          studyMinutes: mins,
          monthlyGoal: goal,
          studyDays: days.length > 0 ? days : [1, 3, 5]
        })
      });
      if (res.ok) {
        const data = await res.json();
        this.state.math.plannerData = data.planner;
        this.state.math.showPlannerModal = false;
        this.showToast('📅 맞춤형 수학 플래너가 성공적으로 등록되었습니다!');
        this.renderMath();
      }
    } catch (e) {
      console.error(e);
    }
  },

  openPhotoModal() {
    this.state.math.showPhotoModal = true;
    this.state.math.photoResult = null;
    this.renderMath();
  },

  closePhotoModal() {
    this.state.math.showPhotoModal = false;
    this.renderMath();
  },

  async submitPhotoSolve(mode, query) {
    const inputVal = query || document.getElementById('photoProblemInput')?.value || '';
    if (!inputVal.trim()) {
      this.showToast('질문할 수학 문제나 키워드를 입력해주세요.');
      return;
    }
    try {
      const res = await fetch('/api/math/photo-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.state.user.id,
          questionText: inputVal,
          mode: mode || 'hint'
        })
      });
      if (res.ok) {
        const data = await res.json();
        this.state.math.photoResult = data;
        this.renderMath();
        this.renderMathKaTeX();
      }
    } catch (e) {
      console.error(e);
    }
  },

  renderMathKaTeX() {
    setTimeout(() => {
      const root = document.getElementById('appRoot');
      if (root && typeof renderMathInElement === 'function') {
        try {
          renderMathInElement(root, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
          });
        } catch (err) {
          console.warn('KaTeX render error:', err);
        }
      }
    }, 40);
  },

  renderMath() {
    const root = document.getElementById('appRoot');
    const math = this.state.math;
    const curGrade = math.selectedGrade || 1;
    const curUnitId = math.selectedUnitId || 1;
    const gradeUnits = (math.curriculum && math.curriculum[curGrade]) || [];
    const prob = math.currentProblem;
    const unit = math.currentUnit || (prob ? { grade: prob.grade, gradeLabel: prob.gradeLabel, unitId: prob.unitId, unitName: prob.unitName, summary: '' } : null);
    const completedCount = math.completedCount || 0;
    const totalUnits = math.totalUnits || 21;
    const progressPercent = math.progressPercent || 0;

    root.innerHTML = `
      <div class="space-y-6 pb-12">
        <!-- 상단 헤더 배너 -->
        <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div class="absolute -right-8 -bottom-10 opacity-10 text-9xl font-black select-none pointer-events-none">
            ∑√π
          </div>
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black tracking-wide text-sky-100">
                <span>📐 소크라테스 AI 수학 코치</span>
                <span class="w-1 h-1 rounded-full bg-sky-300"></span>
                <span>수포자 탈출 3원칙 엔진</span>
              </div>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                대한민국 중학교 수학 <span class="text-amber-300">21개 전 단원</span> 완전정복
              </h1>
              <p class="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                🛡️ <strong>선행 개념 징검다리 무기</strong> 장착 ➔ 💡 <strong>소크라테스 3단계 힌트</strong>로 스스로 유도 ➔ 🎭 <strong>3-Scene 실생활 웹툰 비유</strong>로 직관 체득!
              </p>
            </div>

            <!-- 우측 액션 버튼들 -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
              <button onclick="app.openPlannerModal()" class="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center gap-1.5">
                <span>📅</span>
                <span>나만의 수학 플래너</span>
              </button>
              <button onclick="app.openPhotoModal()" class="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-xs sm:text-sm border border-white/30 transition flex items-center gap-1.5">
                <span>📷</span>
                <span>Photo Math 질문</span>
              </button>
            </div>
          </div>

          <!-- 진도율 게이지 바 -->
          <div class="mt-6 pt-5 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span class="font-bold text-blue-100">전체 21단원 마스터 현황:</span>
              <span class="font-black text-amber-300 text-sm">${completedCount} / ${totalUnits} 단원 (${progressPercent}%)</span>
            </div>
            <div class="w-full sm:w-64 h-2.5 bg-black/25 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        </div>

        <!-- 학년 탭 선택바 -->
        <div class="flex items-center justify-center sm:justify-start gap-2 bg-white p-2 rounded-2xl border border-slate-200 card-shadow">
          ${[1, 2, 3].map(g => `
            <button onclick="app.selectMathGrade(${g})" class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              curGrade === g
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }">
              <span>${g === 1 ? '🌱 중학 1학년' : g === 2 ? '🌿 중학 2학년' : '🌳 중학 3학년'}</span>
              <span class="text-[11px] px-1.5 py-0.5 rounded-md ${curGrade === g ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'}">7단원</span>
            </button>
          `).join('')}
        </div>

        <!-- 메인 2단 레이아웃 (좌: 단원 목록 / 우: 선행 징검다리 & 문제 풀이) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          <!-- 좌측 사이드바: 선택 학년 7개 단원 리스트 -->
          <div class="lg:col-span-4 space-y-4">
            <div class="bg-white rounded-2xl border border-slate-200 p-4 card-shadow">
              <div class="flex items-center justify-between mb-3 px-1">
                <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span>📚</span>
                  <span>중${curGrade} 교과과정 단원 목록</span>
                </span>
                <span class="text-[11px] text-slate-500 font-semibold">클릭하여 단원 이동</span>
              </div>

              <div class="space-y-2">
                ${gradeUnits.map(u => {
                  const isActive = (u.unitId === curUnitId);
                  return `
                    <div onclick="app.selectMathUnit(${u.unitId})" class="cursor-pointer p-3.5 rounded-xl border transition flex items-start justify-between gap-3 ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-400/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <span class="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black ${
                            isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }">${u.unitId}</span>
                          <span class="text-xs sm:text-sm font-extrabold ${isActive ? 'text-blue-900' : 'text-slate-800'}">${u.unitName}</span>
                        </div>
                        <p class="text-[11px] text-slate-500 line-clamp-1 ml-7">${u.summary || ''}</p>
                      </div>
                      <div>
                        ${u.isCompleted
                          ? '<span class="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">✅ 마스터</span>'
                          : '<span class="text-[11px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-500 border border-slate-200">⏳ 도전중</span>'
                        }
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- 맞춤 플래너 현황 위젯 -->
            ${math.plannerData ? `
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-4 card-shadow space-y-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-amber-900 flex items-center gap-1">
                    <span>📅</span>
                    <span>나의 등록된 플래너</span>
                  </span>
                  <button onclick="app.openPlannerModal()" class="text-[11px] font-bold text-amber-700 underline">수정</button>
                </div>
                <div class="text-xs text-amber-950 font-bold">🎯 목표: ${math.plannerData.monthlyGoal}</div>
                <div class="text-[11px] text-amber-800">⏱️ 일일 학습: ${math.plannerData.studyMinutes}분 · 요일: [${math.plannerData.activeDayLabels}]</div>
                <div class="text-[11px] text-amber-900 bg-white/70 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed font-medium">
                  <strong>오늘의 루틴:</strong> ${math.plannerData.dailyRoutine}
                </div>
              </div>
            ` : `
              <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-4 text-center space-y-2">
                <p class="text-xs text-slate-600 font-bold">아직 등록된 수학 플래너가 없나요?</p>
                <p class="text-[11px] text-slate-400">일일 30분 루틴으로 수포자를 탈출해 보세요!</p>
                <button onclick="app.openPlannerModal()" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition">
                  30초 만에 플래너 생성하기
                </button>
              </div>
            `}
          </div>

          <!-- 우측 메인 학습 영역: 징검다리 퀴즈 & 본 문제 풀이 -->
          <div class="lg:col-span-8 space-y-6">

            ${!prob ? `
              <div class="bg-white rounded-2xl p-12 text-center border border-slate-200 card-shadow space-y-3">
                <div class="text-4xl">📐</div>
                <p class="text-sm font-bold text-slate-600">선택된 단원의 문제를 불러오는 중입니다...</p>
              </div>
            ` : `
              <!-- 단원 타이틀 및 난이도 탭바 -->
              <div class="bg-white rounded-2xl border border-slate-200 p-5 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-black px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                      ${unit.gradeLabel || `중학 ${curGrade}학년`}
                    </span>
                    <span class="text-xs font-extrabold text-slate-500">단원 ${unit.unitId}</span>
                  </div>
                  <h2 class="text-lg sm:text-xl font-black text-slate-900">${unit.unitName}</h2>
                </div>

                <!-- 난이도 선택 버튼들 -->
                <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  ${[
                    { id: 'easy', label: '🟢 기초(하)' },
                    { id: 'medium', label: '🔵 표준(중)' },
                    { id: 'hard', label: '🟣 심화(상)' }
                  ].map(lvl => `
                    <button onclick="app.selectMathLevel('${lvl.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      math.selectedLevel === lvl.id
                        ? 'bg-white text-slate-900 shadow-sm font-black'
                        : 'text-slate-500 hover:text-slate-800'
                    }">
                      ${lvl.label}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- ======================================================= -->
              <!-- 1. [선행 필수 개념 징검다리 퀴즈 (무기 장착 카드)] -->
              <!-- ======================================================= -->
              <div class="bg-white rounded-2xl border ${
                math.steppingStoneDone ? 'border-emerald-300 ring-1 ring-emerald-300/30' : 'border-amber-300 ring-2 ring-amber-300/20'
              } p-5 sm:p-6 card-shadow space-y-4">

                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">${math.steppingStoneDone ? '🛡️' : '⚔️'}</span>
                    <span class="text-sm sm:text-base font-black ${math.steppingStoneDone ? 'text-emerald-800' : 'text-amber-900'}">
                      선행 필수 개념 징검다리 퀴즈 (무기 장착)
                    </span>
                  </div>
                  <div>
                    ${math.steppingStoneDone
                      ? '<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">✅ 무기 장착 완료</span>'
                      : '<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">⚠️ 먼저 통과 필요</span>'
                    }
                  </div>
                </div>

                <!-- 선행 개념 설명 상자 -->
                <div class="bg-amber-50/70 rounded-xl p-4 border border-amber-200/70 space-y-1.5">
                  <div class="flex items-center gap-2 text-xs font-black text-amber-900">
                    <span>💡 [핵심 선행 개념]:</span>
                    <span>${prob.steppingStoneQuiz?.prerequisiteConcept || '선행 기본 원리'}</span>
                  </div>
                  <p class="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                    ${prob.steppingStoneQuiz?.conceptExplanation || ''}
                  </p>
                </div>

                <!-- 징검다리 퀴즈 질문 & 4지선다 마우스 클릭 버튼 -->
                <div class="space-y-3">
                  <div class="text-xs sm:text-sm font-extrabold text-slate-800">
                    ❓ <strong>[징검다리 점검]:</strong> ${prob.steppingStoneQuiz?.question || ''}
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    ${(prob.steppingStoneQuiz?.options || []).map((opt, idx) => {
                      const isCorrect = (idx === prob.steppingStoneQuiz.correctAnswer);
                      const isSelected = math.steppingStoneFeedback && (math.steppingStoneDone && isCorrect);
                      return `
                        <button onclick="app.submitSteppingStone(${idx})" class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition flex items-center justify-between gap-2 ${
                          math.steppingStoneDone && isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-black ring-2 ring-emerald-400/20'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                        }">
                          <div class="flex items-center gap-2">
                            <span class="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-xs font-black text-slate-600">
                              [${idx + 1}]
                            </span>
                            <span>${opt}</span>
                          </div>
                          ${math.steppingStoneDone && isCorrect ? '<span class="text-emerald-600">✓ 정답</span>' : ''}
                        </button>
                      `;
                    }).join('')}
                  </div>

                  <!-- 징검다리 피드백 알림 상자 -->
                  ${math.steppingStoneFeedback ? `
                    <div class="p-3.5 rounded-xl text-xs sm:text-sm font-bold ${
                      math.steppingStoneFeedback.isCorrect
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-orange-100 text-orange-950 border border-orange-300'
                    }">
                      ${math.steppingStoneFeedback.text}
                    </div>
                  ` : ''}

                  ${!math.steppingStoneDone ? `
                    <div class="text-right pt-1">
                      <button onclick="app.skipOrUnlockProblem()" class="text-[11px] text-slate-400 hover:text-slate-600 underline">
                        징검다리 건너뛰고 본 문제 바로 풀기 ➔
                      </button>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- ======================================================= -->
              <!-- 2. [오늘의 소크라테스 수학 문제 카드] -->
              <!-- ======================================================= -->
              <div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 card-shadow space-y-6 ${
                !math.steppingStoneDone ? 'opacity-85' : ''
              }">

                <!-- 문제 헤더 -->
                <div class="flex items-start justify-between gap-3">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        ${prob.levelLabel || '표준 문제'}
                      </span>
                      <span class="text-xs font-bold text-slate-500">${prob.title || '문제'}</span>
                    </div>
                    <h3 class="text-base sm:text-lg font-black text-slate-900">${prob.title || ''}</h3>
                  </div>

                  <!-- 실생활 비유 버튼 -->
                  <button onclick="app.openStoryModal()" class="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                    <span>🎭</span>
                    <span>😢 이해 안돼요 (실생활 비유)</span>
                  </button>
                </div>

                <!-- 실생활 맥락 배경 설명 (ai_MATH.md) -->
                ${prob.problem?.realLifeContext ? `
                  <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5">
                    <span class="text-base">🏪</span>
                    <div>
                      <strong class="text-slate-900">[실생활 스토리 맥락]:</strong> ${prob.problem.realLifeContext}
                    </div>
                  </div>
                ` : ''}

                <!-- 문제 본문 (KaTeX 수식 표기) -->
                <div class="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-inner space-y-3">
                  <div class="text-xs font-bold text-sky-300">📝 [수학 문제]</div>
                  <div class="text-sm sm:text-base font-medium leading-relaxed math-tex-content">
                    ${prob.problem?.question || ''}
                  </div>
                </div>

                <!-- 4지선다 마우스 클릭 선택지 (대괄호 번호 버튼 - ai_MATH.md 원칙 1) -->
                <div class="space-y-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-slate-700">👇 정답 선택지를 마우스로 클릭하세요 (키패드 1~4번 가능):</span>
                    ${math.problemAnswered ? `
                      <span class="text-xs font-extrabold ${math.answerResult?.isCorrect ? 'text-emerald-600' : 'text-rose-600'}">
                        ${math.answerResult?.isCorrect ? '🎉 정답!' : '🤔 오답 (힌트를 확인해보세요)'}
                      </span>
                    ` : ''}
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${(prob.problem?.options || []).map((opt, idx) => {
                      const isSelected = (math.userChoice === idx);
                      const isCorrect = (idx === prob.problem.correctAnswer);
                      let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300';

                      if (math.problemAnswered) {
                        if (isCorrect) {
                          btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-black ring-2 ring-emerald-400/20';
                        } else if (isSelected && !isCorrect) {
                          btnClass = 'bg-rose-50 border-rose-300 text-rose-950 font-bold';
                        }
                      }

                      return `
                        <button onclick="app.submitMathAnswer(${idx})" class="w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-bold transition flex items-center justify-between gap-3 ${btnClass}">
                          <div class="flex items-center gap-2.5">
                            <span class="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-700 border border-slate-200">
                              [${idx + 1}]
                            </span>
                            <span class="math-tex-content">${opt}</span>
                          </div>
                          ${math.problemAnswered && isCorrect ? '<span class="text-emerald-600 font-black text-xs">✓ 정답</span>' : ''}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- ===================================================== -->
                <!-- 3. [소크라테스 3단계 힌트 아코디언 드롭다운 (ai_MATH.md 원칙 3)] -->
                <!-- ===================================================== -->
                <div class="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="text-base">💡</span>
                      <span class="text-xs sm:text-sm font-black text-slate-800">
                        소크라테스 3단계 힌트 코칭 (현재 ${math.revealedHintStep} / 3단계 개방)
                      </span>
                    </div>

                    ${math.revealedHintStep < 3 ? `
                      <button onclick="app.revealNextHint()" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition flex items-center gap-1">
                        <span>힌트 ${math.revealedHintStep + 1}단계 열기</span>
                        <span>➔</span>
                      </button>
                    ` : `
                      <span class="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                        ✨ 모든 힌트 개방 완료
                      </span>
                    `}
                  </div>

                  <!-- 힌트 1, 2, 3 단계 표시 카드들 -->
                  <div class="space-y-2.5">
                    <!-- 1단계: 조건 분석 -->
                    <div class="p-3.5 rounded-xl border transition ${
                      math.revealedHintStep >= 1
                        ? 'bg-white border-blue-200 shadow-sm'
                        : 'bg-slate-100/60 border-slate-200 opacity-60 text-slate-400'
                    }">
                      <div class="flex items-center justify-between text-xs font-extrabold ${math.revealedHintStep >= 1 ? 'text-blue-900' : 'text-slate-400'}">
                        <span>📍 1단계: 조건 분석 (문제에서 무엇을 구하라고 했지?)</span>
                        <span>${math.revealedHintStep >= 1 ? '🔓 개방됨' : '🔒 잠김'}</span>
                      </div>
                      ${math.revealedHintStep >= 1 ? `
                        <p class="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed math-tex-content">
                          ${prob.socraticHints?.step1_condition || '문제에서 구하고자 하는 핵심 목표와 주어진 숫자를 확인해보세요.'}
                        </p>
                      ` : ''}
                    </div>

                    <!-- 2단계: 개념/공식 연결 -->
                    <div class="p-3.5 rounded-xl border transition ${
                      math.revealedHintStep >= 2
                        ? 'bg-white border-indigo-200 shadow-sm'
                        : 'bg-slate-100/60 border-slate-200 opacity-60 text-slate-400'
                    }">
                      <div class="flex items-center justify-between text-xs font-extrabold ${math.revealedHintStep >= 2 ? 'text-indigo-900' : 'text-slate-400'}">
                        <span>🧩 2단계: 개념 & 공식 연결 (어떤 수학 공식을 꺼내야 할까?)</span>
                        <span>${math.revealedHintStep >= 2 ? '🔓 개방됨' : '🔒 잠김'}</span>
                      </div>
                      ${math.revealedHintStep >= 2 ? `
                        <p class="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed math-tex-content">
                          ${prob.socraticHints?.step2_concept || '방금 징검다리 퀴즈에서 확인했던 기본 개념을 떠올려보세요.'}
                        </p>
                      ` : ''}
                    </div>

                    <!-- 3단계: 핵심 키포인트 -->
                    <div class="p-3.5 rounded-xl border transition ${
                      math.revealedHintStep >= 3
                        ? 'bg-white border-purple-200 shadow-sm'
                        : 'bg-slate-100/60 border-slate-200 opacity-60 text-slate-400'
                    }">
                      <div class="flex items-center justify-between text-xs font-extrabold ${math.revealedHintStep >= 3 ? 'text-purple-900' : 'text-slate-400'}">
                        <span>🔑 3단계: 핵심 키포인트 & 계산 길잡이</span>
                        <span>${math.revealedHintStep >= 3 ? '🔓 개방됨' : '🔒 잠김'}</span>
                      </div>
                      ${math.revealedHintStep >= 3 ? `
                        <p class="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed math-tex-content">
                          ${prob.socraticHints?.step3_keypoint || '공식에 문제의 값을 대입하여 계산을 완성해보세요.'}
                        </p>
                      ` : ''}
                    </div>
                  </div>
                </div>

                <!-- 문제 풀이 완료 후 상세 해설 박스 -->
                ${math.problemAnswered && math.answerResult?.isCorrect ? `
                  <div class="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2 text-emerald-900 font-black text-sm">
                        <span>🎓</span>
                        <span>소크라테스 최종 정리 해설 (KaTeX)</span>
                      </div>
                      <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">단원 마스터 완료</span>
                    </div>
                    <div class="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium math-tex-content">
                      ${prob.problem?.solution || ''}
                    </div>
                  </div>
                ` : ''}
              </div>
            `}
          </div>
        </div>

        <!-- ======================================================= -->
        <!-- 모달 1: 3-Scene 실생활 비유 웹툰 모달 (ai_MATH.md 원칙 4) -->
        <!-- ======================================================= -->
        ${math.showingStoryModal && prob ? `
          <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto card-shadow border border-slate-200 p-6 sm:p-8 space-y-6">
              <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">🎭</span>
                  <div>
                    <h3 class="text-lg sm:text-xl font-black text-slate-900">
                      ${prob.realLifeMetaphor?.title || '실생활 3-Scene 비유 애니메이션'}
                    </h3>
                    <p class="text-xs text-purple-700 font-bold">복잡한 수학 공식을 현실 이야기로 1초 만에 이해하기</p>
                  </div>
                </div>
                <button onclick="app.closeStoryModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black">
                  ✕
                </button>
              </div>

              <!-- 3컷 카드 씬 (Scene 1 ➔ Scene 2 ➔ Scene 3) -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Scene 1 -->
                <div class="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-black text-purple-900 flex items-center gap-1.5 mb-1">
                      <span>🏪</span>
                      <span>Scene 1: 일상 현실</span>
                    </div>
                    <p class="text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
                      ${prob.realLifeMetaphor?.scene1_reality || ''}
                    </p>
                  </div>
                  <div class="pt-2 text-[11px] font-bold text-purple-600">
                    💡 친숙한 상황으로 진입
                  </div>
                </div>

                <!-- Scene 2 -->
                <div class="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-black text-blue-900 flex items-center gap-1.5 mb-1">
                      <span>⚙️</span>
                      <span>Scene 2: 수학적 전환</span>
                    </div>
                    <p class="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed math-tex-content">
                      ${prob.realLifeMetaphor?.scene2_math_shift || ''}
                    </p>
                  </div>
                  <div class="pt-2 text-[11px] font-bold text-blue-600">
                    📐 미지수와 수식 세우기
                  </div>
                </div>

                <!-- Scene 3 -->
                <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-black text-emerald-900 flex items-center gap-1.5 mb-1">
                      <span>🎉</span>
                      <span>Scene 3: 원리 체득</span>
                    </div>
                    <p class="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                      ${prob.realLifeMetaphor?.scene3_takeaway || ''}
                    </p>
                  </div>
                  <div class="pt-2 text-[11px] font-bold text-emerald-600">
                    ✨ 공식의 본질 완전 이해!
                  </div>
                </div>
              </div>

              <div class="bg-slate-100 p-4 rounded-xl text-xs text-slate-700 leading-relaxed font-medium">
                💡 <strong>코치 가이드:</strong> 이제 이 현실 비유를 머릿속에 떠올리면서 본 문제의 계산에 적용해 보세요!
              </div>

              <div class="text-center pt-2">
                <button onclick="app.closeStoryModal()" class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm shadow-md transition">
                  아하! 이해되었어요 (문제 풀러 가기)
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- ======================================================= -->
        <!-- 모달 2: 나만의 맞춤 수학 학습 플래너 (ai_MATH.md 원칙 6) -->
        <!-- ======================================================= -->
        ${math.showPlannerModal ? `
          <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto card-shadow border border-slate-200 p-6 sm:p-8 space-y-6">
              <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">📅</span>
                  <div>
                    <h3 class="text-lg sm:text-xl font-black text-slate-900">나만의 맞춤 수학 공부 플래너</h3>
                    <p class="text-xs text-amber-700 font-bold">일일 학습 시간과 요일을 기반으로 최적의 루틴을 설계합니다</p>
                  </div>
                </div>
                <button onclick="app.closePlannerModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black">
                  ✕
                </button>
              </div>

              <div class="space-y-4">
                <!-- 1. 일일 공부 시간 -->
                <div>
                  <label class="block text-xs font-black text-slate-800 mb-1.5">⏱️ 하루 수학 집중 시간:</label>
                  <select id="mathPlanMins" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold bg-white focus:ring-2 focus:ring-blue-500">
                    <option value="30" ${math.plannerData?.studyMinutes === 30 ? 'selected' : ''}>일일 30분 (기초 개념 + 징검다리 퀴즈 집중형)</option>
                    <option value="60" ${math.plannerData?.studyMinutes === 60 ? 'selected' : ''}>일일 60분 (표준 교과서 유형 풀이형)</option>
                    <option value="90" ${math.plannerData?.studyMinutes === 90 ? 'selected' : ''}>일일 90분 (심화 고난도 + 실전 응용 완성형)</option>
                  </select>
                </div>

                <!-- 2. 주간 학습 요일 -->
                <div>
                  <label class="block text-xs font-black text-slate-800 mb-1.5">📆 학습 요일 선택 (복수 선택 가능):</label>
                  <div class="grid grid-cols-7 gap-2 text-center">
                    ${[
                      { day: 1, label: '월' },
                      { day: 2, label: '화' },
                      { day: 3, label: '수' },
                      { day: 4, label: '목' },
                      { day: 5, label: '금' },
                      { day: 6, label: '토' },
                      { day: 0, label: '일' }
                    ].map(d => {
                      const isChecked = (math.plannerData?.studyDays || [1, 3, 5]).includes(d.day);
                      return `
                        <label class="cursor-pointer block border border-slate-200 p-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition">
                          <input type="checkbox" value="${d.day}" class="math-day-chk mb-1" ${isChecked ? 'checked' : ''} />
                          <div>${d.label}</div>
                        </label>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- 3. 월간 목표 -->
                <div>
                  <label class="block text-xs font-black text-slate-800 mb-1.5">🎯 이번 달 수학 목표:</label>
                  <select id="mathPlanGoal" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold bg-white focus:ring-2 focus:ring-blue-500">
                    <option value="기초 연산 및 21단원 필수 개념 완전 정복">기초 연산 및 21단원 필수 개념 완전 정복 (수포자 탈출)</option>
                    <option value="학교 내신 중간/기말고사 90점 이상 달성">학교 내신 중간/기말고사 90점 이상 달성 (실전 표준형)</option>
                    <option value="고난도 응용문제 정복 및 다음 학년 선행 마스터">고난도 응용문제 정복 및 다음 학년 선행 마스터</option>
                  </select>
                </div>

                <!-- 4. 플래너 생성 버튼 -->
                <button onclick="app.saveMathPlanner()" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-md transition">
                  ✨ 나만의 맞춤 학습 플래너 생성 & 적용하기
                </button>
              </div>

              <!-- 현재 플래너가 있는 경우 미리보기 표시 -->
              ${math.plannerData ? `
                <div class="mt-4 pt-4 border-t border-slate-200 space-y-3">
                  <span class="text-xs font-black text-slate-800">📋 생성된 4주차 로드맵:</span>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    ${(math.plannerData.monthlyTable || []).map(row => `
                      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <div class="flex items-center justify-between font-extrabold text-blue-900">
                          <span>${row.week}</span>
                          <span class="text-[11px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">${row.target}</span>
                        </div>
                        <p class="text-[11px] text-slate-600 font-medium">${row.focus}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- ======================================================= -->
        <!-- 모달 3: Photo Math 스마트 질문 모달 (ai_MATH.md 원칙 7) -->
        <!-- ======================================================= -->
        ${math.showPhotoModal ? `
          <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto card-shadow border border-slate-200 p-6 sm:p-8 space-y-6">
              <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">📷</span>
                  <div>
                    <h3 class="text-lg sm:text-xl font-black text-slate-900">Photo Math 스마트 질문 프로토콜</h3>
                    <p class="text-xs text-sky-700 font-bold">궁금한 문제를 입력하면 소크라테스 힌트 또는 상세 해설을 제공합니다</p>
                  </div>
                </div>
                <button onclick="app.closePhotoModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black">
                  ✕
                </button>
              </div>

              <!-- 질문 샘플 칩들 -->
              <div class="space-y-2">
                <span class="text-xs font-black text-slate-700">⚡ 빠른 샘플 질문 선택:</span>
                <div class="flex flex-wrap gap-1.5">
                  ${[
                    '소인수분해 약수의 개수',
                    '일차방정식 소금물 농도',
                    '일차부등식 활용',
                    '피타고라스 정리',
                    '이차방정식 근의 공식',
                    '이차함수 꼭짓점 좌표',
                    '삼각비 특수각 높이'
                  ].map(s => `
                    <button onclick="app.submitPhotoSolve('hint', '${s}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition">
                      ${s}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- 텍스트 질문 입력창 -->
              <div class="space-y-3">
                <textarea id="photoProblemInput" rows="3" placeholder="예: '소인수분해로 180의 약수 개수를 어떻게 구하나요?' 또는 수학 문제를 입력하세요." class="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-sky-500"></textarea>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onclick="app.submitPhotoSolve('hint')" class="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2">
                    <span>🧠</span>
                    <span>소크라테스 힌트 먼저 풀기</span>
                  </button>
                  <button onclick="app.submitPhotoSolve('solution')" class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2">
                    <span>📖</span>
                    <span>정답 및 상세 해설 바로 보기</span>
                  </button>
                </div>
              </div>

              <!-- Photo Math 결과 출력 창 -->
              ${math.photoResult ? `
                <div class="mt-4 pt-4 border-t border-slate-200 space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                      <span>🎯</span>
                      <span>매칭 단원: [${math.photoResult.unit?.gradeLabel}] ${math.photoResult.unit?.unitName}</span>
                    </span>
                    <span class="text-[11px] font-bold px-2 py-0.5 rounded ${
                      math.photoResult.mode === 'hint' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                    }">
                      ${math.photoResult.mode === 'hint' ? '소크라테스 힌트 모드' : '상세 해설 모드'}
                    </span>
                  </div>

                  <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div class="text-xs font-bold text-slate-800">대표 유형: ${math.photoResult.problem?.title}</div>
                    <div class="text-xs sm:text-sm text-slate-700 leading-relaxed math-tex-content">
                      ${math.photoResult.problem?.problem?.question}
                    </div>
                  </div>

                  ${math.photoResult.mode === 'hint' ? `
                    <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-200 space-y-2 text-xs sm:text-sm text-indigo-950 font-medium">
                      <div class="font-black text-indigo-900">💡 소크라테스 코치 가이드:</div>
                      <div>${math.photoResult.problem?.socraticHints?.step1_condition}</div>
                      <div class="pt-1">${math.photoResult.problem?.socraticHints?.step2_concept}</div>
                    </div>
                  ` : `
                    <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                      <div class="font-black text-emerald-900">📖 단계별 상세 해설:</div>
                      <div class="math-tex-content">${math.photoResult.problem?.problem?.solution}</div>
                    </div>
                  `}
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    this.renderMathKaTeX();
  },

  // =========================================================================
  // 13. [AI 사이언스 랩] 인터랙티브 가상실험 & 소크라테스 탐구 엔진 (ai_Science.md)
  // =========================================================================

  async initScienceApp() {
    await this.loadScienceCurriculum();
    const targetUnitId = this.state.science.selectedUnitId || 'phys_ohm';
    await this.loadScienceLab(targetUnitId);
  },

  async loadScienceCurriculum() {
    if (!this.state.user) return;
    try {
      const res = await fetch(`/api/science/curriculum?studentId=${encodeURIComponent(this.state.user.id)}`);
      if (res.ok) {
        const data = await res.json();
        this.state.science.curriculum = data.units || [];
        this.state.science.masteredCount = data.masteredCount || 0;
        this.state.science.totalUnits = data.totalUnits || 8;
        this.state.science.progressPercent = data.progressPercent || 0;
      }
    } catch (e) {
      console.error('Failed to load science curriculum', e);
    }
  },

  async selectScienceDomain(domain) {
    this.state.science.selectedDomain = domain;
    const filtered = this.getFilteredScienceUnits();
    if (filtered.length > 0 && !filtered.some(u => u.id === this.state.science.selectedUnitId)) {
      await this.loadScienceLab(filtered[0].id);
    } else {
      this.renderScience();
    }
  },

  async selectScienceGrade(grade) {
    this.state.science.selectedGrade = grade;
    const filtered = this.getFilteredScienceUnits();
    if (filtered.length > 0 && !filtered.some(u => u.id === this.state.science.selectedUnitId)) {
      await this.loadScienceLab(filtered[0].id);
    } else {
      this.renderScience();
    }
  },

  getFilteredScienceUnits() {
    let list = this.state.science.curriculum || [];
    if (this.state.science.selectedDomain !== 'all') {
      list = list.filter(u => u.domain === this.state.science.selectedDomain);
    }
    if (this.state.science.selectedGrade !== 'all') {
      list = list.filter(u => Number(u.grade) === Number(this.state.science.selectedGrade));
    }
    return list;
  },

  async selectScienceUnit(unitId) {
    await this.loadScienceLab(unitId);
  },

  async loadScienceLab(unitId) {
    if (this.state.science.simAnimId) {
      cancelAnimationFrame(this.state.science.simAnimId);
      this.state.science.simAnimId = null;
    }

    this.state.science.selectedUnitId = unitId;
    this.state.science.flipCardFlipped = false;
    this.state.science.selectedQuizOption = null;
    this.state.science.quizAnswerResult = null;
    this.state.science.activeQuizIndex = 0;
    this.state.science.paramLocks = {};
    this.state.science.particles = [];

    try {
      const res = await fetch(`/api/science/lab?unitId=${encodeURIComponent(unitId)}&studentId=${encodeURIComponent(this.state.user.id)}`);
      if (res.ok) {
        const data = await res.json();
        this.state.science.currentUnit = data.unit;
        this.state.science.unitLogs = data.unitLogs || [];
        this.state.science.quizScores = data.quizScores || {};
        this.state.science.isMastered = data.isMastered || false;

        // 슬라이더 기본값 동기화
        if (data.unit?.controls) {
          data.unit.controls.forEach(ctrl => {
            this.state.science.simParams[ctrl.id] = ctrl.defaultVal;
          });
        }

        // 코치 초기 안내 멘트 세팅
        this.state.science.coachChatLog = [
          {
            sender: 'coach',
            text: data.unit?.socraticCoach?.intro || '탐험가님 안녕! 슬라이더를 조작해보고 변화를 관찰해봐!'
          }
        ];
      }
    } catch (e) {
      console.error('Failed to load science lab', e);
    }

    this.renderScience();
    this.startScienceSimulation();
  },

  updateSimParam(paramId, val) {
    if (this.state.science.paramLocks[paramId]) {
      this.showToast('🔒 이 변인은 현재 [고정] 상태입니다. 자물쇠를 눌러 해제하세요.');
      return;
    }
    const num = Number(val);
    this.state.science.simParams[paramId] = num;
    const labelEl = document.getElementById(`simVal_${paramId}`);
    if (labelEl) {
      labelEl.textContent = num;
    }
    this.updateScienceGauges();
  },

  toggleParamLock(paramId) {
    this.state.science.paramLocks[paramId] = !this.state.science.paramLocks[paramId];
    this.renderScience();
    this.startScienceSimulation();
  },

  toggleCircuitSwitch() {
    this.state.science.circuitSwitchOn = !this.state.science.circuitSwitchOn;
    this.renderScience();
    this.startScienceSimulation();
  },

  async logScienceExperiment() {
    const curUnit = this.state.science.currentUnit;
    if (!curUnit) return;
    const params = { ...this.state.science.simParams };

    let resultText = '';
    if (curUnit.simulationType === 'ohm_circuit') {
      const v = params.voltage || 12;
      const r = params.resistance || 4;
      const i = this.state.science.circuitSwitchOn ? (v / r).toFixed(2) : 0;
      resultText = `전압 ${v}V, 저항 ${r}Ω ➔ 전류 ${i}A (전구: ${i >= 3 ? '매우 밝음' : i > 1 ? '보통' : '어두움'})`;
    } else if (curUnit.simulationType === 'particle_states') {
      const t = params.temperature || 20;
      const state = t <= 0 ? '고체(얼음, 격자진동)' : t <= 100 ? '액체(물, 유동충돌)' : '기체(수증기, 고속비행)';
      resultText = `온도 ${t}°C, 부피 ${params.volume}% ➔ 상태: ${state}`;
    } else if (curUnit.simulationType === 'photosynthesis_factory') {
      const light = params.lightIntensity || 60;
      const temp = params.temperature || 25;
      const bubbleCount = temp > 45 ? 0 : Math.round((light / 10) * (params.co2Level || 2) * (1 - Math.abs(temp - 30) / 40));
      resultText = `조도 ${light}%, CO₂ ${params.co2Level}단계, 온도 ${temp}°C ➔ 산소기포 ${bubbleCount}개/분`;
    } else if (curUnit.simulationType === 'plate_tectonics') {
      const bType = params.boundaryType === 1 ? '발산형(해령, 마그마 분출)' : '수렴형(히말라야 습곡 산맥 융기)';
      resultText = `대류 세기 ${params.mantleHeat}단계, 경계 유형: ${bType}`;
    } else {
      resultText = `측정 완료 (파라미터 정상 반영)`;
    }

    try {
      const res = await fetch('/api/science/log-experiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.state.user.id,
          unitId: curUnit.id,
          params,
          resultText
        })
      });
      if (res.ok) {
        const data = await res.json();
        this.state.science.unitLogs.unshift(data.logEntry);
        this.showToast('📋 관찰 실험값이 탐구 기록표에 성공적으로 저장되었습니다!');
        this.renderScience();
        this.startScienceSimulation();
      }
    } catch (e) {
      console.error(e);
    }
  },

  async submitScienceQuiz(quizId, selectedOption) {
    const curUnit = this.state.science.currentUnit;
    if (!curUnit) return;
    this.state.science.selectedQuizOption = selectedOption;

    try {
      const res = await fetch('/api/science/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.state.user.id,
          unitId: curUnit.id,
          quizId,
          selectedOption
        })
      });
      if (res.ok) {
        const data = await res.json();
        this.state.science.quizAnswerResult = data;
        if (data.isCorrect) {
          this.showToast('🎉 정답입니다! 과학적 원리를 완벽히 이해하셨네요!');
        } else {
          this.showToast('💡 아쉬워요! 해설을 확인하고 다시 탐구해 보세요.');
        }
        await this.loadScienceCurriculum();
        this.renderScience();
        this.startScienceSimulation();
      }
    } catch (e) {
      console.error(e);
    }
  },

  selectQuizQuestion(idx) {
    this.state.science.activeQuizIndex = idx;
    this.state.science.selectedQuizOption = null;
    this.state.science.quizAnswerResult = null;
    this.renderScience();
    this.startScienceSimulation();
  },

  async sendScienceCoachQuery(queryKey) {
    const curUnit = this.state.science.currentUnit;
    if (!curUnit) return;

    const queryChipLabels = {
      analogy: '💡 일상 비유로 더 쉽게 설명해줘!',
      variable_resistance: '🧪 저항을 2배로 늘리면 어떻게 돼?',
      temp_enzyme: '🧪 온도를 50°C로 올리면 왜 기포가 멈춰?',
      gas_state: '🧪 100°C가 넘으면 왜 날아다녀?',
      himalaya_fossil: '🧪 히말라야 산꼭대기에 왜 조개 화석이 나와?',
      quiz: '📝 1초 핵심 퀴즈 내줘!'
    };

    const userPrompt = queryChipLabels[queryKey] || '선생님, 더 자세히 설명해주세요!';
    this.state.science.coachChatLog.push({ sender: 'user', text: userPrompt });

    try {
      const res = await fetch('/api/science/coach-dialog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: curUnit.id,
          query: queryKey
        })
      });
      if (res.ok) {
        const data = await res.json();
        this.state.science.coachChatLog.push({ sender: 'coach', text: data.response });
      }
    } catch (e) {
      console.error(e);
    }

    this.renderScience();
    this.startScienceSimulation();
    setTimeout(() => {
      const chatBox = document.getElementById('scienceCoachChatBox');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
  },

  async submitCustomCoachMessage() {
    const input = document.getElementById('coachCustomInput');
    const msg = (input?.value || '').trim();
    if (!msg) return;
    input.value = '';

    const curUnit = this.state.science.currentUnit;
    this.state.science.coachChatLog.push({ sender: 'user', text: msg });

    try {
      const res = await fetch('/api/science/coach-dialog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: curUnit?.id || 'phys_ohm',
          userMessage: msg
        })
      });
      if (res.ok) {
        const data = await res.json();
        this.state.science.coachChatLog.push({ sender: 'coach', text: data.response });
      }
    } catch (e) {
      console.error(e);
    }

    this.renderScience();
    this.startScienceSimulation();
    setTimeout(() => {
      const chatBox = document.getElementById('scienceCoachChatBox');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
  },

  toggleFlipCard() {
    this.state.science.flipCardFlipped = !this.state.science.flipCardFlipped;
    const cardInner = document.getElementById('misconceptionCardInner');
    if (cardInner) {
      if (this.state.science.flipCardFlipped) {
        cardInner.style.transform = 'rotateY(180deg)';
      } else {
        cardInner.style.transform = 'rotateY(0deg)';
      }
    }
  },

  updateScienceGauges() {
    const unit = this.state.science.currentUnit;
    if (!unit) return;
    const params = this.state.science.simParams;

    if (unit.simulationType === 'ohm_circuit') {
      const v = params.voltage || 12;
      const r = params.resistance || 4;
      const sw = this.state.science.circuitSwitchOn;
      const i = sw ? (v / r).toFixed(2) : '0.00';
      const elI = document.getElementById('ohmGauge_current');
      if (elI) elI.textContent = `${i} A`;
      const elV = document.getElementById('ohmGauge_voltage');
      if (elV) elV.textContent = `${v} V`;
      const elR = document.getElementById('ohmGauge_resistance');
      if (elR) elR.textContent = `${r} Ω`;
    }
  },

  startScienceSimulation() {
    const canvas = document.getElementById('scienceSimCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const unit = this.state.science.currentUnit;
    const simType = unit?.simulationType || 'ohm_circuit';

    let particles = this.state.science.particles;
    let step = 0;

    // 파티클 초기화
    if (simType === 'ohm_circuit' && (!particles || particles.length !== 24)) {
      particles = [];
      for (let i = 0; i < 24; i++) {
        particles.push({ t: i / 24 });
      }
      this.state.science.particles = particles;
    } else if (simType === 'particle_states' && (!particles || particles.length !== 40)) {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: 180 + Math.random() * 340,
          y: 120 + Math.random() * 140,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          row: Math.floor(i / 8),
          col: i % 8
        });
      }
      this.state.science.particles = particles;
    } else if (simType === 'photosynthesis_factory' && (!particles || particles.length < 10)) {
      particles = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: 350 + (Math.random() - 0.5) * 20,
          y: 260 + Math.random() * 20,
          vy: 0.8 + Math.random() * 1.5,
          radius: 2 + Math.random() * 3.5,
          active: Math.random() > 0.4
        });
      }
      this.state.science.particles = particles;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step++;

      if (simType === 'ohm_circuit') {
        this.drawOhmSimulation(ctx, canvas, step);
      } else if (simType === 'particle_states') {
        this.drawParticleStatesSimulation(ctx, canvas, step);
      } else if (simType === 'photosynthesis_factory') {
        this.drawPhotosynthesisSimulation(ctx, canvas, step);
      } else if (simType === 'plate_tectonics') {
        this.drawPlateTectonicsSimulation(ctx, canvas, step);
      } else {
        this.drawDefaultScienceSimulation(ctx, canvas, step);
      }

      this.state.science.simAnimId = requestAnimationFrame(animate);
    };

    this.state.science.simAnimId = requestAnimationFrame(animate);
  },

  // 1. 옴의 법칙 시뮬레이터 캔버스 렌더러
  drawOhmSimulation(ctx, canvas, step) {
    const params = this.state.science.simParams;
    const v = params.voltage || 12;
    const r = params.resistance || 4;
    const isSwOn = this.state.science.circuitSwitchOn;
    const current = isSwOn ? (v / r) : 0;

    // 회로 도선 사각형 좌표 (w: 520, h: 200)
    const left = 90, top = 60, right = 610, bottom = 260;

    // 도선 그리기 (어두운 회색 굵은 선)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeRect(left, top, right - left, bottom - top);

    // 하단 건전지 (Battery) 그리기
    const batX = 350, batY = bottom;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(batX - 45, batY - 14, 90, 28);
    // 양극 (+)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(batX - 35, batY - 12, 30, 24);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Pretendard';
    ctx.fillText('+', batX - 25, batY + 5);
    // 음극 (-)
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(batX + 5, batY - 8, 25, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('-', batX + 15, batY + 4);
    // 건전지 레이블
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 12px Pretendard';
    ctx.fillText(`건전지 (${v}V)`, batX - 32, batY + 30);

    // 상단 좌측 스위치 (Switch) 그리기
    const swX = 220, swY = top;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(swX - 25, swY - 12, 50, 24);
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(swX - 18, swY, 5, 0, Math.PI * 2);
    ctx.arc(swX + 18, swY, 5, 0, Math.PI * 2);
    ctx.fill();

    if (isSwOn) {
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(swX - 18, swY);
      ctx.lineTo(swX + 18, swY);
      ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 11px Pretendard';
      ctx.fillText('ON (연결)', swX - 22, swY - 16);
    } else {
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(swX - 18, swY);
      ctx.lineTo(swX + 10, swY - 18);
      ctx.stroke();
      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 11px Pretendard';
      ctx.fillText('OFF (단선)', swX - 22, swY - 20);
    }

    // 우측 저항기 (Resistor) 그리기
    const resX = right, resY = 160;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(resX - 14, resY - 40, 28, 80);
    // 저항기 몸체 (직사각형 둥근 세라믹)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(resX - 12, resY - 32, 24, 64);
    // 색상 띠 3개
    ctx.fillStyle = '#b45309';
    ctx.fillRect(resX - 12, resY - 20, 24, 6);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(resX - 12, resY - 4, 24, 6);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(resX - 12, resY + 12, 24, 6);
    // 저항 레이블
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px Pretendard';
    ctx.fillText(`저항 R (${r}Ω)`, resX - 85, resY + 4);

    // 상단 중앙 전구 (Lightbulb) 그리기
    const bulbX = 350, bulbY = top;
    // 발광 글로우 효과 (Current 연동)
    if (isSwOn && current > 0) {
      const glowRadius = Math.min(85, 15 + current * 12);
      const radGrad = ctx.createRadialGradient(bulbX, bulbY - 10, 5, bulbX, bulbY - 10, glowRadius);
      radGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
      radGrad.addColorStop(0.4, 'rgba(250, 204, 21, 0.6)');
      radGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(bulbX, bulbY - 10, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 소켓 베이스
    ctx.fillStyle = '#64748b';
    ctx.fillRect(bulbX - 12, bulbY - 8, 24, 16);
    // 전구 유리구
    ctx.beginPath();
    ctx.arc(bulbX, bulbY - 20, 18, 0, Math.PI * 2);
    ctx.fillStyle = isSwOn && current > 0 ? '#fef08a' : '#334155';
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 필라멘트
    ctx.strokeStyle = isSwOn && current > 0 ? '#ffffff' : '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bulbX - 7, bulbY - 12);
    ctx.lineTo(bulbX - 3, bulbY - 24);
    ctx.lineTo(bulbX + 3, bulbY - 24);
    ctx.lineTo(bulbX + 7, bulbY - 12);
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 12px Pretendard';
    ctx.fillText(`전구 (밝기: ${isSwOn ? current.toFixed(1) : '0'})`, bulbX - 35, bulbY - 45);

    // 전자 입자 이동 애니메이션 (반시계방향: 음극 ➔ 도선 ➔ 양극)
    const perimeter = 2 * ((right - left) + (bottom - top));
    const speed = isSwOn ? (current * 1.5) : 0;
    const particles = this.state.science.particles || [];

    particles.forEach(p => {
      p.t = (p.t + speed / perimeter) % 1;
      let dist = p.t * perimeter;
      let px = 0, py = 0;

      // 둘레 4변 좌표 매핑 (반시계방향)
      const w = right - left;
      const h = bottom - top;

      if (dist < w) {
        // 상단 변 (오른쪽 ➔ 왼쪽)
        px = right - dist;
        py = top;
      } else if (dist < w + h) {
        // 좌측 변 (위 ➔ 아래)
        px = left;
        py = top + (dist - w);
      } else if (dist < 2 * w + h) {
        // 하단 변 (왼쪽 ➔ 오른쪽)
        px = left + (dist - (w + h));
        py = bottom;
      } else {
        // 우측 변 (아래 ➔ 위)
        px = right;
        py = bottom - (dist - (2 * w + h));
      }

      // 파란색 전자 입자 그리기
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 상단 워터파크 슬라이드 비유 뱃지
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(left + 15, bottom - 60, 240, 48);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1;
    ctx.strokeRect(left + 15, bottom - 60, 240, 48);

    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 11px Pretendard';
    ctx.fillText('🌊 워터파크 슬라이드 비유 실시간 상태', left + 25, bottom - 42);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '11px Pretendard';
    ctx.fillText(`낙차(V)=${v}m | 돌(R)=${r}개 ➔ 물살=${current.toFixed(2)}m/s`, left + 25, bottom - 24);
  },

  // 2. 분자 상태 변화 시뮬레이터 캔버스 렌더러
  drawParticleStatesSimulation(ctx, canvas, step) {
    const params = this.state.science.simParams;
    const temp = params.temperature !== undefined ? params.temperature : 20;
    const volPct = params.volume || 80;

    // 용기 영역
    const cLeft = 140, cRight = 560, cBottom = 280;
    const pistonY = 60 + (100 - volPct) * 1.5;

    // 실린더 벽면
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(cLeft, pistonY - 20);
    ctx.lineTo(cLeft, cBottom);
    ctx.lineTo(cRight, cBottom);
    ctx.lineTo(cRight, pistonY - 20);
    ctx.stroke();

    // 피스톤 헤드
    ctx.fillStyle = '#334155';
    ctx.fillRect(cLeft + 3, pistonY - 14, (cRight - cLeft) - 6, 18);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(340, 20, 20, pistonY - 20); // 피스톤 손잡이

    // 하단 버너 / 얼음팩 표시
    if (temp > 0) {
      // 불꽃 애니메이션
      const flameH = Math.min(35, 10 + (temp / 150) * 25);
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(330, cBottom + 35);
      ctx.quadraticCurveTo(340, cBottom + 35 - flameH + Math.sin(step * 0.3) * 4, 350, cBottom + 10);
      ctx.quadraticCurveTo(360, cBottom + 35 - flameH + Math.cos(step * 0.3) * 4, 370, cBottom + 35);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px Pretendard';
      ctx.fillText(`가열 중 🔥 (${temp}°C)`, 385, cBottom + 28);
    } else {
      // 얼음팩 표시
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(310, cBottom + 12, 80, 20);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px Pretendard';
      ctx.fillText(`냉각 중 ❄️ (${temp}°C)`, 400, cBottom + 27);
    }

    // 분자 운동 렌더링
    const particles = this.state.science.particles || [];
    let stateLabel = '';
    let particleColor = '';

    if (temp <= 0) {
      stateLabel = '🧊 고체 상태 (얼음: 규칙적 격자 배열, 제자리 미세 진동)';
      particleColor = '#38bdf8';
      const jitter = Math.max(0.5, (temp + 50) * 0.08);

      particles.forEach((p, idx) => {
        const row = Math.floor(idx / 8);
        const col = idx % 8;
        const baseX = cLeft + 45 + col * 45;
        const baseY = cBottom - 25 - row * 30;
        const px = baseX + (Math.sin(step * 0.5 + idx) * jitter);
        const py = baseY + (Math.cos(step * 0.5 + idx) * jitter);

        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    } else if (temp <= 100) {
      stateLabel = '💧 액체 상태 (물: 바닥에서 유동적으로 미끄러지듯 이동)';
      particleColor = '#60a5fa';
      const speedScale = 0.8 + (temp / 100) * 1.5;

      particles.forEach(p => {
        p.x += p.vx * speedScale;
        p.y += p.vy * speedScale;
        const liquidTop = Math.max(pistonY + 20, cBottom - 110);

        if (p.x < cLeft + 15) { p.x = cLeft + 15; p.vx *= -1; }
        if (p.x > cRight - 15) { p.x = cRight - 15; p.vx *= -1; }
        if (p.y < liquidTop) { p.y = liquidTop; p.vy *= -1; }
        if (p.y > cBottom - 15) { p.y = cBottom - 15; p.vy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    } else {
      stateLabel = '💨 기체 상태 (수증기: 사방으로 날뛰며 벽면 강하게 충돌)';
      particleColor = '#fbbf24';
      const speedScale = 2.5 + ((temp - 100) / 50) * 2.5;

      particles.forEach(p => {
        p.x += p.vx * speedScale;
        p.y += p.vy * speedScale;

        if (p.x < cLeft + 15) { p.x = cLeft + 15; p.vx *= -1; }
        if (p.x > cRight - 15) { p.x = cRight - 15; p.vx *= -1; }
        if (p.y < pistonY + 15) { p.y = pistonY + 15; p.vy *= -1; }
        if (p.y > cBottom - 15) { p.y = cBottom - 15; p.vy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // 상태 요약 바
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cLeft, 10, cRight - cLeft, 30);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(cLeft, 10, cRight - cLeft, 30);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px Pretendard';
    ctx.fillText(stateLabel, cLeft + 15, 30);
  },

  // 3. 광합성 팩토리 시뮬레이터 캔버스 렌더러
  drawPhotosynthesisSimulation(ctx, canvas, step) {
    const params = this.state.science.simParams;
    const light = params.lightIntensity !== undefined ? params.lightIntensity : 60;
    const co2 = params.co2Level || 2;
    const temp = params.temperature || 25;

    // 온도가 45도 초과 시 효소 변성으로 기포 발생 급감
    const isEnzymeDenatured = (temp > 45);
    const bubbleRate = isEnzymeDenatured ? 0 : Math.max(0, Math.round((light / 10) * co2 * (1 - Math.abs(temp - 30) / 40)));

    // 상단 태양 조명 (Light Source)
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(120, 50, 28, 0, Math.PI * 2);
    ctx.fill();

    // 빛 방사선 효과
    if (light > 0) {
      ctx.fillStyle = `rgba(253, 224, 71, ${Math.min(0.35, (light / 100) * 0.4)})`;
      ctx.beginPath();
      ctx.moveTo(120, 50);
      ctx.lineTo(260, 180);
      ctx.lineTo(440, 280);
      ctx.lineTo(150, 280);
      ctx.fill();
    }
    ctx.fillStyle = '#ca8a04';
    ctx.font = 'bold 12px Pretendard';
    ctx.fillText(`☀️ 조도 ${light}%`, 95, 95);

    // 중앙 물풀 시험관 (Test Tube)
    const tX = 350, tY = 70, tW = 80, tH = 220;
    // 물 채우기
    ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
    ctx.fillRect(tX - tW / 2, tY + 20, tW, tH - 20);
    // 유리관 윤곽선
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(tX - tW / 2, tY);
    ctx.lineTo(tX - tW / 2, tY + tH - 20);
    ctx.arc(tX, tY + tH - 20, tW / 2, Math.PI, 0, true);
    ctx.lineTo(tX + tW / 2, tY);
    ctx.stroke();

    // 물풀 (Elodea sprig) 줄기와 잎사귀
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(tX, tY + tH - 30);
    ctx.quadraticCurveTo(tX - 15, tY + 160, tX + 10, tY + 120);
    ctx.stroke();

    // 잎사귀들
    ctx.fillStyle = '#22c55e';
    [140, 170, 200, 230].forEach((ly, i) => {
      ctx.beginPath();
      ctx.ellipse(tX - 14 * ((i % 2 === 0) ? 1 : -1), ly, 12, 5, (i % 2 === 0) ? 0.3 : -0.3, 0, Math.PI * 2);
      ctx.fill();
    });

    // 뽀글뽀글 산소 기포 (O2 Bubble) 애니메이션
    const particles = this.state.science.particles || [];
    particles.forEach((b, idx) => {
      if (idx < bubbleRate * 2) {
        b.y -= b.vy;
        b.x += Math.sin(step * 0.1 + idx) * 0.6;
        if (b.y < tY + 25) {
          b.y = tY + tH - 40;
          b.x = tX + (Math.random() - 0.5) * 16;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // 우측 상태 대시보드
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(470, 80, 200, 160);
    ctx.strokeStyle = isEnzymeDenatured ? '#ef4444' : '#10b981';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(470, 80, 200, 160);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px Pretendard';
    ctx.fillText('🥪 광합성 팩토리 계측기', 485, 105);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '12px Pretendard';
    ctx.fillText(`• CO₂ 농도: ${co2 === 1 ? '희박' : co2 === 2 ? '적정' : '풍부'}`, 485, 130);
    ctx.fillText(`• 시험관 온도: ${temp}°C`, 485, 155);

    if (isEnzymeDenatured) {
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px Pretendard';
      ctx.fillText('🔥 45°C 초과 효소 변성!', 485, 190);
      ctx.fillText('산소 기포 발생 중단 (0개)', 485, 215);
    } else {
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 12px Pretendard';
      ctx.fillText(`🫧 산소 기포: 분당 ${bubbleRate * 6}개`, 485, 190);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Pretendard';
      ctx.fillText('포도당 합성 활발히 진행 중', 485, 215);
    }
  },

  // 4. 판 구조론 시뮬레이터 캔버스 렌더러
  drawPlateTectonicsSimulation(ctx, canvas, step) {
    const params = this.state.science.simParams;
    const isDivergent = (params.boundaryType === 1);
    const heat = params.mantleHeat || 2;

    const midX = 350;
    const crustY = 140;

    // 하부 맨틀 (Mantle) 영역
    const mantleGrad = ctx.createLinearGradient(0, crustY, 0, 320);
    mantleGrad.addColorStop(0, '#7f1d1d');
    mantleGrad.addColorStop(0.5, '#b91c1c');
    mantleGrad.addColorStop(1, '#ea580c');
    ctx.fillStyle = mantleGrad;
    ctx.fillRect(50, crustY, 600, 180);

    // 맨틀 대류 화살표 애니메이션
    ctx.strokeStyle = '#fdba74';
    ctx.lineWidth = 3;
    const arrowOffset = (step * (heat * 0.8)) % 80;

    if (isDivergent) {
      // 발산 경계: 중심에서 상승하여 좌우로 벌어짐
      // 좌측 회전 대류
      ctx.beginPath();
      ctx.arc(midX - 100, crustY + 90, 50, Math.PI * 0.2, Math.PI * 1.8);
      ctx.stroke();
      // 우측 회전 대류
      ctx.beginPath();
      ctx.arc(midX + 100, crustY + 90, 50, -Math.PI * 0.8, Math.PI * 0.8);
      ctx.stroke();

      // 지각 판 2개 (좌/우로 벌어짐)
      const gap = 35 + Math.sin(step * 0.05) * 8;
      // 좌측 해양판
      ctx.fillStyle = '#475569';
      ctx.fillRect(60, crustY - 25, midX - gap - 60, 30);
      // 우측 해양판
      ctx.fillStyle = '#475569';
      ctx.fillRect(midX + gap, crustY - 25, 640 - (midX + gap), 30);

      // 중심 해령 마그마 분출
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(midX - gap, crustY - 10);
      ctx.lineTo(midX, crustY - 45 - Math.sin(step * 0.2) * 6);
      ctx.lineTo(midX + gap, crustY - 10);
      ctx.fill();

      // 레이블
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 13px Pretendard';
      ctx.fillText('🌋 발산형 경계: 대서양 중앙 해령 (새로운 해양 지각 생성)', 180, 50);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '12px Pretendard';
      ctx.fillText('◀ 판 이동 (좌)', midX - 160, crustY - 35);
      ctx.fillText('판 이동 (우) ▶', midX + 80, crustY - 35);
    } else {
      // 수렴 경계: 양쪽에서 밀려와 충돌 후 솟아오름
      const colDepth = Math.sin(step * 0.05) * 5;
      // 좌측 대륙판
      ctx.fillStyle = '#64748b';
      ctx.fillRect(60, crustY - 35, midX - 70 + colDepth, 40);
      // 우측 대륙판
      ctx.fillStyle = '#64748b';
      ctx.fillRect(midX + 70 - colDepth, crustY - 35, 640 - (midX + 70 - colDepth), 40);

      // 중앙 솟구치는 습곡 산맥 (히말라야)
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(midX - 75, crustY + 5);
      ctx.lineTo(midX - 35, crustY - 50);
      ctx.lineTo(midX, crustY - 80 - Math.abs(colDepth));
      ctx.lineTo(midX + 35, crustY - 55);
      ctx.lineTo(midX + 75, crustY + 5);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 산꼭대기 눈덮인 봉우리
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(midX - 15, crustY - 60);
      ctx.lineTo(midX, crustY - 80 - Math.abs(colDepth));
      ctx.lineTo(midX + 15, crustY - 65);
      ctx.fill();

      // 레이블
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 13px Pretendard';
      ctx.fillText('🏔️ 수렴형 경계: 히말라야 산맥 (대륙 충돌 및 지층 습곡 융기)', 175, 40);
      ctx.fillStyle = '#f87171';
      ctx.font = '12px Pretendard';
      ctx.fillText('판 충돌 ▶', midX - 140, crustY - 45);
      ctx.fillText('◀ 판 충돌', midX + 70, crustY - 45);
    }

    // 하단 된장찌개 비유 안내
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(80, 260, 540, 36);
    ctx.fillStyle = '#fed7aa';
    ctx.font = '12px Pretendard';
    ctx.fillText('🍲 된장찌개 비유: 끓어오르는 국물(맨틀) 위에 떠 있는 단단한 두부(지각 판)의 이동', 95, 283);
  },

  // 5. 기본 게이지 시뮬레이터 (기타 단원용)
  drawDefaultScienceSimulation(ctx, canvas, step) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(50, 50, 600, 240);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px Pretendard';
    ctx.fillText('🔬 인터랙티브 과학 탐구 모듈 작동 중', 210, 160);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px Pretendard';
    ctx.fillText('아래 변인 통제 슬라이더를 조작하여 실험 데이터를 기록표에 수집해보세요!', 140, 190);
  },

  renderScience() {
    const root = document.getElementById('appRoot');
    const science = this.state.science;
    const curUnit = science.currentUnit;
    const filteredUnits = this.getFilteredScienceUnits();
    const activeQuiz = (curUnit?.quizzes || [])[science.activeQuizIndex] || (curUnit?.quizzes || [])[0];

    root.innerHTML = `
      <div class="space-y-6 pb-12 font-sans text-slate-100">

        <!-- 최상단 헤더 배너 (Cyber Science Dark) -->
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div class="absolute -right-8 -bottom-10 opacity-10 text-9xl font-black select-none pointer-events-none text-cyan-400">
            ⚛︎⚗︎🧬
          </div>

          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-xs font-black text-cyan-300">
                <span>🔬 AI 사이언스 랩</span>
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>중학 4대 과학 가상실험 공작소</span>
              </div>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                탈(脫)공식화! <span class="text-cyan-400">일상 비유</span>와 <span class="text-amber-400">가상실험</span>으로 깨우치는 중학 과학
              </h1>
              <p class="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                🌊 워터파크 슬라이드 ➔ 🚌 만원 버스 ➔ 🥪 샌드위치 빵집 ➔ 🍲 된장찌개 두부 모델로 개념을 직관적으로 탐구하세요!
              </p>
            </div>

            <!-- 우측 진행 현황 뱃지 -->
            <div class="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60 text-right min-w-[200px]">
              <div class="text-xs text-slate-400 font-bold mb-1">단원 마스터 진행률</div>
              <div class="text-xl font-black text-cyan-400">${science.masteredCount || 0} / ${science.totalUnits || 8} 단원 (${science.progressPercent || 0}%)</div>
              <div class="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-cyan-400 to-emerald-400" style="width: ${science.progressPercent || 0}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 영역(과목) 및 학년 필터 바 -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-md">
          <!-- 4대 영역 탭 -->
          <div class="flex flex-wrap items-center gap-1.5">
            ${[
              { id: 'all', label: '전체 영역 🌐' },
              { id: 'physics', label: '물리 ⚡', color: 'hover:border-cyan-400' },
              { id: 'chemistry', label: '화학 🧪', color: 'hover:border-amber-400' },
              { id: 'biology', label: '생명 🌿', color: 'hover:border-emerald-400' },
              { id: 'earth', label: '지구 🌍', color: 'hover:border-orange-400' }
            ].map(d => `
              <button onclick="app.selectScienceDomain('${d.id}')" class="px-3.5 py-2 rounded-xl text-xs font-black transition ${
                science.selectedDomain === d.id
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }">
                ${d.label}
              </button>
            `).join('')}
          </div>

          <!-- 학년 칩 -->
          <div class="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl">
            ${['all', 1, 2, 3].map(g => `
              <button onclick="app.selectScienceGrade('${g}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                String(science.selectedGrade) === String(g)
                  ? 'bg-slate-700 text-cyan-300 font-black shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }">
                ${g === 'all' ? '전체 학년' : `중${g}`}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 단원 셀렉터 가로 스크롤 카드 리스트 -->
        <div class="flex items-center gap-2.5 overflow-x-auto pb-2">
          ${filteredUnits.map(u => {
            const isActive = (u.id === science.selectedUnitId);
            return `
              <button onclick="app.selectScienceUnit('${u.id}')" class="flex-shrink-0 text-left p-3.5 rounded-2xl border transition min-w-[220px] max-w-[260px] ${
                isActive
                  ? 'bg-slate-800 border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/60'
              }">
                <div class="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span class="px-2 py-0.5 rounded-md text-white" style="background-color: ${u.domainColor}20; color: ${u.domainColor}">
                    ${u.domainLabel} · 중${u.grade}
                  </span>
                  ${u.isMastered ? '<span class="text-emerald-400 font-black">✅ 마스터</span>' : '<span class="text-slate-500">⏳ 탐구중</span>'}
                </div>
                <div class="text-xs sm:text-sm font-extrabold text-white truncate">${u.unitName}</div>
                <div class="text-[11px] text-slate-400 truncate mt-0.5">${u.metaphorTitle || ''}</div>
              </button>
            `;
          }).join('')}
        </div>

        ${!curUnit ? `
          <div class="bg-slate-900 p-12 text-center rounded-2xl border border-slate-800">
            <p class="text-sm text-slate-400 font-bold">선택된 탐구 단원을 불러오는 중입니다...</p>
          </div>
        ` : `
          <!-- 메인 2단 반응형 스테이지 (가로 65% / 35%) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            <!-- 좌측 및 중앙: 가상실험실 + 변인통제 실험대 + 퀴즈 (65%) -->
            <div class="lg:col-span-8 space-y-6">

              <!-- 1. 단원 및 일상 비유 모델 카드 -->
              <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-3">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">🌊</span>
                    <h2 class="text-base sm:text-lg font-black text-white">${curUnit.unitName}</h2>
                  </div>
                  <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/30">
                    ${curUnit.domainLabel} (중${curUnit.grade})
                  </span>
                </div>

                <!-- 비유 매핑 카드 -->
                <div class="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2.5">
                  <div class="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <span>💡 [일상 비유 모델]:</span>
                    <span>${curUnit.metaphor?.title}</span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    ${curUnit.metaphor?.description}
                  </p>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                    ${(curUnit.metaphor?.mapping || []).map(m => `
                      <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <div class="font-bold text-cyan-300 mb-0.5">${m.term}</div>
                        <div class="text-[11px] text-slate-400">${m.role}</div>
                      </div>
                    `).join('')}
                  </div>

                  <div class="text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
                    ✨ ${curUnit.metaphor?.takeaway}
                  </div>
                </div>
              </div>

              <!-- 2. 실시간 인터랙티브 시뮬레이터 (Canvas 2D) -->
              <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-slate-300 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <span>실시간 물리 시뮬레이션 캔버스 (60 FPS)</span>
                  </span>

                  <!-- 옴의 법칙인 경우 스위치 토글 버튼 노출 -->
                  ${curUnit.simulationType === 'ohm_circuit' ? `
                    <button onclick="app.toggleCircuitSwitch()" class="px-3 py-1.5 rounded-xl font-black text-xs transition flex items-center gap-1.5 ${
                      science.circuitSwitchOn ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md' : 'bg-rose-700 hover:bg-rose-600 text-white'
                    }">
                      <span>⚡ 스위치:</span>
                      <span>${science.circuitSwitchOn ? 'ON (전류 흐름)' : 'OFF (차단)'}</span>
                    </button>
                  ` : ''}
                </div>

                <div class="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                  <canvas id="scienceSimCanvas" width="700" height="340" class="w-full block"></canvas>
                </div>
              </div>

              <!-- 3. 변인 통제 가상 실험대 (Fair Test Lab) -->
              <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">🛡️</span>
                    <h3 class="text-sm sm:text-base font-black text-cyan-300">변인 통제 가상 실험대 (Fair Test Lab)</h3>
                  </div>
                  <span class="text-xs text-slate-400 font-medium">조작변인 vs 통제변인 실습</span>
                </div>

                <!-- 탐구 미션 안내 바 -->
                <div class="bg-cyan-950/40 border border-cyan-500/30 p-3 rounded-xl text-xs space-y-1">
                  <div class="font-extrabold text-cyan-300">🎯 [오늘의 탐구 미션]:</div>
                  <p class="text-slate-300 font-medium">${curUnit.fairTestGuide?.mission || '변인을 조절하고 결과를 기록하세요.'}</p>
                </div>

                <!-- 슬라이더 컨트롤 패널 -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  ${(curUnit.controls || []).map(ctrl => {
                    const val = science.simParams[ctrl.id] !== undefined ? science.simParams[ctrl.id] : ctrl.defaultVal;
                    const isLocked = Boolean(science.paramLocks[ctrl.id]);
                    return `
                      <div class="bg-slate-950/80 p-4 rounded-xl border ${isLocked ? 'border-amber-500/50 bg-amber-950/10' : 'border-slate-800'} space-y-2">
                        <div class="flex items-center justify-between text-xs">
                          <span class="font-extrabold text-white">${ctrl.label}</span>
                          <button onclick="app.toggleParamLock('${ctrl.id}')" class="px-2 py-0.5 rounded text-[11px] font-bold transition ${
                            isLocked
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }">
                            ${isLocked ? '🔒 고정됨' : '🔓 고정하기'}
                          </button>
                        </div>

                        <div class="flex items-center gap-3">
                          <input type="range"
                            min="${ctrl.min}" max="${ctrl.max}" step="${ctrl.step || 1}" value="${val}"
                            ${isLocked ? 'disabled' : ''}
                            oninput="app.updateSimParam('${ctrl.id}', this.value)"
                            class="flex-1 accent-cyan-400 cursor-pointer ${isLocked ? 'opacity-40 cursor-not-allowed' : ''}" />
                          <span class="text-xs font-black text-cyan-400 w-14 text-right">
                            <span id="simVal_${ctrl.id}">${val}</span> ${ctrl.unit}
                          </span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>

                <!-- 실험값 기록 버튼 -->
                <div class="flex items-center justify-between pt-1">
                  <span class="text-xs text-slate-400">💡 변인을 변경한 후 기록 버튼을 눌러 표에 누적하세요.</span>
                  <button onclick="app.logScienceExperiment()" class="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm shadow-lg transition flex items-center gap-1.5">
                    <span>📋</span>
                    <span>현재 관찰값 기록하기</span>
                  </button>
                </div>

                <!-- 관찰 데이터 기록표 (Table) -->
                <div class="space-y-2 pt-2">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-slate-300">📊 나의 탐구 관찰 기록표 (누적 ${science.unitLogs.length}건):</span>
                  </div>

                  <div class="overflow-x-auto rounded-xl border border-slate-800">
                    <table class="w-full text-left text-xs">
                      <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th class="p-3">순번</th>
                          <th class="p-3">기록 일시</th>
                          <th class="p-3">실험 조건 (조작/통제)</th>
                          <th class="p-3">관찰 결과 (종속변인)</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800 bg-slate-900/60">
                        ${science.unitLogs.length === 0 ? `
                          <tr>
                            <td colspan="4" class="p-4 text-center text-slate-500">아직 저장된 관찰 기록이 없습니다. 위에서 실험값을 기록해보세요!</td>
                          </tr>
                        ` : science.unitLogs.slice(0, 5).map((log, idx) => `
                          <tr class="hover:bg-slate-800/40">
                            <td class="p-3 font-bold text-slate-400">${idx + 1}</td>
                            <td class="p-3 text-slate-400">${log.date || '오늘'}</td>
                            <td class="p-3 text-cyan-300 font-mono">${JSON.stringify(log.params || {}).replace(/[{"}]/g, '').replace(/,/g, ', ')}</td>
                            <td class="p-3 font-bold text-emerald-400">${log.resultText}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- 4. 단원 핵심 탐구 퀴즈 카드 -->
              <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">📝</span>
                    <h3 class="text-sm sm:text-base font-black text-white">단원 핵심 탐구 퀴즈</h3>
                  </div>

                  <!-- 퀴즈 번호 칩 -->
                  <div class="flex items-center gap-1">
                    ${(curUnit.quizzes || []).map((q, idx) => `
                      <button onclick="app.selectQuizQuestion(${idx})" class="w-7 h-7 rounded-lg text-xs font-black transition ${
                        science.activeQuizIndex === idx
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }">
                        Q${idx + 1}
                      </button>
                    `).join('')}
                  </div>
                </div>

                ${activeQuiz ? `
                  <div class="space-y-3">
                    <p class="text-xs sm:text-sm font-extrabold text-white leading-relaxed">
                      ${activeQuiz.question}
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      ${(activeQuiz.options || []).map((opt, idx) => {
                        const isSelected = (science.selectedQuizOption === idx);
                        const isDone = Boolean(science.quizAnswerResult);
                        const isCorrect = (idx === activeQuiz.correctAnswer);

                        let btnClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';
                        if (isDone) {
                          if (isCorrect) btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                          else if (isSelected && !isCorrect) btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                        }

                        return `
                          <button onclick="app.submitScienceQuiz('${activeQuiz.id}', ${idx})" class="w-full text-left p-3.5 rounded-xl border text-xs font-bold transition flex items-center justify-between gap-2 ${btnClass}">
                            <span>${opt}</span>
                            ${isDone && isCorrect ? '<span class="text-emerald-400">✓ 정답</span>' : ''}
                          </button>
                        `;
                      }).join('')}
                    </div>

                    ${science.quizAnswerResult ? `
                      <div class="p-3.5 rounded-xl text-xs font-medium ${
                        science.quizAnswerResult.isCorrect ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200' : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                      }">
                        <div class="font-black mb-1">${science.quizAnswerResult.isCorrect ? '🎉 정답입니다!' : '🤔 아쉽네요! 다시 생각해볼까요?'}</div>
                        <div>${science.quizAnswerResult.explanation}</div>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- 우측: 소크라테스 AI 탐정 코치 (35%) -->
            <div class="lg:col-span-4 space-y-4">
              <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">🕵️‍♂️</span>
                    <span class="text-xs sm:text-sm font-black text-cyan-300">소크라테스 AI 과학 탐정</span>
                  </div>
                  <span class="text-[11px] text-slate-400 font-bold">1:1 유도 발문 코치</span>
                </div>

                <!-- 퀵 추천 질문 칩 (ai_Science.md) -->
                <div class="space-y-1.5">
                  <span class="text-[11px] text-slate-400 font-semibold">⚡ 빠른 탐구 질문 칩:</span>
                  <div class="flex flex-col gap-1.5">
                    ${(curUnit.socraticCoach?.quickChips || [
                      { label: "💡 비유로 더 쉽게 설명해줘!", query: "analogy" },
                      { label: "🧪 변인을 바꾸면 어떻게 돼?", query: "variable_resistance" },
                      { label: "📝 1초 핵심 퀴즈 내줘!", query: "quiz" }
                    ]).map(chip => `
                      <button onclick="app.sendScienceCoachQuery('${chip.query}')" class="text-left px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-cyan-300 transition">
                        ${chip.label}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- 대화창 로그 -->
                <div id="scienceCoachChatBox" class="h-64 overflow-y-auto space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs">
                  ${science.coachChatLog.map(msg => `
                    <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}">
                      <span class="text-[10px] text-slate-500 mb-0.5">${msg.sender === 'user' ? '나의 질문' : 'AI 과학 탐정'}</span>
                      <div class="max-w-[85%] p-3 rounded-xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-cyan-600 text-white rounded-tr-none'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none font-medium'
                      }">
                        ${msg.text}
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- 질문 입력창 -->
                <div class="flex items-center gap-2">
                  <input type="text" id="coachCustomInput"
                    placeholder="과학 질문을 입력하세요..."
                    onkeydown="if(event.key==='Enter') app.submitCustomCoachMessage()"
                    class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500" />
                  <button onclick="app.submitCustomCoachMessage()" class="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white font-bold text-xs shadow-md transition">
                    전송
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 하단: 흔한 오개념 타파 클리닉 (3D Misconception Buster Flip Card) -->
          <div class="mt-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">💥</span>
                <h3 class="text-sm sm:text-base font-black text-amber-300">흔한 오개념 타파 클리닉 (Misconception Buster)</h3>
              </div>
              <span class="text-xs text-slate-400 font-semibold">카드를 클릭하여 3D 회전 🔄</span>
            </div>

            <!-- 3D 플립 카드 컨테이너 -->
            <div onclick="app.toggleFlipCard()" class="cursor-pointer select-none" style="perspective: 1000px;">
              <div id="misconceptionCardInner" class="relative w-full min-h-[140px] rounded-2xl transition-transform duration-500 shadow-lg" style="transform-style: preserve-3d;">

                <!-- 앞면 (오개념 질문) -->
                <div class="w-full h-full p-6 rounded-2xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-950 border border-rose-500/40 flex flex-col justify-between" style="backface-visibility: hidden;">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-rose-400">❌ 많은 학생들이 착각하는 흔한 오개념</span>
                    <span class="text-[11px] text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded-full">클릭해서 팩트 확인 ➔</span>
                  </div>
                  <div class="text-base sm:text-lg font-black text-white my-2">
                    "${curUnit.misconception?.question || '전구에 불이 켜지면 전자가 사라질까요?'}"
                  </div>
                  <div class="text-[11px] text-slate-400">💡 상식과 실제 과학적 사실의 차이를 알아보세요.</div>
                </div>

                <!-- 뒷면 (과학적 팩트 해설) -->
                <div class="absolute inset-0 w-full h-full p-6 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-950 border border-emerald-500/40 flex flex-col justify-between" style="backface-visibility: hidden; transform: rotateY(180deg);">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-emerald-400">⭕ 올바른 과학적 팩트 (Scientific Truth)</span>
                    <span class="text-[11px] text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded-full">다시 클릭하여 닫기 🔄</span>
                  </div>
                  <div class="text-sm sm:text-base font-extrabold text-emerald-200 my-1 leading-relaxed">
                    ${curUnit.misconception?.answer || ''}
                  </div>
                  <div class="text-xs text-slate-300 leading-relaxed font-medium">
                    ${curUnit.misconception?.detail || ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  app.init();
});



