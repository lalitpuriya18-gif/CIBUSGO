import React from 'react';
import { LOGO_URL } from '../data/mockData.ts';
import { useApp } from '../context/AppContext.tsx';

export const Footer: React.FC = () => {
  const { setCurrentScreen, showToast } = useApp();

  return (
    <footer className="w-full bg-[#f6f3f2] py-10 mt-12 border-t border-[#e5e2e1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand column */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img alt="CIBUSGO Logo" className="h-6 w-auto object-contain" src={LOGO_URL} />
            <span className="font-bold text-lg text-[#1b1c1c] font-display">CIBUSGO</span>
          </div>
          <p className="text-xs text-[#5a4136] leading-relaxed max-w-xs">
            Delicious food delivered fast to your doorstep. Experience the best local restaurants
            with just a few clicks.
          </p>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#1b1c1c]">Company</span>
          <button
            onClick={() => showToast('CIBUSGO - Founded in NYC to bring hot, fresh meals to your door.')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => showToast('Careers: We are hiring frontend and delivery engineers in NY!')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            Careers
          </button>
          <button
            onClick={() => showToast('Press inquiries: press@cibusgo.com')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            Press
          </button>
          <button
            onClick={() => setCurrentScreen('offers')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            Offers & Deals
          </button>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#1b1c1c]">Support</span>
          <button
            onClick={() => showToast('24/7 Live Support available at support@cibusgo.com or 1-800-CIBUS-GO')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            Help Center
          </button>
          <button
            onClick={() => showToast('Safety Center: 100% contactless delivery and tamper-evident packaging.')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            Safety Center
          </button>
          <button
            onClick={() => showToast('Partner With Us: Grow your restaurant business with CIBUSGO delivery network.')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            Partner With Us
          </button>
          <button
            onClick={() => showToast('Accessibility: WCAG AA compliant navigation and screen reader support.')}
            className="text-left text-xs text-[#5a4136] hover:text-[#1b1c1c] transition-colors"
          >
            Accessibility
          </button>
        </div>

        {/* Get the App */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#1b1c1c]">Get the App</span>
          <p className="text-xs text-[#5a4136]">
            Download our mobile app for exclusive deals and faster ordering.
          </p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => showToast('CIBUSGO iOS App is available on the App Store!')}
              className="px-4 py-2 bg-[#1b1c1c] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">phone_iphone</span>
              <span>App Store</span>
            </button>
            <button
              onClick={() => showToast('CIBUSGO Android App is available on Google Play!')}
              className="px-4 py-2 bg-[#1b1c1c] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">shop</span>
              <span>Google Play</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#e5e2e1] text-center text-xs text-[#5a4136]">
        © 2024 CIBUSGO Technologies Inc. All rights reserved.
      </div>
    </footer>
  );
};
