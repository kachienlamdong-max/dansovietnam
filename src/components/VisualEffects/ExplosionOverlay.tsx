import React from 'react';

interface ExplosionOverlayProps {
  show: boolean;
  clickedRegionName?: string;
  expectedHint?: string;
}

export const ExplosionOverlay: React.FC<ExplosionOverlayProps> = ({
  show,
  clickedRegionName,
  expectedHint
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center animate-boom-flash"
      aria-live="assertive"
    >
      {/* Shockwave Rings */}
      <div className="absolute w-40 h-40 rounded-full border-4 border-red-500/80 animate-shockwave" />
      <div
        className="absolute w-40 h-40 rounded-full border-2 border-amber-500/60 animate-shockwave"
        style={{ animationDelay: '0.15s' }}
      />

      {/* Central Visual Explosion */}
      <div className="relative flex flex-col items-center justify-center text-center p-4">
        <div className="relative mb-2 select-none">
          <div className="text-7xl md:text-8xl filter drop-shadow-[0_0_35px_rgba(239,68,68,0.8)] animate-pulse">
            💥
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl font-black text-amber-200 tracking-wider font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            BOOM!
          </div>
        </div>

        {/* Penalty Notification Box */}
        <div className="bg-slate-950/95 border border-red-500/60 shadow-[0_0_35px_rgba(239,68,68,0.4)] rounded-2xl px-6 py-3 max-w-sm backdrop-blur-md">
          <div className="text-red-400 font-bold text-base md:text-lg">
            Chưa chính xác!
          </div>
          {clickedRegionName && (
            <p className="text-slate-300 text-xs md:text-sm mt-1">
              Bạn vừa chọn: <span className="font-semibold text-red-300">{clickedRegionName}</span>
            </p>
          )}
          {expectedHint && (
            <p className="text-amber-300/90 text-xs mt-1 italic">
              💡 Gợi ý: {expectedHint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
