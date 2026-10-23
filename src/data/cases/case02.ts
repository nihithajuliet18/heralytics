import { CrimeCase } from '../../types';

export const case02: CrimeCase = {
  id: 'case-02',
  caseNumber: 2,
  code: 'CASE-02',
  title: 'The Vanishing Diamond',
  incidentType: 'Grand Larceny / Vault Security Compromise',
  location: 'Heritage Archive & Mineralogy Vault B-1, Geology Department',
  dateOfIncident: 'October 15, 2026 — 14:15 IST',
  leadInvestigator: 'Inspector P. Meenakshi (Special Crime Branch)',
  difficulty: 'Beginner',
  summary:
    'The 42-carat "Crown of Coromandel" uncut blue diamond vanished from display vault B-1 during a scheduled university VIP exhibition. A brief 180-second closed-circuit security glitch occurred between 14:10 and 14:13 IST. Inventory reconciliation reveals the replica stone left in its place was 4.2 grams lighter. Cross-referencing visitor exit weight differentials and camera outage records points directly to the inside thief.',
  incidentDetails:
    'During the International Earth Sciences Conclave, the Crown of Coromandel (Asset TAG-DIA-042, appraised at 18 Crore INR) was displayed in an alarm-wired nitrogen glass case. At 14:35 IST, an acoustic vibration sensor alarm triggered during routine glass wiping. Inspection revealed the case had been unsealed with a mechanical key and the diamond swapped for synthetic cubic zirconia. Camera 04 (Vault Entrance) experienced deliberate power starvation, and visitor bag scales flagged an anomaly on one departing official.',
  victimOrEntity: 'Sathyabama University Heritage Mineralogy Collection',
  timeline: [
    { time: '13:00 IST', event: 'Vault B-1 opened for registered conclave delegation.', source: 'Curator Log' },
    { time: '13:45 IST', event: 'Midday weight calibration sensor registers standard 8.40g mass on pedestal 3.', source: 'Pedestal Sensor' },
    { time: '14:10 IST', event: 'Power breaker 7 tripped; Cameras 04 and 05 go dark for 180 seconds.', source: 'Security System' },
    { time: '14:13 IST', event: 'Auxiliary backup generator kicks in; video feeds restored. Case appears visually intact.', source: 'Guard Desk' },
    { time: '14:24 IST', event: 'VIP delegation departs through security screening checkpoint gate.', source: 'Turnstile Log' },
    { time: '14:35 IST', event: 'Cleaning crew notices acoustic tamper seal broken; vault lockdown initiated.', source: 'Emergency Dispatch' }
  ],
  suspects: [
    {
      id: 'susp-02-1',
      name: 'Dr. Vikram Seth',
      role: 'Guest Mineralogy Evaluator & Gemologist',
      alibi: 'Claims he was admiring the meteorite collection in the adjoining North Hall during the blackout.',
      motive: 'Facing substantial personal debts from speculative gemstone trading in Antwerp.',
      statement: 'I heard the power dip, but I had my laser pointer on the chondrite exhibit. You can ask Professor Nathan who was standing near me.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'VIP-902'
    },
    {
      id: 'susp-02-2',
      name: 'Radha Sundaram',
      role: 'Associate Curator & Keyholder',
      alibi: 'Stationed behind the master registry desk throughout the tour.',
      motive: 'Passed over for head curator promotion.',
      statement: 'I never let the physical key ring leave my neck lanyard. But while the lights were out, someone bumped into my chair hard.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'CUR-012'
    },
    {
      id: 'susp-02-3',
      name: 'T. Murugan',
      role: 'Electrical Maintenance Technician',
      alibi: 'Dispatched to breaker room after power trip.',
      motive: 'Brother works for an uncertified pawn brokerage in Sowcarpet.',
      statement: 'Breaker 7 tripped on overload because someone plugged a high-amp heat gun into socket 4.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'TECH-108'
    }
  ],
  evidence: [
    {
      id: 'ev-02-1',
      itemNumber: 'ITEM-201',
      label: 'Substituted Replica Stone',
      description: 'Cubic zirconia replica measuring 22mm x 18mm. Laser-etched counterfeit serial "CC-420-EXP". Pedestal weight reading: 4.20g (actual diamond weight was 8.40g).',
      foundAt: 'Pedestal 3, Vault B-1',
      significance: 'Proof of premeditated swap; swap perpetrator had to carry an exact dimension replica.',
      chainOfCustody: 'Senior Curator Nathan -> Meenakshi'
    },
    {
      id: 'ev-02-2',
      itemNumber: 'ITEM-202',
      label: 'Concealed Hollowed-Out Geological Loupe',
      description: 'Found inside Dr. Vikram Seth discarded briefcase at screening gate. Internal spring-loaded cavity exactly matches 42-carat diamond diameter.',
      foundAt: 'Checkpoint B Inspection Bin',
      significance: 'Direct physical instrumentality for smuggling uncut diamonds past metal detectors.',
      chainOfCustody: 'Checkpoint Guard -> Forensic Lab'
    }
  ],
  datasets: [
    {
      id: 'ds-02-1',
      name: 'Vault Inventory & Pedestal Audit',
      filename: 'vault_inventory.csv',
      description: 'Audit records of display items in Vault B-1 including asset tags, genuine carat weights, and sensor readings.',
      columns: ['item_id', 'item_name', 'carat_weight', 'display_pedestal', 'expected_mass_g', 'measured_mass_g', 'alarm_state'],
      rowCount: 8,
      csvContent: `item_id,item_name,carat_weight,display_pedestal,expected_mass_g,measured_mass_g,alarm_state
TAG-DIA-042,Crown of Coromandel,42.0,PEDESTAL-03,8.40,4.20,TAMPER_TRIGGERED
TAG-EME-015,Tanjore Emerald Brooch,15.2,PEDESTAL-01,3.04,3.04,NORMAL
TAG-RUB-028,Burmese Star Ruby,28.4,PEDESTAL-02,5.68,5.68,NORMAL
TAG-SAP-060,Kashmir Royal Sapphire,60.1,PEDESTAL-04,12.02,12.02,NORMAL
TAG-OPL-080,Queensland Fire Opal,80.5,PEDESTAL-05,16.10,16.10,NORMAL
TAG-MET-250,Allende Meteorite Slice,250.0,PEDESTAL-06,50.00,50.00,NORMAL
TAG-PEA-030,Tuticorin Natural Pearl,30.0,PEDESTAL-07,6.00,6.00,NORMAL
TAG-JAD-110,Imperial Jadeite Pendant,110.0,PEDESTAL-08,22.00,22.00,NORMAL`
    },
    {
      id: 'ds-02-2',
      name: 'Exhibition Visitor Registry & Weight Screening',
      filename: 'visitor_registry.csv',
      description: 'Visitor badges, entry timestamps, exit timestamps, and exit scale tare differential readings.',
      columns: ['badge_id', 'visitor_name', 'affiliation', 'entry_time', 'exit_time', 'bag_weight_in_g', 'bag_weight_out_g', 'weight_delta_g'],
      rowCount: 10,
      csvContent: `badge_id,visitor_name,affiliation,entry_time,exit_time,bag_weight_in_g,bag_weight_out_g,weight_delta_g
VIP-901,Prof. K. Nathan,IIT Madras,13:05,14:24,1420,1418,-2
VIP-902,Dr. Vikram Seth,Antwerp Gem Labs,13:08,14:25,1850,1854,+4
VIP-903,Dr. Elena Rostov,Moscow Mining Inst,13:10,14:22,2100,2095,-5
VIP-904,Rajeshwari Iyer,State Museum,13:12,14:28,950,950,0
VIP-905,Marcus Vance,De Beers Consultant,13:15,14:20,3200,3198,-2
VIP-906,Dr. Sunita Rao,Osmania University,13:15,14:23,1650,1650,0
CUR-012,Radha Sundaram,Staff Curator,12:45,15:00,820,820,0
TECH-108,T. Murugan,Facilities Maintenance,14:11,14:40,4500,4500,0
SEC-004,G. Selvam,Security Lead,12:30,16:00,1200,1200,0
GUEST-11,Ananya Deshmukh,Press Reporter,13:20,14:18,2400,2398,-2`
    },
    {
      id: 'ds-02-3',
      name: 'Security Camera Outage Log',
      filename: 'security_glitch_events.csv',
      description: 'Camera sensor heartbeat logs recorded during breaker 7 failure.',
      columns: ['event_id', 'camera_id', 'coverage_sector', 'status', 'start_time', 'end_time', 'blackout_seconds'],
      rowCount: 5,
      csvContent: `event_id,camera_id,coverage_sector,status,start_time,end_time,blackout_seconds
EVT-81,CAM-01,Outer Lobby,OPERATIONAL,14:10:00,14:13:00,0
EVT-82,CAM-02,North Hall Meteorites,OPERATIONAL,14:10:00,14:13:00,0
EVT-83,CAM-03,South Mineral Hall,OPERATIONAL,14:10:00,14:13:00,0
EVT-84,CAM-04,Vault B-1 Primary Door,FEED_LOST,14:10:02,14:13:02,180
EVT-85,CAM-05,Vault B-1 Display Pedestals,FEED_LOST,14:10:02,14:13:02,180`
    }
  ],
  questions: [
    {
      id: 'q-02-1',
      caseId: 'case-02',
      questionNumber: 1,
      prompt: 'What was the exact discrepancy in grams between the expected mass and measured mass of the Crown of Coromandel (TAG-DIA-042)?',
      type: 'number',
      correctAnswer: 4.2,
      acceptedAlternates: ['4.20', '4.2g'],
      points: 15,
      hint: 'Subtract measured_mass_g from expected_mass_g for TAG-DIA-042 in vault_inventory.csv.',
      evidenceRef: 'vault_inventory.csv, row 1',
      explanation: 'Expected mass was 8.40g; measured mass was 4.20g. Discrepancy is exactly 4.20g.'
    },
    {
      id: 'q-02-2',
      caseId: 'case-02',
      questionNumber: 2,
      prompt: 'Which security cameras suffered a 180-second FEED_LOST outage starting at 14:10:02?',
      type: 'multiple_choice',
      options: ['CAM-01 and CAM-02', 'CAM-02 and CAM-03', 'CAM-04 and CAM-05', 'All five cameras'],
      correctAnswer: 'CAM-04 and CAM-05',
      acceptedAlternates: ['CAM-04 and CAM-05', 'CAM-04, CAM-05'],
      points: 20,
      hint: 'Inspect security_glitch_events.csv for status == FEED_LOST.',
      evidenceRef: 'security_glitch_events.csv, events EVT-84 and EVT-85',
      explanation: 'Only CAM-04 (Vault B-1 Door) and CAM-05 (Vault B-1 Display Pedestals) suffered feed blackout.'
    },
    {
      id: 'q-02-3',
      caseId: 'case-02',
      questionNumber: 3,
      prompt: 'Which visitor registered a positive weight differential (weight_delta_g = +4) upon exiting the screening checkpoint?',
      type: 'text',
      correctAnswer: 'Dr. Vikram Seth',
      acceptedAlternates: ['Vikram Seth', 'VIP-902', 'vikram seth'],
      points: 20,
      hint: 'Sort visitor_registry.csv by weight_delta_g descending.',
      evidenceRef: 'visitor_registry.csv, row 2 (VIP-902)',
      explanation: 'Dr. Vikram Seth entered with bag weight 1850g and exited with 1854g (+4g net increase, matching the stolen diamond net gain after leaving the lighter faux stone).'
    },
    {
      id: 'q-02-4',
      caseId: 'case-02',
      questionNumber: 4,
      prompt: 'How many total visitors in the registry exited before the power outage ended at 14:13:02?',
      type: 'number',
      correctAnswer: 0,
      acceptedAlternates: ['0', 'zero'],
      points: 15,
      hint: 'Examine the exit_time column in visitor_registry.csv.',
      evidenceRef: 'visitor_registry.csv exit_time column',
      explanation: 'The earliest exit was GUEST-11 at 14:18. Zero visitors exited before 14:13:02.'
    },
    {
      id: 'q-02-5',
      caseId: 'case-02',
      questionNumber: 5,
      prompt: 'Who is the culprit responsible for stealing the Crown of Coromandel?',
      type: 'multiple_choice',
      options: ['Dr. Vikram Seth', 'Radha Sundaram', 'T. Murugan', 'Marcus Vance'],
      correctAnswer: 'Dr. Vikram Seth',
      acceptedAlternates: ['Dr. Vikram Seth', 'vikram seth'],
      points: 30,
      hint: 'Correlate the loupe evidence ITEM-202, weight delta +4g, and badge VIP-902.',
      evidenceRef: 'ITEM-202 + visitor_registry.csv row VIP-902',
      explanation: 'Dr. Vikram Seth used the 3-minute blackout to swap the genuine diamond with cubic zirconia, concealed it in his modified loupe, and was intercepted with a +4g weight anomaly.'
    }
  ],
  passingScore: 70
};
