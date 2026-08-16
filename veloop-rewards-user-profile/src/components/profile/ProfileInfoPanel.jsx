import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Shield, Mail, Calendar, Hash, Zap, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

const InfoRow = ({ icon: Icon, label, value, color = '#6b7280' }) => (
  <div className="flex items-center justify-between gap-3 py-3.5 last:border-0" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
    <div className="flex items-center gap-2.5 shrink-0" style={{ color: 'var(--text-muted)' }}>
      <Icon className="w-4 h-4 shrink-0" style={{ color }} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm font-semibold truncate text-right" style={{ color: 'var(--text-primary)' }}>{value}</span>
  </div>
);

export const ProfileInfoPanel = () => {
  const { userData } = useProfile();

  return (
    <div className="glass rounded-3xl p-6 border border-theme-subtle">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#ff8c32]/10 border border-[#ff8c32]/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#ff943d]" />
        </div>
        <div>
          <h3 className="font-bold text-theme-primary text-base">Profile Info</h3>
          <p className="text-xs text-theme-muted">Account details & status</p>
        </div>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-2 mb-5 pb-5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <Badge variant="level" label={`Level ${userData.level}`} size="md" />
        {userData.isVerified && <Badge variant="verified" size="md" />}
        {userData.level >= 5 && <Badge variant="pro" label={userData.tier} size="md" />}
      </div>

      <div>
        <InfoRow icon={Hash} label="User ID" value={userData.id} color="#a78bfa" />
        <InfoRow icon={Mail} label="Email" value={userData.email} color="#60a5fa" />
        <InfoRow icon={Calendar} label="Member Since" value={userData.memberSince} color="#34d399" />
        <InfoRow icon={Award} label="Tier" value={userData.tier} color="#fb923c" />
        <InfoRow icon={Zap} label="Total XP" value={userData.currentXp.toLocaleString()} color="#ff8c32" />
      </div>
    </div>
  );
};
