import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatCurrency } from '../utils/cartCalculations.ts';

export const CheckoutScreen: React.FC = () => {
  const {
    currentRestaurant,
    setCurrentScreen,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDeliveryFee,
    cartTax,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    deliveryNotes,
    setDeliveryNotes,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    paymentMethods,
    selectedPaymentId,
    setSelectedPaymentId,
    setShowAddressModal,
    placeOrder,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput.trim());
      setCouponInput('');
    }
  };

  const handlePlaceOrder = () => {
    placeOrder();
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <span className="material-symbols-outlined text-6xl text-[#cfc4be]">shopping_bag</span>
        <h2 className="text-2xl font-bold text-[#1b1c1c] mt-4 font-display">Your cart is empty</h2>
        <p className="text-xs sm:text-sm text-[#5a4136] mt-2 mb-6">
          Looks like you haven't added anything yet. Explore top restaurants near you!
        </p>
        <button
          onClick={() => setCurrentScreen('restaurants')}
          className="px-6 py-3 bg-[#a04100] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#ff6b00] transition-colors"
        >
          Explore Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] font-display">
          Secure Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#5a4136] mt-0.5">
          Review your items and complete your order from {currentRestaurant.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        {/* Left Column (70%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 1. Delivery Address Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a04100] fill-1">location_on</span>
                <h2 className="text-base sm:text-lg font-bold text-[#1b1c1c] font-display">
                  Delivery Address
                </h2>
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                className="text-xs font-bold text-[#a04100] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add New</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <label
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#f6f3f2] ring-2 ring-[#a04100]'
                        : 'bg-[#f6f3f2] hover:bg-[#f0eded] border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-bold text-xs text-[#1b1c1c] font-display">
                        {addr.label}
                      </span>
                      <input
                        type="radio"
                        name="delivery_address"
                        checked={isSelected}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="accent-[#a04100] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-[#5a4136] leading-relaxed">{addr.fullAddress}</p>
                    {addr.isDefault && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#a04100]">
                        <span className="material-symbols-outlined text-xs fill-1">check_circle</span>
                        <span>Default Address</span>
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Order Items Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eded]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a04100] fill-1">restaurant</span>
                <h2 className="text-base sm:text-lg font-bold text-[#1b1c1c] font-display">
                  {currentRestaurant.name}
                </h2>
              </div>
              <button
                onClick={() => setCurrentScreen('restaurant-details')}
                className="text-xs text-[#a04100] font-semibold hover:underline"
              >
                Add more items
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {cartItems.map((item) => {
                const itemTotalPrice = item.menuItem.price * item.quantity;
                return (
                  <div
                    key={item.menuItem.id}
                    className="flex gap-4 items-start pb-6 border-b border-[#f0eded] last:border-b-0 last:pb-0"
                  >
                    <img
                      alt={item.menuItem.name}
                      src={item.menuItem.image}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm border border-[#e5e2e1]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm text-[#1b1c1c] font-display truncate">
                          {item.menuItem.name}
                        </h3>
                        <span className="font-bold text-sm text-[#1b1c1c] font-mono">
                          {formatCurrency(itemTotalPrice)}
                        </span>
                      </div>
                      <p className="text-xs text-[#5a4136] mb-1">
                        {formatCurrency(item.menuItem.price)} each • {item.menuItem.category}
                      </p>

                      {/* Customization notes pill/box if present */}
                      {item.notes ? (
                        <div className="bg-[#f6f3f2] p-2 rounded-lg text-xs text-[#5a4136] mb-2">
                          Note: {item.notes}
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-[#f0eded] rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.menuItem.id, -1)}
                            className="p-1 hover:text-[#a04100] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="px-3 font-bold text-xs text-[#1b1c1c] font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.menuItem.id, 1)}
                            className="p-1 hover:text-[#a04100] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="text-[#b6171e] hover:opacity-80 transition-opacity flex items-center gap-1 text-xs font-semibold"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Cooking & Delivery Instructions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a04100] fill-1">edit_note</span>
              <h2 className="text-base sm:text-lg font-bold text-[#1b1c1c] font-display">
                Cooking &amp; Delivery Instructions
              </h2>
            </div>
            <textarea
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              className="w-full p-3 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] placeholder:text-[#5a4136] focus:outline-none focus:ring-2 focus:ring-[#a04100] h-24 resize-none border border-transparent focus:border-[#a04100]"
              placeholder="Add cooking instructions or delivery notes (e.g., Please ring doorbell, leave at front door)"
            />
          </div>

          {/* 4. Offers & Coupons Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a04100] fill-1">local_offer</span>
              <h2 className="text-base sm:text-lg font-bold text-[#1b1c1c] font-display">
                Offers &amp; Coupons
              </h2>
            </div>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="ENTER COUPON CODE"
                className="flex-1 px-4 py-2.5 bg-[#f6f3f2] rounded-xl text-xs font-mono uppercase text-[#1b1c1c] placeholder:text-[#5a4136] focus:outline-none focus:ring-2 focus:ring-[#a04100]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#a04100] hover:bg-[#ff6b00] text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                Apply
              </button>
            </form>

            {/* Quick Available Promo Code Buttons */}
            <div className="flex flex-wrap gap-2 mt-1">
              <button
                onClick={() => applyCouponCode('WELCOME50')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  appliedCoupon?.code === 'WELCOME50'
                    ? 'bg-[#a04100] text-white'
                    : 'bg-[#ffdbcc] text-[#351000] hover:bg-[#ffb693]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">local_activity</span>
                <span>WELCOME50 - $10 off</span>
              </button>

              <button
                onClick={() => applyCouponCode('BOGOFEAST')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  appliedCoupon?.code === 'BOGOFEAST'
                    ? 'bg-[#a04100] text-white'
                    : 'bg-[#f0eded] text-[#1b1c1c] hover:bg-[#eae7e7]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                <span>BOGOFEAST - Free delivery</span>
              </button>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs mt-1 border border-emerald-200">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>
                    Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (30% Sticky Summary) */}
        <div className="lg:col-span-3 sticky top-28 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-[#e5e2e1] flex flex-col gap-5">
            {/* Restaurant header */}
            <div className="pb-3 border-b border-[#f0eded] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1b1c1c] font-display">
                  {currentRestaurant.name}
                </h3>
                <span className="text-[11px] text-[#5a4136] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-xs text-[#a04100]">near_me</span>
                  <span>{currentRestaurant.distance} away</span>
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#f0eded] rounded-md text-[11px] font-bold text-[#a04100]">
                Open
              </span>
            </div>

            {/* Price breakdown */}
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between text-[#5a4136]">
                <span>Item Subtotal</span>
                <span className="text-[#1b1c1c] font-medium font-mono">
                  {formatCurrency(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#5a4136]">
                <span>Delivery Fee</span>
                <span className="text-[#1b1c1c] font-medium font-mono">
                  {cartDeliveryFee === 0 ? 'Free' : formatCurrency(cartDeliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-[#5a4136]">
                <span>Taxes &amp; Restaurant Charges</span>
                <span className="text-[#1b1c1c] font-medium font-mono">
                  {formatCurrency(cartTax)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#a04100] font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono">-{formatCurrency(cartDiscount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#f0eded] flex justify-between items-center">
                <span className="font-bold text-sm text-[#1b1c1c] font-display">Total Payable</span>
                <span className="font-bold text-xl text-[#a04100] font-mono">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#f0eded]">
              <span className="font-bold text-xs text-[#1b1c1c] font-display">Payment Method</span>
              <div className="flex flex-col gap-2">
                {paymentMethods.map((pm) => {
                  const isSelected = selectedPaymentId === pm.id;
                  return (
                    <label
                      key={pm.id}
                      onClick={() => setSelectedPaymentId(pm.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#f6f3f2] ring-1 ring-[#a04100]'
                          : 'bg-[#f6f3f2] hover:bg-[#f0eded]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[#a04100] text-lg">
                          {pm.type === 'card'
                            ? 'credit_card'
                            : pm.type === 'apple_pay'
                            ? 'phone_iphone'
                            : 'payments'}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-[#1b1c1c]">{pm.title}</p>
                          <p className="text-[10px] text-[#5a4136]">{pm.subtitle}</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment_method"
                        checked={isSelected}
                        onChange={() => setSelectedPaymentId(pm.id)}
                        className="accent-[#a04100] w-3.5 h-3.5 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Prominent CTA Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-[#ff6b00] hover:bg-[#a04100] active:scale-[0.98] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-lg fill-1">lock</span>
              <span>Place Order • {formatCurrency(cartTotal)}</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-around px-4 py-3 bg-[#f6f3f2] rounded-xl text-center border border-[#e5e2e1]">
            <div className="flex flex-col items-center gap-0.5">
              <span className="material-symbols-outlined text-[#a04100] text-lg">verified_user</span>
              <span className="text-[10px] font-semibold text-[#5a4136]">
                100% Secure Payments
              </span>
            </div>
            <div className="w-px h-6 bg-[#e5e2e1]"></div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="material-symbols-outlined text-[#a04100] text-lg">
                local_shipping
              </span>
              <span className="text-[10px] font-semibold text-[#5a4136]">Live Order Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
