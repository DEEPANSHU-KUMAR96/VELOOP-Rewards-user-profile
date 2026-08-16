import React from 'react';
import { useProfile } from '../../context/ProfileContext';

const VIEW_MODES = [
  { id: 'initial',  label: 'Empty',   color: '#6b7280' },
  { id: 'skeleton', label: 'Loading', color: '#a78bfa' },
  { id: 'active',   label: 'Active',  color: '#34d399' },
  { id: 'error',    label: 'Error',   color: '#f43f5e' },
];

export const DevControls = () => {
  const { viewMode, setViewMode } = useProfile();

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 glass border border-white/10 rounded-2xl p-2 shadow-xl">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold pl-1 pr-2 hidden sm:block">Preview:</p>
      {VIEW_MODES.map(({ id, label, color }) => (
        <button
          key={id}
          onClick={() => setViewMode(id)}
          className="text-[11px] font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer border"
          style={{
            borderColor: viewMode === id ? color : 'rgba(255,255,255,0.08)',
            background:   viewMode === id ? `${color}20` : 'rgba(255,255,255,0.02)',
            color:        viewMode === id ? color : '#6b7280',
            boxShadow:    viewMode === id ? `0 0 12px ${color}40` : 'none',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
