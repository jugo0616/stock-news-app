// ===========================
// Sample Data for Demo Mode
// ===========================

const SAMPLE_DATA = {
  us: {
    sectors: [
      { id: 'ai', name: '인공지능', interest: 98, change: 15 },
      { id: 'tech', name: '기술', interest: 95, change: 12 },
      { id: 'semiconductor', name: '반도체', interest: 92, change: 8 },
      { id: 'cloud', name: '클라우드', interest: 88, change: -3 },
      { id: 'ev', name: '전기차', interest: 85, change: 5 },
      { id: 'biotech', name: '바이오테크', interest: 82, change: -2 },
      { id: 'fintech', name: '핀테크', interest: 78, change: 7 },
      { id: 'energy', name: '에너지', interest: 75, change: -5 },
      { id: 'retail', name: '소매', interest: 72, change: 3 },
      { id: 'healthcare', name: '헬스케어', interest: 70, change: 1 }
    ],
    news: [
      {
        id: 1,
        sector: 'ai',
        title: '엔비디아, 차세대 AI 칩 공개로 주가 급등',
        summary: '엔비디아가 새로운 블랙웰 아키텍처 기반 AI 가속기를 발표하며 시장의 큰 관심을 받고 있습니다. 이번 칩은 이전 세대 대비 성능이 5배 향상되었으며, 데이터센터용으로 최적화되었습니다.',
        source: 'Reuters',
        time: '2시간 전',
        url: '#'
      },
      {
        id: 2,
        sector: 'ai',
        title: 'OpenAI, GPT-5 모델 개발 중단 논란 해명',
        summary: 'OpenAI가 GPT-5 개발을 중단했다는 루머에 대해 공식적으로 부인했습니다. 회사는 차세대 언어 모델 개발이 계획대로 진행 중이라고 밝혔습니다.',
        source: 'TechCrunch',
        time: '4시간 전',
        url: '#'
      },
      {
        id: 3,
        sector: 'tech',
        title: '애플, 인도 시장 점유율 사상 최고치 경신',
        summary: '애플이 인도 스마트폰 시장에서 프리미엄 세그먼트 점유율 1위를 달성했습니다. 현지 생산 확대와 공격적인 마케팅이 주효했다는 분석입니다.',
        source: 'Bloomberg',
        time: '5시간 전',
        url: '#'
      },
      {
        id: 4,
        sector: 'semiconductor',
        title: 'TSMC, 2nm 공정 양산 일정 앞당긴다',
        summary: 'TSMC가 2나노미터 공정 기술의 양산 시점을 기존 계획보다 6개월 앞당길 것으로 전해졌습니다. 주요 고객사들의 수요가 예상보다 높기 때문입니다.',
        source: 'Wall Street Journal',
        time: '6시간 전',
        url: '#'
      },
      {
        id: 5,
        sector: 'ev',
        title: '테�라, 신형 모델 2 프로토타입 공개',
        summary: '테슬라가 대중적인 가격대를 목표로 한 신형 전기차 모델 2의 프로토타입을 공개했습니다. 예상 가격은 25,000달러 수준으로 전기차 대중화에 기여할 것으로 기대됩니다.',
        source: 'CNBC',
        time: '7시간 전',
        url: '#'
      },
      {
        id: 6,
        sector: 'cloud',
        title: '마이크로소프트, Azure AI 서비스 대폭 강화',
        summary: '마이크로소프트가 Azure 클라우드 플랫폼에 새로운 AI 서비스들을 추가했습니다. 특히 기업용 맞춤형 AI 모델 훈련 서비스가 주목받고 있습니다.',
        source: 'The Verge',
        time: '8시간 전',
        url: '#'
      },
      {
        id: 7,
        sector: 'fintech',
        title: '페이팔, 암호화폐 스테이블코인 PYUSD 확대',
        summary: '페이팔이 자체 스테이블코인인 PYUSD의 사용처를 대폭 확대한다고 발표했습니다. 주요 온라인 쇼핑몰에서도 결제 수단으로 사용 가능해질 예정입니다.',
        source: 'CoinDesk',
        time: '10시간 전',
        url: '#'
      },
      {
        id: 8,
        sector: 'biotech',
        title: '화이자, 신규 암 치료제 임상 3상 성공',
        summary: '화이자가 개발 중인 차세대 암 치료제가 3상 임상시험에서 긍정적인 결과를 보였습니다. FDA 승인 신청이 조만간 이뤄질 것으로 예상됩니다.',
        source: 'FierceBiotech',
        time: '12시간 전',
        url: '#'
      }
    ]
  },
  kr: {
    sectors: [
      { id: 'semiconductor', name: '반도체', interest: 96, change: 10 },
      { id: 'battery', name: '배터리', interest: 93, change: 8 },
      { id: 'display', name: '디스플레이', interest: 88, change: -2 },
      { id: 'auto', name: '자동차', interest: 85, change: 5 },
      { id: 'bio', name: '바이오', interest: 82, change: 12 },
      { id: 'shipbuilding', name: '조선', interest: 78, change: 3 },
      { id: 'chemical', name: '화학', interest: 75, change: -4 },
      { id: 'steel', name: '철강', interest: 72, change: -1 },
      { id: 'entertainment', name: 'K-엔터', interest: 70, change: 6 },
      { id: 'retail', name: '유통', interest: 68, change: 2 }
    ],
    news: [
      {
        id: 1,
        sector: 'semiconductor',
        title: '삼성전자, 3나노 GAA 공정 수율 개선 성공',
        summary: '삼성전자가 3세대 GAA(Gate-All-Around) 공정의 수율을 크게 개선하는 데 성공했습니다. 이로써 파운드리 경쟁력이 더욱 강화될 전망입니다.',
        source: '연합뉴스',
        time: '1시간 전',
        url: '#'
      },
      {
        id: 2,
        sector: 'battery',
        title: 'LG엔솔, 북미 배터리 공장 추가 증설 결정',
        summary: 'LG에너지솔루션이 북미 지역에 배터리 공장을 추가로 증설하기로 결정했습니다. 미국 IRA 보조금 혜택과 수요 증가에 대응하기 위한 조치입니다.',
        source: '매일경제',
        time: '3시간 전',
        url: '#'
      },
      {
        id: 3,
        sector: 'bio',
        title: '삼성바이오로직스, 5공장 건설 본격화',
        summary: '삼성바이오로직스가 인천 송도에 5공장 건설을 본격화합니다. 완공 시 세계 최대 규모의 바이오 생산 능력을 갖추게 됩니다.',
        source: '한국경제',
        time: '4시간 전',
        url: '#'
      },
      {
        id: 4,
        sector: 'auto',
        title: '현대차, 전기차 전용 플랫폼 3세대 공개',
        summary: '현대자동차가 차세대 전기차 전용 플랫폼 IMA 3.0을 공개했습니다. 1회 충전 주행거리 700km 이상을 목표로 개발되었습니다.',
        source: '조선일보',
        time: '6시간 전',
        url: '#'
      },
      {
        id: 5,
        sector: 'display',
        title: 'LG디스플레이, 마이크로 OLED 양산 돌입',
        summary: 'LG디스플레이가 애플 비전 프로에 공급할 마이크로 OLED 패널 양산에 돌입했습니다. AR/VR 시장 선점에 나섭니다.',
        source: '전자신문',
        time: '8시간 전',
        url: '#'
      },
      {
        id: 6,
        sector: 'shipbuilding',
        title: 'HD한국조선해양, 친환경 선박 수주 급증',
        summary: 'HD한국조선해양이 암모니아 추진 선박 등 친환경 선박 수주가 크게 늘고 있습니다. 글로벌 탄소중립 규제 강화가 수주 증가의 배경입니다.',
        source: '해양한국',
        time: '9시간 전',
        url: '#'
      }
    ]
  },
  crypto: {
    sectors: [
      { id: 'bitcoin', name: '비트코인', interest: 100, change: 20 },
      { id: 'defi', name: 'DeFi', interest: 85, change: 10 },
      { id: 'nft', name: 'NFT', interest: 75, change: -5 },
      { id: 'layer2', name: 'Layer 2', interest: 80, change: 15 },
      { id: 'stablecoin', name: '스테이블코인', interest: 70, change: 5 },
      { id: 'exchange', name: '거래소', interest: 68, change: 3 },
      { id: 'mining', name: '채굴', interest: 65, change: -3 },
      { id: 'gamefi', name: 'GameFi', interest: 60, change: 8 },
      { id: 'dao', name: 'DAO', interest: 55, change: 12 },
      { id: 'metaverse', name: '메타버스', interest: 50, change: -8 }
    ],
    news: [
      {
        id: 1,
        sector: 'bitcoin',
        title: '비트코인 ETF 순유입액 사상 최고치 경신',
        summary: '미국 현물 비트코인 ETF의 하루 순유입액이 사상 최고치를 경신했습니다. 기관 투자자들의 관심이 계속해서 증가하고 있습니다.',
        source: 'CoinDesk',
        time: '1시간 전',
        url: '#'
      },
      {
        id: 2,
        sector: 'bitcoin',
        title: '비트코인 해시레이트 또 다시 신고점 돌파',
        summary: '비트코인 네트워크의 해시레이트가 다시 한번 사상 최고치를 경신했습니다. 네트워크 보안성이 더욱 강화되고 있다는 신호입니다.',
        source: 'Bitcoin Magazine',
        time: '3시간 전',
        url: '#'
      },
      {
        id: 3,
        sector: 'defi',
        title: '유니스왑, V4 업그레이드 메인넷 출시',
        summary: '탈중앙화 거래소 유니스왑이 V4 업그레이드를 메인넷에 출시했습니다. 사용자 정의 풀 기능과 가스비 절감이 핵심입니다.',
        source: 'The Block',
        time: '5시간 전',
        url: '#'
      },
      {
        id: 4,
        sector: 'layer2',
        title: '베이스, 일일 거래량 이더리움 메인넷 추월',
        summary: '코인베이스의 레이어2 솔루션 베이스가 일일 거래량에서 이더리움 메인넷을 추월했습니다. 낮은 수수료와 빠른 처리 속도가 주효했습니다.',
        source: 'Decrypt',
        time: '7시간 전',
        url: '#'
      },
      {
        id: 5,
        sector: 'stablecoin',
        title: 'USDC 발행량 급증, 테더 추격',
        summary: 'Circle의 스테이블코인 USDC 발행량이 급증하며 시장 점유율을 빠르게 확대하고 있습니다. 규제 준수와 투명성이 강점으로 작용하고 있습니다.',
        source: 'CoinTelegraph',
        time: '9시간 전',
        url: '#'
      }
    ]
  }
};

