import { BarrierFreeSpot, CommunityPost, ServiceItem, CompanyMilestone } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'easy-read-ai',
    title: 'AI 알기 쉬운 언어(Easy-Read) 변환 엔진',
    subtitle: '복잡한 공문서·병원 안내문·생활 정보를 누구나 한눈에 이해하는 쉬운 말로 변환',
    iconName: 'BookOpenCheck',
    description: '관공서 서류, 금융 약관, 병원 처방전 등 어려운 한자어나 외래어로 가득 찬 문서를 고령자와 발달장애인의 눈높이에 맞추어 핵심 요약, 쉬운 어휘 풀이, 픽토그램 시각화로 자동 재구성합니다.',
    targetUsers: ['고령 어르신', '발달장애인', '느린 학습자', '다문화 가정'],
    keyFeatures: [
      '한자어·행정 전문용어 실시간 쉬운말 순화',
      '핵심 행동 지침 불릿포인트 자동 요약',
      '어려운 단어 자동 사전 및 맥락 풀이 제공',
      '원클릭 친절 음성(TTS) 낭독 연동'
    ],
    aiTechBadge: 'Gemini 3.7 언어인지 요약 & 문해력 어댑터',
    benefits: '복합 문서 이해 시간 78% 단축, 행정·의료 접근성 격차 해소'
  },
  {
    id: 'barrier-free-mobility',
    title: '천안시 특화 AI 배리어프리 모빌리티 & 공간 내비게이션',
    subtitle: '휠체어, 유모차, 보행약자를 위한 단차·경사로·엘리베이터 실시간 최적 경로 안내',
    iconName: 'Navigation',
    description: '천안시 전역의 보도 턱, 계단, 경사로, 공사 구간, 전동휠체어 급속충전소 위치를 AI 컴퓨터비전과 시민 제보 데이터로 실시간 업데이트하여 휠체어 친화 보행로를 안내합니다.',
    targetUsers: ['지체장애인', '휠체어/스쿠터 사용자', '보행기 어르신', '유모차 동반 가족'],
    keyFeatures: [
      '계단·단차 회피 맞춤형 배리어프리 경로 탐색',
      '천안시 관내 전동휠체어 급속충전기 실시간 위치·상태 연동',
      '저상버스 도착 및 휠체어 탑승 예약 알림',
      '장애인 전용 주차구역 및 경사로 유무 사전 확인'
    ],
    aiTechBadge: '공간 지리정보 AI & 로드뷰 단차 분석 비전',
    benefits: '보행약자 이동 소요시간 42% 절감 및 이동 안전성 증대'
  },
  {
    id: 'multimodal-assist',
    title: 'AI 시각·청각 멀티모달 보조공학 솔루션',
    subtitle: '스마트폰 카메라로 세상을 읽어주는 음성 안내 & 실시간 수어·자막 통역',
    iconName: 'ScanEye',
    description: '시각장애인을 위해 주변 사물, 간판, 횡단보도 신호, 약봉투를 상세히 음성으로 묘사해주고, 청각장애인을 위해 관공서 및 일상 대화를 실시간 텍스트 자막과 3D AI 수어로 변환합니다.',
    targetUsers: ['시각장애인 (전맹/저시력)', '청각장애인 및 난청 어르신', '의사소통 약자'],
    keyFeatures: [
      'AI 화면 해설 및 고정밀 이미지 대체 텍스트(Alt-text) 생성',
      '음성-문자 실시간 변환(STT) 및 소음 환경 음성 증폭',
      '비상 경고음(사이렌, 자동차 경적, 초인종) 시각 진동 알림',
      '스마트 점자 디바이스 및 스크린리더 완벽 호환 API'
    ],
    aiTechBadge: '멀티모달 비전-음성 실시간 스트리밍 AI',
    benefits: '일상생활 독립성 85% 향상, 시각·청각 정보격차 제로화'
  },
  {
    id: 'smart-care-kiosk',
    title: '배리어프리 스마트 키오스크 & 시니어 인지케어 IoT',
    subtitle: '높낮이 자동 조절, 쉬운 큰글씨 화면, 음성 대화로 누구나 쉽게 주문·접수',
    iconName: 'LayoutGrid',
    description: '식당, 병원, 무인 매장에서 어르신과 휠체어 이용자가 당황하지 않도록 전동 높이 조절, 직관적인 음성 대화 주문, 인지 훈련 및 치매 예방 두뇌 활동 프로그램을 탑재한 솔루션입니다.',
    targetUsers: ['디지털 기기 조작이 어려운 어르신', '휠체어 이용 장애인', '키가 작은 아동'],
    keyFeatures: [
      '휠체어 센서 감지 시 화면 높이 자동 하강',
      'AI 자연어 음성 대화로 원하는 메뉴/창구 자동 선택',
      '고대비 모드 & 시니어 특화 돋보기 인터페이스',
      '주민센터·복지관 연계 시니어 인지케어 게임 탑재'
    ],
    aiTechBadge: '대화형 음성 에이전트 & 센서 IoT 제어',
    benefits: '디지털 소외 극복, 키오스크 이용 실패율 94% 감소'
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    category: 'cheonan_map',
    title: '천안역 서부광장 엘리베이터 및 경사로 배리어프리 점검 후기',
    content: '어제 전동휠체어를 타고 천안역을 이용했습니다. 서부광장 2번 출구 쪽 엘리베이터가 새로 정비되어 휠체어 탑승 공간이 넉넉해졌네요. 다만 1번 출구 버스정류장 연결로는 약간의 보도블록 턱이 있어서 르네상스 지도 앱에 위험 구역으로 제보 등록해 두었습니다! 휠체어 이용자분들 참고하세요.',
    author: '김민수',
    authorRole: '휠체어 사용자 / 천안시민',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    locationTag: '천안시 동남구 대흥동 (천안역 서부광장)',
    tags: ['천안역', '엘리베이터', '휠체어접근성', '보도턱제보'],
    likes: 42,
    commentsCount: 8,
    isNotice: false,
    isVerifiedPlace: true,
    accessibilityFeatures: ['엘리베이터 완비', '점자블록', '장애인 화장실 인근'],
    createdAt: '2026-08-30 14:20',
    comments: [
      {
        id: 'c1',
        author: '박정희',
        authorBadge: '시니어 활동가',
        content: '좋은 정보 감사합니다! 저도 무릎이 안 좋아서 계단이 힘든데 서부광장 엘리베이터 위치를 꼭 확인하고 다녀야겠네요.',
        createdAt: '2026-08-30 15:10',
        likes: 7
      },
      {
        id: 'c2',
        author: '르네상스 서포터즈',
        authorBadge: '공식 운영진',
        content: '김민수 님, 소중한 보도블록 턱 제보 감사합니다. 천안시 도로과 및 배리어프리 지도 데이터에 즉시 반영하겠습니다!',
        createdAt: '2026-08-30 15:45',
        likes: 12
      }
    ]
  },
  {
    id: 'post-2',
    category: 'story',
    title: '70대인 제가 르네상스 "AI 쉬운 글 변환기"로 구청 복지 신청서 썼어요!',
    content: '주민센터에서 준 노인맞춤돌봄 신청 서류가 무슨 법률 용어처럼 어려워서 항상 복지사 선생님께 부탁드렸는데, 르네상스 홈페이지에서 사진 찍어 올리니 쉬운 우리말로 풀어서 "무엇을 준비하고 어디에 도장을 찍어야 하는지" 딱 세 줄로 가르쳐주더군요. 정말 세상이 따뜻해지고 있다는 걸 느낍니다.',
    author: '이순자',
    authorRole: '천안 쌍용동 거주 어르신',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    locationTag: '천안시 서북구 쌍용동',
    tags: ['AI쉬운글', '노인복지', '자립성공', '디지털접근성'],
    likes: 68,
    commentsCount: 12,
    isNotice: false,
    createdAt: '2026-08-29 18:30',
    comments: [
      {
        id: 'c3',
        author: '최현우',
        authorBadge: '사회복지사',
        content: '어르신 혼자서 해내셨다니 정말 감동입니다! 현장에서 복지 서류가 너무 어렵다는 고충이 많았는데 르네상스 플랫폼이 큰 역할을 하고 있네요.',
        createdAt: '2026-08-29 19:00',
        likes: 15
      }
    ]
  },
  {
    id: 'post-3',
    category: 'qna',
    title: '천안시에서 전동휠체어 배터리 무료 충전할 수 있는 곳이 어디인가요?',
    content: '외출 중에 전동휠체어 배터리가 부족해서 곤란했던 적이 있습니다. 천안시 관내 관공서나 복지관 중에 급속 충전기가 설치된 곳 목록이나 이용 팁을 알고 계신 분이 있을까요?',
    author: '장진우',
    authorRole: '지체장애인 청년',
    locationTag: '천안시 서북구 불당동',
    tags: ['전동휠체어', '급속충전소', '천안시복지', '질문'],
    likes: 25,
    commentsCount: 5,
    createdAt: '2026-08-28 11:15',
    comments: [
      {
        id: 'c4',
        author: '르네상스 AI봇',
        authorBadge: 'AI 복지도우미',
        content: '천안시청 본관 1층 로비, 천안시장애인종합복지관, 천안역 지하상가 만남의 광장, 동남구보건소 입구에 무료 급속충전기가 설치되어 있습니다. 충전 중 20분 내 80% 완충이 가능합니다.',
        createdAt: '2026-08-28 11:18',
        likes: 20
      }
    ]
  },
  {
    id: 'post-4',
    category: 'sharing',
    title: '【천안 청년 나눔】 주말 시각장애인 어르신 스마트폰 IT 배움 봉사단 모집',
    content: '안녕하세요! 르네상스와 함께하는 천안 대학생 배리어프리 서포터즈입니다. 이번 주 토요일 나사렛대학교 및 천안시장애인종합복지관에서 스마트폰 스크린리더 활용법 및 보이스 어시스턴트 사용법을 1:1로 알려드리는 따뜻한 동행 멘토링 봉사를 진행합니다. 참여하실 분들을 모십니다!',
    author: '정다은',
    authorRole: '천안 청년 서포터즈 대표',
    locationTag: '천안시 서북구 쌍용동 (나사렛대 인근)',
    tags: ['봉사활동', '청년나눔', '스마트폰교육', '디지털포용'],
    likes: 54,
    commentsCount: 9,
    createdAt: '2026-08-27 16:40',
    comments: []
  },
  {
    id: 'post-5',
    category: 'policy',
    title: '천안 신부동 문화의거리 보도턱 개선 및 음성 점자블록 확충 제안',
    content: '신부동 터미널 앞 문화의 거리는 청년과 어르신들이 모두 많이 찾는 곳이지만, 일부 상가 앞 계단 턱으로 인해 휠체어와 유모차 진입이 불가능한 곳이 많습니다. 이동식 경사로 설치 지원 조례와 음성 유도 신호기 확충을 천안시 시민 제안으로 함께 올리고 싶습니다. 지지 서명 부탁드립니다!',
    author: '강태석',
    authorRole: '배리어프리 정책 활동가',
    locationTag: '천안시 동남구 신부동 (터미널 일대)',
    tags: ['정책제안', '신부동', '배리어프리조례', '이동권'],
    likes: 89,
    commentsCount: 22,
    createdAt: '2026-08-26 09:30',
    comments: []
  }
];

