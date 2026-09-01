import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Heart, 
  ArrowUp,
  Accessibility
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800" id="main-footer">
      {/* Top Banner: Cheonan Accessibility Pledge */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm sm:text-base">
                모두를 위한 배리어프리 디지털 세상, 르네상스가 실현합니다
              </div>
              <div className="text-xs text-slate-400">
                한국형 웹 콘텐츠 접근성 지침 (KWCAG 2.2) 및 W3C WCAG 2.1 AA 표준 준수
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-blue-400" />
            <span>맨 위로 이동</span>
          </button>
        </div>
      </div>

      {/* Main Footer Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand & Slogan (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm shadow-blue-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">주식회사 르네상스</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-md">
              르네상스는 노인과 장애인이 정보와 일상에서 겪는 문턱을 인공지능 기술로 허물고, 
              사회적 격차 없는 포용적 미래를 충청남도 천안시에서 일구어 나가는 소셜벤처입니다.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>벤처기업 인증 및 사회적기업 육성사업 선정</span>
            </div>
          </div>

          {/* Col 2: Cheonan HQ Location & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white text-sm mb-2">천안 본사 정보</h4>
            <div className="flex items-start gap-2 text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>충청남도 천안시 서북구 불당21로 67, 8층 (천안스마트이노베이션센터)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>대표전화: 041-550-2026 / 팩스: 041-550-2029</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>이메일: contact@renaissance-ai.kr</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-2 text-xs sm:text-sm">
            <h4 className="font-bold text-white text-sm mb-3">바로가기</h4>
            <div className="flex flex-col space-y-2 font-medium">
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="text-left text-slate-300 hover:text-blue-400 transition cursor-pointer"
              >
                • AI 배리어프리 서비스 소개
              </button>
              <button
                type="button"
                onClick={() => onNavigate('ai-demo')}
                className="text-left text-slate-300 hover:text-blue-400 transition cursor-pointer"
              >
                • AI 쉬운 글(Easy-Read) 체험존
              </button>
              <button
                type="button"
                onClick={() => onNavigate('community')}
                className="text-left text-slate-300 hover:text-blue-400 transition cursor-pointer"
              >
                • 시민 참여 커뮤니티
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cheonan-map')}
                className="text-left text-slate-300 hover:text-blue-400 transition cursor-pointer"
              >
                • 천안 배리어프리 지도
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="text-left text-slate-300 hover:text-blue-400 transition cursor-pointer"
              >
                • 르네상스 회사 소개 & 오시는 길
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div>
            © 2026 주식회사 르네상스 (Renaissance Inc.) All rights reserved. 사업자등록번호: 312-86-02026 | 대표자: 르네상스 임직원 일동
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200 cursor-pointer">개인정보처리방침</span>
            <span>|</span>
            <span className="hover:text-slate-200 cursor-pointer">이용약관</span>
            <span>|</span>
            <span className="hover:text-slate-200 cursor-pointer">웹접근성정책</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
