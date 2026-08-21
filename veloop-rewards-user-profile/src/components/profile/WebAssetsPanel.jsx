import React, { useRef, useEffect } from 'react';
import { Gem, Info, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { animateCounter } from '../../hooks/useGsapAnimations';

const VeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const TokenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M9 10h6M9 14h6" strokeLinecap="round" />
  </svg>
);

const ASSETS = [
  {
    key: 'ves',
    label: 'VE Tokens',
    sublabel: 'Veloop Ecosystem',
    icon: VeIcon,
    color: '#ff8c32',
    glow: '#ff6b00',
    gradient: 'linear-gradient(135deg, rgba(20,12,4,0.92) 0%, rgba(255,107,0,0.22) 60%, rgba(255,140,50,0.12) 100%)',
    badge: '+12.4%',
    badgeColor: '#ff9e42',
  },
  {
    key: 'gems',
    label: 'Gems',
    sublabel: 'Premium Currency',
    icon: Gem,
    color: '#c084fc',
    glow: '#a855f7',
    gradient: 'linear-gradient(135deg, rgba(12,8,24,0.92) 0%, rgba(168,85,247,0.22) 60%, rgba(192,132,252,0.12) 100%)',
    badge: '+5.0%',
    badgeColor: '#c084fc',
  },
  {
    key: 'tokens',
    label: 'Tokens',
    sublabel: 'Utility Token',
    icon: TokenIcon,
    color: '#34d399',
    glow: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(4,18,14,0.92) 0%, rgba(16,185,129,0.22) 60%, rgba(52,211,153,0.12) 100%)',
    badge: '+8.1%',
    badgeColor: '#34d399',
  },
];

const AssetCard = ({ icon: Icon, label, sublabel, value, color, glow, gradient, badge, badgeColor }) => {
  const valRef = useRef(null);
  useEffect(() => { if (valRef.current) animateCounter(valRef.current, value, 1.0); }, [value]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1.5 group"
      style={{
        background: gradient,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${color}35`,
        boxShadow: `0 4px 24px -6px ${glow}30, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}65`;
        e.currentTarget.style.boxShadow = `0 16px 40px -8px ${glow}50, inset 0 1px 0 rgba(255,255,255,0.08)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}35`;
        e.currentTarget.style.boxShadow = `0 4px 24px -6px ${glow}30, inset 0 1px 0 rgba(255,255,255,0.06)`;
      }}
    >
      {/* Background glow orb */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40"
        style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
      />

      {/* Shimmer line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="relative z-10 p-5">
        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="float-anim w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
              border: `1px solid ${color}40`,
              boxShadow: `0 6px 16px -4px ${glow}50`,
            }}
          >
            <span style={{ color }}><Icon /></span>
          </div>

          {/* % change badge */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{
              background: `${badgeColor}15`,
              border: `1px solid ${badgeColor}30`,
              color: badgeColor,
            }}
          >
            <TrendingUp className="w-2.5 h-2.5" />
            {badge}
          </div>
        </div>

        {/* Value */}
        <p ref={valRef} className="text-3xl sm:text-4xl font-black font-mono leading-none mb-1.5" style={{ color: 'var(--text-primary)' }}>
          {value.toLocaleString()}
        </p>

        {/* Label + sublabel */}
        <p className="text-sm font-bold" style={{ color }}>{label}</p>
        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sublabel}</p>

        {/* Bottom action hint */}
        <div
          className="flex items-center gap-1 mt-3 pt-2.5 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            borderTop: `1px solid ${color}18`,
            color,
          }}
        >
          <ArrowUpRight className="w-3 h-3" />
          View Details
        </div>
      </div>
    </div>
  );
};

export const WebAssetsPanel = () => {
  const { userData, showToast } = useProfile();

  return (
    <div className="glass rounded-3xl p-5 sm:p-6 border border-theme-subtle relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute -top-8 -left-8 w-40 h-40 bg-[#ff6b00]/05 rounded-full pointer-events-none" style={{ filter: 'blur(40px)' }} />
      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#8b5cf6]/05 rounded-full pointer-events-none" style={{ filter: 'blur(40px)' }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,140,50,0.12)', border: '1px solid rgba(255,140,50,0.25)' }}
            >
              <Gem className="w-4.5 h-4.5 text-[#ff9e42]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-theme-primary leading-tight">Your Rewards</h3>
              <p className="text-[11px] text-gray-400">Live balances</p>
            </div>
            <button
              onClick={() => showToast('ℹ️ Rewards are earned by participating in challenges and referrals.', 'info')}
              className="text-gray-500 hover:text-white transition-colors cursor-pointer ml-0.5"
              title="Rewards Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={() => showToast('Navigating to All Rewards...', 'info')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1 group"
          >
            View All
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {ASSETS.map(({ key, ...rest }) => (
            <AssetCard key={key} value={userData.assets[key]} {...rest} />
          ))}
        </div>
      </div>
    </div>
  );
};
