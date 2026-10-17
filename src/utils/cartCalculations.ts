import type { CartItem, Coupon } from '../types/index.ts';

export function calculateSubtotal(items: CartItem[]): number {
  const sum = items.reduce((acc, item) => {
    return acc + item.menuItem.price * item.quantity;
  }, 0);
  return Math.round(sum * 100) / 100;
}

export function calculateDeliveryFee(
  subtotal: number,
  baseFee: number = 2.99,
  freeDeliveryThreshold: number = 35.0,
  isFreeDeliveryCoupon: boolean = false
): number {
  if (subtotal === 0) return 0;
  if (isFreeDeliveryCoupon) return 0;
  if (subtotal >= freeDeliveryThreshold) return 0;
  return Math.round(baseFee * 100) / 100;
}

export function calculateTax(subtotal: number, taxRate: number = 0.1012): number {
  if (subtotal <= 0) return 0;
  return Math.round(subtotal * taxRate * 100) / 100;
}

export function calculateCouponDiscount(coupon: Coupon | null, subtotal: number): number {
  if (!coupon || subtotal <= 0) return 0;
  if (subtotal < (coupon.minSpend || 0)) return 0;

  if (coupon.discountType === 'flat') {
    return Math.min(coupon.discountValue, subtotal);
  }

  if (coupon.discountType === 'percentage') {
    const rawDiscount = (subtotal * coupon.discountValue) / 100;
    return Math.round(Math.min(rawDiscount, 50.0) * 100) / 100;
  }

  if (coupon.discountType === 'free_delivery') {
    return 0; // Handled in calculateDeliveryFee
  }

  return 0;
}

export function calculateTotal(
  subtotal: number,
  deliveryFee: number,
  taxes: number,
  discount: number,
  tip: number = 0
): number {
  const net = subtotal + deliveryFee + taxes - discount + tip;
  return Math.max(0, Math.round(net * 100) / 100);
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
