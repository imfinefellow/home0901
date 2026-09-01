import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Navigation, 
  ScanEye, 
  LayoutGrid, 
  CheckCircle, 
  Sparkles, 
  Volume2, 
  ArrowRight, 
  Cpu, 
  Users,
  ShieldAlert
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { useAccessibility } from '../context/AccessibilityContext';

interface ServicesSectionProps {
  onTryAi: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onTryAi }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  const { speak } = useAccessibility();

  const iconMap: Record<string, any> = {
    BookOpenCheck,
    Navigation,
    ScanEye,
    LayoutGrid,
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
  const SelectedIcon = iconMap[selectedService.iconName] || BookOpenCheck;

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] text-slate-950 border-b border-slate-200" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold border border-blue-300 shadow-2xs">
            <Cpu className="w-4 h-4 text-blue-700" />
            <span>AI 핵심 기술 및 서비스 소개</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            기술의 장벽을 허물고, <br className="sm:hidden" />
            <span className="text-blue-600">모두의 편리한 일상</span>을 만듭니다
          </h2>
          <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
            르네상스는 고령자와 장애인이 겪는 디지털·이동·정보 소외를 해결하기 위해 
            자연어 AI, 비전 인공지능, 배리어프리 공간 데이터 솔루션을 직접 연구·개발합니다.
          </p>
        </div>

        {/* 4 Interactive Service Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.iconName] || BookOpenCheck;
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setSelectedServiceId(service.id);
                  speak(`${service.title} 서비스를 선택했습니다.`);
                }}
                className={`p-6 rounded-3xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-700 shadow-lg shadow-blue-600/25 scale-[1.02]'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 shadow-xs'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base line-clamp-1 mb-1 text-slate-950">{service.title}</h3>
                <p className={`text-xs sm:text-sm line-clamp-2 ${isSelected ? 'text-blue-50 font-medium' : 'text-slate-700 font-medium'}`}>
                  {service.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Core Info & Highlights */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                    <SelectedIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-blue-800 bg-blue-100 px-3 py-0.5 rounded-full border border-blue-300">
                      {selectedService.aiTechBadge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => speak(`${selectedService.title}. ${selectedService.description}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-300 transition cursor-pointer"
                  title="이 서비스 설명 음성으로 듣기"
                >
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <span>설명 듣기</span>
                </button>
              </div>

              {/* Subtitle & Full Description */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base font-bold text-blue-900">
                  {selectedService.subtitle}
                </p>
                <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* Key Features List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">주요 기능 및 핵심 기술</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience Badges */}
              <div className="pt-2">
                <div className="text-xs font-extrabold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>주요 수혜 대상</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedService.targetUsers.map((user, idx) => (
                    <span key={idx} className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300">
                      {user}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onTryAi}
                  className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>이 기술 직접 체험하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Visual Showcase & Expected Benefit Card */}
            <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                  <span className="text-xs font-bold text-blue-400">사회적 가치 창출 지표</span>
                  <span className="text-[11px] text-slate-300 font-medium">천안시 실증 데이터</span>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-blue-300">기술 도입 기대 효과</div>
                  <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                    "{selectedService.benefits}"
                  </div>
                </div>

                {/* Practical Scenario Simulation */}
                <div className="mt-5 space-y-3">
                  <div className="text-xs font-bold text-slate-300">적용 시나리오 예시</div>
                  <div className="text-xs sm:text-sm text-slate-100 font-medium p-4 rounded-2xl bg-slate-900/90 border border-slate-800 leading-relaxed">
                    {selectedService.id === 'easy-read-ai' && (
                      <p>
                        "천안시민 이 모 어르신(74세)이 독거노인 난방비 지원 공고문을 카메라로 찍자, 
                        어려운 행정용어가 '이번 달 20일까지 통장사본과 신분증을 들고 동주민센터에 가세요'라는 쉬운 세 줄과 따뜻한 음성으로 요약되어 홀로 신청에 성공했습니다."
                      </p>
                    )}
                    {selectedService.id === 'barrier-free-mobility' && (
                      <p>
                        "천안역에서 하차한 전동휠체어 이용자가 터미널까지 이동할 때, 
                        도로 공사로 인한 단차 구간을 AI가 사전에 감지하여 완만한 경사로와 엘리베이터가 연결된 안전 우회 보행로를 실시간 안내했습니다."
                      </p>
                    )}
                    {selectedService.id === 'multimodal-assist' && (
                      <p>
                        "시각장애인 이용자가 약국에서 받은 약봉투를 비추자, 
                        '식후 30분에 복용하는 혈압약과 소화제 2정입니다'라고 정확한 복약 지침과 위험 성분을 즉시 음성으로 설명해주었습니다."
                      </p>
                    )}
                    {selectedService.id === 'smart-care-kiosk' && (
                      <p>
                        "주민센터 무인 발급기 앞에서 휠체어를 탄 시민이 접근하자 화면이 30cm 하강하고, 
                        음성으로 '주민등록등본 1통 떼어줘'라고 말하자 본인 인증 후 자동으로 서류를 발급했습니다."
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Guarantee Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <ShieldAlert className="w-4 h-4 text-blue-400" />
                  개인정보 비식별화 및 보안 완비
                </span>
                <span>르네상스 R&D 연구소</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
