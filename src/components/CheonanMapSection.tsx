import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Accessibility, 
  Zap, 
  Check, 
  Star, 
  Building, 
  Bus, 
  Coffee, 
  Landmark, 
  Hospital, 
  Volume2, 
  Search,
  Plus,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CHEONAN_BARRIER_FREE_SPOTS } from '../data/mockData';
import { BarrierFreeSpot } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

export const CheonanMapSection: React.FC = () => {
  const { speak, settings } = useAccessibility();
  const [spots, setSpots] = useState<BarrierFreeSpot[]>(CHEONAN_BARRIER_FREE_SPOTS);
  const [selectedSpot, setSelectedSpot] = useState<BarrierFreeSpot>(CHEONAN_BARRIER_FREE_SPOTS[0]);
  const [districtFilter, setDistrictFilter] = useState<'전체' | '서북구' | '동남구'>('전체');
  const [categoryFilter, setCategoryFilter] = useState<string>('전체');
  const [featureFilters, setFeatureFilters] = useState<{
    ramp: boolean;
    elevator: boolean;
    restroom: boolean;
    charger: boolean;
    braille: boolean;
    signLanguage: boolean;
  }>({
    ramp: false,
    elevator: false,
    restroom: false,
    charger: false,
    braille: false,
    signLanguage: false,
  });

  const categories = ['전체', '교통', '문화/관광', '공공기관', '식당/카페', '복지시설'];

  // Filter logic
  const filteredSpots = spots.filter((spot) => {
    const matchDistrict = districtFilter === '전체' || spot.district === districtFilter;
    const matchCategory = categoryFilter === '전체' || spot.category === categoryFilter;
    const matchRamp = !featureFilters.ramp || spot.features.wheelchairRamp;
    const matchElevator = !featureFilters.elevator || spot.features.elevator;
    const matchRestroom = !featureFilters.restroom || spot.features.disabledRestroom;
    const matchCharger = !featureFilters.charger || spot.features.electricWheelchairCharger;
    const matchBraille = !featureFilters.braille || spot.features.brailleGuide;
    const matchSign = !featureFilters.signLanguage || spot.features.signLanguage;

    return (
      matchDistrict &&
      matchCategory &&
      matchRamp &&
      matchElevator &&
      matchRestroom &&
      matchCharger &&
      matchBraille &&
      matchSign
    );
  });

  const handleSpotSelect = (spot: BarrierFreeSpot) => {
    setSelectedSpot(spot);
    if (settings.textToSpeech) {
      speak(`${spot.name}. 주소: ${spot.address}. 주요 편의시설: ${spot.description}`);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case '교통': return <Bus className="w-4 h-4" />;
      case '문화/관광': return <Landmark className="w-4 h-4" />;
      case '공공기관': return <Building className="w-4 h-4" />;
      case '식당/카페': return <Coffee className="w-4 h-4" />;
      case '복지시설': return <Accessibility className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-950 border-b border-slate-200" id="cheonan-map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold border border-blue-300">
            <MapPin className="w-4 h-4 text-blue-700" />
            <span>천안시 배리어프리 지도 & 무장애 인프라</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            천안 구석구석, <br className="sm:hidden" />
            <span className="text-blue-600">문턱 없는 무장애 안심 공간</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
            충청남도 천안시 관내 공공기관, 교통거점, 복지관, 문화관광지의 
            경사로·엘리베이터·전동휠체어 충전소 정보를 실시간으로 확인하세요.
          </p>
        </div>

        {/* Filters Box */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-300 shadow-xs mb-8 space-y-4">
          {/* Row 1: Districts & Categories */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* District Buttons */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-slate-300">
              <span className="text-xs font-bold text-slate-700 px-3">천안시 행정구:</span>
              {(['전체', '서북구', '동남구'] as const).map((dist) => (
                <button
                  key={dist}
                  type="button"
                  onClick={() => setDistrictFilter(dist)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    districtFilter === dist
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>

            {/* Category Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Barrier-free Feature Checkbox Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-300">
            <span className="text-xs font-bold text-slate-800 mr-1">편의시설 필터:</span>
            
            <button
              type="button"
              onClick={() => setFeatureFilters(f => ({ ...f, ramp: !f.ramp }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                featureFilters.ramp
                  ? 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${featureFilters.ramp ? 'text-blue-700' : 'opacity-0'}`} />
              <span>휠체어 경사로</span>
            </button>

            <button
              type="button"
              onClick={() => setFeatureFilters(f => ({ ...f, elevator: !f.elevator }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                featureFilters.elevator
                  ? 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${featureFilters.elevator ? 'text-blue-700' : 'opacity-0'}`} />
              <span>엘리베이터</span>
            </button>

            <button
              type="button"
              onClick={() => setFeatureFilters(f => ({ ...f, restroom: !f.restroom }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                featureFilters.restroom
                  ? 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${featureFilters.restroom ? 'text-blue-700' : 'opacity-0'}`} />
              <span>장애인 화장실</span>
            </button>

            <button
              type="button"
              onClick={() => setFeatureFilters(f => ({ ...f, charger: !f.charger }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                featureFilters.charger
                  ? 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-blue-700" />
              <span>전동휠체어 급속충전기</span>
            </button>

            <button
              type="button"
              onClick={() => setFeatureFilters(f => ({ ...f, braille: !f.braille }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                featureFilters.braille
                  ? 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${featureFilters.braille ? 'text-blue-700' : 'opacity-0'}`} />
              <span>점자/음성 안내</span>
            </button>

            <button
              type="button"
              onClick={() => setFeatureFilters(f => ({ ...f, signLanguage: !f.signLanguage }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
                featureFilters.signLanguage
                  ? 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${featureFilters.signLanguage ? 'text-blue-700' : 'opacity-0'}`} />
              <span>수어 통역 지원</span>
            </button>
          </div>
        </div>

        {/* Map Layout: Left Side Spot Directory, Right Side Visual Spatial Radar & Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Spot List (5 cols) */}
          <div className="lg:col-span-5 space-y-3 max-h-[680px] overflow-y-auto pr-1">
            <div className="text-xs font-extrabold text-slate-700 px-1 flex items-center justify-between">
              <span>천안시 등록 배리어프리 거점 ({filteredSpots.length}곳)</span>
              <span>선택하여 상세 정보 보기</span>
            </div>

            {filteredSpots.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-300 text-slate-700 text-xs font-medium">
                해당 필터에 일치하는 천안시 시설이 없습니다. 필터를 재설정해보세요.
              </div>
            ) : (
              filteredSpots.map((spot) => {
                const isSelected = selectedSpot.id === spot.id;
                return (
                  <div
                    key={spot.id}
                    onClick={() => handleSpotSelect(spot)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-600 shadow-md ring-1 ring-blue-500/20'
                        : 'bg-white border-slate-300 hover:border-blue-400 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-2xl bg-blue-100 text-blue-700 shrink-0">
                          {getCategoryIcon(spot.category)}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-950 text-sm sm:text-base">{spot.name}</h4>
                          <span className="text-[11px] text-slate-600 font-semibold">{spot.district} · {spot.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                        <Star className="w-3 h-3 fill-amber-600 text-amber-600" />
                        <span>{spot.score}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed mb-2 font-medium">
                      {spot.description}
                    </p>

                    {/* Features Mini Icons */}
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {spot.features.wheelchairRamp && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-semibold border border-slate-200">경사로</span>
                      )}
                      {spot.features.elevator && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-semibold border border-slate-200">엘리베이터</span>
                      )}
                      {spot.features.disabledRestroom && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-semibold border border-slate-200">장애인화장실</span>
                      )}
                      {spot.features.electricWheelchairCharger && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-200">⚡급속충전기</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Visual Map Canvas & Spotlight Detail (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Interactive Map Canvas */}
            <div className="relative h-72 sm:h-80 rounded-3xl bg-slate-950 overflow-hidden border border-slate-800 shadow-xl flex flex-col justify-between p-6">
              {/* Simulated Map Visual Grid & Cheonan Roads */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
              
              {/* SVG Roads and City Regions */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <path d="M 0 160 Q 200 120 400 180 T 800 140" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6 4" />
                <path d="M 120 0 Q 240 180 300 400" fill="none" stroke="#60a5fa" strokeWidth="3" />
                <path d="M 350 0 Q 320 200 450 400" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4 4" />
                <circle cx="280" cy="150" r="40" fill="#2563eb" opacity="0.15" />
                <circle cx="480" cy="180" r="50" fill="#3b82f6" opacity="0.12" />
              </svg>

              {/* Map Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-slate-700 text-xs text-white font-bold">
                  <Navigation className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  <span>천안시 배리어프리 인터랙티브 맵</span>
                </div>

                <div className="text-xs text-slate-300 font-semibold bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                  중심좌표: 천안시 불당동 / 대흥동
                </div>
              </div>

              {/* Interactive Spot Pins on Map Canvas */}
              <div className="relative z-10 grid grid-cols-4 gap-2 my-auto">
                {spots.slice(0, 8).map((spot, i) => {
                  const isCur = selectedSpot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleSpotSelect(spot)}
                      className={`p-2 rounded-2xl text-left transition-all border transform hover:scale-105 cursor-pointer ${
                        isCur
                          ? 'bg-blue-600 text-white border-white shadow-lg shadow-blue-500/50 scale-105 ring-2 ring-blue-300'
                          : 'bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-extrabold truncate">
                        <MapPin className={`w-3 h-3 shrink-0 ${isCur ? 'text-white' : 'text-blue-400'}`} />
                        <span className="truncate">{spot.name.split(' ')[0]}</span>
                      </div>
                      <div className="text-[9px] text-slate-300 font-semibold truncate mt-0.5">{spot.district}</div>
                    </button>
                  );
                })}
              </div>

              {/* Map Bottom Status */}
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 border-t border-slate-800 pt-2 font-medium">
                <span>📍 실시간 제보 반영 시스템 가동중</span>
                <span className="text-blue-300 font-bold">천안시 스마트도시과 협력</span>
              </div>
            </div>

            {/* Selected Spot Detailed Card */}
            {selectedSpot && (
              <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-md space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                        {selectedSpot.district}
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-900">
                        {selectedSpot.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                        <span>{selectedSpot.score}점 (리뷰 {selectedSpot.reviewsCount}건)</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-950 mt-2">
                      {selectedSpot.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      {selectedSpot.address}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => speak(`${selectedSpot.name}. ${selectedSpot.address}. ${selectedSpot.description}. 이용 팁: ${selectedSpot.recommendedTip}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold border border-slate-300 shadow-xs transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-blue-600" />
                    <span>음성 안내</span>
                  </button>
                </div>

                {/* Spot Features Matrix */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase">보유 배리어프리 편의시설</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 ${
                      selectedSpot.features.wheelchairRamp ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-slate-200 text-slate-500 border-slate-300 line-through'
                    }`}>
                      <Check className="w-3.5 h-3.5 text-blue-700" />
                      <span>휠체어 경사로</span>
                    </div>

                    <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 ${
                      selectedSpot.features.elevator ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-slate-200 text-slate-500 border-slate-300 line-through'
                    }`}>
                      <Check className="w-3.5 h-3.5 text-blue-700" />
                      <span>엘리베이터</span>
                    </div>

                    <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 ${
                      selectedSpot.features.disabledRestroom ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-slate-200 text-slate-500 border-slate-300 line-through'
                    }`}>
                      <Check className="w-3.5 h-3.5 text-blue-700" />
                      <span>장애인 화장실</span>
                    </div>

                    <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 ${
                      selectedSpot.features.electricWheelchairCharger ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-slate-200 text-slate-500 border-slate-300 line-through'
                    }`}>
                      <Zap className="w-3.5 h-3.5 text-blue-700" />
                      <span>급속 충전기</span>
                    </div>
                  </div>
                </div>

                {/* Description & Recommended Tip */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
                    <span className="font-extrabold text-slate-950 block mb-1">상세 공간 설명:</span>
                    {selectedSpot.description}
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-100/70 border border-blue-300 text-blue-950 text-xs sm:text-sm flex items-start gap-2.5">
                    <span className="text-base">💡</span>
                    <div>
                      <span className="font-extrabold text-blue-900 block mb-0.5">이용자 추천 꿀팁:</span>
                      <span className="font-semibold">{selectedSpot.recommendedTip}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
