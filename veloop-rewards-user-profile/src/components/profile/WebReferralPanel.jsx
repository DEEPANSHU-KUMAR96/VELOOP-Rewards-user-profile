import React from 'react';
import { Copy, Share2, Users, Zap, CheckCircle2, Link2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useClipboard } from '../../hooks/useClipboard';
import { triggerConfetti } from '../../hooks/useGsapAnimations';

export const WebReferralPanel = () => {
  const { userData, showToast } = useProfile();
  const { copied, copy } = useClipboard(2500);

  const handleCopyCode = async () => {
    const ok = await copy(userData.referral.code);
    if (ok) { triggerConfetti(); showToast(`🎉 Code "${userData.referral.code}" copied!`, 'celebration'); }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Join Veloop!', text: `Use code ${userData.referral.code}`, url: userData.referral.shareUrl });
      } else {
        await copy(userData.referral.shareUrl);
        showToast('🔗 Share link copied!', 'success');
      }
    } catch {
      await copy(userData.referral.shareUrl);
      showToast('🔗 Link copied!', 'success');
    }
  };

  return (
    <div className="glass-orange rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8c32] to-transparent" />

      {/* Glow orb */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#ff6b00]/10 rounded-full blur-[50px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/15 border border-[#ff6b00]/25 flex items-center justify-center">
          <Users className="w-5 h-5 text-[#ff943d]" />
        </div>
        <div>
          <h3 className="font-bold text-theme-primary text-base">Refer &amp; Earn</h3>
          <p className="text-xs text-theme-secondary">Earn {userData.referral.bonusPercent}% bonus per referral</p>
        </div>
      </div>

      {/* Stats */}
      {userData.referral.totalReferred > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-2xl p-3 text-center" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
            <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{userData.referral.totalReferred}</p>
            <p className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>Referred</p>
          </div>
          <div className="rounded-2xl p-3 text-center" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
            <p className="text-2xl font-black text-[#ff943d]">{userData.referral.earningsVEs}</p>
            <p className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>VEs Earned</p>
          </div>
        </div>
      )}

      {/* Code Box */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-strong)' }}>
        <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Your Referral Code</p>
        <div className="flex items-center justify-between">
          <p className="text-[#ff8c32] font-black text-3xl code-text tracking-[0.3em]">{userData.referral.code}</p>
          <span className="text-[11px] bg-[#ff8c32]/10 text-[#ff8c32] border border-[#ff8c32]/20 rounded-xl px-2.5 py-1 font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3" /> {userData.referral.bonusPercent}%
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={handleCopyCode} className="flex-1 btn-orange flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm cursor-pointer">
          {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Code</>}
        </button>
        <button onClick={handleShare} className="w-11 h-11 rounded-2xl glass border border-white/[0.08] flex items-center justify-center text-gray-300 hover:text-[#ff8c32] hover:border-[#ff8c32]/30 transition-all cursor-pointer">
          <Share2 className="w-4.5 h-4.5" />
        </button>
        <button onClick={() => copy(userData.referral.shareUrl)} className="w-11 h-11 rounded-2xl glass border border-white/[0.08] flex items-center justify-center text-gray-300 hover:text-[#ff8c32] hover:border-[#ff8c32]/30 transition-all cursor-pointer">
          <Link2 className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
