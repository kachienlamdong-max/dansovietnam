import React, { useState } from 'react';
import { RegionId } from '../../types';
import { DETAILED_REGIONS, TEXTBOOK_DENSITY_LEGEND, POPULATION_PYRAMID_DATA } from '../../data/vietnamDetailedMapData';
import { playHoverSound } from '../../utils/audio';
import { Compass, Info, BarChart3, Star, MapPin } from 'lucide-react';

interface VietnamTextbookMapProps {
  onRegionSelect: (regionId: RegionId) => void;
  selectedRegionId: RegionId | null;
  targetRegionId?: RegionId | null;
  flashState?: {
    regionId: RegionId;
    type: 'correct' | 'incorrect';
  } | null;
  interactive?: boolean;
}

export const VietnamTextbookMap: React.FC<VietnamTextbookMapProps> = ({
  onRegionSelect,
  selectedRegionId,
  targetRegionId,
  flashState,
  interactive = true
}) => {
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null);
  const [showPyramid, setShowPyramid] = useState(false);

  const regionList = Object.keys(DETAILED_REGIONS) as RegionId[];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#e0f2fe] border-2 border-slate-700/80 shadow-2xl select-none">
      {/* Top Map Header Ribbon (Textbook style) */}
      <div className="bg-slate-900/95 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-amber-300">
            BẢN ĐỒ MẬT ĐỘ DÂN SỐ VIỆT NAM (CHUẨN SGK KẾT NỐI TRI THỨC)
          </h3>
        </div>

        <button
          onClick={() => setShowPyramid(!showPyramid)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
            showPyramid
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
              : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-750'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Tháp dân số 1979 - 2024</span>
        </button>
      </div>

      {/* Main SVG Map Container */}
      <div className="relative w-full aspect-[650/920] max-h-[750px] mx-auto bg-[#cbeafe] overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 650 920"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
        >
          {/* Subtle Latitude / Longitude Coordinate Grid */}
          <defs>
            <pattern id="coordGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#93c5fd" strokeWidth="0.5" strokeDasharray="3 3" />
            </pattern>
            {/* Drop shadow filter for regions */}
            <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>

          <rect width="650" height="920" fill="url(#coordGrid)" />

          {/* Sea Labels */}
          <text x="440" y="270" fill="#1e40af" fontSize="16" fontWeight="bold" fontStyle="italic" opacity="0.6">
            VỊNH BẮC BỘ
          </text>
          <text x="510" y="620" fill="#1e40af" fontSize="22" fontWeight="800" fontStyle="italic" opacity="0.65" letterSpacing="6">
            BIỂN ĐÔNG
          </text>
          <text x="60" y="850" fill="#1e40af" fontSize="14" fontWeight="bold" fontStyle="italic" opacity="0.6" transform="rotate(-30 60 850)">
            VỊNH THÁI LAN
          </text>

          {/* Neighboring Country Labels */}
          <text x="420" y="35" fill="#64748b" fontSize="15" fontWeight="bold" letterSpacing="4">
            TRUNG QUỐC
          </text>
          <text x="110" y="290" fill="#64748b" fontSize="15" fontWeight="bold" letterSpacing="3">
            LÀO
          </text>
          <text x="210" y="650" fill="#64748b" fontSize="15" fontWeight="bold" letterSpacing="3">
            CAM-PU-CHIA
          </text>

          {/* S-Shape Shadow Base */}
          <g filter="url(#mapShadow)">
            {regionList.map((rId) => (
              <path
                key={`shadow-${rId}`}
                d={DETAILED_REGIONS[rId].svgPath}
                fill="#334155"
                opacity="0.2"
                transform="translate(4, 5)"
              />
            ))}
          </g>

          {/* 6 Socio-Economic Regions (Interactive SVG Paths) */}
          {regionList.map((rId) => {
            const r = DETAILED_REGIONS[rId];
            const isHovered = hoveredRegionId === rId;
            const isSelected = selectedRegionId === rId;
            const isFlashCorrect = flashState?.regionId === rId && flashState.type === 'correct';
            const isFlashIncorrect = flashState?.regionId === rId && flashState.type === 'incorrect';

            let fillColor = r.mapFillColor;
            let strokeColor = '#78350f';
            let strokeWidth = 1.5;

            if (isFlashCorrect) {
              fillColor = '#22c55e'; // Bright glowing green
              strokeColor = '#15803d';
              strokeWidth = 3.5;
            } else if (isFlashIncorrect) {
              fillColor = '#ef4444'; // Bright flashing red
              strokeColor = '#b91c1c';
              strokeWidth = 3.5;
            } else if (isSelected) {
              fillColor = r.mapHoverColor;
              strokeColor = '#0f172a';
              strokeWidth = 3;
            } else if (isHovered) {
              fillColor = r.mapHoverColor;
              strokeWidth = 2.5;
            }

            return (
              <g key={rId} className="cursor-pointer transition-all duration-150">
                <path
                  d={r.svgPath}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  onClick={() => interactive && onRegionSelect(rId)}
                  onMouseEnter={() => {
                    setHoveredRegionId(rId);
                    playHoverSound();
                  }}
                  onMouseLeave={() => setHoveredRegionId(null)}
                  className="transition-colors duration-200"
                />

                {/* Major River Lines */}
                {r.keyRivers.map((riv, rivIdx) => (
                  <path
                    key={`river-${rId}-${rivIdx}`}
                    d={riv.path}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    pointerEvents="none"
                    opacity="0.85"
                  />
                ))}

                {/* Region Label Badge on Map */}
                <g
                  transform={`translate(${r.labelPosition.x}, ${r.labelPosition.y})`}
                  pointerEvents="none"
                  className="select-none"
                >
                  <rect
                    x="-65"
                    y="-12"
                    width="130"
                    height="24"
                    rx="6"
                    fill="#0f172a"
                    fillOpacity="0.85"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="4"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {r.shortName}
                  </text>
                </g>

                {/* Major Cities / Urban Points */}
                {r.cities.map((city, cIdx) => (
                  <g key={`city-${rId}-${cIdx}`} pointerEvents="none">
                    {city.isCapital ? (
                      /* Red Capital Star for Hanoi */
                      <g transform={`translate(${city.x}, ${city.y})`}>
                        <circle r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                        <polygon
                          points="0,-5 1.5,-1.5 5,-1.5 2,1 3.2,4.5 0,2.5 -3.2,4.5 -2,1 -5,-1.5 -1.5,-1.5"
                          fill="#facc15"
                        />
                        <text
                          x="10"
                          y="4"
                          fill="#7f1d1d"
                          fontSize="11"
                          fontWeight="bold"
                          stroke="#ffffff"
                          strokeWidth="2"
                          paintOrder="stroke"
                        >
                          {city.name}
                        </text>
                      </g>
                    ) : (
                      /* Standard City Dot / Square matching textbook */
                      <g transform={`translate(${city.x}, ${city.y})`}>
                        <rect x="-3" y="-3" width="6" height="6" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                        <text
                          x="6"
                          y="3"
                          fill="#0f172a"
                          fontSize="8.5"
                          fontWeight="600"
                          stroke="#ffffff"
                          strokeWidth="2"
                          paintOrder="stroke"
                        >
                          {city.name}
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </g>
            );
          })}

          {/* National Sovereignty: QUẦN ĐẢO HOÀNG SA */}
          <g transform="translate(500, 420)">
            <rect x="-95" y="-14" width="190" height="28" rx="6" fill="#0f172a" fillOpacity="0.85" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="0" y="4" fill="#fef08a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              QĐ. HOÀNG SA (ĐÀ NẴNG)
            </text>
            {/* Island cluster dots */}
            <circle cx="-35" cy="22" r="3" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="-15" cy="28" r="2.5" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="10" cy="20" r="3" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="30" cy="25" r="2.5" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="45" cy="35" r="2" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
          </g>

          {/* National Sovereignty: QUẦN ĐẢO TRƯỜNG SA */}
          <g transform="translate(515, 780)">
            <rect x="-105" y="-14" width="210" height="28" rx="6" fill="#0f172a" fillOpacity="0.85" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="0" y="4" fill="#fef08a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              QĐ. TRƯỜNG SA (KHÁNH HÒA)
            </text>
            {/* Island cluster dots */}
            <circle cx="-60" cy="25" r="3" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="-40" cy="35" r="2.5" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="-15" cy="20" r="3.2" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="20" cy="38" r="2.8" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="50" cy="25" r="2.2" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="65" cy="45" r="2.8" fill="#ea580c" stroke="#ffffff" strokeWidth="0.8" />
          </g>

          {/* Islands: Phú Quốc, Côn Đảo, Bạch Long Vĩ, Phú Quý */}
          <g transform="translate(165, 800)">
            <ellipse rx="8" ry="16" fill="#15803d" stroke="#ffffff" strokeWidth="1" transform="rotate(20)" />
            <text x="12" y="4" fill="#0f172a" fontSize="8" fontWeight="bold" stroke="#ffffff" strokeWidth="2" paintOrder="stroke">
              Đảo Phú Quốc
            </text>
          </g>

          <g transform="translate(345, 855)">
            <circle r="4" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
            <text x="8" y="3" fill="#0f172a" fontSize="8" fontWeight="bold" stroke="#ffffff" strokeWidth="2" paintOrder="stroke">
              Côn Đảo
            </text>
          </g>

          <g transform="translate(435, 230)">
            <circle r="3.5" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
            <text x="7" y="3" fill="#0f172a" fontSize="7.5" fontWeight="bold" stroke="#ffffff" strokeWidth="2" paintOrder="stroke">
              Bạch Long Vĩ
            </text>
          </g>

          <g transform="translate(435, 735)">
            <circle r="3" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
            <text x="6" y="3" fill="#0f172a" fontSize="7.5" fontWeight="bold" stroke="#ffffff" strokeWidth="2" paintOrder="stroke">
              Phú Quý
            </text>
          </g>
        </svg>

        {/* Floating Official Textbook Map Legend (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-10 max-w-[210px] md:max-w-[230px] bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-300 shadow-xl text-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2">
            CHÚ GIẢI MẬT ĐỘ (người/km²)
          </div>
          <div className="space-y-1.5">
            {TEXTBOOK_DENSITY_LEGEND.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[10px]">
                <span
                  className="w-4 h-3 rounded-sm border border-slate-400 shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-slate-800">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-500">
            <span>Tỉ lệ: 1 : 6.000.000</span>
            <span className="font-semibold text-emerald-700">SGK Địa lí 12</span>
          </div>
        </div>

        {/* Hover / Selected Region Overlay Box */}
        {hoveredRegionId && (
          <div className="absolute top-3 left-3 z-10 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-2xl text-white max-w-[260px] animate-fade-in pointer-events-none">
            <div className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
              Vùng địa lí được chọn
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              {DETAILED_REGIONS[hoveredRegionId].name}
            </h4>
            <div className="mt-2 flex items-center justify-between bg-slate-800/80 p-2 rounded-lg text-xs">
              <span className="text-slate-300">Mật độ dân số:</span>
              <span className="font-mono font-bold text-amber-300">
                {DETAILED_REGIONS[hoveredRegionId].densityText}
              </span>
            </div>
            <p className="text-[10.5px] text-slate-300 mt-2 leading-tight">
              Phân cấp theo SGK: <span className="font-semibold text-white">{DETAILED_REGIONS[hoveredRegionId].densityCategory}</span> người/km²
            </p>
          </div>
        )}
      </div>

      {/* Inset Population Pyramid (Tháp dân số 1979 & 2024 from Textbook top-right) */}
      {showPyramid && (
        <div className="p-4 md:p-6 bg-slate-950 border-t border-slate-800 text-white animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm md:text-base font-bold text-amber-300">
                {POPULATION_PYRAMID_DATA.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {POPULATION_PYRAMID_DATA.description}
              </p>
            </div>
            <button
              onClick={() => setShowPyramid(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Đóng
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Pyramid 1979 */}
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-sky-400 mb-2">
                <span>Năm 1979 (Tháp Dân Số Mở Rộng - Trẻ)</span>
                <span className="text-[10px] text-slate-400">Đáy rộng, đỉnh nhọn</span>
              </div>
              <div className="space-y-1">
                {POPULATION_PYRAMID_DATA.ageGroups.map((age, idx) => {
                  const m = POPULATION_PYRAMID_DATA.year1979.male[idx];
                  const f = POPULATION_PYRAMID_DATA.year1979.female[idx];
                  return (
                    <div key={age} className="flex items-center text-[10px] gap-1">
                      <div className="w-1/2 flex justify-end">
                        <div
                          className="bg-sky-500 h-2.5 rounded-l-sm"
                          style={{ width: `${m * 6}%` }}
                        />
                      </div>
                      <span className="w-10 text-center font-mono text-slate-400 shrink-0">
                        {age}
                      </span>
                      <div className="w-1/2 flex justify-start">
                        <div
                          className="bg-rose-500 h-2.5 rounded-r-sm"
                          style={{ width: `${f * 6}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-3 italic">
                {POPULATION_PYRAMID_DATA.year1979.character}
              </p>
            </div>

            {/* Pyramid 2024 */}
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
                <span>Năm 2024 (Tháp Dân Số Thu Hẹp - Già Hóa)</span>
                <span className="text-[10px] text-amber-400">Cơ cấu dân số vàng</span>
              </div>
              <div className="space-y-1">
                {POPULATION_PYRAMID_DATA.ageGroups.map((age, idx) => {
                  const m = POPULATION_PYRAMID_DATA.year2024.male[idx];
                  const f = POPULATION_PYRAMID_DATA.year2024.female[idx];
                  return (
                    <div key={age} className="flex items-center text-[10px] gap-1">
                      <div className="w-1/2 flex justify-end">
                        <div
                          className="bg-sky-500 h-2.5 rounded-l-sm"
                          style={{ width: `${m * 6}%` }}
                        />
                      </div>
                      <span className="w-10 text-center font-mono text-slate-400 shrink-0">
                        {age}
                      </span>
                      <div className="w-1/2 flex justify-start">
                        <div
                          className="bg-rose-500 h-2.5 rounded-r-sm"
                          style={{ width: `${f * 6}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-3 italic">
                {POPULATION_PYRAMID_DATA.year2024.character}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
