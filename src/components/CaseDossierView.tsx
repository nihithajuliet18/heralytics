import React, { useState, useEffect } from 'react';
import { CrimeCase, Participant, CompetitionConfig, Submission } from '../types';
import { storage } from '../services/storage';
import { gradeCaseSubmission } from '../services/evaluator';
import { DatasetExplorer } from './DatasetExplorer';
import { ALL_CASES } from '../data/cases';
import {
  FileText,
  Users,
  Search,
  Database,
  Edit3,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Send,
  Eye,
  Lock
} from 'lucide-react';

interface CaseDossierViewProps {
  crimeCase: CrimeCase;
  participant: Participant;
  config: CompetitionConfig;
  onBackToDashboard: () => void;
  onCaseSolved: (nextCase: CrimeCase) => void;
}

export const CaseDossierView: React.FC<CaseDossierViewProps> = ({
  crimeCase,
  participant,
  config,
  onBackToDashboard,
  onCaseSolved
}) => {
  const [activeTab, setActiveTab] = useState<'briefing' | 'suspects' | 'evidence' | 'datasets' | 'notes' | 'submission'>('briefing');
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState<number>(0);
  const [detectiveNotes, setDetectiveNotes] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [unlockedHints, setUnlockedHints] = useState<string[]>(participant.usedHints || []);
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [attemptsUsed, setAttemptsUsed] = useState<number>(0);

  const isCaseSolved = participant.completedCases.includes(crimeCase.id);

  // Load detective notes & previous submissions on mount
  useEffect(() => {
    const savedNotes = storage.getDetectiveNotes(participant.id, crimeCase.id);
    setDetectiveNotes(savedNotes);

    const subs = storage.getSubmissions().filter((s) => s.participantId === participant.id && s.caseId === crimeCase.id);
    setAttemptsUsed(subs.length);
    if (subs.length > 0) {
      setLastSubmission(subs[0]);
      setAnswers(subs[0].answers);
    }
  }, [participant.id, crimeCase.id]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDetectiveNotes(val);
    storage.saveDetectiveNotes(participant.id, crimeCase.id, val);
  };

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleUnlockHint = (questionId: string) => {
    if (!unlockedHints.includes(questionId)) {
      const nextHints = [...unlockedHints, questionId];
      setUnlockedHints(nextHints);

      // Update participant record
      const updatedParticipant: Participant = {
        ...participant,
        usedHints: nextHints
      };
      storage.updateParticipant(updatedParticipant);
      storage.addAuditLog(participant.name, 'HINT_ACCESSED', `Unlocked hint for question ${questionId} in ${crimeCase.code}`);
    }
  };

  const handleSubmitFindings = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCaseSolved) return;

    if (attemptsUsed >= config.maxRetryAttempts) {
      alert(`Maximum retry attempts (${config.maxRetryAttempts}) reached for this case. Contact organizer desk.`);
      return;
    }

    setIsSubmitting(true);

    const submission = gradeCaseSubmission(
      participant.id,
      crimeCase.id,
      crimeCase.questions,
      answers,
      attemptsUsed + 1,
      unlockedHints,
      config.passingScorePercentage,
      config.hintPenalty
    );

    storage.saveSubmission(submission);
    setLastSubmission(submission);
    setAttemptsUsed((prev) => prev + 1);

    if (submission.passed) {
      const isNewCompletion = !participant.completedCases.includes(crimeCase.id);
      const newCompleted = isNewCompletion ? [...participant.completedCases, crimeCase.id] : participant.completedCases;
      const newScore = participant.score + submission.scoreEarned;
      const isFinished = newCompleted.length >= 10;

      const updatedParticipant: Participant = {
        ...participant,
        completedCases: newCompleted,
        currentCaseIndex: Math.min(newCompleted.length, 9),
        score: newScore,
        finishedAt: isFinished ? Date.now() : null,
        lastActiveAt: Date.now()
      };

      storage.updateParticipant(updatedParticipant);
      storage.addAuditLog(participant.name, 'CASE_SOLVED', `Successfully cleared ${crimeCase.code} with score ${submission.scoreEarned}/${submission.maxScore}`);
    } else {
      const updatedParticipant: Participant = {
        ...participant,
        incorrectAttempts: participant.incorrectAttempts + 1,
        lastActiveAt: Date.now()
      };
      storage.updateParticipant(updatedParticipant);
      storage.addAuditLog(participant.name, 'SUBMISSION_FAILED', `Attempt ${attemptsUsed + 1} failed for ${crimeCase.code} (${submission.scoreEarned}/${submission.maxScore})`);
    }

    setIsSubmitting(false);
  };

  const currentDataset = crimeCase.datasets[selectedDatasetIndex] || crimeCase.datasets[0];

  // Next case in line
  const nextCaseIndex = crimeCase.caseNumber; // 1-indexed next
  const nextCase = nextCaseIndex < ALL_CASES.length ? ALL_CASES[nextCaseIndex] : null;

  return (
    <div className="desk-mat min-h-[calc(100vh-65px)] py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back and Breadcrumb Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-xs font-mono-doc text-[#A89F91] hover:text-[#F4EFE6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Investigation Desk</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-mono-doc">
            <span className="text-[#8C8275]">Difficulty: {crimeCase.difficulty}</span>
            <span className="text-[#474037]">·</span>
            <span className="text-[#8B2622] font-bold">{crimeCase.code}</span>
          </div>
        </div>

        {/* Master Physical Folder Outer Wrapper */}
        <div className="archival-paper rounded-lg border border-[#C5B7A1] shadow-2xl relative overflow-hidden">
          {/* Top Dossier Manila Header */}
          <div className="p-6 sm:p-8 border-b border-[#D5C9B7] bg-[#EFE9DD]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono-doc uppercase tracking-widest text-[#736A5E] font-bold">
                    Official Incident File // {crimeCase.code}
                  </span>
                  <span className="text-[#8C8275]">·</span>
                  <span className="text-[11px] font-mono-doc text-[#6E6354]">
                    Lead: {crimeCase.leadInvestigator}
                  </span>
                </div>
                <h1 className="font-typewriter text-2xl sm:text-4xl font-bold text-[#1F1B18] tracking-tight">
                  {crimeCase.title}
                </h1>
                <p className="font-mono-doc text-xs text-[#52493E] mt-2 max-w-3xl">
                  {crimeCase.incidentType} · Location: {crimeCase.location} · Timestamp: {crimeCase.dateOfIncident}
                </p>
              </div>

              {/* Rubber Stamps */}
              <div className="shrink-0 flex items-center gap-3">
                {isCaseSolved ? (
                  <div className="vintage-stamp stamp-green text-sm rotate-[-3deg]">
                    SOLVED & CLOSED
                  </div>
                ) : (
                  <div className="vintage-stamp stamp-red text-sm rotate-[3deg]">
                    UNSOLVED DOSSIER
                  </div>
                )}
              </div>
            </div>

            {/* Folder Navigation Tabs */}
            <div className="mt-6 pt-4 border-t border-[#D5C9B7] flex flex-wrap gap-2 text-xs font-mono-doc">
              <button
                onClick={() => setActiveTab('briefing')}
                className={`px-3.5 py-2 rounded font-bold transition-all whitespace-nowrap ${
                  activeTab === 'briefing'
                    ? 'bg-[#1F1B18] text-[#F4EFE6] shadow'
                    : 'bg-[#DFD6C7] text-[#4A4237] hover:bg-[#D4CABC]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 inline mr-1.5" /> 1. Incident Briefing
              </button>

              <button
                onClick={() => setActiveTab('suspects')}
                className={`px-3.5 py-2 rounded font-bold transition-all whitespace-nowrap ${
                  activeTab === 'suspects'
                    ? 'bg-[#1F1B18] text-[#F4EFE6] shadow'
                    : 'bg-[#DFD6C7] text-[#4A4237] hover:bg-[#D4CABC]'
                }`}
              >
                <Users className="w-3.5 h-3.5 inline mr-1.5" /> 2. Suspect Dossiers ({crimeCase.suspects.length})
              </button>

              <button
                onClick={() => setActiveTab('evidence')}
                className={`px-3.5 py-2 rounded font-bold transition-all whitespace-nowrap ${
                  activeTab === 'evidence'
                    ? 'bg-[#1F1B18] text-[#F4EFE6] shadow'
                    : 'bg-[#DFD6C7] text-[#4A4237] hover:bg-[#D4CABC]'
                }`}
              >
                <Search className="w-3.5 h-3.5 inline mr-1.5" /> 3. Physical Evidence ({crimeCase.evidence.length})
              </button>

              <button
                onClick={() => setActiveTab('datasets')}
                className={`px-3.5 py-2 rounded font-bold transition-all whitespace-nowrap ${
                  activeTab === 'datasets'
                    ? 'bg-[#1F1B18] text-[#F4EFE6] shadow'
                    : 'bg-[#DFD6C7] text-[#4A4237] hover:bg-[#D4CABC]'
                }`}
              >
                <Database className="w-3.5 h-3.5 inline mr-1.5" /> 4. Datasets & Logs ({crimeCase.datasets.length})
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3.5 py-2 rounded font-bold transition-all whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'bg-[#1F1B18] text-[#F4EFE6] shadow'
                    : 'bg-[#DFD6C7] text-[#4A4237] hover:bg-[#D4CABC]'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 inline mr-1.5" /> 5. Detective Notes
              </button>

              <button
                onClick={() => setActiveTab('submission')}
                className={`px-3.5 py-2 rounded font-bold transition-all whitespace-nowrap ${
                  activeTab === 'submission'
                    ? 'bg-[#8B2622] text-[#FAF6EE] shadow'
                    : 'bg-[#DFD6C7] text-[#8B2622] hover:bg-[#D4CABC]'
                }`}
              >
                <Send className="w-3.5 h-3.5 inline mr-1.5" /> 6. Findings & Questions ({crimeCase.questions.length})
              </button>
            </div>
          </div>

          {/* Dossier Body Content */}
          <div className="p-6 sm:p-8">
            {/* Tab 1: Briefing & Incident Details */}
            {activeTab === 'briefing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-typewriter text-xl font-bold text-[#1F1B18] mb-2">
                    Executive Crime Summary
                  </h3>
                  <p className="font-mono-doc text-sm text-[#38332B] leading-relaxed">
                    {crimeCase.summary}
                  </p>
                </div>

                <div className="p-4 bg-[#EBE4D6] border border-[#CFC3B0] rounded">
                  <h4 className="font-mono-doc text-xs uppercase font-bold text-[#736A5E] tracking-wider mb-1">
                    Victim / Compromised Entity
                  </h4>
                  <p className="font-mono-doc text-sm text-[#1F1B18] font-semibold">
                    {crimeCase.victimOrEntity}
                  </p>
                </div>

                <div>
                  <h3 className="font-typewriter text-lg font-bold text-[#1F1B18] mb-2">
                    Detailed Incident Narrative
                  </h3>
                  <div className="font-mono-doc text-xs text-[#38332B] leading-relaxed bg-[#F8F4EC] p-4 rounded border border-[#DFD6C7]">
                    {crimeCase.incidentDetails}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-typewriter text-lg font-bold text-[#1F1B18] mb-3">
                    Chronological Reconstruction Timeline
                  </h3>
                  <div className="border-l-2 border-[#8B2622] pl-4 space-y-4 font-mono-doc text-xs">
                    {crimeCase.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#8B2622]" />
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#8B2622]">{item.time}</span>
                          <span className="text-[11px] text-[#736A5E]">[{item.source}]</span>
                        </div>
                        <p className="text-[#2B2520] mt-0.5">{item.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Suspects Lineup */}
            {activeTab === 'suspects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#D5C9B7] pb-2">
                  <h3 className="font-typewriter text-xl font-bold text-[#1F1B18]">
                    Persons of Interest & Suspect Dossiers
                  </h3>
                  <span className="font-mono-doc text-xs text-[#736A5E]">
                    {crimeCase.suspects.length} Recorded Profiles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {crimeCase.suspects.map((suspect, idx) => (
                    <div
                      key={suspect.id}
                      className="bg-[#F8F5EE] border border-[#C5B7A1] rounded p-4 relative shadow space-y-3"
                    >
                      {/* Monochrome Mugshot Polaroid Container */}
                      <div className="w-full h-44 bg-[#231F1C] rounded border border-[#8C8275] flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                        <div className="w-16 h-16 rounded-full border-2 border-[#52493E] bg-[#161311] flex items-center justify-center text-[#A89F91] font-mono-doc text-xl font-bold mb-2">
                          {suspect.name.charAt(0)}
                        </div>
                        <span className="font-typewriter text-xs font-bold text-[#E4DDD3]">
                          {suspect.name}
                        </span>
                        <span className="text-[10px] font-mono-doc text-[#A89F91] mt-0.5">
                          {suspect.badgeNumber || `SUSP-${idx + 1}`}
                        </span>

                        {/* Status watermark */}
                        <div className="absolute bottom-1 right-2">
                          <span className="text-[9px] font-mono-doc text-[#8B2622] uppercase tracking-widest font-bold">
                            {suspect.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono-doc tracking-wider text-[#736A5E] block font-bold">
                          Role & Position
                        </span>
                        <p className="font-mono-doc text-xs text-[#1F1B18] font-bold">
                          {suspect.role}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono-doc tracking-wider text-[#736A5E] block font-bold">
                          Claimed Alibi
                        </span>
                        <p className="font-mono-doc text-xs text-[#4A4237]">
                          {suspect.alibi}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono-doc tracking-wider text-[#736A5E] block font-bold">
                          Suspected Motive
                        </span>
                        <p className="font-mono-doc text-xs text-[#8B2622]">
                          {suspect.motive}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#DFD6C7]">
                        <span className="text-[10px] uppercase font-mono-doc tracking-wider text-[#736A5E] block font-bold">
                          Interrogation Statement
                        </span>
                        <p className="font-mono-doc text-xs italic text-[#38332B] mt-0.5">
                          "{suspect.statement}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Physical Evidence Locker */}
            {activeTab === 'evidence' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#D5C9B7] pb-2">
                  <h3 className="font-typewriter text-xl font-bold text-[#1F1B18]">
                    Physical Forensic Evidence Locker
                  </h3>
                  <span className="font-mono-doc text-xs text-[#736A5E]">
                    Secured by Forensic Triage Team
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {crimeCase.evidence.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F8F5EE] border border-[#C5B7A1] rounded p-5 relative shadow space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#DFD6C7] pb-2">
                        <span className="font-mono-doc text-xs font-bold text-[#8B2622]">
                          EVIDENCE TAG: {item.itemNumber}
                        </span>
                        <span className="text-[10px] font-mono-doc text-[#736A5E]">
                          SEAL VERIFIED
                        </span>
                      </div>

                      <h4 className="font-serif-vintage text-base font-bold text-[#1F1B18]">
                        {item.label}
                      </h4>

                      <p className="font-mono-doc text-xs text-[#38332B] leading-relaxed">
                        {item.description}
                      </p>

                      <div className="p-2.5 bg-[#EFE9DD] rounded border border-[#DFD6C7] space-y-1 text-xs font-mono-doc">
                        <div>
                          <strong className="text-[#52493E]">Recovered Location:</strong> {item.foundAt}
                        </div>
                        <div>
                          <strong className="text-[#52493E]">Forensic Value:</strong> {item.significance}
                        </div>
                        <div>
                          <strong className="text-[#52493E]">Custody:</strong> {item.chainOfCustody}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Datasets Explorer */}
            {activeTab === 'datasets' && (
              <div className="space-y-4">
                {crimeCase.datasets.length > 1 && (
                  <div className="flex items-center gap-2 p-1.5 bg-[#E4DDD3] rounded border border-[#C2B5A0] overflow-x-auto">
                    {crimeCase.datasets.map((ds, idx) => (
                      <button
                        key={ds.id}
                        onClick={() => setSelectedDatasetIndex(idx)}
                        className={`px-3 py-1.5 text-xs font-mono-doc rounded transition-colors whitespace-nowrap ${
                          selectedDatasetIndex === idx
                            ? 'bg-[#1F1B18] text-white font-bold'
                            : 'text-[#4A4237] hover:bg-[#D4CABC]'
                        }`}
                      >
                        Dataset {idx + 1}: {ds.filename}
                      </button>
                    ))}
                  </div>
                )}

                <DatasetExplorer dataset={currentDataset} />
              </div>
            )}

            {/* Tab 5: Detective Scratchpad */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-typewriter text-xl font-bold text-[#1F1B18]">
                    Detective Scratchpad & Correlation Board
                  </h3>
                  <span className="text-xs font-mono-doc text-[#736A5E]">
                    Autosaved locally to detective file
                  </span>
                </div>
                <textarea
                  value={detectiveNotes}
                  onChange={handleNotesChange}
                  rows={14}
                  placeholder="Record your working deductions, suspect timestamps, log anomalies, and hypothesis here..."
                  className="w-full bg-[#FAF7F0] border-2 border-[#C2B5A0] rounded p-4 font-mono-doc text-xs text-[#1F1B18] placeholder-[#9E9280] focus:outline-none focus:border-[#8B2622] shadow-inner"
                />
              </div>
            )}

            {/* Tab 6: Forensic Findings & Questions Submission */}
            {activeTab === 'submission' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#D5C9B7] pb-3">
                  <div>
                    <h3 className="font-typewriter text-xl font-bold text-[#1F1B18]">
                      Case Conclusion & Graded Forensic Questions
                    </h3>
                    <p className="font-mono-doc text-xs text-[#52493E]">
                      Pass Threshold: {config.passingScorePercentage}% · Max Attempts: {config.maxRetryAttempts} (Used: {attemptsUsed})
                    </p>
                  </div>

                  {isCaseSolved && (
                    <div className="vintage-stamp stamp-green text-xs">
                      PASSED & UNLOCKED
                    </div>
                  )}
                </div>

                {/* Score Alert Banner if previous attempt exists */}
                {lastSubmission && (
                  <div
                    className={`p-4 rounded border text-xs font-mono-doc ${
                      lastSubmission.passed
                        ? 'bg-[#EBF5E9] border-[#7DB377] text-[#22551D]'
                        : 'bg-[#FBEBEA] border-[#D97D78] text-[#8B2622]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>
                        {lastSubmission.passed
                          ? '✓ CASE CLEARED: Formal Findings Corroborated'
                          : '✗ SUBMISSION REJECTED: Evidence Discrepancies Found'}
                      </span>
                      <span>
                        Score: {lastSubmission.scoreEarned} / {lastSubmission.maxScore} (
                        {Math.round((lastSubmission.scoreEarned / lastSubmission.maxScore) * 100)}%)
                      </span>
                    </div>
                    <p>
                      {lastSubmission.passed
                        ? 'Your evidence analysis satisfies all passing thresholds. The next classified docket has been unsealed.'
                        : `Your accuracy did not meet the required ${config.passingScorePercentage}% threshold. Inspect datasets and adjust deductions.`}
                    </p>
                  </div>
                )}

                {/* Question Items Form */}
                <form onSubmit={handleSubmitFindings} className="space-y-6">
                  {crimeCase.questions.map((q, idx) => {
                    const isHintOpen = unlockedHints.includes(q.id);
                    const qResult = lastSubmission?.questionResults.find((r) => r.questionId === q.id);

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded border bg-[#F8F5EE] transition-colors ${
                          qResult
                            ? qResult.isCorrect
                              ? 'border-[#7DB377]'
                              : 'border-[#D97D78]'
                            : 'border-[#C5B7A1]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono-doc text-xs font-bold px-2 py-0.5 bg-[#DFD6C7] rounded text-[#1F1B18]">
                              Q{idx + 1}
                            </span>
                            <span className="text-[11px] font-mono-doc text-[#736A5E]">
                              [{q.points} Points]
                            </span>
                          </div>

                          {qResult && (
                            <span
                              className={`text-xs font-mono-doc font-bold ${
                                qResult.isCorrect ? 'text-[#2D5A27]' : 'text-[#8B2622]'
                              }`}
                            >
                              {qResult.isCorrect ? `+${qResult.pointsAwarded} pts` : '0 pts'}
                            </span>
                          )}
                        </div>

                        <p className="font-mono-doc text-xs sm:text-sm font-bold text-[#1F1B18] mb-3">
                          {q.prompt}
                        </p>

                        {/* Input Handling */}
                        <div className="mt-2">
                          {q.type === 'multiple_choice' && q.options ? (
                            <div className="space-y-2">
                              {q.options.map((opt) => (
                                <label
                                  key={opt}
                                  className={`flex items-center gap-2.5 p-2 rounded border cursor-pointer font-mono-doc text-xs transition-colors ${
                                    answers[q.id] === opt
                                      ? 'bg-[#EAE2D3] border-[#8B2622] font-bold text-[#1F1B18]'
                                      : 'bg-[#FAF7F0] border-[#D4CABC] hover:bg-[#F2ECE0] text-[#38332B]'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={answers[q.id] === opt}
                                    onChange={() => handleAnswerChange(q.id, opt)}
                                    disabled={isCaseSolved}
                                    className="accent-[#8B2622]"
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <input
                              type={q.type === 'number' ? 'number' : 'text'}
                              value={answers[q.id] ?? ''}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              disabled={isCaseSolved}
                              placeholder={q.type === 'number' ? 'Enter exact numeric finding...' : 'Enter case finding / name / ID...'}
                              className="w-full bg-[#FAF7F0] border border-[#BFB29E] rounded px-3 py-2 font-mono-doc text-xs sm:text-sm text-[#1F1B18] focus:outline-none focus:border-[#8B2622]"
                            />
                          )}
                        </div>

                        {/* Question Feedback if submitted */}
                        {qResult && (
                          <div className="mt-2 text-xs font-mono-doc text-[#52493E] bg-[#EFE9DD] p-2 rounded">
                            <strong>Audit Feedback:</strong> {qResult.feedback}
                          </div>
                        )}

                        {/* Hint System */}
                        <div className="mt-3 pt-2 border-t border-[#DFD6C7] flex items-center justify-between text-[11px] font-mono-doc">
                          {!isHintOpen ? (
                            <button
                              type="button"
                              onClick={() => handleUnlockHint(q.id)}
                              className="text-[#8B2622] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>Inspect Field Hint (-{config.hintPenalty} pts penalty)</span>
                            </button>
                          ) : (
                            <div className="text-[#6E6354] bg-[#FAF3E6] p-2 rounded border border-[#E0D3BC] w-full">
                              <span className="font-bold text-[#8B2622] block mb-0.5">Forensic Field Clue:</span>
                              {q.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Submission Action Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs font-mono-doc text-[#736A5E]">
                      All findings are verified against server-side audit logs.
                    </span>

                    {!isCaseSolved ? (
                      <button
                        type="submit"
                        disabled={isSubmitting || attemptsUsed >= config.maxRetryAttempts}
                        className="w-full sm:w-auto px-6 py-3 bg-[#8B2622] hover:bg-[#A32F2A] active:bg-[#721F1B] text-[#FAF6EE] font-mono-doc text-xs font-bold tracking-wider rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>SUBMIT EVIDENCE FINDINGS</span>
                      </button>
                    ) : nextCase ? (
                      <button
                        type="button"
                        onClick={() => onCaseSolved(nextCase)}
                        className="w-full sm:w-auto px-6 py-3 bg-[#2D5A27] hover:bg-[#386F30] text-[#FAF6EE] font-mono-doc text-xs font-bold tracking-wider rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>PROCEED TO NEXT CASE: {nextCase.code}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="text-xs font-mono-doc text-[#2D5A27] font-bold">
                        ALL 10 CASES SOLVED! Check Official Standings.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
