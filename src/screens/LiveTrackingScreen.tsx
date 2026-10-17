import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { MAP_IMAGE_URL, DRIVER_AVATAR_URL } from '../data/mockData.ts';
import { formatCurrency } from '../utils/cartCalculations.ts';

export const LiveTrackingScreen: React.FC = () => {
  const {
    activeOrder,
    setCurrentScreen,
    setShowCallModal,
    setShowMessageModal,
    setShowAddressModal,
    setTipAmount,
    showToast,
  } = useApp();

  const [mapZoom, setMapZoom] = useState(1);
  const [selectedTip, setSelectedTip] = useState<number>(3);
  const [showCustomTipInput, setShowCustomTipInput] = useState(false);
  const [customTipValue, setCustomTipValue] = useState('');

  if (!activeOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <span className="material-symbols-outlined text-6xl text-[#cfc4be]">local_shipping</span>
        <h2 className="text-2xl font-bold text-[#1b1c1c] mt-4 font-display">No active delivery</h2>
        <p className="text-xs sm:text-sm text-[#5a4136] mt-2 mb-6">
          You don't have an order currently in transit. Place an order to start live tracking!
        </p>
        <button
          onClick={() => setCurrentScreen('restaurants')}
          className="px-6 py-3 bg-[#a04100] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#ff6b00] transition-colors"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  const handleTipSelect = (val: number) => {
    setSelectedTip(val);
    setShowCustomTipInput(false);
    setTipAmount(val);
    showToast(`Added ${formatCurrency(val)} tip for courier Michael!`);
  };

  const handleCustomTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(customTipValue);
    if (!isNaN(num) && num >= 0) {
      setSelectedTip(num);
      setShowCustomTipInput(false);
      setTipAmount(num);
      showToast(`Added ${formatCurrency(num)} tip!`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner / Live Alert Section */}
      <div className="w-full bg-[#ffdbcc] py-3 px-4 sm:px-6 lg:px-8 border-b border-[#e5e2e1]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#351000] text-xs sm:text-sm font-semibold">
            <span className="material-symbols-outlined animate-spin text-[#a04100] text-lg">
              sync
            </span>
            <span>Live tracking active. Your courier is 1.2 miles away.</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-[#351000]">
            <span>Need to update delivery instructions?</span>
            <button
              onClick={() => setShowAddressModal(true)}
              className="underline font-bold hover:text-[#a04100] transition-colors"
            >
              Edit Address
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Status, Map, Steps & Driver Info (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Order Status Header Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e2e1] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#da3433] text-white rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>On the way</span>
                </span>
                <span className="text-xs text-[#5a4136] font-mono">Order #{activeOrder.id}</span>
              </div>
              <h1 className="text-2xl font-bold text-[#1b1c1c] font-display">
                {activeOrder.restaurantName}
              </h1>
              <p className="text-xs text-[#5a4136]">
                Estimated Delivery at <span className="font-bold text-[#1b1c1c]">12:45 PM</span> (22
                mins remaining)
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#f6f3f2] px-4 py-2.5 rounded-xl border border-[#e5e2e1]">
              <div className="text-right">
                <div className="text-[10px] font-bold text-[#5a4136] uppercase tracking-wider">
                  ETA
                </div>
                <div className="text-lg font-bold text-[#a04100] font-mono">22 mins</div>
              </div>
              <span className="material-symbols-outlined text-2xl text-[#a04100] fill-1">
                timer
              </span>
            </div>
          </div>

          {/* Interactive Map & Timeline Container */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#e5e2e1] flex flex-col">
            {/* Map View */}
            <div
              className="relative w-full h-80 sm:h-96 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url(${MAP_IMAGE_URL})`,
                transform: `scale(${mapZoom})`,
                transformOrigin: 'center center',
              }}
            >
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
                <button
                  onClick={() => setMapZoom((prev) => Math.min(prev + 0.15, 1.4))}
                  className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-[#1b1c1c] hover:bg-[#f6f3f2] transition-colors"
                  aria-label="Zoom in"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
                <button
                  onClick={() => setMapZoom((prev) => Math.max(prev - 0.15, 0.9))}
                  className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-[#1b1c1c] hover:bg-[#f6f3f2] transition-colors"
                  aria-label="Zoom out"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <button
                  onClick={() => {
                    setMapZoom(1);
                    showToast('Map re-centered to courier live position');
                  }}
                  className="w-9 h-9 bg-[#a04100] text-white shadow-md rounded-full flex items-center justify-center hover:bg-[#ff6b00] transition-colors"
                  aria-label="Re-center map"
                >
                  <span className="material-symbols-outlined text-sm fill-1">my_location</span>
                </button>
              </div>

              {/* Floating Driver Pin Widget */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-[#a04100]/20 animate-bounce">
                <div className="w-7 h-7 rounded-full bg-[#ff6b00] flex items-center justify-center text-white shadow-sm">
                  <span className="material-symbols-outlined text-sm fill-1">two_wheeler</span>
                </div>
                <div className="text-xs font-bold text-[#1b1c1c] font-display">
                  Michael is 4 mins away
                </div>
              </div>
            </div>

            {/* Status Timeline Steps */}
            <div className="p-6 bg-white border-t border-[#f0eded] grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#a04100] text-xs font-bold">
                  <span className="material-symbols-outlined text-base fill-1">check_circle</span>
                  <span>Order Placed</span>
                </div>
                <span className="text-[11px] text-[#5a4136]">12:10 PM - Confirmed</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#a04100] text-xs font-bold">
                  <span className="material-symbols-outlined text-base fill-1">check_circle</span>
                  <span>Kitchen Preparing</span>
                </div>
                <span className="text-[11px] text-[#5a4136]">12:12 PM - Grilling patties</span>
              </div>

              {/* Step 3 (Current Active) */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#b6171e] text-xs font-bold">
                  <span className="material-symbols-outlined text-base fill-1 animate-pulse">
                    radio_button_checked
                  </span>
                  <span>Out for Delivery</span>
                </div>
                <span className="text-[11px] text-[#1b1c1c] font-medium">12:32 PM - In transit</span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col gap-1 opacity-50">
                <div className="flex items-center gap-1.5 text-[#5a4136] text-xs font-semibold">
                  <span className="material-symbols-outlined text-base">qr_code_2</span>
                  <span>Delivered</span>
                </div>
                <span className="text-[11px] text-[#5a4136]">Est. 12:45 PM</span>
              </div>
            </div>
          </div>

          {/* Delivery Partner Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e2e1] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                alt="Courier Michael Rodriguez"
                src={DRIVER_AVATAR_URL}
                className="w-16 h-16 rounded-full object-cover shadow-sm border border-[#e5e2e1]"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[#1b1c1c] font-display">
                    {activeOrder.courierName || 'Michael Rodriguez'}
                  </span>
                  <span className="bg-[#ece0d9] text-[#201b17] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs text-amber-600 fill-1">
                      star
                    </span>
                    <span>{activeOrder.courierRating || '4.9'}</span>
                  </span>
                </div>
                <p className="text-xs text-[#5a4136]">Your Delivery Partner • 1,420 deliveries</p>
                <p className="text-xs text-[#b6171e] font-semibold mt-0.5">
                  {activeOrder.courierVehicle || 'Driving Electric Scooter (Plate: NY-9923)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowCallModal(true)}
                className="flex-1 md:flex-initial px-5 py-2.5 bg-[#f0eded] hover:bg-[#eae7e7] text-[#1b1c1c] rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[#a04100] text-base">call</span>
                <span>Call Driver</span>
              </button>
              <button
                onClick={() => setShowMessageModal(true)}
                className="flex-1 md:flex-initial px-5 py-2.5 bg-[#a04100] hover:bg-[#ff6b00] active:scale-95 text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Tip, Order Summary & Help (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Driver Tip Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e2e1] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1b1c1c] font-display">
                Tip Your Delivery Partner
              </h3>
              <span className="material-symbols-outlined text-[#a04100] text-base fill-1">
                favorite
              </span>
            </div>
            <p className="text-xs text-[#5a4136] leading-relaxed">
              100% of the tip goes directly to Michael. Show appreciation for fast delivery!
            </p>

            <div className="grid grid-cols-4 gap-2 mt-1">
              {[2, 3, 5].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleTipSelect(amount)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
                    selectedTip === amount && !showCustomTipInput
                      ? 'bg-[#ff6b00] text-white shadow-sm'
                      : 'bg-[#f6f3f2] hover:bg-[#f0eded] text-[#1b1c1c]'
                  }`}
                >
                  ${amount}
                </button>
              ))}

              <button
                onClick={() => setShowCustomTipInput(!showCustomTipInput)}
                className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  showCustomTipInput
                    ? 'bg-[#ff6b00] text-white'
                    : 'bg-[#f6f3f2] hover:bg-[#f0eded] text-[#1b1c1c]'
                }`}
              >
                Custom
              </button>
            </div>

            {showCustomTipInput && (
              <form onSubmit={handleCustomTipSubmit} className="flex gap-2 mt-2">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="Enter tip $"
                  value={customTipValue}
                  onChange={(e) => setCustomTipValue(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#a04100]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#a04100] text-white rounded-xl text-xs font-bold"
                >
                  Add Tip
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Breakdown Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e2e1] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eded]">
              <h3 className="font-bold text-sm text-[#1b1c1c] font-display">Order Summary</h3>
              <span className="text-xs text-[#5a4136]">{activeOrder.restaurantName}</span>
            </div>

            <div className="flex flex-col gap-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-[#f0eded] flex items-center justify-center text-[10px] font-bold text-[#1b1c1c] shrink-0">
                      {item.quantity}x
                    </span>
                    <div>
                      <p className="font-semibold text-[#1b1c1c]">{item.menuItem.name}</p>
                      {item.notes && (
                        <p className="text-[10px] text-[#5a4136] leading-tight">{item.notes}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[#1b1c1c] font-semibold shrink-0">
                    {formatCurrency(item.menuItem.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial breakdown */}
            <div className="pt-3 border-t border-[#f0eded] flex flex-col gap-1.5 text-xs text-[#5a4136]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">{formatCurrency(activeOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee (1.8 mi)</span>
                <span className="font-mono">{formatCurrency(activeOrder.deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service &amp; Regulatory Fees</span>
                <span className="font-mono">{formatCurrency(activeOrder.taxes)}</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-[#b6171e] font-medium">
                  <span>Promo Discount ({activeOrder.couponCode || 'PROMO'})</span>
                  <span className="font-mono">-{formatCurrency(activeOrder.discount)}</span>
                </div>
              )}
              {selectedTip > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Courier Tip</span>
                  <span className="font-mono">+{formatCurrency(selectedTip)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#1b1c1c] pt-2 border-t border-[#e5e2e1]">
                <span>Total Paid</span>
                <span className="text-[#a04100] font-mono">
                  {formatCurrency(activeOrder.total + (selectedTip - (activeOrder.tip || 0)))}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#5a4136] mt-1">
                <span className="material-symbols-outlined text-xs">credit_card</span>
                <span>Visa ending in 4821</span>
              </div>
            </div>
          </div>

          {/* Need help support card */}
          <div className="bg-[#f6f3f2] rounded-2xl p-5 shadow-sm border border-[#e5e2e1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#a04100] shadow-sm">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#1b1c1c]">Need help?</h4>
                <p className="text-[11px] text-[#5a4136]">Report issue or contact support</p>
              </div>
            </div>
            <button
              onClick={() => showToast('Connecting to 24/7 CIBUSGO Support Concierge...', 'info')}
              className="px-4 py-2 bg-white hover:bg-[#f0eded] text-[#1b1c1c] rounded-full text-xs font-bold transition-colors shadow-sm"
            >
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
