import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { DRIVER_AVATAR_URL, LOGO_URL } from '../data/mockData.ts';
import { formatCurrency } from '../utils/cartCalculations.ts';

export const Modals: React.FC = () => {
  const {
    showAddressModal,
    setShowAddressModal,
    addAddress,
    showPaymentModal,
    setShowPaymentModal,
    addPaymentMethod,
    showCallModal,
    setShowCallModal,
    showMessageModal,
    setShowMessageModal,
    receiptModalOrder,
    setReceiptModalOrder,
    rateModalOrder,
    setRateModalOrder,
    showGoldModal,
    setShowGoldModal,
    activeOrder,
    showToast,
  } = useApp();

  // Address form state
  const [addressLabel, setAddressLabel] = useState('Home');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('New York, NY 10001');

  // Payment form state
  const [cardHolder, setCardHolder] = useState('Anna Martinez');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9821');
  const [cardExpiry, setCardExpiry] = useState('09/27');

  // Driver Call state
  const [callStatus, setCallStatus] = useState<'ringing' | 'connected'>('connected');
  const [isMuted, setIsMuted] = useState(false);

  // Driver Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'driver'; text: string; time: string }>>([
    {
      sender: 'driver',
      text: "Hi Anna! I've picked up your order from Burger & Co. Artisan and I'm en route on 23rd St.",
      time: '12:33 PM',
    },
    {
      sender: 'user',
      text: 'Great, thanks Michael! Please ring the doorbell when you arrive.',
      time: '12:35 PM',
    },
    {
      sender: 'driver',
      text: 'Will do! Estimated arrival is 4 mins.',
      time: '12:36 PM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Rating modal state
  const [starRating, setStarRating] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Piping Hot', 'Fast Delivery']);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = {
      sender: 'user' as const,
      text: inputMessage.trim(),
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'driver',
          text: 'Got it, thank you! See you shortly.',
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressStreet.trim()) {
      showToast('Please enter a street address', 'error');
      return;
    }
    addAddress({
      label: addressLabel,
      fullAddress: `${addressStreet.trim()}, ${addressCity.trim()}`,
      isDefault: false,
    });
    setAddressStreet('');
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = cardNumber.slice(-4) || '9821';
    addPaymentMethod({
      type: 'card',
      title: 'Credit / Debit Card',
      subtitle: `Mastercard ending in ${last4}`,
      isDefault: false,
    });
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Thanks for rating 5 stars! Driver and restaurant notified.`, 'success');
    setRateModalOrder(null);
  };

  const toggleRatingTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      {/* 1. Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#e5e2e1] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0eded]">
              <div className="flex items-center gap-2 text-[#a04100]">
                <span className="material-symbols-outlined fill-1">location_on</span>
                <h3 className="font-bold text-lg text-[#1b1c1c] font-display">Add Delivery Address</h3>
              </div>
              <button
                onClick={() => setShowAddressModal(false)}
                className="p-1 rounded-full text-[#5a4136] hover:bg-[#f0eded]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[#5a4136] mb-1 block">Label</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Home', 'Work', 'Other'].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setAddressLabel(lbl)}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        addressLabel === lbl
                          ? 'bg-[#a04100] text-white shadow-sm'
                          : 'bg-[#f0eded] text-[#1b1c1c] hover:bg-[#eae7e7]'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5a4136] mb-1 block">Street Address</label>
                <input
                  required
                  placeholder="e.g. 500 7th Ave, Apt 12B"
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#a04100]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5a4136] mb-1 block">City, State & ZIP</label>
                <input
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#a04100]"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#f0eded] text-[#5a4136] hover:bg-[#eae7e7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#a04100] text-white hover:bg-[#ff6b00] shadow-sm"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add Payment Card Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#e5e2e1] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0eded]">
              <div className="flex items-center gap-2 text-[#a04100]">
                <span className="material-symbols-outlined">credit_card</span>
                <h3 className="font-bold text-lg text-[#1b1c1c] font-display">Add Payment Card</h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 rounded-full text-[#5a4136] hover:bg-[#f0eded]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveCard} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[#5a4136] mb-1 block">Cardholder Name</label>
                <input
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#a04100]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5a4136] mb-1 block">Card Number</label>
                <input
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] font-mono focus:outline-none focus:ring-2 focus:ring-[#a04100]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-[#5a4136] mb-1 block">Expiry</label>
                  <input
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] font-mono focus:outline-none focus:ring-2 focus:ring-[#a04100]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5a4136] mb-1 block">CVV</label>
                  <input
                    defaultValue="842"
                    type="password"
                    maxLength={4}
                    className="w-full px-3 py-2 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] font-mono focus:outline-none focus:ring-2 focus:ring-[#a04100]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#f0eded] text-[#5a4136] hover:bg-[#eae7e7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#a04100] text-white hover:bg-[#ff6b00] shadow-sm"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Driver Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1b1c1c] text-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-6">
            <div className="relative">
              <img
                alt="Michael Rodriguez"
                src={DRIVER_AVATAR_URL}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#ff6b00]/40 shadow-xl"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#1b1c1c] flex items-center justify-center">
                <span className="material-symbols-outlined text-xs text-white">call</span>
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold font-display">Michael Rodriguez</h4>
              <p className="text-xs text-[#cfc4be] mt-1">CIBUSGO Courier • Plate NY-9923</p>
              <p className="text-sm text-emerald-400 font-mono mt-2 font-medium">
                {callStatus === 'connected' ? 'Connected • 00:18' : 'Ringing...'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMuted ? 'bg-[#da3433] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-label="Mute microphone"
              >
                <span className="material-symbols-outlined">{isMuted ? 'mic_off' : 'mic'}</span>
              </button>
              <button
                onClick={() => {
                  setShowCallModal(false);
                  showToast('Call ended');
                }}
                className="w-14 h-14 rounded-full bg-[#da3433] hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                aria-label="End phone call"
              >
                <span className="material-symbols-outlined text-2xl">call_end</span>
              </button>
              <button
                onClick={() => showToast('Speakerphone toggled on')}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Speaker"
              >
                <span className="material-symbols-outlined">volume_up</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Driver Chat Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#e5e2e1] flex flex-col h-[520px] overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-[#fcf9f8] border-b border-[#e5e2e1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  alt="Courier Michael"
                  src={DRIVER_AVATAR_URL}
                  className="w-10 h-10 rounded-full object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#1b1c1c] font-display">Michael Rodriguez</h4>
                  <p className="text-[11px] text-[#5a4136]">Courier is 4 mins away</p>
                </div>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="p-1 rounded-full text-[#5a4136] hover:bg-[#f0eded]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Chat message history */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#f6f3f2]/40">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#a04100] text-white rounded-br-none'
                        : 'bg-white text-[#1b1c1c] shadow-sm border border-[#e5e2e1] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#8e7164] mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Quick suggested replies */}
            <div className="px-3 py-2 bg-white border-t border-[#f0eded] flex gap-2 overflow-x-auto scrollbar-none">
              {['Please leave at door', "I'm coming down", 'Please ring doorbell'].map((quick) => (
                <button
                  key={quick}
                  onClick={() => {
                    setChatMessages((prev) => [
                      ...prev,
                      { sender: 'user', text: quick, time: 'Just now' },
                    ]);
                  }}
                  className="px-2.5 py-1 bg-[#f0eded] hover:bg-[#eae7e7] text-[#1b1c1c] text-[11px] rounded-full whitespace-nowrap shrink-0 transition-colors"
                >
                  {quick}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#e5e2e1] flex gap-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message Michael..."
                className="flex-1 px-3 py-2 bg-[#f0eded] rounded-full text-xs text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#a04100]"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#a04100] text-white flex items-center justify-center hover:bg-[#ff6b00] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. View Receipt Modal */}
      {receiptModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#e5e2e1] flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eded]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#a04100] tracking-wider">
                  Official Invoice
                </span>
                <h3 className="font-bold text-lg text-[#1b1c1c] font-display">
                  Order #{receiptModalOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setReceiptModalOrder(null)}
                className="p-1 rounded-full text-[#5a4136] hover:bg-[#f0eded]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-[#5a4136] bg-[#f6f3f2] p-3 rounded-xl">
              <div>
                <p className="font-bold text-[#1b1c1c]">{receiptModalOrder.restaurantName}</p>
                <p>{receiptModalOrder.placedAt}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Paid • Visa
              </span>
            </div>

            {/* Itemized list */}
            <div className="flex flex-col divide-y divide-[#f0eded] text-xs">
              {receiptModalOrder.items.map((item, idx) => (
                <div key={idx} className="py-2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#a04100]">{item.quantity}x</span>
                    <span className="text-[#1b1c1c]">{item.menuItem.name}</span>
                  </div>
                  <span className="font-mono text-[#1b1c1c]">
                    {formatCurrency(item.menuItem.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial breakdown */}
            <div className="pt-3 border-t border-[#f0eded] flex flex-col gap-1.5 text-xs text-[#5a4136]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(receiptModalOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {receiptModalOrder.deliveryFee === 0 ? 'Free' : formatCurrency(receiptModalOrder.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Restaurant Fees</span>
                <span>{formatCurrency(receiptModalOrder.taxes)}</span>
              </div>
              {receiptModalOrder.discount > 0 && (
                <div className="flex justify-between text-[#b6171e] font-semibold">
                  <span>Discount</span>
                  <span>-{formatCurrency(receiptModalOrder.discount)}</span>
                </div>
              )}
              {receiptModalOrder.tip > 0 && (
                <div className="flex justify-between">
                  <span>Courier Tip</span>
                  <span>{formatCurrency(receiptModalOrder.tip)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-[#1b1c1c] pt-2 border-t border-[#e5e2e1]">
                <span>Total Paid</span>
                <span className="text-[#a04100]">{formatCurrency(receiptModalOrder.total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('Receipt printed / downloaded as PDF');
                setReceiptModalOrder(null);
              }}
              className="w-full py-2.5 bg-[#a04100] hover:bg-[#ff6b00] text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print / Download Receipt</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. Rate Order Modal */}
      {rateModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#e5e2e1] flex flex-col gap-4 text-center">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-[#1b1c1c] font-display">
                Rate your meal
              </h3>
              <button
                onClick={() => setRateModalOrder(null)}
                className="p-1 rounded-full text-[#5a4136] hover:bg-[#f0eded]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <p className="text-xs text-[#5a4136]">
              How was your experience from <strong className="text-[#1b1c1c]">{rateModalOrder.restaurantName}</strong>?
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setStarRating(star)}
                  className="text-amber-400 hover:scale-110 transition-transform"
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${
                      star <= starRating ? 'fill-1' : ''
                    }`}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>

            {/* Compliment tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Piping Hot', 'Fast Delivery', 'Great Packaging', 'Generous Portions', 'Fresh Taste'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleRatingTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-[#a04100] text-white shadow-sm'
                      : 'bg-[#f0eded] text-[#1b1c1c] hover:bg-[#eae7e7]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Leave a note for the chef or courier..."
              className="w-full p-3 bg-[#f6f3f2] rounded-xl text-xs text-[#1b1c1c] resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#a04100]"
            />

            <button
              onClick={handleRatingSubmit}
              className="w-full py-2.5 bg-[#a04100] hover:bg-[#ff6b00] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* 7. CIBUSGO Gold VIP Modal */}
      {showGoldModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1b1c1c] text-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-white/10 flex flex-col gap-5 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#a04100]/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 fill-1 text-2xl">
                  workspace_premium
                </span>
                <span className="font-bold text-lg font-display text-white">CIBUSGO Gold VIP</span>
              </div>
              <button
                onClick={() => setShowGoldModal(false)}
                className="p-1 rounded-full text-white/60 hover:text-white"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold font-display text-white leading-tight">
                Unlock 10% Cashback & Unlimited Free Deliveries
              </h3>
              <p className="text-xs text-[#cfc4be] mt-1.5 leading-relaxed">
                Experience dining perks, zero surge charges, and VIP culinary reservations with
                CIBUSGO Gold.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 relative z-10">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="material-symbols-outlined text-amber-400 text-xl">savings</span>
                <div>
                  <h4 className="text-xs font-bold text-white">10% Instant Cashback</h4>
                  <p className="text-[11px] text-[#cfc4be]">Credited immediately to your digital wallet</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="material-symbols-outlined text-[#ff6b00] text-xl">local_shipping</span>
                <div>
                  <h4 className="text-xs font-bold text-white">$0 Unlimited Delivery</h4>
                  <p className="text-[11px] text-[#cfc4be]">On all orders above $10 across NY</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                <span className="material-symbols-outlined text-emerald-400 text-xl">support_agent</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Dedicated Priority Support</h4>
                  <p className="text-[11px] text-[#cfc4be]">Instant 24/7 concierge response</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  showToast('Congratulations! Your 30-day CIBUSGO Gold VIP trial is active!', 'success');
                  setShowGoldModal(false);
                }}
                className="w-full py-3 bg-[#a04100] hover:bg-[#ff6b00] text-white rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95"
              >
                Start 30-Day Free Trial ($9.99/mo after)
              </button>
              <p className="text-[10px] text-center text-[#cfc4be]">
                Cancel anytime with 1 click in your account settings.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
