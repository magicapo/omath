import React, { useState } from 'react';
import { Star, Coins, Volume2, VolumeX, Award, BookOpen, Flame, Compass } from 'lucide-react';
import { sounds } from '../utils/audio';

export function Header({
  stats,
  currentGrade,
  onSelectGrade,
  onOpenBadges,
  onOpenGuide,
  onOpenWiki
}) {
  const [isMuted, setIsMuted] = useState(sounds.muted);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        {/* Top Bar Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-lg sm:text-2xl shadow-sm transform -rotate-3 hover:rotate-0 transition-transform">
              🦉
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-base sm:text-xl tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  奧數大冒險
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 sm:hidden">
                  {currentGrade}年級
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 hidden md:block">
                啟發數學思維 · 掌握經典題型
              </p>
            </div>
          </div>

          {/* Desktop Grade Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => {
                if (currentGrade !== 3) {
                  sounds.playClick();
                  onSelectGrade(3);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                currentGrade === 3
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🎒 三年級</span>
              <span className="text-[10px] opacity-75 hidden md:inline">啟蒙</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 4) {
                  sounds.playClick();
                  onSelectGrade(4);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                currentGrade === 4
                  ? 'bg-indigo-600 text-white shadow-md scale-102'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🚀 四年級</span>
              <span className="text-[10px] opacity-75 hidden md:inline">進階</span>
            </button>
          </div>

          {/* User Stats & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Streak - visible on mobile if > 0 */}
            {stats.streak > 0 && (
              <div
                className="flex items-center gap-0.5 sm:gap-1 bg-orange-50 border border-orange-200 text-orange-600 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-black"
                title={`連續答對 ${stats.streak} 題！`}
              >
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-orange-500 text-orange-500" />
                <span>{stats.streak}</span>
              </div>
            )}

            {/* Stars */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-black text-amber-700 shadow-inner">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span>{stats.stars}</span>
              <span className="opacity-40 text-[10px] hidden xs:inline">/21</span>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-black text-yellow-700 shadow-inner">
              <Coins className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500" />
              <span>{stats.coins}</span>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            {/* Desktop-only action buttons */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenWiki();
                }}
                title="奧林匹亞數學指南 (IMO Encyclopedia)"
                className="px-2.5 py-1.5 rounded-xl text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>🏛️</span>
                <span className="hidden md:inline">奧數簡介</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenBadges();
                }}
                title="成就徽章庫"
                className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors relative"
              >
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                {stats.newBadge && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                )}
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenGuide();
                }}
                title="思維通關秘笈"
                className="p-1.5 sm:p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Audio sound button - always available */}
            <button
              onClick={toggleSound}
              title={isMuted ? "開啟音效" : "靜音模式"}
              className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors active:scale-95"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile-only Grade Selector Switcher (Row 2) */}
        <div className="mt-2 pt-2 border-t border-slate-100 sm:hidden">
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => {
                if (currentGrade !== 3) {
                  sounds.playClick();
                  onSelectGrade(3);
                }
              }}
              className={`py-1.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                currentGrade === 3
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>🎒 三年級</span>
              <span className="text-[10px] font-bold opacity-80">啟蒙</span>
            </button>

            <button
              onClick={() => {
                if (currentGrade !== 4) {
                  sounds.playClick();
                  onSelectGrade(4);
                }
              }}
              className={`py-1.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                currentGrade === 4
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 active:scale-98'
              }`}
            >
              <span>🚀 四年級</span>
              <span className="text-[10px] font-bold opacity-80">進階</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