// Stock ticker mapping for search
const STOCK_TICKERS = {
  // US Stocks
  'NVDA': { name: '엔비디아', market: 'us', sector: 'ai' },
  'AAPL': { name: '애플', market: 'us', sector: 'tech' },
  'MSFT': { name: '마이크로소프트', market: 'us', sector: 'cloud' },
  'TSLA': { name: '테슬라', market: 'us', sector: 'ev' },
  'GOOGL': { name: '구글', market: 'us', sector: 'tech' },
  'AMZN': { name: '아마존', market: 'us', sector: 'cloud' },
  'META': { name: '메타', market: 'us', sector: 'tech' },
  'TSM': { name: 'TSMC', market: 'us', sector: 'semiconductor' },
  
  // Korean Stocks
  '005930': { name: '삼성전자', market: 'kr', sector: 'semiconductor' },
  '373220': { name: 'LG에너지솔루션', market: 'kr', sector: 'battery' },
  '207940': { name: '삼성바이오로직스', market: 'kr', sector: 'bio' },
  '005380': { name: '현대차', market: 'kr', sector: 'auto' },
  '034020': { name: '두산에너빌리티', market: 'kr', sector: 'energy' },
  '051910': { name: 'LG화학', market: 'kr', sector: 'chemical' }
};

// Sector trend data for charts (7 days)
const TREND_DATA = {
  labels: ['7일 전', '6일 전', '5일 전', '4일 전', '3일 전', '2일 전', '어제', '오늘'],
  datasets: {
    us: {
      ai: [70, 75, 78, 82, 88, 92, 95, 98],
      tech: [80, 82, 83, 85, 88, 90, 93, 95],
      semiconductor: [75, 78, 80, 82, 85, 88, 90, 92]
    },
    kr: {
      semiconductor: [82, 84, 86, 88, 90, 92, 94, 96],
      battery: [78, 80, 83, 85, 88, 90, 92, 93],
      bio: [65, 68, 70, 72, 75, 78, 80, 82]
    },
    crypto: {
      bitcoin: [70, 75, 80, 85, 90, 95, 98, 100],
      defi: [68, 70, 72, 75, 78, 80, 83, 85],
      layer2: [60, 62, 65, 68, 72, 75, 78, 80]
    }
  }
};
