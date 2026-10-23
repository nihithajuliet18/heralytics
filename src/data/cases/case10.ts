import { CrimeCase } from '../../types';

export const case10: CrimeCase = {
  id: 'case-10',
  caseNumber: 10,
  code: 'CASE-10',
  title: 'The Mastermind Protocol',
  incidentType: 'Transnational Syndicate Conspiracy / Mastermind Reconstruction',
  location: 'Interpol Red Notice Command & Joint Cyber Task Force Headquarters',
  dateOfIncident: 'October 22, 2026 — 23:59 IST',
  leadInvestigator: 'Joint Director General Meera Sengupta & All District Task Leads',
  difficulty: 'Intermediate',
  summary:
    'The individual crimes investigated across Cases 01 through 09 were not isolated crimes of passion or rogue opportunism. They were tactical strike operations commissioned, funded, and coordinated by a single shadow mastermind known in encrypted syndicate transmissions as "ARCHITECT-ZERO". By correlating five disparate intelligence streams—intercepted diplomatic cables, offshore shell deposits, flight manifests, forged alias registries, and safehouse surveillance—detectives must unmask the true identity of the mastermind before their midnight charter flight departs Indian airspace.',
  incidentDetails:
    'Following the raid on the Thiruporur GPU safehouse and the Dutch server seizure, intelligence officers intercepted a batch of high-priority diplomatic-grade radio ciphers. The records reveal that David compute theft (Case 01), Vikram diamond heist (Case 02), Naveen wire transfer (Case 03), Pradeep locker tampering (Case 04), Ashwin patent theft (Case 05), Rohan scholarship hijacking (Case 06), Hariprasad GPU diversion (Case 07), Girish exam leak (Case 08), and Varun defense data breach (Case 09) all deposited funds into or received instructions from a Seychelles entity: "Vanguard Meridian Holdings Ltd". A private charter flight (Gulfstream G650, Flight #VNG-009) is cleared for takeoff from Chennai International Cargo Apron at 00:45 IST.',
  victimOrEntity: 'National Scientific Sovereignty & Sathyabama Academic Security',
  timeline: [
    { time: '18:00 IST', event: 'Joint Task Force correlates digital evidence fingerprints across Cases 01 to 09.', source: 'Task Force Briefing' },
    { time: '19:30 IST', event: 'Intercepted radio bursts decoded using key recovered from Case 09 staging server.', source: 'Signals Intelligence' },
    { time: '20:45 IST', event: 'Offshore financial audit flags 9 wire tranches funded by Vanguard Meridian Holdings.', source: 'Financial Intelligence Unit' },
    { time: '21:30 IST', event: 'Surveillance van spots dark Audi A8 at Kovalam coastal safehouse.', source: 'Field Unit Bravo' },
    { time: '22:15 IST', event: 'Passenger manifest filed for charter flight VNG-009 bound for Zurich.', source: 'Air Traffic Control' },
    { time: '23:50 IST', event: 'Airport perimeter sealed. Final takedown order issued by Joint Director General Sengupta.', source: 'Command Log' }
  ],
  suspects: [
    {
      id: 'susp-10-1',
      name: 'Dr. Devraj Singhania',
      role: 'International Technology Venture Capitalist & Former Trustee',
      alibi: 'Claims he was attending an exclusive private dinner in Mahabalipuram before flying to Switzerland for a board meeting.',
      motive: 'Acquiring quantum patents, military defense telemetry, computing clusters, and liquid capital to launch an unsanctioned offshore defense tech conglomerate.',
      statement: 'I am a respected venture philanthropist. You are confusing venture capital acquisitions with criminal conspiracy.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'TRUST-001'
    },
    {
      id: 'susp-10-2',
      name: 'Maximilian Vance',
      role: 'Global Logistics Broker & Private Security Director',
      alibi: 'Stationed at Chennai Port commercial shipping lounge.',
      motive: 'Coordinated container logistics and customs seal fabrication.',
      statement: 'I merely arrange freight charter slots for corporate clients. I do not inspect container contents or check seal numbers.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'LOG-INT-88'
    },
    {
      id: 'susp-10-3',
      name: 'Soraya Al-Mansoor',
      role: 'Offshore Wealth Counsel & Corporate Nominee',
      alibi: 'Telecommuting from Dubai financial center.',
      motive: 'Incorporated Vanguard Meridian Holdings and managed escrow disbursements.',
      statement: 'I act strictly upon client instructions under legal attorney-client privilege. I was never aware of any thefts.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'LEGAL-DXB'
    }
  ],
  evidence: [
    {
      id: 'ev-10-1',
      itemNumber: 'ITEM-1001',
      label: 'Decrypted Mastermind Execution Log `protocol_omega.json`',
      description: 'Found on seized hardware at Kovalam coastal villa. Correlates payments of $250,000 to $1,500,000 across Cases 01 through 09, signed with PGP Master Key `0xARCHITECT_ZERO`.',
      foundAt: 'Kovalam Beach Safehouse Desk Safe',
      significance: 'Smoking gun proving all 9 prior crimes were sub-tasks of a unified corporate espionage masterplan.',
      chainOfCustody: 'Joint Task Force Director Meera Sengupta'
    },
    {
      id: 'ev-10-2',
      itemNumber: 'ITEM-1002',
      label: 'Forged Diplomatic Passport (St. Kitts & Nevis)',
      description: 'Issued under alias "Dr. Derrick S. Vance" (Passport #SK-9902184) bearing photograph of Dr. Devraj Singhania and biometric chip.',
      foundAt: 'Executive Briefcase inside Flight VNG-009 Cabin',
      significance: 'Physical proof of intended flight from justice using a synthetic diplomatic identity.',
      chainOfCustody: 'Immigration Bureau & Task Force 1'
    }
  ],
  datasets: [
    {
      id: 'ds-10-1',
      name: 'Syndicate Intercepted Encoded Cables',
      filename: 'syndicate_encoded_cables.csv',
      description: 'High-frequency radio intercepts, cipher types, decrypted mission objectives, and target cases.',
      columns: ['cable_id', 'timestamp', 'channel', 'target_case_code', 'operative_alias', 'instruction_summary', 'payout_status'],
      rowCount: 9,
      csvContent: `cable_id,timestamp,channel,target_case_code,operative_alias,instruction_summary,payout_status
CAB-001,2026-10-14 21:00,BURST_RADIO_91,CASE-01,NIGHT_WATCH,Eliminate Sridhar before telemetry publish; wipe 4F logs,ESCROW_RELEASED
CAB-002,2026-10-15 12:30,TOR_ONION_DROP,CASE-02,GEM_CUTTER,Execute Coromandel diamond swap during 14:10 power cut,ESCROW_RELEASED
CAB-003,2026-10-15 23:45,SIGNAL_ENCLAVE,CASE-03,LEDGER_GHOST,Transfer 1.45 Cr endowment funds to Zenith Horizon FZE,ESCROW_RELEASED
CAB-004,2026-10-17 17:00,SIGNAL_ENCLAVE,CASE-04,BADGE_412,Extract syndicate hard drive EV-8092 before court morning trial,ESCROW_RELEASED
CAB-005,2026-10-17 23:15,BURST_RADIO_91,CASE-05,EX_SCHOLAR,Raid Dean 310; retrieve graphene battery patent volume 1-3,ESCROW_RELEASED
CAB-006,2026-10-19 14:00,TOR_ONION_DROP,CASE-06,PHANTOM_STUDENT,Hijack top-ranked scholarship identities; re-route bank wire,ESCROW_RELEASED
CAB-007,2026-10-20 00:30,SATCOM_IRIDIUM,CASE-07,HEAVY_HAUL,Divert GPU container to Thiruporur; substitute water ballast,ESCROW_RELEASED
CAB-008,2026-10-21 19:00,SIGNAL_ENCLAVE,CASE-08,PRINT_MASTER,Exfiltrate Distributed Systems exam to Telegram to trigger turmoil,ESCROW_RELEASED
CAB-009,2026-10-22 00:15,SATCOM_IRIDIUM,CASE-09,CLOUD_ARCHITECT,Dump Project SAGAR defense database to Netherlands bulletproof IP,ESCROW_RELEASED`
    },
    {
      id: 'ds-10-2',
      name: 'Vanguard Meridian Offshore Wire Ledger',
      filename: 'shell_company_transfers.csv',
      description: 'Offshore escrow disbursements originating from Vanguard Meridian Holdings Ltd (Seychelles).',
      columns: ['transfer_id', 'date', 'beneficiary_entity', 'jurisdiction', 'amount_usd', 'crime_case_ref', 'authorized_by_code'],
      rowCount: 9,
      csvContent: `transfer_id,date,beneficiary_entity,jurisdiction,amount_usd,crime_case_ref,authorized_by_code
TX-VM-101,2026-10-14,Aetheria Mining Trust,Panama,250000,CASE-01,ARCHITECT-ZERO
TX-VM-102,2026-10-15,Antwerp Diamond Holding,Liechtenstein,500000,CASE-02,ARCHITECT-ZERO
TX-VM-103,2026-10-16,Zenith Horizon FZE,Dubai UAE,175000,CASE-03,ARCHITECT-ZERO
TX-VM-104,2026-10-17,Pacific Defense Escrow,Cayman Islands,150000,CASE-04,ARCHITECT-ZERO
TX-VM-105,2026-10-18,Graphene Venture Alpha,British Virgin Islands,350000,CASE-05,ARCHITECT-ZERO
TX-VM-106,2026-10-19,NeoPay Wallet Holding,Cyprus,80000,CASE-06,ARCHITECT-ZERO
TX-VM-107,2026-10-20,Titan Logistics Middle East,Marshall Islands,1100000,CASE-07,ARCHITECT-ZERO
TX-VM-108,2026-10-21,Apex Academy Coaching,Mauritius,95000,CASE-08,ARCHITECT-ZERO
TX-VM-109,2026-10-22,Hydra Defense Tech B.V.,Netherlands,1450000,CASE-09,ARCHITECT-ZERO`
    },
    {
      id: 'ds-10-3',
      name: 'Interpol Forged Identity & Alias Registry',
      filename: 'forged_identity_registry.csv',
      description: 'Biometric classes and aliases linked to mastermind network.',
      columns: ['record_id', 'true_identity', 'covert_alias', 'passport_number', 'issuing_nation', 'biometric_hash', 'travel_role'],
      rowCount: 5,
      csvContent: `record_id,true_identity,covert_alias,passport_number,issuing_nation,biometric_hash,travel_role
ID-REG-01,Dr. Devraj Singhania,Dr. Derrick S. Vance,SK-9902184,St. Kitts and Nevis,BIO-HASH-991024,MASTERMIND_PRINCIPAL
ID-REG-02,Maximilian Vance,Max Van Der Bilt,NL-4401928,Netherlands,BIO-HASH-441029,LOGISTICS_DIRECTOR
ID-REG-03,Soraya Al-Mansoor,Sarah M. Sterling,UK-8819204,United Kingdom,BIO-HASH-882103,LEGAL_ESCROW
ID-REG-04,Hariprasad Naidu,Hari P. Nathan,MY-1029482,Malaysia,BIO-HASH-301924,FIELD_COURIER
ID-REG-05,Varun Someshwar,Viktor Sommers,EE-9912044,Estonia,BIO-HASH-774910,CYBER_LEAD`
    },
    {
      id: 'ds-10-4',
      name: 'Private Aviation Charter Manifests',
      filename: 'flight_passenger_manifests.csv',
      description: 'General aviation flight plans and passenger manifests filed for departure on October 22–23.',
      columns: ['flight_no', 'aircraft_type', 'departure_airport', 'destination_airport', 'passenger_manifest', 'departure_slot_ist', 'charter_company'],
      rowCount: 4,
      csvContent: `flight_no,aircraft_type,departure_airport,destination_airport,passenger_manifest,departure_slot_ist,charter_company
VNG-009,Gulfstream G650,Chennai (MAA),Zurich (ZRH),"Dr. Derrick S. Vance, Maximilian Vance",2026-10-23 00:45,Vanguard Air Charter
EMB-404,Embraer Praetor 600,Chennai (MAA),Dubai (DXB),"Soraya Al-Mansoor, 2 Unidentified",2026-10-23 01:15,Falcon Executive
BOM-112,Bombardier Global 7500,Chennai (MAA),Singapore (SIN),"Tan Sri Jeffrey Lee",2026-10-23 02:00,SilkAir Executive
CES-550,Cessna Citation X,Chennai (MAA),Bengaluru (BLR),"Corporate Shuttle Team A",2026-10-23 06:00,Deccan Aviation`
    },
    {
      id: 'ds-10-5',
      name: 'Task Force Safehouse Surveillance Matrix',
      filename: 'safehouse_intercept_logs.csv',
      description: 'Physical surveillance observations from tactical field teams surrounding syndicate properties.',
      columns: ['log_id', 'safehouse_location', 'timestamp', 'vehicle_spotted', 'vehicle_plate', 'occupants_observed', 'threat_level'],
      rowCount: 5,
      csvContent: `log_id,safehouse_location,timestamp,vehicle_spotted,vehicle_plate,occupants_observed,threat_level
SURV-01,OMR Sholinganallur Villa,2026-10-22 17:30,Toyota Fortuner,TN-07-CD-4401,2 Courier Operatives,MODERATE
SURV-02,Thiruporur GPU Godown,2026-10-22 18:15,Eicher Truck,TN-04-AX-8912,Site Abandoned,LOW
SURV-03,Kovalam Coastal Estate,2026-10-22 21:30,Audi A8 LWB,TN-01-AZ-0001,Dr. Devraj Singhania + 2 Armed Guards,CRITICAL
SURV-04,Kovalam Coastal Estate,2026-10-22 23:10,Mercedes Sprinter Van,TN-01-AZ-0002,Loading Flight Cases & Safes,CRITICAL
SURV-05,Chennai Airport Cargo Apron,2026-10-22 23:45,Audi A8 LWB,TN-01-AZ-0001,Arrived at Vanguard Hangar Gate 9,CRITICAL`
    }
  ],
  questions: [
    {
      id: 'q-10-1',
      caseId: 'case-10',
      questionNumber: 1,
      prompt: 'What was the secret codename used by the mastermind in all cable transmissions and wire authorizations?',
      type: 'text',
      correctAnswer: 'ARCHITECT-ZERO',
      acceptedAlternates: ['architect-zero', 'ARCHITECT ZERO', 'Architect-Zero'],
      points: 15,
      hint: 'Inspect authorized_by_code in shell_company_transfers.csv.',
      evidenceRef: 'shell_company_transfers.csv, authorized_by_code column',
      explanation: 'All 9 offshore wire tranches were authorized by codename ARCHITECT-ZERO.'
    },
    {
      id: 'q-10-2',
      caseId: 'case-10',
      questionNumber: 2,
      prompt: 'What is the sum total amount in USD ($) disbursed across all 9 offshore wire transfers in shell_company_transfers.csv?',
      type: 'number',
      correctAnswer: 4150000,
      acceptedAlternates: ['4150000', '4,150,000', '$4,150,000', '4150000 USD'],
      points: 20,
      hint: 'Sum the amount_usd column for all 9 rows in shell_company_transfers.csv: 250k + 500k + 175k + 150k + 350k + 80k + 1.1M + 95k + 1.45M.',
      evidenceRef: 'shell_company_transfers.csv amount_usd column',
      explanation: '250,000 + 500,000 + 175,000 + 150,000 + 350,000 + 80,000 + 1,100,000 + 95,000 + 1,450,000 = $4,150,000 (4.15 Million USD).'
    },
    {
      id: 'q-10-3',
      caseId: 'case-10',
      questionNumber: 3,
      prompt: 'What flight number (flight_no) is the mastermind private charter Gulfstream G650 preparing to depart on at 00:45 IST?',
      type: 'text',
      correctAnswer: 'VNG-009',
      acceptedAlternates: ['vng-009', 'VNG 009'],
      points: 15,
      hint: 'Check flight_passenger_manifests.csv for the flight departing to Zurich.',
      evidenceRef: 'flight_passenger_manifests.csv, row 1 (VNG-009)',
      explanation: 'Flight VNG-009 is cleared for departure to Zurich (ZRH) at 00:45 IST.'
    },
    {
      id: 'q-10-4',
      caseId: 'case-10',
      questionNumber: 4,
      prompt: 'Under what covert alias (covert_alias) and passport number was Dr. Devraj Singhania traveling on Flight VNG-009?',
      type: 'text',
      correctAnswer: 'Dr. Derrick S. Vance',
      acceptedAlternates: ['Dr. Derrick S. Vance', 'Derrick S. Vance', 'Derrick Vance', 'Dr Derrick S Vance'],
      points: 20,
      hint: 'Look up record ID-REG-01 in forged_identity_registry.csv.',
      evidenceRef: 'forged_identity_registry.csv, row ID-REG-01',
      explanation: 'Dr. Devraj Singhania held forged St. Kitts passport SK-9902184 under the alias Dr. Derrick S. Vance.'
    },
    {
      id: 'q-10-5',
      caseId: 'case-10',
      questionNumber: 5,
      prompt: 'Who is the supreme mastermind "ARCHITECT-ZERO" behind the entire 10-case conspiracy?',
      type: 'multiple_choice',
      options: ['Dr. Devraj Singhania', 'Maximilian Vance', 'Soraya Al-Mansoor', 'David Muthu'],
      correctAnswer: 'Dr. Devraj Singhania',
      acceptedAlternates: ['Dr. Devraj Singhania', 'devraj singhania'],
      points: 30,
      hint: 'Correlate the principal alias ID-REG-01, vehicle TN-01-AZ-0001 tracked from Kovalam to Hangar Gate 9, and ITEM-1001 protocol_omega.json.',
      evidenceRef: 'ITEM-1001 + ITEM-1002 + SURV-03/05 + ID-REG-01',
      explanation: 'Dr. Devraj Singhania orchestrated all 9 operations to systematically strip university research, assets, and compute power for his private defense technology firm, attempting an escape via private charter VNG-009 under the alias Dr. Derrick S. Vance.'
    }
  ],
  passingScore: 70
};
