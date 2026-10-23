import { CrimeCase } from '../../types';

export const case04: CrimeCase = {
  id: 'case-04',
  caseNumber: 4,
  code: 'CASE-04',
  title: 'The Missing Evidence',
  incidentType: 'Forensic Tampering / Breach of Chain of Custody',
  location: 'Forensic Evidence Locker B-4, Central District Precinct',
  dateOfIncident: 'October 17, 2026 — 19:40 IST',
  leadInvestigator: 'Deputy Superintendent Jennifer Paul',
  difficulty: 'Elementary',
  summary:
    'Key physical evidence in an ongoing high-profile narcotics prosecution—a sealed cryptographic USB hard drive (Item EV-8092)—disappeared from secure Locker B-4. When the defense attorney demanded an independent forensic hash audit, the tamper-evident seal on the evidence envelope was found slit open with an unsealed decoy inside.',
  incidentDetails:
    'Locker B-4 requires a dual biometric handprint and signed register entry for every withdrawal. Evidence parcel EV-8092 contained the encrypted ledger of an organized syndicate. At 09:00 on October 17, the envelope was audited by Custodian Officer Karthik and confirmed sealed. By 20:00, when Assistant Public Prosecutor Swaminathan requested the evidence for tomorrow trial, envelope EV-8092 bore a sliced foil seal (SEAL-9912 broken) and contained a blank Western Digital thumb drive. Custody logs register 12 accesses, but one officer logged an incomplete checkout without an escort.',
  victimOrEntity: 'Judicial Court Case #CC-2026-881 (State vs. Syndicate)',
  timeline: [
    { time: '08:30 IST', event: 'Morning shift handover. Evidence locker sealed; all 40 lockers accounted for.', source: 'Locker Audit' },
    { time: '14:20 IST', event: 'Officer Pradeep checks out ballistics parcel EV-8088 with supervisor signoff.', source: 'Chain Log' },
    { time: '17:15 IST', event: 'Vault interior CCTV records light fixture maintenance by Facilities Officer Samuel.', source: 'Internal Camera' },
    { time: '18:50 IST', event: 'Unscheduled single-officer access to Locker B-4 logged under badge OFF-412.', source: 'Keycard Reader' },
    { time: '19:40 IST', event: 'Perimeter motion detector trips at rear sally port gate.', source: 'Security System' },
    { time: '20:05 IST', event: 'Tampered envelope discovered by Prosecutor Swaminathan; red alert sounded.', source: 'Incident Memo' }
  ],
  suspects: [
    {
      id: 'susp-04-1',
      name: 'Sub-Inspector Pradeep Rao',
      role: 'Evidence Room Duty Officer',
      alibi: 'Claimed he stepped out for dinner at 18:30 and handed keys to Constable Mani.',
      motive: 'Brother-in-law is named as a secondary distributor in the seized syndicate ledger.',
      statement: 'I gave the physical locker brass key to Constable Mani before leaving. Any entries after 18:30 were not done by me.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'OFF-412'
    },
    {
      id: 'susp-04-2',
      name: 'Constable Mani Velu',
      role: 'Assistant Evidence Custodian',
      alibi: 'Stationed at the outer visitor intake desk logging returned case dockets.',
      motive: 'Severe disciplinary warnings on record for missing logbooks.',
      statement: 'Pradeep never gave me the locker keys! He kept them in his pocket when he walked down the corridor toward Locker B.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'OFF-605'
    },
    {
      id: 'susp-04-3',
      name: 'Samuel D Souza',
      role: 'Precinct Facilities Electrician',
      alibi: 'Replacing fluorescent ballasts in evidence annex corridor.',
      motive: 'Former history of minor tool pilferage.',
      statement: 'I never touched the locker handles. I was on the ladder working on the ballast until 17:45.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'FAC-029'
    }
  ],
  evidence: [
    {
      id: 'ev-04-1',
      itemNumber: 'ITEM-401',
      label: 'Slit Evidence Envelope #EV-8092',
      description: 'Kraft tamper-resistant evidence envelope with razor incision along the lower fold. Original seal SEAL-9912 severed; resealed with standard Scotch tape.',
      foundAt: 'Locker B-4 Shelving Rack 2',
      significance: 'Demonstrates surgical entry to extract drive without destroying header label.',
      chainOfCustody: 'DSP Paul Forensic Team'
    },
    {
      id: 'ev-04-2',
      itemNumber: 'ITEM-402',
      label: 'Discarded MicroSD Adapter with Syndicate Thumbprint',
      description: 'Found inside Sub-Inspector Pradeep locker gear bag (Locker #14). Contains partial latent right index friction ridges matching Pradeep Rao.',
      foundAt: 'Officer Changing Room Locker 14',
      significance: 'Physical link connecting the missing digital data directly to Pradeep personal locker.',
      chainOfCustody: 'Forensic Latent Fingerprint Unit'
    }
  ],
  datasets: [
    {
      id: 'ds-04-1',
      name: 'Evidence Chain of Custody Register',
      filename: 'custody_chain_logs.csv',
      description: 'Ledger of all evidence check-outs, returns, tamper seal serials, and inspection flags on October 17.',
      columns: ['log_id', 'evidence_id', 'description', 'officer_badge', 'action_type', 'timestamp', 'seal_serial', 'tamper_flag'],
      rowCount: 10,
      csvContent: `log_id,evidence_id,description,officer_badge,action_type,timestamp,seal_serial,tamper_flag
LOG-401,EV-8085,Blood Sample Vials,OFF-605,AUDIT_VERIFIED,2026-10-17 08:35:00,SEAL-9901,CLEAN
LOG-402,EV-8086,Seized Pistol 9mm,OFF-412,COURT_RETURN,2026-10-17 11:15:20,SEAL-9904,CLEAN
LOG-403,EV-8088,Ballistics Shell Casing,OFF-412,LAB_DISPATCH,2026-10-17 14:20:00,SEAL-9908,CLEAN
LOG-404,EV-8090,Suspect Mobile Phone,OFF-605,FORENSIC_CLONE,2026-10-17 15:40:11,SEAL-9910,CLEAN
LOG-405,EV-8092,Encrypted Syndicate USB,OFF-605,AUDIT_VERIFIED,2026-10-17 16:00:00,SEAL-9912,CLEAN
LOG-406,EV-8088,Ballistics Shell Casing,OFF-412,LAB_RETURN,2026-10-17 16:45:00,SEAL-9914,CLEAN
LOG-407,EV-8092,Encrypted Syndicate USB,OFF-412,UNSCHEDULED_CHECK,2026-10-17 18:50:22,SEAL-9912,COMPROMISED
LOG-408,EV-8095,Counterfeit Currency Bundle,OFF-605,AUDIT_VERIFIED,2026-10-17 19:10:00,SEAL-9916,CLEAN
LOG-409,EV-8092,Encrypted Syndicate USB,OFF-999,COURT_PREP_AUDIT,2026-10-17 20:05:00,SEAL-9912,TAMPER_DETECTED
LOG-410,EV-8097,Seized Laptop SSD,OFF-412,ROUTINE_INSPECT,2026-10-17 20:30:00,SEAL-9918,CLEAN`
    },
    {
      id: 'ds-04-2',
      name: 'Shift Duty & Key Authorization Roster',
      filename: 'shift_duty_roster.csv',
      description: 'Official roster detailing shifts, assigned keys, and authorized locker room supervisors.',
      columns: ['roster_id', 'badge_id', 'officer_name', 'shift', 'start_time', 'end_time', 'key_custody', 'supervisor_on_duty'],
      rowCount: 6,
      csvContent: `roster_id,badge_id,officer_name,shift,start_time,end_time,key_custody,supervisor_on_duty
RST-101,OFF-301,Inspector D. Sundar,Day Shift,07:00,15:00,SECONDARY_KEY_A,DSP Paul
RST-102,OFF-605,Constable Mani Velu,General Shift,08:00,17:00,NONE,Inspector D. Sundar
RST-103,OFF-412,Sub-Inspector Pradeep Rao,Evening Shift,14:00,22:00,MASTER_KEY_B4,DSP Paul
RST-104,FAC-029,Samuel D Souza,Maintenance,16:00,20:00,UTILITY_CORRIDOR,Inspector D. Sundar
RST-105,OFF-202,Constable Kavitha,Night Shift,22:00,06:00,SECONDARY_KEY_A,DSP Paul
RST-106,OFF-999,APP Swaminathan,Court Liaison,19:30,21:00,ESCORTED_ONLY,DSP Paul`
    }
  ],
  questions: [
    {
      id: 'q-04-1',
      caseId: 'case-04',
      questionNumber: 1,
      prompt: 'What was the specific Evidence ID of the missing encrypted syndicate hard drive?',
      type: 'text',
      correctAnswer: 'EV-8092',
      acceptedAlternates: ['ev-8092', 'EV 8092'],
      points: 15,
      hint: 'Look for the evidence item associated with the syndicate USB in custody_chain_logs.csv.',
      evidenceRef: 'custody_chain_logs.csv, log_id LOG-405, LOG-407',
      explanation: 'Evidence ID EV-8092 was the encrypted syndicate USB stored in Locker B-4.'
    },
    {
      id: 'q-04-2',
      caseId: 'case-04',
      questionNumber: 2,
      prompt: 'At what time did Sub-Inspector Pradeep Rao (OFF-412) log the unscheduled check on EV-8092?',
      type: 'text',
      correctAnswer: '18:50:22',
      acceptedAlternates: ['18:50', '2026-10-17 18:50:22'],
      points: 20,
      hint: 'Find log_id LOG-407 in custody_chain_logs.csv.',
      evidenceRef: 'custody_chain_logs.csv, LOG-407',
      explanation: 'LOG-407 shows OFF-412 performed an UNSCHEDULED_CHECK at 2026-10-17 18:50:22.'
    },
    {
      id: 'q-04-3',
      caseId: 'case-04',
      questionNumber: 3,
      prompt: 'According to shift_duty_roster.csv, who held authorized custody of the MASTER_KEY_B4 during the evening shift (14:00–22:00)?',
      type: 'text',
      correctAnswer: 'Sub-Inspector Pradeep Rao',
      acceptedAlternates: ['Pradeep Rao', 'OFF-412', 'pradeep rao'],
      points: 20,
      hint: 'Filter shift_duty_roster.csv where key_custody is MASTER_KEY_B4.',
      evidenceRef: 'shift_duty_roster.csv, RST-103',
      explanation: 'Roster record RST-103 assigns MASTER_KEY_B4 exclusively to Sub-Inspector Pradeep Rao (OFF-412).'
    },
    {
      id: 'q-04-4',
      caseId: 'case-04',
      questionNumber: 4,
      prompt: 'How many total records in custody_chain_logs.csv have tamper_flag values indicating COMPROMISED or TAMPER_DETECTED?',
      type: 'number',
      correctAnswer: 2,
      acceptedAlternates: ['2', 'two'],
      points: 15,
      hint: 'Check rows LOG-407 and LOG-409 in custody_chain_logs.csv.',
      evidenceRef: 'custody_chain_logs.csv',
      explanation: 'LOG-407 is marked COMPROMISED and LOG-409 is marked TAMPER_DETECTED, giving exactly 2 records.'
    },
    {
      id: 'q-04-5',
      caseId: 'case-04',
      questionNumber: 5,
      prompt: 'Which individual tampered with the evidence locker to protect the syndicate?',
      type: 'multiple_choice',
      options: ['Sub-Inspector Pradeep Rao', 'Constable Mani Velu', 'Samuel D Souza', 'APP Swaminathan'],
      correctAnswer: 'Sub-Inspector Pradeep Rao',
      acceptedAlternates: ['Sub-Inspector Pradeep Rao', 'pradeep rao'],
      points: 30,
      hint: 'Connect the master keyholder, the unscheduled 18:50 check, and the physical Item ITEM-402 found in his changing locker.',
      evidenceRef: 'RST-103 + LOG-407 + ITEM-402',
      explanation: 'Sub-Inspector Pradeep Rao held the master key, entered at 18:50 without an escort, sliced the seal to swap the drive to shield his brother-in-law, and left latent prints on the adapter.'
    }
  ],
  passingScore: 70
};
