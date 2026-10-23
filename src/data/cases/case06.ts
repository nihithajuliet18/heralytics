import { CrimeCase } from '../../types';

export const case06: CrimeCase = {
  id: 'case-06',
  caseNumber: 6,
  code: 'CASE-06',
  title: 'The Identity Impostor',
  incidentType: 'Account Takeover / Synthetic Identity Theft',
  location: 'Sathyabama Central Identity Provider (IdP) & Student Portal',
  dateOfIncident: 'October 19, 2026 — 16:20 IST',
  leadInvestigator: 'Inspector T. Revathi (Cyber Crime Division)',
  difficulty: 'Intermediate',
  summary:
    'A rogue operator submitted 14 automated password recovery requests targeting high-GPA student accounts registered for the Global Dean Scholarship. By answering personal security questions scraped from public social media profiles, the impostor hijacked candidate accounts, altered bank disbursement details, and re-routed stipend deposits.',
  incidentDetails:
    'On October 19, top-ranked final year scholar Sneha Natarajan received an SMS notifying her that her portal password and registered phone number had been updated. When she attempted to access her student dashboard, her credentials failed. Digital Forensics found ticket RECOV-7712 originated from a residential IP in Tambaram. Within 12 minutes of the reset, the recovery account altered the NEFT stipend account number to a digital wallet registered under a forged identity.',
  victimOrEntity: 'Sneha Natarajan (Reg #39110822, Computer Science Dept)',
  timeline: [
    { time: '15:45 IST', event: 'Password reset initiated for user "sneha.39110822". Security challenge answered correctly.', source: 'IdP Server' },
    { time: '15:48 IST', event: 'Reset verification link dispatched to newly supplied recovery address "sneha.temp99@proton.me".', source: 'Mail Gateway' },
    { time: '15:52 IST', event: 'Password changed from IP 49.207.181.65.', source: 'Auth Service' },
    { time: '16:04 IST', event: 'Student scholarship disbursement profile bank details modified to Paytm Payments Bank #9884102910.', source: 'Student Portal DB' },
    { time: '16:20 IST', event: 'Sneha Natarajan lodges urgent complaint at Campus Cyber Helpdesk.', source: 'Helpdesk CRM' }
  ],
  suspects: [
    {
      id: 'susp-06-1',
      name: 'Rohan Varma',
      role: '3rd Year IT Student & Freelance Web Developer',
      alibi: 'Claims he was in campus computer lab 3 attending a hackathon test.',
      motive: 'Ranked #2 on the scholarship waitlist; would automatically receive the ₹2,00,000 grant if Sneha was disqualified or rejected.',
      statement: 'I run student web design gigs, but I would never touch Sneha account. I was coding Python all afternoon in Lab 3.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'STU-39110419'
    },
    {
      id: 'susp-06-2',
      name: 'K. Divya',
      role: 'Class Representative & Student Council Member',
      alibi: 'In library study carrel 12 studying discrete mathematics.',
      motive: 'Had access to class roster details and student birth dates.',
      statement: 'I maintain the student WhatsApp contact sheet, but I do not know anyone mother maiden name or high school mascot.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'STU-39110202'
    },
    {
      id: 'susp-06-3',
      name: 'P. Balachander',
      role: 'Student Portal Database Helpdesk Intern',
      alibi: 'Manning the general student query telephone line.',
      motive: 'Recently reprimanded for unauthorized log exports.',
      statement: 'I take calls for password resets, but ticket RECOV-7712 was processed via the self-service web form, not the staff console.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'INT-094'
    }
  ],
  evidence: [
    {
      id: 'ev-06-1',
      itemNumber: 'ITEM-601',
      label: 'Stipend Bank Account Beneficiary Registration',
      description: 'Bank KYC document for Paytm Wallet #9884102910. Account was linked to phone number +91-9884102910, registered to "R. Varma" with Aadhaar ending 9012.',
      foundAt: 'Paytm Payment Gateway Audit Response',
      significance: 'Directly unmasks the beneficiary bank account owner as Rohan Varma.',
      chainOfCustody: 'Cyber Crime Inspector Revathi'
    },
    {
      id: 'ev-06-2',
      itemNumber: 'ITEM-602',
      label: 'OSINT Scraping Script `scrape_alumni_bios.py`',
      description: 'Found on GitHub repository "rohanv-scripts/priv-recon". Contains targeted scrapers targeting Facebook and LinkedIn profiles of scholarship finalists to extract high school names and pet names.',
      foundAt: 'Public Git Archive (Cached)',
      significance: 'Demonstrates method used to bypass security challenge questions.',
      chainOfCustody: 'CERT-In Triage Analyst'
    }
  ],
  datasets: [
    {
      id: 'ds-06-1',
      name: 'Student Self-Service Account Recovery Tickets',
      filename: 'account_recovery_tickets.csv',
      description: 'Audit records of password recovery attempts, challenge responses, and requester IP telemetry.',
      columns: ['ticket_id', 'target_student_id', 'target_name', 'requester_ip', 'recovery_email', 'challenge_success', 'reset_completed'],
      rowCount: 8,
      csvContent: `ticket_id,target_student_id,target_name,requester_ip,recovery_email,challenge_success,reset_completed
RECOV-7709,39110104,Aditya Kumar,157.48.10.22,aditya.k@gmail.com,TRUE,TRUE
RECOV-7710,39110540,Deepak Raman,49.207.181.65,deepak.temp1@proton.me,FALSE,FALSE
RECOV-7711,39110612,Meera Iyer,49.207.181.65,meera.temp2@proton.me,FALSE,FALSE
RECOV-7712,39110822,Sneha Natarajan,49.207.181.65,sneha.temp99@proton.me,TRUE,TRUE
RECOV-7713,39110915,Varun Joshi,106.198.88.14,varun.j@outlook.com,TRUE,TRUE
RECOV-7714,39110844,Tanvi Sharma,49.207.181.65,tanvi.temp3@proton.me,FALSE,FALSE
RECOV-7715,39110330,Gautam Reddy,182.73.12.90,gautam.r@yahoo.com,TRUE,TRUE
RECOV-7716,39110777,Kiran Paul,49.207.181.65,kiran.temp4@proton.me,FALSE,FALSE`
    },
    {
      id: 'ds-06-2',
      name: 'Concurrent Sessions & Anomaly Logs',
      filename: 'concurrent_sessions_ip.csv',
      description: 'Active HTTP session states, client user agents, and IP subnet mappings.',
      columns: ['session_id', 'student_id', 'client_ip', 'geolocation', 'isp_provider', 'device_os', 'action_performed'],
      rowCount: 8,
      csvContent: `session_id,student_id,client_ip,geolocation,isp_provider,device_os,action_performed
S-901,39110419,49.207.181.65,Tambaram Chennai,ACT Fibernet,Ubuntu 24.04,PORTAL_LOGIN_ROHAN
S-902,39110822,122.164.80.11,Adyar Chennai,Airtel Broadband,macOS Sonoma,SESSION_TIMEOUT
S-903,39110822,49.207.181.65,Tambaram Chennai,ACT Fibernet,Ubuntu 24.04,PASSWORD_RESET_SUBMIT
S-904,39110822,49.207.181.65,Tambaram Chennai,ACT Fibernet,Ubuntu 24.04,UPDATE_BANK_PAYTM
S-905,39110419,49.207.181.65,Tambaram Chennai,ACT Fibernet,Ubuntu 24.04,CHECK_SCHOLARSHIP_WAITLIST
S-906,39110104,157.48.10.22,Velachery Chennai,JioFiber,Windows 11,VIEW_TRANSCRIPT
S-907,39110915,106.198.88.14,Guindy Chennai,Airtel Broadband,Windows 10,PROFILE_UPDATE
S-908,39110330,182.73.12.90,T Nagar Chennai,Tata Play,macOS Ventura,PORTAL_LOGOUT`
    }
  ],
  questions: [
    {
      id: 'q-06-1',
      caseId: 'case-06',
      questionNumber: 1,
      prompt: 'What was the specific Ticket ID used to successfully hijack Sneha Natarajan account (student ID 39110822)?',
      type: 'text',
      correctAnswer: 'RECOV-7712',
      acceptedAlternates: ['recov-7712', 'RECOV 7712'],
      points: 15,
      hint: 'Find target_student_id 39110822 in account_recovery_tickets.csv.',
      evidenceRef: 'account_recovery_tickets.csv, row RECOV-7712',
      explanation: 'Ticket RECOV-7712 targeted student 39110822 with challenge_success = TRUE and reset_completed = TRUE.'
    },
    {
      id: 'q-06-2',
      caseId: 'case-06',
      questionNumber: 2,
      prompt: 'What residential IP address originated the fraudulent recovery attempts against multiple scholarship candidates?',
      type: 'text',
      correctAnswer: '49.207.181.65',
      acceptedAlternates: ['49.207.181.65'],
      points: 20,
      hint: 'Inspect the requester_ip column in account_recovery_tickets.csv.',
      evidenceRef: 'account_recovery_tickets.csv (rows RECOV-7710, 7711, 7712, 7714, 7716)',
      explanation: 'IP 49.207.181.65 made 5 distinct account recovery requests targeting scholarship students.'
    },
    {
      id: 'q-06-3',
      caseId: 'case-06',
      questionNumber: 3,
      prompt: 'Which legitimate student ID (student_id) logged in from the exact same IP (49.207.181.65) and OS (Ubuntu 24.04) in session S-901?',
      type: 'number',
      correctAnswer: 39110419,
      acceptedAlternates: ['39110419', 'STU-39110419'],
      points: 20,
      hint: 'Look at row S-901 in concurrent_sessions_ip.csv.',
      evidenceRef: 'concurrent_sessions_ip.csv, session S-901',
      explanation: 'Session S-901 belongs to student 39110419 (Rohan Varma) on IP 49.207.181.65.'
    },
    {
      id: 'q-06-4',
      caseId: 'case-06',
      questionNumber: 4,
      prompt: 'How many of the recovery tickets submitted from IP 49.207.181.65 failed their security challenge (challenge_success = FALSE)?',
      type: 'number',
      correctAnswer: 4,
      acceptedAlternates: ['4', 'four'],
      points: 15,
      hint: 'Count rows with requester_ip == 49.207.181.65 where challenge_success is FALSE.',
      evidenceRef: 'account_recovery_tickets.csv (RECOV-7710, 7711, 7714, 7716)',
      explanation: 'Tickets 7710, 7711, 7714, and 7716 all failed, giving exactly 4 failed attempts.'
    },
    {
      id: 'q-06-5',
      caseId: 'case-06',
      questionNumber: 5,
      prompt: 'Who is the identity impostor who hijacked Sneha account?',
      type: 'multiple_choice',
      options: ['Rohan Varma', 'K. Divya', 'P. Balachander', 'Aditya Kumar'],
      correctAnswer: 'Rohan Varma',
      acceptedAlternates: ['Rohan Varma', 'rohan varma'],
      points: 30,
      hint: 'Correlate student ID 39110419, the beneficiary Paytm registration ITEM-601, and the Tambaram IP address.',
      evidenceRef: 'S-901, S-905, ITEM-601',
      explanation: 'Rohan Varma (Student ID 39110419) used OSINT scripts to reset Sneha credentials from his home IP in Tambaram and linked his personal Paytm wallet to steal her scholarship.'
    }
  ],
  passingScore: 70
};
