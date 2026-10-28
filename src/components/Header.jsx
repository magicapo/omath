import React from 'react';
import { BookOpen } from 'lucide-react';

export function Header({
  currentGrade,
  onSelectGrade,
  onOpenGuide,
  onOpenWiki
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-2 sm:py-2.5">
        {/* Top Bar Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-lg sm:text-xl shadow-xs">
              📐
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-800">
                  奧數思維訓練
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 sm:hidden">
                  {currentGrade}年級
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 hidden md:block">
                小學數學模型與邏輯思維 · 三至六年級
              </p>
            </div>
          </div>

          {/* Desktop Grade / Navigation Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner gap-0.5">
            <button
              onClick={onOpenWiki}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                currentGrade === 'wiki'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🏛️</span>
              <span>奧數簡介</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 3) {
                  onSelectGrade(3);
                }
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentGrade === 3
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>三年級</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 4) {
                  onSelectGrade(4);
                }
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentGrade === 4
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>四年級</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 5) {
                  onSelectGrade(5);
                }
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentGrade === 5
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>五年級</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 6) {
                  onSelectGrade(6);
                }
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentGrade === 6
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>六年級</span>
            </button>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => {
                  onOpenGuide();
                }}
                title="重點方法整理"
                className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Grade / Navigation Switcher (Row 2) */}
        <div className="mt-2 pt-2 border-t border-slate-100 sm:hidden">
          <div className="grid grid-cols-5 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner text-center">
            <button
              onClick={onOpenWiki}
              className={`py-1.5 px-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center ${
                currentGrade === 'wiki'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>🏛️ 簡介</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 3) {
                  onSelectGrade(3);
                }
              }}
              className={`py-1.5 px-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center ${
                currentGrade === 3
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>三年級</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 4) {
                  onSelectGrade(4);
                }
              }}
              className={`py-1.5 px-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center ${
                currentGrade === 4
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>四年級</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 5) {
                  onSelectGrade(5);
                }
              }}
              className={`py-1.5 px-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center ${
                currentGrade === 5
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>五年級</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 6) {
                  onSelectGrade(6);
                }
              }}
              className={`py-1.5 px-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center ${
                currentGrade === 6
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>六年級</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
