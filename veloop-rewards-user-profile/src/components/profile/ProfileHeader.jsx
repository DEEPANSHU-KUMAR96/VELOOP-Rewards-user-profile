import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export const ProfileHeader = () => {
  const { setSettingsOpen, showToast } = useProfile();

  const handleBack = () => {
    showToast('Navigating back...', 'info');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0e0f12]/80 backdrop-blur-xl border-b border-white/[0.05] px-4 py-3.5 flex items-center justify-between transition-all">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        aria-label="Go Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Center Title */}
      <h1 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffaa5a] via-[#ff7a1a] to-[#ff943d]">
        Profile
      </h1>

      {/* Settings Button */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
    </header>
  );
};
