import React, { useState } from 'react';
import { X, Database, Shield, Key, Terminal, Copy, Check } from 'lucide-react';
import { isSupabaseConfigured } from '../services/storage';

interface DatabaseGuideModalProps {
  onClose: () => void;
}

export const DatabaseGuideModal: React.FC<DatabaseGuideModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const isConfigured = isSupabaseConfigured();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const envSample = `# HERALYTICS Production Supabase & PostgreSQL Configuration
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Server-only!`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl archival-paper rounded border border-[#C5B7A1] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#EFE9DD] border-b border-[#D5C9B7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-[#8B2622]" />
            <div>
              <h2 className="font-typewriter text-xl font-bold text-[#1F1B18]">
                HERALYTICS Backend Architecture & Production Setup
              </h2>
              <p className="font-mono-doc text-xs text-[#52493E]">
                State: {isConfigured ? 'Connected to Remote Supabase' : 'Active Local Demo Mode (Browser Persistent)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#DFD6C7] text-[#52493E] hover:text-[#1F1B18]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono-doc text-xs text-[#2B2520]">
          {/* Status Box */}
          <div className="p-4 bg-[#F8F5EE] border border-[#C5B7A1] rounded space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#8B2622]">
              <Shield className="w-4 h-4" />
              <span>Production Security & Zero Frontend Answer Exposure</span>
            </div>
            <p className="leading-relaxed">
              HERALYTICS is designed with strict server-side evaluation guarantees. In production, answer keys reside solely in protected database tables with Row Level Security (RLS) denying public reads. Participant submissions are scored through authenticated stored procedures or serverless edge RPC functions.
            </p>
          </div>

          {/* Setup Steps */}
          <div>
            <h3 className="font-typewriter text-base font-bold text-[#1F1B18] mb-2">
              1. Environment Variables Configuration
            </h3>
            <p className="mb-2 text-[#52493E]">
              Add the following keys to your <code>.env</code> file:
            </p>
            <div className="relative bg-[#161311] text-[#E4DDD3] p-3 rounded border border-[#3A332B]">
              <pre className="overflow-x-auto text-[11px]">{envSample}</pre>
              <button
                onClick={() => handleCopy(envSample, 'env')}
                className="absolute top-2 right-2 p-1.5 bg-[#2B2520] hover:bg-[#3D342D] text-[#C4BCB0] rounded"
              >
                {copied === 'env' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-typewriter text-base font-bold text-[#1F1B18] mb-2">
              2. PostgreSQL Schema & Row Level Security (RLS)
            </h3>
            <p className="mb-2 text-[#52493E]">
              The complete SQL migration script is located in <code>/supabase/schema.sql</code>. It provisions the following tables with automated foreign key constraints and strict role-based access:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#474037]">
              <li><code>profiles</code>: Student registration, mobile hash, role, score, timer.</li>
              <li><code>cases</code>: Case metadata, code, title, difficulty, passing thresholds.</li>
              <li><code>datasets</code>: Raw CSV blobs and schema definitions.</li>
              <li><code>questions</code>: Question prompts, points, hint text (answer keys masked).</li>
              <li><code>submissions</code>: Participant answers, awarded points, attempt history.</li>
              <li><code>audit_logs</code>: Immutable security and progression audit events.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-typewriter text-base font-bold text-[#1F1B18] mb-2">
              3. Private Participant Account Ingestion
            </h3>
            <p className="text-[#52493E] leading-relaxed">
              Administrators import student participant batches directly via the Administrator Control Panel (CSV format: <code>registerNumber,name,phone,department</code>). Public self-registration is permanently disabled. On initial login, students enter their register number and mobile number, which immediately triggers the mandatory password rotation protocol.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFE9DD] border-t border-[#D5C9B7] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1F1B18] hover:bg-[#332C26] text-white text-xs font-mono-doc rounded transition-colors"
          >
            Dismiss Guide
          </button>
        </div>
      </div>
    </div>
  );
};
