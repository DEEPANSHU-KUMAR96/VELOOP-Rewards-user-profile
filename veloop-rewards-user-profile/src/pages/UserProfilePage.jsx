import React, { useRef, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { useGsapAnimations } from '../hooks/useGsapAnimations';

// Layout
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav }  from '../components/layout/TopNav';

// Sections
import { HeroBanner }        from '../components/profile/HeroBanner';
import { WebStatsRow }       from '../components/profile/WebStatsRow';
import { WebAssetsPanel }    from '../components/profile/WebAssetsPanel';
import { WebReferralPanel }  from '../components/profile/WebReferralPanel';
import { WebAnalyticsPanel } from '../components/profile/WebAnalyticsPanel';
import { ProfileInfoPanel }  from '../components/profile/ProfileInfoPanel';

// Modals
import { SettingsModal } from '../components/profile/SettingsModal';
import { WithdrawModal } from '../components/profile/WithdrawModal';
import { AvatarModal }   from '../components/profile/AvatarModal';

// Common
import { Toast } from '../components/common/Toast';

// Mobile bottom nav
import { Home, Gift, Users2, UserCircle2, Flame } from 'lucide-react';

const MobileBottomNav = () => {
  const { activeTab, setActiveTab, showToast } = useProfile();
  const TABS = [
    { id: 'home',    label: 'Home',    icon: Home },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'refer',   label: 'Refer',   icon: Users2 },
    { id: 'account', label: 'Profile', icon: UserCircle2 },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/[0.06] flex justify-around items-center px-4 py-3 pb-5">
      {TABS.map(({ id, label, icon: Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => { setActiveTab(id); if (id !== 'account') showToast(`Navigating to ${label}...`, 'info'); }}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-[#ff6b00] shadow-[0_4px_14px_rgba(255,107,0,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}>
              <Icon className={`w-4.5 h-4.5 ${active ? 'text-white' : ''}`} />
            </div>
            <span className={`text-[10px] font-semibold ${active ? 'text-[#ff943d]' : 'text-gray-500'}`}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export const UserProfilePage = () => {
  const { toast, hideToast } = useProfile();
  const containerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useGsapAnimations(containerRef, []);

  return (
    <div ref={containerRef} className="min-h-screen flex" style={{ background: 'var(--bg-base)', transition: 'background 0.35s ease' }}>

      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-80px] left-[30%] w-[500px] h-[500px] bg-[#ff6b00]/[0.06] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-[5%] w-[320px] h-[320px] bg-[#7c3aed]/[0.05] rounded-full blur-[80px]" />
        <div className="absolute top-[40%] left-[60%] w-[200px] h-[200px] bg-[#0ea5e9]/[0.04] rounded-full blur-[60px]" />
      </div>

      {/* Sidebar — desktop */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 w-72 max-w-[85vw] h-full p-6 flex flex-col overflow-y-auto" style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-strong)' }}>
            <div className="flex items-center justify-between gap-2 mb-6 shrink-0">
              <div className="flex items-center gap-3">
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
            </div>
            <Sidebar mobile={true} onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative z-10">

        {/* Top Nav */}
        <TopNav onMenuToggle={() => setMobileMenuOpen(p => !p)} menuOpen={mobileMenuOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 pb-24 lg:pb-10">

          <div className="gsap-fade-in"><HeroBanner /></div>

          <div className="gsap-fade-in"><WebStatsRow /></div>

          <div className="gsap-fade-in"><WebAssetsPanel /></div>

          <div className="gsap-fade-in grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <div className="lg:col-span-1"><WebReferralPanel /></div>
            <div className="lg:col-span-1"><WebAnalyticsPanel /></div>
            <div className="lg:col-span-1"><ProfileInfoPanel /></div>
          </div>

          <div className="gsap-fade-in pt-4 pb-2 text-center text-xs text-gray-600 font-medium tracking-wider border-t border-white/[0.04]">
            © 2026 Veloop Rewards · v2.0.0 · Built for the future of rewards
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />

      {/* Modals */}
      <SettingsModal />
      <WithdrawModal />
      <AvatarModal />

      {/* Toast */}
      <Toast show={toast.show} message={toast.message} type={toast.type} onClose={hideToast} />
    </div>
  );
};
