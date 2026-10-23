# HERALYTICS — Decode Data. Uncover the Truth.
### A Vintage True-Crime Investigation Game for ACM-W Sathyabama

**HERALYTICS** is a serious, immersive vintage true-crime investigation and data analytics web game designed specifically for first- and second-year college students. Inspired by archival police dossiers, physical case files, and cryptographic data forensics, the platform puts players in the shoes of cyber-forensic detectives solving a 10-part serialized conspiracy.

---

## 🕵️ Key Features & Architecture

1. **True-Crime Archival Aesthetic**:
   - Aged cream paper (`#F5EFEB`), dark mahogany desks, faded typewriter typography (`Special Elite`, `Courier Prime`).
   - Distressed rubber status stamps (`RESTRICTED`, `CASE EVIDENCE`, `SOLVED`, `UNSOLVED`).
   - Monochrome suspect mugshots, physical evidence locker tags, and interactive timeline reconstruction.
   - Zero-pill metadata discipline, zero neon, and single-elevation archival realism.

2. **10 Fully Realized & Validated Crime Cases**:
   - **Case 01 — The Midnight Murder**: Homicide in the astronomy archives; RFID sensor logs and cellular tower telemetry.
   - **Case 02 — The Vanishing Diamond**: 42-carat gem theft in the mineralogy vault; weight scale tare differentials and camera outages.
   - **Case 03 — The Phantom Transfer**: 1.45 Crore INR wire fraud; browser session hijacking and Tor exit node anomaly detection.
   - **Case 04 — The Missing Evidence**: Tampered narcotics hard drive in the precinct locker; custody logs and master key roster.
   - **Case 05 — The Office Break-In**: Late-night burglary of quantum patent blueprints; fire exit bypass and RFID cloner analysis.
   - **Case 06 — The Identity Impostor**: Scholarship account hijacking; OSINT social challenge question attacks and Paytm beneficiary trail.
   - **Case 07 — The Phantom Cargo**: Intermodal GPU freight diversion; weighbridge load-cell differentials and GPS detour forensics.
   - **Case 08 — The Leaked Examination**: Confidential exam distributed via Telegram; steganographic laser printer tracking dot decoding.
   - **Case 09 — The Silent Breach**: Defense robotics database exfiltration; bastion SSH orphaned key audit and firewall egress flows.
   - **Case 10 — The Mastermind Protocol**: The climactic finale correlating 5 cross-functional datasets (intercepted diplomatic cables, shell wires, fake passports, flight manifests, and safehouse surveillance) to unmask "ARCHITECT-ZERO".

3. **Integrated Dataset Explorer**:
   - Search, filter by column, and multi-field sorting.
   - Numerical summaries, unique counts, and missing-value/duplicate detection.
   - Frequency distribution charts powered by Recharts.
   - Direct CSV export for independent offline spreadsheet analysis.

4. **Participant Ingestion & Authentication**:
   - Two-field participant login: Student Register Number + Phone Number.
   - No public self-registration (accounts are privately imported by administrators).
   - Mandatory first-login password rotation.
   - Clearly labeled, self-contained local demo mode with pre-seeded test detectives.

5. **Server-Authoritative Progression & Leaderboard**:
   - Strict sequential unlocking: Case 01 → Case 10.
   - Configurable passing threshold (default 70%) and retry limits.
   - Strict tie-breaker policy: Finishers (10/10) → Cases completed → Shortest verified elapsed time → Total score → Lowest errors.

6. **Comprehensive Administrator Suite**:
   - Batch import participant accounts via CSV.
   - Reset student temporary credentials.
   - Case answer keys and solution rationale viewer.
   - Competition status toggles: Open / Pause / Resume / Conclude.
   - Real-time cohort progression matrix (Cases 1–10).
   - Export results to CSV and inspect immutable audit logs.

---

## 🚀 Getting Started

### 1. Installation & Local Development
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### 2. Pre-seeded Demo Detective Accounts (for Instant Evaluation)
| Student Name | Register Number | Initial Mobile (Password) | Starting State |
| :--- | :--- | :--- | :--- |
| **Aishwarya Rajan** | `39110001` | `9840112233` | Fresh Detective (Case 01 Unlocked) |
| **Karthik Sivakumar** | `39110002` | `9840223344` | Intermediate (Case 03 Active) |
| **Preethi Venkat** | `39110003` | `9840334455` | Advanced (Case 05 Active) |
| **Rahul Madhavan** | `39110004` | `9840445566` | Grand Master (All 10 Cases Solved) |

### 3. Administrator Console
- **Entrance**: Click **"Admin Terminal →"** on the login screen or **"Organizer Desk"** in the top navigation bar.
- **Organizer Identifier**: `admin`
- **Organizer Security Key**: `heralytics2026`

---

## 🔒 Production Backend & Supabase Configuration

HERALYTICS is completely turnkey. When running without external database credentials, it automatically operates in a resilient browser-persistent demo mode. To connect to a live Supabase PostgreSQL backend:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the Supabase **SQL Editor** and run the migration script located in `/supabase/schema.sql`.
3. Copy your project credentials into `.env`:
   ```bash
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-public-key"
   SUPABASE_SERVICE_ROLE_KEY="your-secret-service-key"
   ```
4. Build and deploy:
   ```bash
   npm run build
   ```
