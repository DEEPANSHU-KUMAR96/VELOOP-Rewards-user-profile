import React from 'react';
import { X, Bell, Shield, LogOut, ChevronRight, Moon, Smartphone, HelpCircle, Pencil } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useProfile } from '../../context/ProfileContext';

const SettingRow = ({ icon: Icon, label, sublabel, action, color = '#ff8c32', danger = false }) => (
  <button
    onClick={action}
    className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl transition-all cursor-pointer active:scale-[0.98] ${
      danger
        ? 'hover:bg-rose-500/10 group'
        : 'hover:bg-white/[0.04] group'
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: danger ? 'rgba(244,63,94,0.12)' : `${color}18`, border: danger ? '1px solid rgba(244,63,94,0.3)' : `1px solid ${color}35` }}
      >
        <Icon className="w-4.5 h-4.5" style={{ color: danger ? '#f43f5e' : color }} />
      </div>
      <div className="text-left">
        <p className={`font-semibold text-sm ${danger ? 'text-rose-400' : 'text-gray-100'}`}>{label}</p>
        {sublabel && <p className="text-[11px] text-gray-500 mt-0.5">{sublabel}</p>}
      </div>
    </div>
    <ChevronRight className={`w-4 h-4 ${danger ? 'text-rose-400/60' : 'text-gray-500'} group-hover:translate-x-0.5 transition-transform`} />
  </button>
);

export const SettingsModal = () => {
  const { settingsOpen, setSettingsOpen, showToast, userData, setAvatarModalOpen } = useProfile();

  const actions = {
    notifications: () => showToast('🔔 Notification settings coming soon!', 'info'),
    security: () => showToast('🔒 Security settings coming soon!', 'info'),
    appearance: () => showToast('🌙 Dark mode is always on — you\'re stylish!', 'info'),
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
      {/* Profile snapshot */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#ff8c32]/8 border border-[#ff8c32]/15 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={handleOpenAvatarModal} title="Change avatar">
            <img
              src={userData.avatar}
              alt={userData.username}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#ff8c32]/40 group-hover:opacity-80 transition-opacity"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop'; }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#ff6b00] border border-[#16171f] text-white flex items-center justify-center shadow">
              <Pencil className="w-2.5 h-2.5" />
            </div>
          </div>
          <div>
            <p className="font-bold text-white text-sm">{userData.username}</p>
            <p className="text-xs text-gray-400">{userData.email}</p>
          </div>
        </div>

        <button
          onClick={handleOpenAvatarModal}
          className="px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer"
        >
          Change Avatar
        </button>
      </div>

      {/* Settings groups */}
      <div className="space-y-1 mb-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold px-3 mb-2">Preferences</p>
        <SettingRow icon={Bell} label="Notifications" sublabel="Push & email alerts" action={actions.notifications} />
        <SettingRow icon={Moon} label="Appearance" sublabel="Dark mode active" action={actions.appearance} color="#a78bfa" />
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
