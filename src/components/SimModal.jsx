import React from 'react';
import { X, Layers } from 'lucide-react';
import { DynamicSimulator } from './Simulators';
import { sounds } from '../utils/audio';

export function SimModal({ isOpen, onClose, topic }) {
  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-xl border-t sm:border border-slate-300 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        role="dialog"
        aria-labelledby="sim-title"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${topic.color} px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-2 min-w-0">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            <div className="min-w-0">
              <h3 id="sim-title" className="font-bold text-sm sm:text-base truncate">
                {topic.title} · 互動教學模型
              </h3>
              <p className="text-[11px] sm:text-xs text-white/90 truncate">{topic.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1">
          <DynamicSimulator type={topic.simType} />
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-200 text-right shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-lg font-bold bg-slate-800 hover:bg-slate-900 text-white text-xs shadow-xs transition-all active:scale-95"
          >
            返回練習題目
          </button>
        </div>
      </div>
    </div>
  );
}
export default SimModal;
