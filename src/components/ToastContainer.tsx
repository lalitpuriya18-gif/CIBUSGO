import React from 'react';
import { useApp } from '../context/AppContext.tsx';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-right-4 ${
            toast.type === 'error'
              ? 'bg-[#ba1a1a] text-white'
              : toast.type === 'info'
              ? 'bg-[#1b1c1c] text-white'
              : 'bg-[#a04100] text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">
              {toast.type === 'error'
                ? 'error'
                : toast.type === 'info'
                ? 'info'
                : 'check_circle'}
            </span>
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/80 hover:text-white p-0.5 rounded-full"
            aria-label="Close notification"
          >
            <span className="material-symbols-outlined text-xs">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
