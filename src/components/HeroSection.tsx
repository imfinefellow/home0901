import React from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Accessibility, 
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { speak, settings } = useAccessibility();

  const heroIntro = "노인과 장애인이 차별 없이 살아갈 수 있는 미래사회를 구축하는 AI 플랫폼, 르네상스입니다. 천안시를 거점으로 인공지능 기술을 통해 사회적 격차를 해소합니다.";

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80" id="hero-section">
      {/* Background Decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline & Message */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Mission Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/60 text-blue-200 text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>포용적 AI 소셜벤처 · 르네상스 (Renaissance)</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] text-white">
              노인과 장애인이 <br />
              <span className="text-blue-400 font-black">
                차별 없이 살아가는 미래,
              </span>
              <br />
              인공지능으로 열어갑니다.
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl">
              어려운 공문서와 디지털 기기의 문턱, 계단과 단차로 막힌 보행로까지. <br className="hidden sm:inline" />
              주식회사 <strong className="text-white font-black underline decoration-blue-400 decoration-2 underline-offset-4">르네상스</strong>는 첨단 AI 기술을 통해 정보·이동·문화의 사회적 격차를 해소하고 
              모두가 존엄하게 공존하는 따뜻한 세상을 충남 <strong className="text-white font-black">천안시</strong>에서부터 만듭니다.
            </p>

            {/* Audio Summary Button for Accessibility */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => speak(heroIntro)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-blue-200 text-xs sm:text-sm font-bold border border-blue-400/50 transition hover:border-blue-400 cursor-pointer"
                title="소개글을 음성으로 듣기"
              >
                <Volume2 className="w-4 h-4 text-blue-400" />
                <span>소개 음성으로 듣기</span>
              </button>
            </div>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('ai-demo')}
                className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>AI 접근성 도구 체험하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('community')}
                className="px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base border border-slate-700 shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-5 h-5 text-blue-400" />
                <span>시민 참여 커뮤니티</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('cheonan-map')}
                className="px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-blue-300 font-bold text-sm border border-blue-500/40 transition flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>천안 배리어프리 지도</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>웹 접근성 표준 WCAG 2.1 준수</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>천안시 공공데이터 연계</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>쉬운말(Easy-Read) AI 엔진</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card - Geometric Balance Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-7 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 overflow-hidden">
              {/* Subtle geometric circle accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500 opacity-15 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Accessibility className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base sm:text-lg">르네상스 배리어프리 코어</h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">천안시 사회적 가치 창출 플랫폼</p>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/40">
                  실시간 운영중
                </span>
              </div>

              {/* 3 Core Impact Points */}
              <div className="space-y-3.5">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-blue-600/30 text-blue-300 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">AI 알기 쉬운 글 변환 (Easy-Read)</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5 leading-relaxed">
                      복잡한 복지 서류와 안내문을 고령자·발달장애인 눈높이에 맞게 즉시 순화 및 음성 안내.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-sky-600/30 text-sky-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">천안 무장애 공간 매핑 & 제보</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5 leading-relaxed">
                      천안역, 신부동, 불당동 등 보행약자 전용 경사로·엘리베이터·급속충전기 정보 실시간 공유.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-300 shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">시민 참여형 따뜻한 커뮤니티</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5 leading-relaxed">
                      노인, 장애인, 가족, 자원봉사자가 직접 복지 경험을 나누고 정책을 제안하는 열린 광장.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Stats */}
              <div className="pt-3 grid grid-cols-3 gap-2 text-center border-t border-slate-800">
                <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-black text-blue-400">100%</div>
                  <div className="text-[11px] sm:text-xs text-slate-200 font-semibold">웹접근성 준수</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-black text-blue-400">12,800+</div>
                  <div className="text-[11px] sm:text-xs text-slate-200 font-semibold">쉬운문서 변환</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-black text-blue-400">1,450+</div>
                  <div className="text-[11px] sm:text-xs text-slate-200 font-semibold">천안 안심거점</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
