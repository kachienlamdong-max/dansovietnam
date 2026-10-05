import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationOverlayProps {
  show: boolean;
  message: string;
  subMessage?: string;
  onClose?: () => void;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  show,
  message,
  subMessage,
  onClose
}) => {
  useEffect(() => {
    if (show) {
      // Fire confetti bursts from both sides
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#22c55e', '#10b981', '#34d399', '#facc15', '#38bdf8']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#22c55e', '#10b981', '#34d399', '#facc15', '#38bdf8']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#22c55e', '#10b981', '#34d399', '#facc15', '#38bdf8']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#22c55e', '#10b981', '#34d399', '#facc15', '#38bdf8']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#22c55e', '#10b981', '#34d399', '#facc15', '#38bdf8']
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4"
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center text-center animate-clap-float">
        {/* Prominent clapping hands emoji */}
        <div className="relative mb-3">
          <div className="text-7xl md:text-8xl filter drop-shadow-[0_10px_20px_rgba(34,197,94,0.5)] select-none">
            👏
          </div>
          <div className="absolute -top-3 -right-2 text-3xl animate-bounce">
            ✨
          </div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">
            🌟
          </div>
        </div>

        {/* Success Banner */}
        <div className="bg-slate-900/95 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.35)] rounded-2xl px-6 py-4 max-w-md backdrop-blur-md">
          <div className="text-emerald-400 font-bold text-lg md:text-xl tracking-tight">
            {message}
          </div>
          {subMessage && (
            <p className="text-slate-300 text-xs md:text-sm mt-1 leading-relaxed">
              {subMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
