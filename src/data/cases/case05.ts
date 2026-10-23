import { CrimeCase } from '../../types';

export const case05: CrimeCase = {
  id: 'case-05',
  caseNumber: 5,
  code: 'CASE-05',
  title: 'The Office Break-In',
  incidentType: 'Commercial Burglary / Intellectual Property Theft',
  location: 'Office of the Dean of Research, Ramanujan Academic Block, 3rd Floor',
  dateOfIncident: 'October 18, 2026 — 01:25 IST',
  leadInvestigator: 'Inspector R. Jayachandran',
  difficulty: 'Elementary',
  summary:
    'Two customized quantum cryptography prototyping laptops and a sealed envelope containing the patent draft for a solid-state graphene battery were stolen from Dean Dr. Nirmala private suite. The thief entered through an emergency fire egress and used a cloned maintenance card to unlock Room 310.',
  incidentDetails:
    'At 06:30 IST on October 18, the custodial supervisor arrived to unlock Dean Suite 310 and discovered the latch had been shimmed with a magnetic bypass plate. The fire exit door on the 3rd floor west stairwell had been propped open with an unbranded wooden wedge. Asset tags AST-8910 and AST-8912 (Dell Precision 7780 mobile workstations) were missing from the docking bay. Door access logs register a failed swipe at 01:15 followed by an unauthorized entry using cloned maintenance badge CLN-902.',
  victimOrEntity: 'Office of the Dean of Advanced Research & Patents',
  timeline: [
    { time: '20:00 IST', event: 'Dean Dr. Nirmala locks Suite 310 and leaves campus.', source: 'Dean Statement' },
    { time: '22:30 IST', event: 'Scheduled night sanitization crew cleans corridor; Suite 310 untouched.', source: 'Cleaning Log' },
    { time: '01:15 IST', event: 'Sensor RDR-310 records DENIED swipe for terminated badge BADGE-EX-44.', source: 'Door Server' },
    { time: '01:22 IST', event: 'West Fire Exit alarm suppressed using maintenance master bypass code.', source: 'Fire Panel' },
    { time: '01:25 IST', event: 'Door 310 unlocked via badge CLN-902 (registered to "General Facility").', source: 'Access Log' },
    { time: '01:42 IST', event: 'Stairwell door swings closed; figure with heavy knapsack exits toward North Gate.', source: 'Perimeter CCTV' }
  ],
  suspects: [
    {
      id: 'susp-05-1',
      name: 'Ashwin Karthikeyan',
      role: 'Former PhD Scholar (Terminated Sept 2026)',
      alibi: 'Claims he was in Bengaluru attending a software interview.',
      motive: 'Claims Dean Nirmala stole his graphene battery algorithm and omitted his name from the patent.',
      statement: 'I was in Bangalore since Thursday! Check my train ticket or hotel booking if you doubt me.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'BADGE-EX-44'
    },
    {
      id: 'susp-05-2',
      name: 'M. Senthil',
      role: 'Campus Night Facilities Supervisor',
      alibi: 'In the basement HVAC control room monitoring chiller compressor pressures.',
      motive: 'Recently requested an emergency salary advance that was rejected.',
      statement: 'I keep the master bypass codes written in the electrical binder in the basement. Anyone who broke into that room could copy it.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'FAC-M01'
    },
    {
      id: 'susp-05-3',
      name: 'Dr. Priya Nambiar',
      role: 'Associate Dean of Intellectual Property',
      alibi: 'Working from home on patent claims review until midnight.',
      motive: 'Rival candidate for the upcoming University Research Chair.',
      statement: 'I have my own authorized keycard. Why would I ever use a stairwell fire exit or break into Nirmala office?',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'EXEC-018'
    }
  ],
  evidence: [
    {
      id: 'ev-05-1',
      itemNumber: 'ITEM-501',
      label: 'Wooden Fire Exit Door Wedge',
      description: 'Pine timber wedge coated with varnish. Latent friction ridge print on flat side matches Ashwin Karthikeyan right thumb.',
      foundAt: 'West Stairwell 3rd Floor Exit',
      significance: 'Irrefutable physical evidence linking Ashwin to the propped fire exit door.',
      chainOfCustody: 'Fingerprint Division'
    },
    {
      id: 'ev-05-2',
      itemNumber: 'ITEM-502',
      label: 'RFID Proxmark3 Cloner Device',
      description: 'Found discarded in roadside storm drain 200m outside North Gate. Configured to emulate facility badge CLN-902 with serial number matching Dean door logs.',
      foundAt: 'Storm Drain near North Gate Bus Stop',
      significance: 'Hardware tool used to forge the entry credential at 01:25.',
      chainOfCustody: 'Cyber Cell Inspector Jayachandran'
    }
  ],
  datasets: [
    {
      id: 'ds-05-1',
      name: 'Dean Suite RFID Reader Log',
      filename: 'dean_office_rfid_access.csv',
      description: 'Access records for Reader RDR-310 (Dean Suite) and RDR-300 (3rd Floor West Corridor).',
      columns: ['log_id', 'timestamp', 'reader_id', 'badge_id', 'holder_label', 'status', 'auth_result'],
      rowCount: 8,
      csvContent: `log_id,timestamp,reader_id,badge_id,holder_label,status,auth_result
L-501,2026-10-17 19:58:10,RDR-310,EXEC-001,Dr. Nirmala (Dean),GRANTED,NORMAL_EXIT
L-502,2026-10-17 22:30:45,RDR-300,CLN-104,Custodial Team A,GRANTED,PATROL_PASS
L-503,2026-10-18 01:15:22,RDR-310,BADGE-EX-44,Ashwin K (TERMINATED),DENIED,EXPIRED_CREDENTIAL
L-504,2026-10-18 01:22:04,RDR-300,FAC-M01,Master Fire Bypass,OVERRIDE,BYPASS_ACTIVE
L-505,2026-10-18 01:25:39,RDR-310,CLN-902,General Facility (CLONED),GRANTED,DOOR_UNLATCHED
L-506,2026-10-18 01:41:15,RDR-300,CLN-902,General Facility (CLONED),GRANTED,CORRIDOR_EXIT
L-507,2026-10-18 06:30:12,RDR-310,CLN-101,Custodial Supervisor,GRANTED,MORNING_ENTRY
L-508,2026-10-18 07:15:00,RDR-310,EXEC-001,Dr. Nirmala (Dean),GRANTED,DISCOVERY_ENTRY`
    },
    {
      id: 'ds-05-2',
      name: 'Research Asset Audit & Discrepancy Log',
      filename: 'asset_audit_reconciliation.csv',
      description: 'Fixed asset registry reconciliation for Dean Suite 310 conducted following the incident.',
      columns: ['asset_tag', 'device_model', 'serial_number', 'custodian', 'last_seen_location', 'audit_status', 'declared_value_inr'],
      rowCount: 7,
      csvContent: `asset_tag,device_model,serial_number,custodian,last_seen_location,audit_status,declared_value_inr
AST-8910,Dell Precision 7780 Workstation,SN-DELL-881920,Dr. Nirmala,Desk Bay 1,MISSING_STOLEN,385000
AST-8911,Epson Projector 4K,SN-EPS-391024,IP Office,Ceiling Mount,PRESENT_SECURE,120000
AST-8912,Dell Precision 7780 Workstation,SN-DELL-881921,Dr. Nirmala,Desk Bay 2,MISSING_STOLEN,385000
AST-8913,HP LaserJet Enterprise,SN-HP-992014,Dean Office,Print Nook,PRESENT_SECURE,85000
AST-8914,Graphene Patent Binder Vol 1-3,DOC-PAT-2026-G,Dr. Nirmala,Safe Shelf 2,MISSING_STOLEN,50000000
AST-8915,Quantum Key Distribution Dongle,SN-QKD-00441,Dr. Nirmala,Desk Drawer 1,MISSING_STOLEN,650000
AST-8916,Apple iPad Pro 12.9,SN-APP-192837,Dr. Nirmala,Conference Table,PRESENT_SECURE,115000`
    }
  ],
  questions: [
    {
      id: 'q-05-1',
      caseId: 'case-05',
      questionNumber: 1,
      prompt: 'Which terminated badge ID attempted and failed to unlock Room 310 at 01:15:22?',
      type: 'text',
      correctAnswer: 'BADGE-EX-44',
      acceptedAlternates: ['badge-ex-44', 'BADGE-EX-44'],
      points: 15,
      hint: 'Look at log_id L-503 in dean_office_rfid_access.csv.',
      evidenceRef: 'dean_office_rfid_access.csv, row L-503',
      explanation: 'Log L-503 records terminated badge BADGE-EX-44 registered to Ashwin K receiving a DENIED status.'
    },
    {
      id: 'q-05-2',
      caseId: 'case-05',
      questionNumber: 2,
      prompt: 'How many total asset items in asset_audit_reconciliation.csv were recorded with the audit_status MISSING_STOLEN?',
      type: 'number',
      correctAnswer: 4,
      acceptedAlternates: ['4', 'four'],
      points: 20,
      hint: 'Count the number of rows where audit_status is MISSING_STOLEN.',
      evidenceRef: 'asset_audit_reconciliation.csv (AST-8910, AST-8912, AST-8914, AST-8915)',
      explanation: 'Exactly 4 items (two Dell workstations AST-8910 and AST-8912, Patent Binder AST-8914, and QKD Dongle AST-8915) were stolen.'
    },
    {
      id: 'q-05-3',
      caseId: 'case-05',
      questionNumber: 3,
      prompt: 'What was the declared value in INR of the stolen Graphene Patent Binder (AST-8914)?',
      type: 'number',
      correctAnswer: 50000000,
      acceptedAlternates: ['50000000', '5,00,00,000', '50000000 INR', '5 crore'],
      points: 15,
      hint: 'Check declared_value_inr for asset_tag AST-8914.',
      evidenceRef: 'asset_audit_reconciliation.csv, row 4',
      explanation: 'The declared value of AST-8914 is 50,000,000 INR (5 Crore INR).'
    },
    {
      id: 'q-05-4',
      caseId: 'case-05',
      questionNumber: 4,
      prompt: 'What cloned badge ID was used to unlatch Door 310 at 01:25:39 after the initial failure?',
      type: 'text',
      correctAnswer: 'CLN-902',
      acceptedAlternates: ['cln-902', 'CLN 902'],
      points: 20,
      hint: 'Inspect log_id L-505 in dean_office_rfid_access.csv.',
      evidenceRef: 'dean_office_rfid_access.csv, log L-505',
      explanation: 'Log L-505 shows badge CLN-902 was swiped at 01:25:39 to unlock the door.'
    },
    {
      id: 'q-05-5',
      caseId: 'case-05',
      questionNumber: 5,
      prompt: 'Who was the burglar who broke into the Dean Suite?',
      type: 'multiple_choice',
      options: ['Ashwin Karthikeyan', 'M. Senthil', 'Dr. Priya Nambiar', 'Unidentified External Thief'],
      correctAnswer: 'Ashwin Karthikeyan',
      acceptedAlternates: ['Ashwin Karthikeyan', 'ashwin karthikeyan'],
      points: 30,
      hint: 'Review whose thumbprint was found on the fire exit door wedge ITEM-501 and whose expired badge tried first.',
      evidenceRef: 'ITEM-501 + L-503 + ITEM-502',
      explanation: 'Ashwin Karthikeyan first tried his expired badge BADGE-EX-44 at 01:15, then bypassed the fire exit with a wooden wedge (bearing his thumbprint) and used a Proxmark3-cloned card (CLN-902) to steal the laptops and patent binder.'
    }
  ],
  passingScore: 70
};
