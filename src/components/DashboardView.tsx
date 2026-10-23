import React, { useState, useEffect } from 'react';
import { Participant, CrimeCase, CompetitionConfig } from '../types';
import { ALL_CASES } from '../data/cases';
import { storage } from '../services/storage';
import { Lock, CheckCircle2, Play, Award, Clock, FileText, ChevronRight, ShieldCheck } from 'lucide-react';

interface DashboardViewProps {
  participant: Participant;
  config: CompetitionConfig;
  onSelectCase: (caseItem: CrimeCase) => void;
  onOpenLeaderboard: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  participant,
  config,
  onSelectCase,
  onOpenLeaderboard
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(participant.elapsedSeconds);

  // Live timer tick
  useEffect(() => {
    if (participant.completedCases.length >= 10 || config.status !== 'active') return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const next = prev + 1;
        // Periodically sync elapsed
        if (next % 10 === 0) {
          participant.elapsedSeconds = next;
          storage.updateParticipant({ ...participant, elapsedSeconds: next });
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [participant, config.status]);

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Find user's current active unsolved case
  const activeCaseIndex = Math.min(participant.completedCases.length, 9);
  const activeCase = ALL_CASES[activeCaseIndex];
  const allSolved = participant.completedCases.length >= 10;

  // Compute rank
  const leaderboard = storage.getLeaderboard();
  const currentEntry = leaderboard.find((l) => l.participantId === participant.id);
  const currentRank = currentEntry?.rank || '-';

  return (
    <div className="desk-mat min-h-[calc(100vh-65px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Detective Badge Strip */}
        <div className="archival-paper p-6 sm:p-7 rounded border border-[#C5B7A1] relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono-doc uppercase tracking-widest text-[#736A5E]">
                  Special Case Investigation File
                </span>
                <span className="text-[#8C8275]">·</span>
                <span className="text-[10px] font-mono-doc text-[#8B2622] font-bold">
                  SATHYABAMA ACM-W
                </span>
              </div>
              <h1 className="font-typewriter text-2xl sm:text-3xl font-bold text-[#1F1B18] tracking-tight">
                Detective Dossier: {participant.name}
              </h1>
              <p className="font-mono-doc text-xs text-[#52493E] mt-1">
                Registration No: <span className="font-bold text-[#1F1B18]">{participant.registerNumber}</span> · Department: {participant.department}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 border-t md:border-t-0 md:border-l border-[#D5C9B7] pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-[10px] font-mono-doc uppercase tracking-wider text-[#736A5E] block">
                  Cases Solved
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-typewriter text-2xl font-bold text-[#1F1B18] tabular-nums">
                    {participant.completedCases.length}
                  </span>
                  <span className="font-mono-doc text-xs text-[#736A5E]">/ 10</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-doc uppercase tracking-wider text-[#736A5E] block">
                  Total Score
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-typewriter text-2xl font-bold text-[#8B2622] tabular-nums">
                    {participant.score}
                  </span>
                  <span className="font-mono-doc text-xs text-[#736A5E]">pts</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-doc uppercase tracking-wider text-[#736A5E] block">
                  Investigation Time
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-4 h-4 text-[#736A5E]" />
                  <span className="font-mono-doc text-base font-bold text-[#1F1B18] tabular-nums">
                    {formattedTime}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-doc uppercase tracking-wider text-[#736A5E] block">
                  Leaderboard
                </span>
                <button
                  onClick={onOpenLeaderboard}
                  className="flex items-center gap-1 mt-0.5 text-left group"
                >
                  <Award className="w-4 h-4 text-[#C59B27]" />
                  <span className="font-typewriter text-base font-bold text-[#1F1B18] group-hover:text-[#8B2622] underline">
                    #{currentRank}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Prominent Call to Action */}
          <div className="mt-6 pt-5 border-t border-[#D5C9B7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs font-mono-doc text-[#4A4237]">
              {allSolved ? (
                <span className="text-[#2D5A27] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> ALL 10 CASES FULLY SOLVED! Check final leaderboard ranking.
                </span>
              ) : (
                <span>
                  Current Active Docket: <strong className="text-[#1F1B18]">{activeCase.code} — {activeCase.title}</strong>
                </span>
              )}
            </div>

            {!allSolved && (
              <button
                onClick={() => onSelectCase(activeCase)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#8B2622] hover:bg-[#A32F2A] active:bg-[#721F1B] text-[#FAF6EE] font-mono-doc text-xs font-bold tracking-wider rounded shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>CONTINUE INVESTIGATION →</span>
              </button>
            )}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#2E2822] pb-3">
          <div>
            <h2 className="font-typewriter text-xl font-bold text-[#F4EFE6] tracking-wide">
              Official Crime Dockets
            </h2>
            <p className="font-mono-doc text-xs text-[#8C8275] mt-0.5">
              Strict Sequential Protocol · Solve in succession from Case 01 to Case 10
            </p>
          </div>
          <div className="text-right text-xs font-mono-doc text-[#A89F91]">
            <span>{participant.completedCases.length} Completed</span>
            <span className="mx-2">·</span>
            <span>{10 - participant.completedCases.length} Remaining</span>
          </div>
        </div>

        {/* Ten Physical Case File Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_CASES.map((caseItem, index) => {
            const isCompleted = participant.completedCases.includes(caseItem.id);
            const isUnlocked = index <= participant.completedCases.length;
            const isCurrent = index === participant.completedCases.length;

            return (
              <div
                key={caseItem.id}
                onClick={() => isUnlocked && onSelectCase(caseItem)}
                className={`group relative rounded border transition-all ${
                  isUnlocked
                    ? 'archival-paper border-[#C2B5A0] hover:border-[#8B2622] hover:shadow-2xl cursor-pointer transform hover:-translate-y-1'
                    : 'bg-[#181513] border-[#2C2723] opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Physical Manila Folder Tab */}
                <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-[#CFC3B0]/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-doc text-xs font-bold uppercase tracking-wider text-[#52493E]">
                      {caseItem.code}
                    </span>
                    <span className="text-[11px] font-mono-doc text-[#736A5E]">
                      · Level: {caseItem.difficulty}
                    </span>
                  </div>

                  {/* Stamp or Lock */}
                  {isCompleted ? (
                    <div className="vintage-stamp stamp-green text-[9px] py-0.5 px-1.5 rotate-[-2deg]">
                      SOLVED
                    </div>
                  ) : isUnlocked ? (
                    <div className="vintage-stamp stamp-red text-[9px] py-0.5 px-1.5 rotate-[2deg]">
                      OPEN FILE
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] font-mono-doc text-[#6E6458]">
                      <Lock className="w-3 h-3" />
                      <span>LOCKED</span>
                    </div>
                  )}
                </div>

                {/* Folder Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3
                      className={`font-serif-vintage text-lg font-bold transition-colors ${
                        isUnlocked ? 'text-[#1F1B18] group-hover:text-[#8B2622]' : 'text-[#6E6458]'
                      }`}
                    >
                      {caseItem.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        isUnlocked ? 'text-[#4A4237]' : 'text-[#5A5145]'
                      }`}
                    >
                      {caseItem.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D5C9B7]/60 flex items-center justify-between text-[11px] font-mono-doc">
                    <span className={isUnlocked ? 'text-[#63594D]' : 'text-[#474037]'}>
                      Datasets: {caseItem.datasets.length} · Questions: {caseItem.questions.length}
                    </span>

                    {isUnlocked && (
                      <span className="text-[#8B2622] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Current Active Indicator */}
                {isCurrent && (
                  <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
                    <div className="w-3 h-3 bg-[#8B2622] rounded-full border-2 border-white shadow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
