import React, { useState, useEffect } from 'react';
import { Participant, CrimeCase, CompetitionConfig } from './types';
import { storage } from './services/storage';
import { ALL_CASES } from './data/cases';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { CaseDossierView } from './components/CaseDossierView';
import { AdminDashboard } from './components/AdminDashboard';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { DatabaseGuideModal } from './components/DatabaseGuideModal';
import { HowToPlayModal } from './components/HowToPlayModal';

export default function App() {
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'case' | 'admin'>('dashboard');
  const [activeCase, setActiveCase] = useState<CrimeCase>(ALL_CASES[0]);
  const [config, setConfig] = useState<CompetitionConfig>(storage.getConfig());

  // Modal triggers
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [showDatabaseGuide, setShowDatabaseGuide] = useState<boolean>(false);

  // Initialize from persistent storage on load
  useEffect(() => {
    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      setCurrentParticipant(savedUser);
      // Select appropriate active case
      const solvedCount = savedUser.completedCases.length;
      const targetIndex = Math.min(solvedCount, 9);
      setActiveCase(ALL_CASES[targetIndex]);
    }

    const admin = storage.getAdminUser();
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  const handleLoginSuccess = (participant: Participant) => {
    setCurrentParticipant(participant);
    setIsAdmin(false);
    const solvedCount = participant.completedCases.length;
    const targetIndex = Math.min(solvedCount, 9);
    setActiveCase(ALL_CASES[targetIndex]);
    setCurrentView('dashboard');
  };

  const handleAdminAuthSuccess = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    storage.setCurrentUser(null);
    storage.setAdminUser(null);
    setCurrentParticipant(null);
    setIsAdmin(false);
    setCurrentView('dashboard');
  };

  const handleSelectCase = (caseItem: CrimeCase) => {
    setActiveCase(caseItem);
    setCurrentView('case');
  };

  const handleCaseSolved = (nextCase: CrimeCase) => {
    // Refresh participant data
    const refreshed = storage.getCurrentUser();
    if (refreshed) {
      setCurrentParticipant(refreshed);
    }
    setActiveCase(nextCase);
  };

  const handleUpdateConfig = (newConfig: CompetitionConfig) => {
    storage.saveConfig(newConfig);
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-[#12100E] text-[#E6DFD5] flex flex-col font-sans selection:bg-[#8B2622] selection:text-white">
      {/* Top Bar Header */}
      <Header
        currentParticipant={currentParticipant}
        isAdmin={isAdmin}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenHowToPlay={() => setShowHowToPlay(true)}
        onOpenDatabaseGuide={() => setShowDatabaseGuide(true)}
        onLogout={handleLogout}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {!currentParticipant && !isAdmin ? (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            onOpenAdminLogin={() => setShowAdminLogin(true)}
            onOpenDatabaseGuide={() => setShowDatabaseGuide(true)}
          />
        ) : isAdmin && currentView === 'admin' ? (
          <AdminDashboard
            config={config}
            onUpdateConfig={handleUpdateConfig}
            onExitAdmin={() => {
              if (currentParticipant) {
                setCurrentView('dashboard');
              } else {
                handleLogout();
              }
            }}
          />
        ) : currentView === 'case' && currentParticipant ? (
          <CaseDossierView
            crimeCase={activeCase}
            participant={currentParticipant}
            config={config}
            onBackToDashboard={() => {
              const refreshed = storage.getCurrentUser();
              if (refreshed) setCurrentParticipant(refreshed);
              setCurrentView('dashboard');
            }}
            onCaseSolved={handleCaseSolved}
          />
        ) : currentParticipant ? (
          <DashboardView
            participant={currentParticipant}
            config={config}
            onSelectCase={handleSelectCase}
            onOpenLeaderboard={() => setShowLeaderboard(true)}
          />
        ) : null}
      </main>

      {/* Modals */}
      {showLeaderboard && (
        <LeaderboardModal
          config={config}
          currentParticipantId={currentParticipant?.id}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}

      {showAdminLogin && (
        <AdminLoginModal
          onSuccess={handleAdminAuthSuccess}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {showDatabaseGuide && (
        <DatabaseGuideModal onClose={() => setShowDatabaseGuide(false)} />
      )}
    </div>
  );
}
