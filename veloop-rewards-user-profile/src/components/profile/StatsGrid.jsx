import React, { useRef, useEffect } from 'react';
import { Cpu, Star, Hash, ArrowDownToLine } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { animateCounter } from '../../hooks/useGsapAnimations';

const StatItem = ({ icon: Icon, label, value, color = '#ff8c32', isRank = false }) => {
  const valRef = useRef(null);

  useEffect(() => {
    if (valRef.current) {
      animateCounter(valRef.current, value, 1.0);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center gap-2.5 py-4 px-2 rounded-2xl bg-[#13141b]/60 border border-white/[0.05] hover:border-[#ff8c32]/20 transition-all group cursor-default">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}35` }}
      >
        <Icon className="w-4.5 h-4.5" style={{ color }} />
      </div>
      <div className="text-center">
        <p
          ref={valRef}
          className="text-2xl sm:text-3xl font-extrabold leading-none font-mono mb-1"
          style={{ color: isRank ? '#ff8c32' : 'white' }}
        >
          {isRank && value > 0 ? `#${value}` : value}
        </p>
        <p className="text-[11px] sm:text-xs text-gray-400/80 font-medium tracking-wider uppercase">{label}</p>
      </div>
    </div>
  );
};

export const StatsGrid = () => {
  const { userData } = useProfile();

  return (
    <div className="gsap-fade-in grid grid-cols-2 gap-3">
      <StatItem
        icon={Cpu}
        label="Available VEs"
        value={userData.availableVEs}
        color="#ff8c32"
      />
      <StatItem
        icon={Star}
        label="Current XP"
        value={userData.currentXp}
        color="#a78bfa"
      />
      <StatItem
        icon={Hash}
        label="Rank"
        value={userData.rank}
        color="#ff8c32"
        isRank={true}
      />
      <StatItem
        icon={ArrowDownToLine}
        label="Withdrawals"
        value={userData.withdrawalsCount}
        color="#34d399"
      />
    </div>
  );
};
