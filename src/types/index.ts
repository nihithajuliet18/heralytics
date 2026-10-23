export interface Participant {
  id: string;
  registerNumber: string;
  name: string;
  phone: string;
  passwordHash: string;
  department: string;
  mustChangePassword: boolean;
  currentCaseIndex: number; // 0 to 9 (0 represents Case 01)
  completedCases: string[]; // List of case IDs solved
  score: number;
  incorrectAttempts: number;
  usedHints: string[]; // Question IDs where hints were unlocked
  startedAt: number;
  finishedAt: number | null;
  elapsedSeconds: number;
  isDisqualified: boolean;
  lastActiveAt: number;
}

export interface Admin {
  id: string;
  username: string;
  role: 'superadmin' | 'investigator_lead';
}

export interface CompetitionConfig {
  status: 'not_started' | 'active' | 'paused' | 'ended';
  leaderboardPublished: boolean;
  passingScorePercentage: number; // default 70
  maxRetryAttempts: number; // default 5
  penaltyPerAttempt: number; // default 5 points deducted from question or case
  hintPenalty: number; // default 3 points
  officialStartTime: number | null;
}

export type QuestionType = 'multiple_choice' | 'text' | 'number';

export interface CaseQuestion {
  id: string;
  caseId: string;
  questionNumber: number;
  prompt: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | number;
  acceptedAlternates?: string[];
  points: number;
  hint: string;
  evidenceRef: string;
  explanation: string;
}

export interface CaseDataset {
  id: string;
  name: string;
  filename: string;
  description: string;
  csvContent: string;
  rowCount: number;
  columns: string[];
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  alibi: string;
  motive: string;
  statement: string;
  isCulprit: boolean;
  status: 'cleared' | 'prime_suspect' | 'person_of_interest';
  badgeNumber?: string;
}

export interface EvidenceItem {
  id: string;
  itemNumber: string;
  label: string;
  description: string;
  foundAt: string;
  significance: string;
  chainOfCustody: string;
}

export interface TimelineEvent {
  time: string;
  event: string;
  source: string;
  flagged?: boolean;
}

export interface CrimeCase {
  id: string;
  caseNumber: number; // 1 to 10
  code: string; // "CASE-01"
  title: string;
  incidentType: string;
  location: string;
  dateOfIncident: string;
  leadInvestigator: string;
  difficulty: 'Beginner' | 'Elementary' | 'Intermediate';
  summary: string;
  incidentDetails: string;
  victimOrEntity: string;
  timeline: TimelineEvent[];
  suspects: Suspect[];
  evidence: EvidenceItem[];
  datasets: CaseDataset[];
  questions: CaseQuestion[];
  passingScore: number;
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  pointsAwarded: number;
  feedback: string;
  correctAnswer?: string | number; // shown after submission if configured
}

export interface Submission {
  id: string;
  participantId: string;
  caseId: string;
  timestamp: number;
  attemptNumber: number;
  answers: Record<string, string | number>;
  scoreEarned: number;
  maxScore: number;
  passed: boolean;
  questionResults: QuestionResult[];
}

export interface AuditLog {
  id: string;
  timestamp: number;
  actor: string;
  action: string;
  details: string;
}

export interface LeaderboardEntry {
  rank: number;
  participantId: string;
  registerNumber: string;
  name: string;
  department: string;
  casesCompleted: number;
  totalScore: number;
  elapsedSeconds: number;
  formattedElapsed: string;
  incorrectAttempts: number;
  isFinished: boolean;
  lastSolvedAt: number | null;
}
