import React from 'react';
import { X, Award, Flame, Crown, Lightbulb, PenTool, Trophy, Flag, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

const BADGE_ICONS = {
  Flag: Flag,
  Flame: Flame,
  Crown: Crown,
  Lightbulb: Lightbulb,
  PenTool: PenTool,
  Trophy: Trophy
};

export function BadgesModal({ isOpen, onClose, badges, unlockedBadges = {} }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-t-2xl sm:rounded-2xl shadow-xl border-t sm:border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        role="dialog"
        aria-labelledby="badges-title"
      >
        {/* Header */}
        <div className="bg-slate-900 px-4 sm:px-6 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏅</span>
            <div>
              <h3 id="badges-title" className="font-bold text-base">學習成就紀錄</h3>
              <p className="text-[11px] text-slate-300">記錄各專題練習進度與思維能力指標</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges List */}
        <div className="p-3.5 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 overflow-y-auto flex-1">
          {badges.map((b) => {
            const isUnlocked = !!unlockedBadges[b.id];
            const Icon = BADGE_ICONS[b.icon] || Award;

            return (
              <div
                key={b.id}
                className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/70 border-amber-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                      {b.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded shrink-0">
                        已達成
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <span className="text-xs font-medium text-slate-700">
            已達成 {Object.values(unlockedBadges).filter(Boolean).length} / {badges.length} 項
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
export default BadgesModal;
