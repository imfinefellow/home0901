export type AccessibilityFontSize = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  fontSize: AccessibilityFontSize;
  highContrast: boolean;
  textToSpeech: boolean;
  simpleMode: boolean;
  readingRuler: boolean;
  dyslexiaFont: boolean;
}

export type CommunityCategory = 
  | 'all'
  | 'cheonan_map'
  | 'story'
  | 'qna'
  | 'sharing'
  | 'policy';

export interface CommunityComment {
  id: string;
  author: string;
  authorBadge?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  category: CommunityCategory;
  title: string;
  content: string;
  author: string;
  authorRole: string; // e.g. "천안시민", "시니어 활동가", "휠체어 사용자", "르네상스 매니저", "복지사"
  authorAvatar?: string;
  locationTag?: string; // e.g. "천안시 동남구 신부동", "천안시 서북구 불당동"
  tags: string[];
  likes: number;
  commentsCount: number;
  comments: CommunityComment[];
  createdAt: string;
  isNotice?: boolean;
  isVerifiedPlace?: boolean;
  accessibilityFeatures?: string[];
  imageUrl?: string;
}

export interface BarrierFreeSpot {
  id: string;
  name: string;
  district: '서북구' | '동남구';
  address: string;
  category: '교통' | '문화/관광' | '공공기관' | '식당/카페' | '병원/약국' | '복지시설';
  features: {
    wheelchairRamp: boolean;
    elevator: boolean;
    disabledRestroom: boolean;
    brailleGuide: boolean;
    audioGuide: boolean;
    electricWheelchairCharger: boolean;
    parking: boolean;
    signLanguage: boolean;
  };
  score: number; // 1 to 5
  description: string;
  recommendedTip: string;
  lat: number;
  lng: number;
  reviewsCount: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  targetUsers: string[];
  keyFeatures: string[];
  aiTechBadge: string;
  benefits: string;
}

export interface CompanyMilestone {
  year: string;
  title: string;
  detail: string;
}
