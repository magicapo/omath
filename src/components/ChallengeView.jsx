import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
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
  onCompleteLevel
}) {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSim, setShowSim] = useState(false);
  const [resultStatus, setResultStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [showFullExplanation, setShowFullExplanation] = useState(false);

  // 當題目切換時，重設作答狀態，並平滑滾動到頁面最上方
  useEffect(() => {
    setSelectedOption('');
    setInputVal('');
    setRevealedHints(0);
    setResultStatus('idle');
    setShowFullExplanation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [level?.id]);

  // Check answers
  const handleSubmit = (userAns) => {
    const cleanAnswer = String(userAns || inputVal || selectedOption).trim();
    if (!cleanAnswer) return;

    if (cleanAnswer === String(level.correctAnswer).trim()) {
      // 不需要音效與彩帶，展開所有提示並顯示下一題按鈕
      setResultStatus('success');
      setShowFullExplanation(true);
      if (level.hints && level.hints.length > 0) {
        setRevealedHints(level.hints.length);
      }
      onCompleteLevel(level.id);
    } else {
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

  const hasLongOptions = level.options?.some(opt => String(opt).length > 6);

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-24 sm:pb-20">
      {/* Top Sticky Bar */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 sm:bg-transparent hover:bg-slate-100 transition-colors shrink-0 active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回目錄</span>
        </button>

        <div className="flex items-center gap-1.5 truncate">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 hidden md:inline truncate">
            {topic.title} ·
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-slate-200 truncate">
            第 {currentLvlIndex + 1} 題：{level.name}
          </span>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header banner */}
        <div className={`p-4 sm:p-6 bg-gradient-to-r ${topic.color} text-white`}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-black/20 text-[11px] font-semibold">
              難度：{level.difficulty}
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                setShowSim(!showSim);
              }}
              className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20 active:scale-98"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showSim ? '收起互動教具' : '🧮 互動教具'}</span>
            </button>
          </div>

          <h2 className="text-base sm:text-xl font-bold mb-1 leading-snug">
            {level.name}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
            {level.description}
          </p>
        </div>

        <div className="p-4 sm:p-7 space-y-4 sm:space-y-6">
          {/* Interactive Simulator (if toggled) */}
          {showSim && (
            <div className="animate-in fade-in duration-200">
              <DynamicSimulator type={topic.simType} />
            </div>
          )}

          {/* Problem context */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4.5 flex items-start gap-3">
            <span className="text-xl sm:text-2xl select-none shrink-0 mt-0.5">📌</span>
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                題目情境
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {level.storyContext}
              </p>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 sm:p-5">
            <h3 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>題目</span>
            </h3>
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {level.question}
            </div>
          </div>

          {/* Hints Section */}
          <div className="space-y-2 sm:space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                解題思路指引 ({revealedHints} / {level.hints.length})
              </span>
              {revealedHints < level.hints.length && (
                <button
                  onClick={handleNextHint}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 transition-colors flex items-center gap-1 active:scale-98"
                >
                  <span>查看下一步提示 ({revealedHints + 1})</span>
                </button>
              )}
            </div>

            {revealedHints > 0 && (
              <div className="space-y-1.5">
                {level.hints.slice(0, revealedHints).map((hint, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded bg-amber-300 text-amber-950 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
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
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                請選擇或輸入答案
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
                      className={`p-3 sm:p-3.5 rounded-lg border font-bold text-base transition-all transform active:scale-98 shadow-xs text-center min-h-[46px] flex items-center justify-center ${
                        selectedOption === opt
                          ? 'bg-amber-400 border-amber-500 text-amber-950 ring-2 ring-amber-300'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
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
                    placeholder="輸入數值答案..."
                    className="w-full sm:flex-1 px-4 py-2.5 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-base font-medium"
                  />
                  <button
                    onClick={() => handleSubmit()}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-xs transition-all active:scale-98 text-sm"
                  >
                    送出答案
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback states */}
          {resultStatus === 'error' && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-rose-900">
                    答案不正確
                  </div>
                  <p className="text-[11px] sm:text-xs text-rose-700 mt-0.5">
                    請重新檢查算式或參考思路指引，重新驗算。
                  </p>
                </div>
              </div>
              <button
                onClick={() => setResultStatus('idle')}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-md bg-white border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors text-center active:scale-98"
              >
                重新作答
              </button>
            </div>
          )}

          {resultStatus === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold text-sm sm:text-base text-emerald-950">
                      解答正確！
                    </div>
                    <p className="text-xs text-emerald-700 font-medium">
                      題目思路已全部展開，請閱讀步驟解析或直接進入下一題。
                    </p>
                  </div>
                </div>

                {nextLevel ? (
                  <button
                    onClick={() => {
                      onCompleteLevel(level.id);
                      window.location.hash = `#${nextLevel.id}`;
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-98 bg-gradient-to-r ${topic.color} shrink-0`}
                  >
                    <span>下一題：{nextLevel.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onBack}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-emerald-950 bg-emerald-200/80 hover:bg-emerald-200 transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>已完成本單元所有題目</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Full Step-by-Step Explanation */}
          {showFullExplanation && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-700" />
                <h4 className="font-bold text-slate-800 text-sm">
                  詳細解題步驟
                </h4>
              </div>

              <div className="space-y-1.5">
                {level.explanation.stepByStep.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-5 h-5 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Method Summary */}
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-2">
                <span className="text-base shrink-0">💡</span>
                <div>
                  <div className="font-bold text-amber-900 mb-0.5">
                    思維方法歸納
                  </div>
                  <p className="text-slate-700 font-normal text-xs">
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
                  className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors text-center active:scale-98"
                >
                  返回專題目錄
                </button>

                {nextLevel && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onCompleteLevel(level.id);
                      window.location.hash = `#${nextLevel.id}`;
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 bg-gradient-to-r ${topic.color}`}
                  >
                    <span>進入下一題：{nextLevel.name}</span>
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