export const CHEONAN_BARRIER_FREE_SPOTS: BarrierFreeSpot[] = [
  {
    id: 'spot-1',
    name: '천안역 (경부선/1호선)',
    district: '동남구',
    address: '충청남도 천안시 동남구 대흥로 239',
    category: '교통',
    features: {
      wheelchairRamp: true,
      elevator: true,
      disabledRestroom: true,
      brailleGuide: true,
      audioGuide: true,
      electricWheelchairCharger: true,
      parking: true,
      signLanguage: false
    },
    score: 4.8,
    description: '동부광장 및 서부광장 양방향 모두 휠체어 리프트 대신 초고속 엘리베이터 및 완만한 진입 경사로가 완비되어 있습니다. 맞이방 내 교통약자 도우미 서비스 센터 운영.',
    recommendedTip: '서부광장 2번 출구 엘리베이터 앞 휠체어 급속충전기 상시 무료 이용 가능.',
    lat: 36.8095,
    lng: 127.1462,
    reviewsCount: 38
  },
  {
    id: 'spot-2',
    name: '독립기념관 & 단풍나무숲길',
    district: '동남구',
    address: '충청남도 천안시 동남구 목천읍 삼방로 95',
    category: '문화/관광',
    features: {
      wheelchairRamp: true,
      elevator: true,
      disabledRestroom: true,
      brailleGuide: true,
      audioGuide: true,
      electricWheelchairCharger: true,
      parking: true,
      signLanguage: true
    },
    score: 4.9,
    description: '전국 최고 수준의 무장애 열린관광지. 전 전시관 턱 없는 평지 설계, 무료 수동/전동 휠체어 대여소 운영, 시각장애인용 촉각 전시물과 오디오 도슨트 완비.',
    recommendedTip: '종합안내센터에서 배리어프리 전용 셔틀버스(태극열차 휠체어 탑승칸) 사전 신청 가능.',
    lat: 36.7836,
    lng: 127.2227,
    reviewsCount: 64
  },
  {
    id: 'spot-3',
    name: '천안시장애인종합복지관',
    district: '동남구',
    address: '충청남도 천안시 동남구 삼룡3길 39',
    category: '복지시설',
    features: {
      wheelchairRamp: true,
      elevator: true,
      disabledRestroom: true,
      brailleGuide: true,
      audioGuide: true,
      electricWheelchairCharger: true,
      parking: true,
      signLanguage: true
    },
    score: 5.0,
    description: '천안 지역 장애인 맞춤 재활, 직업훈련, 보조공학기기 무료 대여 및 수리 센터를 운영하는 종합 복지 거점.',
    recommendedTip: '매주 수요일 보조기기 무상 점검 및 세척 서비스 실시.',
    lat: 36.7912,
    lng: 127.1684,
    reviewsCount: 42
  },
  {
    id: 'spot-4',
    name: '천안시청 & 봉서홀 시민공간',
    district: '서북구',
    address: '충청남도 천안시 서북구 번영로 156',
    category: '공공기관',
    features: {
      wheelchairRamp: true,
      elevator: true,
      disabledRestroom: true,
      brailleGuide: true,
      audioGuide: true,
      electricWheelchairCharger: true,
      parking: true,
      signLanguage: true
    },
    score: 4.7,
    description: '민원실 내 휠체어 전용 창구, 화상 수어 통역 서비스, 보청기 착용자용 텔레코일 존, 전동휠체어 급속충전기 구비.',
    recommendedTip: '1층 종합민원실 입구에 AI 접근성 키오스크 시범 운영 중.',
    lat: 36.8152,
    lng: 127.1139,
    reviewsCount: 29
  },
  {
    id: 'spot-5',
    name: '천안 아라리오갤러리 & 신부문화거리',
    district: '동남구',
    address: '충청남도 천안시 동남구 만남로 43',
    category: '문화/관광',
    features: {
      wheelchairRamp: true,
      elevator: true,
      disabledRestroom: true,
      brailleGuide: true,
      audioGuide: true,
      electricWheelchairCharger: false,
      parking: true,
      signLanguage: false
    },
    score: 4.5,
    description: '야외 조각공원은 완만한 경사로로 휠체어 관람이 편리하며, 미술관 본관에는 엘리베이터와 오디오 도슨트가 지원됩니다.',
    recommendedTip: '신세계백화점 연결 통로를 이용하면 눈/비 오는 날에도 턱 없이 안전하게 이동 가능.',
    lat: 36.8198,
    lng: 127.1558,
    reviewsCount: 31
  },
  {
    id: 'spot-6',
    name: '천안중앙시장 (전통시장 배리어프리존)',
    district: '동남구',
    address: '충청남도 천안시 동남구 사직로 7',
    category: '식당/카페',
    features: {
      wheelchairRamp: true,
      elevator: false,
      disabledRestroom: true,
      brailleGuide: false,
      audioGuide: false,
      electricWheelchairCharger: true,
      parking: true,
      signLanguage: false
    },
    score: 4.2,
    description: '아케이드 지붕 설치 및 주 통로 바닥 평탄화 공사 완료로 휠체어 및 어르신 보행차 통행이 매우 수월해진 천안 대표 전통시장.',
    recommendedTip: '중앙 공영주차장 1층에 장애인 화장실 및 급속충전기 위치.',
    lat: 36.8041,
    lng: 127.1517,
    reviewsCount: 22
  },
  {
    id: 'spot-7',
    name: '나사렛대학교 재활복지특성화관 & 점자도서관',
    district: '서북구',
    address: '충청남도 천안시 서북구 월봉로 48',
    category: '복지시설',
    features: {
      wheelchairRamp: true,
      elevator: true,
      disabledRestroom: true,
      brailleGuide: true,
      audioGuide: true,
      electricWheelchairCharger: true,
      parking: true,
      signLanguage: true
    },
    score: 5.0,
    description: '국내 유일의 재활복지 특성화 대학 시설로, 전 구역 유니버설 디자인 적용, 점자도서관, 보조공학 체험관 상설 운영.',
    recommendedTip: '시민 누구에게나 보조공학 소프트웨어 체험 및 3D 점자출력 무료 지원.',
    lat: 36.7975,
    lng: 127.1264,
    reviewsCount: 51
  },
  {
    id: 'spot-8',
    name: '천안 불당 아름다운거리 & 시민수변공원',
    district: '서북구',
    address: '충청남도 천안시 서북구 불당21로 67 일대',
    category: '식당/카페',
    features: {
      wheelchairRamp: true,
      elevator: true,
      disabledRestroom: true,
      brailleGuide: false,
      audioGuide: false,
      electricWheelchairCharger: true,
      parking: true,
      signLanguage: false
    },
    score: 4.6,
    description: '신불당 카페거리와 수변공원이 단차 없는 보행전용 데크길로 연결되어 있어 전동휠체어 및 어르신 산책에 최적화된 코스입니다.',
    recommendedTip: '수변공원 관리동 옆 장애인 화장실 및 완만한 호수 산책로 추천.',
    lat: 36.8122,
    lng: 127.1089,
    reviewsCount: 27
  }
];

export const COMPANY_MILESTONES: CompanyMilestone[] = [
  {
    year: '2024',
    title: '주식회사 르네상스 천안 본사 설립',
    detail: '충남 천안시를 거점으로 "기술로 장벽을 허무는 따뜻한 디지털 르네상스" 비전 선포 및 소셜벤처 인증'
  },
  {
    year: '2025',
    title: 'AI 알기 쉬운 언어(Easy-Read) 엔진 개발 & 천안시 시범사업',
    detail: '천안시 행정복지센터 및 노인·장애인 복지관에 공문서 쉬운말 변환 솔루션 및 배리어프리 지도 구축'
  },
  {
    year: '2026',
    title: '배리어프리 스마트 AI 플랫폼 전국 확장 & 시민 커뮤니티 개방',
    detail: '노인과 장애인이 직접 참여하는 참여형 배리어프리 공유 플랫폼 론칭 및 Gemini 기반 멀티모달 보조공학 탑재'
  }
];
