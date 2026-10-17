export type ScreenType =
  | 'home'
  | 'restaurants'
  | 'restaurant-details'
  | 'checkout'
  | 'live-tracking'
  | 'profile'
  | 'offers'
  | 'favorites';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  popularTag?: string; // 'Bestseller' | 'Chef Special' | 'Trending #1' | 'Spicy' etc.
  restaurantId: string;
  restaurantName: string;
  details?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  ratingCount: number;
  deliveryTime: string; // e.g. "20-25 mins"
  deliveryTimeMins: number;
  distance: string; // e.g. "1.8 km"
  distanceKm: number;
  deliveryFee: number; // 0 means Free Delivery
  priceLevel: '$' | '$$' | '$$$';
  discountTag?: string; // "20% OFF up to $50", "Free Delivery", "BOGO Offer"
  image: string;
  coverImage?: string;
  isPureVeg?: boolean;
  popularItemName: string;
  popularItemPrice: number;
  menu: MenuItem[];
  address: string;
  closingTime: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Address {
  id: string;
  label: string; // 'Home' | 'Work' | 'Other'
  fullAddress: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay' | 'cod';
  title: string;
  subtitle: string;
  isDefault?: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'flat' | 'percentage' | 'free_delivery';
  discountValue: number;
  description: string;
  minSpend: number;
  expiresIn?: string;
  tag?: string;
}

export interface Order {
  id: string;
  restaurantName: string;
  restaurantId: string;
  status: 'Order Placed' | 'Kitchen Preparing' | 'Out for Delivery' | 'Delivered';
  placedAt: string;
  estimatedDelivery: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  couponCode?: string;
  tip: number;
  total: number;
  courierName?: string;
  courierRating?: number;
  courierPhone?: string;
  courierVehicle?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  comment: string;
  rating: number;
}
