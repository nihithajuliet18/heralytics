import { Participant, CompetitionConfig, Submission, AuditLog, LeaderboardEntry } from '../types';
import { ALL_CASES } from '../data/cases';

const STORAGE_KEYS = {
  PARTICIPANTS: 'heralytics_participants_v1',
  CURRENT_USER: 'heralytics_current_user_v1',
  ADMIN_USER: 'heralytics_admin_user_v1',
  CONFIG: 'heralytics_competition_config_v1',
  SUBMISSIONS: 'heralytics_submissions_v1',
  AUDIT_LOGS: 'heralytics_audit_logs_v1',
  NOTES: 'heralytics_detective_notes_v1'
};

export const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'part-01',
    registerNumber: '39110001',
    name: 'Aishwarya Rajan',
    phone: '9840112233',
    passwordHash: '9840112233', // initial temp password
    department: 'Computer Science & Engineering',
    mustChangePassword: true,
    currentCaseIndex: 0,
    completedCases: [],
    score: 0,
    incorrectAttempts: 0,
    usedHints: [],
    startedAt: Date.now() - 3600000,
    finishedAt: null,
    elapsedSeconds: 0,
    isDisqualified: false,
    lastActiveAt: Date.now()
  },
  {
    id: 'part-02',
    registerNumber: '39110002',
    name: 'Karthik Sivakumar',
    phone: '9840223344',
    passwordHash: '9840223344',
    department: 'Information Technology',
    mustChangePassword: false,
    currentCaseIndex: 2,
    completedCases: ['case-01', 'case-02'],
    score: 185,
    incorrectAttempts: 1,
    usedHints: ['q-01-2'],
    startedAt: Date.now() - 7200000,
    finishedAt: null,
    elapsedSeconds: 3410,
    isDisqualified: false,
    lastActiveAt: Date.now() - 120000
  },
  {
    id: 'part-03',
    registerNumber: '39110003',
    name: 'Preethi Venkat',
    phone: '9840334455',
    passwordHash: '9840334455',
    department: 'AI & Data Science',
    mustChangePassword: false,
    currentCaseIndex: 4,
    completedCases: ['case-01', 'case-02', 'case-03', 'case-04'],
    score: 390,
    incorrectAttempts: 2,
    usedHints: [],
    startedAt: Date.now() - 10800000,
    finishedAt: null,
    elapsedSeconds: 5820,
    isDisqualified: false,
    lastActiveAt: Date.now() - 300000
  },
  {
    id: 'part-04',
    registerNumber: '39110004',
    name: 'Rahul Madhavan',
    phone: '9840445566',
    passwordHash: '9840445566',
    department: 'Electronics & Communication',
    mustChangePassword: false,
    currentCaseIndex: 10, // Finished all 10!
    completedCases: ALL_CASES.map((c) => c.id),
    score: 965,
    incorrectAttempts: 1,
    usedHints: ['q-05-1'],
    startedAt: Date.now() - 14400000,
    finishedAt: Date.now() - 1800000,
    elapsedSeconds: 8432,
    isDisqualified: false,
    lastActiveAt: Date.now() - 1800000
  }
];

export const INITIAL_CONFIG: CompetitionConfig = {
  status: 'active',
  leaderboardPublished: true,
  passingScorePercentage: 70,
  maxRetryAttempts: 5,
  penaltyPerAttempt: 5,
  hintPenalty: 3,
  officialStartTime: Date.now() - 14400000
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-init-1',
    timestamp: Date.now() - 14400000,
    actor: 'Lead Admin (DG Sengupta)',
    action: 'COMPETITION_START',
    details: 'HERALYTICS official competition opened for registered participants.'
  },
  {
    id: 'log-init-2',
    timestamp: Date.now() - 14000000,
    actor: 'System Admin',
    action: 'ROSTER_SEEDED',
    details: 'Initial detective participant cohort imported with phone credentials.'
  }
];

// Helper to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !import.meta.env.VITE_SUPABASE_URL.includes('your-supabase')
  );
};

// Storage Service Class
class StorageService {
  getParticipants(): Participant[] {
    const data = localStorage.getItem(STORAGE_KEYS.PARTICIPANTS);
    if (!data) {
      this.saveParticipants(INITIAL_PARTICIPANTS);
      return INITIAL_PARTICIPANTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PARTICIPANTS;
    }
  }

