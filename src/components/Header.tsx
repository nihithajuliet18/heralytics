import React from 'react';
import { Participant } from '../types';
import { isSupabaseConfigured } from '../services/storage';

interface HeaderProps {
  currentParticipant: Participant | null;
  isAdmin: boolean;
  currentView: 'dashboard' | 'case' | 'admin';
  onNavigate: (view: 'dashboard' | 'case' | 'admin') => void;
  onOpenLeaderboard: () => void;
  onOpenHowToPlay: () => void;
  onOpenDatabaseGuide: () => void;
  onLogout: () => void;
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentParticipant,
  isAdmin,
  currentView,
  onNavigate,
  onOpenLeaderboard,
  onOpenHowToPlay,
  onOpenDatabaseGuide,
  onLogout,
  onOpenAdminLogin
}) => {
  const isProdBackend = isSupabaseConfigured();

  return (
    <header className="sticky top-0 z-50 bg-[#161311] border-b border-[#2E2822] px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate(isAdmin ? 'admin' : 'dashboard')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-typewriter text-xl md:text-2xl font-bold tracking-wider text-[#F4EFE6] group-hover:text-[#C59B27] transition-colors whitespace-nowrap shrink-0">
              HERALYTICS
            </span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#8C8275] border-l border-[#352E27] pl-3">
            <span>ACM-W Sathyabama</span>
            <span aria-hidden="true">·</span>
            <span>Case Intelligence</span>
            {!isProdBackend && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#C59B27] font-mono-doc">Local Demo Engine</span>
              </>
            )}
          </div>
        </div>

        {/* Zone 2: 4 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-doc tracking-wide">
          {currentParticipant && (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentView === 'dashboard'
                    ? 'text-[#F4EFE6] font-bold border-b border-[#8B2622] pb-0.5'
                    : 'text-[#A89F91] hover:text-[#F4EFE6]'
                }`}
              >
                Case Files (10)
              </button>
              <button
                onClick={() => onNavigate('case')}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentView === 'case'
                    ? 'text-[#F4EFE6] font-bold border-b border-[#8B2622] pb-0.5'
                    : 'text-[#A89F91] hover:text-[#F4EFE6]'
                }`}
              >
                Active Dossier
              </button>
            </>
          )}

          <button
            onClick={onOpenHowToPlay}
            className="text-[#A89F91] hover:text-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
          >
            How to Play
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="text-[#A89F91] hover:text-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
          >
            Official Standings
          </button>

          <button
            onClick={onOpenDatabaseGuide}
            className="text-[#A89F91] hover:text-[#F4EFE6] transition-colors whitespace-nowrap shrink-0"
          >
            Backend Architecture
          </button>

          {isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'admin'
                  ? 'text-[#E05A47] font-bold border-b border-[#E05A47] pb-0.5'
                  : 'text-[#E05A47] hover:underline'
              }`}
            >
              Control Panel
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {currentParticipant ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:block text-right text-[11px] font-mono-doc">
                <span className="text-[#C4BCB0] block">{currentParticipant.name}</span>
                <span className="text-[#736A5E]">{currentParticipant.registerNumber}</span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-[#2B2520] hover:bg-[#3D342D] border border-[#443B33] text-[#E4DDD3] text-xs font-mono-doc rounded transition-colors whitespace-nowrap shrink-0"
              >
                Sign Out
              </button>
            </div>
          ) : isAdmin ? (
            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-[#8B2622] hover:bg-[#A32F2A] text-white text-xs font-mono-doc rounded transition-colors whitespace-nowrap shrink-0"
            >
              Exit Admin
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminLogin}
                className="px-3 py-1.5 bg-[#24201C] hover:bg-[#332C26] border border-[#3A332B] text-[#A89F91] hover:text-[#E4DDD3] text-xs font-mono-doc rounded transition-colors whitespace-nowrap shrink-0"
              >
                Organizer Desk
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
