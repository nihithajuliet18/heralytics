# HERALYTICS — Detective Field Manual & Player Guidebook
### Official Competition Rulebook & Step-by-Step Login Instructions
**ACM-W Sathyabama Student Chapter**

---

## 🏛️ 1. MISSION BRIEFING

Welcome, Detective. **HERALYTICS** is a serialized crime investigation and data analytics game. You are tasked with solving a sequence of 10 fictional cyber-forensic and criminal incidents, culminating in unmasking a transnational syndicate mastermind.

Your weapon is **data**. You will cross-examine door access logs, weight differentials, intercepted communications, flight manifests, and surveillance logs to uncover the truth.

---

## 🔑 2. STEP-BY-STEP LOGIN PROCEDURE (FROM THE START)

### **Step 1: Open the Application**
- Open the official HERALYTICS game link in any modern web browser (Chrome, Firefox, Safari, Edge, or Brave) on your laptop or mobile phone.
- You will be greeted by the vintage manila case folder: **Central Crime Investigation Division — HERALYTICS**.

---

### **Step 2: Enter Your Detective Credentials**
The login screen contains **only two fields**:

1. **Student Register Number**:
   - Enter your official university register/roll number (e.g., `39110001` or `RA2311003010042`).
   - *Note: Letters are case-insensitive.*

2. **Password (Your Registered Mobile Number)**:
   - For your first login, your temporary password is your **10-digit mobile phone number** submitted during event registration (e.g., `9840112233`).

3. Click **"OPEN INVESTIGATION FILE"**.

> **⚠️ Note on Public Registration:** There is no public sign-up form. If your register number is not recognized, your account has not yet been imported into the roster. Please contact your ACM-W event coordinator.

---

### **Step 3: Mandatory First-Login Password Rotation**
To protect your investigation progress and score from being accessed by others:
1. Immediately upon entering your registered mobile number for the first time, a **"MANDATORY FIRST LOGIN PROTOCOL"** prompt will appear.
2. Enter a **New Secure Passphrase** (minimum 6 characters).
3. Re-enter the passphrase in **Confirm Passphrase**.
4. Click **"CONFIRM CREDENTIAL & ENTER GAME"**.
5. Your account is now secured. For all future logins, use your new passphrase.

---

## 🗂️ 3. THE DETECTIVE DASHBOARD

Upon login, your personal **Detective Dossier** desk will open:

- **Detective Badge & Registration**: Displays your registered name, department, and roll number.
- **Cases Solved**: Displays your progress (e.g., `0 / 10`).
- **Total Score**: Current accumulated forensic score points.
- **Investigation Time**: Official server-authoritative elapsed timer tracking your total time since beginning the investigation.
- **Official Rank**: Your current standing on the competition leaderboard.
- **"CONTINUE INVESTIGATION" Button**: Clicking this takes you directly to your currently active case docket.

---

## 🔒 4. SEQUENTIAL CASE UNLOCKING PROTOCOL

The 10 crime cases **must be cleared in strict order**:

$$\text{Case 01} \longrightarrow \text{Case 02} \longrightarrow \text{Case 03} \dots \longrightarrow \text{Case 10}$$

- **Initially Unlocked**: Only **Case 01 — The Midnight Murder** is unsealed.
- **Locked Cases**: Cases 02 through 10 are marked with a brass padlock.
- **Unlocking Rule**: To unlock Case $N+1$, you must score at least **70%** (the passing threshold) on Case $N$.
- **Persistent Progress**: Your score, unlocked cases, submitted answers, and detective scratchpad notes are saved persistently. You can refresh or change devices without losing progress.

---

## 🔍 5. ANATOMY OF A CRIME CASE FILE

When you open an active case, inspect the **6 dossier tabs**:

### **Tab 1: Incident Briefing & Reconstruction Timeline**
- **Executive Crime Summary**: Overview of the incident and location.
- **Incident Narrative**: Detailed forensic description of the scene and method of entry.
- **Chronological Timeline**: Step-by-step sequence of events with timestamped telemetry.

