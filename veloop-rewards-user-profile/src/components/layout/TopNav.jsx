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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Left: hamburger + mobile logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl transition-all cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff6b00] to-[#e84d00] flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base" style={{ color: 'var(--text-primary)' }}>
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
        <div className="flex items-center gap-2">

          {/* Dark/Light toggle */}
          <button
            onClick={toggle}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer border overflow-hidden group"
            style={{
              background: isDark ? 'rgba(255,107,0,0.08)' : 'rgba(255,180,0,0.10)',
              borderColor: isDark ? 'rgba(255,107,0,0.25)' : 'rgba(255,180,0,0.30)',
              color: isDark ? '#ff8c32' : '#f59e0b',
            }}
          >
            {/* Animated background sweep on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              style={{ background: isDark ? 'rgba(255,107,0,0.15)' : 'rgba(255,200,0,0.15)' }}
            />
            <span className="relative theme-toggle-icon entering">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </span>
          </button>

          {/* Bell */}
          <button
            onClick={() => showToast('🔔 No new notifications', 'info')}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer"
            style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff6b00] border shadow-[0_0_6px_rgba(255,107,0,0.8)]" style={{ borderColor: 'var(--bg-base)' }} />
          </button>

          {/* Avatar */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-2xl border transition-all cursor-pointer"
            style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-hover)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-hover)'}
          >
            <img
              src={userData.avatar}
              alt={userData.username}
              className="w-7 h-7 rounded-full object-cover border border-[#ff8c32]/30"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=60&auto=format&fit=crop'; }}
            />
            <span className="hidden sm:block text-sm font-semibold max-w-[100px] truncate" style={{ color: 'var(--text-primary)' }}>
              {userData.username}
            </span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      </div>
    </header>
  );
};
