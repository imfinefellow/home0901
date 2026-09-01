import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  Type, 
  Layers, 
  PhoneCall, 
  Menu, 
  X, 
  MapPin, 
  MessageSquare, 
  Cpu, 
  Building2,
  HelpCircle
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { 
    settings, 
    setFontSize, 
    toggleHighContrast, 
    toggleTextToSpeech, 
    toggleSimpleMode, 
    speak, 
    stopSpeaking,
    isSpeaking 
  } = useAccessibility();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'services', label: '서비스 소개', icon: Cpu, desc: 'AI 배리어프리 기술' },
    { id: 'ai-demo', label: 'AI 체험존', icon: Sparkles, desc: '쉬운글 & 복지상담' },
    { id: 'community', label: '참여 커뮤니티', icon: MessageSquare, desc: '시민 소통 & 제보' },
    { id: 'cheonan-map', label: '천안 배리어프리 지도', icon: MapPin, desc: '무장애 편의시설' },
    { id: 'about', label: '회사 소개', icon: Building2, desc: '천안 본사 & 비전' },
  ];

  const handleNavClick = (id: string, label: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (settings.textToSpeech) {
      speak(`${label} 메뉴로 이동했습니다.`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors" id="main-header">
      {/* Top Accessibility Bar for Elderly & Disabled Accessibility */}
      <div className="bg-slate-900 text-slate-100 px-4 py-2 text-xs md:text-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-[#3B82F6]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
              웹 접근성 지원센터
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">
              충남 천안시 기반 노인·장애인 사회적 격차 해소 AI 플랫폼
            </span>
          </div>

          {/* Quick Accessibility Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Font Size Buttons */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <span className="text-slate-400 px-1.5 flex items-center text-xs">
                <Type className="w-3.5 h-3.5 mr-1" /> 글자:
              </span>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition ${
                  settings.fontSize === 'normal'
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="기본 글자 크기"
              >
                보통
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition ${
                  settings.fontSize === 'large'
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="크게 보기"
              >
                크게
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition ${
                  settings.fontSize === 'xlarge'
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="아주 크게 보기"
              >
                아주크게
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={toggleHighContrast}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                settings.highContrast
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              title="명암비를 높여 가독성을 향상시킵니다"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{settings.highContrast ? '고대비 켜짐' : '고대비 모드'}</span>
            </button>

            {/* Text To Speech Toggle */}
            <button
              type="button"
              onClick={settings.textToSpeech && isSpeaking ? stopSpeaking : toggleTextToSpeech}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                settings.textToSpeech
                  ? 'bg-[#3B82F6] text-white border-blue-400 font-bold animate-pulse'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              title="화면의 글을 음성으로 들려줍니다"
            >
              {settings.textToSpeech ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>음성 읽기 ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>음성 읽기</span>
                </>
              )}
            </button>

            {/* Simple Mode Toggle */}
            <button
              type="button"
              onClick={toggleSimpleMode}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                settings.simpleMode
                  ? 'bg-indigo-600 text-white border-indigo-400 font-bold'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              title="큰 버튼과 단순한 화면으로 보기"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{settings.simpleMode ? '간편모드 켜짐' : '간편모드'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Mission - Geometric Balance Mark */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer group"
          onClick={() => handleNavClick('services', '르네상스 홈')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('services', '르네상스 홈')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-4.5 h-4.5 border-2 border-white rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                르네상스
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                천안 AI 소셜벤처
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold line-clamp-1">
              노인·장애인을 위한 배리어프리 인공지능 플랫폼
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="메인 메뉴">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id, item.label)}
                className={`relative px-4 py-2 rounded-full font-bold text-sm transition flex items-center gap-2 ${
                  isActive
                    ? 'text-blue-700 bg-blue-100/80 border border-blue-300 shadow-xs'
                    : 'text-slate-800 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-600'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Contact & Cheonan Location Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] block font-bold text-slate-600">천안시 복지 핫라인</span>
            <a 
              href="tel:129" 
              className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-600 hover:underline"
              title="보건복지상담센터 전화연결 (국번없이 129)"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>국번없이 129</span>
            </a>
          </div>

          <button
            onClick={() => handleNavClick('community', '참여 커뮤니티')}
            className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>시민 참여하기</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            aria-label="메뉴 열기/닫기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-semibold text-slate-400 px-3 py-1">메뉴 바로가기</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.label)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-bold transition text-left ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 border border-blue-200'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-[#3B82F6] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div>{item.label}</div>
                    <div className="text-xs font-normal text-slate-500">{item.desc}</div>
                  </div>
                </div>
                {isActive && <span className="text-xs font-bold text-[#3B82F6] bg-blue-100 px-2 py-0.5 rounded-full">선택됨</span>}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 px-2">
            <span>본사: 충청남도 천안시 서북구</span>
            <span className="font-bold text-[#3B82F6]">전화: 041-550-2026</span>
          </div>
        </div>
      )}
    </header>
  );
};
