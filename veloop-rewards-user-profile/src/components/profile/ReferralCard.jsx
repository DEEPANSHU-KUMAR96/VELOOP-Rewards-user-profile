import React from 'react';
import { Copy, Share2, Users, Zap, CheckCircle2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useClipboard } from '../../hooks/useClipboard';
import { triggerConfetti } from '../../hooks/useGsapAnimations';
import styles from '../../styles/Profile.module.css';

export const ReferralCard = () => {
  const { userData, showToast } = useProfile();
  const { copied, copy } = useClipboard(2500);

  const handleCopyCode = async () => {
    const success = await copy(userData.referral.code);
    if (success) {
      triggerConfetti();
      showToast(`🎉 Code "${userData.referral.code}" copied!`, 'celebration');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join Veloop Rewards!',
      text: `Use my referral code ${userData.referral.code} to join Veloop and earn exclusive rewards!`,
      url: userData.referral.shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copy(userData.referral.shareUrl);
        showToast('🔗 Share link copied to clipboard!', 'success');
      }
    } catch {
      await copy(userData.referral.shareUrl);
      showToast('🔗 Share link copied!', 'success');
    }
  };

  return (
    <div className={`gsap-fade-in ${styles.referCard}`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/20 border border-[#ff6b00]/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,107,0,0.2)]">
          <Users className="w-5 h-5 text-[#ff943d]" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base sm:text-lg">Refer &amp; Earn</h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
            Invite friends and earn exclusive rewards when they level up.
          </p>
        </div>
      </div>

      {/* Referral Code Box */}
      <div className={styles.codeBox}>
        <div>
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
            Your Code
          </p>
          <p className="text-[#ff8c32] font-black text-2xl sm:text-3xl tracking-[0.2em] font-mono leading-none">
            {userData.referral.code}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 border border-white/[0.06] rounded-xl px-2.5 py-1.5">
          <Zap className="w-3 h-3 text-[#ff943d]" />
          <span>{userData.referral.bonusPercent}% bonus</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleCopyCode}
          className={`flex-1 ${styles.orangeBtn} flex items-center justify-center gap-2.5 text-sm sm:text-base`}
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy Code
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className={styles.iconBtnDark}
          title="Share referral link"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Stats Row */}
      {userData.referral.totalReferred > 0 && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex gap-4 text-center">
          <div className="flex-1">
            <p className="text-lg font-bold text-white">{userData.referral.totalReferred}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Referred</p>
          </div>
          <div className="w-px bg-white/[0.07]" />
          <div className="flex-1">
            <p className="text-lg font-bold text-[#ff943d]">{userData.referral.earningsVEs}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">VEs Earned</p>
          </div>
        </div>
      )}
    </div>
  );
};
