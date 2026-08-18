import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  Check, Copy, Info, Calendar, Shield, Crown, Zap
} from 'lucide-react';

export const HeroBanner = () => {
  const { userData, gainXP, showToast, setAvatarModalOpen } = useProfile();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const xpCurrent = userData.xp || 6420;
  const xpMax = userData.maxExp || 8000;
  const percentage = Math.min(100, Math.max(0, Math.round((xpCurrent / xpMax) * 100)));
  const xpRemaining = Math.max(0, xpMax - xpCurrent);
  const nextLevel = String((userData.level || 4) + 1).padStart(2, '0');
  const currentLevelStr = String(userData.level || 4).padStart(2, '0');

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
      showToast('📋 User ID copied to clipboard!', 'success');
    } else {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
      showToast('🎟️ Referral Code copied to clipboard!', 'success');
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">

      {/* ─── Card 1: User Profile Card ─── */}
      <div
        className="lg:col-span-8 relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border overflow-hidden transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        style={{
          background: 'linear-gradient(135deg, #0d0a2b 0%, #08061e 50%, #040314 100%)',
          borderColor: 'rgba(99, 102, 241, 0.25)',
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_-20%,rgba(120,50,230,0.15),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-28 bg-[#f59e0b]/[0.06] rounded-full blur-[40px] pointer-events-none" />

        <div className="relative z-10">

          {/* ── Mobile: Avatar + Name row ── */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Avatar */}
            <div
              className="relative shrink-0 group/avatar cursor-pointer"
              onClick={() => setAvatarModalOpen(true)}
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-[2.5px] sm:p-[3.5px] bg-gradient-to-tr from-[#f59e0b] via-[#a855f7] to-[#3b82f6] shadow-[0_0_24px_rgba(168,85,247,0.5)] transition-transform duration-300 group-hover/avatar:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0820] relative">
                  <img
                    src={userData.avatar || '/avatar.jpg'}
                    alt={userData.displayName || 'User'}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">Change</span>
                  </div>
                </div>
              </div>
              {/* Shield badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#1d1245] border-2 border-purple-400/90 shadow-[0_0_10px_rgba(168,85,247,0.6)] flex items-center justify-center pointer-events-none rotate-6">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 fill-purple-400/30 text-purple-300" />
              </div>
            </div>

            {/* Name + subtitle + status (takes remaining space) */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-base sm:text-2xl font-extrabold text-white tracking-tight truncate">
                  {userData.displayName || userData.username || 'Ayan Alam'}
                </h1>
                {userData.isVerified && (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-[0_0_8px_rgba(59,130,246,0.7)] shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-[11px] sm:text-sm font-medium text-slate-300 mt-0.5">
                {userData.tier || 'Reward Explorer'}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mt-1.5 sm:mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 tracking-wide">
                  {userData.status || 'Account Active'}
                </span>
              </div>
            </div>

            {/* Level Shield — visible on ALL screen sizes, compact on mobile */}
            <div className="shrink-0 flex flex-col items-center relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />
              <div
                className="relative w-20 sm:w-28 md:w-32 py-2 sm:py-3 px-2 sm:px-2.5 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border shadow-[0_0_24px_rgba(245,158,11,0.3)] transition-transform duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(180deg, rgba(42, 28, 72, 0.95) 0%, rgba(20, 12, 42, 0.98) 100%)',
                  borderColor: 'rgba(245, 158, 11, 0.55)',
                  borderWidth: '2px',
                }}
              >
                <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400 mb-0.5">
                  <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400/40" />
                  <span className="text-[7px] sm:text-[9px] font-extrabold text-amber-300 tracking-[0.2em] uppercase">
                    LEVEL
                  </span>
                  <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400/40 scale-x-[-1]" />
                </div>
                <div className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] font-mono leading-none my-0.5">
                  {currentLevelStr}
                </div>
                <div className="w-full mt-0.5 sm:mt-1 px-1 py-px sm:py-0.5 rounded bg-black/70 border border-amber-400/50 text-amber-300 font-extrabold text-[7px] sm:text-[9px] tracking-wider uppercase text-center truncate">
                  {userData.tier || 'REWARD EXPLORER'}
                </div>
              </div>
              <div className="w-14 sm:w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1 blur-[1px]" />
            </div>
          </div>

          {/* ── Metadata row — below avatar row ── */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-6 mt-4 pt-3 border-t border-white/[0.08] text-xs">
            {/* Member Since */}
            <div className="flex flex-col items-center sm:items-start min-w-0">
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">Member Since</span>
              <div className="flex items-center gap-1 mt-0.5 text-slate-100 font-semibold text-[11px] sm:text-xs">
                <Calendar className="w-3 h-3 text-indigo-300 shrink-0 hidden sm:block" />
                <span>{userData.memberSince || 'May 2026'}</span>
              </div>
            </div>

            {/* User ID */}
            <div className="flex flex-col items-center sm:items-start min-w-0">
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">User ID</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-mono font-semibold text-slate-100 text-[10px] sm:text-xs truncate max-w-[65px] sm:max-w-none">
                  {userData.id || 'VLIRUSR202600123'}
                </span>
                <button
                  onClick={() => handleCopy(userData.id || 'VLIRUSR202600123', 'id')}
                  className="p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy User ID"
                >
                  {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Referral Code */}
            <div className="flex flex-col items-center sm:items-start min-w-0">
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">Referral Code</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-mono font-bold text-amber-400 text-[10px] sm:text-xs truncate">
                  {userData.referral?.code || 'VELOOP123'}
                </span>
                <button
                  onClick={() => handleCopy(userData.referral?.code || 'VELOOP123', 'ref')}
                  className="p-0.5 text-amber-400/80 hover:text-amber-300 transition-colors cursor-pointer shrink-0"
                  title="Copy Referral Code"
                >
                  {copiedRef ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Card 2: XP Progress Card ─── */}
      <div
        className="lg:col-span-4 relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 border overflow-hidden transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(13, 10, 38, 0.92) 0%, rgba(6, 4, 20, 0.95) 100%), url("/planet_bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          borderColor: 'rgba(99, 102, 241, 0.25)',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a2b]/95 via-[#0d0a2b]/80 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs tracking-wide">
            <span>XP Progress</span>
            <Info
              className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer transition-colors"
              onClick={() => showToast('Earn XP through daily logins, activities, and referrals!', 'info')}
            />
          </div>

          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {xpCurrent.toLocaleString()}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-400 font-mono">
              / {xpMax.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 my-3 sm:my-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className="flex-1 h-3 sm:h-3.5 bg-white/[0.1] rounded-full overflow-hidden cursor-pointer p-[1px]"
              onClick={() => gainXP(25)}
              title="Click to boost XP"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff7a00] via-[#ec4899] to-[#a855f7] transition-all duration-700 shadow-[0_0_14px_rgba(236,72,153,0.7)]"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-lg sm:text-2xl font-black text-white font-mono shrink-0 drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between gap-2 pt-2.5 border-t border-white/[0.08] text-xs flex-wrap">
          <button
            onClick={() => gainXP(25)}
            className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 group cursor-pointer transition-colors truncate min-w-0"
          >
            <span className="truncate text-[11px] sm:text-xs">{xpRemaining > 0 ? `${xpRemaining.toLocaleString()} XP to Level ${nextLevel}` : 'Max Level!'}</span>
            <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={() => gainXP(25)}
            className="text-[10px] font-bold text-amber-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/15 border border-amber-500/35 hover:bg-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.2)] shrink-0"
            title="Click to boost XP"
          >
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            +25 XP
          </button>
        </div>
      </div>
    </div>
  );
};
