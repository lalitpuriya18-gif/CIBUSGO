import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatCurrency } from '../utils/cartCalculations.ts';
import type { MenuItem } from '../types/index.ts';

export const RestaurantDetailsScreen: React.FC = () => {
  const {
    currentRestaurant,
    setCurrentScreen,
    cartItems,
    addToCart,
    updateCartQuantity,
    cartSubtotal,
    cartDeliveryFee,
    cartTax,
    cartTotal,
    totalCartItemCount,
    favorites,
    toggleFavorite,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('Recommended');
  const [menuSearch, setMenuSearch] = useState<string>('');

  const isFavorite = favorites.includes(currentRestaurant.id);

  const categories = [
    'Recommended',
    'Signature Burgers',
    'Crispy Fries',
    'Artisanal Drinks',
    'Combos & Meals',
    'Desserts',
  ];

  // Group items by category
  const menuItems = currentRestaurant.menu || [];

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      menuSearch === '' ||
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesSearch;
  });

  const getItemsByCategory = (cat: string) => {
    return filteredMenuItems.filter(
      (item) => item.category.toLowerCase() === cat.toLowerCase()
    );
  };

  const getItemQuantityInCart = (itemId: string) => {
    const found = cartItems.find((i) => i.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentRestaurant.name,
        text: `Order from ${currentRestaurant.name} on CIBUSGO!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Restaurant link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* 1. Hero Cover Banner */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-[#1b1c1c]">
        <img
          alt={currentRestaurant.name}
          src={currentRestaurant.coverImage || currentRestaurant.image}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30"></div>

        {/* Top Floating Badges & Back Button */}
        <div className="absolute top-4 left-4 sm:left-8 z-10">
          <button
            onClick={() => setCurrentScreen('restaurants')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-[#1b1c1c] rounded-full text-xs font-bold backdrop-blur-md transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Restaurants</span>
          </button>
        </div>

        {/* Favorite & Share buttons top right */}
        <div className="absolute top-4 right-4 sm:right-8 z-10 flex gap-2">
          <button
            onClick={() => toggleFavorite(currentRestaurant.id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/90 hover:bg-white text-[#1b1c1c] rounded-full text-xs font-bold backdrop-blur-md transition-all shadow-md"
          >
            <span
              className={`material-symbols-outlined text-base ${
                isFavorite ? 'text-[#b6171e] fill-1' : ''
              }`}
            >
              favorite
            </span>
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/90 hover:bg-white text-[#1b1c1c] rounded-full text-xs font-bold backdrop-blur-md transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span>Share</span>
          </button>
        </div>

        {/* Restaurant Header Information inside Hero */}
        <div className="absolute bottom-6 left-4 sm:left-8 lg:left-16 right-4 sm:right-8 z-10 flex items-end gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shadow-xl shrink-0 overflow-hidden border-2 border-white">
            <img
              alt="Logo"
              src={currentRestaurant.image}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#ff6b00] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Free Delivery
              </span>
              <span className="text-white/80 text-xs">{currentRestaurant.cuisines.join(' • ')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display">
              {currentRestaurant.name}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Restaurant Metadata Strip */}
      <div className="w-full bg-[#f6f3f2] border-b border-[#e5e2e1]/70 py-3.5 px-4 sm:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#5a4136]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1 font-bold text-[#1b1c1c]">
              <span className="material-symbols-outlined text-amber-500 text-base fill-1">star</span>
              <span>{currentRestaurant.rating}</span>
              <span className="font-normal text-[#5a4136]">
                ({currentRestaurant.ratingCount.toLocaleString()} ratings)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#a04100] text-base">schedule</span>
              <span>
                {currentRestaurant.deliveryTime} • {currentRestaurant.distance}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-emerald-600 text-base fill-1">
                radio_button_checked
              </span>
              <span className="font-medium text-[#1b1c1c]">
                Open now • Closes at {currentRestaurant.closingTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#a04100] text-base">payments</span>
              <span>{currentRestaurant.priceLevel} • Casual Dining</span>
            </div>
          </div>

          {/* Search menu input */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 material-symbols-outlined text-[#5a4136] text-base">
              search
            </span>
            <input
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="Search menu..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#e5e2e1] rounded-full text-xs text-[#1b1c1c] focus:outline-none focus:ring-1 focus:ring-[#a04100]"
            />
          </div>
        </div>
      </div>

      {/* 3. Category Tabs Bar */}
      <div className="sticky top-20 z-30 bg-[#fcf9f8]/95 backdrop-blur-md border-b border-[#e5e2e1] px-4 sm:px-6 lg:px-16 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'bg-[#f0eded] text-[#5a4136] hover:bg-[#eae7e7] hover:text-[#1b1c1c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Menu Items Grid & Sticky Cart Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 w-full grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        {/* Left Column (70%): Menu Categories */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* Active Category Sections */}
          {['Recommended', 'Signature Burgers', 'Crispy Fries'].map((cat) => {
            const items = getItemsByCategory(cat);
            if (items.length === 0) return null;

            return (
              <div key={cat} className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#e5e2e1]">
                  <h2 className="text-xl font-bold text-[#1b1c1c] font-display">{cat}</h2>
                  <span className="text-xs text-[#5a4136]">
                    {cat === 'Recommended' ? 'Most ordered by locals' : 'Handcrafted perfection'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => {
                    const inCartQty = getItemQuantityInCart(item.id);

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-4 border border-[#e5e2e1] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4 items-start mb-3">
                          <div className="flex-1 min-w-0">
                            {item.popularTag && (
                              <span className="inline-block text-[10px] font-bold text-[#a04100] bg-[#ffdbcc] px-2 py-0.5 rounded mb-1">
                                {item.popularTag}
                              </span>
                            )}
                            <h3 className="font-bold text-sm text-[#1b1c1c] font-display">
                              {item.name}
                            </h3>
                            <p className="text-xs text-[#5a4136] mt-1 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                            <span className="inline-block text-sm font-bold text-[#1b1c1c] font-mono mt-2">
                              {formatCurrency(item.price)}
                            </span>
                          </div>

                          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-inner">
                            <img
                              alt={item.name}
                              src={item.image}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Action: Add to Cart or Stepper */}
                        {inCartQty > 0 ? (
                          <div className="flex items-center justify-between bg-[#f6f3f2] rounded-xl p-1 mt-2">
                            <span className="text-xs text-[#5a4136] px-2">In Cart</span>
                            <div className="flex items-center bg-white rounded-lg shadow-sm border border-[#e5e2e1]">
                              <button
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="p-1 hover:text-[#a04100] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <span className="material-symbols-outlined text-sm">remove</span>
                              </button>
                              <span className="px-2 font-bold text-xs font-mono">{inCartQty}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="p-1 hover:text-[#a04100] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <span className="material-symbols-outlined text-sm">add</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item, 1)}
                            className="w-full py-2 bg-[#a04100] hover:bg-[#ff6b00] active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 mt-2"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (30%): Sticky Cart Summary */}
        <div className="lg:col-span-3 sticky top-36">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-[#e5e2e1] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eded]">
              <h3 className="font-bold text-base text-[#1b1c1c] font-display">Your Cart</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#f0eded] text-[11px] font-bold text-[#a04100]">
                {totalCartItemCount} items
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-[#cfc4be]">
                  shopping_cart
                </span>
                <p className="text-xs text-[#5a4136] mt-2">Your cart is currently empty.</p>
                <p className="text-[11px] text-[#8e7164]">Add some delicious items from the menu!</p>
              </div>
            ) : (
              <>
                {/* Items in cart list */}
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.menuItem.id} className="flex justify-between items-center text-xs">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="font-semibold text-[#1b1c1c] truncate">{item.menuItem.name}</p>
                        <p className="font-mono text-[#5a4136] text-[11px]">
                          {formatCurrency(item.menuItem.price)}
                        </p>
                      </div>

                      <div className="flex items-center bg-[#f0eded] rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.menuItem.id, -1)}
                          className="p-1 hover:text-[#a04100]"
                        >
                          <span className="material-symbols-outlined text-xs">remove</span>
                        </button>
                        <span className="px-1.5 font-bold text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.menuItem.id, 1)}
                          className="p-1 hover:text-[#a04100]"
                        >
                          <span className="material-symbols-outlined text-xs">add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Totals */}
                <div className="pt-3 border-t border-[#f0eded] flex flex-col gap-1.5 text-xs text-[#5a4136]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#1b1c1c] font-medium">
                      {formatCurrency(cartSubtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-[#a04100] font-medium">
                      {cartDeliveryFee === 0 ? 'Free' : formatCurrency(cartDeliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-mono">{formatCurrency(cartTax)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1b1c1c] pt-2 border-t border-[#e5e2e1]">
                    <span>Total</span>
                    <span className="text-[#a04100] font-mono">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => setCurrentScreen('checkout')}
                  className="w-full py-3 bg-[#a04100] hover:bg-[#ff6b00] active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>View Cart &amp; Checkout</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5. Customer Reviews & Ratings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-12 w-full border-t border-[#e5e2e1]/70">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1b1c1c] font-display">
              Customer Reviews &amp; Ratings
            </h2>
            <p className="text-xs sm:text-sm text-[#5a4136] mt-0.5">
              Real feedback from verified CIBUSGO food lovers
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-[#e5e2e1]">
            <span className="text-2xl font-bold text-[#1b1c1c] font-display">4.8</span>
            <div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm fill-1">
                    star
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-[#5a4136]">Based on 1,420 reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffdbcc] text-[#351000] flex items-center justify-center font-bold text-xs">
                    JM
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1b1c1c]">Jessica Miller</h4>
                    <span className="text-[10px] text-[#8e7164]">2 days ago</span>
                  </div>
                </div>
                <div className="flex text-amber-500 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-[#5a4136] leading-relaxed">
                "The Truffle Master is genuinely one of the best burgers I've ever had delivered!
                Arrived piping hot and the fries were still crispy. Highly recommended!"
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#f0eded] text-[#1b1c1c] flex items-center justify-center font-bold text-xs">
                    MV
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1b1c1c]">Marcus Vance</h4>
                    <span className="text-[10px] text-[#8e7164]">1 week ago</span>
                  </div>
                </div>
                <div className="flex text-amber-500 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-[#5a4136] leading-relaxed">
                "Super fast delivery and incredible packaging. The burger didn't fall apart at all
                and the truffle parmesan fries are addictive."
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#b6171e] flex items-center justify-center font-bold text-xs">
                    SJ
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1b1c1c]">Sarah Jenkins</h4>
                    <span className="text-[10px] text-[#8e7164]">2 weeks ago</span>
                  </div>
                </div>
                <div className="flex text-amber-500 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-[#5a4136] leading-relaxed">
                "Amazing quality! You can really taste the premium Angus beef. Burger &amp; Co. is
                my new go-to weekend treat."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
