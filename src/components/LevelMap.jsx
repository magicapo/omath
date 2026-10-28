import React from 'react';
import { 
  Sparkles, 
  Trees, 
  Scale, 
  Hourglass, 
  RotateCw, 
  Shapes, 
  Candy, 
  Star, 
  Play, 
  Lock, 
  ChevronRight,
  Navigation,
  Box,
  Maximize,
  Compass,
  ShieldCheck,
  GitBranch,
  Grid,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/audio';

const ICON_MAP = {
  Sparkles,
  PawPrint: Scale,
  Trees,
  Scale,
  Hourglass,
  RotateCw,
  Shapes,
  Candy,
  Navigation,
  Box,
  Maximize,
  Compass,
  ShieldCheck,
  GitBranch,
  Grid
};

export function LevelMap({
  grade,
  topics,
  userProgress,
  onSelectLevel,
  onOpenSim,
  onOpenWiki
}) {
  const bannerGradient = grade === 4
    ? "from-slate-800 via-indigo-900 to-slate-900"
    : "from-slate-800 via-amber-950 to-slate-900";

  return (
    <div className="space-y-5 sm:space-y-7 pb-12 sm:pb-16">
      {/* Hero Banner */}
      <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ${bannerGradient} p-4 sm:p-7 text-white shadow-md border border-slate-700/60 transition-all`}>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] sm:text-xs font-semibold mb-2 text-slate-200 border border-white/10">
            <span>奧數思維體系</span>
            <span>·</span>
            <span>{grade === 4 ? "四年級進階專題" : "三年級基礎專題"}</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1.5 leading-snug text-white">
            {grade === 4
              ? "四年級進階專題：建立抽象模型與結構化分析思維"
              : "三年級核心專題：奠定邏輯推理與具象建模基礎"}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            {grade === 4
              ? "涵蓋行程問題、抽屜原理、等積變形、流水行船與數論初步，掌握運動、幾何與整除的不變量分析方法。所有題目皆已解鎖，可自由選擇單元練習。"
              : "涵蓋速算巧算、雞兔同籠、植樹間隔與和差倍等經典專題，透過具象教具與線段圖，建立條理分明的思考習慣。所有題目皆已解鎖，可自由選擇單元練習。"}
          </p>
        </div>
      </div>

      {/* Topics Section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 flex items-center gap-1.5">
              <span>{grade === 4 ? "四年級 7 大進階專題" : "三年級 7 大基礎專題"}</span>
            </h2>
            <p className="text-xs text-slate-500">
              共 7 個專題單元，每個單元包含 3 道循序漸進的題型與互動教學模型
            </p>
          </div>
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {topics.map((topic, topicIdx) => {
            const IconComponent = ICON_MAP[topic.icon] || Sparkles;
            const completedCount = topic.levels.filter(
              lvl => userProgress.completedLevels?.[lvl.id]
            ).length;
            const isTopicCompleted = completedCount === 3;

            return (
              <div
                key={topic.id}
                id={`topic-card-${topic.id}`}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden scroll-mt-24 sm:scroll-mt-28"
              >
                {/* Topic Header */}
                <div className={`p-4 bg-gradient-to-br ${topic.color} text-white`}>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="inline-block px-2 py-0.5 rounded bg-black/20 text-[11px] font-medium tracking-wide">
                      專題 {topicIdx + 1} · {topic.tag}
                    </span>
                    <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{completedCount} / 3 題</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-white tracking-tight truncate">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-white/90 truncate">{topic.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Topic Body */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2.5 line-clamp-2">
                      {topic.story}
                    </p>

                    {/* Mantra / Core Concept */}
                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold shrink-0">📌 核心方法：</span>
                      <span className="line-clamp-2">{topic.secretMantra}</span>
                    </div>
                  </div>

                  {/* Level Questions List */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      單元題目
                    </div>
                    <div className="space-y-1">
                      {topic.levels.map((level, lvlIdx) => {
                        const isDone = !!userProgress.completedLevels?.[level.id];

                        return (
                          <button
                            key={level.id}
                            onClick={() => {
                              sounds.playClick();
                              onSelectLevel(topic, level);
                            }}
                            className={`w-full text-left p-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all min-h-[42px] cursor-pointer ${
                              isDone
                                ? 'bg-amber-50/70 border border-amber-200 text-amber-950 hover:bg-amber-100/60'
                                : 'bg-slate-50 border border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100/70'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                  isDone
                                    ? 'bg-amber-400 text-amber-950'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {lvlIdx + 1}
                              </span>
                              <span className="truncate">{level.name}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions Bottom */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onOpenSim(topic);
                      }}
                      className="py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>🧮 互動教具</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        const nextLevel =
                          topic.levels.find(l => !userProgress.completedLevels?.[l.id]) ||
                          topic.levels[0];
                        onSelectLevel(topic, nextLevel);
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 text-white shadow-xs transition-all active:scale-98 bg-gradient-to-r ${topic.color}`}
                    >
                      <span>{isTopicCompleted ? '複習題目' : '開始練習'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IMO Knowledge Base Card */}
      <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl shrink-0">
            🏛️
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[10px] font-semibold uppercase tracking-wider mb-0.5">
              全球學術競賽架構
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              奧林匹亞數學 (IMO) 知識庫
            </h3>
            <p className="text-xs text-slate-400 max-w-xl mt-0.5 leading-relaxed">
              探索奧數歷史、四大核心領域（代數、數論、幾何、組合）與國際選拔訓練體系。
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            if (onOpenWiki) onOpenWiki();
          }}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shrink-0 flex items-center justify-center gap-1.5 active:scale-98"
        >
          <span>查看「奧數簡介」專區</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default LevelMap;
