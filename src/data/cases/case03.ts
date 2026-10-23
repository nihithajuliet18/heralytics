import { CrimeCase } from '../../types';

export const case03: CrimeCase = {
  id: 'case-03',
  caseNumber: 3,
  code: 'CASE-03',
  title: 'The Phantom Transfer',
  incidentType: 'Corporate Embezzlement / Wire Fraud',
  location: 'Sathyabama Treasury & Endowment Finance Portal, Administration Block',
  dateOfIncident: 'October 16, 2026 — 03:14 IST',
  leadInvestigator: 'Inspector K. Sumanth (Economic Offences Wing)',
  difficulty: 'Elementary',
  summary:
    'During the quiet hours of Sunday dawn, an automated wire batch transferred 1.45 Crore INR from the Student Merit Scholarship Endowment to an offshore beneficiary named "Zenith Horizon FZE". The transaction bypassed dual-approval segregation of duties through a forged authorization session initiated from an unknown VPN IP address.',
  incidentDetails:
    'The university endowment fund operates under strict dual-custody policy: any wire above 25 Lakhs requires initiation by an Accounts Officer and second-factor cryptographic approval by the Chief Financial Officer (CFO). At 03:14 IST, Wire TX-99402 was dispatched for ₹1,45,00,000. Session logs indicate Accounts Officer Shalini credentials were used from Chennai at 02:40, followed 30 minutes later by CFO Harish credentials logging in from an IP in Bucharest, Romania. Did the CFO really travel, or was a session token hijacked via malicious Chrome extension?',
  victimOrEntity: 'Sathyabama University Student Scholarship Endowment Trust',
  timeline: [
    { time: '02:40 IST', event: 'Initiation session established using user "acct_shalini" from local ISP 117.200.44.12.', source: 'Auth Server' },
    { time: '02:55 IST', event: 'Beneficiary account Zenith Horizon FZE (IBAN RO49AAAA1B31007593840001) added to approved vendor list.', source: 'Database Audit' },
    { time: '03:10 IST', event: 'Second approval logged under user "cfo_harish" from Romanian IP 185.220.101.5.', source: 'VPN Gateway' },
    { time: '03:14 IST', event: 'Wire transfer TX-99402 dispatched via SWIFT gateway.', source: 'Banking Ledger' },
    { time: '08:30 IST', event: 'SBI Forex desk calls CFO to verify emergency multi-currency wire.', source: 'Phone Audit' },
    { time: '08:45 IST', event: 'CFO Harish denies ever approving wire; accounts frozen.', source: 'FIR Filing' }
  ],
  suspects: [
    {
      id: 'susp-03-1',
      name: 'Shalini Raghavan',
      role: 'Junior Accounts Officer',
      alibi: 'Claims she was asleep in her Sholinganallur flat; logged off her work laptop on Friday evening.',
      motive: 'Substantial student educational loan default pending.',
      statement: 'I never logged in at 2 AM. Someone must have phished my password or used remote desktop.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'ACCT-304'
    },
    {
      id: 'susp-03-2',
      name: 'Harish Sundaresan',
      role: 'Chief Financial Officer',
      alibi: 'Was at home in Anna Nagar; physical laptop was in his study connected to home Wi-Fi.',
      motive: 'Recently purchased high-end villa in East Coast Road.',
      statement: 'I never set foot in Romania. If my MFA token approved it, my phone or authenticator app was cloned.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'EXEC-002'
    },
    {
      id: 'susp-03-3',
      name: 'Naveen Balaji',
      role: 'Treasury IT Systems Contractor',
      alibi: 'Scheduled on-call support; claimed he was troubleshooting database replication lags.',
      motive: 'Contract expiring in November with no extension offer; opened offshore account in Bucharest.',
      statement: 'I only monitor server CPU usage and disk volumes. I do not even have banking portal privileges.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'CONT-711'
    }
  ],
  evidence: [
    {
      id: 'ev-03-1',
      itemNumber: 'ITEM-301',
      label: 'Session Cookie Dump File',
      description: 'Extracted from Naveen Balaji workstation temp directory: `cookie_hijack_session_cfo.harish.json` containing active bearer token and IP spoofing headers.',
      foundAt: 'Workstation IT-DESK-42',
      significance: 'Proof Naveen extracted the CFO live session token using an unauthorized packet sniffer on the finance VLAN.',
      chainOfCustody: 'Cyber Cell Inspector Sumanth'
    },
    {
      id: 'ev-03-2',
      itemNumber: 'ITEM-302',
      label: 'Zenith Horizon FZE Beneficiary Form',
      description: 'PDF routing instruction sheet bearing forged digital signature stamp of CFO Harish. Metadata reveals Author: "n_balaji_contractor".',
      foundAt: 'Treasury Upload Directory',
      significance: 'Direct author metadata tying the fraudulent vendor creation to Naveen contractor account.',
      chainOfCustody: 'System Audit Dump'
    }
  ],
  datasets: [
    {
      id: 'ds-03-1',
      name: 'Endowment Wire Transfers Ledger',
      filename: 'endowment_wire_transfers.csv',
      description: 'Complete record of university banking wires processed between Oct 14 and Oct 16.',
      columns: ['tx_id', 'timestamp', 'source_fund', 'dest_iban', 'beneficiary_name', 'amount_inr', 'initiator_user', 'approver_user', 'status'],
      rowCount: 8,
      csvContent: `tx_id,timestamp,source_fund,dest_iban,beneficiary_name,amount_inr,initiator_user,approver_user,status
TX-99395,2026-10-14 11:20:00,Scholarship Trust,IN39SBIN000182449102,TNSC Board Chennai,2450000,acct_shalini,cfo_harish,COMPLETED
TX-99396,2026-10-14 15:45:12,Library Equipment,IN04HDFC000019283741,Elsevier Scientific,820000,acct_shalini,cfo_harish,COMPLETED
TX-99397,2026-10-15 10:10:05,Hostel Catering,IN99ICIC000827364519,Annapurna Caterers,1240000,acct_rajesh,cfo_harish,COMPLETED
TX-99398,2026-10-15 14:02:40,Research Grant DST,IN12BARB000762518290,Thermo Fisher Ltd,3100000,acct_shalini,cfo_harish,COMPLETED
TX-99399,2026-10-15 16:30:00,Campus Solar Phase 2,IN71PUNB000293847102,L&T Power Systems,4500000,acct_rajesh,cfo_harish,COMPLETED
TX-99400,2026-10-15 18:05:22,Student Welfare,IN44CNRB000192837401,Tamil Nadu Transport,380000,acct_shalini,cfo_harish,COMPLETED
TX-99401,2026-10-16 01:15:00,Medical Insurance,IN82UTIB000928374619,Star Health Insurance,640000,acct_rajesh,cfo_harish,COMPLETED
TX-99402,2026-10-16 03:14:18,Scholarship Trust,RO49AAAA1B31007593840001,Zenith Horizon FZE,14500000,acct_shalini,cfo_harish,FLAGGED_FROZEN`
    },
    {
      id: 'ds-03-2',
      name: 'Authentication Sessions & IP Geo Logs',
      filename: 'login_sessions_audit.csv',
      description: 'RADIUS and Web Application firewall session logs for finance portal logins.',
      columns: ['session_id', 'timestamp', 'user_id', 'ip_address', 'geo_location', 'vpn_exit_node', 'device_fingerprint', 'mfa_verified'],
      rowCount: 8,
      csvContent: `session_id,timestamp,user_id,ip_address,geo_location,vpn_exit_node,device_fingerprint,mfa_verified
SESS-801,2026-10-14 11:05:00,acct_shalini,117.200.44.12,Chennai India,NONE,FP-WIN-CH-01,TRUE
SESS-802,2026-10-14 11:15:00,cfo_harish,117.200.44.88,Chennai India,NONE,FP-MAC-AN-02,TRUE
SESS-803,2026-10-15 09:50:00,acct_rajesh,117.200.44.15,Chennai India,NONE,FP-WIN-CH-03,TRUE
SESS-804,2026-10-15 10:05:00,cfo_harish,117.200.44.88,Chennai India,NONE,FP-MAC-AN-02,TRUE
SESS-805,2026-10-16 02:40:10,acct_shalini,185.220.101.5,Bucharest Romania,TOR_RELAY,FP-LINUX-CLONE-99,FALSE
SESS-806,2026-10-16 03:09:44,cfo_harish,185.220.101.5,Bucharest Romania,TOR_RELAY,FP-LINUX-CLONE-99,FALSE
SESS-807,2026-10-16 03:12:05,cont_naveen,10.14.2.19,Campus LAN Sathyabama,NONE,FP-LINUX-CLONE-99,TRUE
SESS-808,2026-10-16 08:35:10,cfo_harish,122.164.21.40,Chennai India,NONE,FP-MAC-AN-02,TRUE`
    }
  ],
  questions: [
    {
      id: 'q-03-1',
      caseId: 'case-03',
      questionNumber: 1,
      prompt: 'What was the exact amount in INR transferred in the fraudulent transaction TX-99402?',
      type: 'number',
      correctAnswer: 14500000,
      acceptedAlternates: ['14500000', '1,45,00,000', '14500000 INR'],
      points: 15,
      hint: 'Find tx_id TX-99402 in endowment_wire_transfers.csv.',
      evidenceRef: 'endowment_wire_transfers.csv, row TX-99402',
      explanation: 'TX-99402 was dispatched for ₹1,45,00,000 (1.45 Crore INR) to Zenith Horizon FZE.'
    },
    {
      id: 'q-03-2',
      caseId: 'case-03',
      questionNumber: 2,
      prompt: 'What was the suspicious foreign IP address used for the unauthorized sessions of both acct_shalini and cfo_harish at ~03:00 AM?',
      type: 'text',
      correctAnswer: '185.220.101.5',
      acceptedAlternates: ['185.220.101.5'],
      points: 20,
      hint: 'Check the ip_address column in login_sessions_audit.csv for sessions SESS-805 and SESS-806.',
      evidenceRef: 'login_sessions_audit.csv, rows SESS-805 and SESS-806',
      explanation: 'Both fraudulent sessions originated from Tor exit node IP 185.220.101.5 in Bucharest.'
    },
    {
      id: 'q-03-3',
      caseId: 'case-03',
      questionNumber: 3,
      prompt: 'What identical device fingerprint (device_fingerprint) was shared between the Tor relay sessions and Naveen internal campus session (SESS-807)?',
      type: 'text',
      correctAnswer: 'FP-LINUX-CLONE-99',
      acceptedAlternates: ['FP-LINUX-CLONE-99', 'fp-linux-clone-99'],
      points: 20,
      hint: 'Compare the device_fingerprint column across sessions SESS-805, SESS-806, and SESS-807.',
      evidenceRef: 'login_sessions_audit.csv',
      explanation: 'SESS-805, SESS-806, and SESS-807 all share the exact browser fingerprint FP-LINUX-CLONE-99.'
    },
    {
      id: 'q-03-4',
      caseId: 'case-03',
      questionNumber: 4,
      prompt: 'Were the MFA verification checks (mfa_verified) bypassed (FALSE) during the fraudulent midnight sessions SESS-805 and SESS-806?',
      type: 'multiple_choice',
      options: ['YES — mfa_verified was FALSE', 'NO — mfa_verified was TRUE', 'MFA was not configured', 'Only CFO passed MFA'],
      correctAnswer: 'YES — mfa_verified was FALSE',
      acceptedAlternates: ['YES — mfa_verified was FALSE', 'YES', 'true', 'yes'],
      points: 15,
      hint: 'Inspect mfa_verified column in login_sessions_audit.csv for SESS-805 and SESS-806.',
      evidenceRef: 'login_sessions_audit.csv',
      explanation: 'Both SESS-805 and SESS-806 show FALSE for mfa_verified because stolen cookies bypassed the login gate.'
    },
    {
      id: 'q-03-5',
      caseId: 'case-03',
      questionNumber: 5,
      prompt: 'Based on the author metadata of the beneficiary PDF (ITEM-302) and device fingerprint correlation, who orchestrated the fraud?',
      type: 'multiple_choice',
      options: ['Shalini Raghavan', 'Harish Sundaresan', 'Naveen Balaji', 'External Romanian Syndicate'],
      correctAnswer: 'Naveen Balaji',
      acceptedAlternates: ['Naveen Balaji', 'naveen balaji'],
      points: 30,
      hint: 'Look at who generated the session cookie dump on workstation IT-DESK-42 and matched device fingerprint FP-LINUX-CLONE-99.',
      evidenceRef: 'ITEM-301, ITEM-302, and login_sessions_audit.csv',
      explanation: 'Naveen Balaji used his admin access to sniff CFO session cookies, routed through a Tor exit node using his Linux machine (FP-LINUX-CLONE-99), and authorized the 1.45 Crore wire to his shell entity.'
    }
  ],
  passingScore: 70
};
