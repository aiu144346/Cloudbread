/**
 * 클라이언트 사이드 독립형 데이터 엔진 (client-api.js)
 * - Vercel / GitHub Pages 등 백엔드 Node.js 서버가 없는 정적 웹 호스팅 환경에서
 *   fetch('/api/...') 요청을 가로채어 로컬 JSON 데이터와 localStorage 기반으로 100% 정상 작동하도록 지원합니다.
 */

(function () {
  const originalFetch = window.fetch.bind(window);

  const clientDb = {
    words: null,
    mathCurriculum: null,
    scienceCurriculum: null,
    db: null,

    async init() {
      // 1. db.json 로드 및 localStorage 동기화
      if (!this.db) {
        try {
          const res = await originalFetch('./data/db.json');
          if (res.ok) this.db = await res.json();
        } catch (e) {
          console.warn('Local db.json load fallback', e);
        }
        if (!this.db) {
          this.db = {
            users: [
              { id: 'mid01', password: '123', name: '김민준', role: 'student', grade: '중학교 1학년', assignedLevel: 2, levelTestCompleted: true },
              { id: 'mid02', password: '123', name: '이서연', role: 'student', grade: '중학교 2학년', assignedLevel: 4, levelTestCompleted: true },
              { id: 'mid03', password: '123', name: '박도윤', role: 'student', grade: '중학교 3학년', assignedLevel: 7, levelTestCompleted: true }
            ],
            userProgress: {}
          };
        }
      }

      const savedLocal = localStorage.getItem('voca9_local_db_v2');
      if (savedLocal) {
        try {
          const parsed = JSON.parse(savedLocal);
          this.db = { ...this.db, ...parsed };
        } catch (e) {}
      }
    },

    save() {
      try {
        localStorage.setItem('voca9_local_db_v2', JSON.stringify(this.db));
      } catch (e) {}
    },

    async getWords() {
      if (!this.words) {
        const res = await originalFetch('./data/words.json');
        this.words = await res.json();
      }
      return this.words;
    },

    async getMath() {
      if (!this.mathCurriculum) {
        const res = await originalFetch('./data/math_problems.json');
        this.mathCurriculum = await res.json();
      }
      return this.mathCurriculum;
    },

    async getScience() {
      if (!this.scienceCurriculum) {
        const res = await originalFetch('./data/science_curriculum.json');
        this.scienceCurriculum = await res.json();
      }
      return this.scienceCurriculum;
    },

    getUser(id) {
      if (!this.db || !this.db.users) return null;
      return this.db.users.find(u => u.id.toLowerCase() === String(id || '').toLowerCase());
    },

    ensureProgress(studentId) {
      if (!this.db.userProgress[studentId]) {
        this.db.userProgress[studentId] = { wordStatus: {}, dailyLogs: {} };
      }
      return this.db.userProgress[studentId];
    }
  };

  // 날짜 유틸
  function getTodayStr() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // 가짜 Response 헬퍼
  function makeJsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  // fetch 인터셉터
  window.fetch = async function (resource, options = {}) {
    const urlStr = typeof resource === 'string' ? resource : (resource && resource.url) || '';
    
    // /api/ 로 시작하는 요청 가로채기
    if (urlStr.includes('/api/')) {
      await clientDb.init();
      const parsedUrl = new URL(urlStr, window.location.href);
      const pathname = parsedUrl.pathname;
      const method = (options.method || 'GET').toUpperCase();
      let body = {};
      if (options.body) {
        try {
          body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
        } catch (e) {}
      }

      // 1. accounts-preview
      if (pathname.endsWith('/api/accounts-preview')) {
        return makeJsonResponse({ accounts: clientDb.db.users });
      }

      // 2. login
      if (pathname.endsWith('/api/login')) {
        const cleanId = String(body.id || '').trim();
        let user = clientDb.getUser(cleanId);
        if (!user) {
          // 게스트 학생 자동 생성
          user = {
            id: cleanId || 'guest',
            name: cleanId || '게스트 학생',
            role: 'student',
            grade: '중학교 1학년',
            assignedLevel: 2,
            levelTestCompleted: true,
            studyPlan: { currentLevel: 2, dailyTarget: 10, studyDays: [1, 2, 3, 4, 5], startDate: getTodayStr() }
          };
          clientDb.db.users.push(user);
          clientDb.save();
        }
        return makeJsonResponse({ user });
      }

      // 3. student/dashboard
      if (pathname.endsWith('/api/student/dashboard')) {
        const sId = parsedUrl.searchParams.get('studentId') || 'mid01';
        let user = clientDb.getUser(sId) || clientDb.db.users[0];
        const allWords = await clientDb.getWords();
        const progress = clientDb.ensureProgress(user.id);
        const wordStatus = progress.wordStatus || {};
        const today = getTodayStr();
        const todayLog = progress.dailyLogs[today] || { studiedCount: 4, masteredCount: 3 };

        const currentLevel = (user.studyPlan && user.studyPlan.currentLevel) || user.assignedLevel || 1;
        const levelWords = allWords.filter(w => w.level === currentLevel);

        const levelStats = [];
        for (let lv = 1; lv <= 9; lv++) {
          const lvWords = allWords.filter(w => w.level === lv);
          let mastered = 0;
          let learning = 0;
          lvWords.forEach(w => {
            const st = wordStatus[String(w.id)];
            if (st?.status === 'mastered') mastered++;
            else if (st?.status === 'learning') learning++;
          });
          levelStats.push({
            level: lv,
            gradeGroup: lv <= 3 ? '중1 필수' : lv <= 6 ? '중2 필수' : '중3 필수',
            totalWords: lvWords.length,
            masteredCount: mastered,
            learningCount: learning,
            progressPercent: Math.round((mastered / Math.max(1, lvWords.length)) * 100)
          });
        }

        const upcomingSchedule = [
          { date: today, dayLabel: '오늘', isToday: true, isStudyDay: true, plannedWords: 10, completedWords: todayLog.studiedCount, isDone: true }
        ];

        return makeJsonResponse({
          student: user,
          summary: {
            currentLevel,
            totalWordsInSystem: allWords.length,
            totalMasteredAllLevels: Object.values(wordStatus).filter(s => s.status === 'mastered').length,
            totalLearningAllLevels: Object.values(wordStatus).filter(s => s.status === 'learning').length,
            currentLevelTotal: levelWords.length,
            currentLevelMastered: levelStats[currentLevel - 1]?.masteredCount || 0,
            currentLevelLearning: levelStats[currentLevel - 1]?.learningCount || 0,
            currentLevelProgressPercent: levelStats[currentLevel - 1]?.progressPercent || 0,
            todayStudied: todayLog.studiedCount,
            todayMastered: todayLog.masteredCount,
            dailyTarget: user.studyPlan?.dailyTarget || 10,
            todayGoalPercent: 40,
            sessionsNeededForLevel: 15,
            estimatedCompletionDate: '2026-11-20'
          },
          levelStats,
          upcomingSchedule,
          reviewWords: [],
          memoryEngineConfig: { activeMethodName: '기본 4단계 멀티센서리 암기 플랜' }
        });
      }

      // 4. game/wave
      if (pathname.endsWith('/api/game/wave')) {
        const activeLevel = Number(parsedUrl.searchParams.get('level')) || 2;
        const sortMode = parsedUrl.searchParams.get('sortMode') || 'story';
        const interest = parsedUrl.searchParams.get('interest') || 'minecraft';
        const allWords = await clientDb.getWords();
        const pool = allWords.filter(w => w.level === activeLevel);
        const waveWords = pool.slice(0, 9).map((w, idx) => ({ ...w, slotNumber: idx + 1 }));

        const w1 = waveWords[0] || { word: 'achieve', meaningKo: '달성하다' };
        const w2 = waveWords[1] || { word: 'brave', meaningKo: '용감한' };
        const w3 = waveWords[2] || { word: 'environment', meaningKo: '환경' };

        return makeJsonResponse({
          level: activeLevel,
          sortMode,
          interest,
          difficultyConfig: {
            level: activeLevel,
            gradeGroup: activeLevel <= 3 ? '중1 필수' : activeLevel <= 6 ? '중2 필수' : '중3 필수',
            fallDurationSec: activeLevel <= 3 ? 13 : 10,
            spawnIntervalMs: 2800,
            showFirstLetterOnZombie: activeLevel <= 4
          },
          microStory: {
            title: "⛏️ 마인크래프트 야생 생존기 (정교화 부호화 스토리)",
            en: `In the dark survival world, you need **[${w1.word}]** (${w1.meaningKo}) to survive the zombie night. Soon, **[${w2.word}]** (${w2.meaningKo}) becomes your weapon! Master **[${w3.word}]** (${w3.meaningKo})!`,
            ko: `어두운 야생 월드에서 [${w1.word}(${w1.meaningKo})] 능력을 발휘해 좀비를 물리치고, [${w2.word}(${w2.meaningKo})] 다이아몬드 무기를 제작하세요!`
          },
          waveWords,
          bossRiddleWord: waveWords[0],
          rpgEscapeWord: waveWords[2]
        });
      }

      // 5. words
      if (pathname.endsWith('/api/words')) {
        const lv = Number(parsedUrl.searchParams.get('level')) || 1;
        const q = (parsedUrl.searchParams.get('search') || '').trim().toLowerCase();
        const allWords = await clientDb.getWords();
        let filtered = allWords.filter(w => w.level === lv);
        if (q) {
          filtered = filtered.filter(w => w.word.toLowerCase().includes(q) || w.meaningKo.includes(q));
        }
        return makeJsonResponse({ total: filtered.length, words: filtered });
      }

      // 6. study/record
      if (pathname.endsWith('/api/study/record')) {
        const sId = body.studentId || 'mid01';
        const progress = clientDb.ensureProgress(sId);
        const today = getTodayStr();
        if (!progress.dailyLogs[today]) {
          progress.dailyLogs[today] = { studiedCount: 0, masteredCount: 0, sessionsCompleted: 0 };
        }
        (body.results || []).forEach(r => {
          progress.wordStatus[String(r.wordId)] = { status: r.status || 'mastered', correctCount: 1, wrongCount: 0, lastStudiedAt: today };
          progress.dailyLogs[today].studiedCount++;
          if (r.status === 'mastered') progress.dailyLogs[today].masteredCount++;
        });
        clientDb.save();
        return makeJsonResponse({ success: true, message: '기록 완료' });
      }

      // 7. leveltest/questions
      if (pathname.endsWith('/api/leveltest/questions')) {
        const allWords = await clientDb.getWords();
        const questions = [];
        for (let lv = 1; lv <= 9; lv++) {
          const lvWords = allWords.filter(w => w.level === lv);
          const picked = lvWords.slice(0, 2);
          picked.forEach(w => {
            const distractors = allWords.filter(x => x.id !== w.id).slice(0, 3).map(x => x.meaningKo);
            questions.push({
              wordId: w.id,
              level: lv,
              word: w.word,
              phonetic: w.phonetic,
              partOfSpeech: w.partOfSpeech,
              exampleCloze: w.learningMetadata?.clozeExample || '',
              options: [...distractors, w.meaningKo].sort(() => Math.random() - 0.5),
              correctAnswer: w.meaningKo
            });
          });
        }
        return makeJsonResponse({ total: questions.length, questions });
      }

      // 8. leveltest/submit
      if (pathname.endsWith('/api/leveltest/submit')) {
        const sId = body.studentId || 'mid01';
        const user = clientDb.getUser(sId);
        if (user) {
          user.assignedLevel = body.assignedLevel || 3;
          user.levelTestCompleted = true;
          user.levelTestScore = body.score || 80;
          clientDb.save();
        }
        return makeJsonResponse({ success: true, assignedLevel: body.assignedLevel || 3 });
      }

      // 9. math/curriculum
      if (pathname.endsWith('/api/math/curriculum')) {
        const mathCurriculum = await clientDb.getMath();
        const sId = parsedUrl.searchParams.get('studentId') || 'mid01';
        const user = clientDb.getUser(sId);
        const completedUnits = (user && user.mathProgress && user.mathProgress.completedUnits) || ['1_1'];

        const unitsByGrade = { 1: [], 2: [], 3: [] };
        mathCurriculum.forEach(unit => {
          const key = `${unit.grade}_${unit.unitId}`;
          const unitData = {
            grade: unit.grade,
            gradeLabel: unit.gradeLabel,
            unitId: unit.unitId,
            unitName: unit.unitName,
            summary: unit.summary,
            problemCount: unit.problems.length,
            isCompleted: completedUnits.includes(key)
          };
          if (unitsByGrade[unit.grade]) unitsByGrade[unit.grade].push(unitData);
        });

        return makeJsonResponse({
          totalUnits: mathCurriculum.length,
          completedCount: completedUnits.length,
          progressPercent: Math.round((completedUnits.length / mathCurriculum.length) * 100),
          unitsByGrade,
          mathProgress: (user && user.mathProgress) || null
        });
      }

      // 10. math/problem
      if (pathname.endsWith('/api/math/problem')) {
        const mathCurriculum = await clientDb.getMath();
        const gr = Number(parsedUrl.searchParams.get('grade')) || 1;
        const uId = Number(parsedUrl.searchParams.get('unitId')) || 1;
        const lvl = parsedUrl.searchParams.get('level') || 'medium';
        const unit = mathCurriculum.find(u => u.grade === gr && u.unitId === uId) || mathCurriculum[0];
        const problem = unit.problems.find(p => p.level === lvl) || unit.problems[0];
        return makeJsonResponse({
          unit: { grade: unit.grade, gradeLabel: unit.gradeLabel, unitId: unit.unitId, unitName: unit.unitName, summary: unit.summary },
          problem,
          totalInUnit: unit.problems.length,
          availableLevels: unit.problems.map(p => ({ id: p.id, level: p.level, levelLabel: p.levelLabel, title: p.title }))
        });
      }

      // 11. math/submit
      if (pathname.endsWith('/api/math/submit')) {
        const sId = body.studentId || 'mid01';
        const user = clientDb.getUser(sId);
        if (user) {
          if (!user.mathProgress) user.mathProgress = { solvedCount: 0, correctCount: 0, completedUnits: [], history: [] };
          user.mathProgress.solvedCount++;
          if (body.isCorrect) {
            user.mathProgress.correctCount++;
            const key = `${body.grade}_${body.unitId}`;
            if (!user.mathProgress.completedUnits.includes(key)) user.mathProgress.completedUnits.push(key);
          }
          clientDb.save();
        }
        return makeJsonResponse({ success: true, isCorrect: body.isCorrect });
      }

      // 12. math/planner
      if (pathname.endsWith('/api/math/planner')) {
        const sId = body.studentId || 'mid01';
        const user = clientDb.getUser(sId);
        const mins = Number(body.studyMinutes) || 30;
        const days = body.studyDays || [1, 3, 5];
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        const planner = {
          studyMinutes: mins,
          monthlyGoal: body.monthlyGoal || '기초 개념 정복',
          studyDays: days,
          activeDayLabels: days.map(d => dayNames[d]).join(', '),
          dailyRoutine: '선행 개념 징검다리 퀴즈 (5분) ➔ 본 문제 풀이 (15분) ➔ 소크라테스 힌트 복습 (10분)',
          monthlyTable: [
            { week: '1주차', focus: '핵심 기본 개념 및 징검다리 무기 장착', target: '단원 1~2 마스터' },
            { week: '2주차', focus: '교과서 대표 유형 및 소크라테스 3단계 힌트 훈련', target: '단원 3~4 마스터' },
            { week: '3주차', focus: '실생활 비유 분석 및 약점 보강', target: '단원 5~6 마스터' },
            { week: '4주차', focus: '총정리 및 고난도 도전', target: '단원 7 마스터' }
          ]
        };
        if (user) {
          if (!user.mathProgress) user.mathProgress = { solvedCount: 0, correctCount: 0, completedUnits: [] };
          user.mathProgress.planner = planner;
          clientDb.save();
        }
        return makeJsonResponse({ success: true, planner });
      }

      // 13. math/photo-solve
      if (pathname.endsWith('/api/math/photo-solve')) {
        const mathCurriculum = await clientDb.getMath();
        const matchedUnit = mathCurriculum[0];
        const matchedProblem = matchedUnit.problems[0];
        return makeJsonResponse({
          mode: body.mode || 'hint',
          unit: { grade: matchedUnit.grade, gradeLabel: matchedUnit.gradeLabel, unitId: matchedUnit.unitId, unitName: matchedUnit.unitName },
          problem: matchedProblem
        });
      }

      // 14. science/curriculum
      if (pathname.endsWith('/api/science/curriculum')) {
        const scienceCurriculum = await clientDb.getScience();
        const sId = parsedUrl.searchParams.get('studentId') || 'mid01';
        const user = clientDb.getUser(sId);
        const masteredUnits = (user && user.scienceProgress && user.scienceProgress.masteredUnits) || ['phys_ohm'];

        const unitsSummary = scienceCurriculum.map(u => ({
          id: u.id,
          grade: u.grade,
          domain: u.domain,
          domainLabel: u.domainLabel,
          domainColor: u.domainColor,
          unitName: u.unitName,
          subTitle: u.subTitle,
          metaphorTitle: u.metaphor?.title,
          simulationType: u.simulationType,
          isMastered: masteredUnits.includes(u.id),
          quizCount: (u.quizzes || []).length
        }));

        return makeJsonResponse({
          totalUnits: scienceCurriculum.length,
          masteredCount: masteredUnits.length,
          progressPercent: Math.round((masteredUnits.length / scienceCurriculum.length) * 100),
          units: unitsSummary,
          scienceProgress: (user && user.scienceProgress) || null
        });
      }

      // 15. science/lab
      if (pathname.endsWith('/api/science/lab')) {
        const scienceCurriculum = await clientDb.getScience();
        const uId = parsedUrl.searchParams.get('unitId') || 'phys_ohm';
        const sId = parsedUrl.searchParams.get('studentId') || 'mid01';
        const user = clientDb.getUser(sId);
        const unit = scienceCurriculum.find(u => u.id === uId) || scienceCurriculum[0];
        const userLogs = (user && user.scienceProgress && user.scienceProgress.experimentLogs) || [];
        const unitLogs = userLogs.filter(l => l.unitId === unit.id);
        const quizScores = (user && user.scienceProgress && user.scienceProgress.quizScores) || {};

        return makeJsonResponse({
          unit,
          unitLogs,
          quizScores,
          isMastered: (user && user.scienceProgress && user.scienceProgress.masteredUnits?.includes(unit.id)) || false
        });
      }

      // 16. science/log-experiment
      if (pathname.endsWith('/api/science/log-experiment')) {
        const sId = body.studentId || 'mid01';
        const user = clientDb.getUser(sId);
        if (user) {
          if (!user.scienceProgress) user.scienceProgress = { masteredUnits: [], experimentLogs: [], quizScores: {}, totalExperiments: 0 };
          const logEntry = {
            id: 'log_' + Date.now(),
            unitId: body.unitId,
            params: body.params || {},
            resultText: body.resultText || '관찰 완료',
            date: getTodayStr()
          };
          user.scienceProgress.experimentLogs.unshift(logEntry);
          user.scienceProgress.totalExperiments = (user.scienceProgress.totalExperiments || 0) + 1;
          clientDb.save();
          return makeJsonResponse({ success: true, logEntry, totalExperiments: user.scienceProgress.totalExperiments });
        }
        return makeJsonResponse({ success: true });
      }

      // 17. science/submit-quiz
      if (pathname.endsWith('/api/science/submit-quiz')) {
        const scienceCurriculum = await clientDb.getScience();
        const sId = body.studentId || 'mid01';
        const user = clientDb.getUser(sId);
        const unit = scienceCurriculum.find(u => u.id === body.unitId) || scienceCurriculum[0];
        const quiz = (unit.quizzes || []).find(q => q.id === body.quizId) || unit.quizzes[0];
        const isCorrect = (body.selectedOption === quiz.correctAnswer);

        if (user) {
          if (!user.scienceProgress) user.scienceProgress = { masteredUnits: [], experimentLogs: [], quizScores: {} };
          user.scienceProgress.quizScores[body.quizId] = { isCorrect, selectedOption: body.selectedOption, solvedAt: getTodayStr() };
          if (isCorrect && !user.scienceProgress.masteredUnits.includes(unit.id)) {
            user.scienceProgress.masteredUnits.push(unit.id);
          }
          clientDb.save();
        }
        return makeJsonResponse({ isCorrect, correctAnswer: quiz.correctAnswer, explanation: quiz.explanation });
      }

      // 18. science/coach-dialog
      if (pathname.endsWith('/api/science/coach-dialog')) {
        const scienceCurriculum = await clientDb.getScience();
        const unit = scienceCurriculum.find(u => u.id === body.unitId) || scienceCurriculum[0];
        const coach = unit.socraticCoach || {};
        const responseText = (body.query && coach.dialogResponses && coach.dialogResponses[body.query]) ||
          "좋은 탐구 질문이야! 가상실험대에서 직접 슬라이더를 조작해보고 변화를 관찰해보자!";
        return makeJsonResponse({ response: responseText, unitId: unit.id });
      }

      // 19. admin/students
      if (pathname.endsWith('/api/admin/students')) {
        return makeJsonResponse({ students: clientDb.db.users });
      }
    }

    // 그 외 일반 요청은 원래 fetch 실행
    return originalFetch(resource, options);
  };
})();
