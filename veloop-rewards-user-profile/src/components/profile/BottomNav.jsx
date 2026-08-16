import React from 'react';
import { Home, Gift, Users2, UserCircle2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import styles from '../../styles/Profile.module.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'refer', label: 'Refer', icon: Users2 },
  { id: 'account', label: 'Account', icon: UserCircle2 },
];

export const BottomNav = () => {
  const { activeTab, setActiveTab, showToast } = useProfile();

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (id !== 'account') {
      showToast(`Navigating to ${id.charAt(0).toUpperCase() + id.slice(1)}...`, 'info');
    }
  };

  return (
    <nav className={styles.bottomNav}>
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            id={`nav-${id}`}
            onClick={() => handleTabClick(id)}
            className="cursor-pointer transition-all duration-200 active:scale-90"
          >
            {isActive ? (
              <div className={styles.navActivePill}>
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 py-1 px-3">
                <Icon className="w-5 h-5 text-gray-500 hover:text-gray-300 transition-colors" />
                <span className="text-[10px] text-gray-500 hover:text-gray-400 font-medium transition-colors">{label}</span>
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
};
