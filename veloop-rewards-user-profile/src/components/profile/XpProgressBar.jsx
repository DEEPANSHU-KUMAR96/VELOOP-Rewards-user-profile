import React, { useEffect, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext';
import gsap from 'gsap';

export const XpProgressBar = () => {
  const { userData, gainXP } = useProfile();
  const fillRef = useRef(null);
  const textRef = useRef(null);

  const percentage = Math.min(100, Math.max(0, (userData.xp / userData.maxExp) * 100));

  useEffect(() => {
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        width: `${percentage}%`,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, [percentage]);

  return (
    <div className="gsap-fade-in w-full space-y-2.5 my-2">
      {/* Header Info */}
      <div className="flex items-center justify-between text-sm sm:text-base font-semibold px-1">
        <span className="text-[#e2d7cf]/80 font-medium tracking-wide">XP Progress</span>
        <span className="text-[#ff6b00] font-bold font-mono tracking-tight text-base sm:text-lg">
          {userData.xp}/{userData.maxExp}
        </span>
      </div>

      {/* Progress Track */}
      <div
        onClick={() => gainXP(25)}
        title="Click to simulate XP gain"
        className="group relative h-3.5 w-full bg-[#1b1d24] rounded-full p-[2px] border border-white/[0.08] cursor-pointer overflow-hidden transition-all hover:border-[#ff6b00]/40"
      >
        {/* Glow Track Fill */}
        <div
          ref={fillRef}
          data-width={`${percentage}%`}
          style={{ width: `${percentage}%` }}
          className="gsap-progress-fill relative h-full rounded-full bg-gradient-to-r from-[#ff8c32] via-[#ff6b00] to-[#ff4800] shadow-[0_0_12px_rgba(255,107,0,0.8)] transition-all duration-300"
        >
          {/* Glowing Lead Spark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      {/* Helper / Next Reward hint */}
      <div className="flex items-center justify-between text-[11px] text-gray-400/80 px-1">
        <span>Level {userData.level}</span>
        <span className="text-gray-400">
          {userData.maxExp - userData.xp} XP to Level {userData.level + 1}
        </span>
      </div>
    </div>
  );
};
