import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Columns, 
  Trophy, 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  Award,
  CheckCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { sounds } from '../utils/audio';

export function OlympiadWikiModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'origin' | 'pillars' | 'diff' | 'system' | 'methods'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-t-3xl sm:rounded-3xl shadow-2xl border-t-4 sm:border-4 border-amber-400 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200"
        role="dialog"
        aria-labelledby="wiki-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-4 sm:px-6 py-3 sm:py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl sm:text-2xl shadow-inner shrink-0">
              🏛️
            </div>
            <div>
              <h3 id="wiki-title" className="font-black text-base sm:text-xl">
                奧林匹亞數學指南 (IMO Encyclopedia)
              </h3>
              <p className="text-[11px] sm:text-xs text-white/90">
                探索奧數歷史、四大核心領域與思維本質
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-2 sm:px-6 overflow-x-auto gap-1 shrink-0">
          {[
            { id: 'origin', label: '一、起源定位', icon: '🌍' },
            { id: 'pillars', label: '二、四大領域', icon: '🏛️' },
            { id: 'diff', label: '三、常規差異', icon: '⚖️' },
            { id: 'system', label: '四、競賽體系', icon: '🏆' },
            { id: 'methods', label: '五、思維策略', icon: '🧠' },
            { id: 'value', label: '六、價值建議', icon: '💎' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id);
              }}
              className={`py-2.5 px-3 text-xs font-black whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-all ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-700 bg-amber-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed flex-1">
          {/* 1. 起源與背景 */}
          {activeTab === 'origin' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-sm">
                奧林匹亞數學（簡稱奧數，英文：Mathematical Olympiad）是專為青少年設計、以發掘與培育卓越數學思維與創新解題能力為核心的高難度數學競賽及專題數學體系。
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-xl mb-1">📜 歷史起源</div>
                  <h4 className="font-extrabold text-slate-800 mb-1">東歐學術競賽</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    19 世紀末至 20 世紀初起源於東歐（如匈牙利 Eötvös 競賽）。1959 年在羅馬尼亞舉辦了第一屆國際數學奧林匹克（IMO），當時僅有 7 個東歐國家參加。
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-xl mb-1">🌐 全球擴展</div>
                  <h4 className="font-extrabold text-slate-800 mb-1">全球超過 100 國</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    如今 IMO 已擴展為全球超過 100 個國家和地區參加的頂級年度青少年學術賽事，被公認為世界中學生智力最高殿堂。
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-xl mb-1">🎯 學科定位</div>
                  <h4 className="font-extrabold text-slate-800 mb-1">初等數學的極致</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    不強調大學階段的抽象工具（如微積分、矩陣分析等），而是以初等數學為語言，追求極致的思維深度、洞察力與嚴密證明。
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <h4 className="font-black text-blue-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  小學與中學奧數的傳承之路
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                  你在小學三、四年級所學的「和差倍、雞兔同籠、抽屜原理、等積變形」，正是這座雄偉數學大廈最基礎的地基！
                </p>
              </div>
            </div>
          )}

          {/* 2. 四大核心領域 (及小學題型對應) */}
          {activeTab === 'pillars' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold">
                奧林匹克數學分為四大板塊，被稱為奧數的「四大支柱」。看看我們小學關卡是如何對應這四大殿堂的：
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. 代數 */}
                <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-amber-900 text-sm flex items-center gap-1.5">
                      <span>1. 代數 (Algebra)</span>
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                      支柱之一
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>IMO 範疇：</strong> 不等式證明（柯西、均值）、多項式理論、韋達定理、函數方程、數列與遞迴。
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-[11px] text-amber-900 font-bold">
                    🎒 <strong>本站小學對應：</strong> 巧算魔法島（加減湊整、乘法分配律）、等差數列高斯求和、和差倍線段圖方程啟蒙。
                  </div>
                </div>

                {/* 2. 數論 */}
                <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-900 text-sm flex items-center gap-1.5">
                      <span>2. 數論 (Number Theory)</span>
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full">
                      支柱之二
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>IMO 範疇：</strong> 整除與質數、輾轉相除、同餘與模運算（費馬小定理、中國剩餘定理）、不定方程。
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-[11px] text-emerald-900 font-bold">
                    🎒 <strong>本站小學對應：</strong> 旋轉摩天輪（週期與餘數）、尾數規律、整除特徵（2/3/4/5/8/9）、奇偶性不變量分析。
                  </div>
                </div>

                {/* 3. 幾何 */}
                <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-blue-900 text-sm flex items-center gap-1.5">
                      <span>3. 幾何 (Geometry)</span>
                    </span>
                    <span className="text-[10px] bg-blue-200 text-blue-900 font-extrabold px-2 py-0.5 rounded-full">
                      支柱之三
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>IMO 範疇：</strong> 圓幕定理、四點共圓、三角形五心、塞瓦與梅涅勞斯定理、反演變換、射影幾何。
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-blue-200 text-[11px] text-blue-900 font-bold">
                    🎒 <strong>本站小學對應：</strong> 巧求周長平移大法、植樹問題間隔幾何、等積變形平行拉伸、長方形一半模型、割補移位法。
                  </div>
                </div>

                {/* 4. 組合數學 */}
                <div className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-purple-900 text-sm flex items-center gap-1.5">
                      <span>4. 組合數學 (Combinatorics)</span>
                    </span>
                    <span className="text-[10px] bg-purple-200 text-purple-900 font-extrabold px-2 py-0.5 rounded-full">
                      支柱之四
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong>IMO 範疇：</strong> 計數原理、容斥原理、鴿籠原理、極端原理、操作與不變量、棋盤著色、圖論基礎。
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-purple-200 text-[11px] text-purple-900 font-bold">
                    🎒 <strong>本站小學對應：</strong> 雞兔同籠假設法、抽屜原理最不利原則、加乘原理、方格迷宮標數法、數陣圖重疊數。
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. 奧數 vs 學校常規數學差異 */}
          {activeTab === 'diff' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-slate-600">
                奧數並非「超前學高中課本」，而是深挖同齡人思維的深度與維度：
              </p>

              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-black border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-1/4">比較維度</th>
                      <th className="p-3 w-3/8 text-slate-700">學校常規數學</th>
                      <th className="p-3 w-3/8 text-amber-700">奧林匹亞數學</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-3 font-bold text-slate-800 bg-slate-50">核心目標</td>
                      <td className="p-3 text-slate-600">建立基礎學科素養、標準運算與公式熟練度</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/40">
                        激發創新思維、深度邏輯推理與非典型解題能力
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-800 bg-slate-50">工具要求</td>
                      <td className="p-3 text-slate-600">注重解題程式化、規範格式與標準算法</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/40">
                        限制高等工具，依賴巧思、巧妙構造與嚴密推導
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-800 bg-slate-50">題目特徵</td>
                      <td className="p-3 text-slate-600">目標明確、線索直觀，題型重複度較高</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/40">
                        題目敘述精煉但切入點極深，無固定套路可循
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-800 bg-slate-50">作答形式</td>
                      <td className="p-3 text-slate-600">選擇題、填空題、簡答題、逐步計算</td>
                      <td className="p-3 font-bold text-amber-900 bg-amber-50/40">
                        客觀賽事後絕大多數為<strong>大題證明題</strong>，需嚴密論證
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. 主流競賽與選拔體系 */}
          {activeTab === 'system' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 bg-slate-100 rounded-xl font-mono text-xs text-center font-bold text-slate-700">
                普及賽事（校級/區級） ──&gt; 全國初選/複選 ──&gt; 國家選拔營 ──&gt; 國際賽事 (IMO)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 美國體系 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    🇺🇸 美國體系 (MAA)
                  </span>
                  <div className="space-y-1 text-xs text-slate-700 font-medium">
                    <p>• <strong>AMC 8/10/12</strong>：美國數學競賽（客觀選擇題，涵蓋中學全年級）</p>
                    <p>• <strong>AIME</strong>：美國數學邀請賽（3 小時 15 題填空題）</p>
                    <p>• <strong>USA(J)MO</strong>：美國數學奧林匹亞（高難度大題證明題）</p>
                    <p>• <strong>MOP</strong>：國家夏令營選拔出最終 6 名正選隊員赴 IMO！</p>
                  </div>
                </div>

                {/* 台灣體系 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    🇹🇼 台灣體系
                  </span>
                  <div className="space-y-1 text-xs text-slate-700 font-medium">
                    <p>• <strong>各校校內初選</strong></p>
                    <p>• <strong>各區學科能力競賽 / 奧林匹亞初選</strong></p>
                    <p>• <strong>全國決賽 / 奧林匹亞複選</strong></p>
                    <p>• <strong>國手選訓營</strong>（一階、二階選拔），最終遴選出 6 名國手代表隊！</p>
                  </div>
                </div>

                {/* 大陸體系 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    🇨🇳 中國大陸體系
                  </span>
                  <div className="space-y-1 text-xs text-slate-700 font-medium">
                    <p>• <strong>全國高中數學聯賽</strong>（高聯一試、二試）</p>
                    <p>• <strong>各省省隊選拔</strong></p>
                    <p>• <strong>全國中學生數學冬令營</strong> (CMO 全國決賽)</p>
                    <p>• <strong>國家集訓隊</strong>（60 人） $\rightarrow$ 6 人國家代表隊！</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. 核心思維方法 */}
          {activeTab === 'methods' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              {[
                {
                  title: "1. 化歸與轉化 (Reduction)",
                  desc: "將未知或複雜問題轉化為已知、低維或經典子問題。例如把梯形台階平移成標準長方形、把租船轉化為雞兔同籠。",
                  icon: "🔄"
                },
                {
                  title: "2. 構造法 (Construction)",
                  desc: "證明某種存在性或極值時，具體建構出滿足條件的對象、數陣圖排布或構造反例。",
                  icon: "🧱"
                },
                {
                  title: "3. 對稱性與齊次化 (Symmetry)",
                  desc: "在代數與幾何中利用輪換對稱性，或透過中心對稱簡化複雜幾何與數陣分佈。",
                  icon: "⚖️"
                },
                {
                  title: "4. 不變量思維 (Invariance)",
                  desc: "在離散變換或操作遊戲中，尋找在操作過程裡始終不變的量（如歲月流逝中的年齡差不變、翻杯子中的奇偶性不變）。",
                  icon: "🔒"
                },
                {
                  title: "5. 反證法 (Proof by Contradiction)",
                  desc: "假設結論不成立，透過一系列嚴密推導引出邏輯矛盾，從而徹底確認結論必定成立（如抽屜原理必有人同月出生）。",
                  icon: "⚡"
                }
              ].map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-start gap-3 shadow-sm">
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm mb-0.5">{m.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. 價值、影響與學習建議 */}
          {activeTab === 'value' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <h4 className="font-black text-amber-900 text-sm flex items-center gap-1.5">
                    <span>🌟 奧數的深遠價值</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                    <li>• <strong>深度邏輯思維</strong>：抽絲剝繭分析未知問題，養成清晰的推理鏈條。</li>
                    <li>• <strong>頂尖科學家搖籃</strong>：陶哲軒 (Terence Tao)、佩雷爾曼 (Grigori Perelman)、彼得·舒爾茨 (Peter Scholze) 等菲爾茲獎得主均在青少年時期在 IMO 斬獲金牌。</li>
                    <li>• <strong>超強學科遷移力</strong>：在電腦演算法設計、密碼學、AI 理論架構及量化金融領域具有無可替代的底層優勢。</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <h4 className="font-black text-emerald-900 text-sm flex items-center gap-1.5">
                    <span>🌱 家長與孩子學習建議</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                    <li>• <strong>興趣第一</strong>：建立在對數學本身的探索慾望之上，切忌死記硬背套路。</li>
                    <li>• <strong>重視本質理解</strong>：比起算出數字，更要注重思考「為什麼可以這樣做？背後道理是什麼？」。</li>
                    <li>• <strong>循序漸進</strong>：從三四年級趣味具象教具與直觀畫圖切入，保護探究的好奇心。</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <span className="hidden sm:inline">摘自國際數學奧林匹克 (IMO) 知識指南</span>
          <span className="sm:hidden text-[11px] font-bold text-amber-800">IMO 殿堂智庫</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-1.5 sm:py-2 rounded-full font-bold bg-amber-500 hover:bg-amber-600 text-white text-xs shadow-xs transition-all active:scale-95"
          >
            返回奧數冒險
          </button>
        </div>
      </div>
    </div>
  );
}
