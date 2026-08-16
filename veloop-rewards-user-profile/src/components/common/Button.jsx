import React, { useRef } from 'react';
import { animateClickBounce } from '../../hooks/useGsapAnimations';

export const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon'
  className = '',
  disabled = false,
  icon: Icon,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) return;
    animateClickBounce(btnRef.current);
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-bold transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#ff6b00] to-[#ff5000] hover:from-[#ff7a1a] hover:to-[#ff5c0d] text-white rounded-2xl py-3.5 px-6 shadow-[0_8px_24px_-4px_rgba(255,107,0,0.6)] hover:shadow-[0_12px_28px_-4px_rgba(255,107,0,0.8)] active:scale-[0.98]',
    secondary:
      'bg-[#1e2028] hover:bg-[#282a36] text-gray-200 hover:text-white rounded-2xl py-3.5 px-5 border border-white/10 hover:border-white/20 active:scale-[0.98]',
    outline:
      'bg-transparent border border-[#ff8c32]/40 hover:border-[#ff8c32] text-[#ff8c32] hover:bg-[#ff8c32]/10 rounded-2xl py-3 px-5 active:scale-[0.98]',
    icon: 'bg-[#1b1d24] hover:bg-[#252834] text-gray-300 hover:text-white border border-white/10 rounded-2xl p-3.5 transition-colors active:scale-95',
    ghost: 'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white rounded-xl p-2',
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className={`w-5 h-5 ${children ? 'mr-2' : ''}`} />}
      {children}
    </button>
  );
};
