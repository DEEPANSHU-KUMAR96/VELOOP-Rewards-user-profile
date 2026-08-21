import React from 'react';
import { Copy, Share2, Users, Zap, CheckCircle2, Link2, Wallet, Trophy, Gift, Star } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useClipboard } from '../../hooks/useClipboard';
import { triggerConfetti } from '../../hooks/useGsapAnimations';

/* ── Inline SVG icons for WhatsApp & Instagram (brand-accurate) ── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const WebReferralPanel = () => {
  const { userData, showToast, setWithdrawOpen } = useProfile();
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

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `🚀 Join me on Veloop Rewards!\nUse my referral code *${userData.referral.code}* and earn bonus rewards! 🎁\n👉 ${userData.referral.shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast('📱 Opening WhatsApp...', 'success');
  };

  const handleInstagram = () => {
    // Copy to clipboard first (Instagram doesn't support direct URL sharing)
    copy(userData.referral.shareUrl);
    showToast('📸 Link copied! Paste it in your Instagram bio or story.', 'info');
    window.open('https://www.instagram.com/', '_blank');
  };

  const QUICK_ACTIONS = [
    {
      id: 'withdraw',
      label: 'Withdraw',
      sublabel: 'Cash out',
      icon: Wallet,
      color: '#10b981',
      glow: 'rgba(16,185,129,0.35)',
      border: 'rgba(16,185,129,0.3)',
      bg: 'rgba(16,185,129,0.07)',
      action: () => setWithdrawOpen(true),
    },
    {
      id: 'leaderboard',
      label: 'Rank',
      sublabel: 'Leaderboard',
      icon: Trophy,
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.35)',
      border: 'rgba(245,158,11,0.3)',
      bg: 'rgba(245,158,11,0.07)',
      action: () => showToast('🏆 Leaderboard coming soon!', 'info'),
    },
    {
      id: 'rewards',
      label: 'Rewards',
      sublabel: 'Earn more',
      icon: Gift,
      color: '#8b5cf6',
      glow: 'rgba(139,92,246,0.35)',
      border: 'rgba(139,92,246,0.3)',
      bg: 'rgba(139,92,246,0.07)',
      action: () => showToast('🎁 Rewards center coming soon!', 'info'),
    },
    {
      id: 'achievements',
      label: 'Badges',
      sublabel: 'Achievements',
      icon: Star,
      color: '#ff6b00',
      glow: 'rgba(255,107,0,0.35)',
      border: 'rgba(255,107,0,0.3)',
      bg: 'rgba(255,107,0,0.07)',
      action: () => showToast('⭐ Achievements coming soon!', 'info'),
    },
  ];

  return (
    <div className="space-y-4">
      {/* ── Refer & Earn Card ─────────────────────────────────────── */}
      <div className="glass-orange refer-card-glow rounded-3xl p-6 relative overflow-hidden transition-all duration-300">
        {/* Top animated laser beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] refer-top-beam z-10" />

        {/* Top animated ambient glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#ff6b00]/25 rounded-full pointer-events-none refer-top-glow" />

        {/* Bottom corner animated pulsing glow orb */}
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-gradient-to-br from-[#ff6b00]/30 to-[#ff3d00]/10 rounded-full pointer-events-none refer-glow-orb" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/15 border border-[#ff6b00]/25 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.3)]">
            <Users className="w-5 h-5 text-[#ff943d]" />
          </div>
          <div>
            <h3 className="font-bold text-theme-primary text-base">Refer &amp; Earn</h3>
            <p className="text-xs text-theme-secondary">Earn {userData.referral.bonusPercent}% bonus per referral</p>
          </div>
        </div>

        {/* Stats */}
        {userData.referral.totalReferred > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
            <div
              className="rounded-2xl p-3 text-center transition-all duration-200 hover:border-sky-500/40"
              style={{
                background: 'linear-gradient(145deg, rgba(16, 26, 48, 0.45) 0%, rgba(10, 16, 30, 0.65) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.14)',
                boxShadow: '0 4px 20px -4px rgba(10, 20, 45, 0.3)'
              }}
            >
              <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{userData.referral.totalReferred}</p>
              <p className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>Referred</p>
            </div>
            <div
              className="rounded-2xl p-3 text-center transition-all duration-200 hover:border-orange-500/40"
              style={{
                background: 'linear-gradient(145deg, rgba(16, 26, 48, 0.45) 0%, rgba(10, 16, 30, 0.65) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.14)',
                boxShadow: '0 4px 20px -4px rgba(10, 20, 45, 0.3)'
              }}
            >
              <p className="text-2xl font-black text-[#ff943d]">{userData.referral.earningsVEs}</p>
              <p className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>VEs Earned</p>
            </div>
          </div>
        )}

        {/* Code Box */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-strong)' }}>
          <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Your Referral Code</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[#ff8c32] font-black text-2xl sm:text-3xl code-text tracking-widest sm:tracking-[0.3em] truncate">{userData.referral.code}</p>
            <span className="text-[11px] bg-[#ff8c32]/10 text-[#ff8c32] border border-[#ff8c32]/20 rounded-xl px-2.5 py-1 font-semibold flex items-center gap-1 shrink-0">
              <Zap className="w-3 h-3" /> {userData.referral.bonusPercent}%
            </span>
          </div>
        </div>

        {/* Primary Actions Row */}
        <div className="flex gap-2 sm:gap-3 mb-3 relative z-10">
          <button onClick={handleCopyCode} className="flex-1 btn-orange flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-bold text-sm cursor-pointer min-w-0">
            {copied ? <><CheckCircle2 className="w-4 h-4 shrink-0" /> <span className="truncate">Copied!</span></> : <><Copy className="w-4 h-4 shrink-0" /> <span className="truncate">Copy Code</span></>}
          </button>
          <button onClick={handleShare} className="w-11 h-11 rounded-2xl glass border border-white/[0.08] flex items-center justify-center text-gray-300 hover:text-[#ff8c32] hover:border-[#ff8c32]/30 transition-all cursor-pointer shrink-0" title="Share">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => copy(userData.referral.shareUrl)} className="w-11 h-11 rounded-2xl glass border border-white/[0.08] flex items-center justify-center text-gray-300 hover:text-[#ff8c32] hover:border-[#ff8c32]/30 transition-all cursor-pointer shrink-0" title="Copy Link">
            <Link2 className="w-4 h-4" />
          </button>
        </div>

        {/* ── Social Share Row ─────────────────────────────────────── */}
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-widest text-center mb-2.5" style={{ color: 'var(--text-muted)' }}>Share via</p>
          <div className="grid grid-cols-2 gap-2.5">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(18,140,60,0.10) 100%)',
                border: '1px solid rgba(37,211,102,0.30)',
                color: '#25d366',
                boxShadow: '0 4px 14px -4px rgba(37,211,102,0.25)',
              }}
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </button>

            {/* Instagram */}
            <button
              onClick={handleInstagram}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(193,53,132,0.12) 0%, rgba(131,58,180,0.10) 100%)',
                border: '1px solid rgba(193,53,132,0.30)',
                color: '#e1306c',
                boxShadow: '0 4px 14px -4px rgba(193,53,132,0.25)',
              }}
            >
              <InstagramIcon />
              <span>Instagram</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Actions Card ────────────────────────────────────── */}
      <div
        className="rounded-3xl p-5 sm:p-6 relative overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          boxShadow: '0 8px 32px -6px rgba(0,0,0,0.5)',
        }}
      >
        {/* Ambient background glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-24 bg-[#7c3aed]/20 rounded-full pointer-events-none" style={{ filter: 'blur(32px)' }} />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ff6b00]/10 rounded-full pointer-events-none" style={{ filter: 'blur(30px)' }} />

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 relative z-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_14px_rgba(124,58,237,0.4)]"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0.10) 100%)', border: '1px solid rgba(124,58,237,0.35)' }}
          >
            <Zap className="w-5 h-5" style={{ color: '#a78bfa' }} />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Quick Actions</h3>
            <p className="text-xs text-gray-400 mt-0.5">Go here, get there quick &amp; fast</p>
          </div>
        </div>

        {/* Actions Grid — 2x2 on mobile, 4-col on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {QUICK_ACTIONS.map(({ id, label, sublabel, icon: Icon, color, glow, border, bg, action }) => (
            <button
              key={id}
              onClick={action}
              className="group flex flex-col items-center gap-3 py-5 px-3 rounded-2xl cursor-pointer transition-all duration-250 hover:-translate-y-1.5 active:scale-95 relative overflow-hidden"
              style={{
                background: bg,
                border: `1px solid ${border}`,
              }}
            >
              {/* Hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${color}18 0%, transparent 70%)` }}
              />

              {/* Icon badge */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-250 group-hover:scale-110 group-hover:shadow-lg relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
                  border: `1.5px solid ${border}`,
                  boxShadow: `0 6px 18px -4px ${glow}`,
                }}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color }} />
              </div>

              {/* Label */}
              <div className="text-center relative z-10">
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">{label}</p>
                {sublabel && <p className="text-[10px] sm:text-[11px] mt-0.5" style={{ color: `${color}cc` }}>{sublabel}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
