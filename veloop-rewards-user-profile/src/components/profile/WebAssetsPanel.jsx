import React, { useRef, useEffect } from 'react';
import { Gem, Info } from 'lucide-react';
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
  { key: 'ves', label: 'VE Tokens', sublabel: 'Veloop Ecosystem', icon: VeIcon, color: '#ff8c32', glow: '#ff6b00' },
  { key: 'gems', label: 'Gems', sublabel: 'Premium Currency', icon: Gem, color: '#c084fc', glow: '#a855f7' },
  { key: 'tokens', label: 'Tokens', sublabel: 'Utility Token', icon: TokenIcon, color: '#34d399', glow: '#10b981' },
];

const AssetCard = ({ icon: Icon, label, sublabel, value, color, glow }) => {
  const valRef = useRef(null);
  useEffect(() => { if (valRef.current) animateCounter(valRef.current, value, 1.0); }, [value]);

  return (
    <div
      className="flex-1 rounded-2xl p-5 border relative overflow-hidden group cursor-default transition-all duration-300 hover:-translate-y-1"
      style={{ background: `linear-gradient(135deg, ${glow}10 0%, var(--bg-card) 60%)`, borderColor: `${color}20` }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.boxShadow = `0 12px 30px ${glow}25`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${color}20`; e.currentTarget.style.boxShadow = ''; }}
    >
      {/* Background glow orb */}
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-[25px] opacity-20 transition-opacity group-hover:opacity-40" style={{ background: glow }} />

      {/* Icon */}
      <div className="float-anim w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
        <span style={{ color }}><Icon /></span>
      </div>

      {/* Values */}
      <p ref={valRef} className="text-3xl font-black font-mono text-center leading-none" style={{ color: 'var(--text-primary)' }}>{value}</p>
      <p className="text-sm font-bold text-center mt-1.5" style={{ color }}>{label}</p>
      <p className="text-[11px] text-center mt-0.5" style={{ color: 'var(--text-muted)' }}>{sublabel}</p>
    </div>
  );
};

export const WebAssetsPanel = () => {
  const { userData, showToast } = useProfile();

  return (
    <div className="glass rounded-3xl p-5 sm:p-6 border border-theme-subtle">
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-theme-primary">Your Rewards</h3>
          <button
            onClick={() => showToast('ℹ️ Rewards are earned by participating in challenges and referrals.', 'info')}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Rewards Info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => showToast('Navigating to All Rewards...', 'info')}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
        >
          View All Rewards →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {ASSETS.map(({ key, ...rest }) => (
          <AssetCard key={key} value={userData.assets[key]} {...rest} />
        ))}
      </div>
    </div>
  );
};
