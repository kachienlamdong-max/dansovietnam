import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { isMuted, toggleMute, playClickSound } from '../utils/audio';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [muted, setMutedState] = useState(isMuted());

  const handleToggleSound = () => {
    const next = toggleMute();
    setMutedState(next);
    if (!next) {
      playClickSound();
    }
  };

  const handleTabClick = (tab: ActiveTab) => {
    playClickSound();
    onTabChange(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleTabClick('challenge')}
          className="text-left group cursor-pointer"
        >
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
            Dân Số Việt Nam
          </span>
        </button>

        {/* Zone 2: Navigation Links (single-line text affordances) */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabClick('learn')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'learn'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Khám Phá
          </button>

          <button
            onClick={() => handleTabClick('challenge')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'challenge'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bản Đồ 3D
          </button>

          <button
            onClick={() => handleTabClick('quiz')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'quiz'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-900/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trắc Nghiệm
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2">
          {/* Sound Effect Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={muted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
            className={`p-2 rounded-xl border text-xs font-medium transition-all ${
              muted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400 hover:bg-emerald-900/60'
            }`}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleTabClick('challenge')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-900/20 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thử Thách</span>
          </button>
        </div>
      </div>
    </header>
  );
};
