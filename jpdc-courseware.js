/**
 * JPDC ERM 3강 무생략 인터랙티브 디지털 교안 데이터 및 컨트롤러 (Page 1 ~ 49 전체)
 * 제주특별자치도개발공사 관리자 교육과정 3회차(최종)
 */

const COURSEWARE_SLIDES = [
  {
    page: 1,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "제주개발공사(JPDC) 관리자교육과정 3회차 (최종)",
    sub: "3강. 전사적 리스크 대응과 조직의 실행",
    body: `
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:1.5rem; margin-bottom:1rem;">
        <h4 style="margin:0 0 10px; color:#14213D; font-size:1.15rem;"><i class="fa-solid fa-bullseye" style="color:#0E7C7B;"></i> 3강 핵심 모토</h4>
        <p style="font-size:1.1rem; font-weight:700; color:#0E7C7B; margin:0 0 12px;">"Top Risk에 대해 '누가, 무엇을, 어떻게' 실행할 것인지 실행안을 완성한다"</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; font-size:0.9rem;">
          <div><b>📅 일시:</b> 10월 16일 (금) 10:00~12:00 / 14:00~16:00 (총 4시간)</div>
          <div><b>👥 조편성:</b> 3기 조재편성 (3·3·4조, Silo 파괴 ③ 최종)</div>
          <div><b>🛠️ 실습도구:</b> 10인 실시간 협업 웹 도구 (우선순위 계산 결과 연계)</div>
        </div>
      </div>
    `,
    coaching: "최종 3회차의 목표는 '이론 암기'가 아니라 1·2강에서 찾은 위험에 '실제 오너와 행동계획'을 붙이는 것임을 명확히 선언하고 시작합니다.",
    jpdcTip: "기존 부서별 칸막이를 넘어 삼다수 생산, 물류, 개발사업, 지원 부서가 한 테이블에서 교차 검증하는 마지막 세션입니다.",
    jumpTab: "overview"
  },
  {
    page: 2,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "지난 시간 리마인드: 1·2강 12개 실전 사례",
    sub: "오늘은 1·2강 사례를 '대응 전략의 예시'로 다시 분석합니다",
    body: `
      <table class="jpdc-slide-table">
        <thead>
          <tr><th style="width:25%;">과거 학습 사례</th><th>오늘(3강) 활용 방식 및 대응 전략 매핑</th></tr>
        </thead>
        <tbody>
          <tr><td><b>4대강 사업</b></td><td>대응전략 <b>'회피(Avoid)'</b> — 리스크가 지나치게 컸다면 전략 단계에서 어떤 결정이 가능했을까?</td></tr>
          <tr><td><b>원전부품 위조 / 보잉 737 MAX</b></td><td>대응전략 <b>'감축(Reduce)'</b> — 통제 절차를 문서에만 두지 않고 '실제로 작동'시키는 개선책</td></tr>
          <tr><td><b>한진해운 파산</b></td><td>대응전략 <b>'공유(Share)'</b> — 보험·물류 컨소시엄으로 특정 선사 의존 리스크 분담</td></tr>
          <tr><td><b>카카오 데이터센터 화재</b></td><td>대응전략 <b>'활용(Exploit)'</b> — 재해복구(DR) 이원화 투자를 기업의 안정성 경쟁력으로 전환</td></tr>
          <tr><td><b>쿠팡 물류센터 화재</b></td><td>대응전략 <b>'감축(Reduce)'</b> — 스프링클러·방화셔터를 실질적으로 작동시키는 물리적 구조 개선</td></tr>
          <tr><td><b>강원랜드 채용비리</b></td><td>위기 이후 신뢰 회복 사례 — 리스크 오너 및 감사/보고 라인 재정비</td></tr>
          <tr><td><b>타이레놀 사건</b></td><td>위기 커뮤니케이션 골든타임의 글로벌 기준점 (성공 사례)</td></tr>
          <tr><td><b>SVB 파산</b></td><td>KRI(핵심리스크지표) 설계 — 조기경보가 있었다면 달라졌을 선제적 대응</td></tr>
        </tbody>
      </table>
    `,
    coaching: "수강생들에게 '지난 시간 배운 사례들이 오늘 5대 대응 전략의 훌륭한 벤치마크가 됨'을 상기시킵니다.",
    jpdcTip: "이 12개 사례 중 JPDC 삼다수 브랜드와 공공기관 특성에 가장 경종을 울리는 사례는 원전부품(품질)과 카카오(IT/물류 인프라)입니다."
  },
  {
    page: 3,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "3강 조편성: 3기 Silo(사일로) 파괴 ③ 최종",
    sub: "지금까지 만나지 않은 조합으로 최종 대응 체계를 완성합니다",
    body: `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
        <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:1.2rem;">
          <h4 style="color:#1D4ED8; margin:0 0 8px;">1조 (3인) - 환경·생산 트랙</h4>
          <p style="margin:0; font-size:0.9rem; color:#1E3A8A;"><b>참여자:</b> Peter Parker, David Miller, Sarah Jenkins<br><b>주요 미션:</b> 지하수 수량/수질 변동 및 취수 규제 대응</p>
        </div>
        <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:10px; padding:1.2rem;">
          <h4 style="color:#15803D; margin:0 0 8px;">2조 (3인) - 물류·유통 트랙</h4>
          <p style="margin:0; font-size:0.9rem; color:#14532D;"><b>참여자:</b> James Wilson, Robert Taylor, Olivia Brown<br><b>주요 미션:</b> 해상 물류 차질 및 유통 파트너사 신용 리스크</p>
        </div>
        <div style="background:#FAF5FF; border:1px solid #E9D5FF; border-radius:10px; padding:1.2rem;">
          <h4 style="color:#7E22CE; margin:0 0 8px;">3조 (4인) - 안전·IT·지배구조 트랙</h4>
          <p style="margin:0; font-size:0.9rem; color:#581C87;"><b>참여자:</b> Daniel Clark, Thomas Anderson, Alex Morgan, Sophia Martinez<br><b>주요 미션:</b> 스마트팩토리 보안, 산업안전, 언론/도민 평판 리스크</p>
        </div>
      </div>
      <p style="margin-top:1rem; font-size:0.9rem; color:#64748B;">* 규칙: 지금까지 조장을 맡지 않은 구성원이 이번 최종 회차의 조장을 맡아 의사결정을 이끕니다.</p>
    `,
    coaching: "부서 간 사일로를 깨기 위해 타 부서원의 시각에서 질문을 던지도록 격려하세요.",
    jpdcTip: "관리자 교육의 최대 효과는 평소 소통하지 않던 팀장/차장들이 서로의 리스크 오너십을 확인하는 데 있습니다."
  },
  {
    page: 4,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "3강 핵심 학습목표 (5대 Objectives)",
    sub: "4시간 동안 달성해야 할 구체적인 결과물",
    body: `
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div style="background:#F8FAFC; border-left:4px solid #0E7C7B; padding:12px 16px; border-radius:6px;">
          <b>학습목표 1:</b> COSO ERM의 5가지 리스크 대응전략(회피·감축·공유·수용·활용)을 익히고 실무에 적용한다.
        </div>
        <div style="background:#F8FAFC; border-left:4px solid #0E7C7B; padding:12px 16px; border-radius:6px;">
          <b>학습목표 2:</b> 리스크 오너(Owner)를 명확히 지정하고 부서 간 협업 체계(Silo 파괴)를 설계한다.
        </div>
        <div style="background:#F8FAFC; border-left:4px solid #0E7C7B; padding:12px 16px; border-radius:6px;">
          <b>학습목표 3:</b> 위기 발생 시 의사결정 원칙과 24시간 커뮤니케이션 골든타임을 이해한다.
        </div>
        <div style="background:#F8FAFC; border-left:4px solid #0E7C7B; padding:12px 16px; border-radius:6px;">
          <b>학습목표 4:</b> 핵심리스크지표(KRI)를 설계하고 지속적인 조기경보 모니터링 체계를 수립한다.
        </div>
        <div style="background:#F8FAFC; border-left:4px solid #0E7C7B; padding:12px 16px; border-radius:6px;">
          <b>학습목표 5:</b> 1·2강에서 도출한 Top Risk에 실제 대응·오너·KRI를 배정해 전사 실행안(Risk Register)을 완성한다.
        </div>
      </div>
    `,
    coaching: "교육 종료 시점에 이 5가지 항목을 자가진단(Self-Check)하게 됩니다.",
    jpdcTip: "문서 작성에 그치지 않고 '내일 아침 우리 팀에 바로 적용할 수 있는 1가지 조치'를 찾는 데 집중합니다."
  },
  {
    page: 5,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "COSO ERM 5대 리스크 대응전략",
    sub: "식별된 위험을 처리하는 5가지 국제 표준 전략",
    body: `
      <table class="jpdc-slide-table">
        <thead>
          <tr><th style="width:18%;">전략</th><th style="width:42%;">전략적 의미</th><th>JPDC 적용 예시</th></tr>
        </thead>
        <tbody>
          <tr><td><b style="color:#DC2626;">회피 (Avoid)</b></td><td>리스크가 너무 큰 사업·활동 자체를 중단하거나 진행하지 않음</td><td>리스크가 지나치게 큰 고위험 개발사업 보류 또는 출자 철회</td></tr>
          <tr><td><b style="color:#2563EB;">감축 (Reduce)</b></td><td>발생가능성 또는 영향도를 낮추는 내부통제 조치 시행</td><td>스마트팩토리 노후설비 안전장치 설치, 품질관리 이중화 검증</td></tr>
          <tr><td><b style="color:#D97706;">공유 (Share)</b></td><td>리스크의 일부를 제3자(보험사, 협력사)와 분담</td><td>해상운송 종합보험 가입, 핵심 물류의 복수 선사 컨소시엄 추진</td></tr>
          <tr><td><b style="color:#64748B;">수용 (Accept)</b></td><td>리스크 수준이 감내 가능하여 별도 추가 통제 없이 받아들임</td><td>원자재 소규모 가격 변동, 일상적 단기 선적 지연</td></tr>
          <tr><td><b style="color:#059669;">활용 (Exploit)</b></td><td>리스크(불확실성)를 오히려 차별화된 비즈니스 기회로 전환</td><td>무라벨·친환경 ESG 규제를 삼다수 프리미엄 신사업 기회로 활용</td></tr>
        </tbody>
      </table>
    `,
    coaching: "대부분의 조직은 '감축'만 생각하지만, 뛰어난 관리자는 '공유'와 '활용'을 통해 비용을 줄이고 가치를 창출합니다.",
    jpdcTip: "제주개발공사는 공기업이므로 법적 처벌 리스크는 '감축/회피'하고, ESG 기후변화는 '활용'하는 투트랙이 필요합니다."
  },
  {
    page: 6,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "대응전략 선택 기준 (의사결정 매트릭스)",
    sub: "다섯 가지 전략 중 어떤 것을 선택해야 하는가?",
    body: `
      <div style="background:#FFFBEB; border:1px solid #FCD34D; border-radius:10px; padding:1.2rem; margin-bottom:1rem;">
        <ul style="margin:0; padding-left:1.2rem; font-size:0.95rem; line-height:1.8; color:#92400E;">
          <li><b>영향도가 치명적(4~5점)</b>이고 조직의 핵심 역량 밖의 사업이라면 ➔ <b>회피(Avoid)</b>를 최우선 검토합니다.</li>
          <li><b>발생가능성과 영향도를 낮출 수 있는 구체적 통제 수단</b>이 있다면 ➔ <b>감축(Reduce)</b>을 선택합니다.</li>
          <li><b>조직이 자체 감당하기 어려운 규모의 재무적 손실</b>이라면 ➔ 보험·컨소시엄 등 <b>공유(Share)</b>를 검토합니다.</li>
          <li><b>리스크 평가 점수가 낮고(1~6점)</b> 통제 비용이 손실보다 더 크다면 ➔ <b>수용(Accept)</b>도 합리적인 경영 선택입니다.</li>
          <li><b>그 불확실성이 시장에서 오직 우리 공사만 해결할 수 있는 기회</b>라면 ➔ <b>활용(Exploit)</b>을 적극 추진합니다.</li>
        </ul>
      </div>
    `,
    coaching: "모든 리스크를 0으로 만들 수는 없습니다. '수용 가능한 위험 수준(Risk Appetite)'을 정하는 것이 핵심입니다.",
    jpdcTip: "영향도 4점 이상의 중대재해나 수질 오염은 결코 '수용'할 수 없습니다. 오직 철저한 '감축'만이 답입니다."
  },
  {
    page: 7,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "대응전략 심층 ① : 회피 (Avoid)",
    sub: "사례 분석: 4대강 사업에서 '회피'를 선택했다면?",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ 1강에서 다룬 <b>4대강 사업</b>은 전략 수립 단계에서 정책·환경 리스크를 충분히 반영하지 못하고 무리하게 착공한 대표적 사례입니다.</p>
        <p>■ 만약 사전에 '환경 단체 및 사회적 반발 가능성'을 영향도 5점으로 정밀 평가했다면, 사업 전면 강행 대신 <b>사업 규모 축소나 단계적 분할 추진(회피에 준하는 전략적 보류)</b>이 검토될 수 있었습니다.</p>
        <div style="background:#FEF2F2; border-left:4px solid #EF4444; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>💡 실습 포인트:</b> 회피는 비겁한 '무조건 안 한다'가 아니라, <b>'이 리스크를 감수할 경영적 가치가 있는가?'</b>를 냉정히 따져 멈출 줄 아는 용기 있는 결정입니다.
        </div>
      </div>
    `,
    coaching: "조직 내에서 사업 추진 부서가 '회피' 의견을 내기 어려운 조직 문화를 어떻게 극복할지 토론해보세요.",
    jpdcTip: "도외 신규 부동산 개발사업 등 공사의 본원 경쟁력과 무관한 고위험 영역에 '회피' 기준을 엄격히 적용해야 합니다."
  },
  {
    page: 8,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "대응전략 심층 ② : 감축 (Reduce)",
    sub: "원전부품 위조 · 보잉 737 MAX : 통제를 '실제로 작동'시키기",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ 두 사례 모두 매뉴얼과 통제 규정은 완벽히 존재했으나, <b>현장에서 실제로 작동하지 않았던 실패</b>였습니다.</p>
        <p>■ 감축 전략의 핵심은 규정을 늘리는 것이 아니라 <b>'기존 통제가 실제로 작동하도록 독립적인 재검증 장치'</b>를 만드는 것입니다.</p>
        <p>■ <b>사후 개선책:</b> 원전부품은 제3자 독립 시험기관 재검증 도입, 보잉은 MCAS 단일 센서 의존을 버리고 센서 이중화 및 조종사 의무 재교육을 단행했습니다.</p>
        <div style="background:#EFF6FF; border-left:4px solid #3B82F6; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>🏭 JPDC 현장 적용:</b> 삼다수 생산 설비의 안전 센서나 수질 검사도 '규정상 점검표가 있다'로 끝나지 않고, <b>불시에 실제 작동을 테스트하는 상위 검증 절차</b>가 포함되어야 합니다.
        </div>
      </div>
    `,
    coaching: "'페이퍼 워크'에 불과한 형식적 통제와 실질적 감축의 차이를 강조하세요.",
    jpdcTip: "제주삼다수 공장의 병입/포장 라인에서 '형식상 체크만 하고 넘어가는 관행'이 없는지 점검해야 합니다."
  },
  {
    page: 9,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "대응전략 심층 ③ : 공유 (Share)",
    sub: "한진해운 파산 이후 '공유'로 물류 리스크 분담하기",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ 2016년 한진해운 파산 사태 당시, 한진해운에 단독 계약을 맺었던 화주들은 수조 원의 화물이 바다에 묶이는 치명타를 입었습니다.</p>
        <p>■ 이후 글로벌 화주들은 특정 단일 선사 의존도를 낮추고 <b>복수 선사 분산 계약 및 물류 컨소시엄</b>을 통해 리스크를 분담(공유)하는 구조로 전면 전환했습니다.</p>
        <div style="background:#FFFBEB; border-left:4px solid #F59E0B; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>🚢 JPDC 물류 적용:</b> 제주에서 육지로 나가는 삼다수 해상 운송은 제주개발공사의 생명선입니다. <b>항만 노조 파업이나 선사 부도에 대비해 선사 다변화 및 비상 대체 운송 협약(공유)</b>이 필수적입니다.
        </div>
      </div>
    `,
    coaching: "공유는 비용이 듭니다(보험료, 다자 계약 수수료). 그러나 리스크 발생 시 조직을 파산에서 구합니다.",
    jpdcTip: "삼다수 물류 파트너십 계약 시 비상 복수 선사 투입 의무화 조항을 점검해보세요."
  },
  {
    page: 10,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "대응전략 심층 ④ : 수용 (Accept)",
    sub: "경미한 수준의 리스크는 감내하고 통제 비용을 아낀다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ 모든 리스크를 통제하려 들면 조직은 관료주의와 검증 비용으로 마비됩니다.</p>
        <p>■ <b>수용의 조건:</b></p>
        <ol style="margin:6px 0; padding-left:1.4rem;">
          <li>리스크 평가 결과가 <b>LOW 등급 (1~6점)</b>에 해당하는 경미한 사안</li>
          <li>통제 장치를 구축하고 운영하는 비용이 예상 피해액보다 훨씬 큰 경우</li>
          <li>정상적인 비즈니스 활동 과정에서 불가피하게 수반되는 경미한 오차 (예: 소규모 환율 변동, 일상적 자재 마모)</li>
        </ol>
        <div style="background:#F1F5F9; border-left:4px solid #64748B; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>⚠️ 주의점:</b> '수용'은 방치가 아닙니다. <b>'얼마까지 감내할 것인가(한도 설정)'</b>를 경영진이 합의하고 주기적으로 모니터링해야 합니다.
        </div>
      </div>
    `,
    coaching: "위험을 두려워해 아무런 결정도 못 내리는 관리자에게 '합리적 수용'의 미덕을 설명하세요.",
    jpdcTip: "소모품 구매 지연 등 경미한 일상 리스크에 결재 라인을 덕지덕지 붙이는 것은 낭비입니다."
  },
  {
    page: 11,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "대응전략 심층 ⑤ : 활용 (Exploit)",
    sub: "카카오 DC 화재 & ESG 규제 : 위기를 초격차 경쟁력으로",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>카카오 IDC 화재:</b> 서비스가 마비되며 막대한 비난을 받았지만, 카카오는 이후 자체 데이터센터를 짓고 재해복구(DR) 삼중화 시스템에 수천억을 투자하여 <b>'가장 안전한 플랫폼'이라는 신뢰 경쟁력</b>으로 전환했습니다.</p>
        <p>■ <b>ESG 플라스틱 규제:</b> 생수 업계에 페트병 플라스틱 감축 규제는 커다란 위협(Threat)이지만, <b>'무라벨 선제 도입', '재생원료(CR-PET) 최초 상용화'</b>로 오히려 친환경 1등 브랜드 가치를 독점하는 기회(Exploit)로 탈바꿈했습니다.</p>
        <div style="background:#ECFDF5; border-left:4px solid #10B981; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>✨ 실습 포인트:</b> 리스크는 위험인 동시에 누군가에게는 새로운 시장을 여는 거대한 기회입니다.
        </div>
      </div>
    `,
    coaching: "수강생들에게 '경쟁사가 규제 때문에 허덕일 때 우리가 먼저 치고 나갈 영역'이 무엇인지 질문하세요.",
    jpdcTip: "제주삼다수의 청정 수자원 보호 규제를 역으로 '세계 유일의 유네스코 청정수' 글로벌 마케팅으로 활용할 수 있습니다."
  },
  {
    page: 12,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "실습 ① : 우리 조 Top 3 리스크 대응전략 선택",
    sub: "1·2강에서 도출한 우선순위 리스크에 전략 매핑하기",
    body: `
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:1.2rem;">
        <h4 style="margin:0 0 10px; color:#14213D;">조별 워크시트 작성 과제 (15분)</h4>
        <p style="font-size:0.9rem; color:#475569; margin-bottom:12px;">우리 조가 5×5 매트릭스에서 도출한 가장 점수가 높은 Top 3 리스크에 대해 5대 전략 중 최적안을 고르고 실행 조치를 정리하세요.</p>
        <table class="jpdc-slide-table">
          <thead>
            <tr><th>우선순위</th><th>리스크명</th><th>선택 전략 (택1)</th><th>구체적 실행 조치 및 근거</th></tr>
          </thead>
          <tbody>
            <tr><td><b>Top 1</b></td><td>(예: 관정 가뭄 지하수위 하강)</td><td><b>감축 + 공유</b></td><td>인공함양정 가동 및 비상 대체 관정 협약</td></tr>
            <tr><td><b>Top 2</b></td><td>(예: 핵심 선사 운송 지연)</td><td><b>공유</b></td><td>선사 복수 계약 및 안전재고 일수 상향</td></tr>
            <tr><td><b>Top 3</b></td><td>(예: 도민 사회 여론 악화)</td><td><b>감축</b></td><td>공공기여도 투명 공시 및 지역 상생 펀드 확대</td></tr>
          </tbody>
        </table>
      </div>
    `,
    coaching: "단순히 '감축'만 고르지 말고, 왜 '회피'나 '공유'가 아닌지 이유를 묻도록 유도하세요.",
    jpdcTip: "하단의 [① PESTEL 분석 도구] 내 '셀프 체크리스트 생성기' 및 [③ 5×5 매트릭스]와 연계하여 월별/분기별 점검 항목으로 DB화할 수 있습니다.",
    jumpTab: "pestel"
  },
  {
    page: 13,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "비효과적 대응 전략의 3대 함정",
    sub: "많은 조직들이 빠지는 실패 패턴을 경계해야 합니다",
    body: `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
        <div style="background:#FEF2F2; border-radius:10px; padding:1.2rem; border:1px solid #FCA5A5;">
          <h4 style="color:#B91C1C; margin:0 0 8px;">함정 1: 형식적 통제</h4>
          <p style="font-size:0.88rem; color:#7F1D1D; margin:0;">
            매뉴얼과 체크리스트만 수십 장 늘리고, 정작 현장에서는 아무도 제대로 지키지 않는 종이 호랑이 상태. (보잉737, 원전부품 사례)
          </p>
        </div>
        <div style="background:#FFFBEB; border-radius:10px; padding:1.2rem; border:1px solid #FCD34D;">
          <h4 style="color:#B45309; margin:0 0 8px;">함정 2: 책임 떠넘기기</h4>
          <p style="font-size:0.88rem; color:#78350F; margin:0;">
            부서 간 경계에 걸쳐 있는 리스크에 대해 '그건 우리 팀 소관이 아니다'라며 서로 미루다 골든타임을 놓치는 사일로 현상.
          </p>
        </div>
        <div style="background:#F1F5F9; border-radius:10px; padding:1.2rem; border:1px solid #CBD5E1;">
          <h4 style="color:#475569; margin:0 0 8px;">함정 3: 타이밍 실기</h4>
          <p style="font-size:0.88rem; color:#1E293B; margin:0;">
            완벽한 정보를 기다리며 보고서만 다듬다가, 사소했던 위험이 대형 위기로 폭발한 뒤에야 뒷북치는 늑장 대응.
          </p>
        </div>
      </div>
    `,
    coaching: "관리자들에게 '우리 공사에도 이런 함정이 존재하지 않는지' 솔직하게 자문하도록 하세요.",
    jpdcTip: "공기업 문화에서 가장 흔한 함정은 2번(소관 부서 미루기)입니다. 이를 깨기 위해 리스크 오너가 필요합니다."
  },
  {
    page: 14,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "리스크 오너 (Risk Owner)의 정의와 중요성",
    sub: "'모두의 책임은 누구의 책임도 아니다'",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>리스크 오너란?</b> 특정 리스크의 발생을 모니터링하고, 통제 조치를 설계 및 집행하며, 이상 징후 발생 시 경영진에게 보고할 <b>최종 책임이 부여된 개인(직책)</b>을 말합니다.</p>
        <p>■ '생산본부', '물류팀'처럼 부서 이름으로 오너를 지정하면 실제 실행력이 떨어집니다. 반드시 <b>'생산관리팀장', '물류지원팀장'처럼 구체적인 직책</b>을 명시해야 합니다.</p>
        <div style="background:#EFF6FF; border-left:4px solid #2563EB; padding:12px 16px; border-radius:6px; margin-top:12px;">
          <h4 style="margin:0 0 6px; color:#1D4ED8;">📌 리스크 오너의 3대 책무:</h4>
          <ol style="margin:0; padding-left:1.2rem; font-size:0.9rem;">
            <li><b>상시 관측:</b> 정기적으로 KRI(조기경보 지표)를 확인하고 서명한다.</li>
            <li><b>통제 집행:</b> 배정된 예산과 인력으로 감축/공유 조치를 현장에 작동시킨다.</li>
            <li><b>즉시 보고:</b> 사전 경고 수치 도달 시 24시간 내 컨트롤타워에 보고한다.</li>
          </ol>
        </div>
      </div>
    `,
    coaching: "오너는 '처벌받는 사람'이 아니라 '위험을 관리할 권한과 자원을 부여받은 총괄자'임을 강조하세요.",
    jpdcTip: "제주개발공사의 직제 규정상 팀장급이 실질적인 리스크 오너로서 가장 효과적인 위치입니다."
  },
  {
    page: 15,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "실습 ② : 우리 조 Top 3 리스크 오너 및 보고라인 지정",
    sub: "누가(오너), 누구에게(보고대상), 언제(주기) 보고하는가?",
    body: `
      <table class="jpdc-slide-table">
        <thead>
          <tr><th style="width:25%;">리스크명</th><th style="width:25%;">리스크 오너 (직책)</th><th style="width:25%;">보고 대상 (상위자)</th><th>보고 주기</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>지하수 취수량 감소 및 수위 하강</td>
            <td><b>생산관리팀장</b></td>
            <td>생산총괄본부장 · 감사실장</td>
            <td>월 1회 정기 / 이상 징후 시 즉시</td>
          </tr>
          <tr>
            <td>핵심 물류 파트너사 재무 악화</td>
            <td><b>물류지원팀장</b></td>
            <td>영업마케팅본부장</td>
            <td>분기 1회 / 신용등급 변동 시 즉시</td>
          </tr>
          <tr>
            <td>데이터센터 · ERP 전산 장애</td>
            <td><b>정보시스템담당관</b></td>
            <td>경영기획본부장 · 사장</td>
            <td>월 1회 점검 / 장애 시 1시간 내</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:0.85rem; color:#64748B;">* 실습 요령: 각 조에서 선정한 3대 리스크에 대해 위 테이블의 빈칸을 완성하세요.</p>
    `,
    coaching: "보고 주기에 '이상 징후 발생 시 즉시'라는 조건부 긴급 보고라인이 반드시 들어가야 합니다.",
    jpdcTip: "감사실이나 안전보건팀은 2선 방어선으로서 정기 보고를 함께 공유받아야 합니다."
  },
  {
    page: 16,
    module: 1,
    moduleName: "모듈 1: 5대 대응 전략",
    title: "대응전략 종합 갤러리 (12개 사례 매핑 총정리)",
    sub: "역대 학습한 12대 사건의 전략적 재해석",
    body: `
      <table class="jpdc-slide-table" style="font-size:0.82rem;">
        <thead>
          <tr><th>사례명</th><th style="width:18%;">가장 어울리는 전략</th><th>전략 선택의 핵심 이유</th></tr>
        </thead>
        <tbody>
          <tr><td><b>LH 투기</b></td><td><span class="jpdc-badge" style="background:#2563EB;">감축</span></td><td>이해충돌 통제(재산등록·직무배제) 강화로 부패 발생가능성 원천 축소</td></tr>
          <tr><td><b>강원랜드 채용비리</b></td><td><span class="jpdc-badge" style="background:#2563EB;">감축</span></td><td>외부 면접관 과반 의무화 등 독립적 3선 검증 절차 도입</td></tr>
          <tr><td><b>원전부품 위조 / 보잉 737</b></td><td><span class="jpdc-badge" style="background:#2563EB;">감축</span></td><td>통제가 실제로 작동하게 만드는 다중 센서 및 불시 재검증 체계</td></tr>
          <tr><td><b>4대강 사업</b></td><td><span class="jpdc-badge" style="background:#DC2626;">회피</span></td><td>기획 단계에서 정책·환경 리스크 감당 가치를 냉정히 재평가해 보류</td></tr>
          <tr><td><b>한국전력 재무위기</b></td><td><span class="jpdc-badge" style="background:#D97706;">공유</span></td><td>원자재가 상승을 전기료에 연동하는 제도적 정책 리스크 분담 구조 필요</td></tr>
          <tr><td><b>후쿠시마 원전</b></td><td><span class="jpdc-badge" style="background:#2563EB;">감축</span></td><td>방파제 설계 기준 자체를 상상 가능한 최악의 쓰나미 시나리오로 상향</td></tr>
          <tr><td><b>한진해운 파산</b></td><td><span class="jpdc-badge" style="background:#D97706;">공유</span></td><td>단일 선사 의존 탈피, 복수 선사 컨소시엄 및 비상 운송망 분산</td></tr>
          <tr><td><b>카카오 DC 화재</b></td><td><span class="jpdc-badge" style="background:#059669;">활용</span></td><td>데이터센터 재해복구(DR) 삼중화 투자를 업계 최고 안정성 마케팅으로 전환</td></tr>
          <tr><td><b>쿠팡 물류센터 화재</b></td><td><span class="jpdc-badge" style="background:#2563EB;">감축</span></td><td>메자닌 랙 적재 구조를 전면 재설계해 스프링클러가 화염에 닿도록 개선</td></tr>
          <tr><td><b>타이레놀 사건</b></td><td><span class="jpdc-badge" style="background:#2563EB;">감축/소통</span></td><td>1억 달러 전량 리콜과 3중 안전 포장 개발로 소비자 신뢰 영구 회복</td></tr>
          <tr><td><b>SVB 파산</b></td><td><span class="jpdc-badge" style="background:#D97706;">KRI/감축</span></td><td>미실현 손실비율, SNS 뱅크런 조기경보 지표를 사전 관측해 자본 확충</td></tr>
        </tbody>
      </table>
    `,
    coaching: "12개 사례가 한 표로 정리된 이 슬라이드는 수강생들이 가장 소장하고 싶어 하는 핵심 요약입니다.",
    jpdcTip: "이 12개 중 우리 JPDC의 일상과 가장 밀접한 것은 '한진해운(해상물류)'과 '원전부품(품질)'입니다."
  },
  {
    page: 17,
    module: 2,
    moduleName: "모듈 2: 리스크 오너 & 전사 협업체계",
    title: "부서 간 협업과 전사적 대응 체계: Silo(사일로)를 넘어서",
    sub: "리스크는 결코 한 부서의 힘만으로 해결되지 않는다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>단일 부서의 한계:</b> 삼다수 물류 지연 리스크는 물류지원팀만의 문제가 아닙니다. 생산관리팀(출하 조절), 영업마케팅팀(고객사 소통), 계약팀(선사 협의), 기획홍보팀(도민 언론 브리핑)이 거미줄처럼 얽혀 있습니다.</p>
        <p>■ <b>컨트롤타워의 존재:</b> 전사적 대응체계의 핵심은 <b>'리스크 관리 전담 조직(또는 ERM 협의체)'</b>이 존재하여 부서 간 단절된 정보를 통합하고 조율하는 것입니다.</p>
        <p>■ 평소에 부서 간 리스크 정보 공유 회의체(월 1회)를 가동해야, 위기가 터졌을 때 '누구에게 전화해야 하는지'를 헤매지 않습니다.</p>
      </div>
    `,
    coaching: "오늘 조편성(3·3·4조)을 부서가 다른 사람들끼리 섞은 이유가 바로 'Silo 파괴'의 연습임을 상기시키세요.",
    jpdcTip: "제주개발공사 내 기획처, 생산처, 영업처 간의 정보 칸막이를 허무는 정기 협의체 도입이 시급합니다."
  },
  {
    page: 18,
    module: 2,
    moduleName: "모듈 2: 리스크 오너 & 전사 협업체계",
    title: "오너·보고라인 워크시트 작성 예시 (참고용)",
    sub: "JPDC 실무 직제 기반의 표준화된 보고 체계",
    body: `
      <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; padding:1.2rem;">
        <table class="jpdc-slide-table">
          <thead>
            <tr><th>리스크명</th><th>리스크 오너 (직책)</th><th>보고 대상</th><th>보고 주기 및 방식</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><b>지하수 취수량 감소</b></td>
              <td>생산관리팀장</td>
              <td>생산총괄본부장 · 감사실장</td>
              <td>월 1회 정기 대면 보고 / 취수 기준 10% 하강 시 1시간 내 즉시 유선 보고</td>
            </tr>
            <tr>
              <td><b>물류 파트너사 재무위기</b></td>
              <td>물류지원팀장</td>
              <td>영업본부장 · 경영기획실</td>
              <td>분기 1회 신용도 점검 / 파트너사 신용등급 하락 발표 시 당일 보고</td>
            </tr>
            <tr>
              <td><b>IDC 및 ERP 시스템 장애</b></td>
              <td>정보시스템팀장</td>
              <td>경영기획본부장 · 상임이사</td>
              <td>장애 발생 즉시 (15분 내 1차 상황 공유, 복구 진행 1시간 간격 브리핑)</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top:10px; font-size:0.85rem; color:#475569;">💡 이 예시를 나침반 삼아, 각 조의 고유 리스크에 대해 구체적인 직책과 긴급 보고 기준을 설정합니다.</p>
      </div>
    `,
    coaching: "'누가 사장님께 보고할 것인가'를 명시하지 않으면 위기 상황에서 서로 눈치만 보게 됩니다.",
    jpdcTip: "보고 라인에 상임감사위원(감사실)을 포함하는 것은 공공기관 내부통제의 투명성을 보장하는 핵심 장치입니다."
  },
  {
    page: 19,
    module: 2,
    moduleName: "모듈 2: 리스크 오너 & 전사 협업체계",
    title: "LH 사례로 다시 보는 '부서 간 정보 단절'의 대가",
    sub: "정보가 연결되지 않으면 통제는 눈먼 장님이 된다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>실패의 근본 원인:</b> 신도시 개발정보를 다루는 사업부서, 임직원 인사·감사부서, 공직자 재산신고를 접수하는 부서가 <b>서로 완벽히 분리되어 정보를 공유하지 않았던 것</b>이 LH 투기 사태의 결정적 패착이었습니다.</p>
        <p>■ 만약 컨트롤타워가 있어 <b>'개발정보 열람 직원 명단'과 '직원 토지 매입 내역'을 정기적으로 전산 대조</b>했다면, 곪아 터지기 전에 조기 적발할 수 있었습니다.</p>
        <div style="background:#FEF2F2; border-left:4px solid #EF4444; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>🏢 JPDC 교훈:</b> 삼다수 생산(수질·재고), 물류(선적 현황), 재무(원자재가), 계약(협력사 건전성) 정보가 각 부서 PC 속에만 갇혀 있다면 우리도 동일한 위험에 노출됩니다.
        </div>
      </div>
    `,
    coaching: "부서 이기주의(우리 팀 데이터는 우리 것)가 조직을 어떻게 파멸로 이끄는지 경각심을 일깨워주세요.",
    jpdcTip: "ERP 시스템에 전사 리스크 대시보드를 연동하여 부서 간 이상 징후를 교차 열람할 수 있어야 합니다."
  },
  {
    page: 20,
    module: 2,
    moduleName: "모듈 2: 리스크 오너 & 전사 협업체계",
    title: "리스크 발생 시 부서 간 협업 흐름도 (예: 물류 지연)",
    sub: "현장 감지부터 경영진 최종 의사결정까지의 골든 프로세스",
    body: `
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:10px;">
        <div style="display:flex; align-items:center; gap:10px; background:#F8FAFC; padding:12px 16px; border-radius:8px; border-left:4px solid #3B82F6;">
          <b style="color:#2563EB; min-width:90px;">1선 현장 감지:</b>
          <span>물류지원팀 현장 담당자가 항만 기상 악화 및 선사 화물 선적 거부 조짐 인지</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px; background:#F8FAFC; padding:12px 16px; border-radius:8px; border-left:4px solid #0E7C7B;">
          <b style="color:#0E7C7B; min-width:90px;">오너 즉시 보고:</b>
          <span>물류지원팀장(리스크 오너)에게 1시간 이내 유선 및 메신저 즉시 상황 보고</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px; background:#F8FAFC; padding:12px 16px; border-radius:8px; border-left:4px solid #D97706;">
          <b style="color:#D97706; min-width:90px;">컨트롤타워 가동:</b>
          <span>ERM 협의체 소집 ➔ 생산관리팀(출하량 조절), 영업팀(유통사 공문), 홍보팀(언론 모니터링) 동시 전파</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px; background:#F8FAFC; padding:12px 16px; border-radius:8px; border-left:4px solid #16A34A;">
          <b style="color:#16A34A; min-width:90px;">경영진 의사결정:</b>
          <span>사장 및 경영진 보고 ➔ 비상 대체선박 투입 예산 긴급 집행 승인</span>
        </div>
      </div>
    `,
    coaching: "이 프로세스가 종이 위의 규정이 아니라 '실제 전화 한 통'으로 매끄럽게 연결되는지 확인하세요.",
    jpdcTip: "이 흐름도를 인쇄하여 전 임직원 책상과 현장 관리실에 비치하는 매뉴얼화가 필요합니다."
  },
  {
    page: 21,
    module: 3,
    moduleName: "모듈 3: 위기 의사결정 & 골든타임",
    title: "위기 발생 시 의사결정 원칙 & 24시간 골든타임",
    sub: "위기 상황에서는 '완벽한 결정'보다 '빠르고 정직한 결정'이 우선한다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>위기의 본질:</b> 위기는 항상 <b>불완전한 정보, 극심한 시간 압박, 대중과 언론의 분노</b> 속에서 발생합니다.</p>
        <p>■ <b>초기 24시간의 절대적 법칙:</b> 사건 발생 후 최초 24시간 동안 조직이 어떤 태도를 보이느냐가 향후 10년의 기업 신뢰도를 결정합니다.</p>
        <div style="background:#FFFBEB; border:1px solid #FCD34D; border-radius:8px; padding:1rem; margin-top:10px;">
          <h4 style="margin:0 0 6px; color:#B45309;">⚠️ 위기 의사결정 시 경영진이 던져야 할 3가지 질문:</h4>
          <ol style="margin:0; padding-left:1.2rem; color:#92400E;">
            <li>우리가 숨기고 있는 사실이 단 하나라도 있는가?</li>
            <li>피해자와 고객의 고통에 진심으로 공감하고 있는가?</li>
            <li>지금 내리는 결정이 단기 손실을 넘어 장기적 조직 가치를 지키는 길인가?</li>
          </ol>
        </div>
      </div>
    `,
    coaching: "위기 시 가장 나쁜 결정은 '회의만 하다가 아무런 입장 표명도 안 하는 침묵'입니다.",
    jpdcTip: "도민의 공기업인 JPDC는 투명성이 생명입니다. 작은 하자라도 먼저 알리는 것이 신뢰를 지키는 길입니다."
  },
  {
    page: 22,
    module: 3,
    moduleName: "모듈 3: 위기 의사결정 & 골든타임",
    title: "위기 커뮤니케이션 흐름도 (초기 24시간 타임라인)",
    sub: "사고 발생 후 시간대별 액션 플랜",
    body: `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-top:10px;">
        <div style="background:#F8FAFC; border-top:4px solid #DC2626; padding:1rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h4 style="color:#DC2626; margin:0 0 6px;">골든타임 1: 0~2시간</h4>
          <p style="font-size:0.85rem; margin:0;"><b>사실 확인 & 보고:</b> 현장 피해 규모 파악, 리스크 오너 및 컨트롤타워 즉시 소집, 은폐 시도 차단</p>
        </div>
        <div style="background:#F8FAFC; border-top:4px solid #D97706; padding:1rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h4 style="color:#D97706; margin:0 0 6px;">골든타임 2: 2~6시간</h4>
          <p style="font-size:0.85rem; margin:0;"><b>1차 입장 표명:</b> "상황을 파악 중이며 전사 역량을 다해 수습 중"이라는 사실 기반 1차 성명 발표 (추측 발언 금지)</p>
        </div>
        <div style="background:#F8FAFC; border-top:4px solid #2563EB; padding:1rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h4 style="color:#2563EB; margin:0 0 6px;">골든타임 3: 6~12시간</h4>
          <p style="font-size:0.85rem; margin:0;"><b>대변인 단일화:</b> 지정된 공식 대변인 1인만 언론 인터뷰 진행, 임직원 개인 SNS 발언 통제</p>
        </div>
        <div style="background:#F8FAFC; border-top:4px solid #16A34A; padding:1rem; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h4 style="color:#16A34A; margin:0 0 6px;">골든타임 4: 12~24시간</h4>
          <p style="font-size:0.85rem; margin:0;"><b>구체적 수습책 제시:</b> 보상 기준, 피해 복구 일정, 재발 방지 대책을 투명하게 공개</p>
        </div>
      </div>
    `,
    coaching: "각 시간대별 담당자가 누구인지 사전에 매뉴얼로 정해져 있어야 당황하지 않습니다.",
    jpdcTip: "제주도청 대변인실 및 도의회 소통 채널과의 긴밀한 공조 타임라인이 함께 가동되어야 합니다."
  },
  {
    page: 23,
    module: 3,
    moduleName: "모듈 3: 위기 의사결정 & 골든타임",
    title: "위기 커뮤니케이션 원칙 1 : 골든타임 준수",
    sub: "첫 24시간의 침묵은 '유죄 인정'으로 해석된다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ SNS와 실시간 뉴스의 시대에 <b>침묵은 곧 거짓말이나 은폐</b>로 간주됩니다.</p>
        <p>■ 정확한 원인이 다 밝혀지지 않았더라도, <b>"우리가 이 문제를 인지하고 있으며, 확인된 사실은 이것이고, 최선을 다해 조사 중이다"</b>라는 첫 브리핑을 2시간 내에 내보내야 합니다.</p>
        <div style="background:#FEF2F2; border-left:4px solid #DC2626; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>⚠️ 경고:</b> 사태가 다 정리된 뒤에 발표하겠다는 생각은 착각입니다. 침묵하는 동안 대중과 가짜뉴스가 공백을 채워버립니다.
        </div>
      </div>
    `,
    coaching: "'모르면 모른다고 말하고, 확인 중이라고 말하는 것'이 골든타임의 핵심입니다.",
    jpdcTip: "삼다수 품질 악성 루머 발생 시 공식 웹사이트와 SNS에 2시간 내 팩트체크 공지를 띄워야 합니다."
  },
  {
    page: 24,
    module: 3,
    moduleName: "모듈 3: 위기 의사결정 & 골든타임",
    title: "위기 커뮤니케이션 원칙 2 : 대변인 단일화 (One-Voice)",
    sub: "조직의 입은 단 하나여야 한다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ 위기 상황에서 언론은 현장 직원, 노조, 임원 등 여러 사람에게 접근해 엇갈린 진술을 유도합니다.</p>
        <p>■ <b>원보이스(One-Voice) 원칙:</b></p>
        <ul style="margin:6px 0; padding-left:1.2rem;">
          <li>사전에 훈련된 <b>공식 대변인(홍보실장 또는 CEO) 1인</b>만이 공식 마이크를 잡습니다.</li>
          <li>모든 임직원은 "공식 대변인을 통해 상세한 내용을 전달해 드리겠습니다"라고 정중히 응대하고 개별 인터뷰를 엄격히 금지합니다.</li>
          <li>대변인은 현장 기술팀과 법무팀의 팩트체크를 거친 발표문만 낭독합니다.</li>
        </ul>
      </div>
    `,
    coaching: "직원 개인이 개인 SNS에 올린 억울하다는 글 한 줄이 전체 위기를 악화시키는 도화선이 됩니다.",
    jpdcTip: "공사 임직원 행동강령에 위기 발생 시 언론 응대 가이드라인을 정기 교육해야 합니다."
  },
  {
    page: 25,
    module: 3,
    moduleName: "모듈 3: 위기 의사결정 & 골든타임",
    title: "위기 커뮤니케이션 원칙 3 : 투명성과 공감",
    sub: "법적 책임 회피보다 대중의 아픔에 대한 공감이 먼저다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>법무팀의 함정:</b> 법무팀은 배상 책임을 피하기 위해 사과를 꺼리고 "법적으로 문제없다"는 문구를 고집합니다. 이는 여론의 분노를 극대화시킵니다.</p>
        <p>■ 대중은 '법적 유무죄'를 따지기 전에 <b>'이 회사가 피해자에게 진심으로 미안해하는가'</b>를 봅니다.</p>
        <div style="background:#ECFDF5; border-left:4px solid #10B981; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>✨ 성공 공식:</b> 진정성 있는 유감 표명 ➔ 숨김없는 투명한 데이터 공개 ➔ 과도할 정도의 신속한 피해 구제 ➔ 재발 방지 약속
        </div>
      </div>
    `,
    coaching: "'유감스럽게 생각한다'는 영혼 없는 3인칭 표현 대신 '저희의 불찰로 고통을 드려 머리 숙여 사죄드립니다'라는 1인칭 사과가 필요합니다.",
    jpdcTip: "공공기관의 사과는 변명이 아닌 공공의 봉사자로서의 무한 책임을 보여주는 태도여야 합니다."
  },
  {
    page: 26,
    module: 3,
    moduleName: "모듈 3: 위기 의사결정 & 골든타임",
    title: "위기 커뮤니케이션 성공 사례 : 존슨앤존슨 타이레놀 사건",
    sub: "1억 달러의 즉각 손실을 감수하고 100년의 신뢰를 얻다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>사건 개요:</b> 1982년 시카고에서 괴한이 시판 중인 타이레놀에 청산가리를 투입해 7명이 사망하는 초유의 사건 발생.</p>
        <p>■ <b>CEO의 결단:</b></p>
        <ul style="margin:6px 0; padding-left:1.2rem;">
          <li>제조 공정의 문제가 아닌 유통 중 독극물 투입이었음에도 불구하고, 즉시 미국 전역 3,100만 병(약 1억 달러 상당)을 <b>전량 리콜 및 폐기</b>.</li>
          <li>소비자에게 "타이레놀 복용을 즉시 중단하라"고 대대적 광고 집행.</li>
          <li>세계 최초로 3중 밀봉 안전 포장 용기(Tamper-evident)를 개발해 특허를 무상 공개.</li>
        </ul>
        <p>■ <b>결과:</b> 사건 3개월 만에 시장점유율을 100% 회복하며 경영학 역사상 가장 위대한 위기관리 성공 사례로 등극.</p>
      </div>
    `,
    coaching: "존슨앤존슨의 기업 철학인 '우리의 첫 번째 책임은 고객과 환자에게 있다(Our Credo)'가 작동한 순간이었습니다.",
    jpdcTip: "제주삼다수 역시 '도민과 고객의 건강이 1순위'라는 타협할 수 없는 원칙을 행동으로 보여주어야 합니다."
  },
  {
    page: 27,
    module: 3,
    moduleName: "모듈 3: 위기 의사결정 & 골든타임",
    title: "위기 커뮤니케이션 실패 사례 : 남양유업 & 옥시",
    sub: "은폐, 책임 전가, 늑장 사과가 부른 파멸적 결말",
    body: `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:10px;">
        <div style="background:#FEF2F2; border:1px solid #FCA5A5; border-radius:8px; padding:1.2rem;">
          <h4 style="color:#B91C1C; margin:0 0 6px;">남양유업 대리점 밀어내기</h4>
          <p style="font-size:0.85rem; color:#7F1D1D; line-height:1.6; margin:0;">
            • 녹취록 폭로 후에도 "개인 일탈"이라며 책임 전가.<br>
            • 여론이 폭발한 후에야 형식적 대국민 사과문 낭독.<br>
            • <b>결과:</b> 전국적 불매운동 확산, 10년 넘게 이어진 브랜드 이미지 추락 및 결국 경영권 매각.
          </p>
        </div>
        <div style="background:#FEF2F2; border:1px solid #FCA5A5; border-radius:8px; padding:1.2rem;">
          <h4 style="color:#B91C1C; margin:0 0 6px;">옥시 가습기 살균제 참사</h4>
          <p style="font-size:0.85rem; color:#7F1D1D; line-height:1.6; margin:0;">
            • 유해성 연구 보고서 은폐 및 조작 시도.<br>
            • 사건 발생 5년이 지나서야 마지못해 사과.<br>
            • <b>결과:</b> 대표이사 구속, 브랜드 영구 퇴출, 천문학적 배상과 전 국민적 지탄.
          </p>
        </div>
      </div>
    `,
    coaching: "두 실패 사례의 공통점은 '위기 대응의 3대 함정(은폐, 책임회피, 늑장대응)'을 모두 범했다는 점입니다.",
    jpdcTip: "수질 검사나 안전사고 발생 시 단 1%의 은폐 시도도 즉각 중징계하는 내부통제 문화가 필수입니다."
  },
  {
    page: 28,
    module: 4,
    moduleName: "모듈 4: KRI 조기경보 설계",
    title: "핵심리스크지표 (KRI, Key Risk Indicator)란?",
    sub: "사고가 터진 후의 후행지표가 아니라, 이상 징후를 감지하는 사전 체온계",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>KRI의 정의:</b> 리스크가 실제 '사고'로 터지기 전에 미리 경고를 울려주는 <b>사전 관측 선행지표(Leading Indicator)</b>입니다.</p>
        <p>■ <b>체온계 비유:</b> 우리가 열이 나면 독감에 걸렸다는 것을 알고 약을 먹듯, KRI 수치가 치솟으면 리스크 오너가 즉각 비상 대응을 시작합니다.</p>
        <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; padding:1rem; margin-top:10px;">
          <h4 style="margin:0 0 6px; color:#166534;">🌟 훌륭한 KRI의 4대 조건:</h4>
          <ol style="margin:0; padding-left:1.2rem; font-size:0.9rem; color:#14532D;">
            <li><b>정량적 측정 가능:</b> 주관적 느낌이 아닌 숫자로 명확히 산출되어야 함.</li>
            <li><b>정기적 수집 가능:</b> 주간·월간 단위로 데이터 취합이 용이해야 함.</li>
            <li><b>명확한 임계치(Threshold):</b> '몇 % 이상이면 경보'라는 기준치가 사전에 합의되어야 함.</li>
            <li><b>리스크 오너의 확인:</b> 보고서에 묻히지 않고 오너가 매월 직접 보고 결재해야 함.</li>
          </ol>
        </div>
      </div>
    `,
    coaching: "KPI(성과지표)는 목표 달성을 측정하지만, KRI(위험지표)는 파멸을 방지하는 안전벨트입니다.",
    jpdcTip: "공사 전체 KPI에만 매달리지 말고, 사업부별로 핵심 KRI 2~3개를 의무적으로 모니터링해야 합니다."
  },
  {
    page: 29,
    module: 4,
    moduleName: "모듈 4: KRI 조기경보 설계",
    title: "KRI 사례 분석 : 실리콘밸리은행(SVB) 파산",
    sub: "조기경보가 있었다면 36시간 만의 뱅크런은 막을 수 있었다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>SVB의 파산 경위:</b> 미 연준의 급격한 금리 인상으로 보유 채권 가격이 폭락했음에도, 경영진은 위험 신호를 간과하다가 단 36시간 만에 420억 달러의 예금이 빠져나가며 파산했습니다.</p>
        <p>■ <b>사전에 관측 가능했던 KRI 신호들:</b></p>
        <ul style="margin:6px 0; padding-left:1.2rem;">
          <li><b>지표 1:</b> 총자산 대비 미실현 채권 평가손실 비율 (지속적 급등)</li>
          <li><b>지표 2:</b> 25만 달러 초과 무보험 예금 비율 (90% 이상으로 극도로 취약)</li>
          <li><b>지표 3:</b> 트위터/소셜미디어 상의 'SVB 지급 불능' 부정 언급량 폭증</li>
        </ul>
        <div style="background:#FFFBEB; border-left:4px solid #D97706; padding:10px 14px; border-radius:6px; margin-top:10px;">
          <b>💡 교훈:</b> 재무제표의 장부상 숫자만 믿지 말고, 실시간 이상 징후를 추적하는 KRI 조기경보가 있어야 골든타임 내에 자본을 확충할 수 있습니다.
        </div>
      </div>
    `,
    coaching: "디지털 시대의 위기는 과거보다 10배 빠르게 전파됩니다. KRI 모니터링 주기도 빨라져야 합니다.",
    jpdcTip: "제주삼다수 관련 온라인 커뮤니티 부정 키워드 언급량을 주간 단위 KRI로 추적해야 합니다."
  },
  {
    page: 30,
    module: 4,
    moduleName: "모듈 4: KRI 조기경보 설계",
    title: "JPDC 맞춤형 6대 영역 KRI 설계 예시",
    sub: "제주개발공사 사업 특성에 맞춘 실무 조기경보 지표",
    body: `
      <table class="jpdc-slide-table" style="font-size:0.83rem;">
        <thead>
          <tr><th style="width:20%;">리스크 영역</th><th>추천 KRI (사전 관측 선행지표)</th><th>사전 경보 기준 (임계치 예시)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><b>환경·생산 (수자원)</b></td>
            <td>인근 관정 지하수위 변동률 / 원수 취수량 대비 함양 재충전율</td>
            <td><b style="color:#DC2626;">평년 기준 대비 지하수위 10% 이상 하강 시 주의 경보</b></td>
          </tr>
          <tr>
            <td><b>안전·운영 (공장)</b></td>
            <td>현장 '아차사고(Near Miss)' 신고 건수 / 안전점검 시정조치 지연율</td>
            <td><b style="color:#DC2626;">아차사고 신고 건수 전월 대비 급감(은폐 의심) 시 경보</b></td>
          </tr>
          <tr>
            <td><b>시장·유통 (물류)</b></td>
            <td>해상 물류 운임비 변동률 / 수도권 물류센터 재고회전일수</td>
            <td><b style="color:#DC2626;">재고회전일수 15일 이상 지연 또는 운임비 20% 상승 시 경보</b></td>
          </tr>
          <tr>
            <td><b>지배구조·평판</b></td>
            <td>언론·SNS 부정 키워드 언급 지수 / 내부통제 이행 지적 건수</td>
            <td><b style="color:#DC2626;">부정 키워드 언급량 전주 대비 200% 이상 폭증 시 경보</b></td>
          </tr>
          <tr>
            <td><b>정보 인프라</b></td>
            <td>스마트팩토리 핵심 전산망 가동률 / DB 백업 이중화 준수율</td>
            <td><b style="color:#DC2626;">가동률 99.9% 미만 또는 백업 점검 1회 누락 시 경보</b></td>
          </tr>
          <tr>
            <td><b>물류 파트너사</b></td>
            <td>핵심 해운 화물 선사 신용등급 및 부채비율 변동</td>
            <td><b style="color:#DC2626;">파트너 선사 신용등급 1단계 하락 또는 매각설 시 경보</b></td>
          </tr>
        </tbody>
      </table>
    `,
    coaching: "각 조별로 이 6개 영역 중 본인들의 분임 과제에 맞는 KRI를 최소 1개 이상 차용하도록 지도하세요.",
    jpdcTip: "이 KRI 표는 교육 후 즉시 공사의 정기 리스크 관리 위원회 보고 안건으로 상정될 수 있습니다."
  },
  {
    page: 31,
    module: 4,
    moduleName: "모듈 4: KRI 조기경보 설계",
    title: "KRI 설계 유의점: 좋은 KRI vs 나쁜 KRI",
    sub: "측정할 수 없는 지표는 관리할 수 없다",
    body: `
      <table class="jpdc-slide-table">
        <thead>
          <tr><th style="width:50%; background:#FEE2E2; color:#991B1B;">❌ 나쁜 KRI (피해야 할 형식적 예시)</th><th style="background:#DCFCE7; color:#166534;">✅ 좋은 KRI (지향해야 할 실무 지표)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>"위험을 철저히 잘 관리하고 있는가?"<br><small style="color:#991B1B;">➔ 측정 불가능한 추상적·주관적 표현</small></td>
            <td><b>"인근 지하수위 변동률 -10%"</b><br><small style="color:#166534;">➔ 센서 숫자로 명확히 계량 측정 가능</small></td>
          </tr>
          <tr>
            <td>1년에 단 한 번 연말에만 확인 가능한 지표<br><small style="color:#991B1B;">➔ 사고 터진 후 뒷북치는 후행지표</small></td>
            <td><b>"주간/월간 단위로 정기 수집 가능한 지표"</b><br><small style="color:#166534;">➔ 상시 조기경보가 작동하는 선행지표</small></td>
          </tr>
          <tr>
            <td>기준치(Threshold)가 없어 높고 낮음을 모름<br><small style="color:#991B1B;">➔ 경보를 울려야 할 타이밍을 판단 불가</small></td>
            <td><b>"정상 / 주의(10% 하강) / 경고(20% 하강)"</b><br><small style="color:#166534;">➔ 3단계 신호등 체계(Green-Yellow-Red)</small></td>
          </tr>
          <tr>
            <td>보고서 구석에만 존재하고 아무도 안 보는 지표</td>
            <td><b>"리스크 오너가 매월 서명하고 경영진에 보고"</b></td>
          </tr>
        </tbody>
      </table>
    `,
    coaching: "수강생들이 실습할 때 추상적인 말을 쓰면 '그걸 계수기로 측정할 수 있나요?'라고 되물어주세요.",
    jpdcTip: "숫자 1개, 기준치 1개를 명확히 세우는 것이 두꺼운 규정집 100권보다 안전합니다."
  },
  {
    page: 32,
    module: 4,
    moduleName: "모듈 4: KRI 조기경보 설계",
    title: "실무 도구: PESTEL 기반 셀프 체크리스트 & SOP 매뉴얼 (DB 축적형)",
    sub: "목적·방법·이행 3단계 체계로 직군별 선제적 대응 시스템을 현업에 안착시킨다",
    body: `
      <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; padding:1.2rem;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-bottom:12px;">
          <div style="background:#EFF6FF; border-left:4px solid #2563EB; padding:10px 12px; border-radius:6px; font-size:0.83rem;">
            <b style="color:#1D4ED8;">🎯 1. 목적 (Why)</b><br>
            각 직군(수자원·생산·품질, 물류·유통·영업, 안전·IT·기획) 맞춤형 잠재 리스크 선제적 격리 및 대처.
          </div>
          <div style="background:#FFFBEB; border-left:4px solid #F59E0B; padding:10px 12px; border-radius:6px; font-size:0.83rem;">
            <b style="color:#B45309;">⏱️ 2. 방법 (How)</b><br>
            월별·분기별 자율 셀프 체크리스트 점검 (🟢 정상 / 🟡 주의(1차조치) / 🔴 위험(비상가동) 3단계 임계치).
          </div>
          <div style="background:#ECFDF5; border-left:4px solid #10B981; padding:10px 12px; border-radius:6px; font-size:0.83rem;">
            <b style="color:#047857;">💾 3. 이행 (Action & DB)</b><br>
            체크리스트 점검 이력의 실시간 DB 누적 축적으로 상황 발생 시 선제 보고 및 표준대응(SOP) 즉시 실행.
          </div>
        </div>

        <table class="jpdc-slide-table" style="font-size:0.83rem;">
          <thead>
            <tr><th style="width:18%;">직군(조)</th><th style="width:14%;">점검 주기</th><th>PESTEL 핵심 점검 항목</th><th>3단계 조기경보 판정치</th><th>선제적 SOP 및 보고라인</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><b>1조 (수자원·생산)</b></td>
              <td>월별/분기별</td>
              <td>지하수위 급강하 & 패키징 센서 오작동</td>
              <td>🟢 정상 ±3% | 🟡 주의 -10% | 🔴 위험 -20%</td>
              <td>예비 관정 전환 시운전 ➔ 환경기획본부장 긴급보고</td>
            </tr>
            <tr>
              <td><b>2조 (물류·영업)</b></td>
              <td>월별/분기별</td>
              <td>해상 화물선 운임비 인상 & 항만 파업</td>
              <td>🟢 운임 ±5% | 🟡 10% 상승 | 🔴 선박 결항</td>
              <td>복수 선사 스팟 계약 & 내륙 안전재고 25일분 선비축</td>
            </tr>
            <tr>
              <td><b>3조 (안전·IT·기획)</b></td>
              <td>월별/분기별</td>
              <td>중대재해 위험성평가 & ERP 백업 무결성</td>
              <td>🟢 조치 100% | 🟡 2건 미흡 | 🔴 위험 방치</td>
              <td>즉각 작업중지권 ➔ 안전실장 & 사장 핫라인 직보고</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top:10px; font-size:0.84rem; color:#0E7C7B;"><b>🎯 오늘 실습 핵심:</b> 하단 <b>[① PESTEL 분석 탭]</b>에 구축된 <b>'실무 셀프 체크리스트 생성기'</b>에서 우리 조 추천 템플릿을 불러와 DB에 등록하세요.</p>
      </div>
    `,
    coaching: "수강생들이 '체크리스트가 늘어나면 일만 많아진다'고 느끼지 않도록, '사고 한 번으로 직위해제되거나 공사가 마비되는 것을 막아주는 개인의 방탄조끼'임을 각인시키세요.",
    jpdcTip: "하단 실습 도구의 [① PESTEL 분석 도구]를 클릭하면 즉시 나만의 체크리스트를 DB에 축적할 수 있습니다.",
    jumpTab: "pestel"
  },
  {
    page: 33,
    module: 4,
    moduleName: "모듈 4: KRI 조기경보 설계",
    title: "조직 리스크 관리 성숙도 모델 (Maturity Model)",
    sub: "현재 JPDC의 리스크 관리 수준은 어디에 있으며, 어디로 가야 하는가?",
    body: `
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="background:#F1F5F9; padding:10px 14px; border-radius:6px; font-size:0.88rem;">
          <b style="color:#64748B;">1단계: 임시 대응 (Ad-hoc)</b> ➔ 사고가 터진 후에야 허둥지둥 수습. 철저한 부서별 사일로 상태.
        </div>
        <div style="background:#F1F5F9; padding:10px 14px; border-radius:6px; font-size:0.88rem;">
          <b style="color:#64748B;">2단계: 개별 관리 (Managed)</b> ➔ 일부 부서가 각자 안전/품질 규정을 관리하나 전사 통합 체계 부재.
        </div>
        <div style="background:#EFF6FF; border:2px solid #3B82F6; padding:12px 14px; border-radius:6px; font-size:0.92rem;">
          <b style="color:#1D4ED8;">📍 3단계: 표준 정의 (Defined) — [오늘 3회차 교육의 목표 지점]</b><br>
          PESTEL, 5×5 매트릭스, 리스크 등록부, 오너십 등 공통의 ERM 도구와 절차가 전사에 일관되게 정의됨.
        </div>
        <div style="background:#F1F5F9; padding:10px 14px; border-radius:6px; font-size:0.88rem;">
          <b style="color:#64748B;">4단계: 통합 연계 (Integrated)</b> ➔ 리스크 등록부와 KRI가 경영기획실의 예산 및 경영 의사결정과 실시간 연동.
        </div>
        <div style="background:#F1F5F9; padding:10px 14px; border-radius:6px; font-size:0.88rem;">
          <b style="color:#16A34A;">5단계: 최적화 (Optimized)</b> ➔ 리스크를 선제적으로 포착해 새로운 비즈니스 기회(활용)로 전환하는 문화 정착.
        </div>
      </div>
    `,
    coaching: "수강생들에게 '오늘 교육이 1~2단계에 머물던 우리 공사를 3단계 표준 정의 단계로 도약시키는 전환점'임을 강조하세요.",
    jpdcTip: "3단계 정의가 완성되어야 비로소 정부 경영평가에서 최고 등급의 리스크 관리 평가를 받을 수 있습니다."
  },
  {
    page: 34,
    module: 4,
    moduleName: "모듈 4: KRI 조기경보 설계",
    title: "실습 : 우리 조 Top 3 리스크 KRI 및 경고기준 설계",
    sub: "우리 조의 위기를 미리 알려주는 체온계를 만들어보자",
    body: `
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:1.2rem;">
        <h4 style="margin:0 0 10px; color:#14213D;">조별 KRI 설계 워크시트 (15분)</h4>
        <p style="font-size:0.9rem; color:#475569; margin-bottom:12px;">선정된 리스크에 대해 구체적인 선행지표 1~2개와 정상/경보 기준 수치를 결정하세요.</p>
        <table class="jpdc-slide-table">
          <thead>
            <tr><th>리스크명</th><th>추천 KRI (관측 지표)</th><th>경고 기준치 (임계치)</th><th>확인 주기 및 확인자</th></tr>
          </thead>
          <tbody>
            <tr><td><b>수질 오염 우려</b></td><td>유입 원수 탁도 및 전기전도도 변화율</td><td>기준치 대비 15% 급변 시 주의</td><td>매일 자동 측정 / 수질연구원</td></tr>
            <tr><td><b>물류 운송 파업</b></td><td>제주 외항 화물 장치율 및 선박 운항률</td><td>장치율 80% 초과 시 경보</td><td>주간 점검 / 물류지원팀장</td></tr>
            <tr><td><b>공공기관 감사 지적</b></td><td>일상감사 지적 건수 및 계약 절차 위반율</td><td>분기 3건 초과 시 주의</td><td>월간 점검 / 기획감사팀장</td></tr>
          </tbody>
        </table>
      </div>
    `,
    coaching: "수치화하기 어려워하는 조에게는 '전년 동기 대비 증감률'이나 '일정 지연 일수'를 권장하세요.",
    jpdcTip: "하단의 [② SWOT-Risk] 탭과 [③ 5×5 매트릭스]에서 등록한 리스크와 일치시켜 작성합니다.",
    jumpTab: "swot"
  },
  {
    page: 35,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "3강 실무 연계 종합 흐름도",
    sub: "위험 식별부터 상시 모니터링까지 완성된 체인",
    body: `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-top:1.5rem;">
        <div class="jpdc-flow-card" style="flex:1; min-width:140px; background:#14213D; color:#fff; padding:14px; border-radius:8px; text-align:center;">
          <div style="color:#C9A227; font-weight:700; font-size:0.8rem;">1단계 (2강 결과)</div>
          <div style="font-weight:800; font-size:1.05rem;">Top Risk</div>
          <div style="font-size:0.75rem; color:#94A3B8;">우선순위 도출</div>
        </div>
        <div style="font-size:1.5rem; color:#0E7C7B; font-weight:bold;">➔</div>
        <div class="jpdc-flow-card" style="flex:1; min-width:140px; background:#14213D; color:#fff; padding:14px; border-radius:8px; text-align:center;">
          <div style="color:#C9A227; font-weight:700; font-size:0.8rem;">2단계</div>
          <div style="font-weight:800; font-size:1.05rem;">대응전략 선택</div>
          <div style="font-size:0.75rem; color:#94A3B8;">회피·감축·공유·수용·활용</div>
        </div>
        <div style="font-size:1.5rem; color:#0E7C7B; font-weight:bold;">➔</div>
        <div class="jpdc-flow-card" style="flex:1; min-width:140px; background:#14213D; color:#fff; padding:14px; border-radius:8px; text-align:center;">
          <div style="color:#C9A227; font-weight:700; font-size:0.8rem;">3단계</div>
          <div style="font-weight:800; font-size:1.05rem;">오너 & R&R</div>
          <div style="font-size:0.75rem; color:#94A3B8;">보고라인 문서화</div>
        </div>
        <div style="font-size:1.5rem; color:#0E7C7B; font-weight:bold;">➔</div>
        <div class="jpdc-flow-card" style="flex:1; min-width:140px; background:#14213D; color:#fff; padding:14px; border-radius:8px; text-align:center;">
          <div style="color:#C9A227; font-weight:700; font-size:0.8rem;">4단계</div>
          <div style="font-weight:800; font-size:1.05rem;">KRI 조기경보</div>
          <div style="font-size:0.75rem; color:#94A3B8;">임계치 설정</div>
        </div>
        <div style="font-size:1.5rem; color:#0E7C7B; font-weight:bold;">➔</div>
        <div class="jpdc-flow-card" style="flex:1; min-width:140px; background:#0E7C7B; color:#fff; padding:14px; border-radius:8px; text-align:center;">
          <div style="color:#FDE047; font-weight:700; font-size:0.8rem;">5단계</div>
          <div style="font-weight:800; font-size:1.05rem;">상시 모니터링</div>
          <div style="font-size:0.75rem; color:#E2E8F0;">분기별 재평가</div>
        </div>
      </div>
    `,
    coaching: "이 5단계 체인이 하나라도 끊어지면 리스크 관리는 작동하지 않습니다.",
    jpdcTip: "하단의 [④ 프로세스 흐름도] 탭과 완벽하게 일치하는 전체 아키텍처입니다.",
    jumpTab: "flow"
  },
  {
    page: 36,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "실습 ③ 종합 시나리오 (1/5) : 위기 시나리오 구체화",
    sub: "(10분) 2강 도출 Top Risk 중 1개를 골라 생생한 위기 상황을 작성한다",
    body: `
      <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; padding:1.2rem;">
        <h4 style="margin:0 0 8px; color:#14213D;">시나리오 작성 가이드:</h4>
        <p style="font-size:0.9rem; color:#475569; margin-bottom:12px;">'언제, 어디서, 어떤 복합적 요인으로 우리 공사에 치명적 타격이 발생하는가?'를 뉴스 속보 헤드라인처럼 구체적으로 묘사하세요.</p>
        <div style="background:#FFFBEB; border-left:4px solid #D97706; padding:10px 14px; border-radius:6px; font-size:0.88rem;">
          <b>작성 예시:</b><br>
          "2027년 여름 제주 전역에 60일간 기록적 가뭄이 지속되어 지하수 취수 허가량이 20% 긴급 감축된 상황에서, 폭염으로 수도권 생수 주문량이 폭증하고 해상 화물선마저 고장으로 결항되어 편의점 결품 사태와 고객 항의가 동시 폭발하는 위기 상황."
        </div>
      </div>
    `,
    coaching: "시나리오가 현실적이고 가혹할수록 수강생들의 몰입도와 대응책의 질이 급상승합니다.",
    jpdcTip: "실제 제주 기후 데이터와 삼다수 성수기 물류 병목 현상을 조합하여 시나리오를 작성하세요."
  },
  {
    page: 37,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "실습 ③ 종합 시나리오 (2/5) : 대응전략 선택",
    sub: "(15분) 해당 시나리오를 막기 위한 최선의 전략과 실행 조치",
    body: `
      <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; padding:1.2rem;">
        <h4 style="margin:0 0 8px; color:#14213D;">작성 양식:</h4>
        <table class="jpdc-slide-table">
          <thead>
            <tr><th style="width:25%;">선택 대응 전략</th><th style="width:35%;">전략 선택 이유</th><th>구체적 사전/사후 실행 조치</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><b>감축(Reduce) + 공유(Share)</b></td>
              <td>자연재해(가뭄)는 회피할 수 없으므로 내부 생산 통제(감축)와 외부 물류 제휴(공유)가 필수적임</td>
              <td>
                1. 인공함양 지하수 지하 댐 즉시 가동<br>
                2. 육상 내륙 물류 거점 비축 물량 긴급 방출<br>
                3. 예비 화물선 투입 긴급 협약 발효
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    coaching: "단일 전략만 고집하지 말고 필요하면 '감축+공유' 등 복합 전략을 허용하세요.",
    jpdcTip: "실행 조치에는 반드시 '예산'과 '사전 계약'이 수반되어야 실효성이 있습니다."
  },
  {
    page: 38,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "실습 ③ 종합 시나리오 (3/5) : 리스크 오너 및 R&R 배정",
    sub: "누가(오너), 무엇을(역할), 어느 부서와 협력하여 실행하는가?",
    body: `
      <table class="jpdc-slide-table">
        <thead>
          <tr><th style="width:20%;">구분 역할</th><th style="width:25%;">담당 직책 / 부서</th><th>구체적 책임 내용 및 협업 행동</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><b style="color:#DC2626;">리스크 오너</b></td>
            <td><b>생산총괄팀장</b></td>
            <td>가뭄 단계별 취수 라인 조정, 비상 생산 스케줄 수립 및 일일 보고 총괄</td>
          </tr>
          <tr>
            <td><b>협업 부서 1</b></td>
            <td>물류운영팀장</td>
            <td>도내 보관 창고 재고 전량 파악, 대체 카페리 선박 긴급 선적 조율</td>
          </tr>
          <tr>
            <td><b>협업 부서 2</b></td>
            <td>영업마케팅팀장</td>
            <td>주요 대형마트 및 편의점 유통 채널 출하 할당제 시행 및 양해 공문 발송</td>
          </tr>
          <tr>
            <td><b>협업 부서 3</b></td>
            <td>홍보소통팀장</td>
            <td>원수 보존을 위한 공사의 노력과 과학적 취수 현황 언론 투명 브리핑</td>
          </tr>
        </tbody>
      </table>
    `,
    coaching: "특정 한 부서에만 일이 몰리지 않도록 타 부서 R&R을 강제 배정하도록 코칭하세요.",
    jpdcTip: "이 R&R 표는 실제 JPDC 재난대책본부 가동 매뉴얼의 뼈대가 됩니다."
  },
  {
    page: 39,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "실습 ③ 종합 시나리오 (4/5) : KRI 설정",
    sub: "(10분) 위기 시나리오를 최소 2주 전에 감지할 조기경보 지표 설정",
    body: `
      <table class="jpdc-slide-table">
        <thead>
          <tr><th style="width:25%;">KRI (선행 관측 지표)</th><th style="width:30%;">경고 기준치 (임계 수치)</th><th>확인 주기 및 모니터링 담당</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><b>1. 관정 지하수위 하강률</b></td>
            <td>평년 대비 -8% (주의) / -15% (심각 경보)</td>
            <td>매일 자동 원격 감시 / 수자원연구팀</td>
          </tr>
          <tr>
            <td><b>2. 내륙 물류거점 안전재고 일수</b></td>
            <td>적정 15일 대비 7일 미만 하락 시 경보</td>
            <td>주 2회 점검 / 물류지원팀</td>
          </tr>
        </tbody>
      </table>
      <div style="background:#F0FDF4; border-left:4px solid #16A34A; padding:10px 14px; border-radius:6px; margin-top:10px; font-size:0.88rem;">
        <b>체크:</b> 이 지표는 사고가 터진 후의 숫자가 아닌, <b>사고를 미리 막을 수 있는 골든타임 선행 신호</b>인가?
      </div>
    `,
    coaching: "경고 기준치가 도달했을 때 '누가 보고서를 누구에게 보낼 것인가'까지 확인하세요.",
    jpdcTip: "환경부 및 제주도 지하수 관리 시스템과의 데이터 실시간 연동 여부를 체크합니다."
  },
  {
    page: 40,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "실습 ③ 종합 시나리오 (5/5) : 조별 최종 5분 라이브 피칭",
    sub: "조당 5분씩 발표: 시나리오 ➔ 대응전략 ➔ R&R ➔ KRI 순서",
    body: `
      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:1.2rem;">
        <h4 style="margin:0 0 10px; color:#14213D;">발표 채점 및 동료 평가 3대 기준:</h4>
        <div style="display:flex; flex-direction:column; gap:8px; font-size:0.9rem;">
          <div style="background:#FFF; padding:10px 14px; border-radius:6px; border:1px solid #E2E8F0;">
            <b>1. 오너십의 명확성:</b> "누가 결정하는가?"가 특정 직책으로 명확히 드러났는가?
          </div>
          <div style="background:#FFF; padding:10px 14px; border-radius:6px; border:1px solid #E2E8F0;">
            <b>2. 전사 협업의 정합성:</b> 사일로를 깨고 관련 부서가 유기적으로 엮여 있는가?
          </div>
          <div style="background:#FFF; padding:10px 14px; border-radius:6px; border:1px solid #E2E8F0;">
            <b>3. KRI의 측정 가능성:</b> 숫자로 사전에 관측할 수 있는 실효성 있는 지표인가?
          </div>
        </div>
      </div>
    `,
    coaching: "발표 후 타 조 수강생들이 날카로운 질문을 1개씩 던지도록 유도해 참여도를 높이세요.",
    jpdcTip: "하단의 [⑤ 10인 실시간 현황판]을 스크린에 띄워두고 각 수강생의 입력 현황과 함께 발표를 진행합니다.",
    jumpTab: "overview"
  },
  {
    page: 41,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "강사 진행 메모 : 실습 ③ 관찰 & 코칭 포인트",
    sub: "수강생들의 실무 역량을 한 단계 끌어올리는 퍼실리테이션 팁",
    body: `
      <div style="background:#FFFBEB; border:1px solid #FCD34D; border-radius:10px; padding:1.2rem; font-size:0.92rem; line-height:1.7;">
        <ul style="margin:0; padding-left:1.2rem; color:#92400E;">
          <li><b>코칭 1:</b> 발표 중 특정 부서에만 업무가 쏠려 있으면, <i>"이 상황이 실제로 벌어지면 물류·수출·계약·홍보 중 누가 제일 먼저 움직여야 할까요?"</i>라고 되물어 전사적 R&R을 유도합니다.</li>
          <li><b>코칭 2:</b> KRI가 지나치게 추상적(예: '위험 징후 관찰')이면, <i>"현장 반장님이 숫자로 어떻게 계측할 수 있을까요?"</i>라고 구체화를 요구합니다.</li>
          <li><b>코칭 3:</b> 시간이 촉박할 경우 시나리오와 대응전략까지만 발표하고 KRI는 사후 과제로 남겨도 무방합니다. <b>완성도보다 '사고의 흐름 체득'이 최우선</b>입니다.</li>
        </ul>
      </div>
    `,
    coaching: "강사는 심사위원이 아니라 '부서 간 대화를 촉진하는 중재자' 역할을 수행합니다.",
    jpdcTip: "관리자 교육에서는 정답을 주는 것보다 올바른 질문을 던지는 것이 훨씬 큰 울림을 줍니다."
  },
  {
    page: 42,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "3회차 전 과정 총정리 : COSO ERM 5대 요소로 되짚기",
    sub: "우리가 3회에 걸쳐 실습한 모든 과정은 국제 표준 프레임워크와 정확히 일치합니다",
    body: `
      <table class="jpdc-slide-table">
        <thead>
          <tr><th style="width:28%;">COSO ERM 5대 핵심 요소</th><th>3회차 교육 동안 JPDC 관리자들이 실제로 수행한 실습</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><b>① 지배구조와 문화 (Governance & Culture)</b></td>
            <td>3회에 걸친 의도적 조재편성을 통해 '부서 이기주의를 부수고 전사 리스크를 공유하는 문화'를 체험했다.</td>
          </tr>
          <tr>
            <td><b>② 전략과 목표 수립 (Strategy & Objective)</b></td>
            <td>SWOT-Risk 연계를 통해 공사의 강점과 약점을 위험과 기회 관점에서 전략적으로 재해석했다.</td>
          </tr>
          <tr>
            <td><b>③ 수행 (Performance)</b></td>
            <td>PESTEL 6축 스캔과 5×5 매트릭스로 위험을 식별·평가하고, 5대 대응 전략을 수립했다.</td>
          </tr>
          <tr>
            <td><b>④ 검토와 수정 (Review & Revision)</b></td>
            <td>KRI(핵심리스크지표)를 통한 사전 조기경보와 정기적 재평가 모니터링 시스템을 설계했다.</td>
          </tr>
          <tr>
            <td><b>⑤ 정보·소통·보고 (Information & Reporting)</b></td>
            <td>24시간 위기 커뮤니케이션 원칙과 리스크 오너 보고라인을 통해 조직 내 정보 전달 체계를 확립했다.</td>
          </tr>
        </tbody>
      </table>
    `,
    coaching: "수강생들에게 '여러분은 오늘 4시간 만에 글로벌 포춘 500대 기업들이 수억 원을 들여 구축하는 COSO ERM 전체 프레임워크를 직접 손으로 완성하셨습니다'라고 칭찬하세요.",
    jpdcTip: "이 5대 요소 매핑표는 공사의 중장기 경영계획서 내 '리스크 관리 전략' 챕터에 그대로 인용 가능합니다."
  },
  {
    page: 43,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "3회차 등장 12개 실전 사례 총망라 매트릭스",
    sub: "1강부터 3강까지 다룬 12개 사례의 학습 여정",
    body: `
      <table class="jpdc-slide-table" style="font-size:0.8rem;">
        <thead>
          <tr><th>사례명</th><th>1강 (위험 식별)</th><th>2강 (위험 평가)</th><th>3강 (실행 및 대응)</th></tr>
        </thead>
        <tbody>
          <tr><td><b>LH 투기 사태</b></td><td>공공기관 리스크 개요 및 재해석</td><td>SWOT-Risk 약점/위협 연계</td><td>부서 간 정보 단절(Silo)의 대가</td></tr>
          <tr><td><b>강원랜드 채용비리</b></td><td>COSO 내부통제 매핑</td><td>3중 방어선(Three Lines) 모델</td><td>리스크 오너 및 감사 보고라인</td></tr>
          <tr><td><b>원전부품 위조</b></td><td>통제 결함과 품질 리스크</td><td>5×5 매트릭스 치명적 위험 분류</td><td>감축(Reduce): 통제를 실제로 작동시키기</td></tr>
          <tr><td><b>4대강 사업</b></td><td>전략 단계 리스크 질문</td><td>PESTEL (P/정치 & 환경 요인)</td><td>회피(Avoid): 멈출 줄 아는 경영적 결단</td></tr>
          <tr><td><b>한국전력 재무위기</b></td><td>공공요금 원가와 근본 원인</td><td>발생가능성·영향도 평가</td><td>공유(Share): 정책적 리스크 분담 구조</td></tr>
          <tr><td><b>후쿠시마 원전</b></td><td>자연재해 ➔ 설비 ➔ 원전 연쇄 위험</td><td>최악의 시나리오 매트릭스</td><td>감축(Reduce): 설계 기준의 극단적 상향</td></tr>
          <tr><td><b>타이레놀 사건</b></td><td>고객 중심 신뢰 원칙</td><td>-</td><td>위기 커뮤니케이션 성공 & 24시간 골든타임</td></tr>
          <tr><td><b>한진해운 파산</b></td><td>물류 공급망 붕괴 충격</td><td>PESTEL (E/경제 요인)</td><td>공유(Share): 복수 선사 컨소시엄 분산</td></tr>
          <tr><td><b>카카오 DC 화재</b></td><td>디지털 인프라 독점 위험</td><td>PESTEL (T/기술 요인)</td><td>활용(Exploit): DR 이중화 투자를 경쟁력화</td></tr>
          <tr><td><b>쿠팡 물류센터 화재</b></td><td>안전 법률 규제 강화</td><td>PESTEL (T·Env) & 매트릭스</td><td>감축(Reduce): 물리적 적재 구조 개선</td></tr>
          <tr><td><b>SVB 파산</b></td><td>금리 리스크 전파 속도</td><td>SNS 속도와 뱅크런 평가</td><td>KRI(핵심리스크지표) 사전 조기경보 설계</td></tr>
          <tr><td><b>보잉 737 MAX</b></td><td>소프트웨어 단일 센서 결함</td><td>통제의 '존재' vs '작동' 검증</td><td>감축(Reduce): 센서 다중화 및 재교육</td></tr>
        </tbody>
      </table>
    `,
    coaching: "12개 사례가 어떻게 1강-2강-3강을 거쳐 일관된 논리로 귀결되는지 총정리해 줍니다.",
    jpdcTip: "이 12개 사례의 교훈집을 공사 인트라넷 교육 자료로 영구 게시할 것을 권장합니다."
  },
  {
    page: 44,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "3강 정리 성찰 : 생각해보기 4대 질문",
    sub: "관리자로서 현업에 복귀하기 전 스스로에게 던지는 질문",
    body: `
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:10px;">
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:12px 16px; border-radius:8px;">
          <b style="color:#14213D;">질문 1:</b> 5가지 대응 전략(회피·감축·공유·수용·활용) 중 우리 제주개발공사가 <b>가장 소홀히 다루고 있는 전략</b>은 무엇인가?
        </div>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:12px 16px; border-radius:8px;">
          <b style="color:#14213D;">질문 2:</b> 우리 조직에서 분명히 중대한 위험인데 <b>'아무도 오너(책임자)가 되지 않으려는 리스크'</b>가 있다면 무엇인가?
        </div>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:12px 16px; border-radius:8px;">
          <b style="color:#14213D;">질문 3:</b> 내일 당장 대형 수질·안전 사고가 터진다면, <b>우리 공사의 공식 대변인은 단 1인으로 정해져 있는가?</b>
        </div>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:12px 16px; border-radius:8px;">
          <b style="color:#14213D;">질문 4:</b> 오늘 우리가 설계한 KRI 조기경보 지표 중, <b>다음 주 월요일부터 즉시 엑셀이나 시스템으로 측정 가능한 것</b>은 몇 개인가?
        </div>
      </div>
    `,
    coaching: "시간이 허락한다면 조별로 1개 질문씩 골라 1분 스피치를 진행하세요.",
    jpdcTip: "질문 2번(오너 없는 리스크)을 찾아내어 이번 교육을 통해 주인을 찾아주는 것이 최대 성과입니다."
  },
  {
    page: 45,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "교육 이후 실행 로드맵 : 다음 주부터 실천할 4단계",
    sub: "교육장은 끝났지만, 실제 리스크 관리는 이제부터 시작입니다",
    body: `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-top:10px;">
        <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:8px; padding:1.2rem;">
          <h4 style="color:#1D4ED8; margin:0 0 6px;">1주 이내</h4>
          <p style="font-size:0.88rem; color:#1E3A8A; margin:0;">
            오늘 작성한 조별 <b>리스크 등록부(Risk Register)</b>를 각 부서장 및 팀원들과 공유하고 실행안으로 다듬는다.
          </p>
        </div>
        <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; padding:1.2rem;">
          <h4 style="color:#15803D; margin:0 0 6px;">1개월 이내</h4>
          <p style="font-size:0.88rem; color:#14532D; margin:0;">
            전사 리스크 목록을 컨트롤타워(기획처)로 일원화 취합하고, <b>정기 ERM 협의체</b> 가동 여부를 경영진에 보고한다.
          </p>
        </div>
        <div style="background:#FFFBEB; border:1px solid #FCD34D; border-radius:8px; padding:1.2rem;">
          <h4 style="color:#B45309; margin:0 0 6px;">분기 1회</h4>
          <p style="font-size:0.88rem; color:#78350F; margin:0;">
            Top Risk의 5×5 점수와 <b>KRI(조기경보) 수치를 재평가</b>하여 이사회 및 사장에게 정기 보고한다.
          </p>
        </div>
        <div style="background:#FAF5FF; border:1px solid #E9D5FF; border-radius:8px; padding:1.2rem;">
          <h4 style="color:#7E22CE; margin:0 0 6px;">반기 1회</h4>
          <p style="font-size:0.88rem; color:#581C87; margin:0;">
            PESTEL 거시환경과 SWOT-Risk를 재스캔하여, <b>새롭게 등장한 미지의 위험</b>이 없는지 전사 워크숍을 연다.
          </p>
        </div>
      </div>
    `,
    coaching: "로드맵이 구체적이어야 교육이 '일회성 행사'로 끝나지 않고 조직에 뿌리내립니다.",
    jpdcTip: "이 4단계 로드맵을 공사 업무계획에 정식 반영하도록 기획부서와 사전 조율하세요."
  },
  {
    page: 46,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "강사 총평 및 마무리 메시지",
    sub: "관리자의 안목이 제주개발공사의 백년대계를 결정합니다",
    body: `
      <div style="background:linear-gradient(135deg, #14213D 0%, #0E7C7B 100%); color:#FFFFFF; border-radius:12px; padding:2rem; margin-top:10px;">
        <h3 style="color:#00F0FF; margin:0 0 14px; font-size:1.3rem;">✓ 전사적 리스크 관리는 두꺼운 보고서가 아닙니다</h3>
        <p style="font-size:1.05rem; line-height:1.8; margin:0 0 14px; color:#E2E8F0;">
          진정한 ERM은 캐비닛에 모셔두는 매뉴얼이 아니라, <b>부서 간 대화 속에서 서로 다른 시각을 맞대고 부서의 경계를 허무는 협업의 과정 그 자체</b>입니다.
        </p>
        <p style="font-size:1.05rem; line-height:1.8; margin:0 0 14px; color:#E2E8F0;">
          위험(Risk)을 회피하는 데 급급하지 않고, 선제적 통제와 담대한 혁신으로 기회(Opportunity)로 바꾸어내는 관리자의 안목—그것이 제주삼다수와 JPDC의 지속가능한 미래를 만듭니다.
        </p>
        <p style="font-size:1rem; font-weight:700; color:#FDE047; margin:0;">
          3회에 걸쳐 열정적으로 함께해주신 10분의 관리자 여러분께 진심으로 감사드립니다!
        </p>
      </div>
    `,
    coaching: "기립 박수와 함께 수강생들의 노고를 치하하며 감동적으로 마무리합니다.",
    jpdcTip: "10명의 관리자 전원에게 실천 서약을 받는 이벤트로 연결해도 좋습니다."
  },
  {
    page: 47,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "3강 학습목표 달성 자가진단 (Self-Assessment)",
    sub: "오늘 교육을 통해 내가 직접 습득하고 실행할 수 있는 역량 점검",
    body: `
      <div style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; padding:1.5rem;">
        <h4 style="margin:0 0 12px; color:#14213D;">아래 4개 항목을 직접 클릭하여 달성 여부를 체크해 보세요:</h4>
        <div style="display:flex; flex-direction:column; gap:10px; font-size:0.95rem;">
          <label style="display:flex; align-items:center; gap:10px; cursor:pointer; background:#fff; padding:10px 14px; border-radius:6px; border:1px solid #E2E8F0;">
            <input type="checkbox" id="check1" onchange="updateSelfCheck()" style="width:18px; height:18px;">
            <span><b>1.</b> COSO ERM 5가지 리스크 대응전략(회피·감축·공유·수용·활용)의 개념과 선택 기준을 설명할 수 있다.</span>
          </label>
          <label style="display:flex; align-items:center; gap:10px; cursor:pointer; background:#fff; padding:10px 14px; border-radius:6px; border:1px solid #E2E8F0;">
            <input type="checkbox" id="check2" onchange="updateSelfCheck()" style="width:18px; height:18px;">
            <span><b>2.</b> 우리 조 Top Risk에 구체적인 직책의 리스크 오너와 비상 보고라인을 지정했다.</span>
          </label>
          <label style="display:flex; align-items:center; gap:10px; cursor:pointer; background:#fff; padding:10px 14px; border-radius:6px; border:1px solid #E2E8F0;">
            <input type="checkbox" id="check3" onchange="updateSelfCheck()" style="width:18px; height:18px;">
            <span><b>3.</b> 위기 커뮤니케이션 3원칙(24시간 골든타임, 원보이스, 투명성)을 이해하고 설명할 수 있다.</span>
          </label>
          <label style="display:flex; align-items:center; gap:10px; cursor:pointer; background:#fff; padding:10px 14px; border-radius:6px; border:1px solid #E2E8F0;">
            <input type="checkbox" id="check4" onchange="updateSelfCheck()" style="width:18px; height:18px;">
            <span><b>4.</b> 사전에 이상 징후를 계량 측정할 수 있는 유효한 KRI(핵심리스크지표)를 최소 1개 이상 설계했다.</span>
          </label>
        </div>
        <div id="selfCheckResult" style="margin-top:14px; font-size:0.95rem; font-weight:700; color:#0E7C7B;">
          (4개 항목을 모두 체크하면 마스터 수료 배지가 활성화됩니다)
        </div>
      </div>
    `,
    coaching: "체크박스를 수강생들이 직접 화면에서 누르게 하여 성취감을 고취시킵니다.",
    jpdcTip: "이 4개 항목을 모두 통과하면 공사의 사내 ERM 마스터 퍼실리테이터 자격이 부여됩니다."
  },
  {
    page: 48,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "질문과 답변 (Q&A) & 현장 컨설팅",
    sub: "실무 적용 과정에서 마주칠 난관과 궁금증을 해소합니다",
    body: `
      <div style="font-size:0.95rem; line-height:1.7;">
        <p>■ <b>현업 적용 Q&A:</b> "우리 부서 업무는 특수해서 KRI 측정이 어려운데 어떻게 해야 할까요?", "오너 지정을 팀원들이 부담스러워할 때 어떻게 설득할까요?" 등 현장 고민 환영.</p>
        <p>■ <b>교육 종료 후 지원:</b> 교육이 끝난 후에도 실제 부서 리스크 등록부 작성 시 자문과 컨설팅 채널이 열려 있습니다.</p>
        <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:8px; padding:1rem; margin-top:12px;">
          <b>📧 리스크 관리 컨설팅 및 교안 문의:</b> bluerain1026@gmail.com (정우진 AI STRATEGIST)
        </div>
      </div>
    `,
    coaching: "마지막 질문 시간에는 수강생의 현실적 고충을 충분히 경청하고 공감해 줍니다.",
    jpdcTip: "교육 후 사내 인트라넷 Q&A 게시판을 개설하여 지속적인 질문을 받는 것을 추천합니다."
  },
  {
    page: 49,
    module: 5,
    moduleName: "모듈 5: 종합 워크숍 & 총정리",
    title: "모바일 QR코드 및 실습 도구 즉시 접속",
    sub: "스마트폰 카메라로 스캔하여 실시간 10인 대시보드 열기",
    body: `
      <div style="text-align:center; padding:1rem;">
        <p style="font-size:1rem; color:#1E293B; margin-bottom:1rem;">
          수강생 여러분의 스마트폰 카메라로 아래 QR코드를 비추면<br>
          <b>별도 앱 설치 없이 본 실습 포털(PESTEL · SWOT · 5×5 Matrix)로 즉시 접속</b>됩니다.
        </p>
        <img src="assets/images/jpdc_erm_qr.png" alt="JPDC ERM QR Code" style="width:200px; height:200px; border:1px solid #CBD5E1; border-radius:12px; padding:8px; background:#fff; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        <p style="margin-top:12px; font-size:0.95rem; color:#2563EB; font-weight:700;">
          접속 주소: <a href="lecture-jpdc.html" target="_blank" style="color:#2563EB; text-decoration:underline;">https://www.cloudbread.me/lecture-jpdc.html</a>
        </p>
        <div style="margin-top:1.5rem;">
          <a href="#jpdc-app" class="jpdc-btn gold" style="font-size:1rem; padding:10px 24px;"><i class="fa-solid fa-play"></i> 아래 10인 실시간 실습 도구로 이동하기 ↓</a>
        </div>
      </div>
    `,
    coaching: "발표 시간이나 실습 시간에 스마트폰으로 각자 입력하도록 QR코드를 스크린에 띄워둡니다.",
    jpdcTip: "PC와 스마트폰이 실시간으로 동기화되므로 이동 중이나 현장에서도 실습에 참여할 수 있습니다.",
    jumpTab: "overview"
  }
];

