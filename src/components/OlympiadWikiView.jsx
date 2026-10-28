import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

export function OlympiadWikiView({ onSelectGrade }) {
  const sections = [
    { id: 'pillars', title: '一、四大核心領域 (The Big Four)', icon: '🏛️' },
    { id: 'origin', title: '二、起源定位與競賽背景', icon: '🌍' },
    { id: 'diff', title: '三、與學校常規數學的本質差異', icon: '⚖️' },
    { id: 'system', title: '四、國際選拔競賽體系 (AMC / IMO)', icon: '🏆' },
    { id: 'methods', title: '五、五大通用解題策略與思維模型', icon: '🧠' },
    { id: 'value', title: '六、深遠價值與學習建議', icon: '💎' }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(`wiki-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-8 text-white shadow-md border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[11px] sm:text-xs font-semibold mb-2.5 border border-amber-400/30">
            <span>🏛️ 奧林匹亞數學百科指南</span>
            <span>·</span>
            <span>IMO Encyclopedia</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-black tracking-tight mb-2 text-white">
            探索奧數體系：歷史、四大領域與核心思維模型
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
            奧林匹亞數學（Mathematical Olympiad）不只是競賽，更是一套訓練嚴謹邏輯推理、具象抽象轉化與創新解題策略的完整數學架構。往下滾動即可通篇閱讀各章節精華。
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onSelectGrade(3)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 flex items-center gap-1.5 cursor-pointer"
            >
              <span>前往三年級題庫</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectGrade(4)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 flex items-center gap-1.5 cursor-pointer"
            >
              <span>前往四年級題庫</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Quick Index Sticky Nav */}
      <div className="sticky top-14 sm:top-16 z-20 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 px-1">章節導覽：</span>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer flex items-center gap-1 active:scale-98"
            >
              <span>{sec.icon}</span>
              <span>{sec.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Continuous Document Content */}
      <div className="space-y-6 sm:space-y-8">
        {/* 1. 四大核心領域 */}
        <section
          id="wiki-section-pillars"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-4 scroll-mt-28"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                一、四大核心知識領域 (The Big Four)
              </h2>
              <p className="text-xs text-slate-500">
                國際數學奧林匹克 (IMO) 的全部題目均歸屬於以下四大領域，小學階段著重於具象操作與直觀感知。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  A
                </span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  代數 (Algebra)
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                <strong>核心內涵：</strong>等式與不等式性質、函數方程、數列求和、多項式分析。
              </p>
              <p className="text-xs text-slate-600">
                <strong>小學啟蒙：</strong>速算巧算（湊整、乘法分配律）、等量代換、和差倍問題、還原法倒推。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  N
                </span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  數論 (Number Theory)
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                <strong>核心內涵：</strong>整數性質、質數與合數、同餘理論、丟番圖不定方程。
              </p>
              <p className="text-xs text-slate-600">
                <strong>小學啟蒙：</strong>奇數與偶數特性、整除特徵（2、3、5、9 等）、最大公因數與最小公倍數、週期循環餘數。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  G
                </span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  幾何 (Geometry)
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                <strong>核心內涵：</strong>平面幾何定理、圓冪定理、射影幾何、不變量與變換。
              </p>
              <p className="text-xs text-slate-600">
                <strong>小學啟蒙：</strong>平移割補法、等積變形模型（鳥頭、蝴蝶、燕尾模型初步）、角度追蹤、周長面積割補。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                  C
                </span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  組合 (Combinatorics)
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                <strong>核心內涵：</strong>抽屜原理（鴿巢原理）、容斥原理、圖論初步、離散極值分析。
              </p>
              <p className="text-xs text-slate-600">
                <strong>小學啟蒙：</strong>分類加法與分步乘法計數、邏輯推理真假話分析、最不利原則（保證抽中）、對策遊戲。
              </p>
            </div>
          </div>
        </section>

        {/* 2. 起源與背景 */}
        <section
          id="wiki-section-origin"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-4 scroll-mt-28"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="text-2xl">🌍</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                二、起源定位與競賽背景
              </h2>
              <p className="text-xs text-slate-500">
                奧林匹亞數學的百年歷史脈絡與學術初衷。
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium text-xs sm:text-sm">
            奧林匹亞數學（簡稱奧數，英文：Mathematical Olympiad）是專為青少年設計、以發掘與培育卓越數學思維與創新解題能力為核心的高難度數學競賽及專題數學體系。
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xl mb-1">📜 歷史起源</div>
              <h4 className="font-bold text-slate-800 mb-1 text-sm">東歐學術競賽</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                19 世紀末至 20 世紀初起源於匈牙利（Eötvös 競賽）。1959 年在羅馬尼亞舉辦了第一屆國際數學奧林匹克（IMO），當時由東歐 7 國發起。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xl mb-1">🌐 全球擴展</div>
              <h4 className="font-bold text-slate-800 mb-1 text-sm">全球智力殿堂</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                如今 IMO 已有超過 110 個國家和地區參加，被譽為全球中學生最高殿堂級的學術智力競技盛會。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-xl mb-1">🎯 核心宗旨</div>
              <h4 className="font-bold text-slate-800 mb-1 text-sm">激發數學潛能</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                考驗思維的深度、創造性思維與非標準題型的解決能力，而非比拼繁複的計算量或死記公式。
              </p>
            </div>
          </div>
        </section>

        {/* 3. 與學校常規差異 */}
        <section
          id="wiki-section-diff"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-4 scroll-mt-28"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                三、與學校常規數學的本質差異
              </h2>
              <p className="text-xs text-slate-500">
                常規課堂與奧數體系在培養方向上的多維度對比。
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-1/4">比較維度</th>
                  <th className="p-3 w-3/8 text-slate-600">學校常規數學課堂</th>
                  <th className="p-3 w-3/8 text-amber-900 bg-amber-50">奧林匹亞數學 (Olympiad)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-bold text-slate-800">教學目標</td>
                  <td className="p-3 text-slate-600">全民普及，掌握基本運算與生活應用技能</td>
                  <td className="p-3 font-semibold text-amber-950 bg-amber-50/40">選拔與思維拓展，鍛鍊抽象化與高階邏輯</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">題目特徵</td>
                  <td className="p-3 text-slate-600">標準化、公式化，有既定的單元解題模板</td>
                  <td className="p-3 font-semibold text-amber-950 bg-amber-50/40">非標準化、結構隱蔽，需跨領域轉化模型</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">思考模式</td>
                  <td className="p-3 text-slate-600">順向計算、記憶算法（直接套公式）</td>
                  <td className="p-3 font-semibold text-amber-950 bg-amber-50/40">逆向推導、構造反例、不變量守恆分析</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">知識範圍</td>
                  <td className="p-3 text-slate-600">嚴格依據年級課綱循序漸進</td>
                  <td className="p-3 font-semibold text-amber-950 bg-amber-50/40">以小學直觀教具提早滲透離散數學與數論原理</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. 國際選拔競賽體系 */}
        <section
          id="wiki-section-system"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-4 scroll-mt-28"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                四、國際選拔競賽體系 (AMC / IMO)
              </h2>
              <p className="text-xs text-slate-500">
                全球通行的高階數學競賽路徑與知名國際賽事。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                <span>🇺🇸 美國數學競賽選拔體系 (MAA)</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                AMC 8 ➔ AMC 10/12 ➔ AIME ➔ USAMO ➔ IMO Team
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                全球認可度極高的選拔梯度，也是常春藤名校理工科系的重要參考指標。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                <span>🌏 國際小學與中學知名賽事</span>
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                <li>• <strong>SASMO</strong> (新加坡與亞洲學校奧數)</li>
                <li>• <strong>Kangourou</strong> (袋鼠數學競賽 - 啟蒙普及)</li>
                <li>• <strong>IMC</strong> (國際數學競賽)</li>
                <li>• <strong>WMI</strong> (世界數學邀請賽)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. 五大思維策略 */}
        <section
          id="wiki-section-methods"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-4 scroll-mt-28"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="text-2xl">🧠</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                五、五大通用解題策略與思維模型
              </h2>
              <p className="text-xs text-slate-500">
                破除題目表面包裝、找到底層規律的核心思考工具。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { name: '1. 化歸與轉化 (Reduction)', desc: '將複雜或未見過的難題轉化為熟悉、簡單的模型（例如將差倍轉為線段圖）。' },
              { name: '2. 數形結合 (Visual Modeling)', desc: '藉由幾何圖形、面積圖或數線，將抽象的代數關係轉化為肉眼直觀。' },
              { name: '3. 構造與極端化 (Construction & Extremes)', desc: '考慮最極端的情況（全部是雞或全部是兔、最大值或最小值），找尋臨界突破口。' },
              { name: '4. 不變量原則 (Invariance)', desc: '在變動的系統中找尋守恆的值（如行程問題的距離和、總年齡差永遠不變）。' },
              { name: '5. 反證法與窮舉分類 (Proof by Contradiction)', desc: '假設結論不成立，透過推導產生矛盾；或將情況不重不漏地逐一分類檢驗。' }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">{item.name}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 價值影響與建議 */}
        <section
          id="wiki-section-value"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-4 scroll-mt-28"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="text-2xl">💎</span>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                六、深遠價值與學習建議
              </h2>
              <p className="text-xs text-slate-500">
                奧數思維對未來學科、演算法設計的長期影響與家庭陪伴建議。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <h4 className="font-bold text-amber-900 text-sm">
                🌟 奧數的深遠價值
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <strong>深度邏輯思維</strong>：養成清晰的推理鏈條，抽絲剝繭分析未知問題。</li>
                <li>• <strong>頂尖科學家搖籃</strong>：陶哲軒、佩雷爾曼等菲爾茲獎得主均在青少年時期在 IMO 斬獲金牌。</li>
                <li>• <strong>跨領域遷移力</strong>：在演算法設計、密碼學、AI 理論架構及金融領域具備底層優勢。</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-900 text-sm">
                🌱 學習建議
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <strong>興趣第一</strong>：建立在對數學本身的探索慾望之上，切忌死記硬背套路。</li>
                <li>• <strong>重視本質理解</strong>：注重思考「為什麼可以這樣做？背後道理是什麼？」。</li>
                <li>• <strong>循序漸進</strong>：從三四年級趣味具象教具與直觀畫圖切入，保護探究的好奇心。</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-100 rounded-2xl p-5 sm:p-7 text-center space-y-3 border border-slate-200">
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          準備好開始動手解題了嗎？
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          挑選適合的年級專題，透過互動模型與循序漸進題型展開思考。
        </p>
        <div className="flex justify-center items-center gap-3 pt-1">
          <button
            onClick={() => onSelectGrade(3)}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 cursor-pointer"
          >
            進入三年級專題目錄
          </button>
          <button
            onClick={() => onSelectGrade(4)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 cursor-pointer"
          >
            進入四年級專題目錄
          </button>
        </div>
      </div>
    </div>
  );
}
export default OlympiadWikiView;
