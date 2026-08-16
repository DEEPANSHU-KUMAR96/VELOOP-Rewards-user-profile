import React from 'react';
import { Zap } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useProfile } from '../../context/ProfileContext';

export const WithdrawModal = () => {
  const { withdrawOpen, setWithdrawOpen, userData, handleWithdraw } = useProfile();
  const [amount, setAmount] = React.useState('');

  const presets = [100, 250, 500, 1000];

  const onSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseInt(amount, 10);
    if (isNaN(numAmount) || numAmount <= 0) return;
    const success = handleWithdraw(numAmount);
    if (success) {
      setAmount('');
      setWithdrawOpen(false);
    }
  };

  return (
    <Modal isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} title="Withdraw VEs">
      {/* Balance Display */}
      <div className="rounded-2xl bg-[#ff8c32]/8 border border-[#ff8c32]/20 p-4 mb-5 text-center">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Available Balance</p>
        <p className="text-4xl font-black text-[#ff8c32] font-mono">{userData.availableVEs.toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-1">VEs</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Preset amounts */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2.5">Quick Select</p>
          <div className="grid grid-cols-4 gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(String(preset))}
                className={`py-2.5 rounded-xl text-sm font-bold border transition-all cursor-pointer active:scale-95 ${
                  amount === String(preset)
                    ? 'bg-[#ff6b00] border-[#ff6b00] text-white shadow-[0_4px_14px_rgba(255,107,0,0.4)]'
                    : 'bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Custom Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter VEs amount"
              min="1"
              max={userData.availableVEs}
              className="w-full bg-[#111318] border border-white/[0.1] focus:border-[#ff8c32]/60 rounded-2xl px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all text-base font-mono font-bold pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ff8c32] font-bold text-sm">VEs</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!amount || parseInt(amount) <= 0 || parseInt(amount) > userData.availableVEs}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff5000] text-white font-bold text-base shadow-[0_8px_24px_rgba(255,107,0,0.5)] hover:shadow-[0_10px_28px_rgba(255,107,0,0.7)] hover:-translate-y-0.5 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_24px_rgba(255,107,0,0.5)] flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Withdraw {amount ? `${parseInt(amount).toLocaleString()} VEs` : 'VEs'}
        </button>
      </form>
    </Modal>
  );
};
