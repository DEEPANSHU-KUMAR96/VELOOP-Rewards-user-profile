import React, { useRef } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Badge } from '../common/Badge';
import styles from '../../styles/Profile.module.css';

export const UserHeroCard = () => {
  const { userData } = useProfile();
  const cardRef = useRef(null);

  return (
    <div className={`gsap-fade-in ${styles.heroWrapper} relative overflow-hidden`} ref={cardRef}>
      {/* Background Ambient Glow Orb */}
      <div className={styles.heroGlowOrb} />

      {/* Avatar Container with Animated Glowing Ring */}
      <div className={`gsap-avatar ${styles.avatarRing} relative group`}>
        <div className={styles.avatarInner}>
          <img
            src={userData.avatar || '/avatar.jpg'}
            alt={userData.username}
            className={styles.avatarImg}
            onError={(e) => {
              // Fallback if image fails
              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop';
            }}
          />
        </div>
        {/* Subtle status pulse */}
        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121318] shadow-[0_0_8px_#10b981]" />
      </div>

      {/* Username */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white/95 mb-2 hover:text-[#ff9e42] transition-colors cursor-pointer">
          {userData.username}
        </h2>

        {/* Badges Row */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <Badge variant="level" label={`Level ${userData.level}`} size="md" />
          {userData.isVerified && <Badge variant="verified" label="Verified" size="md" />}
          {userData.level >= 5 && <Badge variant="pro" label={userData.tier || 'Pro Gamer'} size="md" />}
        </div>
      </div>
    </div>
  );
};
