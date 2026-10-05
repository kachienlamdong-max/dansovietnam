import React, { useState } from 'react';
import {
  MULTIPLE_CHOICE_QUESTIONS,
  TRUE_FALSE_QUESTION_GROUP
} from '../../data/quizData';
import { playSuccessSound, playClickSound, playExplosionSound } from '../../utils/audio';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Check,
  X,
  Award
} from 'lucide-react';

export const QuizSection: React.FC = () => {
  // Part 1: Multiple Choice State
  const [selectedMCOptions, setSelectedMCOptions] = useState<Record<string, string>>({});
  const [showMCExplanations, setShowMCExplanations] = useState<Record<string, boolean>>({});

  // Part 2: True/False State
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean | null>>({
    tf_s1: null,
    tf_s2: null,
    tf_s3: null,
    tf_s4: null
  });
  const [isTFSubmitted, setIsTFSubmitted] = useState(false);

  // Active sub-tab: 'mc' | 'tf' | 'all'
  const [quizPart, setQuizPart] = useState<'all' | 'mc' | 'tf'>('all');

  const handleSelectMCOption = (questionId: string, optionKey: string, correctKey: string) => {
    playClickSound();
    if (selectedMCOptions[questionId]) return; // already answered

    setSelectedMCOptions((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
    setShowMCExplanations((prev) => ({
      ...prev,
      [questionId]: true
    }));

    if (optionKey === correctKey) {
      playSuccessSound();
    } else {
      playExplosionSound();
    }
  };

  const handleSelectTF = (statementId: string, value: boolean) => {
    if (isTFSubmitted) return;
    playClickSound();
    setTfAnswers((prev) => ({
      ...prev,
      [statementId]: value
    }));
  };

  const handleSubmitTF = () => {
    playClickSound();
    setIsTFSubmitted(true);

    // Check how many are correct
    let correctCount = 0;
    TRUE_FALSE_QUESTION_GROUP.statements.forEach((s) => {
      if (tfAnswers[s.id] === s.isCorrect) {
        correctCount++;
      }
    });

    if (correctCount >= 3) {
      playSuccessSound();
    } else {
      playExplosionSound();
    }
  };

  const handleResetTF = () => {
    playClickSound();
    setTfAnswers({
      tf_s1: null,
      tf_s2: null,
      tf_s3: null,
      tf_s4: null
    });
    setIsTFSubmitted(false);
  };

  const handleResetAll = () => {
    playClickSound();
    setSelectedMCOptions({});
    setShowMCExplanations({});
    handleResetTF();
  };

  // Score calculation
  const mcTotal = MULTIPLE_CHOICE_QUESTIONS.length;
  const mcAnswered = Object.keys(selectedMCOptions).length;
  const mcCorrect = MULTIPLE_CHOICE_QUESTIONS.filter(
    (q) => selectedMCOptions[q.id] === q.correctKey
  ).length;

  let tfCorrect = 0;
  if (isTFSubmitted) {
    TRUE_FALSE_QUESTION_GROUP.statements.forEach((s) => {
      if (tfAnswers[s.id] === s.isCorrect) tfCorrect++;
    });
  }

  return (
    <div className="space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kiểm tra kiến thức · Định dạng chuẩn đề thi THPT</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Luyện Tập Trắc Nghiệm Dân Số Việt Nam
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-0.5">
            Bao gồm 2 phần: Câu hỏi trắc nghiệm nhiều lựa chọn & Câu hỏi Đúng / Sai theo dữ liệu thực tế.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto shrink-0">
          <button
            onClick={() => setQuizPart('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              quizPart === 'all'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tất cả phần
          </button>
          <button
            onClick={() => setQuizPart('mc')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              quizPart === 'mc'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Phần 1: Nhiều lựa chọn
          </button>
          <button
            onClick={() => setQuizPart('tf')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              quizPart === 'tf'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Phần 2: Đúng / Sai
          </button>
        </div>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Trắc nghiệm lựa chọn (Phần 1)</div>
            <div className="text-xl font-bold text-white font-mono mt-0.5">
              {mcCorrect} / {mcTotal} <span className="text-xs font-sans text-slate-400 font-normal">câu đúng</span>
            </div>
          </div>
          <div className="text-xs font-mono px-2.5 py-1 rounded bg-sky-950 text-sky-400 border border-sky-800">
            {mcAnswered === mcTotal ? 'Đã hoàn thành' : `Đang làm (${mcAnswered}/${mcTotal})`}
          </div>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Trắc nghiệm Đúng / Sai (Phần 2)</div>
            <div className="text-xl font-bold text-white font-mono mt-0.5">
              {isTFSubmitted ? `${tfCorrect} / 4 ý đúng` : 'Chưa nộp bài'}
            </div>
          </div>
          <div className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            {isTFSubmitted ? 'Đã chấm điểm' : '4 câu lệnh'}
          </div>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Thao tác bài thi</div>
            <button
              onClick={handleResetAll}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 mt-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại toàn bộ</span>
            </button>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* PART 1: MULTIPLE CHOICE */}
      {(quizPart === 'all' || quizPart === 'mc') && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-7 h-7 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center font-bold text-xs">
              01
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Phần 1: Câu Hỏi Trắc Nghiệm Nhiều Lựa Chọn
              </h3>
              <p className="text-xs text-slate-400">
                Thí sinh chọn 01 phương án đúng nhất trong 4 phương án A, B, C, D.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {MULTIPLE_CHOICE_QUESTIONS.map((q, idx) => {
              const selectedKey = selectedMCOptions[q.id];
              const isAnswered = selectedKey !== undefined;
              const isCorrect = selectedKey === q.correctKey;

              return (
                <div
                  key={q.id}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 md:p-6 shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-bold text-sky-400">
                      Câu {idx + 1}:
                    </span>
                    {isAnswered && (
                      <span
                        className={`text-xs font-medium flex items-center gap-1 px-2.5 py-0.5 rounded-full ${
                          isCorrect
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Chính xác</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Chưa đúng (Đáp án: {q.correctKey})</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-semibold text-white leading-relaxed mb-4">
                    {q.question}
                  </h4>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt) => {
                      const isOptionSelected = selectedKey === opt.key;
                      const isOptionCorrect = opt.key === q.correctKey;

                      let btnStyle =
                        'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';

                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle =
                            'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle =
                            'bg-red-950/70 border-red-500 text-red-200 ring-1 ring-red-500/50';
                        } else {
                          btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          disabled={isAnswered}
                          onClick={() => handleSelectMCOption(q.id, opt.key, q.correctKey)}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs md:text-sm font-medium transition-all ${btnStyle}`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono text-xs shrink-0 ${
                              isOptionSelected
                                ? isOptionCorrect
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-red-500 text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Accordion on Answer */}
                  {showMCExplanations[q.id] && (
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed">
                      <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Lời giải thích chi tiết:</span>
                      </div>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PART 2: TRUE / FALSE */}
      {(quizPart === 'all' || quizPart === 'tf') && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <span className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              02
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Phần 2: Câu Hỏi Trắc Nghiệm Đúng / Sai
              </h3>
              <p className="text-xs text-slate-400">
                Đọc đoạn thông tin dưới đây và xác định từng nhận định a, b, c, d là Đúng (Đ) hay Sai (S).
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 md:p-6 shadow-xl">
            {/* Reading Context Passage */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ngữ liệu thực tế (Số liệu Dân số 2024):</span>
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic">
                "{TRUE_FALSE_QUESTION_GROUP.context}"
              </p>
            </div>

            {/* Statements List */}
            <div className="space-y-4 mb-6">
              {TRUE_FALSE_QUESTION_GROUP.statements.map((stmt) => {
                const currentAnswer = tfAnswers[stmt.id];
                const isCorrect = currentAnswer === stmt.isCorrect;

                return (
                  <div
                    key={stmt.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isTFSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/40'
                          : 'bg-red-950/30 border-red-500/40'
                        : 'bg-slate-950/60 border-slate-800/80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed pr-2">
                        {stmt.statement}
                      </div>

                      {/* True / False Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          disabled={isTFSubmitted}
                          onClick={() => handleSelectTF(stmt.id, true)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            currentAnswer === true
                              ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-900/40'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>ĐÚNG</span>
                        </button>

                        <button
                          disabled={isTFSubmitted}
                          onClick={() => handleSelectTF(stmt.id, false)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            currentAnswer === false
                              ? 'bg-rose-600 border-rose-500 text-white shadow-md shadow-rose-900/40'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>SAI</span>
                        </button>
                      </div>
                    </div>

                    {/* Feedback on Submit */}
                    {isTFSubmitted && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs">
                        <div
                          className={`font-semibold flex items-center gap-1 mb-1 ${
                            isCorrect ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Đáp án của bạn chính xác ({stmt.isCorrect ? 'ĐÚNG' : 'SAI'})</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Chưa chính xác (Đáp án chuẩn: {stmt.isCorrect ? 'ĐÚNG' : 'SAI'})</span>
                            </>
                          )}
                        </div>
                        <p className="text-slate-300 leading-relaxed">{stmt.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions for Part 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400">
                {!isTFSubmitted
                  ? 'Hãy chọn ĐÚNG hoặc SAI cho cả 4 nhận định trước khi bấm chấm điểm.'
                  : `Bạn đạt ${tfCorrect}/4 nhận định chính xác.`}
              </div>

              <div className="flex items-center gap-3">
                {isTFSubmitted ? (
                  <button
                    onClick={handleResetTF}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại phần Đúng/Sai</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTF}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/40 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Nộp bài & Chấm điểm</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
