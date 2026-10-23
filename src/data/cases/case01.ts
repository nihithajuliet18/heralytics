import { CrimeCase } from '../../types';

export const case01: CrimeCase = {
  id: 'case-01',
  caseNumber: 1,
  code: 'CASE-01',
  title: 'The Midnight Murder',
  incidentType: 'Homicide / Unlawful Access',
  location: 'Sathyabama Astronomy Tower & Stranahan Archive, 4th Floor',
  dateOfIncident: 'October 14, 2026 — 23:55 IST',
  leadInvestigator: 'Inspector V. Raman (Cyber-Forensic Cell)',
  difficulty: 'Beginner',
  summary:
    'Dr. K. Sridhar, Director of the Stellar Observation Project, was found deceased in the secure 4th-floor archive room at 00:20 IST. The electronic deadbolt was locked from the outside. Two physical access cards registered entries during the critical 45-minute window before death. Analysts must cross-examine RFID reader logs with witness statements to identify the killer and their forged credential.',
  incidentDetails:
    'At 00:20 IST on October 15, campus security officer Anand noticed the indicator light on Room 404 (Stranahan Archive) flashing amber—indicating a manual override. Upon unlocking, Dr. Sridhar was discovered slumped over the observation catalog. Coroner reports place the time of death between 23:45 and 00:05. The victim held a crumpled keycard receipt stamped 23:52. Two distinct access cards entered the floor: Card ID BADGE-204 (issued to Research Fellow Aruna) and BADGE-881 (belonging to Systems Engineer David, who claims his card was cloned).',
  victimOrEntity: 'Dr. K. Sridhar (Age 54, Senior Research Chair)',
  timeline: [
    { time: '22:30 IST', event: 'Dr. Sridhar arrives at Observatory 4th Floor Archive with observation logs.', source: 'Lobby CCTV' },
    { time: '23:15 IST', event: 'Lobby doors locked per nighttime protocol; card swipe required.', source: 'Station Guard' },
    { time: '23:42 IST', event: 'First door access swipe on Room 404 recorded by sensor B-404.', source: 'RFID Server' },
    { time: '23:52 IST', event: 'Receipt printer in room records print job #4092: "Restricted Observation Coordinates".', source: 'Archive Terminal' },
    { time: '23:58 IST', event: 'Elevator 2 travels from 4th floor to basement loading dock without call button.', source: 'Elevator Telemetry' },
    { time: '00:20 IST', event: 'Security Officer Anand discovers victim. Crime scene sealed.', source: 'Incident Report' }
  ],
  suspects: [
    {
      id: 'susp-01-1',
      name: 'Aruna Chandran',
      role: 'Research Fellow & Stranahan Scholar',
      alibi: 'Claims she was working in the 1st Floor Optics Lab until 00:15 IST before cycling home.',
      motive: 'Dr. Sridhar threatened to revoke her fellowship due to disputed authorship of the stellar catalog.',
      statement: 'I never stepped foot on the 4th floor after 19:00. If my badge shows up, someone cloned my card or took it from the optics bench while I was in the darkroom.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'BADGE-204'
    },
    {
      id: 'susp-01-2',
      name: 'David Muthu',
      role: 'Senior Systems Administrator',
      alibi: 'Claims he was off-campus dining at Velachery Highway Diner between 23:00 and 01:00.',
      motive: 'Dr. Sridhar discovered David was illegally siphoning server compute cycles for private crypto mining.',
      statement: 'Check my diner bill! My badge was sitting on my desk in the IT block. Anyone with an RFID cloner could read it from 10 meters away.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'BADGE-881'
    },
    {
      id: 'susp-01-3',
      name: 'Anand Kumar',
      role: 'Night Security Guard',
      alibi: 'On scheduled campus perimeter patrol between 23:30 and 00:15.',
      motive: 'Recently reprimanded by the victim for sleeping on duty.',
      statement: 'I was doing my 23:45 round at Gate 3. When I returned to check the building at 00:18, the archive door amber light was blinking.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'BADGE-019'
    }
  ],
  evidence: [
    {
      id: 'ev-01-1',
      itemNumber: 'ITEM-101',
      label: 'Crumpled Keycard Receipt',
      description: 'Found clenched in victim left hand. Timestamp: 23:52:14 IST. Terminal ID: OBS-404-T1. User Account logged in: "sysadmin_dm".',
      foundAt: 'Room 404 Floor',
      significance: 'Proves sysadmin_dm credentials were actively used on the terminal inside the room 3 minutes before estimated death.',
      chainOfCustody: 'Officer Anand -> Lead Investigator Raman'
    },
    {
      id: 'ev-01-2',
      itemNumber: 'ITEM-102',
      label: 'Basement Loading Bay Footwear Impression',
      description: 'Muddy tread pattern (Vibram Mountain Grip, Size 10) found near the service exit door leading from Elevator 2.',
      foundAt: 'Basement Door B-2',
      significance: 'Matches boots owned by David Muthu; red laterite clay matches construction ditch behind the Observatory.',
      chainOfCustody: 'Forensic Unit Team 2'
    }
  ],
  datasets: [
    {
      id: 'ds-01-1',
      name: 'Access Logs — 4th Floor Archive',
      filename: 'observatory_access_logs.csv',
      description: 'Raw RFID sensor logs from doors leading to 4th-floor corridors, archive rooms, and service elevators.',
      columns: ['log_id', 'timestamp', 'reader_id', 'room_name', 'badge_id', 'badge_holder', 'access_granted', 'override_used'],
      rowCount: 18,
      csvContent: `log_id,timestamp,reader_id,room_name,badge_id,badge_holder,access_granted,override_used
1001,2026-10-14 22:30:12,RDR-400,Floor 4 Entry Gate,BADGE-001,Dr. K. Sridhar,TRUE,FALSE
1002,2026-10-14 22:31:05,RDR-404,Archive Room 404,BADGE-001,Dr. K. Sridhar,TRUE,FALSE
1003,2026-10-14 22:58:40,RDR-402,Optics Storage,BADGE-204,Aruna Chandran,TRUE,FALSE
1004,2026-10-14 23:04:19,RDR-400,Floor 4 Entry Gate,BADGE-204,Aruna Chandran,TRUE,FALSE
1005,2026-10-14 23:18:22,RDR-400,Floor 4 Entry Gate,BADGE-019,Anand Kumar,TRUE,FALSE
1006,2026-10-14 23:22:15,RDR-400,Floor 4 Exit Gate,BADGE-019,Anand Kumar,TRUE,FALSE
1007,2026-10-14 23:41:50,RDR-400,Floor 4 Entry Gate,BADGE-881,David Muthu,TRUE,FALSE
1008,2026-10-14 23:43:08,RDR-404,Archive Room 404,BADGE-881,David Muthu,TRUE,TRUE
1009,2026-10-14 23:54:12,RDR-404,Archive Room 404,BADGE-881,David Muthu,TRUE,FALSE
1010,2026-10-14 23:57:45,RDR-E02,Service Elevator 4F,BADGE-881,David Muthu,TRUE,TRUE
1011,2026-10-14 23:59:10,RDR-B02,Basement Exit Door,BADGE-881,David Muthu,TRUE,FALSE
1012,2026-10-15 00:18:40,RDR-400,Floor 4 Entry Gate,BADGE-019,Anand Kumar,TRUE,FALSE
1013,2026-10-15 00:20:02,RDR-404,Archive Room 404,BADGE-019,Anand Kumar,TRUE,TRUE
1014,2026-10-15 00:22:15,RDR-400,Floor 4 Entry Gate,BADGE-999,Emergency Response,TRUE,TRUE
1015,2026-10-15 00:25:30,RDR-404,Archive Room 404,BADGE-999,Emergency Response,TRUE,TRUE
1016,2026-10-15 00:30:11,RDR-400,Floor 4 Entry Gate,BADGE-007,Forensic Lead Raman,TRUE,FALSE
1017,2026-10-15 00:31:40,RDR-404,Archive Room 404,BADGE-007,Forensic Lead Raman,TRUE,FALSE
1018,2026-10-15 00:45:00,RDR-B02,Basement Exit Door,BADGE-007,Forensic Lead Raman,TRUE,FALSE`
    },
    {
      id: 'ds-01-2',
      name: 'Suspect Telemetry & Toll Records',
      filename: 'suspect_telemetry.csv',
      description: 'Fastag highway toll scans, cellular tower registrations, and diner billing timestamps for all three suspects.',
      columns: ['suspect_id', 'suspect_name', 'telemetry_type', 'location_observed', 'timestamp', 'verified_flag'],
      rowCount: 9,
      csvContent: `suspect_id,suspect_name,telemetry_type,location_observed,timestamp,verified_flag
susp-01-1,Aruna Chandran,Wifi Assoc,Hostel Block C,2026-10-14 23:35:10,TRUE
susp-01-1,Aruna Chandran,Door Swipe,Hostel Turnstile,2026-10-14 23:38:00,TRUE
susp-01-1,Aruna Chandran,Cellular,Perungudi Tower 4,2026-10-14 23:45:00,TRUE
susp-01-2,David Muthu,Cellular,Tower Sathyabama North,2026-10-14 23:44:12,TRUE
susp-01-2,David Muthu,Cellular,Tower Sathyabama North,2026-10-14 23:58:33,TRUE
susp-01-2,David Muthu,Diner POS,Velachery Diner,2026-10-15 01:14:00,TRUE
susp-01-2,David Muthu,Diner CCTV,Velachery Diner (Arrived 01:05),2026-10-15 01:05:00,TRUE
susp-01-3,Anand Kumar,Guard Tour Wand,Checkpoint Gate 3,2026-10-14 23:44:50,TRUE
susp-01-3,Anand Kumar,Guard Tour Wand,Checkpoint Admin Block,2026-10-15 00:02:10,TRUE`
    }
  ],
  questions: [
    {
      id: 'q-01-1',
      caseId: 'case-01',
      questionNumber: 1,
      prompt: 'According to the access logs, which specific badge ID was used to gain unauthorized override entry into Archive Room 404 at 23:43:08?',
      type: 'text',
      correctAnswer: 'BADGE-881',
      acceptedAlternates: ['badge-881', '881', 'badge 881'],
      points: 15,
      hint: 'Inspect observatory_access_logs.csv where room_name is Archive Room 404 and override_used is TRUE between 23:40 and 23:50.',
      evidenceRef: 'observatory_access_logs.csv, row 8 (log_id 1008)',
      explanation: 'Log record 1008 shows badge_id BADGE-881 registered at reader RDR-404 at 23:43:08 with override_used = TRUE.'
    },
    {
      id: 'q-01-2',
      caseId: 'case-01',
      questionNumber: 2,
      prompt: 'How many total access events in the dataset had override_used marked as TRUE?',
      type: 'number',
      correctAnswer: 6,
      acceptedAlternates: ['6'],
      points: 15,
      hint: 'Count the number of rows where the override_used column is TRUE in the access log.',
      evidenceRef: 'observatory_access_logs.csv (logs 1008, 1010, 1013, 1014, 1015, and 1017)',
      explanation: 'Filtering override_used == TRUE yields exactly 6 entries in the dataset (logs 1008, 1010, 1013, 1014, 1015, 1017).'
    },
    {
      id: 'q-01-3',
      caseId: 'case-01',
      questionNumber: 3,
      prompt: 'At what exact timestamp did the intruder escape the 4th floor using the Service Elevator (RDR-E02)?',
      type: 'text',
      correctAnswer: '23:57:45',
      acceptedAlternates: ['2026-10-14 23:57:45', '23:57'],
      points: 20,
      hint: 'Look for reader_id RDR-E02 in the access logs.',
      evidenceRef: 'observatory_access_logs.csv, log_id 1010',
      explanation: 'Log 1010 records BADGE-881 accessing RDR-E02 (Service Elevator 4F) at 2026-10-14 23:57:45.'
    },
    {
      id: 'q-01-4',
      caseId: 'case-01',
      questionNumber: 4,
      prompt: 'David Muthu claimed he was dining at Velachery Highway Diner from 23:00 to 01:00. At what time does diner CCTV prove he actually arrived?',
      type: 'text',
      correctAnswer: '01:05:00',
      acceptedAlternates: ['01:05', '01:05:00 IST', '1:05'],
      points: 20,
      hint: 'Check suspect_telemetry.csv for diner CCTV observation.',
      evidenceRef: 'suspect_telemetry.csv, row 7',
      explanation: 'The verified diner CCTV record timestamp is 2026-10-15 01:05:00, proving his alibi was completely fabricated.'
    },
    {
      id: 'q-01-5',
      caseId: 'case-01',
      questionNumber: 5,
      prompt: 'Based on the biometric, RFID, and cellular tower evidence, who is the guilty culprit?',
      type: 'multiple_choice',
      options: ['Aruna Chandran', 'David Muthu', 'Anand Kumar', 'Unknown External Intruder'],
      correctAnswer: 'David Muthu',
      acceptedAlternates: ['David Muthu', 'david muthu'],
      points: 30,
      hint: 'Review which suspect cellular phone connected to Tower Sathyabama North at 23:58:33 and who fled via Service Elevator 2.',
      evidenceRef: 'Telemetry logs + Access logs 1008-1011',
      explanation: 'David Muthu used his master admin RFID override to enter Room 404 at 23:43, killed the victim at ~23:55, took Elevator 2 at 23:57 to the basement, and his phone pinged the campus tower at 23:58.'
    }
  ],
  passingScore: 70
};
