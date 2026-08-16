import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Link as LinkIcon,
  Check,
  Dices,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Pencil,
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { AVATAR_PRESETS, generateRandomAvatar } from '../../data/avatarPresets';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const AvatarModal = () => {
  const { avatarModalOpen, setAvatarModalOpen, userData, updateAvatar } = useProfile();
  const [selectedAvatar, setSelectedAvatar] = useState(userData?.avatar || '/avatar.jpg');
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'upload' | 'url'
  const [activeCategory, setActiveCategory] = useState(AVATAR_PRESETS[0]?.category || 'Cyberpunk & Sci-Fi');
  const [customUrl, setCustomUrl] = useState('');
  const [urlError, setUrlError] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Sync with current user avatar when modal opens
  useEffect(() => {
    if (avatarModalOpen) {
      setSelectedAvatar(userData?.avatar || '/avatar.jpg');
      setUrlError(false);
    }
  }, [avatarModalOpen, userData?.avatar]);

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

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result;
      if (typeof result === 'string') {
        setSelectedAvatar(result);
      }
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

  const isCurrentActive = selectedAvatar === userData?.avatar;

  return (
    <Modal
      isOpen={avatarModalOpen}
      onClose={() => setAvatarModalOpen(false)}
      title="Choose Avatar"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Live Preview Card */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Circular Avatar Preview */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-[#ff5500] via-[#ff8c32] to-[#ffaa40] shadow-[0_0_16px_rgba(255,107,0,0.4)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0c0d14]">
                  <img
                    src={selectedAvatar}
                    alt="Selected Avatar Preview"
                    className="w-full h-full object-cover rounded-full transition-all duration-300"
                    onError={(e) => {
                      setUrlError(true);
                      e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
              {/* Top-Right Green Status Dot */}
              <div className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#00e676] border-[2px] border-[#14161f] shadow-[0_0_6px_#00e676]" />
              {/* Bottom-Right Pencil Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-[6px] bg-[#ff6b00] border-[1.5px] border-[#14161f] text-white flex items-center justify-center shadow">
                <Pencil className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            {/* User Details & Level Badge */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap sm:flex-nowrap">
                <span className="font-bold text-white text-sm sm:text-base truncate max-w-[120px] sm:max-w-[180px]" title={userData?.username}>
                  {userData?.username}
                </span>
                <Badge variant="level" label={`Level ${userData?.level}`} size="sm" className="shrink-0" />
              </div>
              <p className="text-[11px] text-gray-400">
                {isCurrentActive ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 shrink-0" /> Current Avatar
                  </span>
                ) : (
                  <span className="text-[#ff9e42] flex items-center gap-1 font-medium">
                    New Preview Selected
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Randomize button */}
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ff6b00]/10 hover:bg-[#ff6b00]/20 border border-[#ff6b00]/30 text-[#ff9e42] text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
            title="Generate random stylish avatar"
          >
            <Dices className="w-3.5 h-3.5 text-[#ff8c32] shrink-0" />
            <span className="hidden sm:inline">Randomize</span>
            <span className="sm:hidden">Random</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Presets
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-[#ff6b00] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Image Link
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[190px] max-h-[240px] overflow-y-auto pr-1">
          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div>
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
                {AVATAR_PRESETS.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(cat.category)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      activeCategory === cat.category
                        ? 'bg-white/15 border-white/30 text-white'
                        : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              {/* Grid of Avatars */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {AVATAR_PRESETS.find((c) => c.category === activeCategory)?.items.map((preset) => {
                  const isSelected = selectedAvatar === preset.url;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedAvatar(preset.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden p-[2px] transition-all cursor-pointer group active:scale-95 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#ff9e42] to-[#ff5500] ring-2 ring-[#ff6b00] shadow-[0_0_12px_rgba(255,107,0,0.5)]'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="w-full h-full rounded-[10px] overflow-hidden bg-[#111] relative">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#ff6b00]/30 backdrop-blur-[1px] flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shadow">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD FILE */}
          {activeTab === 'upload' && (
            <div className="h-full flex flex-col justify-center pt-1">
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
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                  dragActive
                    ? 'border-[#ff6b00] bg-[#ff6b00]/10 scale-[1.01]'
                    : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/10 border border-[#ff6b00]/25 flex items-center justify-center text-[#ff943d]">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">Click or drag image here</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Supports PNG, JPG, WebP, GIF (up to 5MB)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM URL */}
          {activeTab === 'url' && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Image Web Address (URL)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      setUrlError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleApplyUrl();
                    }}
                    className="flex-1 bg-white/[0.05] border border-white/10 focus:border-[#ff6b00] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all"
                  />
                  <button
                    onClick={handleApplyUrl}
                    className="px-3.5 py-2 rounded-xl bg-[#ff6b00] hover:bg-[#ff7a1a] text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Preview
                  </button>
                </div>
              </div>

              {urlError && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>The image URL could not be loaded. Please verify the link.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
          <button
            onClick={() => setAvatarModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] text-gray-300 font-semibold text-xs transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-orange flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs cursor-pointer shadow-[0_4px_14px_rgba(255,107,0,0.4)] active:scale-95 transition-all"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            Save Avatar
          </button>
        </div>
      </div>
    </Modal>
  );
};