let currentSlideIndex = 1;

function renderSlide(pageNumber) {
  if (pageNumber < 1) pageNumber = 1;
  if (pageNumber > COURSEWARE_SLIDES.length) pageNumber = COURSEWARE_SLIDES.length;
  currentSlideIndex = pageNumber;

  const slide = COURSEWARE_SLIDES[pageNumber - 1];
  const viewport = document.getElementById("slideViewport");
  if (!viewport || !slide) return;

  // Update Slide Counter & Select Box
  const counterEl = document.getElementById("cwSlideCounter");
  if (counterEl) counterEl.textContent = `Slide ${slide.page} / ${COURSEWARE_SLIDES.length}`;

  const selectEl = document.getElementById("slideQuickSelect");
  if (selectEl) selectEl.value = slide.page;

  // Update Module Tab Buttons
  for (let m = 1; m <= 5; m++) {
    const btn = document.getElementById(`modBtn${m}`);
    if (btn) btn.classList.toggle("active", slide.module === m);
  }

  // Prev / Next button state
  const prevBtn = document.getElementById("btnPrevSlide");
  const nextBtn = document.getElementById("btnNextSlide");
  if (prevBtn) prevBtn.disabled = (slide.page === 1);
  if (nextBtn) nextBtn.disabled = (slide.page === COURSEWARE_SLIDES.length);

  // Jump to practice tab button HTML if applicable
  let jumpButtonHtml = "";
  if (slide.jumpTab) {
    jumpButtonHtml = `
      <button class="jpdc-btn gold sm" onclick="jumpToPracticeTab('${slide.jumpTab}')" style="margin-left:auto;">
        <i class="fa-solid fa-arrow-down"></i> 관련 실습 도구 즉시 열기 (${getTabName(slide.jumpTab)})
      </button>
    `;
  }

  viewport.innerHTML = `
    <div class="jpdc-slide-top-meta">
      <span class="jpdc-badge" style="background:#14213D; font-size:12px; padding:4px 10px;">${slide.moduleName}</span>
      <span style="font-size:0.85rem; font-weight:700; color:#64748B;">Page ${slide.page} of ${COURSEWARE_SLIDES.length}</span>
      ${jumpButtonHtml}
    </div>

    <h3 class="jpdc-slide-title">
      <span style="color:#0E7C7B;">[P.${slide.page}]</span> ${slide.title}
    </h3>
    <div style="font-size:1.02rem; font-weight:600; color:#0E7C7B; margin-bottom:1.2rem;">${slide.sub}</div>

    <div class="jpdc-slide-content-box">
      ${slide.body}
    </div>

    ${slide.coaching ? `
      <div class="jpdc-cw-coach-box">
        <strong><i class="fa-solid fa-chalkboard-user"></i> 강사 코칭 포인트 & 수강생 참여 유도 팁:</strong>
        <div>${slide.coaching}</div>
      </div>
    ` : ''}

    ${slide.jpdcTip ? `
      <div class="jpdc-cw-jpdc-box">
        <strong><i class="fa-solid fa-water"></i> 제주개발공사(JPDC) 현업 적용 Action Item:</strong>
        <div>${slide.jpdcTip}</div>
      </div>
    ` : ''}
  `;
}

