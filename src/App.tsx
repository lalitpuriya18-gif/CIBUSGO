/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingCart } from './components/FloatingCart.tsx';
import { Modals } from './components/Modals.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';

import { HomeScreen } from './screens/HomeScreen.tsx';
import { RestaurantsScreen } from './screens/RestaurantsScreen.tsx';
import { RestaurantDetailsScreen } from './screens/RestaurantDetailsScreen.tsx';
import { CheckoutScreen } from './screens/CheckoutScreen.tsx';
import { LiveTrackingScreen } from './screens/LiveTrackingScreen.tsx';
import { ProfileScreen } from './screens/ProfileScreen.tsx';
import { OffersScreen } from './screens/OffersScreen.tsx';

const MainContent: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <main className="w-full pt-20 bg-[#fcf9f8] min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div className="flex-1 w-full">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'restaurants' && <RestaurantsScreen />}
        {currentScreen === 'restaurant-details' && <RestaurantDetailsScreen />}
        {currentScreen === 'checkout' && <CheckoutScreen />}
        {currentScreen === 'live-tracking' && <LiveTrackingScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
        {currentScreen === 'offers' && <OffersScreen />}
        {currentScreen === 'favorites' && <RestaurantsScreen />}
      </div>
      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#fcf9f8] text-[#1b1c1c] flex flex-col">
        <Navbar />
        <MainContent />
        <FloatingCart />
        <Modals />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