  saveParticipants(list: Participant[]): void {
    localStorage.setItem(STORAGE_KEYS.PARTICIPANTS, JSON.stringify(list));
  }

  getParticipantById(id: string): Participant | undefined {
    return this.getParticipants().find((p) => p.id === id);
  }

  getParticipantByRegisterNumber(regNo: string): Participant | undefined {
    const cleaned = regNo.trim().toUpperCase();
    return this.getParticipants().find((p) => p.registerNumber.toUpperCase() === cleaned);
  }

  updateParticipant(participant: Participant): void {
    const list = this.getParticipants();
    const index = list.findIndex((p) => p.id === participant.id);
    if (index >= 0) {
      list[index] = participant;
    } else {
      list.push(participant);
    }
    this.saveParticipants(list);

    // If current logged-in participant, update active session
    const current = this.getCurrentUser();
    if (current && current.id === participant.id) {
      this.setCurrentUser(participant);
    }
  }

  getCurrentUser(): Participant | null {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  setCurrentUser(participant: Participant | null): void {
    if (participant) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(participant));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  getAdminUser(): { id: string; username: string; role: string } | null {
    const data = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  setAdminUser(admin: { id: string; username: string; role: string } | null): void {
    if (admin) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(admin));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    }
  }

  getConfig(): CompetitionConfig {
    const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!data) {
      this.saveConfig(INITIAL_CONFIG);
      return INITIAL_CONFIG;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_CONFIG;
    }
  }

  saveConfig(config: CompetitionConfig): void {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }

  getSubmissions(): Submission[] {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  saveSubmission(submission: Submission): void {
    const list = this.getSubmissions();
    list.unshift(submission);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(list));
  }

  getAuditLogs(): AuditLog[] {
    const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (!data) {
      this.saveAuditLogs(INITIAL_AUDIT_LOGS);
      return INITIAL_AUDIT_LOGS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  }

  addAuditLog(actor: string, action: string, details: string): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: Date.now(),
      actor,
      action,
      details
    };
    logs.unshift(newLog);
    this.saveAuditLogs(logs);
  }

  private saveAuditLogs(logs: AuditLog[]): void {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  }

  getDetectiveNotes(participantId: string, caseId: string): string {
    const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
    return allNotes[`${participantId}_${caseId}`] || '';
  }

  saveDetectiveNotes(participantId: string, caseId: string, notes: string): void {
    const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
    allNotes[`${participantId}_${caseId}`] = notes;
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(allNotes));
  }

  // Generate verified Leaderboard adhering to strict ranking criteria
  getLeaderboard(): LeaderboardEntry[] {
    const participants = this.getParticipants();

    const formatted = participants
      .filter((p) => !p.isDisqualified)
      .map((p) => {
        const isFinished = p.completedCases.length >= 10;
        const elapsed = p.elapsedSeconds || (p.startedAt ? Math.floor((Date.now() - p.startedAt) / 1000) : 0);

        const hours = Math.floor(elapsed / 3600);
        const mins = Math.floor((elapsed % 3600) / 60);
        const secs = elapsed % 60;
        const formattedElapsed = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        return {
          rank: 0,
          participantId: p.id,
          registerNumber: p.registerNumber,
          name: p.name,
          department: p.department,
          casesCompleted: p.completedCases.length,
          totalScore: p.score,
          elapsedSeconds: elapsed,
          formattedElapsed,
          incorrectAttempts: p.incorrectAttempts,
          isFinished,
          lastSolvedAt: p.finishedAt || p.lastActiveAt
        };
      });

    // Strict Tie Policy:
    // 1. Finishers (10 cases) rank above non-finishers
    // 2. Cases completed (descending)
    // 3. Shortest verified elapsed time wins (ascending)
    // 4. Highest total score (descending)
    // 5. Lowest incorrect attempts (ascending)
    formatted.sort((a, b) => {
      if (a.isFinished && !b.isFinished) return -1;
      if (!a.isFinished && b.isFinished) return 1;

      if (a.casesCompleted !== b.casesCompleted) {
        return b.casesCompleted - a.casesCompleted;
      }

      if (a.elapsedSeconds !== b.elapsedSeconds) {
        return a.elapsedSeconds - b.elapsedSeconds;
      }

      if (a.totalScore !== b.totalScore) {
        return b.totalScore - a.totalScore;
      }

      return a.incorrectAttempts - b.incorrectAttempts;
    });

    formatted.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return formatted;
  }
}

export const storage = new StorageService();
