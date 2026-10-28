import React from 'react';
import { X, Award, Flame, Crown, Lightbulb, Trophy, Flag, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

const BADGE_ICONS = {
  Flag: Flag,
  Flame: Flame,
  Crown: Crown,
  Lightbulb: Lightbulb,
  Trophy: Trophy
};

export function BadgesModal({ isOpen, onClose, badges, unlockedBadges = {} }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border-t-4 sm:border-4 border-amber-400 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        role="dialog"
        aria-labelledby="badges-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🏅</span>
            <div>
              <h3 id="badges-title" className="font-black text-base sm:text-lg">榮譽勳章館</h3>
              <p className="text-[11px] sm:text-xs text-white/90">解鎖奧數挑戰，記錄你的成長每一步！</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges List */}
        <div className="p-3.5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 overflow-y-auto flex-1">
          {badges.map((b) => {
            const isUnlocked = !!unlockedBadges[b.id];
            const Icon = BADGE_ICONS[b.icon] || Award;

            return (
              <div
                key={b.id}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 truncate">
                      {b.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] font-black text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded-full shrink-0">
                        已獲得
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <span className="text-[11px] font-bold text-amber-800">
            已解鎖 {Object.values(unlockedBadges).filter(Boolean).length} / {badges.length} 枚
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-full font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs text-xs"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
export default BadgesModal;
