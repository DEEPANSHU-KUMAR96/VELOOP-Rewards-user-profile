import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export const ErrorState = ({ title = 'Something went wrong', description = 'We couldn\'t load your profile. Please try again.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center min-h-[60vh]">
      <div className="relative w-20 h-20 mb-5">
        <div className="absolute inset-0 rounded-full bg-rose-500/10 border border-rose-500/25 animate-pulse" />
        <div className="w-full h-full rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
          <AlertTriangle className="w-9 h-9 text-rose-400" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm sm:text-base max-w-xs leading-relaxed mb-6">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-sm hover:bg-rose-500/20 hover:border-rose-500/50 transition-all cursor-pointer active:scale-95"
        >
          <RefreshCcw className="w-4.5 h-4.5" />
          Try Again
        </button>
      )}
    </div>
  );
};
