import React from 'react';
import { BarChart2, CheckCircle2, Clock, ArrowDownToLine } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const ROW = [
  { key: 'totalProcessed', label: 'Total Processed', icon: BarChart2, color: '#a78bfa' },
  { key: 'approved',       label: 'Approved',         icon: CheckCircle2, color: '#34d399' },
  { key: 'pending',        label: 'Pending',           icon: Clock,        color: '#fb923c' },
  { key: 'totalWithdrawn', label: 'Total Withdrawn',   icon: ArrowDownToLine, color: '#60a5fa' },
];

export const WebAnalyticsPanel = () => {
  const { userData } = useProfile();
  const analytics = userData.withdrawalAnalytics;

  return (
    <div className="glass rounded-3xl p-6 border border-theme-subtle h-full">
      <h3 className="text-base font-bold text-theme-primary mb-1">Withdrawal Analytics</h3>
      <p className="text-xs text-theme-muted mb-5">Transaction summary</p>

      <div className="space-y-2">
        {ROW.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="flex items-center justify-between p-3.5 rounded-2xl border transition-all group cursor-default"
            style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
            </div>
            <span className="font-black text-xl font-mono" style={{ color: 'var(--text-primary)' }}>{analytics[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
