import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { LeaderboardEntry, CompetitionConfig } from '../types';
import { Award, Clock, X, Trophy, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LeaderboardModalProps {
  config: CompetitionConfig;
  currentParticipantId?: string;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  config,
  currentParticipantId,
  onClose
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(storage.getLeaderboard());
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl archival-paper rounded border border-[#C5B7A1] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#EFE9DD] border-b border-[#D5C9B7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#C59B27]" />
            <div>
              <h2 className="font-typewriter text-xl font-bold text-[#1F1B18]">
                HERALYTICS — Official Investigation Standings
              </h2>
              <p className="font-mono-doc text-xs text-[#5A5145]">
                {config.leaderboardPublished
                  ? 'Official Certified Leaderboard · Server Authoritative'
                  : 'Provisional Standings (Awaiting Final Administrator Certification)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#DFD6C7] text-[#52493E] hover:text-[#1F1B18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tie-breaker Rules strip */}
        <div className="px-5 py-2.5 bg-[#FAF7F0] border-b border-[#E5DEC0] text-[11px] font-mono-doc text-[#6E6354] flex flex-wrap gap-x-4 gap-y-1">
          <strong className="text-[#1F1B18]">Ranking Hierarchy:</strong>
          <span>1. Finishers (10/10)</span>
          <span>→</span>
          <span>2. Cases Solved</span>
          <span>→</span>
          <span>3. Verified Elapsed Time</span>
          <span>→</span>
          <span>4. Total Score</span>
          <span>→</span>
          <span>5. Lowest Errors</span>
        </div>

        {/* Standings Table */}
        <div className="flex-1 overflow-y-auto p-5">
          <table className="w-full text-xs font-mono-doc border-collapse">
            <thead className="bg-[#24201C] text-[#C4BCB0] uppercase sticky top-0 border-b border-[#3A332B]">
              <tr>
                <th className="py-2.5 px-3 text-center w-12">Rank</th>
                <th className="py-2.5 px-3 text-left">Detective / Student</th>
                <th className="py-2.5 px-3 text-left">Department</th>
                <th className="py-2.5 px-3 text-center">Cases Cleared</th>
                <th className="py-2.5 px-3 text-right">Elapsed Time</th>
                <th className="py-2.5 px-3 text-right">Score</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D5C9B7]">
              {entries.map((entry) => {
                const isCurrent = entry.participantId === currentParticipantId;
                const isFirst = entry.rank === 1;

                return (
                  <tr
                    key={entry.participantId}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-[#EFE4CF] font-bold text-[#1F1B18]'
                        : isFirst
                        ? 'bg-[#FBF8EB] text-[#1F1B18]'
                        : 'odd:bg-[#FAF7F0] even:bg-[#F3EDE1] text-[#2B2520]'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center">
                      {isFirst ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C59B27] text-white font-bold text-xs">
                          1
                        </span>
                      ) : (
                        <span className="text-[#63594D]">#{entry.rank}</span>
                      )}
                    </td>

                    <td className="py-2.5 px-3">
                      <div>
                        <span className="font-bold block text-[#1F1B18]">{entry.name}</span>
                        <span className="text-[10px] text-[#736A5E]">{entry.registerNumber}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-[#52493E]">{entry.department}</td>

                    <td className="py-2.5 px-3 text-center font-bold">
                      <span className="tabular-nums">{entry.casesCompleted}</span> / 10
                    </td>

                    <td className="py-2.5 px-3 text-right tabular-nums text-[#38332B] font-semibold">
                      {entry.formattedElapsed}
                    </td>

                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-[#8B2622]">
                      {entry.totalScore} pts
                    </td>

                    <td className="py-2.5 px-3 text-center">
                      {entry.isFinished ? (
                        <span className="text-[10px] font-bold text-[#2D5A27] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> SOLVED ALL 10
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#736A5E]">
                          Case {entry.casesCompleted + 1} In Progress
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFE9DD] border-t border-[#D5C9B7] flex justify-between items-center text-xs font-mono-doc">
          <span className="text-[#52493E]">
            Verified by ACM-W Sathyabama Evaluation Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1F1B18] hover:bg-[#332C26] text-white rounded transition-colors"
          >
            Close Standings
          </button>
        </div>
      </div>
    </div>
  );
};
