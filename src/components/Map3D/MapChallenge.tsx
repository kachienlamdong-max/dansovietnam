import React, { useState, useCallback, useRef } from 'react';
import { Vietnam3DMap } from './Vietnam3DMap';
import { VietnamTextbookMap } from './VietnamTextbookMap';
import { MAP_CHALLENGE_QUESTIONS } from '../../data/quizData';
import { VIETNAM_REGIONS } from '../../data/vietnamGeographyData';
import { RegionId } from '../../types';
import { playSuccessSound, playExplosionSound, playClickSound } from '../../utils/audio';
import { CelebrationOverlay } from '../VisualEffects/CelebrationOverlay';
import { ExplosionOverlay } from '../VisualEffects/ExplosionOverlay';
import {
  Trophy,
  Flame,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Eye,
  Map as MapIcon,
  Box
} from 'lucide-react';

export const MapChallenge: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | null>(null);

  // Map view type: 'textbook' (Bản đồ chuẩn SGK Kết nối tri thức) | '3d' (Bản đồ Khối nổi 3D)
  const [mapViewStyle, setMapViewStyle] = useState<'textbook' | '3d'>('textbook');

  // Visual feedback states
  const [flashState, setFlashState] = useState<{
    regionId: RegionId;
    type: 'correct' | 'incorrect';
  } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [lastClickedRegion, setLastClickedRegion] = useState<string | null>(null);
  const [feedbackExplanation, setFeedbackExplanation] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mode: 'challenge' | 'explore'
  const [mapMode, setMapMode] = useState<'challenge' | 'explore'>('challenge');

  const currentQ = MAP_CHALLENGE_QUESTIONS[currentQuestionIndex];
  const isCurrentAnswered = answeredQuestions[currentQ?.id] !== undefined;

  const handleRegionClick = useCallback(
    (clickedId: RegionId) => {
      setSelectedRegionId(clickedId);
      const clickedData = VIETNAM_REGIONS[clickedId];

      if (mapMode === 'explore') {
        // Just selecting region to inspect
        return;
      }

      if (isCurrentAnswered) return;

      const isCorrect = clickedId === currentQ.targetRegionId;
      setLastClickedRegion(clickedData.name);

      if (isCorrect) {
        // 1. REWARD: Joyful sound + clapping hands emoji + bright green glow
        playSuccessSound();
        setFlashState({ regionId: clickedId, type: 'correct' });
        setShowCelebration(true);
        setFeedbackExplanation(currentQ.explanation);
        setScore((prev) => prev + 100 + streak * 20);
        setStreak((prev) => prev + 1);

        setAnsweredQuestions((prev) => ({
          ...prev,
          [currentQ.id]: true
        }));

        setTimeout(() => {
          setShowCelebration(false);
        }, 2200);
      } else {
        // 2. PENALTY: Dramatic explosion sound + "Boom" screen shake + flash red
        playExplosionSound();
        setFlashState({ regionId: clickedId, type: 'incorrect' });
        setShowExplosion(true);
        setIsScreenShaking(true);
        setStreak(0);

        setTimeout(() => {
          setIsScreenShaking(false);
        }, 700);

        setTimeout(() => {
          setShowExplosion(false);
          setFlashState(null);
        }, 1800);
      }
    },
    [currentQ, isCurrentAnswered, mapMode, streak]
  );

  const handleNextQuestion = () => {
    playClickSound();
    setFlashState(null);
    setShowHint(false);
    setFeedbackExplanation(null);

    if (currentQuestionIndex < MAP_CHALLENGE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    playClickSound();
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setShowHint(false);
    setAnsweredQuestions({});
    setFlashState(null);
    setShowCelebration(false);
    setShowExplosion(false);
    setFeedbackExplanation(null);
    setIsCompleted(false);
    setSelectedRegionId(null);
  };

  return (
    <div className={`space-y-6 ${isScreenShaking ? 'animate-screen-shake' : ''}`}>
      {/* Celebration & Explosion Overlays */}
      <CelebrationOverlay
        show={showCelebration}
        message="Xuất sắc! Bạn đã chọn chính xác!"
        subMessage={feedbackExplanation || currentQ?.explanation}
      />
      <ExplosionOverlay
        show={showExplosion}
        clickedRegionName={lastClickedRegion || undefined}
        expectedHint={currentQ?.hint}
      />

      {/* Mode Bar & Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chuẩn Sách Giáo Khoa Địa Lí 12 · Tương tác Trực quan</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Thử Thách Phân Bố Dân Cư Việt Nam
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-0.5">
            Nhấp chuột trực tiếp lên vùng tương ứng trên bản đồ để trả lời câu hỏi.
          </p>
        </div>

        {/* View Style Switcher (Textbook Map vs 3D Relief) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                playClickSound();
                setMapViewStyle('textbook');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mapViewStyle === 'textbook'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Bản đồ SGK Chuẩn</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setMapViewStyle('3d');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mapViewStyle === '3d'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-950/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Khối nổi 3D</span>
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                playClickSound();
                setMapMode('challenge');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mapMode === 'challenge'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Thử thách
            </button>
            <button
              onClick={() => {
                playClickSound();
                setMapMode('explore');
              }}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mapMode === 'explore'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Khám phá</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Zone Sandbox: Left Map View (65%), Right Active Task Panel (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Viewport */}
        <div className="lg:col-span-8">
          {mapViewStyle === 'textbook' ? (
            <VietnamTextbookMap
              onRegionSelect={handleRegionClick}
              selectedRegionId={selectedRegionId}
              targetRegionId={currentQ?.targetRegionId}
              flashState={flashState}
              interactive={true}
            />
          ) : (
            <Vietnam3DMap
              onRegionSelect={handleRegionClick}
              selectedRegionId={selectedRegionId}
              targetRegionId={currentQ?.targetRegionId}
              flashState={flashState}
              interactive={true}
            />
          )}

          {/* Quick Region Selector Pills for Accessibility & Touch Screens */}
          <div className="mt-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-medium">6 Vùng kinh tế - xã hội (Nhấp nhanh hoặc nhấp trực tiếp trên bản đồ):</span>
              <span className="text-[11px] text-amber-400 font-mono">Chuẩn SGK 2024</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(VIETNAM_REGIONS) as RegionId[]).map((rId) => {
                const r = VIETNAM_REGIONS[rId];
                const isSelected = selectedRegionId === rId;
                const isFlashCorrect = flashState?.regionId === rId && flashState.type === 'correct';
                const isFlashIncorrect = flashState?.regionId === rId && flashState.type === 'incorrect';

                let btnStyle = 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700';
                if (isFlashCorrect) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-500/30';
                } else if (isFlashIncorrect) {
                  btnStyle = 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-500/30';
                } else if (isSelected) {
                  btnStyle = 'bg-slate-800 text-white border-amber-500/80 ring-1 ring-amber-500/50';
                }

                return (
                  <button
                    key={rId}
                    onClick={() => handleRegionClick(rId)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border text-xs transition-all ${btnStyle}`}
                  >
                    <span
                      className="w-3 h-3 rounded-sm shrink-0 border border-slate-500"
                      style={{ backgroundColor: r.color }}
                    />
                    <div className="truncate">
                      <div className="font-semibold truncate">{r.shortName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{r.density} ng/km²</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Task & Question Control Deck */}
        <div className="lg:col-span-4 space-y-4">
          {/* Score & Streak HUD */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/70 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Điểm thử thách</div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">
                  {score}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/70 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Chuỗi đúng</div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">
                  {streak} <span className="text-xs text-rose-400 font-sans">vùng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Question Card */}
          {mapMode === 'challenge' ? (
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative overflow-hidden">
              {/* Question Progress Header */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-emerald-400">
                    Câu hỏi {currentQuestionIndex + 1}/{MAP_CHALLENGE_QUESTIONS.length}
                  </span>
                  <span>·</span>
                  <span className="text-slate-400">{currentQ?.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
                  +100 điểm
                </span>
              </div>

              {/* Question Prompt */}
              <h3 className="text-base md:text-lg font-bold text-white leading-snug mb-4">
                {currentQ?.question}
              </h3>

              {/* Hint Accordion */}
              {showHint ? (
                <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 mb-4 text-xs text-amber-200/90 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Gợi ý địa lí:</span>
                  </div>
                  {currentQ?.hint}
                </div>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 mb-4 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Xem gợi ý khu vực</span>
                </button>
              )}

              {/* Status & Next Button */}
              {isCurrentAnswered ? (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs text-emerald-300">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Chính xác: {VIETNAM_REGIONS[currentQ.targetRegionId].name}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed mt-1">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>
                      {currentQuestionIndex < MAP_CHALLENGE_QUESTIONS.length - 1
                        ? 'Chuyển sang câu tiếp theo'
                        : 'Xem kết quả tổng kết'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-amber-400 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Hướng dẫn làm bài:</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    Hãy nhấp trực tiếp vào vùng địa lí trên bản đồ để đưa ra câu trả lời. Nếu đúng, vùng sẽ phát sáng xanh kèm tiếng vỗ tay chúc mừng 👏!
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Explore Mode Card */
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-2">
                <Eye className="w-4 h-4" />
                <span>Chế độ Khám phá Tự Do</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Nhấp chuột vào bất kỳ vùng nào trên bản đồ để tra cứu mật độ dân số, diện tích, quy mô và đặc điểm kinh tế - xã hội theo chương trình GDPT 2018.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
                <div>• Nhấp vào vùng để xem thông tin chuyên sâu.</div>
                <div>• Có thể bật/tắt Tháp dân số 1979 - 2024 ở góc trên bản đồ.</div>
                <div>• Dễ dàng chuyển đổi giữa Bản đồ SGK và Khối nổi 3D.</div>
              </div>
            </div>
          )}

          {/* Quick Restart Button */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại thử thách từ đầu</span>
            </button>
            <span className="font-mono text-slate-400">
              {Object.keys(answeredQuestions).length}/{MAP_CHALLENGE_QUESTIONS.length} hoàn thành
            </span>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full text-center shadow-2xl animate-clap-float">
            <div className="text-6xl mb-3">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Chúc mừng bạn đã hoàn thành Thử thách Bản đồ!
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Bạn đã thể hiện sự am hiểu xuất sắc về sự phân bố dân cư và mật độ 6 vùng kinh tế - xã hội của Việt Nam theo sách giáo khoa Địa lí 12.
            </p>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
              <div>
                <div className="text-xs text-slate-400">Tổng điểm đạt được</div>
                <div className="text-2xl font-black font-mono text-emerald-400 tabular-nums">
                  {score}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Chuỗi đúng cao nhất</div>
                <div className="text-2xl font-black font-mono text-amber-400 tabular-nums">
                  {streak}
                </div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại thử thách</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

