import { CrimeCase } from '../../types';

export const case07: CrimeCase = {
  id: 'case-07',
  caseNumber: 7,
  code: 'CASE-07',
  title: 'The Phantom Cargo',
  incidentType: 'Intermodal Freight Hijacking / Customs Seal Tampering',
  location: 'Ennore Port Intermodal Container Freight Station (CFS) & Depot 4',
  dateOfIncident: 'October 20, 2026 — 04:45 IST',
  leadInvestigator: 'Superintendent G. Raghavan (Customs Preventive Unit)',
  difficulty: 'Intermediate',
  summary:
    'A 40-foot refrigerated intermodal container (MSKU-992104-2) carrying imported high-density enterprise GPU accelerators (appraised at 9.2 Crore INR) arrived at Depot 4 filled with water-filled plastic barrels. The original customs bolt seal had been replaced with an identical replica, and automated weighbridge telemetry reveals a 35-minute unauthorized stop along Old Mahabalipuram Road.',
  incidentDetails:
    'Container MSKU-992104-2 cleared customs inspection at Ennore Container Terminal at 02:15 IST with bolt seal SEAL-IND-8841. The manifest declared 24 palletized racks of NVIDIA H100 computing modules with a net cargo weight of 8,450 kg. The transport truck (TN-04-AX-8912) driven by contractor Hariprasad departed at 02:30 IST for the university computing center. Upon arrival at Depot 4 at 05:15 IST, receiver warehouse engineers opened the container to find 280-liter blue chemical drums filled with saline water. The weight matched within 0.4%, but GPS tracking exposes an off-route halt at a secluded warehouse in Thiruporur.',
  victimOrEntity: 'AI Supercomputing Initiative Consignment #BOL-2026-GPU-88',
  timeline: [
    { time: '02:15 IST', event: 'Container cleared at Ennore Gate 4; bolt seal SEAL-IND-8841 verified.', source: 'Customs Manifest' },
    { time: '02:30 IST', event: 'Truck TN-04-AX-8912 departs Ennore weighbridge (Gross: 24,150 kg).', source: 'Weighbridge Ticket' },
    { time: '03:22 IST', event: 'GPS telemetry goes offline near Vandalur-Kelambakkam junction for 38 minutes.', source: 'Fleet GPS' },
    { time: '04:00 IST', event: 'GPS signal resumes moving north on Rajiv Gandhi Salai (OMR).', source: 'Fleet GPS' },
    { time: '05:15 IST', event: 'Truck arrives at Depot 4. Receiver notes fresh silver paint on container door hinges.', source: 'Receiving Dock' },
    { time: '05:30 IST', event: 'Container unbolted; counterfeit water barrels discovered.', source: 'Customs FIR' }
  ],
  suspects: [
    {
      id: 'susp-07-1',
      name: 'Hariprasad Naidu',
      role: 'Heavy Vehicle Contract Driver',
      alibi: 'Claims his truck suffered a sudden radiator hose rupture near Kelambakkam and he waited for cooling.',
      motive: 'Bank account received a sudden cash deposit of ₹15,00,000 via hawala channels two days prior.',
      statement: 'My engine temperature spiked to red line. I pulled over by the highway tea stall. I never opened the container locks.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'DRV-8821'
    },
    {
      id: 'susp-07-2',
      name: 'E. Karunakaran',
      role: 'Ennore Port Customs Weighmaster',
      alibi: 'On continuous duty in Weighbridge Booth 2.',
      motive: 'High lifestyle inconsistent with government salary.',
      statement: 'Every container was zeroed on the load cells. Scale 2 was calibrated on October 1st by the Metrology Bureau.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'WM-04'
    },
    {
      id: 'susp-07-3',
      name: 'Balaji Venkatesh',
      role: 'Depot 4 Inward Receiving Manager',
      alibi: 'Logged in at receiving console reviewing bill of lading forms.',
      motive: 'Brother operates an independent computer hardware reseller in Ritchie Street.',
      statement: 'I noticed the hinge pins had grinding marks immediately. I did not sign the delivery note and called Customs straight away.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'REC-301'
    }
  ],
  evidence: [
    {
      id: 'ev-07-1',
      itemNumber: 'ITEM-701',
      label: 'Counterfeit Customs Bolt Seal',
      description: 'High-tensile steel container seal embossed with forged letters "SEAL-IND-8841". Metallurgical analysis shows cheap mild steel rather than certified hardened boron carbide.',
      foundAt: 'Depot 4 Unloading Bay',
      significance: 'Confirms the container was opened and resealed during transit using pre-fabricated counterfeit seals.',
      chainOfCustody: 'Customs Inspector Raghavan'
    },
    {
      id: 'ev-07-2',
      itemNumber: 'ITEM-702',
      label: 'Water Barrel Fill Hose & Saline Residue',
      description: 'Found inside abandoned Thiruporur godown during raid. Contains saline concentration matching the water barrels inside container MSKU-992104-2.',
      foundAt: 'Godown #12, Thiruporur Industrial Estate',
      significance: 'Pinpoints the exact location where the GPU pallets were transferred to an outbound container truck.',
      chainOfCustody: 'Preventive Unit Special Squad'
    }
  ],
  datasets: [
    {
      id: 'ds-07-1',
      name: 'Container Cargo Manifests & Seal Registry',
      filename: 'drydock_cargo_manifests.csv',
      description: 'Official bills of lading, declared weights, authorized seals, and consignee data.',
      columns: ['container_id', 'bill_of_lading', 'consignee', 'declared_cargo', 'declared_kg', 'customs_seal_id', 'depot_destination'],
      rowCount: 6,
      csvContent: `container_id,bill_of_lading,consignee,declared_cargo,declared_kg,customs_seal_id,depot_destination
MSKU-992101-0,BOL-2026-CH-01,Madras Medical Mission,MRI Magnetic Coils,14200,SEAL-IND-8838,Depot 1
MSKU-992102-5,BOL-2026-CH-02,Ashok Leyland Engine Div,Engine Castings,21400,SEAL-IND-8839,Depot 2
MSKU-992103-7,BOL-2026-CH-03,Hyundai Motors Tamil Nadu,Robotic Arms,11800,SEAL-IND-8840,Depot 3
MSKU-992104-2,BOL-2026-GPU-88,Sathyabama Supercomputing,NVIDIA H100 Modules,8450,SEAL-IND-8841,Depot 4
MSKU-992105-8,BOL-2026-CH-05,IIT Research Park,Lithium Battery Cells,9200,SEAL-IND-8842,Depot 1
MSKU-992106-3,BOL-2026-CH-06,Apollo Hospitals Chennai,Ultrasound Transducers,5600,SEAL-IND-8843,Depot 4`
    },
    {
      id: 'ds-07-2',
      name: 'Weighbridge Load Cell Readings & Gate Audits',
      filename: 'weighbridge_scale_logs.csv',
      description: 'Ennore exit scale vs Depot 4 entry scale weight records.',
      columns: ['ticket_id', 'container_id', 'truck_plate', 'scale_location', 'gross_weight_kg', 'tare_weight_kg', 'net_cargo_kg', 'timestamp'],
      rowCount: 6,
      csvContent: `ticket_id,container_id,truck_plate,scale_location,gross_weight_kg,tare_weight_kg,net_cargo_kg,timestamp
WB-7701,MSKU-992101-0,TN-04-AB-1200,Ennore Gate 4,29900,15700,14200,2026-10-20 01:45:00
WB-7702,MSKU-992104-2,TN-04-AX-8912,Ennore Gate 4,24150,15700,8450,2026-10-20 02:30:15
WB-7703,MSKU-992103-7,TN-22-CY-4411,Ennore Gate 4,27500,15700,11800,2026-10-20 02:45:00
WB-7704,MSKU-992101-0,TN-04-AB-1200,Depot 1 Entry,29890,15700,14190,2026-10-20 03:30:00
WB-7705,MSKU-992103-7,TN-22-CY-4411,Depot 3 Entry,27495,15700,11795,2026-10-20 04:10:00
WB-7706,MSKU-992104-2,TN-04-AX-8912,Depot 4 Entry,24185,15700,8485,2026-10-20 05:15:30`
    },
    {
      id: 'ds-07-3',
      name: 'Truck Telemetry & Route En-Route Stops',
      filename: 'truck_telemetry_stops.csv',
      description: 'Fleet GPS transit logs, expected transit times, and unauthorized geo-fence breaks.',
      columns: ['trip_id', 'truck_plate', 'expected_minutes', 'actual_minutes', 'unauthorized_stop_duration_min', 'stop_coordinates', 'driver_name'],
      rowCount: 4,
      csvContent: `trip_id,truck_plate,expected_minutes,actual_minutes,unauthorized_stop_duration_min,stop_coordinates,driver_name
TRIP-101,TN-04-AB-1200,60,60,0,NONE,S. Murugesan
TRIP-102,TN-22-CY-4411,85,85,0,NONE,K. Chandran
TRIP-103,TN-04-AX-8912,75,165,38,12.7911 N 80.2014 E (Thiruporur),Hariprasad Naidu
TRIP-104,TN-05-DE-9901,90,95,5,Puzhal Toll Plaza,R. Govind`
    }
  ],
  questions: [
    {
      id: 'q-07-1',
      caseId: 'case-07',
      questionNumber: 1,
      prompt: 'What was the specific Container ID carrying the stolen NVIDIA H100 computing modules?',
      type: 'text',
      correctAnswer: 'MSKU-992104-2',
      acceptedAlternates: ['msku-992104-2', 'MSKU 992104-2'],
      points: 15,
      hint: 'Find bill_of_lading BOL-2026-GPU-88 in drydock_cargo_manifests.csv.',
      evidenceRef: 'drydock_cargo_manifests.csv, row 4',
      explanation: 'Container MSKU-992104-2 carried the declared NVIDIA H100 modules for Sathyabama Supercomputing.'
    },
    {
      id: 'q-07-2',
      caseId: 'case-07',
      questionNumber: 2,
      prompt: 'What was the declared cargo weight in kg (declared_kg) for container MSKU-992104-2?',
      type: 'number',
      correctAnswer: 8450,
      acceptedAlternates: ['8450', '8,450', '8450 kg'],
      points: 15,
      hint: 'Look at declared_kg for MSKU-992104-2 in drydock_cargo_manifests.csv.',
      evidenceRef: 'drydock_cargo_manifests.csv, row 4',
      explanation: 'The declared cargo weight was 8,450 kg.'
    },
    {
      id: 'q-07-3',
      caseId: 'case-07',
      questionNumber: 3,
      prompt: 'What was the net cargo weight in kg recorded at Depot 4 entry scale (ticket WB-7706) for truck TN-04-AX-8912?',
      type: 'number',
      correctAnswer: 8485,
      acceptedAlternates: ['8485', '8485 kg'],
      points: 20,
      hint: 'Inspect ticket WB-7706 in weighbridge_scale_logs.csv.',
      evidenceRef: 'weighbridge_scale_logs.csv, row WB-7706',
      explanation: 'The entry scale recorded 8,485 kg (35 kg heavier than the original 8,450 kg due to water barrel ballast weight).'
    },
    {
      id: 'q-07-4',
      caseId: 'case-07',
      questionNumber: 4,
      prompt: 'According to truck_telemetry_stops.csv, how many minutes did truck TN-04-AX-8912 spend at the unauthorized stop in Thiruporur?',
      type: 'number',
      correctAnswer: 38,
      acceptedAlternates: ['38', '38 minutes'],
      points: 20,
      hint: 'Examine unauthorized_stop_duration_min for TRIP-103.',
      evidenceRef: 'truck_telemetry_stops.csv, TRIP-103',
      explanation: 'Truck TN-04-AX-8912 stopped for exactly 38 minutes at coordinates 12.7911 N 80.2014 E.'
    },
    {
      id: 'q-07-5',
      caseId: 'case-07',
      questionNumber: 5,
      prompt: 'Who was the driver who diverted the cargo to swap the GPUs for water barrels?',
      type: 'multiple_choice',
      options: ['Hariprasad Naidu', 'E. Karunakaran', 'Balaji Venkatesh', 'S. Murugesan'],
      correctAnswer: 'Hariprasad Naidu',
      acceptedAlternates: ['Hariprasad Naidu', 'hariprasad naidu'],
      points: 30,
      hint: 'Correlate driver of truck TN-04-AX-8912, the 38-minute diversion, and the forged seal ITEM-701.',
      evidenceRef: 'TRIP-103 + ITEM-701 + WB-7702/7706',
      explanation: 'Driver Hariprasad Naidu diverted his truck to the Thiruporur godown, where accomplices transferred the GPUs and loaded water barrels calibrated to simulate the exact mass before resealing with a fake bolt seal.'
    }
  ],
  passingScore: 70
};
