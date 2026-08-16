import React, { useRef, useEffect } from 'react';
import { Cpu, Star, Hash, ArrowDownToLine, TrendingUp } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { animateCounter } from '../../hooks/useGsapAnimations';

const STATS = [
  { key: 'availableVEs', label: 'Available VEs', icon: Cpu, color: '#ff8c32', prefix: '' },
  { key: 'currentXp', label: 'Current XP', icon: Star, color: '#a78bfa', prefix: '' },
  { key: 'rank', label: 'Global Rank', icon: Hash, color: '#ff8c32', prefix: '#' },
  { key: 'withdrawalsCount', label: 'Withdrawals', icon: ArrowDownToLine, color: '#34d399', prefix: '' },
];

const StatCard = ({ icon: Icon, label, value, color, prefix = '' }) => {
  const valRef = useRef(null);

  useEffect(() => {
    if (valRef.current) animateCounter(valRef.current, value, 1.0);
  }, [value]);

  return (
    <div className="stat-card stat-card-bluish rounded-2xl p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3 group cursor-default">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
        </div>
        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-[#38bdf8] transition-colors" style={{ color: 'var(--text-muted)' }} />
      </div>
      <div>
        <p ref={valRef} className="text-2xl sm:text-3xl font-black font-mono leading-none tracking-tight truncate" style={{ color: prefix ? color : 'var(--text-primary)' }}>
          {prefix}{value}
        </p>
        <p className="text-[11px] sm:text-xs mt-1.5 font-medium uppercase tracking-wider truncate" style={{ color: 'var(--text-muted)' }}>{label}</p>
      </div>
    </div>
  );
};

export const WebStatsRow = () => {
  const { userData } = useProfile();

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map(({ key, label, icon, color, prefix }) => (
        <StatCard
          key={key}
          icon={icon}
          label={label}
          value={userData[key]}
          color={color}
          prefix={prefix}
        />
      ))}
    </div>
  );
};
