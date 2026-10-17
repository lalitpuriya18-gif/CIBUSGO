import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { RESTAURANTS } from '../data/mockData.ts';
import { formatCurrency } from '../utils/cartCalculations.ts';

export const RestaurantsScreen: React.FC = () => {
  const {
    setCurrentScreen,
    setSelectedRestaurantId,
    searchQuery,
    setSearchQuery,
    selectedCuisineFilter,
    setSelectedCuisineFilter,
    favorites,
    toggleFavorite,
  } = useApp();

  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'delivery' | 'price_asc' | 'price_desc'>('recommended');
  const [filterRating4Plus, setFilterRating4Plus] = useState(false);
  const [filterFastDelivery, setFilterFastDelivery] = useState(false);
  const [filterPureVeg, setFilterPureVeg] = useState(false);
  const [filterOffers, setFilterOffers] = useState(false);
  const [filterPrice, setFilterPrice] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter & Sort Logic
  const filteredRestaurants = useMemo(() => {
    let result = [...RESTAURANTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
          r.popularItemName.toLowerCase().includes(q)
      );
    }

    // Cuisine filter
    if (selectedCuisineFilter) {
      result = result.filter((r) =>
        r.cuisines.some((c) => c.toLowerCase() === selectedCuisineFilter.toLowerCase())
      );
    }

    // Rating filter
    if (filterRating4Plus) {
      result = result.filter((r) => r.rating >= 4.0);
    }

    // Fast delivery filter (< 30 mins)
    if (filterFastDelivery) {
      result = result.filter((r) => r.deliveryTimeMins < 30);
    }

    // Pure veg filter
    if (filterPureVeg) {
      result = result.filter((r) => r.isPureVeg);
    }

    // Offers & Discounts filter
    if (filterOffers) {
      result = result.filter((r) => !!r.discountTag);
    }

    // Price level filter
    if (filterPrice) {
      result = result.filter((r) => r.priceLevel === filterPrice);
    }

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'delivery') {
      result.sort((a, b) => a.deliveryTimeMins - b.deliveryTimeMins);
    } else if (sortBy === 'price_asc') {
      result.sort((a, b) => a.priceLevel.length - b.priceLevel.length);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.priceLevel.length - a.priceLevel.length);
    }

    return result;
  }, [
    searchQuery,
    selectedCuisineFilter,
    filterRating4Plus,
    filterFastDelivery,
    filterPureVeg,
    filterOffers,
    filterPrice,
    sortBy,
  ]);

  const handleRestaurantClick = (id: string) => {
    setSelectedRestaurantId(id);
    setCurrentScreen('restaurant-details');
  };

  const clearAllFilters = () => {
    setFilterRating4Plus(false);
    setFilterFastDelivery(false);
    setFilterPureVeg(false);
    setFilterOffers(false);
    setFilterPrice(null);
    setSelectedCuisineFilter(null);
    setSearchQuery('');
  };

  const hasActiveFilters =
    filterRating4Plus ||
    filterFastDelivery ||
    filterPureVeg ||
    filterOffers ||
    filterPrice !== null ||
    selectedCuisineFilter !== null ||
    searchQuery !== '';

  return (
    <div className="flex flex-col w-full">
      {/* Sub-header / Filter & Search section */}
      <section className="w-full bg-[#f6f3f2] py-8 border-b border-[#e5e2e1]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          {/* Top row: Results count & sorting */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] font-display">
                {filteredRestaurants.length} restaurants near you
              </h1>
              <p className="text-xs sm:text-sm text-[#5a4136] mt-0.5">
                Explore curated culinary spots, local favorites, and fast-delivering kitchens.
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-[#f0eded] px-3.5 py-1.5 rounded-full w-fit">
              <span className="material-symbols-outlined text-[#5a4136] text-base">sort</span>
              <span className="text-[11px] font-semibold text-[#5a4136]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-[#1b1c1c] focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Rating: High to Low</option>
                <option value="delivery">Fastest Delivery</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active cuisine tag chip if present */}
          {selectedCuisineFilter && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5a4136]">Filtering by cuisine:</span>
              <span className="inline-flex items-center gap-1 bg-[#ffdbcc] text-[#351000] text-xs font-bold px-3 py-1 rounded-full">
                <span>{selectedCuisineFilter}</span>
                <button
                  onClick={() => setSelectedCuisineFilter(null)}
                  className="hover:text-[#a04100]"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            </div>
          )}

          {/* Filter Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={clearAllFilters}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                hasActiveFilters
                  ? 'bg-[#a04100] text-white shadow-sm'
                  : 'bg-[#f0eded] text-[#1b1c1c] hover:bg-[#eae7e7]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>{hasActiveFilters ? 'Reset Filters' : 'All Filters'}</span>
            </button>

            <button
              onClick={() => setFilterRating4Plus(!filterRating4Plus)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 shadow-sm transition-all ${
                filterRating4Plus
                  ? 'bg-[#ffdbcc] text-[#351000] ring-1 ring-[#a04100]'
                  : 'bg-white text-[#1b1c1c] hover:bg-[#f0eded]'
              }`}
            >
              <span className="material-symbols-outlined text-amber-500 text-sm fill-1">star</span>
              <span>Rating 4.0+</span>
            </button>

            <button
              onClick={() => setFilterFastDelivery(!filterFastDelivery)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 shadow-sm transition-all ${
                filterFastDelivery
                  ? 'bg-[#ffdbcc] text-[#351000] ring-1 ring-[#a04100]'
                  : 'bg-white text-[#1b1c1c] hover:bg-[#f0eded]'
              }`}
            >
              <span className="material-symbols-outlined text-[#a04100] text-sm fill-1">bolt</span>
              <span>Fast Delivery (&lt;30m)</span>
            </button>

            <button
              onClick={() => setFilterPureVeg(!filterPureVeg)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 shadow-sm transition-all ${
                filterPureVeg
                  ? 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-500'
                  : 'bg-white text-[#1b1c1c] hover:bg-[#f0eded]'
              }`}
            >
              <span className="material-symbols-outlined text-emerald-600 text-sm fill-1">eco</span>
              <span>Pure Veg</span>
            </button>

            <button
              onClick={() => setFilterOffers(!filterOffers)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 shadow-sm transition-all ${
                filterOffers
                  ? 'bg-[#ffdbcc] text-[#351000] ring-1 ring-[#a04100]'
                  : 'bg-white text-[#1b1c1c] hover:bg-[#f0eded]'
              }`}
            >
              <span className="material-symbols-outlined text-[#a04100] text-sm">local_offer</span>
              <span>Offers &amp; Discounts</span>
            </button>

            <button
              onClick={() => setFilterPrice(filterPrice === '$$' ? null : '$$')}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 shadow-sm transition-all ${
                filterPrice === '$$'
                  ? 'bg-[#ffdbcc] text-[#351000] ring-1 ring-[#a04100]'
                  : 'bg-white text-[#1b1c1c] hover:bg-[#f0eded]'
              }`}
            >
              <span>$$ (Moderate)</span>
            </button>

            <button
              onClick={() => setFilterPrice(filterPrice === '$$$' ? null : '$$$')}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold shrink-0 shadow-sm transition-all ${
                filterPrice === '$$$'
                  ? 'bg-[#ffdbcc] text-[#351000] ring-1 ring-[#a04100]'
                  : 'bg-white text-[#1b1c1c] hover:bg-[#f0eded]'
              }`}
            >
              <span>$$$ (Expensive)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Restaurant Grid Section */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#e5e2e1] p-8 max-w-lg mx-auto">
              <span className="material-symbols-outlined text-5xl text-[#cfc4be]">search_off</span>
              <h3 className="font-bold text-lg text-[#1b1c1c] mt-2 font-display">
                No matching restaurants found
              </h3>
              <p className="text-xs text-[#5a4136] mt-1 mb-4">
                Try loosening your filters or searching for something else like "Burgers", "Pizza", or "Biryani".
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#a04100] text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRestaurants.slice(0, visibleCount).map((restaurant) => {
                const isFav = favorites.includes(restaurant.id);
                return (
                  <div
                    key={restaurant.id}
                    onClick={() => handleRestaurantClick(restaurant.id)}
                    className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-[#e5e2e1]/70"
                  >
                    {/* Cover image container */}
                    <div
                      className="relative w-full h-56 bg-cover bg-center"
                      style={{ backgroundImage: `url(${restaurant.image})` }}
                    >
                      {/* Top tags / discounts */}
                      {restaurant.discountTag && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                          <span
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm ${
                              restaurant.discountTag.includes('Free')
                                ? 'bg-[#b6171e]'
                                : 'bg-[#a04100]'
                            }`}
                          >
                            {restaurant.discountTag}
                          </span>
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(restaurant.id);
                        }}
                        className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-[#1b1c1c] transition-colors shadow-sm"
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
                    </div>

                    <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1">
                              <h3 className="font-bold text-base text-[#1b1c1c] group-hover:text-[#a04100] transition-colors font-display">
                                {restaurant.name}
                              </h3>
                              <span className="material-symbols-outlined text-[#a04100] text-sm fill-1">
                                verified
                              </span>
                            </div>
                            <p className="text-xs text-[#5a4136] mt-0.5">
                              {restaurant.cuisines.join(', ')}
                            </p>
                          </div>

                          {/* Rating pill */}
                          <div className="flex items-center gap-1 bg-[#a04100] text-white px-2.5 py-1 rounded-lg text-xs font-bold shrink-0">
                            <span>{restaurant.rating}</span>
                            <span className="material-symbols-outlined text-[10px] fill-1">
                              star
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#5a4136] pt-2">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                          <span>•</span>
                          <span>{restaurant.distance}</span>
                          <span>•</span>
                          <span className="text-[#a04100] font-semibold">
                            {restaurant.deliveryFee === 0
                              ? 'Free Delivery'
                              : `${formatCurrency(restaurant.deliveryFee)} Delivery`}
                          </span>
                        </div>
                      </div>

                      {/* Quick Dish Highlights */}
                      <div className="mt-3 pt-2 bg-[#f6f3f2] px-3 py-2 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 truncate mr-2">
                          <span className="material-symbols-outlined text-[#ff6b00] text-sm fill-1 shrink-0">
                            local_fire_department
                          </span>
                          <span className="text-[#1b1c1c] font-medium truncate">
                            Popular: {restaurant.popularItemName}
                          </span>
                        </div>
                        <span className="text-[#a04100] font-bold font-mono shrink-0">
                          {formatCurrency(restaurant.popularItemPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More Section */}
          {filteredRestaurants.length > visibleCount && (
            <div className="flex flex-col items-center justify-center mt-12 gap-3">
              <p className="text-xs text-[#5a4136]">
                Showing {Math.min(visibleCount, filteredRestaurants.length)} of{' '}
                {filteredRestaurants.length} restaurants
              </p>
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-3 bg-[#a04100] hover:bg-[#ff6b00] active:scale-95 text-white rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Load More Restaurants</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
