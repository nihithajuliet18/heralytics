import React, { useState } from 'react';
import { storage } from '../services/storage';
import { ALL_CASES } from '../data/cases';
import { Participant, CompetitionConfig, AuditLog, CrimeCase } from '../types';
import Papa from 'papaparse';
import {
  Users,
  ShieldAlert,
  Settings,
  FileSpreadsheet,
  Download,
  Upload,
  Play,
  Pause,
  StopCircle,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  Search,
  Eye,
  Activity
} from 'lucide-react';

interface AdminDashboardProps {
  config: CompetitionConfig;
  onUpdateConfig: (newConfig: CompetitionConfig) => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  onUpdateConfig,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'participants' | 'matrix' | 'cases' | 'config' | 'logs'>('participants');
  const [participants, setParticipants] = useState<Participant[]>(storage.getParticipants());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(storage.getAuditLogs());
  const [importText, setImportText] = useState<string>('');
  const [importFeedback, setImportFeedback] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [previewCase, setPreviewCase] = useState<CrimeCase | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const refreshData = () => {
    setParticipants(storage.getParticipants());
    setAuditLogs(storage.getAuditLogs());
  };

  // Robust parsing supporting:
  // 1. Headers: username,password or registerNumber,phone,name,department
  // 2. Headerless: col0 = username, col1 = password, col2 = name, col3 = dept
  const processImportString = (textToParse: string, sourceName?: string) => {
    setImportFeedback('');
    const raw = textToParse.trim();
    if (!raw) {
      setImportFeedback('No content found in file or text area.');
      return;
    }

    try {
      // First try with header = false to inspect column structure
      const rawRows = Papa.parse<string[]>(raw, {
        header: false,
        skipEmptyLines: true
      }).data;

      if (!rawRows || rawRows.length === 0) {
        setImportFeedback('File appears empty or unparseable.');
        return;
      }

      // Check if row 0 looks like a header
      const row0 = rawRows[0].map((c) => (c || '').toLowerCase().trim());
      const hasHeader = row0.some((c) =>
        ['username', 'user', 'reg', 'regno', 'reg_no', 'registernumber', 'register_number', 'id', 'student_id', 'roll'].some(
          (k) => c.includes(k)
        ) ||
        ['password', 'pass', 'phone', 'mobile', 'contact', 'key'].some((k) => c.includes(k))
      );

      let entriesToProcess: { reg: string; pass: string; name?: string; dept?: string }[] = [];

      if (hasHeader) {
        // Find index of username and password columns
        let regIdx = row0.findIndex((c) =>
          ['username', 'user', 'registernumber', 'register_number', 'regno', 'reg_no', 'student_id', 'roll', 'id'].some(
            (k) => c.includes(k)
          )
        );
        let passIdx = row0.findIndex((c) =>
          ['password', 'pass', 'phone', 'mobile', 'contact', 'key', 'secret'].some((k) => c.includes(k))
        );
        let nameIdx = row0.findIndex((c) => ['name', 'student_name', 'fullname', 'full_name'].some((k) => c.includes(k)));
        let deptIdx = row0.findIndex((c) => ['department', 'dept', 'branch', 'course', 'class'].some((k) => c.includes(k)));

        if (regIdx === -1) regIdx = 0;
        if (passIdx === -1) passIdx = regIdx === 0 ? 1 : 0;

        for (let i = 1; i < rawRows.length; i++) {
          const row = rawRows[i];
          const reg = (row[regIdx] || '').trim();
          const pass = (row[passIdx] || '').trim();
          const name = nameIdx !== -1 ? (row[nameIdx] || '').trim() : undefined;
          const dept = deptIdx !== -1 ? (row[deptIdx] || '').trim() : undefined;
          if (reg && pass) {
            entriesToProcess.push({ reg, pass, name, dept });
          }
        }
      } else {
        // Headerless rows: col0 = reg/user, col1 = pass/phone
        for (let i = 0; i < rawRows.length; i++) {
          const row = rawRows[i];
          const reg = (row[0] || '').trim();
          const pass = (row[1] || '').trim();
          const name = row[2] ? (row[2] || '').trim() : undefined;
          const dept = row[3] ? (row[3] || '').trim() : undefined;
          if (reg && pass) {
            entriesToProcess.push({ reg, pass, name, dept });
          }
        }
      }

      if (entriesToProcess.length === 0) {
        setImportFeedback('Could not detect username and password columns. Ensure at least two columns exist per row.');
        return;
      }

      let importedCount = 0;
      let updatedCount = 0;
      const currentList = storage.getParticipants();

      entriesToProcess.forEach((item) => {
        const existingIndex = currentList.findIndex((p) => p.registerNumber.toUpperCase() === item.reg.toUpperCase());
        if (existingIndex >= 0) {
          // Update password and info
          currentList[existingIndex].passwordHash = item.pass;
          currentList[existingIndex].phone = item.pass;
          if (item.name) currentList[existingIndex].name = item.name;
          if (item.dept) currentList[existingIndex].department = item.dept;
          updatedCount++;
        } else {
          currentList.push({
            id: `part-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            registerNumber: item.reg,
            name: item.name || `Detective ${item.reg}`,
            phone: item.pass,
            passwordHash: item.pass,
            department: item.dept || 'Forensic Analytics',
            mustChangePassword: true,
            currentCaseIndex: 0,
            completedCases: [],
            score: 0,
            incorrectAttempts: 0,
            usedHints: [],
            startedAt: Date.now(),
            finishedAt: null,
            elapsedSeconds: 0,
            isDisqualified: false,
            lastActiveAt: Date.now()
          });
          importedCount++;
        }
      });

      storage.saveParticipants(currentList);
      storage.addAuditLog(
        'Admin',
        'CREDENTIALS_IMPORTED',
        `Imported ${importedCount} new, updated ${updatedCount} participant accounts from ${sourceName || 'CSV batch'}.`
      );
      setParticipants(currentList);
      setImportText('');
      setImportFeedback(
        `SUCCESS: Processed ${entriesToProcess.length} total credentials (${importedCount} new added, ${updatedCount} existing credentials updated). Participants can now log in!`
      );
    } catch (err: any) {
      setImportFeedback(`Import error: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportText(content);
        processImportString(content, file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadTemplate = () => {
    const sample = `username,password,name,department\n39110050,9840112233,Aarav Raman,Computer Science\n39110051,9840223344,Diya Menon,Information Technology\n39110052,9840334455,Tarun Paul,Cyber Security\n`;
    const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'heralytics_credentials_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetPassword = (participant: Participant) => {
    const updated: Participant = {
      ...participant,
      passwordHash: participant.phone,
      mustChangePassword: true
    };
    storage.updateParticipant(updated);
    storage.addAuditLog('Admin', 'PASSWORD_RESET', `Reset temporary password for ${participant.registerNumber}`);
    refreshData();
    alert(`Password reset for ${participant.name}. They can login using mobile number ${participant.phone} and will be prompted to rotate password.`);
  };

  const handleExportResultsCsv = () => {
    const leaderboard = storage.getLeaderboard();
    const csv = Papa.unparse(leaderboard);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `heralytics_final_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.registerNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="desk-mat min-h-[calc(100vh-65px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="archival-paper p-6 rounded border border-[#C5B7A1] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono-doc uppercase tracking-widest text-[#8B2622] font-bold">
                HERALYTICS COMMAND CONSOLE
              </span>
              <span className="text-[#8C8275]">·</span>
              <span className="text-[10px] font-mono-doc text-[#6E6354]">
                ACM-W Sathyabama Organizer Desk
              </span>
            </div>
            <h1 className="font-typewriter text-2xl font-bold text-[#1F1B18]">
              Central Competition Administrator
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportResultsCsv}
              className="px-3.5 py-2 bg-[#2D5A27] hover:bg-[#386F30] text-white text-xs font-mono-doc rounded transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Results CSV</span>
            </button>

            <button
              onClick={onExitAdmin}
              className="px-3.5 py-2 bg-[#1F1B18] hover:bg-[#332C26] text-white text-xs font-mono-doc rounded transition-colors"
            >
              Exit to Game
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#1F1B18] rounded border border-[#3A332B] text-xs font-mono-doc">
          <button
            onClick={() => setActiveTab('participants')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'participants' ? 'bg-[#8B2622] text-white font-bold' : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 inline mr-1" /> Participant Roster ({participants.length})
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'matrix' ? 'bg-[#8B2622] text-white font-bold' : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 inline mr-1" /> Live Progress Matrix
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'cases' ? 'bg-[#8B2622] text-white font-bold' : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 inline mr-1" /> Case Answer Keys & Solution Guide
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'config' ? 'bg-[#8B2622] text-white font-bold' : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5 inline mr-1" /> Competition Controls
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'logs' ? 'bg-[#8B2622] text-white font-bold' : 'text-[#A89F91] hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 inline mr-1" /> Audit Logs
          </button>
        </div>

        {/* Tab 1: Participant Management & Import */}
        {activeTab === 'participants' && (
          <div className="space-y-6">
            {/* Import Box */}
            <div className="archival-paper p-5 sm:p-6 rounded border border-[#C5B7A1] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5C9B7] pb-3">
                <div>
                  <h3 className="font-typewriter text-base sm:text-lg font-bold text-[#1F1B18] flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#8B2622]" /> Import Detective Credentials File
                  </h3>
                  <p className="text-xs font-mono-doc text-[#52493E] mt-0.5">
                    Upload your credentials file (.csv, .txt, .tsv) or paste roster records below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#EAE2D3] border border-[#BFB29E] text-[#1F1B18] text-xs font-mono-doc rounded transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5 text-[#8B2622]" />
                  <span>Download Sample Template</span>
                </button>
              </div>

              {/* File Dropzone Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#B8AA94] hover:border-[#8B2622] bg-[#FAF7F0] hover:bg-[#F3EDE1] p-5 rounded-lg text-center cursor-pointer transition-all group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv,.txt,.tsv"
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#EAE2D3] group-hover:bg-[#E05A47]/10 flex items-center justify-center transition-colors">
                    <Upload className="w-5 h-5 text-[#8B2622]" />
                  </div>
                  <div>
                    <span className="font-mono-doc text-xs font-bold text-[#1F1B18] block">
                      {uploadedFileName ? `Selected File: ${uploadedFileName}` : 'Click to Browse Credentials File (.csv / .txt / .tsv)'}
                    </span>
                    <span className="text-[11px] font-mono-doc text-[#736A5E] block mt-0.5">
                      Accepts columns: <code>username,password</code> or <code>registerNumber,phone,name,department</code>
                    </span>
                  </div>
                </div>
              </div>

              {/* Alternative Paste Textarea */}
              <div>
                <label className="block text-xs font-mono-doc font-bold text-[#3D352E] mb-1">
                  Or Paste Raw Credentials / CSV Text Directly:
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  rows={3}
                  placeholder={`username,password,name,department\n39110050,9840192837,Pooja Sundaram,Computer Science\n39110051,9840283746,Varun Kumar,Information Technology`}
                  className="w-full bg-[#FAF7F0] border border-[#BFB29E] rounded p-2.5 font-mono-doc text-xs text-[#1F1B18] placeholder-[#9E9280] focus:outline-none focus:border-[#8B2622]"
                />
              </div>

              {/* Feedback and Submit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                {importFeedback ? (
                  <div className={`text-xs font-mono-doc p-2.5 rounded border flex-1 ${
                    importFeedback.includes('SUCCESS')
                      ? 'bg-[#EBF5E9] border-[#7DB377] text-[#22551D]'
                      : 'bg-[#FBEBEA] border-[#D97D78] text-[#8B2622]'
                  }`}>
                    {importFeedback}
                  </div>
                ) : (
                  <span className="text-[11px] font-mono-doc text-[#736A5E]">
                    Supports files with or without headers. Passwords are saved as temporary initial keys.
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => processImportString(importText, uploadedFileName || 'Pasted Records')}
                  className="px-5 py-2.5 bg-[#8B2622] hover:bg-[#A32F2A] text-white text-xs font-mono-doc font-bold rounded transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Process Batch Import</span>
                </button>
              </div>
            </div>

            {/* Roster Table */}
            <div className="archival-paper p-5 rounded border border-[#C5B7A1]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="font-typewriter text-lg font-bold text-[#1F1B18]">
                  Registered Detective Cohort ({filteredParticipants.length})
                </h3>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#736A5E]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name or reg no..."
                    className="bg-[#FAF7F0] border border-[#BFB29E] rounded pl-9 pr-3 py-1.5 text-xs font-mono-doc text-[#1F1B18] focus:outline-none focus:border-[#8B2622]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono-doc">
                  <thead className="bg-[#24201C] text-[#C4BCB0] uppercase border-b border-[#3A332B]">
                    <tr>
                      <th className="py-2.5 px-3 text-left">Reg Number</th>
                      <th className="py-2.5 px-3 text-left">Student Name</th>
                      <th className="py-2.5 px-3 text-left">Mobile (Temp Pass)</th>
                      <th className="py-2.5 px-3 text-left">Department</th>
                      <th className="py-2.5 px-3 text-center">Cases Solved</th>
                      <th className="py-2.5 px-3 text-right">Score</th>
                      <th className="py-2.5 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D5C9B7]">
                    {filteredParticipants.map((p) => (
                      <tr key={p.id} className="odd:bg-[#FAF7F0] even:bg-[#F3EDE1]">
                        <td className="py-2.5 px-3 font-bold text-[#1F1B18]">{p.registerNumber}</td>
                        <td className="py-2.5 px-3 text-[#1F1B18]">{p.name}</td>
                        <td className="py-2.5 px-3 text-[#52493E]">{p.phone}</td>
                        <td className="py-2.5 px-3 text-[#52493E]">{p.department}</td>
                        <td className="py-2.5 px-3 text-center font-bold">
                          {p.completedCases.length} / 10
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-[#8B2622]">{p.score}</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => handleResetPassword(p)}
                            className="px-2 py-1 bg-[#E8DFD1] hover:bg-[#D4C8B6] border border-[#BFB29E] rounded text-[10px] text-[#1F1B18] transition-colors"
                          >
                            Reset Temp Pass
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Progress Matrix */}
        {activeTab === 'matrix' && (
          <div className="archival-paper p-5 rounded border border-[#C5B7A1]">
            <h3 className="font-typewriter text-lg font-bold text-[#1F1B18] mb-3">
              Cohort Progression Heatmap (Cases 01 to 10)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono-doc border-collapse">
                <thead className="bg-[#24201C] text-[#C4BCB0] uppercase border-b border-[#3A332B]">
                  <tr>
                    <th className="py-2 px-3 text-left">Student</th>
                    {ALL_CASES.map((c) => (
                      <th key={c.id} className="py-2 px-2 text-center">
                        {c.code}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D5C9B7]">
                  {participants.map((p) => (
                    <tr key={p.id} className="odd:bg-[#FAF7F0] even:bg-[#F3EDE1]">
                      <td className="py-2 px-3 font-bold text-[#1F1B18] whitespace-nowrap">
                        {p.name} ({p.registerNumber})
                      </td>
                      {ALL_CASES.map((c) => {
                        const solved = p.completedCases.includes(c.id);
                        return (
                          <td key={c.id} className="py-2 px-2 text-center">
                            {solved ? (
                              <span className="inline-block w-4 h-4 rounded bg-[#2D5A27] text-white text-[10px] font-bold">
                                ✓
                              </span>
                            ) : (
                              <span className="inline-block w-4 h-4 rounded bg-[#DFD6C7] text-[#8C8275] text-[10px]">
                                -
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Cases & Answer Keys */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_CASES.map((c) => (
                <div key={c.id} className="archival-paper p-4 rounded border border-[#C5B7A1] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-doc text-xs font-bold text-[#8B2622]">{c.code}</span>
                    <span className="text-[10px] font-mono-doc text-[#736A5E]">{c.difficulty}</span>
                  </div>
                  <h4 className="font-serif-vintage text-base font-bold text-[#1F1B18]">{c.title}</h4>
                  <p className="text-xs font-mono-doc text-[#52493E] line-clamp-2">{c.summary}</p>
                  <button
                    onClick={() => setPreviewCase(previewCase?.id === c.id ? null : c)}
                    className="w-full mt-2 py-1.5 bg-[#1F1B18] hover:bg-[#332C26] text-white text-xs font-mono-doc rounded transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{previewCase?.id === c.id ? 'Hide Keys' : 'Inspect Solution Keys'}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Answer Key Detail Modal / Drawer */}
            {previewCase && (
              <div className="archival-paper p-6 rounded border-2 border-[#8B2622] space-y-4">
                <div className="flex items-center justify-between border-b border-[#D5C9B7] pb-3">
                  <h3 className="font-typewriter text-xl font-bold text-[#8B2622]">
                    [CONFIDENTIAL SOLUTION KEY] {previewCase.code}: {previewCase.title}
                  </h3>
                  <button
                    onClick={() => setPreviewCase(null)}
                    className="text-xs font-mono-doc text-[#736A5E] hover:underline"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4">
                  {previewCase.questions.map((q, idx) => (
                    <div key={q.id} className="p-3 bg-[#FAF7F0] rounded border border-[#D5C9B7] text-xs font-mono-doc">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-[#1F1B18]">Question {idx + 1} ({q.points} pts)</strong>
                        <span className="text-[#8B2622] font-bold">Answer: {q.correctAnswer.toString()}</span>
                      </div>
                      <p className="text-[#4A4237] mb-2">{q.prompt}</p>
                      <div className="text-[11px] text-[#2D5A27] bg-[#EBF5E9] p-2 rounded">
                        <strong>Organizer Explanation:</strong> {q.explanation} (Evidence: {q.evidenceRef})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Competition Controls */}
        {activeTab === 'config' && (
          <div className="archival-paper p-6 rounded border border-[#C5B7A1] max-w-2xl space-y-5">
            <h3 className="font-typewriter text-lg font-bold text-[#1F1B18]">
              Competition Progression Parameters
            </h3>

            <div>
              <label className="block text-xs font-mono-doc font-bold text-[#3D352E] mb-1">
                Competition Status
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdateConfig({ ...config, status: 'active' })}
                  className={`px-3 py-1.5 rounded text-xs font-mono-doc flex items-center gap-1.5 ${
                    config.status === 'active' ? 'bg-[#2D5A27] text-white font-bold' : 'bg-[#EAE2D3] text-[#3D352E]'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" /> Active / Open
                </button>
                <button
                  onClick={() => onUpdateConfig({ ...config, status: 'paused' })}
                  className={`px-3 py-1.5 rounded text-xs font-mono-doc flex items-center gap-1.5 ${
                    config.status === 'paused' ? 'bg-[#C59B27] text-white font-bold' : 'bg-[#EAE2D3] text-[#3D352E]'
                  }`}
                >
                  <Pause className="w-3.5 h-3.5" /> Paused
                </button>
                <button
                  onClick={() => onUpdateConfig({ ...config, status: 'ended' })}
                  className={`px-3 py-1.5 rounded text-xs font-mono-doc flex items-center gap-1.5 ${
                    config.status === 'ended' ? 'bg-[#8B2622] text-white font-bold' : 'bg-[#EAE2D3] text-[#3D352E]'
                  }`}
                >
                  <StopCircle className="w-3.5 h-3.5" /> Concluded
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-doc font-bold text-[#3D352E] mb-1">
                  Passing Threshold (% of total points)
                </label>
                <input
                  type="number"
                  value={config.passingScorePercentage}
                  onChange={(e) => onUpdateConfig({ ...config, passingScorePercentage: parseInt(e.target.value) || 70 })}
                  className="w-full bg-[#FAF7F0] border border-[#BFB29E] rounded px-3 py-1.5 font-mono-doc text-xs text-[#1F1B18]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-doc font-bold text-[#3D352E] mb-1">
                  Max Retries per Case
                </label>
                <input
                  type="number"
                  value={config.maxRetryAttempts}
                  onChange={(e) => onUpdateConfig({ ...config, maxRetryAttempts: parseInt(e.target.value) || 5 })}
                  className="w-full bg-[#FAF7F0] border border-[#BFB29E] rounded px-3 py-1.5 font-mono-doc text-xs text-[#1F1B18]"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer font-mono-doc text-xs text-[#1F1B18]">
                <input
                  type="checkbox"
                  checked={config.leaderboardPublished}
                  onChange={(e) => onUpdateConfig({ ...config, leaderboardPublished: e.target.checked })}
                  className="accent-[#8B2622]"
                />
                <span className="font-bold">Publish Final Standings to All Participants</span>
              </label>
            </div>
          </div>
        )}

        {/* Tab 5: Audit Logs */}
        {activeTab === 'logs' && (
          <div className="archival-paper p-5 rounded border border-[#C5B7A1]">
            <h3 className="font-typewriter text-lg font-bold text-[#1F1B18] mb-3">
              Administrative & Game Audit Trail
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto font-mono-doc text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 bg-[#FAF7F0] rounded border border-[#D5C9B7] flex items-center justify-between">
                  <div>
                    <span className="text-[#8B2622] font-bold">[{log.action}]</span>{' '}
                    <span className="text-[#1F1B18]">{log.details}</span>
                  </div>
                  <div className="text-[10px] text-[#736A5E] shrink-0 ml-4">
                    {new Date(log.timestamp).toLocaleTimeString()} · {log.actor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