function prevSlide() {
  if (currentSlideIndex > 1) {
    renderSlide(currentSlideIndex - 1);
  }
}

function nextSlide() {
  if (currentSlideIndex < COURSEWARE_SLIDES.length) {
    renderSlide(currentSlideIndex + 1);
  }
}

function jumpToSlide(pageNumber) {
  renderSlide(pageNumber);
}

function jumpToModule(modNumber) {
  const modStarts = { 1: 1, 2: 17, 3: 21, 4: 28, 5: 35 };
  if (modStarts[modNumber]) {
    renderSlide(modStarts[modNumber]);
  }
}

function jumpToPracticeTab(tabId) {
  const tabBtn = document.querySelector(`.tabbtn[data-tab="${tabId}"]`);
  if (tabBtn) {
    tabBtn.click();
  }
  if (typeof toggleGuideBanner === 'function') {
    toggleGuideBanner(true);
  }
  const appEl = document.getElementById("jpdc-app");
  if (appEl) {
    appEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function getTabName(tabId) {
  switch (tabId) {
    case 'pestel': return '① PESTEL 분석';
    case 'swot': return '② SWOT-Risk';
    case 'matrix': return '③ 5×5 매트릭스';
    case 'overview': return '⑤ 10인 실시간 종합';
    case 'flow': return '④ 프로세스 흐름도';
    default: return '실습 도구';
  }
}

function updateSelfCheck() {
  const c1 = document.getElementById("check1")?.checked;
  const c2 = document.getElementById("check2")?.checked;
  const c3 = document.getElementById("check3")?.checked;
  const c4 = document.getElementById("check4")?.checked;
  const resEl = document.getElementById("selfCheckResult");
  if (!resEl) return;

  const count = [c1, c2, c3, c4].filter(Boolean).length;
  if (count === 4) {
    resEl.innerHTML = `<span style="color:#059669; font-size:1.05rem;">🎉 축하합니다! 4대 핵심 학습목표를 모두 달성하여 <b>[JPDC ERM 관리자 마스터 자격]</b>을 획득하셨습니다!</span>`;
  } else {
    resEl.textContent = `현재 4개 중 ${count}개 항목 달성 완료 (${count}/4)`;
  }
}

function initCourseware() {
  const selectEl = document.getElementById("slideQuickSelect");
  if (selectEl) {
    selectEl.innerHTML = "";
    COURSEWARE_SLIDES.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.page;
      opt.textContent = `P.${s.page} - ${s.title.substring(0, 24)}...`;
      selectEl.appendChild(opt);
    });
  }

  // Render first slide
  renderSlide(1);
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCourseware);
} else {
  initCourseware();
}
