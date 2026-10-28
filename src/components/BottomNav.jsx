import React from 'react';
import { Map, BookOpen, Award, Compass } from 'lucide-react';
import { sounds } from '../utils/audio';

export function BottomNav({
  currentView,
  onNavigateToMap,
  onOpenWiki,
  onOpenGuide,
  onOpenBadges,
  newBadge
}) {
  return (
    <nav 
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="手機快捷導覽"
    >
      <div className="grid grid-cols-4 items-center max-w-md mx-auto text-center">
        {/* 1. 關卡地圖 */}
        <button
          onClick={() => {
            sounds.playClick();
            onNavigateToMap();
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            currentView === 'map'
              ? 'text-amber-600 font-black'
              : 'text-slate-500 font-bold hover:text-slate-800'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
            currentView === 'map' ? 'bg-amber-100 text-amber-600 scale-105' : ''
          }`}>
            <Map className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">冒險地圖</span>
        </button>

        {/* 2. 奧數百科 */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenWiki();
          }}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-500 font-bold hover:text-slate-800 transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">奧數百科</span>
        </button>

        {/* 4. 通關秘笈 */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenGuide();
          }}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-500 font-bold hover:text-slate-800 transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">思維秘笈</span>
        </button>

        {/* 5. 勳章成就 */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenBadges();
          }}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-500 font-bold hover:text-slate-800 transition-all active:scale-95 relative"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors relative">
            <Award className="w-4 h-4" />
            {newBadge && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">榮譽勳章</span>
        </button>
      </div>
    </nav>
  );
}
