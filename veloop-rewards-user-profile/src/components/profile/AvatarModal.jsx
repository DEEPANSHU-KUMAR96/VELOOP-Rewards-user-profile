import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Check,
  Dices,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { AVATAR_PRESETS, generateRandomAvatar } from '../../data/avatarPresets';
import { Badge } from '../common/Badge';
import gsap from 'gsap';

export const AvatarModal = () => {
  const { avatarModalOpen, setAvatarModalOpen, userData, updateAvatar } = useProfile();
  const [selectedAvatar, setSelectedAvatar] = useState(userData?.avatar || '/avatar.jpg');
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'upload' | 'url'
  const [activeCategory, setActiveCategory] = useState(AVATAR_PRESETS[0].category);
  const [customUrl, setCustomUrl] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Sync with current user avatar when modal opens
  useEffect(() => {
    if (avatarModalOpen) {
      setSelectedAvatar(userData?.avatar || '/avatar.jpg');
      setUrlError(false);
      if (backdropRef.current) {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      }
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.92, opacity: 0, y: 25 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
        );
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [avatarModalOpen, userData?.avatar]);

  if (!avatarModalOpen) return null;

  const handleSave = () => {
    if (selectedAvatar) {
      updateAvatar(selectedAvatar);
      setAvatarModalOpen(false);
    }
  };

  const handleRandomize = () => {
    const newRandom = generateRandomAvatar();
    setSelectedAvatar(newRandom);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP, GIF, SVG)');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result;
      if (typeof result === 'string') {
        setSelectedAvatar(result);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result;
        if (typeof result === 'string') {
          setSelectedAvatar(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return;
    setUrlError(false);
    setSelectedAvatar(customUrl.trim());
  };

  const isCurrentActive = selectedAvatar === userData.avatar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setAvatarModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-xl bg-[#12141c] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
      >
        {/* Glow ambient background inside modal */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ff6b00]/15 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#7c3aed]/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#e84d00] flex items-center justify-center shadow-[0_4px_12px_rgba(255,107,0,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Choose Avatar</h3>
              <p className="text-xs text-gray-400">Select, upload or generate a profile avatar</p>
            </div>
          </div>
          <button
            onClick={() => setAvatarModalOpen(false)}
            className="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="relative mb-5 p-4 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-4">
            {/* Avatar Preview Ring */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-[3px] bg-gradient-to-br from-[#ff9e42] via-[#ff5500] to-[#7c2d12] shadow-[0_0_20px_rgba(255,107,0,0.45)]">
                <div className="w-full h-full rounded-[13px] overflow-hidden bg-[#111]">
                  <img
                    src={selectedAvatar}
                    alt="Selected Avatar Preview"
                    className="w-full h-full object-cover transition-all duration-300"
                    onError={(e) => {
                      setUrlError(true);
                      e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#12141c] shadow-[0_0_8px_#10b981]" />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-base sm:text-lg">{userData?.username}</span>
                <Badge variant="level" label={`Lvl ${userData?.level}`} size="sm" />
              </div>
              <p className="text-xs text-gray-400">
                {isCurrentActive ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Current Avatar
                  </span>
                ) : (
                  <span className="text-[#ff9e42] flex items-center gap-1 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> New Preview Selected
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Randomize button */}
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ff6b00]/10 hover:bg-[#ff6b00]/20 border border-[#ff6b00]/30 text-[#ff9e42] text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
            title="Generate random stylish avatar"
          >
            <Dices className="w-4 h-4 text-[#ff8c32]" />
            <span>Randomize</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl mb-4">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-[#ff6b00] text-white shadow-[0_2px_10px_rgba(255,107,0,0.4)]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Presets
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#ff6b00] text-white shadow-[0_2px_10px_rgba(255,107,0,0.4)]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-[#ff6b00] text-white shadow-[0_2px_10px_rgba(255,107,0,0.4)]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Image Link
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[220px] max-h-[260px] overflow-y-auto pr-1">
          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div>
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2.5 scrollbar-none">
                {AVATAR_PRESETS.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(cat.category)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      activeCategory === cat.category
                        ? 'bg-white/15 border-white/30 text-white shadow-sm'
                        : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-gray-200 hover:bg-white/[0.06]'
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              {/* Grid of Avatars */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {AVATAR_PRESETS.find((c) => c.category === activeCategory)?.items.map((preset) => {
                  const isSelected = selectedAvatar === preset.url;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedAvatar(preset.url)}
                      className={`relative aspect-square rounded-2xl overflow-hidden p-[2px] transition-all cursor-pointer group active:scale-95 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#ff9e42] to-[#ff5500] ring-2 ring-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.5)]'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#111] relative">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#ff6b00]/30 backdrop-blur-[1px] flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shadow-lg">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs py-0.5 text-[9px] text-gray-200 truncate px-1 text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {preset.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD FILE */}
          {activeTab === 'upload' && (
            <div className="h-full flex flex-col justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                  dragActive
                    ? 'border-[#ff6b00] bg-[#ff6b00]/10 scale-[1.01]'
                    : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/10 border border-[#ff6b00]/25 flex items-center justify-center text-[#ff943d]">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Click or drag image here</p>
                  <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, WebP, GIF, SVG (up to 5MB)</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all pointer-events-none"
                >
                  Browse Computer
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM URL */}
          {activeTab === 'url' && (
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Image Web Address (URL)</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      placeholder="https://example.com/my-cool-avatar.jpg"
                      value={customUrl}
                      onChange={(e) => {
                        setCustomUrl(e.target.value);
                        setUrlError(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleApplyUrl();
                      }}
                      className="w-full bg-white/[0.05] border border-white/10 focus:border-[#ff6b00] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 rounded-xl bg-[#ff6b00] hover:bg-[#ff7a1a] text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-[0_2px_10px_rgba(255,107,0,0.3)]"
                  >
                    Preview
                  </button>
                </div>
              </div>

              {urlError && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>The image URL could not be loaded. Please verify the link.</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  💡 Tip: You can paste direct links from Discord avatar links, GitHub avatar, Unsplash, or Imgur.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-5 mt-4 border-t border-white/[0.08]">
          <button
            onClick={() => setAvatarModalOpen(false)}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] text-gray-300 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-orange flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm cursor-pointer shadow-[0_4px_16px_rgba(255,107,0,0.4)] active:scale-95 transition-all"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  );
};
