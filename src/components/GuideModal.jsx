import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, Lightbulb, Compass, Award } from 'lucide-react';
import { sounds } from '../utils/audio';

export function GuideModal({ isOpen, onClose, defaultGrade = 3 }) {
  const [activeTab, setActiveTab] = useState(defaultGrade);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-xl border-t sm:border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        role="dialog"
        aria-labelledby="guide-title"
      >
        {/* Header */}
        <div className="bg-slate-900 px-4 sm:px-6 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <div>
              <h3 id="guide-title" className="font-bold text-base">小學奧數核心思維指引</h3>
              <p className="text-[11px] text-slate-300">三至六年級關鍵數學模型與解題策略</p>
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

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 sm:px-6 pt-2.5 gap-1 sm:gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab(3);
            }}
            className={`flex-1 sm:flex-none pb-2.5 px-2.5 sm:px-3.5 font-bold text-xs transition-all border-b-2 flex items-center justify-center gap-1 shrink-0 ${
              activeTab === 3
                ? 'border-amber-500 text-amber-900 bg-white/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>三年級基礎</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab(4);
            }}
            className={`flex-1 sm:flex-none pb-2.5 px-2.5 sm:px-3.5 font-bold text-xs transition-all border-b-2 flex items-center justify-center gap-1 shrink-0 ${
              activeTab === 4
                ? 'border-indigo-600 text-indigo-900 bg-white/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>四年級進階</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab(5);
            }}
            className={`flex-1 sm:flex-none pb-2.5 px-2.5 sm:px-3.5 font-bold text-xs transition-all border-b-2 flex items-center justify-center gap-1 shrink-0 ${
              activeTab === 5
                ? 'border-teal-600 text-teal-900 bg-white/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>五年級拓展</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab(6);
            }}
            className={`flex-1 sm:flex-none pb-2.5 px-2.5 sm:px-3.5 font-bold text-xs transition-all border-b-2 flex items-center justify-center gap-1 shrink-0 ${
              activeTab === 6
                ? 'border-blue-700 text-blue-950 bg-white/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>六年級高階</span>
          </button>
        </div>

        <div className="p-3.5 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          {activeTab === 3 ? (
            <>
              <div className="p-3 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed font-normal">
                <strong>三年級學習定位（8~9歲）：</strong> 從具體形象思維向初步邏輯推理過渡。重點在於建立線段圖直觀模型、因數拆分湊整以及假設法初步分析。
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 速算與湊整</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    多加則減、少加則加；牢記乘法基準 25×4=100、125×8=1000；連續自然數求和運用高斯首尾配對公式。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 雞兔同籠與假設法</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    設定基準狀態（如假設全為某物體），計算理論值與實際值的總差額，透過個體差異除求目標數量。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 線段圖與和差倍</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    以較小量為 1 份基準量，利用線段等分對齊份額；總和除以總份數求基準量，差額除以份數差求基準量。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 年齡問題不變量</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    歲月同步流逝，兩人年齡差終生保持不變；運用年齡差這個恆定數值，轉化為差倍問題求解目標年份。
                  </p>
                </div>
              </div>
            </>
          ) : activeTab === 4 ? (
            <>
              <div className="p-3 sm:p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 text-xs sm:text-sm leading-relaxed font-normal">
                <strong>四年級學習定位（9~10歲）：</strong> 從算術計算躍升為結構化數學模型與數論邏輯。掌握行程相遇追及、抽屜原理極端分析、流水行船向量疊加與幾何等積變形。
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 行程相遇與追及</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    相向運動使用「速度和」（路程和 = 速度和 × 時間）；同向追趕使用「速度差」（路程差 = 速度差 × 時間）；過橋位移需計入車身長度。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 抽屜原理與最不利原則</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    考慮最極端、最不利的情形，將各種類分別取至臨界狀態後再多取 1 個即滿足條件；物體數除以抽屜數得整數商與餘數模型。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 幾何等積變形</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    同底等高三角形在平行線間拉伸面積不變；長方形內任一點連線的一半模型；大正方形四角弦圖割補法。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 數論整除與奇偶性</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    3/9 檢驗數位之和，4/8 檢驗末兩位與末三位；奇偶運算守恆性證明某些狀態轉化的不可能性。
                  </p>
                </div>
              </div>
            </>
          ) : activeTab === 5 ? (
            <>
              <div className="p-3 sm:p-4 rounded-xl bg-teal-50/80 border border-teal-200 text-teal-950 text-xs sm:text-sm leading-relaxed font-normal">
                <strong>五年級學習定位（10~11歲）：</strong> 從具象模型躍遷至抽象代數思維與綜合幾何模型。掌握分數裂項巧算、梯形蝴蝶與燕尾幾何定理、整除同餘週期與工程問題工作總量設定。
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 分數巧算與裂項相消</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    利用母積子差轉化公式 1/[n(n+1)] = 1/n - 1/(n+1)，將繁複分數連加轉化為中間正負對消，僅留首尾相減。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 幾何蝴蝶與燕尾模型</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    梯形兩翼面積恆等（S左 = S右）；上下底比例平方比；燕尾模型將線段底邊比精準轉化為頂點兩側三角形面積比。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 數論同餘與餘數特性</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    7/11/13 末三位截斷差整除法；同餘加減乘可保證餘數同餘；「差同減差、和同加和、餘同取餘」破解韓信點兵。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 工程問題與時鐘角速度</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    將總工程量虛設為「1」或工期公倍數，轉化為工作效率合作；時鐘分針每分走 6°、時針走 0.5°，化為角速度差 5.5°/分追及。
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 sm:p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs sm:text-sm leading-relaxed font-normal">
                <strong>六年級學習定位（11~12歲）：</strong> 小升初巔峰綜合思維，全面銜接初高中代數、數論與組合幾何。掌握比與百分數不變量、環形變速運動、不定方程整數篩選、立體截面與博弈極值對策。
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 比例思維與濃度不變量</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    抓住溶液混合、年齡變化或按比例分配中「完全不變」的基準量（溶質、差值或總量），設定份數建立比例方程快速破題。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 不定方程與整數約束</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    面對未知數多於方程數的 ax + by = c，利用整除性、係數奇偶性及正整數非負範圍進行精準區間篩選與收斂求唯一解。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 環形多次相遇與立體幾何</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    封閉環形跑道相向第 n 次相遇共行 n 圈、同向追及共超 1 圈；圓柱與圓錐等積旋轉變形；正方體三視圖標數極值推理。
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">📌 最值構造與博弈對稱策略</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    和為定值時「越接近積越大」的均值離散拆分；兩人取石子遊戲中構建「中心對稱」或「鏡像複製」的後手必勝守恆平衡態。
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>學習建議：</strong> 從三、四年級建立直觀線段圖與運動概念，進階到五、六年級的抽象比例方程、數論整除與極端構造思維，注重理解「為什麼這樣建模」而非死背公式套路。
          </div>
        </div>

        <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200 text-right shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-lg font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs shadow-xs transition-all active:scale-95"
          >
            關閉指引
          </button>
        </div>
      </div>
    </div>
  );
}
export default GuideModal;
