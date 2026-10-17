import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  ScreenType,
  CartItem,
  MenuItem,
  Coupon,
  Address,
  PaymentMethod,
  Order,
  Restaurant,
} from '../types/index.ts';
import {
  COUPONS,
  INITIAL_ADDRESSES,
  INITIAL_CART_ITEMS,
  INITIAL_PAYMENT_METHODS,
  INITIAL_ACTIVE_ORDER,
  PAST_ORDERS,
  RESTAURANTS,
} from '../data/mockData.ts';
import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTax,
  calculateCouponDiscount,
  calculateTotal,
} from '../utils/cartCalculations.ts';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedRestaurantId: string;
  setSelectedRestaurantId: (id: string) => void;
  currentRestaurant: Restaurant;
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  updateCartQuantity: (menuItemId: string, quantityDelta: number) => void;
  removeFromCart: (menuItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTax: number;
  cartDiscount: number;
  cartTotal: number;
  totalCartItemCount: number;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  tipAmount: number;
  setTipAmount: (tip: number) => void;
  deliveryNotes: string;
  setDeliveryNotes: (notes: string) => void;
  deliveryLocation: string;
  setDeliveryLocation: (location: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCuisineFilter: string | null;
  setSelectedCuisineFilter: (cuisine: string | null) => void;
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  paymentMethods: PaymentMethod[];
  selectedPaymentId: string;
  setSelectedPaymentId: (id: string) => void;
  addPaymentMethod: (pm: Omit<PaymentMethod, 'id'>) => void;
  deletePaymentMethod: (id: string) => void;
  favorites: string[];
  toggleFavorite: (restaurantId: string) => void;
  activeOrder: Order | null;
  pastOrders: Order[];
  placeOrder: () => Order;
  reorder: (order: Order) => void;
  // Modals & Popups
  showAddressModal: boolean;
  setShowAddressModal: (show: boolean) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  showCallModal: boolean;
  setShowCallModal: (show: boolean) => void;
  showMessageModal: boolean;
  setShowMessageModal: (show: boolean) => void;
  receiptModalOrder: Order | null;
  setReceiptModalOrder: (order: Order | null) => void;
  rateModalOrder: Order | null;
  setRateModalOrder: (order: Order | null) => void;
  showGoldModal: boolean;
  setShowGoldModal: (show: boolean) => void;
  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('burger-co');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(COUPONS[0]); // WELCOME50 by default
  const [tipAmount, setTipAmount] = useState<number>(3.0);
  const [deliveryNotes, setDeliveryNotes] = useState<string>('Please ring doorbell, leave at front door');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('New York, NY');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCuisineFilter, setSelectedCuisineFilter] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(INITIAL_PAYMENT_METHODS);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('pm-1');

  const [favorites, setFavorites] = useState<string[]>(['burger-co', 'trattoria-bella']);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ACTIVE_ORDER);
  const [pastOrders, setPastOrders] = useState<Order[]>(PAST_ORDERS);

  // Modals state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [receiptModalOrder, setReceiptModalOrder] = useState<Order | null>(null);
  const [rateModalOrder, setRateModalOrder] = useState<Order | null>(null);
  const [showGoldModal, setShowGoldModal] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Current Restaurant
  const currentRestaurant =
    RESTAURANTS.find((r) => r.id === selectedRestaurantId) || RESTAURANTS[0];

  // Cart Totals
  const cartSubtotal = calculateSubtotal(cartItems);
  const isFreeDeliveryCoupon = appliedCoupon?.discountType === 'free_delivery';
  const cartDeliveryFee = calculateDeliveryFee(
    cartSubtotal,
    currentRestaurant.deliveryFee,
    35.0,
    isFreeDeliveryCoupon
  );
  const cartTax = calculateTax(cartSubtotal, 0.1012);
  const cartDiscount = calculateCouponDiscount(appliedCoupon, cartSubtotal);
  const cartTotal = calculateTotal(cartSubtotal, cartDeliveryFee, cartTax, cartDiscount, tipAmount);

  const totalCartItemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const addToCart = (item: MenuItem, quantity: number = 1, notes: string = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        if (notes) copy[existingIndex].notes = notes;
        return copy;
      } else {
        return [...prev, { menuItem: item, quantity, notes }];
      }
    });
    showToast(`Added ${quantity}x ${item.name} to cart!`);
  };

  const updateCartQuantity = (menuItemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.menuItem.id === menuItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.menuItem.id !== menuItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCouponCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const matched = COUPONS.find((c) => c.code.toUpperCase() === cleanCode);

    if (!matched) {
      showToast(`Invalid coupon code: "${code}"`, 'error');
      return { success: false, message: 'Coupon code not found' };
    }

    if (cartSubtotal < matched.minSpend) {
      showToast(`Minimum order of $${matched.minSpend.toFixed(2)} required for ${matched.code}`, 'error');
      return {
        success: false,
        message: `Minimum order of $${matched.minSpend.toFixed(2)} required`,
      };
    }

    setAppliedCoupon(matched);
    showToast(`Coupon ${matched.code} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to favorites!', 'success');
        return [...prev, id];
      }
    });
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const newId = `addr-${Date.now()}`;
    const addressObj: Address = { ...newAddr, id: newId };
    setAddresses((prev) => [...prev, addressObj]);
    setSelectedAddressId(newId);
    showToast('New address saved!');
    setShowAddressModal(false);
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address deleted', 'info');
  };

  const addPaymentMethod = (pm: Omit<PaymentMethod, 'id'>) => {
    const newId = `pm-${Date.now()}`;
    const pmObj: PaymentMethod = { ...pm, id: newId };
    setPaymentMethods((prev) => [...prev, pmObj]);
    setSelectedPaymentId(newId);
    showToast('Payment method added!');
    setShowPaymentModal(false);
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((p) => p.id !== id));
    showToast('Payment method removed', 'info');
  };

  const placeOrder = (): Order => {
    const newOrder: Order = {
      id: `FG-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantName: currentRestaurant.name,
      restaurantId: currentRestaurant.id,
      status: 'Out for Delivery',
      placedAt: 'Just now',
      estimatedDelivery: '22-25 mins',
      items: [...cartItems],
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      taxes: cartTax,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      tip: tipAmount,
      total: cartTotal,
      courierName: 'Michael Rodriguez',
      courierRating: 4.9,
      courierPhone: '+1 (555) 392-8172',
      courierVehicle: 'Electric Scooter (Plate: NY-9923)',
    };

    setActiveOrder(newOrder);
    setCartItems([]);
    setCurrentScreen('live-tracking');
    showToast('Order placed successfully! Tracking courier live.', 'success');
    return newOrder;
  };

  const reorder = (order: Order) => {
    if (order.items && order.items.length > 0) {
      setCartItems([...order.items]);
      setSelectedRestaurantId(order.restaurantId);
      setCurrentScreen('checkout');
      showToast(`Added items from order ${order.id} to cart!`);
    }
  };

  // Scroll to top when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedRestaurantId,
        setSelectedRestaurantId,
        currentRestaurant,
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDeliveryFee,
        cartTax,
        cartDiscount,
        cartTotal,
        totalCartItemCount,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        tipAmount,
        setTipAmount,
        deliveryNotes,
        setDeliveryNotes,
        deliveryLocation,
        setDeliveryLocation,
        searchQuery,
        setSearchQuery,
        selectedCuisineFilter,
        setSelectedCuisineFilter,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        deleteAddress,
        paymentMethods,
        selectedPaymentId,
        setSelectedPaymentId,
        addPaymentMethod,
        deletePaymentMethod,
        favorites,
        toggleFavorite,
        activeOrder,
        pastOrders,
        placeOrder,
        reorder,
        showAddressModal,
        setShowAddressModal,
        showPaymentModal,
        setShowPaymentModal,
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
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
