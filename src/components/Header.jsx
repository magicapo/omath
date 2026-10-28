import React, { useState } from 'react';
import { Star, Coins, Volume2, VolumeX, Award, BookOpen, Flame, Compass } from 'lucide-react';
import { sounds } from '../utils/audio';

export function Header({
  stats,
  currentGrade,
  onSelectGrade,
  onOpenBadges,
  onOpenGuide,
  onOpenWiki,
  isWikiActive
}) {
  const [isMuted, setIsMuted] = useState(sounds.muted);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

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
                小學數學模型與邏輯思維 · 三年級與四年級
              </p>
            </div>
          </div>

          {/* Desktop Grade Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
            <button
              onClick={() => {
                if (currentGrade !== 3) {
                  sounds.playClick();
                  onSelectGrade(3);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                currentGrade === 3
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>三年級 (基礎篇)</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 4) {
                  sounds.playClick();
                  onSelectGrade(4);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                currentGrade === 4
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>四年級 (進階篇)</span>
            </button>
          </div>

          {/* User Stats & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Streak */}
            {stats.streak > 0 && (
              <div
                className="flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold"
                title={`連續答對 ${stats.streak} 題`}
              >
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{stats.streak} 連對</span>
              </div>
            )}

            {/* Stars / Progress */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm font-bold text-amber-800 shadow-inner">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{stats.stars}</span>
              <span className="opacity-40 text-xs font-normal">/21 題</span>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenWiki();
                }}
                title="奧數體系與領域指南 (首頁 Tab)"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isWikiActive
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70'
                }`}
              >
                <span>🏛️</span>
                <span>奧數簡介</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenBadges();
                }}
                title="學習成就紀錄"
                className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors relative"
              >
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                {stats.newBadge && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                )}
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenGuide();
                }}
                title="重點方法整理"
                className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "開啟音效" : "靜音模式"}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors active:scale-95"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Grade Switcher (Row 2) */}
        <div className="mt-2 pt-2 border-t border-slate-100 sm:hidden">
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
            <button
              onClick={() => {
                if (currentGrade !== 3) {
                  sounds.playClick();
                  onSelectGrade(3);
                }
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                currentGrade === 3
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>三年級 (基礎篇)</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 4) {
                  sounds.playClick();
                  onSelectGrade(4);
                }
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                currentGrade === 4
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>四年級 (進階篇)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
