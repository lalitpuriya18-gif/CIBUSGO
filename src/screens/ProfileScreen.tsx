import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { USER_PROFILE_HERO_AVATAR, RESTAURANTS } from '../data/mockData.ts';
import { formatCurrency } from '../utils/cartCalculations.ts';
import type { Order } from '../types/index.ts';

export const ProfileScreen: React.FC = () => {
  const {
    activeOrder,
    pastOrders,
    setCurrentScreen,
    reorder,
    addresses,
    deleteAddress,
    setShowAddressModal,
    paymentMethods,
    deletePaymentMethod,
    setShowPaymentModal,
    setReceiptModalOrder,
    setRateModalOrder,
    setShowGoldModal,
    favorites,
    toggleFavorite,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'orders'
    | 'profile'
    | 'addresses'
    | 'payments'
    | 'favorites'
    | 'notifications'
    | 'vouchers'
  >('orders');
  const [orderSubTab, setOrderSubTab] = useState<'active' | 'past'>('active');

  const favoriteRestaurants = RESTAURANTS.filter((r) => favorites.includes(r.id));

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Profile & Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#e5e2e1]">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              alt="Anna Martinez"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md border-2 border-white"
              src={USER_PROFILE_HERO_AVATAR}
            />
            <span className="absolute bottom-0 right-0 bg-[#a04100] text-white p-1 rounded-full shadow-sm material-symbols-outlined text-xs fill-1">
              verified
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1b1c1c] font-display">
                Anna Martinez
              </h1>
              <span className="bg-[#ffdbcc] text-[#351000] text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">workspace_premium</span>
                <span>CIBUSGO Gold VIP</span>
              </span>
            </div>
            <p className="text-xs text-[#5a4136]">anna.martinez@example.com • +1 555-0198</p>
            <p className="text-[11px] text-[#8e7164] mt-0.5">
              Member since March 2022 • 34 Orders Delivered
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => showToast('Profile details updated and saved successfully!')}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#f0eded] hover:bg-[#eae7e7] text-[#1b1c1c] transition-colors rounded-full text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => setShowGoldModal(true)}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#a04100] hover:bg-[#ff6b00] text-white transition-colors rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">local_activity</span>
            <span>View Vouchers ($45 value)</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Stats Bento Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e5e2e1] flex items-center gap-4">
          <div className="p-3 bg-[#ffdbcc] text-[#a04100] rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
          </div>
          <div>
            <p className="text-[11px] text-[#5a4136]">Total Orders</p>
            <p className="text-xl font-extrabold text-[#1b1c1c] font-display">34</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e5e2e1] flex items-center gap-4">
          <div className="p-3 bg-[#ffdad6] text-[#b6171e] rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">savings</span>
          </div>
          <div>
            <p className="text-[11px] text-[#5a4136]">Total Saved</p>
            <p className="text-xl font-extrabold text-[#1b1c1c] font-display">$180.00</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e5e2e1] flex items-center gap-4">
          <div className="p-3 bg-[#ece0d9] text-[#655d58] rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">restaurant</span>
          </div>
          <div>
            <p className="text-[11px] text-[#5a4136]">Favorite Cuisine</p>
            <p className="text-xl font-extrabold text-[#1b1c1c] font-display">Artisan Italian</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e5e2e1] flex items-center gap-4">
          <div className="p-3 bg-[#ffdbcc] text-[#a04100] rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">stars</span>
          </div>
          <div>
            <p className="text-[11px] text-[#5a4136]">Reward Points</p>
            <p className="text-xl font-extrabold text-[#1b1c1c] font-display">1,240 pts</p>
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Left Nav Sidebar & Right Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1 flex flex-col gap-1">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'orders'
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">receipt_long</span>
              <span>Order History</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'profile'
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">person</span>
              <span>Profile Information</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'addresses'
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">home</span>
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'payments'
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">payments</span>
              <span>Payment Methods</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'favorites'
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">favorite</span>
              <span>Favorite Restaurants</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('notifications');
                showToast('Push notifications and SMS order updates are enabled');
              }}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                activeTab === 'notifications'
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c]'
              }`}
            >
              <span className="material-symbols-outlined text-base">notifications</span>
              <span>Notifications</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('vouchers');
                setCurrentScreen('offers');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#5a4136] hover:bg-[#f0eded] hover:text-[#1b1c1c] transition-all text-left"
            >
              <span className="material-symbols-outlined text-base">local_activity</span>
              <span>Vouchers &amp; Rewards</span>
            </button>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Active Tab: Orders */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#e5e2e1] flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1b1c1c] font-display">
                  Order History &amp; Tracking
                </h2>
                <div className="flex gap-1 bg-[#f0eded] p-1 rounded-xl">
                  <button
                    onClick={() => setOrderSubTab('active')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      orderSubTab === 'active'
                        ? 'bg-white text-[#1b1c1c] shadow-sm'
                        : 'text-[#5a4136] hover:text-[#1b1c1c]'
                    }`}
                  >
                    Active Orders ({activeOrder ? 1 : 0})
                  </button>
                  <button
                    onClick={() => setOrderSubTab('past')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      orderSubTab === 'past'
                        ? 'bg-white text-[#1b1c1c] shadow-sm'
                        : 'text-[#5a4136] hover:text-[#1b1c1c]'
                    }`}
                  >
                    Past Orders ({pastOrders.length})
                  </button>
                </div>
              </div>

              {/* Active Order Card */}
              {orderSubTab === 'active' && activeOrder && (
                <div className="bg-[#f6f3f2] p-5 rounded-2xl border border-[#e5e2e1]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#e5e2e1]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#ffdbcc] rounded-xl flex items-center justify-center text-[#a04100]">
                        <span className="material-symbols-outlined animate-spin text-2xl">
                          local_shipping
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1b1c1c] font-display">
                            {activeOrder.restaurantName}
                          </span>
                          <span className="bg-[#ffdbcc] text-[#351000] text-[10px] px-2 py-0.5 rounded-full font-bold">
                            On the way
                          </span>
                        </div>
                        <p className="text-xs text-[#5a4136]">
                          Order #{activeOrder.id} • Estimated arrival in 22 mins
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentScreen('live-tracking')}
                      className="px-4 py-2 bg-[#a04100] hover:bg-[#ff6b00] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">map</span>
                      <span>Live Tracking</span>
                    </button>
                  </div>

                  <div className="pt-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <p className="text-xs text-[#5a4136]">
                      {activeOrder.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                    </p>
                    <p className="font-bold text-sm text-[#1b1c1c] font-mono">
                      {formatCurrency(activeOrder.total)}
                    </p>
                  </div>
                </div>
              )}

              {/* Past Completed Orders List */}
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-sm text-[#1b1c1c] font-display">Completed Orders</h3>

                {pastOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#f6f3f2] p-5 rounded-2xl border border-[#e5e2e1] flex flex-col gap-3"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-inner overflow-hidden">
                          <span className="material-symbols-outlined text-[#a04100]">
                            restaurant
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#1b1c1c] font-display">
                              {order.restaurantName}
                            </span>
                            <span className="bg-[#e5e2e1] text-[#5a4136] text-[10px] px-2 py-0.5 rounded-full font-bold">
                              Delivered
                            </span>
                          </div>
                          <p className="text-xs text-[#5a4136]">
                            Order #{order.id} • {order.placedAt}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-[#1b1c1c] font-mono">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-[11px] text-[#5a4136]">{order.items.length} items</p>
                      </div>
                    </div>

                    <p className="text-xs text-[#5a4136]">
                      {order.items.map((i) => i.menuItem.name).join(', ')}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#e5e2e1]">
                      <button
                        onClick={() => reorder(order)}
                        className="px-3.5 py-1.5 bg-[#a04100] text-white hover:bg-[#ff6b00] rounded-full text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        <span>Reorder</span>
                      </button>
                      <button
                        onClick={() => setRateModalOrder(order)}
                        className="px-3.5 py-1.5 bg-white hover:bg-[#f0eded] text-[#1b1c1c] rounded-full text-xs font-semibold flex items-center gap-1 transition-colors border border-[#e5e2e1]"
                      >
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span>Rate Order</span>
                      </button>
                      <button
                        onClick={() => setReceiptModalOrder(order)}
                        className="px-3.5 py-1.5 bg-white hover:bg-[#f0eded] text-[#1b1c1c] rounded-full text-xs font-semibold flex items-center gap-1 transition-colors border border-[#e5e2e1]"
                      >
                        <span className="material-symbols-outlined text-sm">receipt</span>
                        <span>View Receipt</span>
                      </button>
                      <button
                        onClick={() =>
                          showToast('Support ticket #TK-4820 opened. An agent will respond in 2m.')
                        }
                        className="px-3.5 py-1.5 bg-white hover:bg-[#f0eded] text-[#1b1c1c] rounded-full text-xs font-semibold flex items-center gap-1 transition-colors border border-[#e5e2e1]"
                      >
                        <span className="material-symbols-outlined text-sm">help</span>
                        <span>Get Help</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Tab: Profile Information */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#e5e2e1] flex flex-col gap-5">
              <h2 className="text-lg font-bold text-[#1b1c1c] font-display">Personal Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-xs font-semibold text-[#5a4136] block mb-1">Full Name</label>
                  <input
                    defaultValue="Anna Martinez"
                    className="w-full p-2.5 bg-[#f6f3f2] rounded-xl text-[#1b1c1c] focus:outline-none focus:ring-1 focus:ring-[#a04100]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5a4136] block mb-1">Email</label>
                  <input
                    defaultValue="anna.martinez@example.com"
                    className="w-full p-2.5 bg-[#f6f3f2] rounded-xl text-[#1b1c1c] focus:outline-none focus:ring-1 focus:ring-[#a04100]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5a4136] block mb-1">
                    Phone Number
                  </label>
                  <input
                    defaultValue="+1 555-0198"
                    className="w-full p-2.5 bg-[#f6f3f2] rounded-xl text-[#1b1c1c] focus:outline-none focus:ring-1 focus:ring-[#a04100]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5a4136] block mb-1">Membership</label>
                  <input
                    readOnly
                    defaultValue="CIBUSGO Gold VIP (Active)"
                    className="w-full p-2.5 bg-[#ffdbcc] text-[#351000] font-bold rounded-xl focus:outline-none cursor-default"
                  />
                </div>
              </div>
              <button
                onClick={() => showToast('Profile changes saved successfully!')}
                className="w-fit px-6 py-2.5 bg-[#a04100] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#ff6b00] transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Active Tab: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#e5e2e1] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0eded]">
                <h3 className="font-bold text-base text-[#1b1c1c] font-display">Saved Addresses</h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="text-xs font-bold text-[#a04100] hover:underline"
                >
                  + Add New
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 bg-[#f6f3f2] rounded-2xl border border-[#e5e2e1] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#a04100] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-lg">
                          {addr.label === 'Home' ? 'home' : 'work'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1b1c1c]">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="bg-[#a04100] text-white text-[10px] px-2 py-0.2 rounded-full font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5a4136]">{addr.fullAddress}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="p-2 text-[#ba1a1a] hover:bg-white rounded-full transition-colors"
                      aria-label="Delete address"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Tab: Payment Methods */}
          {activeTab === 'payments' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#e5e2e1] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0eded]">
                <h3 className="font-bold text-base text-[#1b1c1c] font-display">
                  Payment Methods
                </h3>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="text-xs font-bold text-[#a04100] hover:underline"
                >
                  + Add Card
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className="p-4 bg-[#f6f3f2] rounded-2xl border border-[#e5e2e1] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#a04100] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-lg">
                          {pm.type === 'card'
                            ? 'credit_card'
                            : pm.type === 'apple_pay'
                            ? 'phone_iphone'
                            : 'payments'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1b1c1c]">{pm.title}</span>
                          {pm.isDefault && (
                            <span className="bg-[#a04100] text-white text-[10px] px-2 py-0.2 rounded-full font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5a4136]">{pm.subtitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deletePaymentMethod(pm.id)}
                      className="p-2 text-[#ba1a1a] hover:bg-white rounded-full transition-colors"
                      aria-label="Delete payment method"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Tab: Favorite Restaurants */}
          {activeTab === 'favorites' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#e5e2e1] flex flex-col gap-4">
              <h3 className="font-bold text-base text-[#1b1c1c] font-display">
                Favorite Restaurants ({favoriteRestaurants.length})
              </h3>
              {favoriteRestaurants.length === 0 ? (
                <p className="text-xs text-[#5a4136]">No favorite restaurants saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteRestaurants.map((r) => (
                    <div
                      key={r.id}
                      className="bg-[#f6f3f2] p-4 rounded-2xl border border-[#e5e2e1] flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-bold text-xs text-[#1b1c1c]">{r.name}</h4>
                        <p className="text-[11px] text-[#5a4136]">{r.cuisines.join(', ')}</p>
                        <p className="text-[11px] text-[#a04100] font-semibold">★ {r.rating}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(r.id)}
                        className="text-[#b6171e] p-2 hover:bg-white rounded-full"
                        aria-label="Remove favorite"
                      >
                        <span className="material-symbols-outlined text-base fill-1">favorite</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Grid: Saved Addresses & Payment Methods Quick Glance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Addresses Quick Box */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-[#1b1c1c] font-display">Saved Addresses</h3>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="text-[#a04100] text-xs font-semibold hover:underline"
                  >
                    + Add New
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {addresses.slice(0, 2).map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-[#f6f3f2] p-3 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white text-[#a04100] rounded-xl shadow-sm">
                          <span className="material-symbols-outlined text-base">
                            {addr.label === 'Home' ? 'home' : 'work'}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#1b1c1c]">{addr.label}</span>
                          <p className="text-[11px] text-[#5a4136] truncate max-w-[180px]">
                            {addr.fullAddress}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="p-1.5 text-[#ba1a1a] hover:bg-white rounded-full"
                        aria-label="Delete address"
                      >
                        <span className="material-symbols-outlined text-xs">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payments Quick Box */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-[#1b1c1c] font-display">
                    Payment Methods
                  </h3>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="text-[#a04100] text-xs font-semibold hover:underline"
                  >
                    + Add Card
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {paymentMethods.slice(0, 2).map((pm) => (
                    <div
                      key={pm.id}
                      className="bg-[#f6f3f2] p-3 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white text-[#a04100] rounded-xl shadow-sm">
                          <span className="material-symbols-outlined text-base">
                            {pm.type === 'card' ? 'credit_card' : 'phone_iphone'}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#1b1c1c]">{pm.title}</span>
                          <p className="text-[11px] text-[#5a4136]">{pm.subtitle}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deletePaymentMethod(pm.id)}
                        className="p-1.5 text-[#ba1a1a] hover:bg-white rounded-full"
                        aria-label="Delete payment method"
                      >
                        <span className="material-symbols-outlined text-xs">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
