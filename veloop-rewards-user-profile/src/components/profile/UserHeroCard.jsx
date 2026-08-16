import React, { useRef } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Badge } from '../common/Badge';
import { Pencil } from 'lucide-react';
import styles from '../../styles/Profile.module.css';

export const UserHeroCard = () => {
  const { userData, setAvatarModalOpen } = useProfile();
  const cardRef = useRef(null);

  return (
    <div className={`gsap-fade-in ${styles.heroWrapper} relative overflow-hidden`} ref={cardRef}>
      {/* Background Ambient Glow Orb */}
      <div className={styles.heroGlowOrb} />

      {/* Avatar Container with Animated Glowing Ring */}
      <div className={`gsap-avatar ${styles.avatarRing} relative group/avatar cursor-pointer`} onClick={() => setAvatarModalOpen(true)}>
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
          {/* Dark hover overlay with edit cue */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover/avatar:opacity-100 transition-all duration-200 flex flex-col items-center justify-center text-white gap-1">
            <Pencil className="w-4 h-4 text-[#ff9e42] animate-bounce" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-white/90">Change</span>
          </div>
        </div>

        {/* Pencil edit button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAvatarModalOpen(true);
          }}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-[12px] bg-gradient-to-br from-[#ff6b00] to-[#ff4500] border-[2.5px] border-[#121318] text-white shadow-[0_4px_12px_rgba(255,107,0,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-20 group/pencil"
          aria-label="Change profile avatar"
        >
          <Pencil className="w-3.5 h-3.5 group-hover/pencil:rotate-12 transition-transform" />
        </button>

        {/* Status dot */}
        <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-[#00e676] border-[2.5px] border-[#121318] shadow-[0_0_8px_#00e676]" />
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
