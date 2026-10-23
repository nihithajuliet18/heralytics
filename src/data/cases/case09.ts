import { CrimeCase } from '../../types';

export const case09: CrimeCase = {
  id: 'case-09',
  caseNumber: 9,
  code: 'CASE-09',
  title: 'The Silent Breach',
  incidentType: 'Advanced Persistent Threat (APT) / Database Exfiltration',
  location: 'Sathyabama Data Center & High-Performance Cloud Cluster (Tier-3)',
  dateOfIncident: 'October 22, 2026 — 02:45 IST',
  leadInvestigator: 'Chief Information Security Officer (CISO) A. K. Sundar & CERT-In',
  difficulty: 'Intermediate',
  summary:
    'A sophisticated cyber intrusion breached the central Oracle research database cluster containing classified national defense robotics telemetry. The adversary established persistence using an orphaned SSH key on a bastion jumpbox, staged a 4.8 GB encrypted tarball in `/var/tmp/.syslogd_cache`, and exfiltrated it over DNS tunneling and HTTPS port 8443.',
  incidentDetails:
    'At 02:45 IST, an egress netflow alert triggered on the edge firewall: a burst of outbound traffic totaling 4,812,000,000 bytes was streamed to external IP 194.26.29.112 (a bulletproof hosting provider in Netherlands). Forensic audit of the bastion server `/var/log/auth.log` revealed an SSH session under decommissioned contractor account "svc_deploy" authenticated with a private key that had supposedly been revoked six months ago.',
  victimOrEntity: 'Autonomous Marine Robotics Research Repository (Project SAGAR-DRIVE)',
  timeline: [
    { time: '01:10 IST', event: 'Port scan and TLS probing detected against Bastion Host 10.0.1.5.', source: 'IDS Snort Log' },
    { time: '01:34 IST', event: 'SSH session established on Bastion using revoked key SHA256:7mK9p... under account "svc_deploy".', source: 'SSH Bastion Log' },
    { time: '02:05 IST', event: 'Database dump executed via mysqldump piping to GPG symmetric encryption tool.', source: 'Process Accounting' },
    { time: '02:30 IST', event: 'Archive `/var/tmp/.syslogd_cache/telemetry_sagar.tar.gz.enc` created (4.81 GB).', source: 'Auditd Kernel Log' },
    { time: '02:45 IST', event: 'Exfiltration stream initiates over outbound TCP port 8443 to IP 194.26.29.112.', source: 'Edge Firewall' },
    { time: '03:15 IST', event: 'CISO initiates automated quarantine; server severed from campus backbone.', source: 'SOC Incident Queue' }
  ],
  suspects: [
    {
      id: 'susp-09-1',
      name: 'Varun Someshwar',
      role: 'Former Cloud Infrastructure Architect',
      alibi: 'Relocated to Hyderabad in August; claims he surrendered all hardware and VPN tokens.',
      motive: 'Hired by an overseas defense consulting firm with massive performance bonuses for robotics telemetry.',
      statement: 'I resigned in August and deleted my local keys. If svc_deploy was active, the campus DevOps team forgot to decommission it.',
      isCulprit: true,
      status: 'prime_suspect',
      badgeNumber: 'DEV-889'
    },
    {
      id: 'susp-09-2',
      name: 'Nisha Pillai',
      role: 'Lead Database Administrator',
      alibi: 'Sleeping at home; phone on do-not-disturb mode until SOC alert woke her at 03:20.',
      motive: 'Recent performance review dispute with CISO.',
      statement: 'My personal admin key was not touched. The intruder did not even log in as dba_nisha; they used an OS level pipeline.',
      isCulprit: false,
      status: 'cleared',
      badgeNumber: 'DBA-102'
    },
    {
      id: 'susp-09-3',
      name: 'K. Balan',
      role: 'Junior SOC Night Analyst',
      alibi: 'Monitoring Tier-1 dashboard alarms in the campus Operations Center.',
      motive: 'Accused of sleeping through the initial 01:10 IDS warnings.',
      statement: 'The initial port scans looked like routine automated bot traffic from Shodan. I only escalated when the 4GB outbound alert spiked.',
      isCulprit: false,
      status: 'person_of_interest',
      badgeNumber: 'SOC-312'
    }
  ],
  evidence: [
    {
      id: 'ev-09-1',
      itemNumber: 'ITEM-901',
      label: 'Orphaned SSH Key Registry File',
      description: 'Extracted from bastion `.ssh/authorized_keys`. Key comment: `varun@zenbook-hyd-2026`. Fingerprint `SHA256:7mK9pX81mQvL0192` matched Varun personal laptop key generated in June.',
      foundAt: 'Bastion Server `/home/svc_deploy/.ssh`',
      significance: 'Direct cryptographic attribution connecting the breach to Varun personal laptop.',
      chainOfCustody: 'CISO Sundar -> CERT-In Forensic Team'
    },
    {
      id: 'ev-09-2',
      itemNumber: 'ITEM-902',
      label: 'Exfiltration Destination Host Record',
      description: 'WHOIS and BGP routing record for 194.26.29.112. Registered under pseudonym "Hydra Defense Tech" with billing credit card linked to Varun secondary bank account.',
      foundAt: 'Europol Threat Intelligence Portal',
      significance: 'Direct financial and infrastructural ownership of the receiver server.',
      chainOfCustody: 'International Cyber Interpol Liaison'
    }
  ],
  datasets: [
    {
      id: 'ds-09-1',
      name: 'Core Firewall Egress Flows',
      filename: 'core_firewall_flows.csv',
      description: 'Edge firewall session records, protocol classifications, and outbound byte counts.',
      columns: ['flow_id', 'timestamp', 'src_ip', 'dest_ip', 'dest_port', 'protocol', 'bytes_transferred', 'threat_severity'],
      rowCount: 8,
      csvContent: `flow_id,timestamp,src_ip,dest_ip,dest_port,protocol,bytes_transferred,threat_severity
FLOW-901,2026-10-22 01:10:04,185.191.171.12,10.0.1.5,22,TCP,4200,INFO_SCAN
FLOW-902,2026-10-22 01:34:11,103.112.44.18,10.0.1.5,22,TCP,89000,MEDIUM_AUTH
FLOW-903,2026-10-22 02:15:00,10.0.1.5,10.0.2.14,3306,TCP,540000000,INTERNAL_DUMP
FLOW-904,2026-10-22 02:45:22,10.0.1.5,194.26.29.112,8443,TCP,4812000000,CRITICAL_EXFIL
FLOW-905,2026-10-22 03:00:15,10.0.1.10,8.8.8.8,53,UDP,1450,NORMAL
FLOW-906,2026-10-22 03:05:40,10.0.1.12,142.250.190.46,443,TCP,24000,NORMAL
FLOW-907,2026-10-22 03:14:10,10.0.1.5,194.26.29.112,8443,TCP,12000,CRITICAL_EXFIL
FLOW-908,2026-10-22 03:16:00,10.0.1.5,0.0.0.0,0,ALL,0,ISOLATION_APPLIED`
    },
    {
      id: 'ds-09-2',
      name: 'SSH Bastion Authentication & Command Audit',
      filename: 'ssh_bastion_logins.csv',
      description: 'Authentication methods, SSH key fingerprints, user accounts, and sudo invocations.',
      columns: ['login_id', 'timestamp', 'user_account', 'src_ip', 'auth_method', 'ssh_key_fingerprint', 'sudo_invoked', 'session_minutes'],
      rowCount: 6,
      csvContent: `login_id,timestamp,user_account,src_ip,auth_method,ssh_key_fingerprint,sudo_invoked,session_minutes
SSH-101,2026-10-21 16:00:00,dba_nisha,10.14.0.12,PUBLIC_KEY,SHA256:np8912mQkL004,NO,45
SSH-102,2026-10-21 18:30:10,sys_admin_k,10.14.0.18,PUBLIC_KEY,SHA256:kk44901oLmP99,YES,20
SSH-103,2026-10-22 01:34:11,svc_deploy,103.112.44.18,PUBLIC_KEY,SHA256:7mK9pX81mQvL0192,YES,102
SSH-104,2026-10-22 02:40:00,soc_balan,10.14.2.04,PASSWORD,NONE,NO,15
SSH-105,2026-10-22 03:15:30,ciso_sundar,10.14.0.01,HARDWARE_TOKEN,SHA256:ciso881920xx44,YES,60
SSH-106,2026-10-22 03:18:00,sys_admin_k,10.14.0.18,PUBLIC_KEY,SHA256:kk44901oLmP99,YES,40`
    },
    {
      id: 'ds-09-3',
      name: 'Staged Exfiltration Archives',
      filename: 'exfil_staging_archives.csv',
      description: 'Filesystem staging discovery details and encryption markers.',
      columns: ['staging_id', 'file_path', 'byte_size', 'created_at', 'sha256_prefix', 'encryption_cipher'],
      rowCount: 4,
      csvContent: `staging_id,file_path,byte_size,created_at,sha256_prefix,encryption_cipher
STG-01,/var/tmp/.syslogd_cache/telemetry_sagar.tar.gz.enc,4812000000,2026-10-22 02:30:11,9e01fbc4,AES-256-GCM
STG-02,/var/tmp/.syslogd_cache/export_keys.pem,4096,2026-10-22 02:31:00,11da8842,RSA-4096
STG-03,/tmp/netcat_tunnel.sh,1240,2026-10-22 02:35:10,dd381900,PLAINTEXT_BASH
STG-04,/var/log/audit/audit.log.1,894000,2026-10-22 03:10:00,33cb4190,NONE`
    }
  ],
  questions: [
    {
      id: 'q-09-1',
      caseId: 'case-09',
      questionNumber: 1,
      prompt: 'What was the external destination IP address (dest_ip) where 4,812,000,000 bytes were exfiltrated on port 8443?',
      type: 'text',
      correctAnswer: '194.26.29.112',
      acceptedAlternates: ['194.26.29.112'],
      points: 15,
      hint: 'Inspect flow FLOW-904 in core_firewall_flows.csv.',
      evidenceRef: 'core_firewall_flows.csv, row FLOW-904',
      explanation: 'Flow FLOW-904 transferred 4,812,000,000 bytes to Netherlands IP 194.26.29.112.'
    },
    {
      id: 'q-09-2',
      caseId: 'case-09',
      questionNumber: 2,
      prompt: 'What decommissioned user account (user_account) was used in session SSH-103 to compromise the bastion host?',
      type: 'text',
      correctAnswer: 'svc_deploy',
      acceptedAlternates: ['svc_deploy', 'SVC_DEPLOY'],
      points: 15,
      hint: 'Look at row SSH-103 in ssh_bastion_logins.csv.',
      evidenceRef: 'ssh_bastion_logins.csv, row SSH-103',
      explanation: 'Account svc_deploy was authenticated via public key at 01:34:11.'
    },
    {
      id: 'q-09-3',
      caseId: 'case-09',
      questionNumber: 3,
      prompt: 'What was the exact byte size (byte_size) of the encrypted staging archive `telemetry_sagar.tar.gz.enc`?',
      type: 'number',
      correctAnswer: 4812000000,
      acceptedAlternates: ['4812000000', '4,812,000,000', '4.812 GB'],
      points: 20,
      hint: 'Find STG-01 in exfil_staging_archives.csv.',
      evidenceRef: 'exfil_staging_archives.csv, row STG-01',
      explanation: 'The staging archive byte size was exactly 4,812,000,000 bytes.'
    },
    {
      id: 'q-09-4',
      caseId: 'case-09',
      questionNumber: 4,
      prompt: 'What was the SSH key fingerprint prefix (first 10 characters) used in session SSH-103?',
      type: 'text',
      correctAnswer: 'SHA256:7mK',
      acceptedAlternates: ['SHA256:7mK9pX81mQvL0192', 'SHA256:7mK9', 'SHA256:7mK'],
      points: 20,
      hint: 'Inspect ssh_key_fingerprint for SSH-103 in ssh_bastion_logins.csv.',
      evidenceRef: 'ssh_bastion_logins.csv, SSH-103',
      explanation: 'The key fingerprint begins with SHA256:7mK9pX81mQvL0192.'
    },
    {
      id: 'q-09-5',
      caseId: 'case-09',
      questionNumber: 5,
      prompt: 'Who was the former cloud architect responsible for staging and exfiltrating the defense robotics data?',
      type: 'multiple_choice',
      options: ['Varun Someshwar', 'Nisha Pillai', 'K. Balan', 'Unknown Russian APT Group'],
      correctAnswer: 'Varun Someshwar',
      acceptedAlternates: ['Varun Someshwar', 'varun someshwar'],
      points: 30,
      hint: 'Review key comment in ITEM-901 and server ownership in ITEM-902.',
      evidenceRef: 'ITEM-901 + ITEM-902 + SSH-103',
      explanation: 'Varun Someshwar retained his unrevoked personal SSH key from his time as Cloud Architect, authenticated as svc_deploy, and dumped the defense database to a server he privately leased in the Netherlands.'
    }
  ],
  passingScore: 70
};
