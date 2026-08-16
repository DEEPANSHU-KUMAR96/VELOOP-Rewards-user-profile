import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const Badge = ({
  variant = 'level',
  label,
  icon: Icon,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-xs sm:text-sm',
    lg: 'px-4 py-1.5 text-sm',
  };

  if (variant === 'level') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full border border-[#ff8c32]/40 bg-[#ff8c32]/10 text-[#ffb066] shadow-[0_0_12px_rgba(255,140,50,0.15)] transition-transform hover:scale-105 whitespace-nowrap shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c32] animate-pulse shrink-0"></span>
        <span>{label}</span>
      </span>
    );
  }

  if (variant === 'verified') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full border border-[#ff8c32]/40 bg-[#ff8c32]/10 text-[#ffb066] shadow-[0_0_12px_rgba(255,140,50,0.15)] transition-transform hover:scale-105 whitespace-nowrap shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff943d] shrink-0" />
        <span>{label || 'Verified'}</span>
      </span>
    );
  }

  if (variant === 'pro') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full border border-amber-500/50 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)] whitespace-nowrap shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" style={{ animationDuration: '6s' }} />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border border-white/10 bg-white/5 text-gray-300 whitespace-nowrap shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{label}</span>
    </span>
  );
};
