import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ChevronRight, 
  RefreshCcw, 
  BookOpen, 
  Layers 
} from 'lucide-react';
import { DynamicSimulator } from './Simulators';
import { sounds } from '../utils/audio';

export function ChallengeView({
  topic,
  level,
  onBack,
  onCompleteLevel,
  isCompleted
}) {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSim, setShowSim] = useState(false);
  const [resultStatus, setResultStatus] = useState(isCompleted ? 'success' : 'idle'); // 'idle' | 'success' | 'error'
  const [showFullExplanation, setShowFullExplanation] = useState(isCompleted);

  // Check answers
  const handleSubmit = (userAns) => {
    const cleanAnswer = String(userAns || inputVal || selectedOption).trim();
    if (!cleanAnswer) return;

    if (cleanAnswer === String(level.correctAnswer).trim()) {
      // Correct!
      sounds.playSuccess();
      setResultStatus('success');
      setShowFullExplanation(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if not supported
      }

      onCompleteLevel(level.id);
    } else {
      // Wrong!
      sounds.playError();
      setResultStatus('error');
    }
  };

  const handleNextHint = () => {
    sounds.playClick();
    if (revealedHints < level.hints.length) {
      setRevealedHints(prev => prev + 1);
    }
  };

  // Find next level in this topic
  const currentLvlIndex = topic.levels.findIndex(l => l.id === level.id);
  const nextLevel = topic.levels[currentLvlIndex + 1];

  // Are options long text or short symbols?
  const hasLongOptions = level.options?.some(opt => String(opt).length > 6);

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-24 sm:pb-20">
      {/* Top Sticky Bar - Touch friendly navigation */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 sm:bg-transparent hover:bg-slate-100 transition-colors shrink-0 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回地圖</span>
        </button>

        <div className="flex items-center gap-1.5 truncate max-w-[70%] sm:max-w-none">
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 hidden md:inline truncate">
            {topic.title} ·
          </span>
          <span className="text-[11px] sm:text-xs font-black text-amber-800 bg-amber-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-200 truncate">
            第 {currentLvlIndex + 1} 關：{level.name}
          </span>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200 shadow-md sm:shadow-lg overflow-hidden">
        {/* Header gradient banner */}
        <div className={`p-4 sm:p-7 bg-gradient-to-r ${topic.color} text-white`}>
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-black">
              難度：{level.difficulty}
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                setShowSim(!showSim);
              }}
              className="px-2.5 py-1 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md text-xs font-bold transition-all flex items-center gap-1.5 border border-white/30 active:scale-95"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showSim ? '收起具象教具' : '🧮 具象教具'}</span>
            </button>
          </div>

          <h2 className="text-lg sm:text-2xl font-black mb-1.5 leading-snug">
            {level.name}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            {level.description}
          </p>
        </div>

        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Interactive Simulator (if toggled) */}
          {showSim && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <DynamicSimulator type={topic.simType} />
            </div>
          )}

          {/* Story context */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex items-start gap-3">
            <span className="text-2xl sm:text-3xl select-none shrink-0 mt-0.5">📖</span>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
                冒險情境
              </h4>
              <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-medium">
                {level.storyContext}
              </p>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-amber-50/70 border-2 border-amber-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs">
            <h3 className="text-[11px] sm:text-xs font-extrabold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>❓ 挑戰任務</span>
            </h3>
            <div className="text-base sm:text-xl font-black text-slate-900 leading-relaxed">
              {level.question}
            </div>
          </div>

          {/* Hints Section */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                小精靈解題引導 ({revealedHints} / {level.hints.length})
              </span>
              {revealedHints < level.hints.length && (
                <button
                  onClick={handleNextHint}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors flex items-center gap-1 active:scale-95"
                >
                  <span>查看下一步提示 ({revealedHints + 1})</span>
                </button>
              )}
            </div>

            {revealedHints > 0 && (
              <div className="space-y-2">
                {level.hints.slice(0, revealedHints).map((hint, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 font-bold flex items-start gap-2.5 animate-in fade-in duration-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-300 text-amber-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Answering Controls */}
          {resultStatus !== 'success' && (
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-[11px] sm:text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
                選擇或填寫你的答案
              </h4>

              {level.options && level.options.length > 0 ? (
                <div className={`grid gap-2.5 ${hasLongOptions ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  {level.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedOption(opt);
                        handleSubmit(opt);
                      }}
                      className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 font-black text-base sm:text-lg transition-all transform active:scale-95 shadow-sm text-center min-h-[48px] flex items-center justify-center ${
                        selectedOption === opt
                          ? 'bg-amber-400 border-amber-500 text-amber-950 scale-102 ring-2 ring-amber-300'
                          : 'bg-white border-slate-200 hover:border-amber-400 text-slate-800 hover:bg-amber-50/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    inputMode="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="輸入答案..."
                    className="w-full sm:flex-1 px-4 py-3 rounded-xl sm:rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-lg font-bold"
                  />
                  <button
                    onClick={() => handleSubmit()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl font-black bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-md transition-all active:scale-95 text-base"
                  >
                    送出答案
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback states */}
          {resultStatus === 'error' && (
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50 border-2 border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-shake">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 shrink-0" />
                <div>
                  <div className="font-extrabold text-xs sm:text-sm text-rose-900">
                    差一點點喔！再試一次！
                  </div>
                  <p className="text-[11px] sm:text-xs text-rose-700 mt-0.5">
                    不妨拿張紙畫個圖理清思路，或者點擊上方提示按鈕！
                  </p>
                </div>
              </div>
              <button
                onClick={() => setResultStatus('idle')}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors text-center active:scale-95"
              >
                重新作答
              </button>
            </div>
          )}

          {resultStatus === 'success' && (
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 shrink-0 animate-bounce" />
                <div>
                  <div className="font-black text-base sm:text-lg text-emerald-950">
                    🎉 太棒了，完全正確！
                  </div>
                  <p className="text-xs text-emerald-700 font-bold">
                    獲得 +1 顆星級 ⭐，金幣 +10 🪙！思維力大提升！
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Full Step-by-Step Explanation */}
          {showFullExplanation && (
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                <h4 className="font-black text-slate-800 text-sm sm:text-base">
                  深入圖解步驟解析
                </h4>
              </div>

              <div className="space-y-2">
                {level.explanation.stepByStep.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Bonus Tip */}
              <div className="p-3 sm:p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 font-bold flex items-start gap-2">
                <span className="text-lg sm:text-xl shrink-0">💡</span>
                <div>
                  <div className="font-black text-amber-900 mb-0.5">
                    小學霸思維密技
                  </div>
                  <p className="text-slate-700 font-medium text-[11px] sm:text-xs">
                    {level.explanation.bonusTip}
                  </p>
                </div>
              </div>

              {/* Navigation button to next level / map */}
              <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-2.5">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onBack();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors text-center active:scale-95"
                >
                  返回關卡地圖
                </button>

                {nextLevel && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onCompleteLevel(level.id);
                      window.location.hash = `#${nextLevel.id}`;
                    }}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black text-white shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 bg-gradient-to-r ${topic.color}`}
                  >
                    <span>挑戰下一關：{nextLevel.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ChallengeView;
