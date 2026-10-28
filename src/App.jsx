import React, { useState, useEffect } from 'react';
import { TOPICS_BY_GRADE } from './data/topics';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LevelMap } from './components/LevelMap';
import { ChallengeView } from './components/ChallengeView';
import { OlympiadWikiView } from './components/OlympiadWikiView';
import { GuideModal } from './components/GuideModal';
import { SimModal } from './components/SimModal';

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
      streak: 0
    };
  });

  const [currentView, setCurrentView] = useState('map'); // 'map' | 'wiki' | 'challenge'
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  // Modals
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

  // Handle URL hash changes for level direct navigation and wiki page
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'map') {
        setCurrentView('map');
        return;
      }
      if (hash === 'wiki' || hash === 'intro') {
        setCurrentView('wiki');
        return;
      }

      for (const gr of [3, 4, 5, 6]) {
        for (const t of (TOPICS_BY_GRADE[gr] || [])) {
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

  const handleCompleteLevel = (levelId) => {
    const newCompleted = {
      ...progress.completedLevels,
      [levelId]: true
    };

    setProgress(prev => ({
      ...prev,
      completedLevels: newCompleted
    }));
  };

  const handleSelectLevel = (topic, level) => {
    setActiveTopic(topic);
    setActiveLevel(level);
    setCurrentView('challenge');
    window.location.hash = `#${level.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWiki = () => {
    setCurrentView('wiki');
    window.location.hash = '#wiki';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMap = (targetTopicId) => {
    setCurrentView('map');
    window.location.hash = '';

    if (targetTopicId) {
      setTimeout(() => {
        const el = document.getElementById(`topic-card-${targetTopicId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectGrade = (newGrade) => {
    setCurrentGrade(newGrade);
    handleBackToMap();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-amber-200">
      {/* Top Navigation Bar */}
      <Header
        currentGrade={currentView === 'wiki' ? 'wiki' : currentGrade}
        onSelectGrade={handleSelectGrade}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenWiki={handleOpenWiki}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 pt-3.5 sm:pt-6 pb-20 sm:pb-12">
        {currentView === 'wiki' ? (
          <OlympiadWikiView
            onSelectGrade={handleSelectGrade}
          />
        ) : currentView === 'map' ? (
          <LevelMap
            grade={currentGrade}
            topics={currentTopics}
            userProgress={progress}
            onSelectLevel={handleSelectLevel}
            onOpenSim={(topic) => setActiveSimTopic(topic)}
            onOpenWiki={handleOpenWiki}
          />
        ) : (
          <ChallengeView
            gradeTopics={currentTopics}
            topic={activeTopic}
            level={activeLevel}
            onBack={handleBackToMap}
            onCompleteLevel={handleCompleteLevel}
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
              onClick={handleOpenWiki}
              className="hover:text-amber-600 transition-colors font-bold text-amber-700"
            >
              🏛️ 奧數簡介 (IMO 百科)
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

      {/* Mobile-only Bottom Navigation Bar */}
      <BottomNav
        currentView={currentView}
        onNavigateToMap={handleBackToMap}
        onOpenWiki={handleOpenWiki}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Modals */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        defaultGrade={typeof currentGrade === 'number' ? currentGrade : 3}
      />

      <SimModal
        isOpen={!!activeSimTopic}
        onClose={() => setActiveSimTopic(null)}
        topic={activeSimTopic}
      />
    </div>
  );
}
export default App;
