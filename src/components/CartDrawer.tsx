/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash, Tag, Ticket, HelpCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  darkMode: boolean;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  darkMode,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [percentDiscount, setPercentDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * percentDiscount;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const shippingCharge = subtotal > 150 ? 0 : (cartItems.length > 0 ? 15.00 : 0);
  const finalTotal = Math.max(0, subtotal - discountAmount + estimatedTax + shippingCharge);
  const estimatedPoints = Math.floor((subtotal - discountAmount) * 0.10);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'ELITE10') {
      setPercentDiscount(0.10);
      setCouponApplied(true);
    } else if (code === 'INTERN20') {
      setPercentDiscount(0.20);
      setCouponApplied(true);
    } else if (code === 'WELCOME50') {
      setPercentDiscount(0.50);
      setCouponApplied(true);
    } else {
      setErrorMessage('Invalid discount voucher code. Try ELITE10, INTERN20 or WELCOME50!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className={`w-screen max-w-md pointer-events-auto relative shadow-2xl flex flex-col justify-between border-l ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-150 text-gray-800'
        }`}>
          
          {/* Header Block */}
          <div className="px-5 py-4 border-b border-gray-100/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              <span className="font-sans font-bold text-sm uppercase tracking-wider">My Shopping Basket</span>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full ${
                darkMode ? 'hover:bg-slate-850 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
              id="close-cart-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Catalog Listing scroll */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh] text-center text-gray-400">
                <div className="p-4 bg-gray-500/5 rounded-full mb-3 text-blue-400">
                  <ShoppingBag className="h-10 w-10" />
                </div>
                <h4 className="font-bold text-sm tracking-tight mb-1">Your Basket is Empty</h4>
                <p className="text-xs max-w-[200px] text-gray-400">Add elegant premium objects from our Boutique to initiate checkout schedules.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className={`p-3 rounded-2xl flex border items-center justify-between transition-all ${
                    darkMode ? 'bg-slate-850/40 border-slate-800/80' : 'bg-gray-50/50 border-gray-200'
                  }`}
                  id={`cart-item-${item.product.id}`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-14 w-14 object-cover rounded-xl shrink-0 border border-transparent/10" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate pr-2">{item.product.name}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">${item.product.price}.00 per unit</p>
                      <p className="text-[10px] text-sky-400 font-mono mt-0.5">Points back: +{Math.floor(item.product.price * 0.1)}p/ea</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="h-7 w-7 flex items-center justify-center p-1 rounded-md text-red-500 hover:bg-red-500/10"
                      title="Remove product"
                      id={`delete-cart-item-${item.product.id}`}
                    >
                      <Trash className="h-4 w-4" />
                    </button>

                    <div className="flex items-center space-x-1 border border-slate-700/50 rounded-lg p-0.5 bg-slate-900/10">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="h-6 w-6 flex items-center justify-center shrink-0 hover:text-black dark:hover:text-white"
                        disabled={item.quantity <= 1}
                        id={`minus-qty-btn-${item.product.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-6 text-center shrink-0">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="h-6 w-6 flex items-center justify-center shrink-0 hover:text-black dark:hover:text-white"
                        id={`plus-qty-btn-${item.product.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pricing computation Summary Footer */}
          {cartItems.length > 0 && (
            <div className={`p-5 border-t border-gray-100/10 space-y-4 bg-slate-950/20`}>
              
              {/* Rewards program visual box */}
              <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/15 border border-amber-500/20 rounded-xl p-3 text-left">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-500 block mb-0.5">Elite Loyalty Bonus Rewards</span>
                <p className="text-[11px] text-gray-300 leading-normal">
                  Checking out this cart now secures **{estimatedPoints} loyalty points** back credited immediately into your account wallet! That is worth **${estimatedPoints}.00 USD** in future rebates.
                </p>
              </div>

              {/* Promo validation block */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-2.5 flex items-center text-gray-400">
                    <Tag className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="text"
                    className={`w-full text-xs pl-8 pr-2.5 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200'
                    }`}
                    placeholder="Coupon (e.g. ELITE10, WELCOME50)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    id="coupon-input"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-black dark:bg-slate-800 text-white hover:bg-slate-700 px-3 py-2 text-xs font-bold rounded-lg transition-colors border border-transparent"
                  id="coupon-apply-btn"
                >
                  Apply
                </button>
              </form>

              {errorMessage && <p className="text-[10px] text-red-500 mt-1 font-sans">{errorMessage}</p>}
              {couponApplied && (
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold font-sans">
                  <Ticket className="h-4 w-4" />
                  <span>Coupon successfully applied! {percentDiscount * 100}% DISCOUNT SAVINGS</span>
                </div>
              )}

              {/* Aggregation pricing */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Cart Subtotal</span>
                  <span className="font-mono">${subtotal}.00</span>
                </div>
                {percentDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Code SAVED</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipment Delivery</span>
                  <span className="font-mono">{shippingCharge === 0 ? 'FREE DELIVERY (Over $150)' : `$${shippingCharge.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Sales Tax (8%)</span>
                  <span className="font-mono">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-sans font-bold text-sm border-t border-stone-200 dark:border-stone-800 pt-2.5 mt-2">
                  <span>Final Total</span>
                  <span className="text-[#9A845A] font-mono font-bold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Wizard proceeds trigger: Gold-Bronze 10% accent button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#9A845A] hover:bg-[#85714d] active:bg-[#6c5b3e] text-white font-sans font-bold text-xs py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                id="cart-checkout-btn"
              >
                <span>Initiate Dynamic Secure Checkout</span>
                <span className="font-mono">→</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
