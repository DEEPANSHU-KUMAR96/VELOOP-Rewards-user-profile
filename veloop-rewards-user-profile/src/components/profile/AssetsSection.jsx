import React, { useRef, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { animateCounter } from '../../hooks/useGsapAnimations';
import { Eye, Gem } from 'lucide-react';

// Custom token SVG icon
const TokenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M9 10h6M9 14h6" strokeLinecap="round" />
  </svg>
);

const VeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const AssetCard = ({ icon: Icon, label, value, color, glowColor }) => {
  const valRef = useRef(null);

  useEffect(() => {
    if (valRef.current) animateCounter(valRef.current, value, 1.0);
  }, [value]);

  return (
    <div className="assetCard flex flex-col items-center gap-2.5 group cursor-default">
      <div
        className="assetCircle transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105"
        style={{
          borderColor: `${color}30`,
          boxShadow: `0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 8px 24px ${glowColor}55, inset 0 1px 0 rgba(255,255,255,0.15)`;
          e.currentTarget.style.borderColor = `${color}70`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`;
          e.currentTarget.style.borderColor = `${color}30`;
        }}
      >
        <span style={{ color }}><Icon /></span>
      </div>
      <div className="text-center">
        <p ref={valRef} className="text-xl font-bold text-white font-mono leading-none">
          {value}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium tracking-wide">{label}</p>
      </div>
    </div>
  );
};

export const AssetsSection = () => {
  const { userData } = useProfile();

  return (
    <div className="gsap-fade-in">
      <h3 className="text-sm font-bold text-gray-300/70 uppercase tracking-widest mb-4 px-1">
        Your Assets
      </h3>
      <div className="flex justify-around items-start py-5 px-4 rounded-3xl bg-[#13141b]/60 border border-white/[0.05]">
        <AssetCard
          icon={VeIcon}
          label="VEs"
          value={userData.assets.ves}
          color="#ff8c32"
          glowColor="#ff6b00"
        />
        <AssetCard
          icon={Gem}
          label="Gems"
          value={userData.assets.gems}
          color="#c084fc"
          glowColor="#a855f7"
        />
        <AssetCard
          icon={TokenIcon}
          label="Tokens"
          value={userData.assets.tokens}
          color="#34d399"
          glowColor="#10b981"
        />
      </div>
    </div>
  );
};
