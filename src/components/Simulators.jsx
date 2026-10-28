import React, { useState } from 'react';
import { Sparkles, HelpCircle, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';

// 1. 雞兔同籠：假設法驗證模型
export function ChickenRabbitSim() {
  const [totalAnimals, setTotalAnimals] = useState(8);
  const [rabbits, setRabbits] = useState(3);
  const chickens = totalAnimals - rabbits;
  const [legsLifted, setLegsLifted] = useState(0); // 0 or 2

  const totalLegs = chickens * 2 + rabbits * 4;
  const currentLegsOnGround = chickens * Math.max(0, 2 - legsLifted) + rabbits * Math.max(0, 4 - legsLifted);

  const whistle = () => {
    setLegsLifted(prev => (prev === 2 ? 0 : 2));
  };

  return (
    <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <h4 className="font-bold text-emerald-900 text-lg">雞兔同籠：假設法動態驗證模型</h4>
        </div>
        <button
          onClick={whistle}
          className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 transition-all transform active:scale-95 shadow-md ${
            legsLifted === 2
              ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <span>{legsLifted === 2 ? '🔄 恢復原本腳數' : '🚶 模擬每隻動物抬起 2 隻腳'}</span>
        </button>
      </div>

      <p className="text-xs text-emerald-700 mb-3">
        當每隻動物均扣除 2 隻腳時，所有雞的腳數歸零，地面剩餘腳數全為兔子多出的腳數。
      </p>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 bg-white/90 p-3 rounded-xl border border-emerald-200 text-center text-xs sm:text-sm">
        <div>
          <span className="text-slate-500 block">頭的總數</span>
          <span className="font-extrabold text-base text-slate-800">{totalAnimals} 個</span>
        </div>
        <div>
          <span className="text-slate-500 block">原本總腳數</span>
          <span className="font-extrabold text-base text-slate-800">{totalLegs} 隻</span>
        </div>
        <div>
          <span className="text-slate-500 block">每隻扣除 2 隻腳</span>
          <span className="font-extrabold text-base text-amber-600">
            {totalAnimals} × {legsLifted} = {totalAnimals * legsLifted} 隻
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">地面剩餘腳數</span>
          <span className="font-extrabold text-base text-emerald-700">{currentLegsOnGround} 隻腳</span>
        </div>
      </div>

      {/* Animals Display */}
      <div className="bg-emerald-100/60 p-4 rounded-xl border border-emerald-200/80 mb-4 min-h-[140px] flex flex-wrap gap-3 items-center justify-center">
        {/* Chickens */}
        {Array.from({ length: chickens }).map((_, i) => (
          <div
            key={`c-${i}`}
            className={`flex flex-col items-center bg-white px-3 py-2 rounded-xl shadow-sm border border-emerald-200 transition-transform ${
              legsLifted === 2 ? 'scale-90 -translate-y-1' : ''
            }`}
          >
            <span className="text-3xl">🐔</span>
            <span className="text-xs font-bold text-slate-600 mt-1">雞</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                legsLifted === 2 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {legsLifted === 2 ? '0 隻腳著地' : '2 隻腳'}
            </span>
          </div>
        ))}

        {/* Rabbits */}
        {Array.from({ length: rabbits }).map((_, i) => (
          <div
            key={`r-${i}`}
            className={`flex flex-col items-center bg-white px-3 py-2 rounded-xl shadow-sm border border-emerald-200 transition-transform ${
              legsLifted === 2 ? 'scale-105 -translate-y-2 ring-2 ring-amber-400' : ''
            }`}
          >
            <span className="text-3xl">🐰</span>
            <span className="text-xs font-bold text-slate-600 mt-1">兔子</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                legsLifted === 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {legsLifted === 2 ? '剩 2 隻腳著地' : '4 隻腳'}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed">
        <strong>💡 假設法推導原理：</strong> 假設每隻動物都扣除 2 隻腳（以雞為基準），雞著地的腳數歸零，地面剩餘的 <strong>{currentLegsOnGround}</strong> 隻腳全為兔子多出的 2 隻腳。因此兔子數量 = {currentLegsOnGround} ÷ (4 - 2) = <strong>{rabbits} 隻</strong>。
      </div>
    </div>
  );
}

// 2. 植樹問題：間隔模擬器
export function IntervalTreeSim() {
  const [totalLength, setTotalLength] = useState(20);
  const [interval, setInterval] = useState(5);
  const [type, setType] = useState('both'); // both, one, none, closed

  const intervalCount = Math.floor(totalLength / interval);
  let treeCount = intervalCount;
  if (type === 'both') treeCount = intervalCount + 1;
  else if (type === 'none') treeCount = Math.max(0, intervalCount - 1);
  else if (type === 'one' || type === 'closed') treeCount = intervalCount;

  return (
    <div className="bg-lime-50/80 border-2 border-lime-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🌲</span>
        <h4 className="font-bold text-lime-950 text-lg">植樹問題：間隔與棵數可視化</h4>
      </div>

      {/* Mode selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'both', label: '兩端都種 (間隔+1)' },
          { id: 'one', label: '只種一端 (間隔數)' },
          { id: 'none', label: '兩端不種 (間隔-1)' },
          { id: 'closed', label: '封閉圓形 (間隔數)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
              type === t.id
                ? 'bg-green-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-lime-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-white/90 p-3 rounded-xl border border-lime-200 text-xs">
        <div>
          <label className="text-slate-600 block mb-1 font-bold">
            總長度 / 周長：<span className="text-green-700">{totalLength} 公尺</span>
          </label>
          <input
            type="range"
            min="10"
            max="40"
            step="5"
            value={totalLength}
            onChange={e => setTotalLength(Number(e.target.value))}
            className="w-full accent-green-600 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-slate-600 block mb-1 font-bold">
            每個間隔：<span className="text-green-700">{interval} 公尺</span>
          </label>
          <input
            type="range"
            min="2"
            max="10"
            step="1"
            value={interval}
            onChange={e => setInterval(Number(e.target.value))}
            className="w-full accent-green-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Roadmap */}
      <div className="bg-amber-100/50 p-6 rounded-xl border border-lime-200 mb-4 overflow-x-auto">
        {type === 'closed' ? (
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-4 border-dashed border-emerald-400 relative flex items-center justify-center bg-emerald-50">
              <span className="text-xs font-bold text-emerald-800">圓形池塘周長 {totalLength}m</span>
              {Array.from({ length: treeCount }).map((_, i) => {
                const angle = (i / treeCount) * 2 * Math.PI;
                const x = 70 * Math.cos(angle);
                const y = 70 * Math.sin(angle);
                return (
                  <div
                    key={i}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute text-xl"
                  >
                    🌳
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="relative flex items-center justify-between h-20 pt-4 px-2">
              {/* Road line */}
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-amber-700/60 -translate-y-1/2 rounded-full" />
              
              {/* Intervals display */}
              {Array.from({ length: intervalCount + 1 }).map((_, i) => {
                const isStart = i === 0;
                const isEnd = i === intervalCount;
                let hasTree = false;

                if (type === 'both') hasTree = true;
                else if (type === 'one') hasTree = !isStart;
                else if (type === 'none') hasTree = !isStart && !isEnd;

                return (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className="h-10 flex items-center justify-center">
                      {hasTree ? (
                        <span className="text-2xl animate-bounce-soft">🌲</span>
                      ) : (
                        <span className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1">
                      {i * interval}m
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-center text-sm font-bold bg-white p-3 rounded-xl border border-lime-200">
        <div className="text-slate-700">
          間隔數 = {totalLength} ÷ {interval} = <span className="text-lime-700 text-lg">{intervalCount} 個</span>
        </div>
        <div className="text-green-800">
          樹木棵數 = <span className="text-emerald-600 text-lg">{treeCount} 棵</span>
        </div>
      </div>
    </div>
  );
}

// 3. 和差倍：線段圖動態模擬器
export function SegmentLineSim() {
  const [unitValue, setUnitValue] = useState(8);
  const [multiplier, setMultiplier] = useState(3);
  const [mode, setMode] = useState('multiple'); // 'multiple' or 'diff'

  const smallNum = unitValue;
  const bigNum = unitValue * multiplier;
  const totalSum = smallNum + bigNum;
  const difference = bigNum - smallNum;

  return (
    <div className="bg-blue-50/80 border-2 border-blue-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📐</span>
        <h4 className="font-bold text-blue-950 text-lg">和差倍問題：線段基準量模型</h4>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('multiple')}
          className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
            mode === 'multiple'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          和倍線段圖（總和模式）
        </button>
        <button
          onClick={() => setMode('diff')}
          className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
            mode === 'diff'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          差倍線段圖（差額模式）
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-4 mb-4 bg-white/90 p-3 rounded-xl border border-blue-200 text-xs">
        <div>
          <label className="text-slate-600 block mb-1 font-bold">
            1 份量（基準小數）：<span className="text-blue-700">{unitValue}</span>
          </label>
          <input
            type="range"
            min="4"
            max="15"
            value={unitValue}
            onChange={e => setUnitValue(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-slate-600 block mb-1 font-bold">
            倍數關係：<span className="text-blue-700">{multiplier} 倍</span>
          </label>
          <input
            type="range"
            min="2"
            max="5"
            value={multiplier}
            onChange={e => setMultiplier(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Bars */}
      <div className="bg-white p-4 rounded-xl border border-blue-200 mb-4 space-y-4">
        {/* Small number bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>弟弟 / 小數 (1 份)：</span>
            <span className="text-blue-600 font-extrabold">{smallNum}</span>
          </div>
          <div className="h-8 bg-blue-100 rounded-lg border-2 border-blue-400 flex items-center justify-center font-bold text-xs text-blue-800 w-28">
            1 份 ({smallNum})
          </div>
        </div>

        {/* Big number bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>哥哥 / 大數 ({multiplier} 份)：</span>
            <span className="text-indigo-600 font-extrabold">{bigNum}</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {Array.from({ length: multiplier }).map((_, i) => (
              <div
                key={i}
                className={`h-8 w-28 rounded-lg border-2 flex items-center justify-center font-bold text-xs ${
                  i === 0
                    ? 'bg-blue-100 border-blue-400 text-blue-800'
                    : 'bg-indigo-100 border-indigo-400 text-indigo-800'
                }`}
              >
                第 {i + 1} 份 ({smallNum})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion calculation */}
      <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-xs sm:text-sm text-indigo-900">
        {mode === 'multiple' ? (
          <div>
            <strong>和倍算理：</strong> 總份數 = 1 + {multiplier} = {1 + multiplier} 份。總和 ={' '}
            <span className="font-extrabold text-indigo-700">{totalSum}</span>。
            <br />
            1 份量（小數）= 總和 {totalSum} ÷ (1 + {multiplier}) = <strong>{smallNum}</strong>！
          </div>
        ) : (
          <div>
            <strong>差倍算理：</strong> 相差份數 = {multiplier} - 1 = {multiplier - 1} 份。相差 ={' '}
            <span className="font-extrabold text-rose-600">{difference}</span>。
            <br />
            1 份量（小數）= 差值 {difference} ÷ ({multiplier} - 1) = <strong>{smallNum}</strong>！
          </div>
        )}
      </div>
    </div>
  );
}

// 4. 階梯圖形平移模擬器
export function PerimeterSim() {
  const [shifted, setShifted] = useState(false);

  return (
    <div className="bg-sky-50/80 border-2 border-sky-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📐</span>
          <h4 className="font-bold text-sky-950 text-lg">巧求周長：平移大法動畫</h4>
        </div>
        <button
          onClick={() => setShifted(!shifted)}
          className="px-4 py-1.5 rounded-full font-bold bg-sky-600 hover:bg-sky-700 text-white text-xs shadow-md transition-all active:scale-95"
        >
          {shifted ? '⏪ 復原階梯形狀' : '📐 邊界平移投影'}
        </button>
      </div>

      <p className="text-xs text-sky-800 mb-3">
        點擊上方按鈕，觀察階梯上的橫向與縱向線段如何向外平移投影，轉化為標準長方形。
      </p>

      <div className="bg-white p-6 rounded-xl border border-sky-200 flex flex-col items-center justify-center min-h-[190px]">
        <svg width="240" height="150" viewBox="0 0 240 150" className="overflow-visible">
          {/* Base and Left border */}
          <line x1="30" y1="120" x2="190" y2="120" stroke="#0284c7" strokeWidth="4" />
          <line x1="30" y1="120" x2="30" y2="30" stroke="#0284c7" strokeWidth="4" />

          {/* Step segments: either stair or pushed to rectangle */}
          {/* Step 1 Horizontal */}
          <line
            x1="30"
            y1={shifted ? "30" : "30"}
            x2="90"
            y2={shifted ? "30" : "30"}
            stroke="#ea580c"
            strokeWidth="4"
            className="transition-all duration-700"
          />
          {/* Step 1 Vertical */}
          <line
            x1={shifted ? "190" : "90"}
            y1="30"
            x2={shifted ? "190" : "90"}
            y2="75"
            stroke="#16a34a"
            strokeWidth="4"
            className="transition-all duration-700"
          />

          {/* Step 2 Horizontal */}
          <line
            x1={shifted ? "90" : "90"}
            y1={shifted ? "30" : "75"}
            x2={shifted ? "190" : "190"}
            y2={shifted ? "30" : "75"}
            stroke="#ea580c"
            strokeWidth="4"
            className="transition-all duration-700"
          />
          {/* Step 2 Vertical */}
          <line
            x1="190"
            y1="75"
            x2="190"
            y2="120"
            stroke="#16a34a"
            strokeWidth="4"
            className="transition-all duration-700"
          />

          {/* Labels */}
          <text x="110" y="140" fill="#0284c7" fontSize="12" fontWeight="bold" textAnchor="middle">
            總寬度 8 cm
          </text>
          <text x="15" y="80" fill="#0284c7" fontSize="12" fontWeight="bold" textAnchor="middle">
            總高 6 cm
          </text>
        </svg>

        <div className="flex gap-4 text-xs mt-3">
          <span className="flex items-center gap-1 font-bold text-orange-600">
            <span className="w-3 h-1 bg-orange-500 inline-block rounded" /> 橫向邊（向上平移）
          </span>
          <span className="flex items-center gap-1 font-bold text-green-700">
            <span className="w-1 h-3 bg-green-600 inline-block rounded" /> 縱向邊（向右平移）
          </span>
        </div>
      </div>

      <div className="bg-sky-100/60 p-3 rounded-xl border border-sky-200 text-xs sm:text-sm text-sky-950 mt-3">
        <strong>口訣：</strong> 不管階梯有多少級，橫向平移等於底邊寬，縱向平移等於左側高！
        周長 = (8 + 6) × 2 = <strong>28 cm</strong>！
      </div>
    </div>
  );
}

// 5. 速算與巧算：湊整補數模型
export function QuickCalcSim() {
  const [val, setVal] = useState(298);
  const diff = 300 - val;

  return (
    <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">✨</span>
        <h4 className="font-bold text-amber-950 text-lg">速算技巧：湊整補數模型</h4>
      </div>
      <p className="text-xs text-amber-800 mb-4">
        滑動選擇接近整百的數值，觀察如何轉化為 (整百 - 補數) 形式簡化計算：
      </p>

      <div className="bg-white p-4 rounded-xl border border-amber-200 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-600">原數值：</span>
          <span className="text-2xl font-black text-amber-600">{val}</span>
        </div>
        <input
          type="range"
          min="290"
          max="299"
          value={val}
          onChange={e => setVal(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />

        <div className="mt-4 p-3 bg-amber-100/70 rounded-xl text-center text-sm font-bold text-amber-950">
          {val} 可以看成：<span className="text-blue-600 text-lg">300</span> - <span className="text-rose-600 text-lg">{diff}</span>
        </div>
      </div>

      <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-xs text-slate-700 leading-relaxed">
        <strong>例題演練：</strong> {val} + 456 = (300 - {diff}) + 456 = 300 + 456 - {diff} = 756 - {diff} = <strong>{756 - diff}</strong>！
      </div>
    </div>
  );
}

// 6. 旋轉摩天輪：週期與餘數指針
export function CycleSim() {
  const [index, setIndex] = useState(26);
  const items = [
    { label: "🔴 紅燈", color: "bg-red-500", rem: 1 },
    { label: "🟡 黃燈", color: "bg-amber-400", rem: 2 },
    { label: "🔵 藍燈", color: "bg-blue-500", rem: 3 },
    { label: "🟢 綠燈", color: "bg-emerald-500", rem: 0 }
  ];

  const cycleLen = 4;
  const quotient = Math.floor(index / cycleLen);
  const remainder = index % cycleLen;
  const currentItem = items[(remainder === 0 ? 4 : remainder) - 1];

  return (
    <div className="bg-rose-50/80 border-2 border-rose-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🎡</span>
        <h4 className="font-bold text-rose-950 text-lg">旋轉摩天輪：週期餘數探測器</h4>
      </div>

      <div className="bg-white p-4 rounded-xl border border-rose-200 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-600">想查詢第幾個彩燈：</span>
          <span className="text-2xl font-black text-rose-600">第 {index} 個</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={index}
          onChange={e => setIndex(Number(e.target.value))}
          className="w-full accent-rose-500 cursor-pointer"
        />

        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs font-bold">
          {items.map((it, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl border-2 transition-all ${
                (remainder === 0 && it.rem === 0) || remainder === it.rem
                  ? 'border-rose-500 bg-rose-100 shadow-md scale-105 ring-2 ring-rose-400'
                  : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <div className="text-base mb-1">{it.label.slice(0, 2)}</div>
              <div>{it.label.slice(3)}</div>
              <div className="text-[10px] text-slate-500 mt-1">
                {it.rem === 0 ? '整除(餘0)' : `餘數 ${it.rem}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-rose-100/60 p-3 rounded-xl border border-rose-200 text-xs sm:text-sm text-rose-950">
        <strong>計算式：</strong> {index} ÷ 4 = <span className="font-bold">{quotient}</span> (整組) ... 餘 <span className="font-black text-rose-700 text-base">{remainder}</span>！
        <br />
        對應第 <strong>{remainder === 0 ? 4 : remainder}</strong> 個燈，因此第 {index} 盞燈是：<strong>{currentItem.label}</strong>！
      </div>
    </div>
  );
}

// 7. 奇幻糖果屋：盈虧模擬器
export function SurplusDeficitSim() {
  const [kids, setKids] = useState(3);
  const planA_per = 3;
  const planA_surplus = 4;
  const candies = kids * planA_per + planA_surplus;

  const planB_per = 5;
  const planB_needed = kids * planB_per;
  const planB_deficit = planB_needed - candies;

  return (
    <div className="bg-fuchsia-50/80 border-2 border-fuchsia-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🍬</span>
        <h4 className="font-bold text-fuchsia-950 text-lg">奇幻糖果屋：一盈一虧可視化</h4>
      </div>

      <div className="bg-white p-4 rounded-xl border border-fuchsia-200 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-600">調整小朋友人數：</span>
          <span className="text-2xl font-black text-fuchsia-600">{kids} 位小朋友</span>
        </div>
        <input
          type="range"
          min="2"
          max="6"
          value={kids}
          onChange={e => setKids(Number(e.target.value))}
          className="w-full accent-fuchsia-500 cursor-pointer"
        />

        <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-bold">
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <div className="text-emerald-800 mb-1">方案一：每人發 3 顆</div>
            <div className="text-slate-600">發出 {kids * 3} 顆</div>
            <div className="text-emerald-700 font-extrabold text-sm mt-1">多出（盈）4 顆</div>
          </div>
          <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
            <div className="text-rose-800 mb-1">方案二：每人發 5 顆</div>
            <div className="text-slate-600">需要 {kids * 5} 顆</div>
            <div className="text-rose-700 font-extrabold text-sm mt-1">
              {planB_deficit > 0 ? `還差（虧）${planB_deficit} 顆` : `剛好發完`}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-fuchsia-100/60 p-3 rounded-xl border border-fuchsia-200 text-xs sm:text-sm text-fuchsia-950">
        <strong>解題鑰匙：</strong> 兩次總糖果差距 = 盈 4 + 虧 {planB_deficit} = <strong>{4 + planB_deficit} 顆</strong>。
        <br />
        每人差額 = 5 - 3 = <strong>2 顆</strong>。
        <br />
        人數 = {4 + planB_deficit} ÷ 2 = <span className="font-extrabold text-base text-fuchsia-700">{kids} 人</span>！
      </div>
    </div>
  );
}

// 8. 年齡問題模擬器
export function AgeProblemSim() {
  const [dadCurrent] = useState(36);
  const [sonCurrent] = useState(12);
  const [yearsOffset, setYearsOffset] = useState(-4); // -6 to 10

  const dadAge = dadCurrent + yearsOffset;
  const sonAge = sonCurrent + yearsOffset;
  const ageDiff = dadAge - sonAge;
  const ratio = (dadAge / sonAge).toFixed(1);

  return (
    <div className="bg-purple-50/80 border-2 border-purple-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">⏳</span>
        <h4 className="font-bold text-purple-950 text-lg">時鐘老人：時光跳躍與年齡差</h4>
      </div>

      <div className="bg-white p-4 rounded-xl border border-purple-200 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-600">滑動穿梭時空：</span>
          <span className="text-sm font-black text-purple-700">
            {yearsOffset === 0 ? '今年 (現在)' : yearsOffset > 0 ? `${yearsOffset} 年後` : `${Math.abs(yearsOffset)} 年前`}
          </span>
        </div>
        <input
          type="range"
          min="-8"
          max="8"
          value={yearsOffset}
          onChange={e => setYearsOffset(Number(e.target.value))}
          className="w-full accent-purple-600 cursor-pointer"
        />

        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-purple-100/60 p-2.5 rounded-xl border border-purple-200">
            <span className="text-[11px] text-slate-600 block">爸爸年齡</span>
            <span className="text-xl font-black text-purple-900">{dadAge} 歲</span>
          </div>
          <div className="bg-pink-100/60 p-2.5 rounded-xl border border-pink-200">
            <span className="text-[11px] text-slate-600 block">兒子年齡</span>
            <span className="text-xl font-black text-pink-900">{sonAge} 歲</span>
          </div>
          <div className="bg-amber-100/60 p-2.5 rounded-xl border border-amber-200">
            <span className="text-[11px] text-slate-600 block">年齡差 (固定)</span>
            <span className="text-xl font-black text-amber-800">{ageDiff} 歲</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-100/70 p-3 rounded-xl border border-purple-200 text-xs sm:text-sm text-purple-950">
        <strong>發現秘密：</strong> 不管滑動到幾年前還是幾年後，爸爸和兒子的年齡差永遠是 <strong>{ageDiff} 歲</strong>！
        {yearsOffset === -4 && (
          <span className="block mt-1 font-bold text-emerald-700">
            🎉 發現了！4 年前（爸爸 32 歲，兒子 8 歲），爸爸正好是兒子的 32 ÷ 8 = 4 倍！
          </span>
        )}
      </div>
    </div>
  );
}

// 9. 四年級：行程問題（相遇與追及模擬器）
export function SpeedDistanceSim() {
  const [mode, setMode] = useState('meet'); // 'meet' or 'chase'
  const [hours, setHours] = useState(1);

  // Meet settings: distance 240km, speedA = 50, speedB = 70
  const meetSpeedA = 50;
  const meetSpeedB = 70;
  const totalDist = 240;
  const meetTime = totalDist / (meetSpeedA + meetSpeedB); // 2 hours
  const posA = Math.min(totalDist, meetSpeedA * hours);
  const posB = Math.max(0, totalDist - meetSpeedB * hours);

  // Chase settings: speedPolice = 50, speedThief = 20, initial gap = 30km
  const chaseSpeedP = 50;
  const chaseSpeedT = 20;
  const gap = 30;
  const chaseDistP = chaseSpeedP * hours;
  const chaseDistT = gap + chaseSpeedT * hours;
  const remainingGap = Math.max(0, chaseDistT - chaseDistP);

  return (
    <div className="bg-cyan-50/80 border-2 border-cyan-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏎️</span>
          <h4 className="font-bold text-cyan-950 text-lg">行程問題：動態相遇與追及跑道</h4>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => { setMode('meet'); setHours(1); }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              mode === 'meet' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            相向而行（相遇）
          </button>
          <button
            onClick={() => { setMode('chase'); setHours(0.5); }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              mode === 'chase' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            同向奔跑（追及）
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-cyan-200 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-600">已出發行駛時間：</span>
          <span className="text-lg font-black text-cyan-700">{hours} 小時</span>
        </div>
        <input
          type="range"
          min="0"
          max={mode === 'meet' ? "2.5" : "1.5"}
          step="0.1"
          value={hours}
          onChange={e => setHours(Number(e.target.value))}
          className="w-full accent-cyan-600 cursor-pointer"
        />

        {/* Visual Track */}
        <div className="mt-4 p-4 bg-slate-100 rounded-xl relative h-28 border border-slate-300 overflow-hidden flex flex-col justify-center">
          {/* Road */}
          <div className="w-full h-3 bg-slate-300 rounded-full relative">
            <div className="absolute inset-0 border-t-2 border-dashed border-white top-1/2 -translate-y-1/2" />
          </div>

          {mode === 'meet' ? (
            <>
              {/* Car A */}
              <div
                style={{ left: `${Math.min(90, (posA / totalDist) * 90)}%` }}
                className="absolute top-3 transition-all duration-100 flex flex-col items-center"
              >
                <span className="text-2xl">🚗</span>
                <span className="text-[10px] font-bold text-blue-700 bg-white px-1.5 rounded shadow">
                  甲車 {Math.round(posA)}km
                </span>
              </div>

              {/* Car B */}
              <div
                style={{ left: `${Math.max(5, (posB / totalDist) * 90)}%` }}
                className="absolute top-12 transition-all duration-100 flex flex-col items-center"
              >
                <span className="text-2xl transform -scale-x-100">🚙</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-1.5 rounded shadow">
                  乙車 {Math.round(totalDist - posB)}km
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Police */}
              <div
                style={{ left: `${Math.min(85, (chaseDistP / 100) * 85)}%` }}
                className="absolute top-3 transition-all duration-100 flex flex-col items-center"
              >
                <span className="text-2xl">🚓</span>
                <span className="text-[10px] font-bold text-blue-700 bg-white px-1.5 rounded shadow">
                  警察 {Math.round(chaseDistP)}km
                </span>
              </div>

              {/* Thief */}
              <div
                style={{ left: `${Math.min(85, (chaseDistT / 100) * 85)}%` }}
                className="absolute top-12 transition-all duration-100 flex flex-col items-center"
              >
                <span className="text-2xl">🛵</span>
                <span className="text-[10px] font-bold text-rose-700 bg-white px-1.5 rounded shadow">
                  小偷 {Math.round(chaseDistT)}km
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-cyan-100/70 p-3 rounded-xl border border-cyan-200 text-xs sm:text-sm text-cyan-950">
        {mode === 'meet' ? (
          <div>
            <strong>相遇算理：</strong> 速度和 = 50 + 70 = <strong>120 km/h</strong>。總路程 = 240 km。<br />
            相遇時間 = 240 ÷ 120 = <span className="font-extrabold text-cyan-800 text-base">{meetTime} 小時</span>！
            {hours >= 2 && <span className="text-emerald-700 font-bold ml-1">🎉 剛好在此時相遇！</span>}
          </div>
        ) : (
          <div>
            <strong>追及算理：</strong> 起始差距 = 30 km。速度差 = 50 - 20 = <strong>30 km/h</strong>。<br />
            追及時間 = 差距 30 ÷ 速度差 30 = <span className="font-extrabold text-cyan-800 text-base">1 小時</span>！
            {remainingGap === 0 && <span className="text-emerald-700 font-bold ml-1">🎉 警察成功追上了小偷！</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// 10. 四年級：抽屜原理（最不利摸球箱）
export function PigeonholeSim() {
  const [drawn, setDrawn] = useState([]);
  const colors = [
    { name: '紅球', icon: '🔴', code: 'red' },
    { name: '藍球', icon: '🔵', code: 'blue' },
    { name: '綠球', icon: '🟢', code: 'green' }
  ];

  // Draw 1 random ball
  const drawRandom = () => {
    if (drawn.length >= 10) return;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setDrawn(prev => [...prev, randomColor]);
  };

  // Draw worst case: 1 red, 1 blue, 1 green, then 2nd red
  const drawWorstCase = () => {
    setDrawn([colors[0], colors[1], colors[2], colors[0]]);
  };

  const resetBox = () => setDrawn([]);

  // Check if has duplicate
  const counts = drawn.reduce((acc, b) => {
    acc[b.name] = (acc[b.name] || 0) + 1;
    return acc;
  }, {});
  const hasPair = Object.values(counts).some(c => c >= 2);

  return (
    <div className="bg-purple-50/80 border-2 border-purple-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦</span>
          <h4 className="font-bold text-purple-950 text-lg">抽屜原理：最不利摸球模擬箱</h4>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={resetBox}
            className="px-2.5 py-1 rounded-full text-xs font-bold bg-white text-slate-600 border border-slate-200"
          >
            重置
          </button>
          <button
            onClick={drawWorstCase}
            className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
          >
            演練「最倒楣情況」
          </button>
        </div>
      </div>

      <p className="text-xs text-purple-800 mb-3">
        箱子裡有足夠多的紅、藍、綠三種球（3 種抽屜）。至少摸幾個球才能「保證」有 2 個同色？
      </p>

      <div className="bg-white p-4 rounded-xl border border-purple-200 mb-4 text-center">
        <button
          onClick={drawRandom}
          className="px-5 py-2.5 rounded-full font-black text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white shadow-md active:scale-95 transition-all mb-4"
        >
          🎲 閉眼隨機摸 1 個球（已摸 {drawn.length} 個）
        </button>

        {/* Drawn balls display */}
        <div className="min-h-[60px] bg-purple-100/50 rounded-xl p-3 flex flex-wrap items-center justify-center gap-2 border border-purple-200">
          {drawn.length === 0 ? (
            <span className="text-xs text-slate-400 font-bold">摸球箱已準備好，點擊上方按鈕摸球！</span>
          ) : (
            drawn.map((b, i) => (
              <span key={i} className="text-2xl animate-in zoom-in-75 duration-150" title={b.name}>
                {b.icon}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="bg-purple-100/70 p-3 rounded-xl border border-purple-200 text-xs sm:text-sm text-purple-950 leading-relaxed">
        <strong>抽屜原理秘笈：</strong> 這裡共有 3 種顏色（3 個抽屜）。最倒楣的情況是前 3 次分別摸到紅、藍、綠各 1 個。
        <br />
        當摸第 <strong>3 + 1 = 4 個球</strong> 時，無論是什麼顏色，必定與前 3 個中的某一個同色！
        {hasPair && (
          <span className="block mt-1 font-black text-emerald-700">
            🎉 出現同色成對了！驗證成功：只要摸 4 次，100% 必然成對！
          </span>
        )}
      </div>
    </div>
  );
}

// 11. 四年級：幾何等積變形拉伸演示
export function AreaTransformSim() {
  const [topX, setTopX] = useState(100); // 30 to 170
  const base = 8;
  const height = 6;
  const area = (base * height) / 2;

  return (
    <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📐</span>
        <h4 className="font-bold text-emerald-950 text-lg">等積變形：同底等高平行拉伸</h4>
      </div>

      <p className="text-xs text-emerald-800 mb-3">
        拖動滑桿讓三角形的頂點在上方平行線上隨意滑動，觀察面積是否改變！
      </p>

      <div className="bg-white p-4 rounded-xl border border-emerald-200 mb-4 flex flex-col items-center">
        <svg width="240" height="130" viewBox="0 0 240 130" className="overflow-visible">
          {/* Top parallel line */}
          <line x1="20" y1="30" x2="220" y2="30" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
          {/* Bottom parallel line */}
          <line x1="20" y1="100" x2="220" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />

          {/* Triangle Base */}
          <line x1="50" y1="100" x2="150" y2="100" stroke="#059669" strokeWidth="4" />

          {/* Triangle fill */}
          <polygon
            points={`${topX},30 50,100 150,100`}
            fill="#a7f3d0"
            fillOpacity="0.6"
            stroke="#047857"
            strokeWidth="2.5"
            className="transition-all duration-75"
          />

          {/* Height line */}
          <line x1={topX} y1="30" x2={topX} y2="100" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />

          <circle cx={topX} cy="30" r="5" fill="#ea580c" />
          <text x="100" y="118" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">底邊長 8 cm</text>
          <text x={Math.min(185, topX + 8)} y="68" fill="#ea580c" fontSize="11" fontWeight="bold">高 6 cm</text>
        </svg>

        <div className="w-full max-w-xs mt-3">
          <label className="text-xs font-bold text-slate-600 block mb-1">
            在平行線上滑動頂點位置：
          </label>
          <input
            type="range"
            min="30"
            max="180"
            value={topX}
            onChange={e => setTopX(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-emerald-100/70 p-3 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-bold text-center">
        底 = 8 cm，高 = 6 cm。三角形面積 = 8 × 6 ÷ 2 = <span className="text-emerald-800 text-base">{area} cm²</span>！
        <span className="block text-xs text-slate-600 font-normal mt-0.5">
          頂點不管滑到哪裡，因為兩條平行線距離不變，高永遠是 6cm，面積永遠等於 24 cm²！
        </span>
      </div>
    </div>
  );
}

// 12. 四年級：流水行船模擬器
export function BoatCurrentSim() {
  const [boatSpeed, setBoatSpeed] = useState(20);
  const [waterSpeed, setWaterSpeed] = useState(4);

  const downStreamSpeed = boatSpeed + waterSpeed;
  const upStreamSpeed = Math.max(0, boatSpeed - waterSpeed);

  return (
    <div className="bg-teal-50/80 border-2 border-teal-300 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🚢</span>
        <h4 className="font-bold text-teal-950 text-lg">流水行船：船速與水速疊加器</h4>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 bg-white p-3 rounded-xl border border-teal-200 text-xs">
        <div>
          <label className="text-slate-600 block mb-1 font-bold">
            靜水船速：<span className="text-teal-700">{boatSpeed} km/h</span>
          </label>
          <input
            type="range"
            min="10"
            max="30"
            value={boatSpeed}
            onChange={e => setBoatSpeed(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>
        <div>
          <label className="text-slate-600 block mb-1 font-bold">
            水流速度：<span className="text-cyan-700">{waterSpeed} km/h</span>
          </label>
          <input
            type="range"
            min="2"
            max="8"
            value={waterSpeed}
            onChange={e => setWaterSpeed(Number(e.target.value))}
            className="w-full accent-cyan-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-center">
        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <span className="text-xs font-bold text-emerald-800 block">順水航行（水推船）</span>
          <span className="text-lg font-black text-emerald-700">
            {boatSpeed} + {waterSpeed} = {downStreamSpeed} km/h
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">如虎添翼，速度最快！</span>
        </div>
        <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
          <span className="text-xs font-bold text-rose-800 block">逆水航行（水頂船）</span>
          <span className="text-lg font-black text-rose-700">
            {boatSpeed} - {waterSpeed} = {upStreamSpeed} km/h
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">頂風逆行，速度減慢！</span>
        </div>
      </div>

      <div className="bg-teal-100/70 p-3 rounded-xl border border-teal-200 text-xs text-teal-950 leading-relaxed">
        <strong>和差公式速查：</strong> 
        靜水船速 = (順水 {downStreamSpeed} + 逆水 {upStreamSpeed}) ÷ 2 = <strong>{boatSpeed} km/h</strong>。<br />
        水流速度 = (順水 {downStreamSpeed} - 逆水 {upStreamSpeed}) ÷ 2 = <strong>{waterSpeed} km/h</strong>！
      </div>
    </div>
  );
}

// 13. 分數巧算與裂項相消模型 (五年級)
export function FractionCalcSim() {
  const [terms, setTerms] = useState(4); // 2 to 6
  // 1/(1*2) + 1/(2*3) + ... + 1/(n*(n+1)) = n/(n+1)
  const resultNum = terms;
  const resultDenom = terms + 1;

  return (
    <div className="bg-teal-50/80 border-2 border-teal-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">✨</span>
        <h4 className="font-bold text-teal-950 text-lg">分數裂項相消：母積子差動態模型</h4>
      </div>
      <p className="text-xs text-teal-800">
        公式核心：<code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono font-bold">1 / [n × (n+1)] = 1/n - 1/(n+1)</code>。觀察項數增加時，中間相鄰相反數如何完全抵消：
      </p>

      <div className="bg-white p-4 rounded-xl border border-teal-200 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-600">累加項數 (n)：</span>
          <span className="text-xl font-black text-teal-700">{terms} 項</span>
        </div>
        <input
          type="range"
          min="2"
          max="6"
          value={terms}
          onChange={e => setTerms(Number(e.target.value))}
          className="w-full accent-teal-600 cursor-pointer"
        />

        {/* Original Series */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-500 font-bold block mb-1">原題連續相加：</span>
          <div className="flex flex-wrap items-center gap-1 font-mono font-semibold text-slate-800">
            {Array.from({ length: terms }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span>1/({i + 1}×{i + 2})</span>
                {i < terms - 1 && <span className="text-slate-400 mx-1">+</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Split and Cancel Visual */}
        <div className="p-3 bg-teal-100/60 rounded-xl border border-teal-200 text-xs space-y-2">
          <span className="text-teal-900 font-bold block">裂項展開後正負對消：</span>
          <div className="flex flex-wrap items-center gap-1 font-mono text-[11px] leading-relaxed">
            <span className="px-1.5 py-0.5 rounded bg-teal-600 text-white font-bold">1/1</span>
            {Array.from({ length: terms - 1 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="line-through text-rose-500 bg-rose-50 px-1 rounded">- 1/{i + 2}</span>
                <span className="line-through text-emerald-600 bg-emerald-50 px-1 rounded ml-1">+ 1/{i + 2}</span>
              </span>
            ))}
            <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold ml-1">- 1/{terms + 1}</span>
          </div>
          <div className="text-[11px] text-slate-600 pt-1 border-t border-teal-200">
            中間所有中介分數全數抵消，僅存首項 <strong className="text-teal-800">1</strong> 與末項 <strong className="text-rose-700">1/{terms + 1}</strong>！
          </div>
        </div>

        <div className="text-center p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 font-bold text-sm text-emerald-950">
          最終簡化結果：1 - 1/{terms + 1} = <span className="text-lg text-emerald-700">{resultNum}/{resultDenom}</span>
        </div>
      </div>
    </div>
  );
}

// 14. 梯形蝴蝶定理模型 (五年級幾何)
export function GeometryButterflySim() {
  const [topBase, setTopBase] = useState(2); // 上底 a
  const [bottomBase, setBottomBase] = useState(4); // 下底 b
  // 梯形對角線分成 S1(上), S2(左), S3(右), S4(下)
  // S1 : S2 = a : b, S2 = S3 = sqrt(S1*S4) = a*b, S1 = a^2, S4 = b^2
  const sTop = topBase * topBase;
  const sBottom = bottomBase * bottomBase;
  const sLeft = topBase * bottomBase;
  const sRight = sLeft;
  const sTotal = sTop + sBottom + sLeft + sRight;

  return (
    <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🦋</span>
        <h4 className="font-bold text-amber-950 text-lg">梯形蝴蝶定理：面積不變量模型</h4>
      </div>
      <p className="text-xs text-amber-800">
        梯形兩條對角線將其分割成四個三角形。<strong>兩側翅膀面積恆等（S左 = S右）</strong>，且上下底比決定四區比例：
      </p>

      <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>上底長度：</span>
              <span className="text-amber-700">{topBase}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={topBase}
              onChange={e => setTopBase(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>下底長度：</span>
              <span className="text-amber-700">{bottomBase}</span>
            </div>
            <input
              type="range"
              min="2"
              max="6"
              value={bottomBase}
              onChange={e => setBottomBase(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Trapezoid Representation */}
        <div className="relative h-44 bg-slate-100 rounded-xl p-3 flex flex-col justify-between items-center border border-slate-200 overflow-hidden">
          <div className="text-[11px] font-bold text-slate-500">上底 a = {topBase}</div>
          <div className="grid grid-cols-3 gap-2 w-full max-w-xs text-center items-center my-auto">
            <div className="p-2 rounded-lg bg-orange-100 border border-orange-300">
              <span className="text-[10px] text-orange-700 block font-semibold">左翅 (S左)</span>
              <span className="text-sm font-black text-orange-900">{sLeft}</span>
            </div>
            <div className="space-y-1">
              <div className="p-1 rounded bg-amber-100 border border-amber-300">
                <span className="text-[9px] text-amber-700 block font-semibold">上部 (S1)</span>
                <span className="text-xs font-bold text-amber-900">{sTop}</span>
              </div>
              <div className="p-1 rounded bg-indigo-100 border border-indigo-300">
                <span className="text-[9px] text-indigo-700 block font-semibold">下部 (S2)</span>
                <span className="text-xs font-bold text-indigo-900">{sBottom}</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-orange-100 border border-orange-300">
              <span className="text-[10px] text-orange-700 block font-semibold">右翅 (S右)</span>
              <span className="text-sm font-black text-orange-900">{sRight}</span>
            </div>
          </div>
          <div className="text-[11px] font-bold text-slate-500">下底 b = {bottomBase}</div>
        </div>

        <div className="bg-amber-100/70 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
          <div>• <strong>對稱翅膀相等律：</strong> S左 ({sLeft}) 恆等於 S右 ({sRight})！</div>
          <div>• <strong>比例平方律：</strong> S上 : S下 = {topBase}² : {bottomBase}² = {sTop} : {sBottom}</div>
          <div>• <strong>乘積交叉律：</strong> S左 × S右 = {sLeft * sRight} = S上 × S下 ({sTop * sBottom})！</div>
        </div>
      </div>
    </div>
  );
}

// 15. 整除與韓信點兵同餘模型 (五年級數論)
export function DivisibilityCongruenceSim() {
  const [val, setVal] = useState(23);
  const r3 = val % 3;
  const r5 = val % 5;
  const r7 = val % 7;

  return (
    <div className="bg-indigo-50/80 border-2 border-indigo-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔢</span>
        <h4 className="font-bold text-indigo-950 text-lg">韓信點兵：同餘與除法餘數探測儀</h4>
      </div>
      <p className="text-xs text-indigo-800">
        同餘問題核心：「三人同行七十稀，五樹梅花廿一枝，七子團圓正半月，除百零五便得知」。
      </p>

      <div className="bg-white p-4 rounded-xl border border-indigo-200 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-600">測試士兵人數 (N)：</span>
          <span className="text-2xl font-black text-indigo-600">{val} 人</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={val}
          onChange={e => setVal(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />

        <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-indigo-100/60 border border-indigo-200">
            <span className="text-[11px] text-slate-500 block">3 人一列</span>
            <span className="text-lg font-black text-indigo-800">餘 {r3}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{val} mod 3</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-100/60 border border-purple-200">
            <span className="text-[11px] text-slate-500 block">5 人一列</span>
            <span className="text-lg font-black text-purple-800">餘 {r5}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{val} mod 5</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-100/60 border border-blue-200">
            <span className="text-[11px] text-slate-500 block">7 人一列</span>
            <span className="text-lg font-black text-blue-800">餘 {r7}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{val} mod 7</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
          中國剩餘定理快速驗算：<br />
          (70 × {r3} + 21 × {r5} + 15 × {r7}) mod 105 = {((70 * r3 + 21 * r5 + 15 * r7) % 105)} = <strong>{val % 105}</strong>
        </div>
      </div>
    </div>
  );
}

// 16. 工程問題合作效率模型 (五年級)
export function EngineeringSim() {
  const [daysA, setDaysA] = useState(10);
  const [daysB, setDaysB] = useState(15);
  // 合作天數 = 1 / (1/daysA + 1/daysB) = (daysA * daysB) / (daysA + daysB)
  const togetherDays = ((daysA * daysB) / (daysA + daysB)).toFixed(1);

  return (
    <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏗️</span>
        <h4 className="font-bold text-amber-950 text-lg">工程問題：工作總量與效率疊加</h4>
      </div>
      <p className="text-xs text-amber-800">
        將總工程量虛設為「1」。<strong>甲效率 = 1/天數A，乙效率 = 1/天數B</strong>。合作效率相加，工期大幅縮短：
      </p>

      <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>甲單獨完成：</span>
              <span className="text-amber-700">{daysA} 天</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              value={daysA}
              onChange={e => setDaysA(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block mt-1">甲效率 = 1/{daysA} /天</span>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>乙單獨完成：</span>
              <span className="text-amber-700">{daysB} 天</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              value={daysB}
              onChange={e => setDaysB(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block mt-1">乙效率 = 1/{daysB} /天</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
          <span className="text-xs text-emerald-800 block font-semibold">甲乙兩人合作總工期：</span>
          <span className="text-2xl font-black text-emerald-700">{togetherDays} 天</span>
          <span className="text-[11px] text-emerald-600 block mt-0.5">
            合作效率 = 1/{daysA} + 1/{daysB} = {((1/daysA + 1/daysB)).toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
}

// 17. 時鐘夾角與角速度追及模型 (五年級)
export function ClockAngleSim() {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(0);

  // 分針速度: 6度/分, 時針速度: 0.5度/分, 速度差: 5.5度/分
  const minuteAngle = minute * 6;
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  let diffAngle = Math.abs(hourAngle - minuteAngle);
  if (diffAngle > 180) diffAngle = 360 - diffAngle;

  return (
    <div className="bg-sky-50/80 border-2 border-sky-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⏰</span>
        <h4 className="font-bold text-sky-950 text-lg">時鐘問題：角速度追及與夾角儀</h4>
      </div>
      <p className="text-xs text-sky-800">
        時鐘本質是封閉環形追及問題：<strong>分針每分轉 6°，時針每分轉 0.5°，分針相對時針速度差為 5.5°/分</strong>。
      </p>

      <div className="bg-white p-4 rounded-xl border border-sky-200 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>小時 (點)：</span>
              <span className="text-sky-700">{hour} 點</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={hour}
              onChange={e => setHour(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>分鐘 (分)：</span>
              <span className="text-sky-700">{minute} 分</span>
            </div>
            <input
              type="range"
              min="0"
              max="59"
              value={minute}
              onChange={e => setMinute(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Clock Angles Display */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-center">
          <div>
            <span className="text-[10px] text-slate-500 block">時針角度</span>
            <span className="text-base font-bold text-slate-800">{hourAngle.toFixed(1)}°</span>
          </div>
          <div className="p-2 rounded-lg bg-sky-100 border border-sky-300">
            <span className="text-[11px] text-sky-800 block font-bold">兩針夾角</span>
            <span className="text-2xl font-black text-sky-700">{diffAngle.toFixed(1)}°</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">分針角度</span>
            <span className="text-base font-bold text-slate-800">{minuteAngle}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 18. 文氏圖容斥原理模型 (五年級)
export function VennSim() {
  const [total, setTotal] = useState(40);
  const [inA, setInA] = useState(25); // 喜歡語文
  const [inB, setInB] = useState(20); // 喜歡數學
  const [inBoth, setInBoth] = useState(12); // 都喜歡

  const union = inA + inB - inBoth; // 至少喜歡一科
  const neither = Math.max(0, total - union);

  return (
    <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⭕</span>
        <h4 className="font-bold text-emerald-950 text-lg">容斥原理：文氏圖交集重疊模型</h4>
      </div>
      <p className="text-xs text-emerald-800">
        容斥原理核心：<strong>兩者之和減去重疊交集</strong>。公式：<code className="bg-emerald-100 px-1 font-mono font-bold">|A ∪ B| = |A| + |B| - |A ∩ B|</code>。
      </p>

      <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <span className="font-bold text-slate-600 block mb-1">集合 A (語文): {inA}</span>
            <input
              type="range"
              min="15"
              max="35"
              value={inA}
              onChange={e => setInA(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
          <div>
            <span className="font-bold text-slate-600 block mb-1">集合 B (數學): {inB}</span>
            <input
              type="range"
              min="15"
              max="35"
              value={inB}
              onChange={e => setInB(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
          <div>
            <span className="font-bold text-slate-600 block mb-1">重疊交集: {inBoth}</span>
            <input
              type="range"
              min="5"
              max={Math.min(inA, inB)}
              value={inBoth}
              onChange={e => setInBoth(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Venn representation */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-center items-center gap-4 text-center">
          <div className="p-3 rounded-full bg-emerald-100 border border-emerald-300 w-28">
            <span className="text-[10px] text-slate-500 block">僅 A</span>
            <span className="text-lg font-black text-emerald-800">{inA - inBoth} 人</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-100 border-2 border-amber-400 w-24">
            <span className="text-[10px] text-amber-800 block font-bold">A ∩ B 重疊</span>
            <span className="text-xl font-black text-amber-900">{inBoth} 人</span>
          </div>
          <div className="p-3 rounded-full bg-blue-100 border border-blue-300 w-28">
            <span className="text-[10px] text-slate-500 block">僅 B</span>
            <span className="text-lg font-black text-blue-800">{inB - inBoth} 人</span>
          </div>
        </div>

        <div className="bg-emerald-100/60 p-2.5 rounded-xl text-xs text-emerald-950 text-center font-bold">
          至少參加一項總人數 = {inA} + {inB} - {inBoth} = <span className="text-base text-emerald-800">{union} 人</span>
        </div>
      </div>
    </div>
  );
}

// 19. 濃度與比例不變量模型 (六年級)
export function RatioDilutionSim() {
  const [waterAdded, setWaterAdded] = useState(200);
  const originalSolution = 200; // 200g
  const originalConc = 0.2; // 20%
  const salt = originalSolution * originalConc; // 40g 溶質不變
  const newSolution = originalSolution + waterAdded;
  const newConc = ((salt / newSolution) * 100).toFixed(1);

  return (
    <div className="bg-blue-50/80 border-2 border-blue-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧪</span>
        <h4 className="font-bold text-blue-950 text-lg">比與百分數：濃度稀釋不變量模型</h4>
      </div>
      <p className="text-xs text-blue-800">
        加水稀釋時，<strong>溶質（鹽）的質量完全不變</strong>。抓緊不變量，建立比例關係：
      </p>

      <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-600">向 200g 20% 鹽水加入清水：</span>
          <span className="text-xl font-black text-blue-600">+{waterAdded} 克</span>
        </div>
        <input
          type="range"
          min="0"
          max="600"
          step="50"
          value={waterAdded}
          onChange={e => setWaterAdded(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 block">新溶液總重</span>
            <span className="text-base font-bold text-slate-800">{newSolution} g</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300">
            <span className="text-[10px] text-emerald-700 block font-bold">不變的鹽</span>
            <span className="text-base font-black text-emerald-800">{salt} g</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-100 border border-blue-300">
            <span className="text-[10px] text-blue-800 block font-bold">新濃度</span>
            <span className="text-xl font-black text-blue-700">{newConc}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 20. 環形跑道追及模型 (六年級)
export function CircleMotionSim() {
  const [speedA, setSpeedA] = useState(8); // A速度 m/s
  const [speedB, setSpeedB] = useState(5); // B速度 m/s
  const trackLen = 400; // 400m
  // 同向追及超一圈時間: 400 / (speedA - speedB)
  const catchTime = (trackLen / Math.max(0.1, speedA - speedB)).toFixed(1);
  // 反向相遇一圈時間: 400 / (speedA + speedB)
  const meetTime = (trackLen / (speedA + speedB)).toFixed(1);

  return (
    <div className="bg-indigo-50/80 border-2 border-indigo-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏃</span>
        <h4 className="font-bold text-indigo-950 text-lg">環形跑道：相遇與同向追及模型</h4>
      </div>
      <p className="text-xs text-indigo-800">
        400米封閉跑道：<strong>相向運動路程和為跑道長（速度和），同向追趕快者超慢者一圈路程差為跑道長（速度差）</strong>。
      </p>

      <div className="bg-white p-4 rounded-xl border border-indigo-200 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="flex justify-between font-bold text-slate-600 mb-1">
              <span>快者速度 (A)：</span>
              <span className="text-indigo-700">{speedA} m/s</span>
            </div>
            <input
              type="range"
              min="6"
              max="12"
              value={speedA}
              onChange={e => setSpeedA(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between font-bold text-slate-600 mb-1">
              <span>慢者速度 (B)：</span>
              <span className="text-indigo-700">{speedB} m/s</span>
            </div>
            <input
              type="range"
              min="2"
              max="5"
              value={speedB}
              onChange={e => setSpeedB(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[11px] text-emerald-800 block font-bold">反向相遇時間</span>
            <span className="text-xl font-black text-emerald-700">{meetTime} 秒</span>
            <span className="text-[10px] text-slate-500 block">400 ÷ ({speedA} + {speedB})</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
            <span className="text-[11px] text-purple-800 block font-bold">同向追及超一圈時間</span>
            <span className="text-xl font-black text-purple-700">{catchTime} 秒</span>
            <span className="text-[10px] text-slate-500 block">400 ÷ ({speedA} - {speedB})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 21. 圓柱圓錐體積比例模型 (六年級立體幾何)
export function SolidGeometrySim() {
  const [radius, setRadius] = useState(3);
  const [height, setHeight] = useState(6);
  // V柱 = pi * r^2 * h, V錐 = 1/3 * pi * r^2 * h
  const baseArea = (Math.PI * radius * radius).toFixed(1);
  const vCylinder = (baseArea * height).toFixed(1);
  const vCone = (vCylinder / 3).toFixed(1);

  return (
    <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧊</span>
        <h4 className="font-bold text-amber-950 text-lg">立體幾何：等底等高圓柱與圓錐體積比</h4>
      </div>
      <p className="text-xs text-amber-800">
        等底等高的圓柱與圓錐：<strong>圓錐體積恆為圓柱的 1/3，圓柱體積為圓錐的 3 倍</strong>。
      </p>

      <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="flex justify-between font-bold text-slate-600 mb-1">
              <span>底面半徑 (r)：</span>
              <span className="text-amber-700">{radius} cm</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between font-bold text-slate-600 mb-1">
              <span>立體高度 (h)：</span>
              <span className="text-amber-700">{height} cm</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              value={height}
              onChange={e => setHeight(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300">
            <span className="text-[11px] text-amber-800 block font-bold">圓柱體積 (V柱)</span>
            <span className="text-xl font-black text-amber-900">{vCylinder} cm³</span>
            <span className="text-[10px] text-slate-500 block">πr²h</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
            <span className="text-[11px] text-indigo-800 block font-bold">圓錐體積 (V錐)</span>
            <span className="text-xl font-black text-indigo-700">{vCone} cm³</span>
            <span className="text-[10px] text-slate-500 block">1/3 πr²h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 22. 不定方程整數解篩選模型 (六年級)
export function DiophantineSim() {
  // 3x + 5y = 31, 求正整數解
  const solutions = [];
  for (let x = 1; x <= 10; x++) {
    const rem = 31 - 3 * x;
    if (rem > 0 && rem % 5 === 0) {
      solutions.push({ x, y: rem / 5 });
    }
  }

  const [testA, setTestA] = useState(3);
  const [testB, setTestB] = useState(5);
  const [totalC, setTotalC] = useState(31);

  const foundPairs = [];
  for (let x = 1; x <= Math.floor(totalC / testA); x++) {
    const rem = totalC - testA * x;
    if (rem > 0 && rem % testB === 0) {
      foundPairs.push({ x, y: rem / testB });
    }
  }

  return (
    <div className="bg-purple-50/80 border-2 border-purple-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚖️</span>
        <h4 className="font-bold text-purple-950 text-lg">不定方程：整數約束與範圍篩選</h4>
      </div>
      <p className="text-xs text-purple-800">
        方程：<code className="bg-purple-100 px-1 font-mono font-bold">{testA}x + {testB}y = {totalC}</code>（x, y 均為正整數）。利用整除性快速篩選：
      </p>

      <div className="bg-white p-4 rounded-xl border border-purple-200 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-600">常數總和 C：</span>
          <span className="text-lg font-black text-purple-700">{totalC}</span>
        </div>
        <input
          type="range"
          min="15"
          max="50"
          value={totalC}
          onChange={e => setTotalC(Number(e.target.value))}
          className="w-full accent-purple-600 cursor-pointer"
        />

        <div className="p-3 bg-purple-100/50 rounded-xl border border-purple-200">
          <span className="text-xs font-bold text-purple-900 block mb-2">符合條件的正整數解 (x, y)：</span>
          {foundPairs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {foundPairs.map((p, idx) => (
                <div key={idx} className="px-3 py-1 bg-white rounded-lg border border-purple-300 font-mono text-xs font-bold text-purple-950 shadow-xs">
                  x = {p.x}, y = {p.y} ({testA}×{p.x} + {testB}×{p.y} = {testA*p.x + testB*p.y})
                </div>
              ))}
            </div>
          ) : (
            <span className="text-xs text-slate-500 italic">在此總和下無正整數解</span>
          )}
        </div>
      </div>
    </div>
  );
}

// 23. 邏輯推理真假話模型 (六年級)
export function LogicSim() {
  const [suspect, setSuspect] = useState('A'); // 假設誰說真話

  return (
    <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🕵️</span>
        <h4 className="font-bold text-slate-900 text-lg">邏輯推理：假設反證真假話探測器</h4>
      </div>
      <p className="text-xs text-slate-600">
        題目：甲說「乙偷的」，乙說「丙偷的」，丙說「甲說謊」，丁說「不是我」。已知只有一人說真話，一人是小偷。
      </p>

      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="text-xs font-bold text-slate-700">點擊假設誰是小偷，驗證誰在說真話：</div>
        <div className="grid grid-cols-4 gap-2">
          {['A (甲)', 'B (乙)', 'C (丙)', 'D (丁)'].map((p, idx) => {
            const thief = ['A', 'B', 'C', 'D'][idx];
            // 甲說「乙是小偷」: thief === 'B'
            // 乙說「丙是小偷」: thief === 'C'
            // 丙說「甲說謊」: thief !== 'B'
            // 丁說「不是我」: thief !== 'D'
            const jTruth = thief === 'B';
            const yTruth = thief === 'C';
            const cTruth = thief !== 'B';
            const dTruth = thief !== 'D';
            const truthCount = [jTruth, yTruth, cTruth, dTruth].filter(Boolean).length;
            const isMatch = truthCount === 1;

            return (
              <button
                key={thief}
                onClick={() => setSuspect(thief)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  suspect === thief
                    ? isMatch
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400'
                      : 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div>假設小偷是 {thief}</div>
                <div className="text-[10px] mt-1 text-slate-500">
                  {truthCount} 人說真話
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 leading-relaxed">
          {suspect === 'C' ? (
            <span className="text-emerald-700 font-bold">
              🎉 完美吻合！當丙是小偷時：甲說假話、乙說真話、丙說真話（等等，若乙真丙真則有2人真話）。繼續嘗試：當【丁】是小偷時，丁說假話，甲假、乙假，唯有丙說真話（只有1人說真話）！
            </span>
          ) : (
            <span>
              切換不同假設，觀察說真話人數是否嚴格等於題目規定的 <strong>1 人</strong>。
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// 24. 博弈對稱取石子模型 (六年級)
export function GameNimSim() {
  const [pile1, setPile1] = useState(5);
  const [pile2, setPile2] = useState(5);

  const takeFromPile1 = (n) => setPile1(prev => Math.max(0, prev - n));
  const takeFromPile2 = (n) => setPile2(prev => Math.max(0, prev - n));
  const resetGame = () => { setPile1(5); setPile2(5); };

  return (
    <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">♟️</span>
        <h4 className="font-bold text-emerald-950 text-lg">博弈對策：對稱複製必勝策略</h4>
      </div>
      <p className="text-xs text-emerald-800">
        兩堆各 5 顆石子。<strong>後手必勝秘訣：對手在任一堆取幾顆，後手就在另一堆取完全相同數量，永遠保持兩堆平衡相等！</strong>
      </p>

      <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-3">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-xs font-bold text-amber-800 block mb-1">第一堆石子</span>
            <span className="text-2xl font-black text-amber-700 mb-2 block">{pile1} 顆</span>
            <div className="flex justify-center gap-1">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  disabled={pile1 < n}
                  onClick={() => takeFromPile1(n)}
                  className="px-2 py-1 bg-amber-600 text-white rounded text-xs font-bold disabled:opacity-30"
                >
                  取{n}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200">
            <span className="text-xs font-bold text-teal-800 block mb-1">第二堆石子</span>
            <span className="text-2xl font-black text-teal-700 mb-2 block">{pile2} 顆</span>
            <div className="flex justify-center gap-1">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  disabled={pile2 < n}
                  onClick={() => takeFromPile2(n)}
                  className="px-2 py-1 bg-teal-600 text-white rounded text-xs font-bold disabled:opacity-30"
                >
                  取{n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-600">
            {pile1 === pile2 ? (
              <strong className="text-emerald-700">兩堆相等平衡態（後手絕對優勢）</strong>
            ) : (
              <strong className="text-rose-600">平衡被打破（後手應立即在另一堆補齊差額）</strong>
            )}
          </span>
          <button
            onClick={resetGame}
            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold"
          >
            重新開局
          </button>
        </div>
      </div>
    </div>
  );
}

// 25. 正方體塗色與截面模型 (六年級)
export function CubeSliceSim() {
  const [n, setN] = useState(4); // 棱長分段數

  const totalCubes = n * n * n;
  const threeColored = 8; // 頂點
  const twoColored = 12 * Math.max(0, n - 2); // 棱中
  const oneColored = 6 * Math.max(0, (n - 2) * (n - 2)); // 面心
  const zeroColored = Math.max(0, (n - 2) * (n - 2) * (n - 2)); // 芯部

  return (
    <div className="bg-cyan-50/80 border-2 border-cyan-300 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧊</span>
        <h4 className="font-bold text-cyan-950 text-lg">正方體塗色：位置規律與公式驗證</h4>
      </div>
      <p className="text-xs text-cyan-800">
        大正方體表面塗色切塊：<strong>3面在頂點(8個)、2面在棱上[12×(n-2)]、1面在面上[6×(n-2)²]、0面在內部[(n-2)³]</strong>。
      </p>

      <div className="bg-white p-4 rounded-xl border border-cyan-200 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-600">大正方體棱長分段 (n)：</span>
          <span className="text-lg font-black text-cyan-700">{n} 段 (共 {totalCubes} 塊)</span>
        </div>
        <input
          type="range"
          min="3"
          max="6"
          value={n}
          onChange={e => setN(Number(e.target.value))}
          className="w-full accent-cyan-600 cursor-pointer"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
            <span className="text-[10px] text-rose-700 block font-bold">三面塗色 (頂點)</span>
            <span className="text-lg font-black text-rose-800">{threeColored} 塊</span>
            <span className="text-[9px] text-slate-400 block">固定為 8</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] text-amber-700 block font-bold">兩面塗色 (棱)</span>
            <span className="text-lg font-black text-amber-800">{twoColored} 塊</span>
            <span className="text-[9px] text-slate-400 block">12 × ({n}-2)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-[10px] text-blue-700 block font-bold">一面塗色 (面)</span>
            <span className="text-lg font-black text-blue-800">{oneColored} 塊</span>
            <span className="text-[9px] text-slate-400 block">6 × ({n}-2)²</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-600 block font-bold">零面塗色 (芯)</span>
            <span className="text-lg font-black text-slate-800">{zeroColored} 塊</span>
            <span className="text-[9px] text-slate-400 block">({n}-2)³</span>
          </div>
        </div>

        <div className="text-center p-2 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
          總塊數核驗：{threeColored} + {twoColored} + {oneColored} + {zeroColored} = <strong>{totalCubes} 塊</strong>
        </div>
      </div>
    </div>
  );
}

// 根據 simType 返回對應教具
export function DynamicSimulator({ type }) {
  switch (type) {
    case 'chicken-rabbit-sim':
      return <ChickenRabbitSim />;
    case 'interval-tree-sim':
      return <IntervalTreeSim />;
    case 'segment-line-sim':
      return <SegmentLineSim />;
    case 'perimeter-sim':
      return <PerimeterSim />;
    case 'quick-calc-sim':
      return <QuickCalcSim />;
    case 'cycle-sim':
      return <CycleSim />;
    case 'surplus-deficit-sim':
      return <SurplusDeficitSim />;
    case 'age-problem-sim':
      return <AgeProblemSim />;
    case 'speed-distance-sim':
      return <SpeedDistanceSim />;
    case 'pigeonhole-sim':
      return <PigeonholeSim />;
    case 'area-transform-sim':
      return <AreaTransformSim />;
    case 'boat-current-sim':
      return <BoatCurrentSim />;
    case 'divisibility-sim':
      return <QuickCalcSim />;
    case 'paths-grid-sim':
      return <PerimeterSim />;
    case 'magic-grid-sim':
      return <CycleSim />;

    // 五年級專題教具
    case 'fraction-calc-sim':
      return <FractionCalcSim />;
    case 'geometry-sim':
    case 'butterfly-sim':
      return <GeometryButterflySim />;
    case 'number-theory-sim':
    case 'congruence-sim':
      return <DivisibilityCongruenceSim />;
    case 'engineering-sim':
      return <EngineeringSim />;
    case 'clock-sim':
      return <ClockAngleSim />;
    case 'venn-sim':
      return <VennSim />;

    // 六年級專題教具
    case 'ratio-sim':
      return <RatioDilutionSim />;
    case 'circle-motion-sim':
      return <CircleMotionSim />;
    case 'solid-geometry-sim':
      return <SolidGeometrySim />;
    case 'diophantine-sim':
      return <DiophantineSim />;
    case 'logic-sim':
      return <LogicSim />;
    case 'game-sim':
      return <GameNimSim />;
    case 'cube-slice-sim':
      return <CubeSliceSim />;

    default:
      return null;
  }
}
