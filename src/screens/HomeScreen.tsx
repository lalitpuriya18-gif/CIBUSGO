import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  HERO_COLLAGE,
  CUISINES,
  RESTAURANTS,
  BESTSELLERS,
  TESTIMONIALS,
} from '../data/mockData.ts';
import { formatCurrency } from '../utils/cartCalculations.ts';
import type { Restaurant } from '../types/index.ts';

export const HomeScreen: React.FC = () => {
  const {
    setCurrentScreen,
    setSelectedRestaurantId,
    addToCart,
    setSelectedCuisineFilter,
    deliveryLocation,
    setDeliveryLocation,
    searchQuery,
    setSearchQuery,
    applyCouponCode,
    favorites,
    toggleFavorite,
  } = useApp();

  const [heroSearchInput, setHeroSearchInput] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setSearchQuery(heroSearchInput.trim());
      setCurrentScreen('restaurants');
    } else {
      setCurrentScreen('restaurants');
    }
  };

  const handleCuisineClick = (cuisineName: string) => {
    setSelectedCuisineFilter(cuisineName);
    setCurrentScreen('restaurants');
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurantId(restaurant.id);
    setCurrentScreen('restaurant-details');
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ffdbcc]/40 via-[#fcf9f8] to-[#f0eded] py-12 lg:py-16 px-4 sm:px-6 lg:px-16 border-b border-[#e5e2e1]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="flex flex-col gap-4 lg:col-span-6 z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#a04100]/10 text-[#a04100] px-3.5 py-1.5 rounded-full w-fit text-xs font-bold tracking-wide">
              <span className="material-symbols-outlined text-base fill-1 text-[#ff6b00]">
                local_fire_department
              </span>
              <span>Fastest delivery in New York</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1c1c] tracking-tight font-display leading-[1.15]">
              Cravings? We've Got You Covered!
            </h1>

            <p className="text-sm sm:text-base text-[#5a4136] max-w-lg leading-relaxed">
              Discover delicious food from the best restaurants near you, delivered piping hot to
              your doorstep in minutes.
            </p>

            {/* Search Bar Box */}
            <form
              onSubmit={handleHeroSearch}
              className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 mt-2 border border-[#e5e2e1]"
            >
              <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-[#e5e2e1]">
                <span className="material-symbols-outlined text-[#a04100] text-lg fill-1">
                  location_on
                </span>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="bg-transparent text-[#1b1c1c] text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="New York, Manhattan">New York, Manhattan</option>
                  <option value="Brooklyn, NY">Brooklyn, NY</option>
                  <option value="Queens, NY">Queens, NY</option>
                </select>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 flex-1 w-full">
                <span className="material-symbols-outlined text-[#5a4136] text-lg">search</span>
                <input
                  value={heroSearchInput}
                  onChange={(e) => setHeroSearchInput(e.target.value)}
                  className="bg-transparent w-full text-[#1b1c1c] placeholder:text-[#5a4136] text-xs focus:outline-none"
                  placeholder="Search for dishes, restaurants, or cuisines..."
                  type="text"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#a04100] hover:bg-[#ff6b00] active:scale-95 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#a04100]/20"
              >
                <span>Search</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>

            <div className="flex items-center gap-6 mt-3 text-[#5a4136] text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#a04100] text-base fill-1">
                  check_circle
                </span>
                <span>No Minimum Order</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#a04100] text-base fill-1">
                  check_circle
                </span>
                <span>Live Order Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Hero Collage Visual */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#a04100]/20 to-[#da3433]/20 rounded-full blur-3xl -z-10"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div
                  onClick={() => handleRestaurantClick(RESTAURANTS[0])}
                  className="overflow-hidden rounded-2xl shadow-xl h-60 cursor-pointer transform hover:scale-[1.03] transition-transform duration-300 relative group"
                >
                  <img
                    className="w-full h-full object-cover group-hover:brightness-105 transition-all"
                    alt="A juicy gourmet cheeseburger"
                    src={HERO_COLLAGE.burger}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                    <span className="text-white text-xs font-bold font-display">
                      Burger & Co. Artisan
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => handleRestaurantClick(RESTAURANTS[2])}
                  className="overflow-hidden rounded-2xl shadow-xl h-40 cursor-pointer transform hover:scale-[1.03] transition-transform duration-300 relative group"
                >
                  <img
                    className="w-full h-full object-cover group-hover:brightness-105 transition-all"
                    alt="Authentic aromatic Indian chicken biryani"
                    src={HERO_COLLAGE.biryani}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                    <span className="text-white text-xs font-bold font-display">
                      Taj Spice & Biryani
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div
                  onClick={() => handleRestaurantClick(RESTAURANTS[1])}
                  className="overflow-hidden rounded-2xl shadow-xl h-40 cursor-pointer transform hover:scale-[1.03] transition-transform duration-300 relative group"
                >
                  <img
                    className="w-full h-full object-cover group-hover:brightness-105 transition-all"
                    alt="Freshly baked artisan pepperoni pizza"
                    src={HERO_COLLAGE.pizza}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                    <span className="text-white text-xs font-bold font-display">
                      Trattoria Bella Napoli
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => handleRestaurantClick(RESTAURANTS[5])}
                  className="overflow-hidden rounded-2xl shadow-xl h-60 cursor-pointer transform hover:scale-[1.03] transition-transform duration-300 relative group"
                >
                  <img
                    className="w-full h-full object-cover group-hover:brightness-105 transition-all"
                    alt="Assorted colorful decadent desserts"
                    src={HERO_COLLAGE.desserts}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                    <span className="text-white text-xs font-bold font-display">
                      Sweet Paris Bakery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Cuisine Categories Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[#a04100] text-xs font-bold uppercase tracking-wider block">
              Cuisines
            </span>
            <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">What's on your mind?</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentScreen('restaurants')}
              className="p-2 rounded-full bg-[#f0eded] hover:bg-[#eae7e7] transition-colors text-[#1b1c1c]"
              aria-label="Previous cuisine"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button
              onClick={() => setCurrentScreen('restaurants')}
              className="p-2 rounded-full bg-[#f0eded] hover:bg-[#eae7e7] transition-colors text-[#1b1c1c]"
              aria-label="Next cuisine"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {CUISINES.map((cuisine) => (
            <button
              key={cuisine.id}
              onClick={() => handleCuisineClick(cuisine.name)}
              className="group flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-[#e5e2e1]/60 text-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 shadow-inner ring-2 ring-transparent group-hover:ring-[#a04100] transition-all">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  alt={cuisine.name}
                  src={cuisine.image}
                />
              </div>
              <span className="font-bold text-xs text-[#1b1c1c] group-hover:text-[#a04100] transition-colors font-display">
                {cuisine.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Special Offers & Discounts Section */}
      <section className="py-12 bg-[#f6f3f2] my-4 border-y border-[#e5e2e1]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-[#a04100] text-xs font-bold uppercase tracking-wider block">
                Promotions
              </span>
              <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">
                Special Offers &amp; Discounts
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Banner 1 */}
            <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-[#a04100] to-[#ff6b00] text-white shadow-xl flex flex-col justify-between h-64">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              <div className="z-10">
                <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Limited Time
                </span>
                <h3 className="text-3xl font-extrabold mt-3 font-display">50% OFF</h3>
                <p className="text-xs text-white/90 mt-1 max-w-xs leading-relaxed">
                  Up to $100 on your first 3 orders from top-rated restaurants.
                </p>
              </div>
              <div className="z-10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider uppercase bg-black/20 px-3 py-1 rounded-lg">
                  Code: WELCOME50
                </span>
                <button
                  onClick={() => {
                    applyCouponCode('WELCOME50');
                    setCurrentScreen('checkout');
                  }}
                  className="bg-white text-[#1b1c1c] hover:bg-[#fcf9f8] px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Claim Now
                </button>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-[#b6171e] to-[#da3433] text-white shadow-xl flex flex-col justify-between h-64">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              <div className="z-10">
                <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Free Delivery
                </span>
                <h3 className="text-3xl font-extrabold mt-3 font-display">$0 Delivery Fee</h3>
                <p className="text-xs text-white/90 mt-1 max-w-xs leading-relaxed">
                  On all orders above $15 from participating local partners.
                </p>
              </div>
              <div className="z-10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider uppercase bg-black/20 px-3 py-1 rounded-lg">
                  Auto-Applied
                </span>
                <button
                  onClick={() => {
                    applyCouponCode('ZERODEL');
                    setCurrentScreen('restaurants');
                  }}
                  className="bg-white text-[#1b1c1c] hover:bg-[#fcf9f8] px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Order Now
                </button>
              </div>
            </div>

            {/* Banner 3 */}
            <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-[#655d58] to-[#36302b] text-white shadow-xl flex flex-col justify-between h-64">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              <div className="z-10">
                <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Weekend Treat
                </span>
                <h3 className="text-3xl font-extrabold mt-3 font-display">Buy 1 Get 1 Free</h3>
                <p className="text-xs text-white/90 mt-1 max-w-xs leading-relaxed">
                  Applicable on selected beverages, burgers, and desserts.
                </p>
              </div>
              <div className="z-10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider uppercase bg-black/20 px-3 py-1 rounded-lg">
                  Code: BOGOFEAST
                </span>
                <button
                  onClick={() => {
                    applyCouponCode('BOGOFEAST');
                    setCurrentScreen('offers');
                  }}
                  className="bg-white text-[#1b1c1c] hover:bg-[#fcf9f8] px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Restaurants Near You Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[#a04100] text-xs font-bold uppercase tracking-wider block">
              Nearby
            </span>
            <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">
              Popular Restaurants Near You
            </h2>
          </div>
          <button
            onClick={() => setCurrentScreen('restaurants')}
            className="text-[#a04100] text-xs font-bold hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESTAURANTS.slice(0, 6).map((restaurant) => {
            const isFav = favorites.includes(restaurant.id);
            return (
              <div
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer border border-[#e5e2e1]/60"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={restaurant.name}
                    src={restaurant.image}
                  />
                  {restaurant.discountTag && (
                    <div
                      className={`absolute top-3 left-3 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm ${
                        restaurant.discountTag.includes('Free')
                          ? 'bg-[#b6171e]'
                          : 'bg-[#a04100]'
                      }`}
                    >
                      {restaurant.discountTag}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(restaurant.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-[#1b1c1c] transition-colors shadow-sm"
                    aria-label={`Favorite ${restaurant.name}`}
                  >
                    <span
                      className={`material-symbols-outlined text-sm ${
                        isFav ? 'text-[#b6171e] fill-1' : 'text-[#1b1c1c]'
                      }`}
                    >
                      favorite
                    </span>
                  </button>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[#1b1c1c] text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[#a04100] text-sm fill-1">
                      schedule
                    </span>
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-base text-[#1b1c1c] group-hover:text-[#a04100] transition-colors font-display">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-[#f0eded] px-2 py-0.5 rounded-lg text-[#1b1c1c] text-xs font-bold">
                        <span className="material-symbols-outlined text-amber-500 text-sm fill-1">
                          star
                        </span>
                        <span>{restaurant.rating}</span>
                      </div>
                    </div>
                    <p className="text-[#5a4136] text-xs truncate">
                      {restaurant.cuisines.join(', ')}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#f0eded] flex items-center justify-between text-xs text-[#5a4136]">
                    <span>
                      {restaurant.deliveryFee === 0
                        ? 'Free Delivery'
                        : `Delivery ${formatCurrency(restaurant.deliveryFee)}`}
                    </span>
                    <span className="text-[#a04100] font-bold">{restaurant.priceLevel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Trending Dishes & Bestsellers Section */}
      <section className="py-12 bg-[#f6f3f2] my-4 border-y border-[#e5e2e1]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-[#a04100] text-xs font-bold uppercase tracking-wider block">
                Bestsellers
              </span>
              <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">
                Trending Dishes Right Now
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BESTSELLERS.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#e5e2e1]/60"
              >
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                    <img className="w-full h-full object-cover" alt={dish.name} src={dish.image} />
                    {dish.popularTag && (
                      <span
                        className={`absolute top-2 left-2 text-white text-[10px] px-2.5 py-0.5 rounded-md font-bold ${
                          dish.popularTag.includes('#1')
                            ? 'bg-[#b6171e]'
                            : 'bg-[#a04100]'
                        }`}
                      >
                        {dish.popularTag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#1b1c1c] font-display">{dish.name}</h4>
                    <span className="font-bold text-sm text-[#a04100] font-mono">
                      {formatCurrency(dish.price)}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a4136]">{dish.restaurantName}</p>
                </div>

                <button
                  onClick={() => addToCart(dish, 1)}
                  className="mt-4 w-full bg-[#a04100]/10 hover:bg-[#a04100] text-[#a04100] hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews & Testimonials Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto w-full mb-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#a04100] text-xs font-bold uppercase tracking-wider block">
            Testimonials
          </span>
          <h2 className="text-2xl font-bold text-[#1b1c1c] mt-1 font-display">
            Loved by Thousands of Foodies
          </h2>
          <p className="text-[#5a4136] text-xs sm:text-sm mt-1 leading-relaxed">
            Here is what our customers have to say about their lightning-fast delivery and
            mouthwatering meals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-[#e5e2e1]/60 flex flex-col justify-between relative"
            >
              <span className="absolute top-4 right-6 text-5xl text-[#a04100]/10 font-serif select-none">
                “
              </span>
              <div>
                <div className="flex items-center gap-0.5 mb-3 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base fill-1">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#1b1c1c] italic mb-6 leading-relaxed">
                  {t.comment}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#f0eded]">
                <img
                  className="w-11 h-11 rounded-full object-cover"
                  alt={t.name}
                  src={t.avatar}
                />
                <div>
                  <h4 className="font-bold text-xs text-[#1b1c1c] font-display">{t.name}</h4>
                  <p className="text-[11px] text-[#5a4136]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
