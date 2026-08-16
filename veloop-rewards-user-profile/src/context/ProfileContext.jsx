import React, { createContext, useContext, useState } from 'react';
import { activeUserData } from '../data/mockUserData';
import { triggerConfetti } from '../hooks/useGsapAnimations';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(activeUserData);
  const [activeTab, setActiveTab] = useState('account');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3200);
  };

  const hideToast = () => setToast((prev) => ({ ...prev, show: false }));

  const gainXP = (amount = 25) => {
    setUserData((prev) => {
      const newXp = prev.xp + amount;
      const willLevelUp = newXp >= prev.maxExp;
      const updatedLevel = willLevelUp ? prev.level + 1 : prev.level;
      const remainingXp = willLevelUp ? newXp - prev.maxExp : newXp;

      if (willLevelUp) {
        triggerConfetti();
        showToast(`🎉 Level Up! You reached Level ${updatedLevel}!`, 'celebration');
      } else {
        showToast(`⚡ +${amount} XP Gained!`, 'info');
      }

      return {
        ...prev,
        level: updatedLevel,
        xp: remainingXp,
        currentXp: prev.currentXp + amount,
        availableVEs: prev.availableVEs + 50,
        assets: {
          ...prev.assets,
          ves: prev.assets.ves + 50,
          gems: prev.assets.gems + 5,
        },
      };
    });
  };

  const handleWithdraw = (amount) => {
    if (userData.availableVEs < amount) {
      showToast('❌ Insufficient VEs balance', 'error');
      return false;
    }
    setUserData((prev) => ({
      ...prev,
      availableVEs: prev.availableVEs - amount,
      withdrawalsCount: prev.withdrawalsCount + 1,
      withdrawalAnalytics: {
        ...prev.withdrawalAnalytics,
        totalProcessed: prev.withdrawalAnalytics.totalProcessed + 1,
        pending: prev.withdrawalAnalytics.pending + 1,
        totalWithdrawn: prev.withdrawalAnalytics.totalWithdrawn + Math.floor(amount / 10),
      },
    }));
    showToast(`✅ Withdrawal request for ${amount} VEs submitted!`, 'success');
    return true;
  };

  const updateProfile = (updatedFields) => {
    setUserData((prev) => ({ ...prev, ...updatedFields }));
    showToast('✨ Profile updated successfully!', 'success');
  };

  return (
    <ProfileContext.Provider
      value={{
        userData,
        setUserData,
        activeTab,
        setActiveTab,
        toast,
        showToast,
        hideToast,
        settingsOpen,
        setSettingsOpen,
        withdrawOpen,
        setWithdrawOpen,
        gainXP,
        handleWithdraw,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};
