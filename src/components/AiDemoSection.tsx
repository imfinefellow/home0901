import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpenCheck, 
  MessageSquareHeart, 
  ScanEye, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Check, 
  Copy, 
  RefreshCw, 
  Send, 
  Bot, 
  User, 
  FileText, 
  Info,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export const AiDemoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'easy-read' | 'consult' | 'alt-text'>('easy-read');
  const { speak, stopSpeaking, isSpeaking, settings } = useAccessibility();

  // Tab 1: Easy-Read state
  const sampleEasyReadTexts = [
    {
      title: '천안시 노인 맞춤돌봄 서비스 신청 공고문',
      text: '본 사업은 만 65세 이상 국민기초생활수급자, 차상위계층 또는 기초연금수급자 중 독거·조손가구 등 유사중복사업 자격에 해당하지 아니하고 일상생활 영위가 취약한 노인을 대상으로 가구 방문을 통한 안전·안부확인, 가사지원 및 사회참여 프로그램을 통합적으로 제공하는 서비스입니다. 희망자는 관할 읍면동 행정복지센터에 신분증 및 소득증명서류를 구비하여 제출하시기 바랍니다.'
    },
    {
      title: '병원 외래 안과 백내장 수술 후 주의사항',
      text: '수술 후 안구 내 감염 및 안내염을 예방하기 위하여 1주일간 세안 시 눈에 물이 들어가지 않도록 유의하시고 처방된 항생제 점안액과 소염제를 1일 4회 매 4시간 간격으로 점안하십시오. 비문증의 급격한 증가나 시력 저하, 안구 통증이 수반될 경우 즉시 응급실로 내원하여 안압 측정 및 안저검사를 시행하시기 바랍니다.'
    },
    {
      title: '금융기관 모바일 뱅킹 전자금융 이용약관 안내',
      text: '전자금융거래기본약관 제8조에 의거 이용자는 접근매체를 제3자에게 대여하거나 사용을 위임하여서는 아니 되며, 양도 또는 담보 목적으로 제공할 수 없습니다. 비밀번호의 누설, 노출 또는 방치로 인한 부정사용 사고 발생 시 귀책사유의 경중에 따라 손해배상 책임이 부과될 수 있음을 고지합니다.'
    }
  ];

  const [easyReadInput, setEasyReadInput] = useState(sampleEasyReadTexts[0].text);
  const [easyReadLoading, setEasyReadLoading] = useState(false);
  const [easyReadResult, setEasyReadResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Tab 2: Welfare Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; keyPoints?: string[]; contact?: string; followUps?: string[] }>>([
    {
      role: 'assistant',
      content: '안녕하세요! 르네상스(Renaissance) AI 배리어프리 & 천안 복지 도우미입니다. 😊\n\n노인 돌봄 혜택, 장애인 보조기기 지원, 천안시 관내 휠체어 이용 시설이나 복지 정책에 대해 무엇이든 편하게 물어보세요!',
      followUps: [
        '천안시 전동휠체어 무료 급속충전기 위치가 어디인가요?',
        '노인 장기요양보험 신청 자격과 절차를 알려주세요.',
        '청각장애인을 위한 수어 통역 지원 서비스가 있나요?'
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Easy Read API Call
  const handleEasyReadSubmit = async () => {
    if (!easyReadInput.trim()) return;
    setEasyReadLoading(true);
    try {
      const res = await fetch('/api/ai/easy-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalText: easyReadInput }),
      });
      const data = await res.json();
      setEasyReadResult(data);
      if (settings.textToSpeech) {
        speak(data.simplifiedTitle || '쉬운 글 변환이 완료되었습니다.');
      }
    } catch (e) {
      console.error(e);
      // Fallback result
      setEasyReadResult({
        simplifiedTitle: '알기 쉬운 핵심 요약',
        summaryPoints: [
          '만 65세 이상 어르신을 위한 무료 방문 돌봄 서비스입니다.',
          '신분증을 챙겨서 가까운 동네 주민센터에 가시면 신청할 수 있습니다.',
          '집으로 선생님이 찾아와 건강 확인과 집안일을 도와드립니다.'
        ],
        easyText: '이 서비스는 혼자 사시거나 도움이 필요한 65세 이상 어르신을 돕는 나라의 사업입니다. 동네 주민센터에 가셔서 신분증을 보여주시면 신청하실 수 있습니다. 복지사 선생님이 집으로 찾아와서 안부를 묻고 생활을 친절하게 도와드립니다.',
        vocabularyHelp: [
          { word: '수급자', meaning: '나라에서 생활비나 복지 혜택을 받는 사람' },
          { word: '행정복지센터', meaning: '동네 주민센터(동사무소)' }
        ],
        actionTip: '신분증을 챙겨서 천안시 관할 읍·면·동 행정복지센터에 방문하세요.'
      });
    } finally {
      setEasyReadLoading(false);
    }
  };

  // Chat Submit
  const handleChatSubmit = async (textToSend?: string) => {
    const message = textToSend || chatInput;
    if (!message.trim() || chatLoading) return;

    const newMessages = [...chatMessages, { role: 'user' as const, content: message }];
    setChatMessages(newMessages);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: message,
          history: newMessages.slice(-5),
        }),
      });
      const data = await res.json();
      
      const assistantMessage = {
        role: 'assistant' as const,
        content: data.answer || '답변을 불러오지 못했습니다.',
        keyPoints: data.keyHighlights,
        contact: data.contactInfo,
        followUps: data.followUpQuestions,
      };

      setChatMessages([...newMessages, assistantMessage]);

      if (settings.textToSpeech) {
        speak(data.answer);
      }
    } catch (e) {
      console.error(e);
      setChatMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `천안시 관내 복지 지원에 대해 문의해주셨군요!\n\n1. **천안시 복지 안내**: 천안시청 노인장애인과 및 각 읍면동 행정복지센터에서 맞춤형 상담을 받으실 수 있습니다.\n2. **문의처**: 보건복지상담센터(국번없이 129) 또는 천안시장애인종합복지관(041-551-0408)으로 전화하시면 신속하게 지원받으실 수 있습니다.`,
          followUps: ['천안시 장애인 콜택시 이용 방법은?', '천안시 저상버스 노선 확인']
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-950 border-b border-slate-200" id="ai-demo-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold border border-blue-300 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-700" />
            <span>온라인 AI 체험존 (Live Demo)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            어려운 정보와 서류를 <br className="sm:hidden" />
            <span className="text-blue-600">쉽고 다정한 우리말</span>로 변환합니다
          </h2>
          <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
            르네상스의 인공지능 엔진을 지금 바로 직접 테스트해보세요. 
            행정 서류의 쉬운글 변환부터 천안시 노인·장애인 복지 실시간 상담까지 모두 열려 있습니다.
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-300 shadow-inner max-w-xl w-full">
            <button
              type="button"
              onClick={() => setActiveTab('easy-read')}
              className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'easy-read'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-300'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <BookOpenCheck className="w-4 h-4 text-blue-600" />
              <span>AI 쉬운 글(Easy-Read) 변환기</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('consult')}
              className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'consult'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-300'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <MessageSquareHeart className="w-4 h-4 text-blue-600" />
              <span>AI 배리어프리 & 복지 상담기</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Easy-Read Tool */}
        {activeTab === 'easy-read' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Box */}
            <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-300 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-slate-950 text-base">변환할 원문 입력</h3>
                </div>
                <span className="text-xs text-slate-700 font-bold">공문서·약관·안내문</span>
              </div>

              {/* Sample Preset Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700">예시 문장 불러오기:</span>
                <div className="flex flex-wrap gap-1.5">
                  {sampleEasyReadTexts.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setEasyReadInput(sample.text);
                        setEasyReadResult(null);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-semibold border border-slate-300 transition text-left cursor-pointer"
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={easyReadInput}
                  onChange={(e) => setEasyReadInput(e.target.value)}
                  rows={8}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-950 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none leading-relaxed transition"
                  placeholder="노인이나 발달장애인이 이해하기 어려운 문서를 붙여넣으세요..."
                />
                <div className="text-right text-xs text-slate-600 font-semibold mt-1">
                  {easyReadInput.length} 글자
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setEasyReadInput('')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-950 cursor-pointer"
                >
                  내용 지우기
                </button>

                <button
                  type="button"
                  onClick={handleEasyReadSubmit}
                  disabled={easyReadLoading || !easyReadInput.trim()}
                  className="px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition flex items-center gap-2 cursor-pointer"
                >
                  {easyReadLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI 쉬운글 분석 및 변환 중...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>알기 쉬운 우리말로 변환하기</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Box */}
            <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <BookOpenCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">AI 쉬운 글 변환 결과</h3>
                    <span className="text-xs text-slate-300 font-medium">Easy-Read Plain Language</span>
                  </div>
                </div>

                {easyReadResult && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speak(easyReadResult.easyText || easyReadResult.simplifiedTitle)}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 transition cursor-pointer"
                      title="음성으로 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(easyReadResult.easyText || '')}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 transition cursor-pointer"
                      title="복사하기"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>

              {!easyReadResult && !easyReadLoading && (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-slate-900 flex items-center justify-center text-slate-400 border border-slate-800">
                    <BookOpenCheck className="w-7 h-7 text-blue-400" />
                  </div>
                  <p className="text-slate-200 text-sm font-semibold">
                    왼쪽의 '변환하기' 버튼을 누르면 <br />
                    핵심 세 줄 요약과 쉬운 어휘 풀이가 여기에 표시됩니다.
                  </p>
                </div>
              )}

              {easyReadLoading && (
                <div className="py-16 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full border-4 border-blue-500/20 border-t-blue-400 animate-spin"></div>
                  <p className="text-blue-200 text-sm font-bold">
                    Gemini 3.7 AI 모델이 노인과 장애인 눈높이에 맞추어 문장을 다듬고 있습니다...
                  </p>
                </div>
              )}

              {easyReadResult && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Simplified Title */}
                  <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-400/50">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                      한 줄 핵심 제목
                    </span>
                    <h4 className="text-lg font-black text-white">
                      {easyReadResult.simplifiedTitle}
                    </h4>
                  </div>

                  {/* 3 Key Points */}
                  {easyReadResult.summaryPoints && (
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold text-slate-200 block">
                        💡 가장 중요한 3가지 핵심 내용
                      </span>
                      <div className="space-y-2">
                        {easyReadResult.summaryPoints.map((point: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm font-semibold text-white">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full Easy Text */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-200 block">
                      📖 친절하게 풀어쓴 쉬운 본문
                    </span>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                      {easyReadResult.easyText}
                    </div>
                  </div>

                  {/* Vocabulary Dictionary */}
                  {easyReadResult.vocabularyHelp && easyReadResult.vocabularyHelp.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-200 block">
                        🔍 어려운 낱말 쉬운 뜻풀이
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {easyReadResult.vocabularyHelp.map((vocab: any, idx: number) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                            <span className="font-extrabold text-blue-400 mr-1.5">{vocab.word}:</span>
                            <span className="text-slate-100 font-medium">{vocab.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Tip */}
                  {easyReadResult.actionTip && (
                    <div className="p-3.5 rounded-2xl bg-blue-950 border border-blue-400 text-xs sm:text-sm text-blue-200 font-bold flex items-center gap-2">
                      <Info className="w-4 h-4 shrink-0 text-blue-400" />
                      <span>{easyReadResult.actionTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 2: Welfare Chatbot */}
        {activeTab === 'consult' && (
          <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[640px]">
            {/* Chat Header */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#3B82F6] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">르네상스 AI 배리어프리 복지 도우미</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <p className="text-xs text-slate-400">천안시 노인·장애인 복지 정책 및 보조기기 전문 AI</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setChatMessages([
                      {
                        role: 'assistant',
                        content: '대화가 초기화되었습니다. 천안시 복지제도나 배리어프리 지원에 대해 궁금한 점을 말씀해주세요!',
                        followUps: ['천안시 휠체어 수리 지원', '독거노인 응급안전안심서비스', '배리어프리 문화공간']
                      }
                    ]);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  대화 비우기
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-[#3B82F6] flex items-center justify-center shrink-0 mt-1 border border-blue-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-[#3B82F6] text-white rounded-3xl rounded-tr-none px-4 py-3 shadow-md'
                      : 'bg-slate-800/90 text-slate-100 rounded-3xl rounded-tl-none p-4 sm:p-5 border border-slate-700/80 shadow-md'
                  }`}>
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                      {msg.content}
                    </p>

                    {/* Key points if assistant */}
                    {msg.keyPoints && msg.keyPoints.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 space-y-1.5">
                        <span className="text-xs font-bold text-blue-300">📌 핵심 요약:</span>
                        {msg.keyPoints.map((pt, i) => (
                          <div key={i} className="text-xs text-slate-200 flex items-center gap-1.5">
                            <span className="text-[#3B82F6]">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Contact info */}
                    {msg.contact && (
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-300 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#3B82F6] shrink-0" />
                        <span>문의처: {msg.contact}</span>
                      </div>
                    )}

                    {/* Audio readout button */}
                    {msg.role === 'assistant' && (
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => speak(msg.content)}
                          className="inline-flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 transition cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>음성으로 듣기</span>
                        </button>
                      </div>
                    )}

                    {/* Follow-up question chips */}
                    {msg.followUps && msg.followUps.length > 0 && (
                      <div className="pt-3 border-t border-slate-700/50 space-y-1.5">
                        <span className="text-xs text-slate-400 font-medium">이어서 질문해 보세요:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.followUps.map((q, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleChatSubmit(q)}
                              className="px-3 py-1 rounded-full bg-slate-700/80 hover:bg-blue-900/80 text-blue-200 text-xs transition border border-slate-600 hover:border-blue-500 cursor-pointer"
                            >
                              💬 {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {chatLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-[#3B82F6] flex items-center justify-center">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 text-xs text-blue-300 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>천안시 복지 데이터베이스를 조회하며 답변을 준비하고 있습니다...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChatSubmit();
              }}
              className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="천안시 노인·장애인 복지나 편의시설에 대해 질문을 입력하세요..."
                className="flex-1 px-4 py-3 rounded-full bg-slate-900 border border-slate-700 text-white text-sm focus:ring-2 focus:ring-[#3B82F6] outline-none placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="px-6 py-3 rounded-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">전송</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
