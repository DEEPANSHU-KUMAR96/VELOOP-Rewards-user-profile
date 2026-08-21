import React, { useState } from 'react';
import { X, Bell, Shield, LogOut, ChevronRight, Smartphone, HelpCircle, Pencil, Mail, Users, BarChart3 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useProfile } from '../../context/ProfileContext';

/* ── Toggle Switch ── */
const ToggleSwitch = ({ enabled, onToggle, color = '#ff6b00' }) => (
  <button
    onClick={onToggle}
    className="relative w-11 h-6 rounded-full transition-all duration-300 cursor-pointer shrink-0 focus:outline-none"
    style={{
      background: enabled
        ? `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`
        : 'rgba(255,255,255,0.1)',
      border: enabled ? `1px solid ${color}80` : '1px solid rgba(255,255,255,0.12)',
      boxShadow: enabled ? `0 0 10px ${color}55` : 'none',
    }}
  >
    <span
      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300"
      style={{ left: enabled ? '22px' : '2px' }}
    />
  </button>
);

/* ── Notification Toggle Row ── */
const NotifRow = ({ icon: Icon, label, sublabel, color, enabled, onToggle }) => (
  <div className="flex items-center justify-between gap-3 py-3 px-3.5 rounded-xl transition-all duration-200 hover:bg-white/[0.03]"
    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
  >
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-100 truncate">{label}</p>
        {sublabel && <p className="text-[10px] text-gray-500 mt-0.5 truncate">{sublabel}</p>}
      </div>
    </div>
    <ToggleSwitch enabled={enabled} onToggle={onToggle} color={color} />
  </div>
);

/* ── Settings Row ── */
const SettingRow = ({ icon: Icon, label, sublabel, action, color = '#ff8c32', danger = false }) => (
  <button
    onClick={action}
    className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl transition-all duration-200 cursor-pointer active:scale-[0.98] border border-transparent ${
      danger
        ? 'hover:bg-rose-500/10 hover:border-rose-500/20 group'
        : 'hover:bg-white/[0.04] hover:border-white/[0.06] group'
    }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105"
        style={{ background: danger ? 'rgba(244,63,94,0.12)' : `${color}18`, border: danger ? '1px solid rgba(244,63,94,0.3)' : `1px solid ${color}35` }}
      >
        <Icon className="w-4.5 h-4.5" style={{ color: danger ? '#f43f5e' : color }} />
      </div>
      <div className="text-left min-w-0">
        <p className={`font-semibold text-sm truncate ${danger ? 'text-rose-400' : 'text-gray-100'}`}>{label}</p>
        {sublabel && <p className="text-[11px] text-gray-400 mt-0.5 truncate">{sublabel}</p>}
      </div>
    </div>
    <ChevronRight className={`w-4 h-4 shrink-0 ${danger ? 'text-rose-400/60' : 'text-gray-500'} group-hover:translate-x-0.5 group-hover:text-white transition-all`} />
  </button>
);

