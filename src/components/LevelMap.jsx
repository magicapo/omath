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
  Wand2
} from 'lucide-react';
import { sounds } from '../utils/audio';

const ICON_MAP = {
  Sparkles,
  PawPrint: Wand2,
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
  // Calculate grade-specific stars
  const gradeLevelIds = topics.flatMap(t => t.levels.map(l => l.id));
  const completedCountForGrade = gradeLevelIds.filter(id => userProgress.completedLevels?.[id]).length;
  const progressPercent = Math.round((completedCountForGrade / 21) * 100);

  // Title level based on current grade progress
  let rankTitle = grade === 4 ? "四年級先鋒 🚀" : "奧數初級見習 🎒";
  if (completedCountForGrade >= 18) rankTitle = "👑 IMO 少年傳奇大師";
  else if (completedCountForGrade >= 12) rankTitle = "🏆 鑽石奧數神探";
  else if (completedCountForGrade >= 6) rankTitle = "🌟 黃金思維領航員";
  else if (completedCountForGrade >= 1) rankTitle = "🚀 探索進階學徒";

  const bannerGradient = grade === 4
    ? "from-indigo-600 via-purple-600 to-pink-600"
    : "from-amber-500 via-orange-500 to-rose-500";

  return (
    <div className="space-y-5 sm:space-y-8 pb-12 sm:pb-16">
      {/* Hero Banner - Optimized for Vertical Mobile */}
      <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ${bannerGradient} p-4 sm:p-8 text-white shadow-lg sm:shadow-xl transition-all`}>
        {/* Subtle background graphic */}
        <div className="absolute -right-4 -bottom-6 opacity-15 sm:opacity-20 text-7xl sm:text-9xl select-none pointer-events-none">
          {grade === 4 ? "🛸" : "🏰"}
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold mb-2 border border-white/20">
            <span>✨ 智慧冒險之旅</span>
            <span>·</span>
            <span>{grade === 4 ? "四年級高階思維架構" : "三年級奧數啟蒙體系"}</span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1.5 leading-snug">
            {grade === 4 ? "四年級高階奧數：模型化思維躍遷！" : "探索三年級七大島嶼，破解思維謎題！"}
          </h1>
          <p className="text-white/90 text-xs sm:text-base leading-relaxed mb-4 max-w-2xl font-medium line-clamp-2 sm:line-clamp-none">
            {grade === 4
              ? "全面涵蓋行程問題、抽屜原理、流水行船、等積變形與數論初步，以模型思維破解幾何與代數難題！"
              : "告別死記硬背！透過動態教具、線段圖、抬腳法與週期規律，把抽象奧數變身生動有趣的解謎遊戲。"}
          </p>

          {/* Progress overview */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20 max-w-lg">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="text-[11px] opacity-90">稱號：</span>
                <span className="bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full text-[11px] font-black shadow-xs truncate max-w-[130px] sm:max-w-none">
                  {rankTitle}
                </span>
              </span>
              <span className="text-[11px] sm:text-xs text-amber-100">
                {completedCountForGrade} / 21 星 ({progressPercent}%)
              </span>
            </div>

            <div className="w-full h-2.5 sm:h-3 bg-black/25 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-amber-300 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Island Grid */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-800 flex items-center gap-1.5 sm:gap-2">
              <span>{grade === 4 ? "🚀 四年級七大進階主題" : "🗺️ 三年級七大島嶼關卡"}</span>
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-500 font-bold">
              共 7 個主題島嶼，每島 3 個遞進關卡與專屬具象教具
            </p>
          </div>
        </div>

        {/* Vertical stream on mobile, 2-col on tablet, 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {topics.map((topic, topicIdx) => {
            const IconComponent = ICON_MAP[topic.icon] || Sparkles;
            const completedCount = topic.levels.filter(
              lvl => userProgress.completedLevels?.[lvl.id]
            ).length;
            const isTopicCompleted = completedCount === 3;

            return (
              <div
                key={topic.id}
                className={`bg-white rounded-2xl sm:rounded-3xl border-2 ${topic.borderColor} shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group`}
              >
                {/* Island Header */}
                <div className={`p-4 sm:p-5 bg-gradient-to-br ${topic.color} text-white relative`}>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm text-[10px] sm:text-[11px] font-black tracking-wider">
                      島嶼 {topicIdx + 1} · {topic.tag}
                    </span>
                    <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{completedCount} / 3</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform shrink-0">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-lg sm:text-xl text-white tracking-tight truncate">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-white/90 font-medium truncate">{topic.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Island Content */}
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium mb-2.5 line-clamp-2">
                      {topic.story}
                    </p>

                    {/* Mantra Pill */}
                    <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed font-bold flex items-start gap-1.5">
                      <span className="text-amber-500 font-extrabold shrink-0">💡 心法：</span>
                      <span className="line-clamp-2">{topic.secretMantra}</span>
                    </div>
                  </div>

                  {/* Level Badges */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      關卡挑戰進度
                    </div>
                    <div className="space-y-1.5">
                      {topic.levels.map((level, lvlIdx) => {
                        const isDone = !!userProgress.completedLevels?.[level.id];
                        // Auto-unlock first level or previous level completed
                        const isUnlocked =
                          lvlIdx === 0 ||
                          !!userProgress.completedLevels?.[topic.levels[lvlIdx - 1].id];

                        return (
                          <button
                            key={level.id}
                            disabled={!isUnlocked}
                            onClick={() => {
                              sounds.playClick();
                              onSelectLevel(topic, level);
                            }}
                            className={`w-full text-left p-2.5 sm:p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all min-h-[44px] active:scale-[0.99] ${
                              isDone
                                ? 'bg-amber-50/90 border border-amber-200 text-amber-950 hover:bg-amber-100'
                                : isUnlocked
                                ? 'bg-slate-50 border border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50'
                                : 'bg-slate-100/60 border border-slate-200/50 text-slate-400 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                                  isDone
                                    ? 'bg-amber-400 text-amber-950'
                                    : isUnlocked
                                    ? 'bg-slate-200 text-slate-700'
                                    : 'bg-slate-200 text-slate-400'
                                }`}
                              >
                                {lvlIdx + 1}
                              </span>
                              <span className="truncate">{level.name}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {isDone ? (
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              ) : isUnlocked ? (
                                <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-slate-400" />
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
                      className="py-2 px-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <span>🧮 專屬教具</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        const nextLevel =
                          topic.levels.find(l => !userProgress.completedLevels?.[l.id]) ||
                          topic.levels[0];
                        onSelectLevel(topic, nextLevel);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1 text-white shadow-sm transition-all active:scale-95 bg-gradient-to-r ${topic.color}`}
                    >
                      <span>{isTopicCompleted ? '複習挑戰' : '開始闖關'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IMO Encyclopedia Feature Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-lg sm:shadow-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            🏛️
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-1 border border-amber-400/30">
              全球殿堂知識
            </div>
            <h3 className="text-base sm:text-xl font-black text-white">
              什麼是奧林匹亞數學 (IMO)？
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-0.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
              起源自 1959 年東歐，探索代數、數論、幾何與組合四大支柱，以及陶哲軒等世界頂尖數學家的奧數啟蒙之路。
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            if (onOpenWiki) onOpenWiki();
          }}
          className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2 active:scale-95"
        >
          <span>閱讀奧數百科全書</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default LevelMap;
