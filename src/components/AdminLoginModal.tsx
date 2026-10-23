import React, { useState } from 'react';
import { storage } from '../services/storage';
import { ShieldCheck, Lock, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess, onClose }) => {
  const [username, setUsername] = useState('admin');
  const [passcode, setPasscode] = useState('heralytics2026');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Pre-configured organizer passcode
    if (
      (username === 'admin' && passcode === 'heralytics2026') ||
      (username === 'acmw' && passcode === 'sathyabama2026')
    ) {
      storage.setAdminUser({ id: 'admin-lead', username, role: 'superadmin' });
      storage.addAuditLog(username, 'ADMIN_LOGIN', 'Organizer authenticated into central control panel.');
      onSuccess();
    } else {
      setErrorMsg('Invalid administrator credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md archival-paper rounded border border-[#C5B7A1] shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#736A5E] hover:text-[#1F1B18]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-[#8B2622]" />
          <span className="font-mono-doc text-xs uppercase font-bold tracking-wider text-[#8B2622]">
            Restricted Access
          </span>
        </div>

        <h2 className="font-typewriter text-xl font-bold text-[#1F1B18] mb-1">
          Administrator Command Terminal
        </h2>
        <p className="font-mono-doc text-xs text-[#52493E] mb-5">
          Authorized organizers and ACM-W competition committee only.
        </p>

        <form onSubmit={handleAdminAuth} className="space-y-4">
          <div>
            <label className="block font-mono-doc text-xs uppercase text-[#3D352E] font-bold mb-1">
              Admin Identifier
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#EFE9DC] border border-[#BFB29E] rounded px-3 py-2 font-mono-doc text-xs text-[#1F1B18] focus:outline-none focus:border-[#8B2622]"
              autoFocus
            />
          </div>

          <div>
            <label className="block font-mono-doc text-xs uppercase text-[#3D352E] font-bold mb-1">
              Organizer Security Key
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-[#EFE9DC] border border-[#BFB29E] rounded px-3 py-2 font-mono-doc text-xs text-[#1F1B18] focus:outline-none focus:border-[#8B2622]"
            />
            <span className="text-[10px] font-mono-doc text-[#736A5E] mt-1 block">
              Default Organizer Key: <code className="text-[#8B2622] font-bold">heralytics2026</code>
            </span>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-[#FBEBEA] border border-[#D97D78] rounded text-[#8B2622] text-xs font-mono-doc">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#8B2622] hover:bg-[#A32F2A] text-white font-mono-doc text-xs font-bold tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>AUTHENTICATE COMMAND ACCESS</span>
          </button>
        </form>
      </div>
    </div>
  );
};
