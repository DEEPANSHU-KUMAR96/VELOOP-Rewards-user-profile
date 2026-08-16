import React, { useRef, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Badge } from '../common/Badge';
import { Zap, ArrowDownToLine, Settings, Pencil } from 'lucide-react';
import gsap from 'gsap';

export const HeroBanner = () => {
  const { userData, gainXP, setWithdrawOpen, setSettingsOpen, setAvatarModalOpen } = useProfile();
  const bannerRef = useRef(null);
  const percentage = Math.min(100, Math.max(0, (userData.xp / userData.maxExp) * 100));

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(bannerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    }
  }, []);

  return (
    <div ref={bannerRef} className="relative w-full rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[300px]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d00] via-[#0e0e1a] to-[#050608]" />
      <div className="absolute inset-0 hero-banner" />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#ff6b00]/15 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-40 h-40 bg-[#7c3aed]/10 rounded-full blur-[50px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-8 flex flex-col h-full min-h-[280px] gap-5">

        {/* Top row — Avatar + User info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
          {/* Avatar with animated ring and pencil icon */}
          <div className="relative shrink-0 group/avatar">
            <div
              onClick={() => setAvatarModalOpen(true)}
              className="gsap-avatar w-20 h-20 sm:w-28 sm:h-28 rounded-2xl p-[3px] bg-gradient-to-br from-[#ff9e42] via-[#ff5500] to-[#7c2d12] shadow-[0_0_30px_rgba(255,107,0,0.4)] glow-ring cursor-pointer transition-transform duration-300 group-hover/avatar:scale-[1.02] relative"
              title="Click to change avatar"
            >
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#111] relative">
                <img
                  src={userData.avatar}
                  alt={userData.username}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-108"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop'; }}
                />

                {/* Dark hover overlay with edit cue */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover/avatar:opacity-100 transition-all duration-200 flex flex-col items-center justify-center text-white gap-1">
                  <Pencil className="w-4 h-4 text-[#ff9e42] animate-bounce" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-white/90">Change</span>
                </div>
              </div>
            </div>

            {/* Pencil Icon Button Badge */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAvatarModalOpen(true);
              }}
              className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff7a1a] to-[#ff5000] border-2 border-[#12141c] text-white shadow-[0_4px_12px_rgba(255,107,0,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-20 group/pencil"
              aria-label="Change profile avatar"
              title="Change avatar"
            >
              <Pencil className="w-3.5 h-3.5 group-hover/pencil:rotate-12 transition-transform" />
            </button>

            {/* Online dot indicator (top-right) */}
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0e0e1a] shadow-[0_0_10px_#10b981]"
              title="Online"
            />
          </div>

          {/* Text info */}
          <div className="text-center sm:text-left w-full min-w-0">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start mb-2">
              <Badge variant="level" label={`Level ${userData.level}`} size="md" />
              {userData.isVerified && <Badge variant="verified" size="md" />}
              {userData.level >= 5 && <Badge variant="pro" label={userData.tier} size="sm" />}
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-none mb-1 break-all">
              {userData.username}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Member since {userData.memberSince} &middot; <span className="text-[#ff8c32] break-all">{userData.email}</span>
            </p>
          </div>
        </div>

        {/* XP bar — full width */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>XP Progress</span>
            <span className="text-[#ff8c32] font-bold font-mono">{userData.xp} / {userData.maxExp}</span>
          </div>
          <div
            className="relative h-2.5 bg-white/[0.08] rounded-full overflow-hidden cursor-pointer"
            onClick={() => gainXP(25)}
            title="Click to gain 25 XP"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff8c32] to-[#ff4800] transition-all duration-700"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white progress-spark" />
            </div>
          </div>
        </div>

        {/* Action buttons — responsive row */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => gainXP(25)}
            className="btn-orange flex items-center gap-2 px-4 py-2.5 rounded-2xl text-white font-bold text-sm cursor-pointer flex-1 sm:flex-none justify-center"
          >
            <Zap className="w-4 h-4" />
            Gain XP
          </button>
          <button
            onClick={() => setWithdrawOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-gray-200 font-bold text-sm hover:bg-white/[0.10] hover:border-white/[0.18] transition-all cursor-pointer active:scale-95 flex-1 sm:flex-none justify-center"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Withdraw
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.10] transition-all cursor-pointer shrink-0"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
