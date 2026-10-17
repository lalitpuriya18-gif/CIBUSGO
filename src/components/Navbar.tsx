import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { LOGO_URL, USER_AVATAR } from '../data/mockData.ts';
import type { ScreenType } from '../types/index.ts';

export const Navbar: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    totalCartItemCount,
    deliveryLocation,
    setDeliveryLocation,
    searchQuery,
    setSearchQuery,
    activeOrder,
  } = useApp();

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locations = [
    'Deliver to: New York, NY',
    'Deliver to: Brooklyn, NY',
    'Deliver to: Queens, NY',
    'Deliver to: Manhattan, NY',
  ];

  const handleNavClick = (screen: ScreenType) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentScreen('restaurants');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/90 backdrop-blur-xl border-b border-[#e5e2e1]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Location */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            aria-label="CIBUSGO Home"
          >
            <img
              alt="CIBUSGO Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={LOGO_URL}
            />
            <span className="font-bold text-lg sm:text-xl text-[#1b1c1c] font-display tracking-tight flex items-center">
              CIBUS<span className="text-[#a04100]">GO</span>
            </span>
          </button>

          {/* Delivery Location Picker */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-1 bg-[#f0eded] hover:bg-[#eae7e7] px-3.5 py-1.5 rounded-full text-[#5a4136] text-xs font-semibold transition-colors focus:outline-none"
              aria-expanded={showLocationDropdown}
            >
              <span className="material-symbols-outlined text-[#a04100] text-base fill-1">
                location_on
              </span>
              <span>{deliveryLocation}</span>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </button>

            {showLocationDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e5e2e1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1 text-[11px] font-bold text-[#8e7164] uppercase tracking-wider">
                  Select Delivery Zone
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setDeliveryLocation(loc.replace('Deliver to: ', ''));
                      setShowLocationDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#1b1c1c] hover:bg-[#f6f3f2] hover:text-[#a04100] flex items-center justify-between"
                  >
                    <span>{loc}</span>
                    {deliveryLocation.includes(loc.replace('Deliver to: ', '')) && (
                      <span className="material-symbols-outlined text-xs text-[#a04100]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 material-symbols-outlined text-[#5a4136] text-lg pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (currentScreen !== 'restaurants') setCurrentScreen('restaurants');
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#f0eded] hover:bg-[#eae7e7] rounded-full text-[#1b1c1c] placeholder:text-[#5a4136] text-sm focus:outline-none focus:ring-2 focus:ring-[#a04100] focus:bg-white transition-all"
              placeholder="Search for restaurants, cuisine, or dishes..."
              type="text"
            />
          </form>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'home'
                ? 'bg-[#a04100] text-white shadow-sm'
                : 'text-[#5a4136] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('restaurants')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'restaurants' || currentScreen === 'restaurant-details'
                ? 'bg-[#a04100] text-white shadow-sm'
                : 'text-[#5a4136] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Restaurants
          </button>
          <button
            onClick={() => handleNavClick('offers')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'offers'
                ? 'bg-[#a04100] text-white shadow-sm'
                : 'text-[#5a4136] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'profile'
                ? 'bg-[#a04100] text-white shadow-sm'
                : 'text-[#5a4136] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => handleNavClick('live-tracking')}
            className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              currentScreen === 'live-tracking'
                ? 'bg-[#a04100] text-white shadow-sm'
                : 'text-[#5a4136] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            <span>Live Tracking</span>
            {activeOrder && (
              <span className="w-2 h-2 rounded-full bg-[#da3433] animate-pulse"></span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('favorites')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'favorites'
                ? 'bg-[#a04100] text-white shadow-sm'
                : 'text-[#5a4136] hover:text-[#1b1c1c] hover:bg-[#f0eded]'
            }`}
          >
            Favorites
          </button>
        </nav>

        {/* Right Actions: Cart & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('checkout')}
            className="relative p-2.5 bg-[#f0eded] hover:bg-[#eae7e7] rounded-full text-[#1b1c1c] transition-colors focus:outline-none active:scale-95"
            aria-label={`Shopping Cart with ${totalCartItemCount} items`}
          >
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
            {totalCartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#b6171e] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                {totalCartItemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('profile')}
            className="rounded-full ring-2 ring-transparent hover:ring-[#a04100] transition-all focus:outline-none"
            aria-label="User Profile"
          >
            <img
              alt="Anna Martinez Profile"
              className="w-9 h-9 rounded-full object-cover shadow-sm"
              src={USER_AVATAR}
            />
          </button>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#1b1c1c] hover:bg-[#f0eded] rounded-full focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fcf9f8] border-b border-[#e5e2e1] px-4 py-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 material-symbols-outlined text-[#5a4136] text-base">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#f0eded] rounded-xl text-xs text-[#1b1c1c]"
              placeholder="Search restaurants, cuisines..."
            />
          </form>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentScreen === 'home' ? 'bg-[#a04100] text-white' : 'text-[#1b1c1c]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('restaurants')}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentScreen === 'restaurants' ? 'bg-[#a04100] text-white' : 'text-[#1b1c1c]'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentScreen === 'offers' ? 'bg-[#a04100] text-white' : 'text-[#1b1c1c]'
              }`}
            >
              Offers & Promo Codes
            </button>
            <button
              onClick={() => handleNavClick('live-tracking')}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between ${
                currentScreen === 'live-tracking' ? 'bg-[#a04100] text-white' : 'text-[#1b1c1c]'
              }`}
            >
              <span>Live Order Tracking</span>
              {activeOrder && (
                <span className="text-[10px] bg-[#da3433] text-white px-2 py-0.5 rounded-full font-bold">
                  Active
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium ${
                currentScreen === 'profile' ? 'bg-[#a04100] text-white' : 'text-[#1b1c1c]'
              }`}
            >
              Profile & Order History
            </button>
            <button
              onClick={() => handleNavClick('checkout')}
              className={`text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between ${
                currentScreen === 'checkout' ? 'bg-[#a04100] text-white' : 'text-[#1b1c1c]'
              }`}
            >
              <span>Cart & Checkout</span>
              <span className="bg-[#b6171e] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {totalCartItemCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
