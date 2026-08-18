import React, { useState } from 'react';
import { Bell, Search, Menu, X, Flame, ChevronDown, Sun, Moon } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';

export const TopNav = ({ onMenuToggle, menuOpen }) => {
  const { userData, setSettingsOpen, showToast } = useProfile();
  const { isDark, toggle } = useTheme();
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 w-full border-b"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">

        {/* Left: hamburger + mobile logo */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl transition-all cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff6b00] to-[#e84d00] flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-sm sm:text-base whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
              Veloop<span className="text-[#ff6b00]"> Rewards</span>
            </span>
          </div>
        </div>

        {/* Center: Search */}
        <div
          className="hidden sm:flex items-center gap-2.5 flex-1 max-w-md mx-auto px-4 py-2.5 rounded-2xl border transition-all duration-200"
          style={{
            background: searchFocus ? 'var(--bg-input)' : 'var(--bg-hover)',
            borderColor: searchFocus ? 'rgba(255,107,0,0.45)' : 'var(--border-subtle)',
          }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search rewards, transactions..."
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            className="bg-transparent text-sm outline-none w-full placeholder-[var(--text-muted)]"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search button (mobile) */}
          <button
            onClick={() => showToast('🔍 Search activated', 'info')}
            className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bell with red badge '3' */}
          <button
            onClick={() => showToast('🔔 You have 3 unread notifications', 'info')}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.8)]">
              3
            </span>
          </button>

          {/* Gift Icon */}
          <button
            onClick={() => showToast('🎁 Daily gift box available to claim!', 'celebration')}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            title="Daily Gift"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-purple-300">
              <rect x="3" y="8" width="18" height="4" rx="1"/>
              <path d="M12 8v13"/>
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
            </svg>
          </button>

          {/* Profile Chip: Avatar + Ayan Alam + Level 04 + Chevron */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-2xl border border-white/[0.1] transition-all cursor-pointer hover:border-purple-500/40"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <img
              src={userData.avatar || '/avatar.jpg'}
              alt={userData.displayName || userData.username}
              className="w-7 h-7 rounded-full object-cover border border-purple-400/50"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=60&auto=format&fit=crop'; }}
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                {userData.displayName || 'Ayan Alam'}
              </span>
              <span className="text-[10px] font-semibold text-purple-300/80 leading-tight">
                Level {String(userData.level || 4).padStart(2, '0')}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
};
