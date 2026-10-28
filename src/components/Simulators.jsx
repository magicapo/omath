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
    default:
      return null;
  }
}
