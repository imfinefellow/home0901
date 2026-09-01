import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  CheckCircle,
  ExternalLink,
  Users2
} from 'lucide-react';
import { COMPANY_MILESTONES } from '../data/mockData';
import { useAccessibility } from '../context/AccessibilityContext';

export const AboutCompanySection: React.FC = () => {
  const { speak } = useAccessibility();
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('기술도입 및 협업 문의');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 4000);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-100/70 text-slate-950 border-b border-slate-200" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold border border-blue-300">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span>회사 소개 및 천안 본사 안내</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            기술로 인간의 존엄을 밝히는 <br className="sm:hidden" />
            <span className="text-blue-600">주식회사 르네상스</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
            14세기 르네상스가 인간 중심의 사상적 부흥이었다면, 
            21세기 르네상스는 <strong className="font-extrabold text-slate-950">인공지능을 통해 노인과 장애인 누구도 소외되지 않는 따뜻한 디지털 부흥</strong>을 일구어갑니다.
          </p>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-300 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950">차별 제로 (Zero Barrier)</h3>
            <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
              신체적 장애나 나이로 인해 정보와 이동에서 차별받지 않도록 모든 서비스에 유니버설 디자인과 웹 접근성 표준을 100% 적용합니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-300 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950">따뜻한 AI (Warm Technology)</h3>
            <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
              기술을 위한 기술이 아닌, 어르신의 안부를 묻고 시각·청각·발달장애인의 손과 발이 되어주는 인간 친화형 AI 알고리즘을 개발합니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-300 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950">천안시 지역 상생 (Local Impact)</h3>
            <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
              충남 천안시를 시작으로 지역 복지관, 대학교, 시니어클럽 및 시민과 밀착하여 실제 현장의 목소리를 솔루션에 실시간 반영합니다.
            </p>
          </div>
        </div>

        {/* Company History & Milestones */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-300 shadow-sm mb-16 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-300 pb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-950">르네상스 주요 발자취</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold">지속 가능한 소셜 임팩트의 여정</p>
            </div>
            <span className="text-xs font-bold text-blue-900 bg-blue-100 px-3.5 py-1 rounded-full border border-blue-300">
              소셜벤처 인증
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {COMPANY_MILESTONES.map((m, idx) => (
              <div key={idx} className="relative space-y-2 p-6 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-blue-600">{m.year}</div>
                <h4 className="font-extrabold text-slate-950 text-base sm:text-lg">{m.title}</h4>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cheonan Headquarters Info (6 cols) */}
          <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6 shadow-xl">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400">
                <MapPin className="w-4 h-4" />
                <span>천안 본사 오시는 길</span>
              </div>
              <h3 className="text-2xl font-black text-white">주식회사 르네상스 천안 사옥</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                충청남도 천안시 서북구 불당21로 67 (천안스마트이노베이션타워 8층)
              </p>
            </div>

            {/* Detailed Contact List */}
            <div className="space-y-4 pt-2 border-t border-slate-800 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-2xl bg-slate-900 text-blue-400 shrink-0 border border-slate-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">대표 전화</div>
                  <div className="font-bold text-white text-base">041-550-2026 / 041-550-2027</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-2xl bg-slate-900 text-blue-400 shrink-0 border border-slate-800">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">대표 이메일</div>
                  <div className="font-bold text-white text-base">contact@renaissance-ai.kr</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-2xl bg-slate-900 text-blue-400 shrink-0 border border-slate-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">운영 및 상담 시간</div>
                  <div className="font-bold text-white">평일 09:00 ~ 18:00 (점심시간 12:00~13:00)</div>
                </div>
              </div>
            </div>

            {/* Accessibility Facility Notice for Visitors */}
            <div className="p-5 rounded-3xl bg-blue-950/80 border border-blue-400/40 text-xs text-blue-200 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-blue-300">
                <ShieldCheck className="w-4 h-4" />
                <span>방문객 무장애 편의시설 완비 안내</span>
              </div>
              <p className="leading-relaxed text-slate-200 font-medium">
                사옥 전 층 휠체어 진입 가능 (지하주차장 전용 엘리베이터 및 급속충전기 완비), 
                시각장애인 유도 음성안내 및 수어 상담사 상주.
              </p>
            </div>
          </div>

          {/* Contact / Partnership Inquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-slate-300 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">제휴·도입 및 시민 문의</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                AI 배리어프리 기술 도입, 지자체 실증 사업, 자원봉사 참여 문의를 남겨주세요.
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 text-center space-y-2 animate-in fade-in duration-300">
                <CheckCircle className="w-10 h-10 text-blue-600 mx-auto" />
                <h4 className="font-bold text-blue-950 text-base">문의가 정상적으로 접수되었습니다!</h4>
                <p className="text-xs text-blue-700 font-medium">
                  르네상스 천안 본사 담당자가 확인 후 24시간 이내에 친절히 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">이름 또는 기관명</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="예: 홍길동 (또는 천안시 OO복지관)"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">연락처 / 이메일</label>
                  <input
                    type="text"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="예: 010-0000-0000 또는 email@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">문의 유형</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                  >
                    <option value="기술도입 및 협업 문의">AI 배리어프리 기술 도입 및 지자체 협업</option>
                    <option value="천안시 배리어프리 지도 제보">천안시 배리어프리 편의시설 제보 및 오류 수정</option>
                    <option value="자원봉사 및 서포터즈 참여">자원봉사단 및 시민 서포터즈 참여 신청</option>
                    <option value="기타 제안 및 피드백">기타 서비스 피드백 및 정책 제안</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">문의 내용</label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="문의하실 내용을 자유롭게 적어주세요..."
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>문의 및 신청서 보내기</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
