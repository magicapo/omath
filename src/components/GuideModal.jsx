import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, Lightbulb, Compass, Award } from 'lucide-react';
import { sounds } from '../utils/audio';

export function GuideModal({ isOpen, onClose, defaultGrade = 3 }) {
  const [activeTab, setActiveTab] = useState(defaultGrade);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border-t-4 sm:border-4 border-indigo-300 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        role="dialog"
        aria-labelledby="guide-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">📜</span>
            <div>
              <h3 id="guide-title" className="font-black text-base sm:text-lg">小學奧數思維通關秘笈</h3>
              <p className="text-[11px] sm:text-xs text-white/90">三、四年級思維躍遷核心指南</p>
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

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 pt-2.5 gap-2 shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab(3);
            }}
            className={`flex-1 sm:flex-none pb-2.5 px-3 sm:px-4 font-black text-xs transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 3
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🎒 三年級啟蒙心法</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab(4);
            }}
            className={`flex-1 sm:flex-none pb-2.5 px-3 sm:px-4 font-black text-xs transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 4
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🚀 四年級模型躍遷</span>
          </button>
        </div>

        <div className="p-3.5 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          {activeTab === 3 ? (
            <>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed">
                <strong>三年級定位（8~9歲）：</strong> 從「具體形象」走向「初步邏輯思維」。注重畫線段圖、湊整好朋友、抬腿假設等直觀解題策略。
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-amber-700 text-xs sm:text-sm">🔑 巧算與湊整</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    多加少減，乘法黃金搭檔 25×4=100、125×8=1000，等差用高斯公式。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-emerald-700 text-xs sm:text-sm">🔑 雞兔抬腿與假設</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    吹哨抬 2 腳，地上剩下的全為兔子前腳；或全假設為雞算出腳差額。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-blue-700 text-xs sm:text-sm">🔑 線段圖與和差倍</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    把小數看作 1 份量，畫線段對齊份額，總和除以總份數求基準。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-purple-700 text-xs sm:text-sm">🔑 年齡差永恆不變</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    歲月同步流逝，兩人年齡差終生不變，抓住差值化為差倍問題！
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs sm:text-sm leading-relaxed">
                <strong>四年級定位（9~10歲）：</strong> 從「單純計算」躍升為「抽象模型與數論邏輯」。掌握行程相遇追及、抽屜原理極端思考、流水行船向量疊加與等積幾何模型！
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-cyan-700 text-xs sm:text-sm">🏎️ 行程相遇與追及</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    相向而行用「速度和」，同向奔跑用「速度差」；火車過橋路程為「車長 + 橋長」。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-purple-700 text-xs sm:text-sm">📦 抽屜原理與最不利</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    最倒楣原則：把不同種類全摸一次，再多 1 個必然同色；物件數÷抽屜數=商...餘數。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-emerald-700 text-xs sm:text-sm">📐 幾何等積變形</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    同底等高平行拉伸面積不變；長方形內任一點連線的一半模型與割補移位。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-extrabold text-indigo-700 text-xs sm:text-sm">🔢 數論整除與奇偶</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    3/9 看數位和，4/8 看末兩位/三位；奇偶分析不變量破解狀態翻轉謎題！
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>學習指南：</strong> 建議三年級小朋友把基礎的線段圖與抬腿假設練得滾瓜爛熟後，再來挑戰四年級的行程與抽屜原理，思維成長效果最好！
          </div>
        </div>

        <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200 text-right shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white text-xs shadow-xs transition-all active:scale-95"
          >
            關閉指南
          </button>
        </div>
      </div>
    </div>
  );
}
export default GuideModal;
