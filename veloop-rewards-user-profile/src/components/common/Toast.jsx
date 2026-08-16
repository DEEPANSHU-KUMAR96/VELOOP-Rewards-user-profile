import React, { useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';
import gsap from 'gsap';

export const Toast = ({ show, message, type = 'success', onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (show && toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [show]);

  if (!show) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-[#ff8c32]" />,
    celebration: <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-cyan-400" />,
  };

  const borderColors = {
    success: 'border-[#ff8c32]/50 shadow-[0_10px_25px_-5px_rgba(255,107,0,0.3)]',
    celebration: 'border-amber-400/60 shadow-[0_10px_30px_-5px_rgba(251,191,36,0.4)]',
    error: 'border-rose-500/50 shadow-[0_10px_25px_-5px_rgba(244,63,94,0.3)]',
    info: 'border-cyan-500/50 shadow-[0_10px_25px_-5px_rgba(6,182,212,0.3)]',
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm pointer-events-auto">
      <div
        ref={toastRef}
        className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-[#181920]/95 backdrop-blur-xl border ${borderColors[type] || borderColors.success} text-white font-medium text-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0">{iconMap[type] || iconMap.success}</div>
          <span className="leading-snug">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
