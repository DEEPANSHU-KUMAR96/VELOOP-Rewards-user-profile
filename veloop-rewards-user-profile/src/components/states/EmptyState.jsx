import React from 'react';
import { UserX } from 'lucide-react';

export const EmptyState = ({ title = 'Nothing here yet', description = 'Your profile data will appear here once you get started.', action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center min-h-[60vh]">
      <div className="w-20 h-20 rounded-full bg-[#ff8c32]/10 border border-[#ff8c32]/20 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(255,107,0,0.15)]">
        <UserX className="w-9 h-9 text-[#ff943d]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm sm:text-base max-w-xs leading-relaxed mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff5000] text-white font-bold text-sm shadow-[0_6px_20px_rgba(255,107,0,0.4)] hover:shadow-[0_8px_25px_rgba(255,107,0,0.6)] hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
