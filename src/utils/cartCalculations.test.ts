import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTax,
  calculateCouponDiscount,
  calculateTotal,
  formatCurrency,
} from './cartCalculations.ts';
import type { CartItem, Coupon } from '../types/index.ts';

test('calculateSubtotal accurately sums items with quantities', () => {
  const items: CartItem[] = [
    {
      menuItem: {
        id: '1',
        name: 'Burger',
        price: 14.5,
        description: '',
        category: 'Burgers',
        image: '',
        restaurantId: 'r1',
        restaurantName: 'Burger Joint',
      },
      quantity: 2,
    },
    {
      menuItem: {
        id: '2',
        name: 'Fries',
        price: 8.5,
        description: '',
        category: 'Sides',
        image: '',
        restaurantId: 'r1',
        restaurantName: 'Burger Joint',
      },
      quantity: 1,
    },
  ];

  const subtotal = calculateSubtotal(items);
  assert.equal(subtotal, 37.5);
});

test('calculateDeliveryFee applies free delivery when threshold reached or coupon active', () => {
  assert.equal(calculateDeliveryFee(0), 0);
  assert.equal(calculateDeliveryFee(20.0, 2.99, 35.0, false), 2.99);
  assert.equal(calculateDeliveryFee(40.0, 2.99, 35.0, false), 0);
  assert.equal(calculateDeliveryFee(20.0, 2.99, 35.0, true), 0);
});

test('calculateCouponDiscount computes flat and percentage discounts accurately', () => {
  const flatCoupon: Coupon = {
    code: 'WELCOME50',
    discountType: 'flat',
    discountValue: 10,
    description: '$10 off',
    minSpend: 25,
  };

  assert.equal(calculateCouponDiscount(flatCoupon, 20), 0);
  assert.equal(calculateCouponDiscount(flatCoupon, 35), 10);

  const percentCoupon: Coupon = {
    code: 'SAVE20',
    discountType: 'percentage',
    discountValue: 20,
    description: '20% off',
    minSpend: 20,
  };

  assert.equal(calculateCouponDiscount(percentCoupon, 50), 10);
});

test('calculateTotal correctly computes final amount with tip and discounts', () => {
  const subtotal = 42.0;
  const deliveryFee = 2.99;
  const taxes = 4.25;
  const discount = 10.0;
  const tip = 3.0;

  const total = calculateTotal(subtotal, deliveryFee, taxes, discount, tip);
  assert.equal(total, 42.24);
});

test('formatCurrency outputs formatted string with two decimal places', () => {
  assert.equal(formatCurrency(39.24), '$39.24');
  assert.equal(formatCurrency(0), '$0.00');
});
