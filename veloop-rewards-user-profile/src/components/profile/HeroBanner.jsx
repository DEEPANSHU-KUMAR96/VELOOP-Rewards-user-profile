import React, { useRef, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Badge } from '../common/Badge';
import { Zap, ArrowDownToLine, Settings } from 'lucide-react';
import gsap from 'gsap';

export const HeroBanner = () => {
  const { userData, gainXP, setWithdrawOpen, setSettingsOpen } = useProfile();
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
      <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 h-full min-h-[280px]">

        {/* Left — User info */}
        <div className="flex items-end gap-5 sm:gap-6">
          {/* Avatar with animated ring */}
          <div className="relative shrink-0">
            <div className="gsap-avatar w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-[3px] bg-gradient-to-br from-[#ff9e42] via-[#ff5500] to-[#7c2d12] shadow-[0_0_30px_rgba(255,107,0,0.4)] glow-ring">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#111]">
                <img
                  src={userData.avatar}
                  alt={userData.username}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop'; }}
                />
              </div>
            </div>
            {/* Online dot */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0e0e1a] shadow-[0_0_10px_#10b981]" />
          </div>

          {/* Text info */}
          <div className="pb-1">
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <Badge variant="level" label={`Level ${userData.level}`} size="md" />
              {userData.isVerified && <Badge variant="verified" size="md" />}
              {userData.level >= 5 && <Badge variant="pro" label={userData.tier} size="sm" />}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mb-1">
              {userData.username}
            </h1>
            <p className="text-sm text-gray-400">
              Member since {userData.memberSince} &middot; <span className="text-[#ff8c32]">{userData.email}</span>
            </p>

            {/* XP bar inline */}
            <div className="mt-4 w-64 sm:w-80">
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
          </div>
        </div>

        {/* Right — Action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => gainXP(25)}
            className="btn-orange flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white font-bold text-sm cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Gain XP
          </button>
          <button
            onClick={() => setWithdrawOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-gray-200 font-bold text-sm hover:bg-white/[0.10] hover:border-white/[0.18] transition-all cursor-pointer active:scale-95"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Withdraw
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.10] transition-all cursor-pointer"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
