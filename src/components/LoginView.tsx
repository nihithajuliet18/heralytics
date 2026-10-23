import React, { useState } from 'react';
import { storage, isSupabaseConfigured } from '../services/storage';
import { Participant } from '../types';
import { Lock, UserCheck, ShieldAlert, KeyRound, ArrowRight, BookOpen } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (participant: Participant) => void;
  onOpenAdminLogin: () => void;
  onOpenDatabaseGuide: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onOpenAdminLogin,
  onOpenDatabaseGuide
}) => {
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [pendingUser, setPendingUser] = useState<Participant | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isProd = isSupabaseConfigured();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!registerNumber.trim() || !password.trim()) {
      setErrorMsg('Enter both Student Register Number and Password.');
      return;
    }

    const participant = storage.getParticipantByRegisterNumber(registerNumber);

    if (!participant) {
      setErrorMsg('No detective docket found for this register number. Contact competition administrator.');
      return;
    }

    // Verify password (plain hash check in local demo mode)
    const valid = participant.passwordHash === password || participant.phone === password;
    if (!valid) {
      setErrorMsg('Authentication rejected. Initial temporary password is your registered phone number.');
      return;
    }

    // Enforce first login password change
    if (participant.mustChangePassword) {
      setPendingUser(participant);
      setIsChangingPassword(true);
      return;
    }

    participant.lastActiveAt = Date.now();
    storage.updateParticipant(participant);
    storage.setCurrentUser(participant);
    storage.addAuditLog(participant.name, 'PARTICIPANT_LOGIN', `Logged in from terminal (Reg #${participant.registerNumber})`);
    onLoginSuccess(participant);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (pendingUser) {
      const updated: Participant = {
        ...pendingUser,
        passwordHash: newPassword,
        mustChangePassword: false,
        lastActiveAt: Date.now()
      };
      storage.updateParticipant(updated);
      storage.setCurrentUser(updated);
      storage.addAuditLog(updated.name, 'PASSWORD_ROTATED', 'Initial temporary phone password updated to secure key.');
      setIsChangingPassword(false);
      onLoginSuccess(updated);
    }
  };

  const fillQuickDemo = (reg: string, phone: string) => {
    setRegisterNumber(reg);
    setPassword(phone);
    setErrorMsg('');
  };

  return (
    <div className="min-h-[calc(100vh-65px)] desk-mat flex flex-col justify-center items-center px-4 py-8 relative">
      {/* Background Archival Aesthetics */}
      <div className="w-full max-w-lg relative">
        {/* Physical Evidence Paper Tab */}
        <div className="flex justify-between items-end px-3">
          <div className="bg-[#C8B89E] text-[#1F1B18] px-4 py-1.5 rounded-t font-typewriter text-xs font-bold uppercase tracking-widest shadow">
            ACM-W // CASE DOSSIER INTAKE
          </div>
          <div className="text-[11px] font-mono-doc text-[#8C8275] pb-1">
            TERMINAL ID: STB-PRECINCT-09
          </div>
        </div>

        {/* Physical Manila Dossier Card */}
        <div className="archival-paper rounded-b rounded-tr p-6 sm:p-8 border border-[#B3A692] relative overflow-hidden">
          {/* Paperclip Graphic */}
          <div className="paperclip" />

          {/* Stamp Header */}
          <div className="flex items-start justify-between border-b border-[#D5C9B7] pb-4 mb-6">
            <div>
              <span className="text-[10px] uppercase font-mono-doc tracking-widest text-[#7A6F62] block">
                Central Crime Investigation Division
              </span>
              <h1 className="font-typewriter text-2xl sm:text-3xl font-bold text-[#1F1B18] tracking-tight mt-0.5">
                HERALYTICS
              </h1>
              <p className="text-xs font-mono-doc text-[#5A5145] mt-1">
                Decode Data · Uncover the Truth
              </p>
            </div>

            <div className="rotate-[-4deg]">
              <div className="vintage-stamp stamp-red text-[11px]">
                RESTRICTED
              </div>
            </div>
          </div>

          {!isChangingPassword ? (
            /* Participant Login Form */
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block font-mono-doc text-xs uppercase tracking-wider text-[#3D352E] font-bold mb-1.5">
                  1. Student Register Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={registerNumber}
                    onChange={(e) => setRegisterNumber(e.target.value)}
                    placeholder="e.g. 39110001 or RA2311003010042"
                    className="w-full bg-[#EFE9DC] border border-[#BFB29E] rounded px-3.5 py-2.5 font-mono-doc text-sm text-[#1F1B18] placeholder-[#8F8372] focus:outline-none focus:border-[#8B2622] focus:bg-[#FAF6EE]"
                    autoFocus
                  />
                  <UserCheck className="w-4 h-4 text-[#7A6F62] absolute right-3 top-3" />
                </div>
                <span className="text-[11px] font-mono-doc text-[#736A5E] mt-1 block">
                  Official university roll / register identification.
                </span>
              </div>

              <div>
                <label className="block font-mono-doc text-xs uppercase tracking-wider text-[#3D352E] font-bold mb-1.5">
                  2. Password (Phone Number on First Login)
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="10-digit registered mobile number"
                    className="w-full bg-[#EFE9DC] border border-[#BFB29E] rounded px-3.5 py-2.5 font-mono-doc text-sm text-[#1F1B18] placeholder-[#8F8372] focus:outline-none focus:border-[#8B2622] focus:bg-[#FAF6EE]"
                  />
                  <Lock className="w-4 h-4 text-[#7A6F62] absolute right-3 top-3" />
                </div>
                <span className="text-[11px] font-mono-doc text-[#736A5E] mt-1 block">
                  Initial temporary password is student registered mobile number.
                </span>
              </div>

              {errorMsg && (
                <div className="p-3 bg-[#FBEBEA] border border-[#D97D78] rounded text-[#8B2622] text-xs font-mono-doc flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#8B2622] hover:bg-[#A32F2A] active:bg-[#721F1B] text-[#FAF6EE] font-mono-doc text-sm font-bold tracking-wider rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>OPEN INVESTIGATION FILE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Mandatory First-Time Password Rotation Form */
            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              <div className="p-3 bg-[#F4EFE6] border border-[#BFB29E] rounded">
                <span className="text-xs font-mono-doc font-bold text-[#8B2622] block mb-1">
                  MANDATORY FIRST LOGIN PROTOCOL
                </span>
                <p className="text-xs font-mono-doc text-[#4A4237]">
                  Detective <strong className="text-[#1F1B18]">{pendingUser?.name}</strong>, you must replace your temporary phone password with a personal secure passphrase.
                </p>
              </div>

              <div>
                <label className="block font-mono-doc text-xs uppercase text-[#3D352E] font-bold mb-1">
                  New Secure Passphrase
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-[#EFE9DC] border border-[#BFB29E] rounded px-3 py-2 font-mono-doc text-sm text-[#1F1B18] focus:outline-none focus:border-[#8B2622]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-mono-doc text-xs uppercase text-[#3D352E] font-bold mb-1">
                  Confirm Passphrase
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter passphrase"
                  className="w-full bg-[#EFE9DC] border border-[#BFB29E] rounded px-3 py-2 font-mono-doc text-sm text-[#1F1B18] focus:outline-none focus:border-[#8B2622]"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-[#FBEBEA] border border-[#D97D78] rounded text-[#8B2622] text-xs font-mono-doc">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#2D5A27] hover:bg-[#386F30] text-white font-mono-doc text-sm font-bold tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>CONFIRM CREDENTIAL & ENTER GAME</span>
              </button>
            </form>
          )}

          {/* Quick Demo Test Detective Switcher */}
          {!isProd && !isChangingPassword && (
            <div className="mt-6 pt-5 border-t border-[#D5C9B7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono-doc uppercase tracking-wider text-[#63594D] font-bold">
                  Quick Demo Detective Profiles
                </span>
                <span className="text-[10px] font-mono-doc text-[#8B2622] font-semibold">
                  1-Click Select
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-doc">
                <button
                  type="button"
                  onClick={() => fillQuickDemo('39110001', '9840112233')}
                  className="text-left p-2 bg-[#EFE8DC] hover:bg-[#E5DEC0] border border-[#C2B5A0] rounded transition-colors text-[#2B2520]"
                >
                  <strong className="block text-[#1F1B18]">Aishwarya Rajan</strong>
                  <span className="text-[11px] text-[#6E6354]">Reg: 39110001 · Unsolved (Case 01)</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickDemo('39110002', '9840223344')}
                  className="text-left p-2 bg-[#EFE8DC] hover:bg-[#E5DEC0] border border-[#C2B5A0] rounded transition-colors text-[#2B2520]"
                >
                  <strong className="block text-[#1F1B18]">Karthik Sivakumar</strong>
                  <span className="text-[11px] text-[#6E6354]">Reg: 39110002 · At Case 03</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Notice */}
          <div className="mt-5 pt-4 border-t border-[#D5C9B7] flex items-center justify-between text-[11px] font-mono-doc text-[#6E6354]">
            <button
              onClick={onOpenDatabaseGuide}
              className="text-[#7A6F62] hover:text-[#1F1B18] underline flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Backend Architecture & Docs</span>
            </button>

            <button
              onClick={onOpenAdminLogin}
              className="text-[#8B2622] hover:underline font-bold"
            >
              Admin Terminal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
