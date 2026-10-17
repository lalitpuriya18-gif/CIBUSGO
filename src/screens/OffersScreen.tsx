import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { COUPONS, RESTAURANTS } from '../data/mockData.ts';

export const OffersScreen: React.FC = () => {
  const { applyCouponCode, setCurrentScreen, setSelectedRestaurantId, setShowGoldModal, showToast } =
    useApp();

  const [activeFilter, setActiveFilter] = useState<string>('All Offers');
  const [dealSearch, setDealSearch] = useState<string>('');

  const filterTabs = ['All Offers', 'Free Delivery', '50% OFF', 'BOGO Deals', 'Bank Offers'];

  const copyToClipboard = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Promo code "${code}" copied to clipboard!`, 'success');
  };

  const handleApplyAndOrder = (code: string, restaurantId?: string) => {
    applyCouponCode(code);
    if (restaurantId) {
      setSelectedRestaurantId(restaurantId);
      setCurrentScreen('restaurant-details');
    } else {
      setCurrentScreen('restaurants');
    }
  };

  const filteredCoupons = COUPONS.filter((c) => {
    if (dealSearch.trim()) {
      const q = dealSearch.toLowerCase();
      return (
        c.code.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.tag && c.tag.toLowerCase().includes(q))
      );
    }
    if (activeFilter === 'Free Delivery') return c.discountType === 'free_delivery';
    if (activeFilter === '50% OFF') return c.code === 'WELCOME50';
    if (activeFilter === 'BOGO Deals') return c.code === 'BOGOFEAST';
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#ffb693]/30 via-[#f0eded] to-[#ffdad6]/30 pt-12 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#e5e2e1]/60">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="px-3.5 py-1 bg-[#b6171e] text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
            Limited Time Offers
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1c1c] mb-2 max-w-2xl font-display">
            Super Saver Deals &amp; Exclusive Discounts
          </h1>

          <p className="text-xs sm:text-sm text-[#5a4136] max-w-xl mb-6 leading-relaxed">
            Discover mouth-watering deals, promo codes, and special restaurant discounts crafted to
            satisfy your cravings for less.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl bg-white shadow-xl rounded-full p-2 flex items-center gap-2 mb-6 border border-[#e5e2e1]">
            <span className="material-symbols-outlined text-[#a04100] pl-2 text-xl">search</span>
            <input
              value={dealSearch}
              onChange={(e) => setDealSearch(e.target.value)}
              className="flex-1 bg-transparent text-[#1b1c1c] placeholder:text-[#5a4136] text-xs sm:text-sm focus:outline-none px-2"
              placeholder="Search by restaurant, cuisine, or promo code..."
              type="text"
            />
            <button
              onClick={() => {
                if (dealSearch.trim()) {
                  showToast(`Searching deals for "${dealSearch}"`);
                }
              }}
              className="bg-[#a04100] hover:bg-[#ff6b00] text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Find Deals
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all ${
                  activeFilter === tab
                    ? 'bg-[#a04100] text-white'
                    : 'bg-white text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs text-[#a04100] font-bold uppercase tracking-wider block">
              Exclusive Banners
            </span>
            <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">Featured Promos</h2>
          </div>
          <button
            onClick={() => setCurrentScreen('restaurants')}
            className="text-xs font-bold text-[#a04100] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Promo Card 1 */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#ff6b00] to-[#a04100] p-8 text-white flex flex-col justify-between min-h-[260px]">
            <div className="absolute right-0 bottom-0 opacity-15 w-64 h-64 translate-x-10 translate-y-10 pointer-events-none">
              <span className="material-symbols-outlined text-[180px]">local_activity</span>
            </div>
            <div className="relative z-10 max-w-sm">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                New User Special
              </span>
              <h3 className="text-2xl font-extrabold mb-1 font-display">
                $50 Off Your First 3 Orders
              </h3>
              <p className="text-xs text-white/90 mb-4 leading-relaxed">
                Use code <strong className="underline font-bold">WELCOME50</strong> at checkout to
                redeem this introductory discount.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <button
                onClick={() => copyToClipboard('WELCOME50')}
                className="bg-white text-[#1b1c1c] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#fcf9f8] transition-colors shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                <span>Copy Code</span>
              </button>
              <button
                onClick={() => handleApplyAndOrder('WELCOME50', 'burger-co')}
                className="bg-[#b6171e] hover:bg-[#da3433] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md active:scale-95"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Promo Card 2 */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#b6171e] to-[#da3433] text-white p-8 flex flex-col justify-between min-h-[260px]">
            <div className="absolute right-0 bottom-0 opacity-15 w-64 h-64 translate-x-10 translate-y-10 pointer-events-none">
              <span className="material-symbols-outlined text-[180px]">restaurant</span>
            </div>
            <div className="relative z-10 max-w-sm">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Weekend Feast
              </span>
              <h3 className="text-2xl font-extrabold mb-1 font-display">Buy One Get One Free</h3>
              <p className="text-xs text-white/90 mb-4 leading-relaxed">
                Double the flavor on selected top-rated restaurants with code{' '}
                <strong className="underline font-bold">BOGOFEAST</strong>.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <button
                onClick={() => copyToClipboard('BOGOFEAST')}
                className="bg-white text-[#1b1c1c] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#fcf9f8] transition-colors shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                <span>Copy Code</span>
              </button>
              <button
                onClick={() => handleApplyAndOrder('BOGOFEAST', 'taj-spice')}
                className="bg-[#a04100] hover:bg-[#ff6b00] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md active:scale-95"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Active Promo Codes Section */}
      <section className="bg-[#f6f3f2] py-12 w-full border-y border-[#e5e2e1]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-xs text-[#a04100] font-bold uppercase tracking-wider block">
                Vouchers &amp; Coupons
              </span>
              <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">
                Active Promo Codes
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#e5e2e1]"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-[#ffdbcc] text-[#351000] px-3 py-1 rounded-lg text-xs font-bold">
                      {coupon.discountType === 'percentage'
                        ? `${coupon.discountValue}% OFF`
                        : coupon.discountType === 'free_delivery'
                        ? 'FREE DELIVERY'
                        : `$${coupon.discountValue} OFF`}
                    </span>
                    <span className="text-[11px] text-[#5a4136] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      <span>Exp. {coupon.expiresIn || 'Soon'}</span>
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1b1c1c] mb-1 font-display">
                    {coupon.tag || coupon.code}
                  </h4>
                  <p className="text-xs text-[#5a4136] mb-4 leading-relaxed">
                    {coupon.description}. Min. spend ${coupon.minSpend}.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between">
                  <span className="font-mono font-bold text-[#a04100] tracking-wider bg-[#f6f3f2] px-3 py-1 rounded-lg text-xs">
                    {coupon.code}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(coupon.code)}
                      className="p-2 bg-[#f0eded] hover:bg-[#a04100] hover:text-white text-[#1b1c1c] rounded-full transition-colors"
                      aria-label="Copy code"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                    <button
                      onClick={() => handleApplyAndOrder(coupon.code)}
                      className="px-3 py-1 bg-[#a04100] text-white hover:bg-[#ff6b00] rounded-lg text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Restaurant Deals & Special Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs text-[#a04100] font-bold uppercase tracking-wider block">
              Top Rated Discounts
            </span>
            <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">
              Restaurant Deals &amp; Special Offers
            </h2>
          </div>
          <button
            onClick={() => setCurrentScreen('restaurants')}
            className="text-xs font-bold text-[#a04100] hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESTAURANTS.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col border border-[#e5e2e1]"
            >
              <div
                className="relative h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${r.coverImage || r.image})` }}
              >
                <div className="absolute top-3 left-3 bg-[#b6171e] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md">
                  {r.discountTag || 'Special Deal'}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-base text-[#1b1c1c] font-display">{r.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1b1c1c]">
                      <span className="material-symbols-outlined text-amber-500 text-sm fill-1">
                        star
                      </span>
                      <span>{r.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#5a4136] mb-3">{r.cuisines.join(' • ')}</p>

                  <div className="flex items-center gap-4 text-xs text-[#5a4136] mb-4">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{r.deliveryTime}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">local_shipping</span>
                      <span>Free over $25</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRestaurantId(r.id);
                    setCurrentScreen('restaurant-details');
                  }}
                  className="w-full py-2.5 bg-[#a04100]/10 hover:bg-[#a04100] text-[#a04100] hover:text-white rounded-xl text-xs font-bold transition-all"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Loyalty & CashBack Perks Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1b1c1c] to-[#303030] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute right-0 top-0 opacity-10 w-96 h-96 translate-x-20 -translate-y-20 pointer-events-none">
            <span className="material-symbols-outlined text-[280px]">workspace_premium</span>
          </div>

          <div className="relative z-10 max-w-xl">
            <span className="bg-[#a04100] text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
              CIBUSGO Gold VIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 font-display">
              Earn 10% Cashback on Every Single Order
            </h2>
            <p className="text-xs sm:text-sm text-[#cfc4be] mb-6 leading-relaxed">
              Join CIBUSGO Gold today to unlock unlimited free deliveries, exclusive VIP
              restaurant deals, and instant cashback credited directly to your digital wallet.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGoldModal(true)}
                className="bg-[#a04100] hover:bg-[#ff6b00] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95"
              >
                Upgrade to Gold
              </button>
              <button
                onClick={() => setShowGoldModal(true)}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-3 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 min-w-[260px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a04100]/20 flex items-center justify-center text-[#ff6b00]">
                <span className="material-symbols-outlined text-xl">local_shipping</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Zero Delivery Fees</h4>
                <p className="text-[11px] text-[#cfc4be]">On all orders above $10</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b6171e]/20 flex items-center justify-center text-[#ffb3ac]">
                <span className="material-symbols-outlined text-xl">savings</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Instant Cashback</h4>
                <p className="text-[11px] text-[#cfc4be]">10% back on every meal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
