import React from 'react';

export const Card = ({
  children,
  className = '',
  variant = 'default', // 'default' | 'glow' | 'subtle' | 'gradient'
  hoverEffect = false,
  ...props
}) => {
  const variants = {
    default:
      'bg-[#15171e]/80 border border-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl',
    glow:
      'bg-gradient-to-b from-[#1c1e28] to-[#12141a] border border-[#ff6b00]/25 shadow-[0_15px_35px_-10px_rgba(255,107,0,0.15)] backdrop-blur-xl',
    subtle:
      'bg-[#121319]/60 border border-white/[0.04] backdrop-blur-md',
    gradient:
      'bg-gradient-to-br from-[#201915] via-[#14151a] to-[#161218] border border-[#ff8c32]/20 shadow-[0_12px_32px_rgba(0,0,0,0.6)]',
  };

  return (
    <div
      className={`rounded-3xl p-5 transition-all duration-300 ${
        variants[variant] || variants.default
      } ${
        hoverEffect
          ? 'hover:border-[#ff8c32]/40 hover:shadow-[0_12px_30px_rgba(255,107,0,0.2)] hover:-translate-y-0.5'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
