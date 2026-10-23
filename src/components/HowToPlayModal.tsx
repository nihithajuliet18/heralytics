import React from 'react';
import { X, BookOpen, Key, CheckCircle, Trophy, HelpCircle, FileSpreadsheet, Lock } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl archival-paper rounded border border-[#C5B7A1] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#EFE9DD] border-b border-[#D5C9B7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#8B2622]" />
            <div>
              <h2 className="font-typewriter text-xl font-bold text-[#1F1B18]">
                HERALYTICS — Detective Field Manual & Rules
              </h2>
              <p className="font-mono-doc text-xs text-[#52493E]">
                Official Player Handbook & Step-by-Step Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#DFD6C7] text-[#52493E] hover:text-[#1F1B18]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono-doc text-xs text-[#2B2520]">
          {/* Step 1: Login */}
          <div className="p-4 bg-[#F8F5EE] border border-[#C5B7A1] rounded space-y-2">
            <h3 className="font-typewriter text-sm font-bold text-[#8B2622] flex items-center gap-1.5">
              <Key className="w-4 h-4" /> 1. How to Log In (From the Start)
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[#38332B] leading-relaxed">
              <li>
                <strong>Username:</strong> Enter your official student <strong>Register / Roll Number</strong> (e.g. <code>39110001</code>).
              </li>
              <li>
                <strong>Password:</strong> Your initial temporary password is your <strong>10-digit registered phone number</strong> (e.g. <code>9840112233</code>).
              </li>
              <li>
                <strong>First-Time Password Change:</strong> On your first login, a prompt will require you to set a personal secure passphrase to protect your docket.
              </li>
            </ul>
          </div>

          {/* Step 2: Dashboard & Progression */}
          <div className="p-4 bg-[#F8F5EE] border border-[#C5B7A1] rounded space-y-2">
            <h3 className="font-typewriter text-sm font-bold text-[#8B2622] flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> 2. Sequential Case Unlocking
            </h3>
            <p className="text-[#38332B] leading-relaxed">
              HERALYTICS features 10 serialized cases. Initially, only <strong>Case 01 — The Midnight Murder</strong> is unsealed. To unlock the next case, you must score at least <strong>70%</strong> on the current case.
            </p>
            <div className="p-2 bg-[#EAE2D3] rounded text-[11px] text-[#474037]">
              Case 01 → Case 02 → Case 03 → ... → Case 10 (Grand Finale).
            </div>
          </div>

          {/* Step 3: Investigating Dossiers & Datasets */}
          <div className="p-4 bg-[#F8F5EE] border border-[#C5B7A1] rounded space-y-2">
            <h3 className="font-typewriter text-sm font-bold text-[#8B2622] flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4" /> 3. Investigating Datasets & Evidence
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[#38332B] leading-relaxed">
              <li><strong>Tab 1 & 2:</strong> Read the Incident Briefing, Timeline, and Suspect Statements.</li>
              <li><strong>Tab 3:</strong> Inspect Physical Evidence items collected by forensics.</li>
              <li>
                <strong>Tab 4 (Datasets):</strong> Search, filter by column, sort timestamps, view frequency charts, or export raw CSV data to analyze in Excel or Python.
              </li>
              <li><strong>Tab 5:</strong> Use the Detective Scratchpad to save working notes and deductions.</li>
            </ul>
          </div>

          {/* Step 4: Answering Questions & Submitting */}
          <div className="p-4 bg-[#F8F5EE] border border-[#C5B7A1] rounded space-y-2">
            <h3 className="font-typewriter text-sm font-bold text-[#8B2622] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> 4. Submitting Your Forensic Findings
            </h3>
            <p className="text-[#38332B] leading-relaxed">
              Go to <strong>Tab 6</strong> to answer the 5 graded questions. You can unlock optional field hints for any question, but each hint deducts a <strong>3-point penalty</strong> from that question.
            </p>
            <p className="text-[#38332B] leading-relaxed">
              When ready, click <strong>"SUBMIT EVIDENCE FINDINGS"</strong>. If your score is 70% or higher, the case is marked <strong>SOLVED</strong> and the next case folder is unsealed!
            </p>
          </div>

          {/* Step 5: Leaderboard */}
          <div className="p-4 bg-[#F8F5EE] border border-[#C5B7A1] rounded space-y-2">
            <h3 className="font-typewriter text-sm font-bold text-[#8B2622] flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> 5. Winning the Competition
            </h3>
            <p className="text-[#38332B] leading-relaxed">
              The winner is determined by the server-authoritative timer:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-[#474037]">
              <li>Detectives who complete all 10 cases rank first.</li>
              <li>Among finishers, the <strong>shortest elapsed time</strong> wins!</li>
              <li>Ties are broken by highest total score, then fewest incorrect submissions.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFE9DD] border-t border-[#D5C9B7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8B2622] hover:bg-[#A32F2A] text-white text-xs font-mono-doc font-bold rounded transition-colors"
          >
            Understood · Start Investigation
          </button>
        </div>
      </div>
    </div>
  );
};
