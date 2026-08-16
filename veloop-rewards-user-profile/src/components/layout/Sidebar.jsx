import React from 'react';
import {
  Home, Gift, Users2, UserCircle2, Zap, BarChart2,
  Settings, ChevronRight, Flame
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const LOGO = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#e84d00] flex items-center justify-center shadow-[0_4px_14px_rgba(255,107,0,0.5)]">
      <Flame className="w-5 h-5 text-white" />
    </div>
    <div>
      <span className="font-black text-lg tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>Veloop</span>
      <span className="text-[#ff6b00] font-black text-lg tracking-tight leading-none"> Rewards</span>
    </div>
  </div>
);

const NAV_ITEMS = [
  { id: 'home',      label: 'Home',      icon: Home },
  { id: 'rewards',   label: 'Rewards',   icon: Gift },
  { id: 'refer',     label: 'Refer',     icon: Users2 },
  { id: 'account',   label: 'Profile',   icon: UserCircle2 },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'boost',     label: 'Boost XP',  icon: Zap },
];

export const Sidebar = () => {
  const { activeTab, setActiveTab, showToast, userData, setSettingsOpen } = useProfile();

  const handleTab = (id) => {
    setActiveTab(id);
    if (id !== 'account') showToast(`Navigating to ${id.charAt(0).toUpperCase() + id.slice(1)}...`, 'info');
  };

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 z-40 pt-7 pb-6 px-4 transition-all duration-300 theme-sidebar"
      style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-subtle)' }}
    >
      {/* Logo */}
      <div className="px-2 mb-10">
        <LOGO />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] uppercase tracking-widest font-bold px-3 mb-3" style={{ color: 'var(--text-muted)' }}>Menu</p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              id={`sidebar-nav-${id}`}
              onClick={() => handleTab(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer group border-l-[3px]"
              style={{
                background: active ? 'rgba(255,107,0,0.10)' : 'transparent',
                borderLeftColor: active ? '#ff6b00' : 'transparent',
                color: active ? '#ff943d' : 'var(--text-secondary)',
                paddingLeft: active ? '9px' : '12px',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
            >
              <Icon
                className="w-4 h-4 shrink-0 transition-colors"
                style={{ color: active ? '#ff6b00' : 'var(--text-muted)' }}
              />
              {label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color: 'rgba(255,140,50,0.6)' }} />}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer group"
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <img
            src={userData.avatar}
            alt={userData.username}
            className="w-9 h-9 rounded-full object-cover border border-[#ff8c32]/30 shrink-0"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=80&auto=format&fit=crop'; }}
          />
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{userData.username}</p>
            <p className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>Level {userData.level}</p>
          </div>
          <Settings className="w-4 h-4 transition-colors group-hover:text-[#ff8c32]" style={{ color: 'var(--text-muted)' }} />
        </button>
      </div>
    </aside>
  );
};
