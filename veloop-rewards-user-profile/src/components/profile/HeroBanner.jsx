import React, { useRef, useEffect, useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import {
  Check, Copy, Info, Calendar, Shield, Crown, Sparkles, Zap
} from 'lucide-react';
import gsap from 'gsap';

export const HeroBanner = () => {
  const { userData, gainXP, showToast, setAvatarModalOpen } = useProfile();
  const bannerRef = useRef(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const xpCurrent = userData.xp || 6420;
  const xpMax = userData.maxExp || 8000;
  const percentage = Math.min(100, Math.max(0, Math.round((xpCurrent / xpMax) * 100)));
  const xpRemaining = Math.max(0, xpMax - xpCurrent);
  const nextLevel = String((userData.level || 4) + 1).padStart(2, '0');
  const currentLevelStr = String(userData.level || 4).padStart(2, '0');

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

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
    <div ref={bannerRef} className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
      {/* ─── Circled Hero Profile Card (2 cols on XL screens) ─── */}
      <div
        className="xl:col-span-2 relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 border overflow-hidden transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 14, 48, 0.95) 0%, rgba(11, 9, 32, 0.98) 100%)',
          borderColor: 'rgba(139, 92, 246, 0.30)',
        }}
      >
        {/* Background ambient glow effects */}
        <div className="absolute -top-12 -left-12 w-60 h-60 bg-[#7c3aed]/15 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute -bottom-10 right-20 w-72 h-40 bg-[#f59e0b]/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Subtle mountain/cosmic horizon silhouette at the bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-25"
          style={{
            background: 'linear-gradient(to top, rgba(124, 58, 237, 0.25) 0%, transparent 100%)',
          }}
        />

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Left: Avatar + Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 flex-1 min-w-0">
            {/* Avatar with multi-color glowing gradient ring & attached shield badge */}
            <div className="relative shrink-0 group/avatar cursor-pointer" onClick={() => setAvatarModalOpen(true)}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-purple-500 to-indigo-500 shadow-[0_0_24px_rgba(139,92,246,0.5)] transition-transform duration-300 group-hover/avatar:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0e0c24] relative">
                  <img
                    src={userData.avatar || '/avatar.jpg'}
                    alt={userData.displayName || userData.username}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                  {/* Subtle dark hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Edit</span>
                  </div>
                </div>
              </div>

              {/* Bottom-right attached purple shield badge */}
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1e1548] border border-purple-400/60 shadow-[0_0_8px_rgba(139,92,246,0.6)] flex items-center justify-center text-amber-400 pointer-events-none"
                title="Verified Pioneer"
              >
                <Shield className="w-3.5 h-3.5 fill-purple-500/30 text-purple-300" />
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              {/* Name + Verified Badge */}
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {userData.displayName || userData.username || 'Ayan Alam'}
                </h1>
                {userData.isVerified && (
                  <div className="w-5 h-5 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]" title="Verified Account">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Role / Subtitle */}
              <p className="text-xs sm:text-sm font-medium text-gray-300 mb-2">
                {userData.tier || 'Reward Explorer'}
              </p>

              {/* Status Pill: Account Active */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="text-[11px] font-bold text-emerald-400 tracking-wide">
                  {userData.status || 'Account Active'}
                </span>
              </div>

              {/* Bottom Metadata Info Grid */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 pt-3 border-t border-white/[0.06] text-xs">
                {/* Member Since */}
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide">Member Since</span>
                  <span className="font-semibold text-gray-200 text-xs sm:text-[13px] mt-0.5">
                    {userData.memberSince || 'May 2026'}
                  </span>
                </div>

                {/* User ID */}
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide">User ID</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono font-semibold text-gray-200 text-xs sm:text-[13px]">
                      {userData.id || 'VLR058200508123'}
                    </span>
                    <button
                      onClick={() => handleCopy(userData.id || 'VLR058200508123', 'id')}
                      className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer rounded"
                      title="Copy User ID"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Referral Code */}
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide">Referral Code</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono font-bold text-amber-400 text-xs sm:text-[13px]">
                      {userData.referral?.code || 'VELOOP123'}
                    </span>
                    <button
                      onClick={() => handleCopy(userData.referral?.code || 'VELOOP123', 'ref')}
                      className="p-1 text-amber-400/70 hover:text-amber-300 transition-colors cursor-pointer rounded"
                      title="Copy Referral Code"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Golden Level 04 Shield Crest */}
          <div className="shrink-0 flex flex-col items-center justify-center relative pt-1">
            {/* Glowing amber aura behind shield */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

            <div
              className="relative w-28 sm:w-32 py-3 px-2 rounded-2xl flex flex-col items-center justify-center border shadow-[0_0_24px_rgba(245,158,11,0.25)]"
              style={{
                background: 'linear-gradient(180deg, rgba(32, 22, 60, 0.9) 0%, rgba(18, 12, 40, 0.95) 100%)',
                borderColor: 'rgba(245, 158, 11, 0.45)',
              }}
            >
              {/* Laurel / Top Crown Icon */}
              <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                <Crown className="w-3.5 h-3.5 fill-amber-400/30" />
                <span className="text-[9px] font-extrabold text-amber-300 tracking-[0.2em] uppercase">
                  LEVEL
                </span>
                <Crown className="w-3.5 h-3.5 fill-amber-400/30 scale-x-[-1]" />
              </div>

              {/* Large Level Number */}
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_2px_12px_rgba(251,191,36,0.5)] my-0.5">
                {currentLevelStr}
              </div>

              {/* Bottom Amber Ribbon Banner */}
              <div className="w-full mt-1 px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-[#1a0f00] font-black text-[8px] sm:text-[9px] tracking-wider uppercase text-center shadow-[0_2px_8px_rgba(245,158,11,0.4)] truncate">
                {userData.tier || 'REWARD EXPLORER'}
              </div>
            </div>

            {/* Amber Light Base Glow */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1 blur-[1px]" />
          </div>
        </div>
      </div>

      {/* ─── Right XP Progress Card (1 col on XL screens) ─── */}
      <div
        className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 border overflow-hidden flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{
          background: 'linear-gradient(135deg, rgba(18, 14, 48, 0.95) 0%, rgba(11, 9, 32, 0.98) 100%)',
          borderColor: 'rgba(139, 92, 246, 0.30)',
        }}
      >
        {/* Ambient mountain/nebula background silhouette */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(124, 58, 237, 0.35) 0%, transparent 70%)',
          }}
        />

        {/* Top Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-gray-300 font-bold text-xs tracking-wide">
              <span>XP Progress</span>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>

            <button
              onClick={() => gainXP(25)}
              className="text-[10px] font-bold text-indigo-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30"
              title="Click to boost XP"
            >
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              +25 XP
            </button>
          </div>

          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
              {xpCurrent.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-gray-400 font-mono">
              / {xpMax.toLocaleString()} XP
            </span>
          </div>

          <p className="text-[11px] text-gray-400 font-medium mt-1">
            {xpRemaining > 0 ? `${xpRemaining.toLocaleString()} XP to Level ${nextLevel}` : 'Max Level reached!'}
          </p>
        </div>

        {/* Progress Bar & Circular Percent Gauge */}
        <div className="relative z-10 mt-5 pt-3 flex items-center gap-4">
          {/* Neon Horizontal Gradient Bar */}
          <div className="flex-1">
            <div
              className="relative h-3 bg-white/[0.08] rounded-full overflow-hidden cursor-pointer"
              onClick={() => gainXP(25)}
              title="Click to gain XP"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff5500] via-[#ec4899] to-[#8b5cf6] transition-all duration-700 shadow-[0_0_12px_rgba(236,72,153,0.5)]"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Circular Percentage Ring */}
          <div className="shrink-0 relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/[0.08]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#a855f7]"
                strokeDasharray={`${percentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="url(#xpGrad)"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <defs>
                <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5500" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] font-black text-white">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

