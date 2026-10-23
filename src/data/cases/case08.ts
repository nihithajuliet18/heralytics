import { CrimeCase } from '../../types';

export const case08: CrimeCase = {
  id: 'case-08',
  caseNumber: 8,
  code: 'CASE-08',
  title: 'The Leaked Examination',
  incidentType: 'Academic Integrity Breach / Confidential Document Espionage',
  location: 'Office of the Controller of Examinations (COE), High-Security Vault Room 102',
  dateOfIncident: 'October 21, 2026 — 21:10 IST',
  leadInvestigator: 'Dean of Academic Audit Prof. S. Venkataraman & Cyber Forensic Team',
  difficulty: 'Intermediate',
  summary:
    'Hours before the high-stakes Semester V "Advanced Distributed Systems & Blockchain" final examination, a circulating PDF matching the exact question order surfaced on an invite-only Telegram channel. Forensic metadata extracted from the circulating image reveals an invisible steganographic watermark encoded with printer serial PRN-COE-02.',
  incidentDetails:
    'The examination manuscript (DOCX ID EXAM-CS801-FINAL) was finalized at 17:00 IST on October 21 by Controller Dr. Rajeshwari and stored on an air-gapped network drive. Only three senior professors and one confidential documentation officer possessed decryption keys. At 23:30 IST, a student anonymous tip provided screenshots of Page 3 of the examination. The leaked screenshot displays microscopic yellow tracking dot patterns (Machine Identification Codes) identifying the exact laser printer, print job serial, and timestamp.',
  victimOrEntity: 'Office of the Controller of Examinations, Sathyabama University',
  timeline: [
    { time: '17:00 IST', event: 'Master exam document finalized and digitally signed by Controller Dr. Rajeshwari.', source: 'Doc Revision Log' },
    { time: '18:15 IST', event: 'Paper set printed in 3 official proof copies on secure printer PRN-COE-01.', source: 'Print Spooler' },
    { time: '20:45 IST', event: 'COE staff departs office; building exterior secured by biometric lock.', source: 'Access System' },
    { time: '21:08 IST', event: 'Confidential printer PRN-COE-02 receives an unqueued print job from terminal IP 10.14.8.44.', source: 'CUPS Server' },
    { time: '21:12 IST', event: 'Single copy of 8-page document printed and purged from spooler queue.', source: 'CUPS Server' },
    { time: '23:30 IST', event: 'Anonymous whistleblower emails screenshots of Question 4 (Byzantine Fault Tolerance) to Provost.', source: 'Whistleblower Email' }
  ],
  suspects: [
    {
      id: 'susp-08-1',
      name: 'Dr. Rajeshwari Swaminathan',
      role: 'Controller of Examinations',
      alibi: 'Attending Academic Council dinner at Vice Chancellor residence until 22:30.',
      motive: 'None; 28-year unblemished record.',
      statement: 'I personally locked the manuscript safe at 17:30. Nobody has the master USB key except me and my deputy.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'FAC-COE-01'
    },
    {
      id: 'susp-08-2',
      name: 'Girish Chandrasekhar',
      role: 'Confidential Printing Superintendent',
      alibi: 'Claims he left campus at 19:30 and took the local train to Tambaram.',
      motive: 'Extensive private coaching institute investment; promised ₹8,00,000 by tutoring cartel.',
      statement: 'I shut down PRN-COE-01 before I left. I never touched PRN-COE-02 in the back archive room.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'STAFF-COE-08'
    },
    {
      id: 'susp-08-3',
      name: 'Prof. Arvind Menon',
      role: 'Course Coordinator & Paper Setter',
      alibi: 'Working from home grading lab assignments.',
      motive: 'Disputed salary revision appeal pending with management.',
      statement: 'I uploaded my draft questions via the portal last Friday. The final composition was in COE hands.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'FAC-CS-19'
    }
  ],
  evidence: [
    {
      id: 'ev-08-1',
      itemNumber: 'ITEM-801',
      label: 'Steganographic Yellow Tracking Dot Analysis',
      description: 'Decoded printer tracking grid from Telegram screenshot. Encoded Printer Serial: `PRN-HP-LJ902-COE2`. Job Timestamp: `2026-10-21 21:10:48 IST`. User ID: `coe_girish`.',
      foundAt: 'Digital Forensics Image Analysis Lab',
      significance: 'Irrefutably ties the leaked document printout to Girish Chandrasekhar terminal and printer.',
      chainOfCustody: 'Cyber Cell Lead Inspector S. Venkataraman'
    },
    {
      id: 'ev-08-2',
      itemNumber: 'ITEM-802',
      label: 'Telegram Channel Export `CryptoExamVault`',
      description: 'ZIP bundle containing 8 photographed pages uploaded from mobile account @girish_c_study at 22:15 IST.',
      foundAt: 'Telegram CDN Intercept',
      significance: 'Direct transmission channel linking Girish mobile account to distribution.',
      chainOfCustody: 'CERT-In Investigation Liaison'
    }
  ],
  datasets: [
    {
      id: 'ds-08-1',
      name: 'Examination Document Versioning & Crypto Hashes',
      filename: 'exam_document_revisions.csv',
      description: 'Confidential document revision history, digital signatures, and author credentials.',
      columns: ['revision_id', 'doc_title', 'author', 'timestamp', 'sha256_hash_prefix', 'pages', 'classification'],
      rowCount: 6,
      csvContent: `revision_id,doc_title,author,timestamp,sha256_hash_prefix,pages,classification
REV-101,CS801_Midterm_Draft,Prof. Arvind Menon,2026-10-18 14:20:00,7f8a912b,6,CONFIDENTIAL
REV-102,CS801_Midterm_Review,Dr. Rajeshwari,2026-10-19 11:30:15,3c19d88e,7,RESTRICTED
REV-103,CS801_Final_Master,Dr. Rajeshwari,2026-10-21 16:55:00,e8901f44,8,TOP_SECRET_AIRGAP
REV-104,EC402_VLSI_Master,Dr. M. Srinivasan,2026-10-21 17:15:00,a23194bc,8,TOP_SECRET_AIRGAP
REV-105,ME301_Thermodynamics,Prof. N. Kulkarni,2026-10-21 17:40:00,99df4812,8,TOP_SECRET_AIRGAP
REV-106,IT502_Cloud_Security,Dr. Rajeshwari,2026-10-21 18:00:00,55ba201e,8,TOP_SECRET_AIRGAP`
    },
    {
      id: 'ds-08-2',
      name: 'Print Spooler CUPS Server Job Logs',
      filename: 'printer_spooler_jobs.csv',
      description: 'Print queues, job IDs, terminal IPs, and page counts from secure COE network printers.',
      columns: ['job_id', 'printer_id', 'user_id', 'client_ip', 'timestamp', 'doc_name', 'pages', 'copies', 'status'],
      rowCount: 8,
      csvContent: `job_id,printer_id,user_id,client_ip,timestamp,doc_name,pages,copies,status
JOB-801,PRN-COE-01,coe_rajeshwari,10.14.8.10,2026-10-21 17:05:00,CS801_Final_Master.pdf,8,3,COMPLETED
JOB-802,PRN-COE-01,coe_rajeshwari,10.14.8.10,2026-10-21 17:20:00,EC402_VLSI_Master.pdf,8,3,COMPLETED
JOB-803,PRN-COE-01,coe_girish,10.14.8.15,2026-10-21 18:10:00,Exam_Hall_Seating_Chart.pdf,14,1,COMPLETED
JOB-804,PRN-COE-01,coe_girish,10.14.8.15,2026-10-21 18:45:00,Attendance_Slips_Oct22.pdf,30,1,COMPLETED
JOB-805,PRN-COE-02,coe_girish,10.14.8.44,2026-10-21 21:10:48,CS801_Final_Master.pdf,8,1,COMPLETED_MANUAL_FEED
JOB-806,PRN-COE-02,coe_girish,10.14.8.44,2026-10-21 21:14:02,SPOOL_FLUSH_SYSTEM.tmp,1,1,COMPLETED_PURGED
JOB-807,PRN-COE-01,sys_admin,10.14.8.01,2026-10-22 06:00:00,Daily_Printer_Health_Report.pdf,2,1,COMPLETED
JOB-808,PRN-COE-01,coe_rajeshwari,10.14.8.10,2026-10-22 07:15:00,Emergency_Paper_Cancellation.pdf,1,1,COMPLETED`
    }
  ],
  questions: [
    {
      id: 'q-08-1',
      caseId: 'case-08',
      questionNumber: 1,
      prompt: 'What was the exact Job ID (job_id) of the unauthorized printout executed on PRN-COE-02 at 21:10:48?',
      type: 'text',
      correctAnswer: 'JOB-805',
      acceptedAlternates: ['job-805', 'JOB 805'],
      points: 15,
      hint: 'Search printer_spooler_jobs.csv for printer_id PRN-COE-02 at timestamp 21:10:48.',
      evidenceRef: 'printer_spooler_jobs.csv, row JOB-805',
      explanation: 'Job JOB-805 was submitted at 2026-10-21 21:10:48 to printer PRN-COE-02.'
    },
    {
      id: 'q-08-2',
      caseId: 'case-08',
      questionNumber: 2,
      prompt: 'What internal terminal IP address (client_ip) was used to dispatch the unauthorized print job JOB-805?',
      type: 'text',
      correctAnswer: '10.14.8.44',
      acceptedAlternates: ['10.14.8.44'],
      points: 20,
      hint: 'Examine client_ip for JOB-805 in printer_spooler_jobs.csv.',
      evidenceRef: 'printer_spooler_jobs.csv, row JOB-805',
      explanation: 'Client IP 10.14.8.44 sent the print job to PRN-COE-02.'
    },
    {
      id: 'q-08-3',
      caseId: 'case-08',
      questionNumber: 3,
      prompt: 'What was the SHA-256 hash prefix (sha256_hash_prefix) for the final master exam document (REV-103)?',
      type: 'text',
      correctAnswer: 'e8901f44',
      acceptedAlternates: ['e8901f44'],
      points: 15,
      hint: 'Look up revision_id REV-103 in exam_document_revisions.csv.',
      evidenceRef: 'exam_document_revisions.csv, row REV-103',
      explanation: 'Revision REV-103 has hash prefix e8901f44.'
    },
    {
      id: 'q-08-4',
      caseId: 'case-08',
      questionNumber: 4,
      prompt: 'What cleanup print job (job_id) was executed at 21:14:02 to purge and flush the print spooler memory?',
      type: 'text',
      correctAnswer: 'JOB-806',
      acceptedAlternates: ['job-806', 'JOB 806'],
      points: 20,
      hint: 'Look for the job right after JOB-805 in printer_spooler_jobs.csv with doc_name SPOOL_FLUSH_SYSTEM.tmp.',
      evidenceRef: 'printer_spooler_jobs.csv, row JOB-806',
      explanation: 'Job JOB-806 was a deliberate spooler flush command designed to wipe memory logs.'
    },
    {
      id: 'q-08-5',
      caseId: 'case-08',
      questionNumber: 5,
      prompt: 'Who was the staff member who printed the examination paper and leaked it to Telegram?',
      type: 'multiple_choice',
      options: ['Girish Chandrasekhar', 'Dr. Rajeshwari Swaminathan', 'Prof. Arvind Menon', 'Dr. M. Srinivasan'],
      correctAnswer: 'Girish Chandrasekhar',
      acceptedAlternates: ['Girish Chandrasekhar', 'girish chandrasekhar'],
      points: 30,
      hint: 'Connect user_id coe_girish on printer PRN-COE-02 and the decoded yellow tracking dots in ITEM-801.',
      evidenceRef: 'JOB-805 + ITEM-801 + ITEM-802',
      explanation: 'Girish Chandrasekhar stayed behind after official closing, used backroom printer PRN-COE-02 (IP 10.14.8.44) under user ID coe_girish, photographed the printout, and broadcast it to his coaching Telegram channel.'
    }
  ],
  passingScore: 70
};
