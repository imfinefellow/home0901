import React, { useState, useEffect } from 'react';
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  VolumeX, 
  Type, 
  Layers, 
  X, 
  RotateCcw, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mouseY, setMouseY] = useState(0);

  const {
    settings,
    setFontSize,
    toggleHighContrast,
    toggleTextToSpeech,
    toggleSimpleMode,
    toggleReadingRuler,
    resetAccessibility,
    speak,
    stopSpeaking,
    isSpeaking,
  } = useAccessibility();

  // Reading ruler tracker
  useEffect(() => {
    if (!settings.readingRuler) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingRuler]);

  return (
    <>
      {/* Screen Reading Ruler Overlay if enabled */}
      {settings.readingRuler && (
        <div
          className="fixed left-0 right-0 h-10 bg-blue-500/15 border-y-2 border-[#3B82F6] pointer-events-none z-50 transition-all duration-75"
          style={{ top: `${mouseY - 20}px` }}
        />
      )}

      {/* Floating Accessibility Widget Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/30 border-2 border-blue-300/40 transition transform hover:scale-105 cursor-pointer"
            aria-label="웹 접근성 설정 도구 열기"
            title="웹 접근성 설정 도구 열기"
          >
            <Accessibility className="w-5 h-5 text-white animate-pulse" />
            <span>접근성 도구함</span>
          </button>
        ) : (
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-700 shadow-2xl w-72 sm:w-80 space-y-4 animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-sm text-white">웹 접근성 맞춤 설정</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Font Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-blue-400" /> 글자 크기
                </span>
                <span className="text-blue-300 font-bold">
                  {settings.fontSize === 'normal' ? '기본 (100%)' : settings.fontSize === 'large' ? '크게 (120%)' : '아주 크게 (140%)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['normal', 'large', 'xlarge'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFontSize(size)}
                    className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      settings.fontSize === size
                        ? 'bg-[#3B82F6] text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {size === 'normal' ? '보통' : size === 'large' ? '크게' : '아주크게'}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between py-1 border-t border-slate-800/80">
              <div className="text-xs">
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-400" /> 고대비 흑백 모드
                </div>
                <div className="text-[10px] text-slate-400">시각 대비 강화</div>
              </div>
              <button
                type="button"
                onClick={toggleHighContrast}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  settings.highContrast
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {settings.highContrast ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Reading Ruler Toggle */}
            <div className="flex items-center justify-between py-1 border-t border-slate-800/80">
              <div className="text-xs">
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-400" /> 독서용 줄자선 가이드
                </div>
                <div className="text-[10px] text-slate-400">마우스 따라가기</div>
              </div>
              <button
                type="button"
                onClick={toggleReadingRuler}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  settings.readingRuler
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {settings.readingRuler ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* TTS Sound Toggle */}
            <div className="flex items-center justify-between py-1 border-t border-slate-800/80">
              <div className="text-xs">
                <div className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" /> 음성 낭독 (TTS)
                </div>
                <div className="text-[10px] text-slate-400">내용 소리내어 읽기</div>
              </div>
              <button
                type="button"
                onClick={toggleTextToSpeech}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  settings.textToSpeech
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {settings.textToSpeech ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={resetAccessibility}
                className="w-full py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>모든 설정 기본값으로 초기화</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
