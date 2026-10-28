import React, { useState, useEffect } from 'react';
import { TOPICS_BY_GRADE, ACHIEVEMENTS } from './data/topics';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LevelMap } from './components/LevelMap';
import { ChallengeView } from './components/ChallengeView';
import { Scratchpad } from './components/Scratchpad';
import { BadgesModal } from './components/BadgesModal';
import { GuideModal } from './components/GuideModal';
import { SimModal } from './components/SimModal';
import { OlympiadWikiModal } from './components/OlympiadWikiModal';
import { sounds } from './utils/audio';

const STORAGE_KEY = 'OMATH_GRADE_PROGRESS_V2';

export function App() {
  const [currentGrade, setCurrentGrade] = useState(() => {
    try {
      const savedGrade = localStorage.getItem('OMATH_SELECTED_GRADE');
      return savedGrade ? Number(savedGrade) : 3;
    } catch {
      return 3;
    }
  });

  // Load progress from localStorage
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to read progress from storage", e);
    }
    return {
      completedLevels: {},
      stars: 0,
      coins: 0,
      streak: 0,
      unlockedBadges: {},
      newBadge: false
    };
  });

  const [currentView, setCurrentView] = useState('map'); // 'map' | 'challenge'
  const [homeTab, setHomeTab] = useState('map'); // 'map' | 'wiki'
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  // Modals
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeSimTopic, setActiveSimTopic] = useState(null);

  const currentTopics = TOPICS_BY_GRADE[currentGrade] || TOPICS_BY_GRADE[3];

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  }, [progress]);

  // Save selected grade
  useEffect(() => {
    try {
      localStorage.setItem('OMATH_SELECTED_GRADE', String(currentGrade));
    } catch (e) {
      console.error("Failed to save grade", e);
    }
  }, [currentGrade]);

  // Handle URL hash changes for level direct navigation and wiki tab
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'map') {
        setCurrentView('map');
        setHomeTab('map');
        return;
      }
      if (hash === 'wiki' || hash === 'intro') {
        setCurrentView('map');
        setHomeTab('wiki');
        return;
      }

      for (const gr of [3, 4]) {
        for (const t of TOPICS_BY_GRADE[gr]) {
          const found = t.levels.find(l => l.id === hash);
          if (found) {
            setCurrentGrade(gr);
            setActiveTopic(t);
            setActiveLevel(found);
            setCurrentView('challenge');
            return;
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Check achievements helper
  const triggerBadgeCheck = (newCompleted, newStreak, levelId) => {
    const updatedBadges = { ...progress.unlockedBadges };
    const totalDone = Object.values(newCompleted).filter(Boolean).length;
    let earnedNew = false;

    // 1. first-step
    if (totalDone >= 1 && !updatedBadges['first-step']) {
      updatedBadges['first-step'] = true;
      earnedNew = true;
    }

    // 2. streak-3
    if (newStreak >= 3 && !updatedBadges['streak-3']) {
      updatedBadges['streak-3'] = true;
      earnedNew = true;
    }

    // 3. perfect-island: any topic with 3 levels completed
    const allTopics = [...TOPICS_BY_GRADE[3], ...TOPICS_BY_GRADE[4]];
    const hasPerfectIsland = allTopics.some(t => 
      t.levels.every(lvl => newCompleted[lvl.id])
    );
    if (hasPerfectIsland && !updatedBadges['perfect-island']) {
      updatedBadges['perfect-island'] = true;
      earnedNew = true;
    }

    // 4. grade4-explorer: any grade 4 level completed
    if (levelId && levelId.startsWith('g4-') && !updatedBadges['grade4-explorer']) {
      updatedBadges['grade4-explorer'] = true;
      earnedNew = true;
    }

    // 5. master-all: total 21 stars
    if (totalDone >= 21 && !updatedBadges['master-all']) {
      updatedBadges['master-all'] = true;
      earnedNew = true;
    }

    return { updatedBadges, earnedNew };
  };

  const handleCompleteLevel = (levelId) => {
    const isAlreadyDone = !!progress.completedLevels[levelId];
    const newCompleted = {
      ...progress.completedLevels,
      [levelId]: true
    };

    const newStreak = progress.streak + 1;
    const newStars = Object.values(newCompleted).filter(Boolean).length;
    const coinsReward = isAlreadyDone ? 2 : 10;
    const newCoins = progress.coins + coinsReward;

    const { updatedBadges, earnedNew } = triggerBadgeCheck(newCompleted, newStreak, levelId);

    setProgress(prev => ({
      ...prev,
      completedLevels: newCompleted,
      stars: newStars,
      coins: newCoins,
      streak: newStreak,
      unlockedBadges: updatedBadges,
      newBadge: earnedNew || prev.newBadge
    }));
  };

  const handleDrawAction = () => {
    if (!progress.unlockedBadges['scratch-user']) {
      setProgress(prev => ({
        ...prev,
        unlockedBadges: { ...prev.unlockedBadges, 'scratch-user': true },
        newBadge: true
      }));
    }
  };

  const handleSelectLevel = (topic, level) => {
    setActiveTopic(topic);
    setActiveLevel(level);
    setCurrentView('challenge');
    window.location.hash = `#${level.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGrade = (newGrade) => {
    setCurrentGrade(newGrade);
    handleBackToMap();
  };

  // Grade-specific completed count
  const gradeLevelIds = currentTopics.flatMap(t => t.levels.map(l => l.id));
  const gradeCompletedCount = gradeLevelIds.filter(id => progress.completedLevels[id]).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-amber-200">
      {/* Top Navigation Bar */}
      <Header
        currentGrade={currentGrade}
        onSelectGrade={handleSelectGrade}
        stats={{
          stars: gradeCompletedCount,
          totalStars: progress.stars,
          coins: progress.coins,
          streak: progress.streak,
          newBadge: progress.newBadge
        }}
        onOpenBadges={() => {
          setIsBadgesOpen(true);
          setProgress(p => ({ ...p, newBadge: false }));
        }}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenWiki={() => setIsWikiOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 pt-3.5 sm:pt-6 pb-20 sm:pb-12">
        {currentView === 'map' ? (
          <LevelMap
            grade={currentGrade}
            topics={currentTopics}
            userProgress={progress}
            onSelectLevel={handleSelectLevel}
            onOpenSim={(topic) => setActiveSimTopic(topic)}
            onOpenWiki={() => setIsWikiOpen(true)}
          />
        ) : (
          <ChallengeView
            topic={activeTopic}
            level={activeLevel}
            onBack={handleBackToMap}
            onCompleteLevel={handleCompleteLevel}
            onOpenScratchpad={() => setIsScratchpadOpen(true)}
            isCompleted={!!progress.completedLevels[activeLevel?.id]}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mb-14 sm:mb-0 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">📐 奧數思維訓練</span>
            <span>·</span>
            <span>三年級基礎篇 & 四年級進階篇</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsWikiOpen(true)}
              className="hover:text-slate-900 transition-colors font-semibold text-slate-700"
            >
              🏛️ 奧數知識庫 (IMO)
            </button>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              思維方法指引
            </button>
            <button
              onClick={() => {
                if (window.confirm("確定要重設學習進度嗎？所有完成紀錄將歸零。")) {
                  localStorage.removeItem(STORAGE_KEY);
                  window.location.reload();
                }
              }}
              className="hover:text-rose-600 transition-colors"
            >
              重設學習進度
            </button>
          </div>
        </div>
      </footer>

      {/* Desktop Floating Scratchpad Button */}
      {currentView === 'map' && (
        <button
          onClick={() => {
            sounds.playClick();
            setIsScratchpadOpen(true);
          }}
          className="hidden sm:flex fixed bottom-6 right-6 z-30 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all items-center gap-2 font-bold text-xs active:scale-95"
          title="開啟草稿計算板"
        >
          <span className="text-base">✏️</span>
          <span>草稿計算板</span>
        </button>
      )}

      {/* Mobile-only Bottom Navigation Bar */}
      <BottomNav
        currentView={currentView}
        onNavigateToMap={handleBackToMap}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        onOpenWiki={() => setIsWikiOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenBadges={() => {
          setIsBadgesOpen(true);
          setProgress(p => ({ ...p, newBadge: false }));
        }}
        newBadge={progress.newBadge}
      />

      {/* Modals */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        onDrawAction={handleDrawAction}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        badges={ACHIEVEMENTS}
        unlockedBadges={progress.unlockedBadges}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        defaultGrade={currentGrade}
      />

      <SimModal
        isOpen={!!activeSimTopic}
        onClose={() => setActiveSimTopic(null)}
        topic={activeSimTopic}
      />

      <OlympiadWikiModal
        isOpen={isWikiOpen}
        onClose={() => setIsWikiOpen(false)}
      />
    </div>
  );
}
export default App;