### **Tab 2: Suspect Dossiers**
- Inspect polaroid mugshots of persons of interest.
- Review each suspect's role, claimed alibi, suspected motive, and official interrogation statement.

### **Tab 3: Physical Evidence Locker**
- Examine evidence items tagged by the forensic team (e.g., keycard receipts, tool impressions, severed customs seals).
- Read the evidence description and chain of custody.

### **Tab 4: Datasets & Logs Explorer**
This is your primary investigation tool!
- **Grid View**: Tabular display of genuine synthetic CSV data.
- **Search Bar**: Real-time search across all columns for timestamps, suspect names, room numbers, or IPs.
- **Column Sorting**: Click any table header to sort ascending ($\blacktriangle$) or descending ($\blacktriangledown$).
- **Column Filter**: Narrow search results to specific columns.
- **Statistics View**: Inspect row counts, missing null values, and numeric statistics (averages, minimums, maximums).
- **Chart View**: Visualize category distributions and anomaly frequencies.
- **Export CSV**: Download the raw dataset to analyze in Microsoft Excel, Google Sheets, or Python Pandas.

### **Tab 5: Detective Scratchpad**
- A private investigative notepad saved to your browser.
- Jot down suspect timelines, alibi inconsistencies, IP addresses, and draft deductions.

### **Tab 6: Findings & Graded Questions**
- Answer the 5 graded questions based strictly on evidence discovered in the datasets.

---

## ✍️ 6. ANSWERING QUESTIONS & SUBMITTING FINDINGS

### **Question Types:**
1. **Multiple Choice**: Select the correct suspect, camera, or event from the options provided.
2. **Exact Text Finding**: Enter an ID, suspect name, or timestamp (e.g., `BADGE-881`, `185.220.101.5`, `JOB-805`).
3. **Numeric Finding**: Enter exact numbers, weights, or currency values (e.g., `4.2`, `14500000`, `38`).

### **Using Field Hints:**
- Each question includes an optional **Field Clue**.
- Inspecting a hint deducts a small point penalty (**-3 points**), so try to deduce the answer from the datasets first!

### **Submitting:**
1. Once all answers are filled, click **"SUBMIT EVIDENCE FINDINGS"**.
2. If your score satisfies the **70% passing threshold**:
   - The case is stamped with a green **SOLVED & CLOSED** seal.
   - Points are credited to your total score.
   - A green button appears: **"PROCEED TO NEXT CASE: CASE-XX"**.
3. If you score below 70%:
   - You can review the feedback on which findings contradicted the dataset.
   - Adjust your answers and submit again (up to the maximum 5 retry attempts).

---

## 🏆 7. LEADERBOARD & WINNER DETERMINATION

Click **"Official Standings"** in the top navigation bar at any time to view the certified leaderboard.

### **Strict Tie-Breaker Hierarchy:**
1. **Case Completion Priority**: Detectives who clear all 10 cases rank above those who have not finished.
2. **Total Cases Solved**: Highest number of cases cleared.
3. **Verified Elapsed Time**: The shortest total elapsed time wins!
4. **Total Score**: Highest accumulated score across all cases.
5. **Fewest Errors**: Lowest number of incorrect submission attempts.

---

## 💡 8. TOP DETECTIVE TIPS FOR DATA ANALYSIS

1. **Cross-Reference Timestamps**: Compare the time of the crime from Tab 1 with the entry/exit logs in Tab 4. Who was present during the critical window?
2. **Look for Anomalies**: In the Dataset Explorer, check for columns containing `OVERRIDE = TRUE`, `DENIED`, `COMPROMISED`, or abnormal weight differentials.
3. **Verify Alibis**: Compare where suspects claimed they were against cellular tower connections or diner receipts.
4. **Work as a Team**: Divide and conquer! Have one teammate inspect suspect alibis while another filters the CSV logs.

---

**Good luck, Detective. Decode the data and uncover the truth!**
