import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatCurrency } from '../utils/cartCalculations.ts';

export const FloatingCart: React.FC = () => {
  const { currentScreen, setCurrentScreen, cartItems, cartTotal, totalCartItemCount } = useApp();

  if (totalCartItemCount === 0) return null;
  // Don't show floating cart on checkout, live-tracking, profile, or offers
  if (
    currentScreen === 'checkout' ||
    currentScreen === 'live-tracking' ||
    currentScreen === 'profile' ||
    currentScreen === 'offers'
  ) {
    return null;
  }

  // Count distinct restaurants in cart
  const distinctRestaurants = new Set(cartItems.map((i) => i.menuItem.restaurantId)).size;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1b1c1c]/95 backdrop-blur-xl text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center justify-between gap-6 max-w-md w-[92%] sm:w-auto border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-200 ${
        currentScreen === 'restaurant-details' ? 'lg:hidden' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-[#ff6b00] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-inner">
          {totalCartItemCount}
        </div>
        <div>
          <p className="text-xs font-bold text-white">
            {totalCartItemCount} {totalCartItemCount === 1 ? 'item' : 'items'} in cart
          </p>
          <p className="text-[11px] text-[#cfc4be]">
            From {distinctRestaurants} {distinctRestaurants === 1 ? 'restaurant' : 'restaurants'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-bold text-sm text-[#ffdbcc] font-mono">
          {formatCurrency(cartTotal)}
        </span>
        <button
          onClick={() => setCurrentScreen('checkout')}
          className="bg-[#a04100] hover:bg-[#ff6b00] active:scale-95 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1"
        >
          <span>View Cart</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
