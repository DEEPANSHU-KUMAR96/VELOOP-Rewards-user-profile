import React from 'react';
import {
  Home, Gift, Trophy, FileText, Wallet, Users,
  ArrowDownToLine, Medal, Settings, HelpCircle,
  ChevronRight
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const VeloopLogo = () => (
  <div className="flex items-center gap-3">
    {/* Geometric nested diamond logo */}
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      <div className="w-7 h-7 rotate-45 rounded-md border-2 border-amber-400 bg-amber-500/10 flex items-center justify-center shadow-[0_0_14px_rgba(251,191,36,0.4)]">
        <div className="w-3.5 h-3.5 rotate-45 border-2 border-amber-300 bg-amber-400/30 rounded-xs" />
      </div>
    </div>
    <div className="flex flex-col">
      <span className="font-extrabold text-[15px] tracking-wider leading-none text-white">
        VELOOP
      </span>
      <span className="text-[9px] tracking-[0.22em] font-bold text-gray-400 leading-tight mt-1">
        REWARDS
      </span>
    </div>
  </div>
);

const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview',       icon: Home },
  { id: 'rewards',      label: 'Rewards',        icon: Gift },
  { id: 'achievements', label: 'Achievements',   icon: Trophy },
  { id: 'activity',     label: 'Activity',       icon: FileText },
  { id: 'wallet',       label: 'Wallet',         icon: Wallet },
  { id: 'referrals',    label: 'Referrals',      icon: Users },
  { id: 'withdrawals',  label: 'Withdrawals',    icon: ArrowDownToLine },
  { id: 'leaderboard',  label: 'Leaderboard',    icon: Medal },
  { id: 'settings',     label: 'Settings',       icon: Settings },
  { id: 'support',      label: 'Help & Support', icon: HelpCircle },
];

export const Sidebar = ({ mobile = false, onClose }) => {
  const { activeTab, setActiveTab, showToast, setSettingsOpen } = useProfile();

  const currentTab = activeTab === 'account' || activeTab === 'home' ? 'overview' : activeTab;

  const handleTab = (id) => {
    if (id === 'settings') {
      setSettingsOpen(true);
      if (onClose) onClose();
      return;
    }
    setActiveTab(id);
    if (id !== 'overview') {
      const item = NAV_ITEMS.find((n) => n.id === id);
      showToast(`Navigating to ${item ? item.label : id}...`, 'info');
    }
    if (onClose) onClose();
  };

  return (
    <aside
      className={
        mobile
          ? "flex flex-col h-full w-full z-40 transition-all duration-300 overflow-y-auto no-scrollbar"
          : "hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 z-40 pt-5 pb-4 px-3.5 transition-all duration-300 theme-sidebar overflow-y-auto no-scrollbar justify-between"
      }
      style={{
        background: mobile ? 'transparent' : 'var(--bg-sidebar)',
        borderRight: mobile ? 'none' : '1px solid var(--border-subtle)'
      }}
    >
      <div>
        {/* Logo (shown on desktop sidebar) */}
        {!mobile && (
          <div className="px-2 mb-4">
            <VeloopLogo />
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="space-y-0.5">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = currentTab === id;
            return (
              <button
                key={id}
                id={`sidebar-nav-${id}${mobile ? '-mobile' : ''}`}
                onClick={() => handleTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer text-left ${
                  active
                    ? 'text-white border border-indigo-500/40 shadow-[0_0_16px_rgba(99,102,241,0.25)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
                }`}
                style={{
                  background: active
                    ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.4) 0%, rgba(124, 58, 237, 0.3) 100%)'
                    : 'transparent',
                }}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    active ? 'text-indigo-300' : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                />
                <span className="flex-1 truncate">{label}</span>
                {active && (
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-300/80 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Daily Streak Card */}
      <div className="mt-3 pt-2 shrink-0">
        <div
          className="rounded-2xl p-3.5 border relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.5)] group cursor-pointer transition-all duration-300 hover:border-purple-500/60"
          style={{
            background: 'linear-gradient(180deg, rgba(22, 16, 52, 0.96) 0%, rgba(11, 8, 28, 0.98) 100%)',
            borderColor: 'rgba(168, 85, 247, 0.45)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.25)',
          }}
        >
          {/* Ambient Purple Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 mb-2.5">
            <p className="text-xs font-bold text-amber-400 tracking-wide">
              Daily Streak
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-lg">🔥</span>
              <span className="text-xl font-black text-white tracking-tight">7 Days</span>
            </div>
            <p className="text-[11px] text-gray-200/90 font-medium mt-0.5">
              Keep it up! You're on fire! 🔥
            </p>
          </div>

          {/* Seamless Full Rocket Graphic */}
          <div className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-[#080518]">
            <img
              src="/rocket_streak.jpg"
              alt="Daily Streak Rocket"
              className="w-full object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-xl"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1517976487547-5d7593c66f4c?q=80&w=400&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-xl" />
          </div>
        </div>
      </div>
    </aside>
  );
};