export const SettingsModal = () => {
  const { settingsOpen, setSettingsOpen, showToast, userData, setAvatarModalOpen } = useProfile();

  /* Notification toggles state */
  const [notifs, setNotifs] = useState({
    push: true,
    email: false,
    referral: true,
    weekly: false,
  });
  const [notifExpanded, setNotifExpanded] = useState(false);

  const toggle = (key) => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  const actions = {
    security: () => showToast('🔒 Security settings coming soon!', 'info'),
    device: () => showToast('📱 Device management coming soon!', 'info'),
    help: () => showToast('💬 Help center coming soon!', 'info'),
    logout: () => {
      setSettingsOpen(false);
      showToast('👋 Logged out successfully!', 'success');
    },
  };

  const handleOpenAvatarModal = () => {
    setSettingsOpen(false);
    setAvatarModalOpen(true);
  };

  return (
    <Modal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
      {/* Profile snapshot card */}
      <div className="relative overflow-hidden rounded-2xl p-4 mb-5 border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-[#1a1b26]/90 to-amber-500/[0.05] shadow-lg">
        {/* Subtle ambient glow behind avatar */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
          {/* Avatar + Info */}
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            {/* Avatar container */}
            <div
              className="relative shrink-0 cursor-pointer group/avatar"
              onClick={handleOpenAvatarModal}
              title="Click to change avatar"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-500 to-purple-600 shadow-[0_0_14px_rgba(245,158,11,0.35)] transition-transform duration-200 group-hover/avatar:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0e0f17]">
                  <img
                    src={userData.avatar || '/avatar.jpg'}
                    alt={userData.username}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>

              {/* Edit pencil icon badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#ff6b00] to-[#e65100] border-2 border-[#14161f] text-white flex items-center justify-center shadow-md group-hover/avatar:scale-110 transition-transform">
                <Pencil className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Username, email, tier */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="font-bold text-white text-sm sm:text-base tracking-tight truncate max-w-[130px] sm:max-w-[160px]">
                  {userData.displayName || userData.username}
                </p>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 shrink-0">
                  Lvl {userData.level}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-400 truncate mt-0.5" title={userData.email}>
                {userData.email}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpenAvatarModal}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-[#ff6b00]/20 hover:border-[#ff6b00]/40 border border-white/10 text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
          >
            <Pencil className="w-3 h-3 text-amber-400" />
            <span>Edit Avatar</span>
          </button>
        </div>
      </div>

      {/* Settings groups */}
      <div className="space-y-2 mb-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold px-3 mb-2">Preferences</p>

        {/* ── Notifications (expandable) ── */}
        <div
          className="rounded-2xl overflow-hidden border border-transparent hover:border-white/[0.06] transition-all"
          style={{ background: notifExpanded ? 'rgba(255,255,255,0.025)' : 'transparent' }}
        >
          <button
            onClick={() => setNotifExpanded((v) => !v)}
            className="w-full flex items-center justify-between gap-3 p-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105"
                style={{ background: '#ff8c3218', border: '1px solid #ff8c3235' }}
              >
                <Bell className="w-4.5 h-4.5" style={{ color: '#ff8c32' }} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-sm text-gray-100 truncate">Notifications</p>
                <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                  {[notifs.push && 'Push', notifs.email && 'Email'].filter(Boolean).join(' & ') || 'All off'}
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-4 h-4 shrink-0 text-gray-500 transition-transform duration-200 ${notifExpanded ? 'rotate-90' : ''}`}
            />
          </button>

          {/* Expanded notification panel */}
          {notifExpanded && (
            <div
              className="mx-3 mb-3 rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <NotifRow
                icon={Bell}
                label="Push Alerts"
                sublabel="Receive in-app notifications"
                color="#ff8c32"
                enabled={notifs.push}
                onToggle={() => toggle('push')}
              />
              <NotifRow
                icon={Mail}
                label="Email Digest"
                sublabel="Daily activity summary"
                color="#60a5fa"
                enabled={notifs.email}
                onToggle={() => toggle('email')}
              />
              <NotifRow
                icon={Users}
                label="Referral Alerts"
                sublabel="When someone joins with your code"
                color="#10b981"
                enabled={notifs.referral}
                onToggle={() => toggle('referral')}
              />
              <NotifRow
                icon={BarChart3}
                label="Weekly Report"
                sublabel="XP & earnings summary"
                color="#a78bfa"
                enabled={notifs.weekly}
                onToggle={() => toggle('weekly')}
              />
            </div>
          )}
        </div>

        <SettingRow icon={Smartphone} label="Devices" sublabel="Manage connected devices" action={actions.device} color="#60a5fa" />
      </div>

      <div className="space-y-1 mb-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold px-3 mb-2">Account</p>
        <SettingRow icon={Shield} label="Security" sublabel="Password & 2FA" action={actions.security} color="#34d399" />
        <SettingRow icon={HelpCircle} label="Help Center" sublabel="FAQs & support" action={actions.help} color="#fb923c" />
      </div>

      <div className="pt-2 border-t border-white/[0.06]">
        <SettingRow icon={LogOut} label="Log Out" action={actions.logout} danger />
      </div>
    </Modal>
  );
};
