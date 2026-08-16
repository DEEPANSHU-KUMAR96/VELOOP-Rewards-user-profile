import React from 'react';
import { BarChart2, CheckCircle2, Clock, TrendingDown, ArrowDownToLine } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const AnalyticsRow = ({ icon: Icon, label, value, iconColor, valueColor = 'text-white' }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-b-0 group hover:bg-white/[0.02] rounded-xl px-2 transition-all cursor-default">
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}30` }}
      >
        <Icon className="w-4 h-4" style={{ color: iconColor }} />
      </div>
      <span className="text-gray-300 text-sm sm:text-base font-medium">{label}</span>
    </div>
    <span className={`font-bold text-lg sm:text-xl font-mono ${valueColor}`}>{value}</span>
  </div>
);

export const WithdrawalAnalytics = () => {
  const { userData } = useProfile();
  const { totalProcessed, approved, pending, totalWithdrawn } = userData.withdrawalAnalytics;

  return (
    <div className="gsap-fade-in space-y-1">
      <h3 className="text-sm font-bold text-gray-300/70 uppercase tracking-widest mb-4 px-1">
        Withdrawal Analytics
      </h3>

      <div className="rounded-3xl bg-[#13141b]/60 border border-white/[0.05] px-3 py-1">
        <AnalyticsRow
          icon={BarChart2}
          label="Total Processed"
          value={totalProcessed}
          iconColor="#a78bfa"
          valueColor="text-white"
        />
        <AnalyticsRow
          icon={CheckCircle2}
          label="Approved"
          value={approved}
          iconColor="#34d399"
          valueColor="text-emerald-400"
        />
        <AnalyticsRow
          icon={Clock}
          label="Pending"
          value={pending}
          iconColor="#fb923c"
          valueColor="text-orange-400"
        />
        <AnalyticsRow
          icon={ArrowDownToLine}
          label="Total Withdrawn"
          value={totalWithdrawn}
          iconColor="#60a5fa"
          valueColor="text-blue-400"
        />
      </div>
    </div>
  );
};
