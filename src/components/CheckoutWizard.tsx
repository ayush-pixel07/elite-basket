/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, ShoppingBag, Truck, MapPin, Receipt, Star, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutWizardProps {
  onClose: () => void;
  cartItems: CartItem[];
  darkMode: boolean;
  currentUser: { email: string; name: string } | null;
  onPlaceOrder: (address: any, paymentDetails: any) => Promise<Order>;
  onSuccess: (order: Order) => void;
}

export default function CheckoutWizard({
  onClose,
  cartItems,
  darkMode,
  currentUser,
  onPlaceOrder,
  onSuccess
}: CheckoutWizardProps) {
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment/Stripe, 3 = Success Processing
  const [loading, setLoading] = useState(false);
  const [loadingStatuses, setLoadingStatuses] = useState<string[]>([]);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Address State
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [street, setStreet] = useState('742 Platinum Avenue');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [zipCode, setZipCode] = useState('110001');
  const [country, setCountry] = useState('India');

  // Credit Card / Stripe simulation State
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Ayush Sharma');
  const [cardExpiry, setCardExpiry] = useState('12/29');
  const [cardCvc, setCardCvc] = useState('328');
  const [cardFocused, setCardFocused] = useState(false); // flips credit card graphic if focused

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const shipping = subtotal > 150 ? 0 : 15.00;
  const total = Number((subtotal + tax + shipping).toFixed(2));

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName || !email || !street || !city || !zipCode) {
        alert('Please occupy all mandated shipping parameters.');
        return;
      }
      setStep(2);
    }
  };

  const executeCheckoutPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStatuses(['Contacting Stripe Secure payment gateways...']);

    // Step-by-step processing details for visual premium aesthetics
    setTimeout(() => {
      setLoadingStatuses(prev => [...prev, 'Stripe Gateway validated token auth keys. Creating payment intent...']);
    }, 1000);

    setTimeout(() => {
      setLoadingStatuses(prev => [...prev, 'Charging card successfully. Securing warehouse inventory allocation...']);
    }, 2200);

    setTimeout(() => {
      setLoadingStatuses(prev => [...prev, 'Crediting Elite Loyalty account program. Dispensing orders...']);
    }, 3400);

    // Dynamic submit
    setTimeout(async () => {
      try {
        const orderData = await onPlaceOrder({
          fullName, street, city, state, zipCode, country, email
        }, {
          cardNumber, cardHolder, cardExpiry
        });
        setPlacedOrder(orderData);
        setStep(3);
        onSuccess(orderData);
      } catch (err: any) {
        alert(err.message || 'Payment simulation failed.');
      } finally {
        setLoading(false);
      }
    }, 45000 / 10); // slightly sped up for quick visual comfort
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className={`relative rounded-3xl overflow-hidden max-w-3xl w-full text-left shadow-2xl border transform transition-all ${
        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-150 text-gray-800'
      }`}>
        
        {/* Header Title wrapper */}
        <div className="p-5 border-b border-gray-100/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500 animate-pulse" />
            <span className="font-sans font-bold text-xs uppercase tracking-wider">Secured stripe transaction portal</span>
          </div>
          {step < 3 && (
            <button
              onClick={onClose}
              className={`p-1 rounded-full ${darkMode ? 'hover:bg-slate-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              id="close-checkout-btn"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Dynamic checkout Wizard Steps Progress Indicator */}
        {step < 3 && (
          <div className="bg-slate-950/10 px-6 py-4 flex items-center justify-center space-x-4 border-b border-gray-100/10 text-xs">
            <div className="flex items-center space-x-2">
              <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold font-mono ${
                step === 1 ? 'bg-[#9A845A] text-white' : 'bg-emerald-600/25 text-emerald-500'
              }`}>1</span>
              <span className={step === 1 ? 'font-bold text-[#9A845A]' : 'text-gray-400'}>Shipping Address</span>
            </div>
            <div className="h-px bg-stone-700 w-12" />
            <div className="flex items-center space-x-2">
              <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold font-mono ${
                step === 2 ? 'bg-[#9A845A] text-white' : (step > 2 ? 'bg-emerald-600/25 text-emerald-500' : 'bg-stone-850 text-gray-500')
              }`}>2</span>
              <span className={step === 2 ? 'font-bold text-[#9A845A]' : 'text-gray-400'}>Secure Stripe Form</span>
            </div>
          </div>
        )}

        {/* Wizard Main content Grid */}
        <div className="flex flex-col md:flex-row h-auto max-h-[80vh] overflow-y-auto">
          
          {/* Main Form Fields pane wrapper */}
          <div className="flex-1 p-6 border-r border-gray-100/10">
            {step === 1 && (
              <div className="space-y-4 text-xs text-left" id="checkout-step-1">
                <div className="flex items-center space-x-1.5 mb-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>Where should we deliver?</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase font-mono mb-1 text-gray-400">Full Name</label>
                    <input
                      type="text"
                      className={`w-full p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                      }`}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. John Doe"
                      id="checkout-name"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase font-mono mb-1 text-gray-400">Email Address</label>
                    <input
                      type="email"
                      className={`w-full p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                      }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="e.g. customer@test.com"
                      id="checkout-email"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase font-mono mb-1 text-gray-400">Street Address</label>
                    <input
                      type="text"
                      className={`w-full p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                      }`}
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      placeholder="742 Platinum Avenue"
                      id="checkout-street"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono mb-1 text-gray-400">City</label>
                    <input
                      type="text"
                      className={`w-full p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                      }`}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      placeholder="New Delhi"
                      id="checkout-city"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono mb-1 text-gray-400">State / Region</label>
                    <input
                      type="text"
                      className={`w-full p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                      }`}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Delhi"
                      id="checkout-state"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono mb-1 text-gray-400">Postal / ZIP Code</label>
                    <input
                      type="text"
                      className={`w-full p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                      }`}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                      placeholder="110001"
                      id="checkout-zip"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono mb-1 text-gray-400">Country</label>
                    <input
                      type="text"
                      className={`w-full p-2.5 rounded-lg border text-xs ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                      }`}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      placeholder="India"
                      id="checkout-country"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-[#9A845A] hover:bg-[#85714d] active:bg-[#6c5b3e] text-white font-sans font-bold text-xs py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all mt-4"
                  id="checkout-to-payment-btn"
                >
                  Proceed to Secure Stripe Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div id="checkout-step-2">
                {loading ? (
                  /* SECURE AUTH MILESTONES LOADING MASK */
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
                    <h3 className="font-sans font-bold text-sm tracking-tight text-blue-400">Securing payment connection...</h3>
                    <div className="space-y-1.5 w-full max-w-sm mt-4 text-left">
                      {loadingStatuses.map((stat, sIdx) => (
                        <div key={sIdx} className="text-[11px] font-mono text-gray-400 flex items-center space-x-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={executeCheckoutPayment} className="space-y-4 text-xs text-left">
                    <div className="flex items-center space-x-1.5 mb-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                      <CreditCard className="h-4 w-4" />
                      <span>Input Stripe Card Coordinates</span>
                    </div>

                    {/* INTERACTIVE SHINY CREDIT CARD GRAPHIC */}
                    <div className="relative w-full h-[160px] rounded-2xl overflow-hidden card-perspective mb-6 shadow-xl">
                      <div className={`w-full h-full duration-500 transform-style relative transition-transform ${
                        cardFocused ? 'rotate-y-180' : ''
                      }`}>
                        
                        {/* Front of Card */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-slate-850 via-slate-900 to-indigo-950 p-4 flex flex-col justify-between text-white backface-hidden border border-slate-700/60 rounded-2xl`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono tracking-widest text-indigo-300">STRIPE SECURE CARD</span>
                            <div className="h-5 w-8 bg-amber-500/35 rounded-md border border-amber-500/40 relative flex items-center justify-center">
                              <span className="h-2 w-3 border border-amber-500/50 bg-amber-200/50 rounded-sm" />
                            </div>
                          </div>
                          
                          <span className="text-sm font-bold font-mono tracking-widest text-center my-3 block leading-none">
                            {cardNumber}
                          </span>

                          <div className="flex justify-between items-end text-[9px] font-mono uppercase tracking-wider text-gray-400">
                            <div>
                              <span className="text-[7px] text-indigo-400 block -mb-0.5">Cardholder</span>
                              <span>{cardHolder || 'AYUSH SHARMA'}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[7px] text-indigo-400 block -mb-0.5">Expires</span>
                              <span>{cardExpiry || 'MM/YY'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Back of Card (Flipped CVC focus) */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-slate-950/90 to-slate-900 p-4 flex flex-col justify-between text-white rotate-y-180 backface-hidden border border-slate-700/60 rounded-2xl`}>
                          <div className="h-8 bg-slate-950 -mx-4 mt-2" />
                          <div className="text-right">
                            <span className="text-[7px] text-gray-400 block pr-2 mb-1">CVC SAFETY CODE</span>
                            <div className="bg-gray-100 text-slate-950 font-mono italic text-xs font-bold py-1 px-3.5 rounded text-right tracking-widest max-w-[80px] ml-auto">
                              {cardCvc || '***'}
                            </div>
                          </div>
                          <p className="text-[7px] text-slate-500 leading-normal text-center">
                            This transaction is secured via Stripe SSL network tunnels. Elite Basket cannot record card coordinates.
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Standard inputs */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-3">
                        <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">Cardholder Name</label>
                        <input
                          type="text"
                          className={`w-full p-2 rounded-lg border text-xs capitalize ${
                            darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                          }`}
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          onFocus={() => setCardFocused(false)}
                          required
                          id="stripe-card-holder"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">Card Number (Mock Stripe ok)</label>
                        <input
                          type="text"
                          maxLength={19}
                          className={`w-full p-2 rounded-lg border text-xs font-mono ${
                            darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                          }`}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          onFocus={() => setCardFocused(false)}
                          required
                          id="stripe-card-num"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          className={`w-full p-2 rounded-lg border text-xs font-mono text-center ${
                            darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                          }`}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          onFocus={() => setCardFocused(false)}
                          required
                          id="stripe-card-exp"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">CVC Code</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="328"
                          className={`w-full p-2 rounded-lg border text-xs font-mono text-center ${
                            darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-gray-50 border-gray-250 text-gray-800'
                          }`}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          onFocus={() => setCardFocused(true)}
                          onBlur={() => setCardFocused(false)}
                          required
                          id="stripe-card-cvc"
                        />
                      </div>
                    </div>

                    <div className="flex bg-[#9A845A]/10 p-3 rounded-xl border border-[#9A845A]/25 items-start space-x-2.5 text-[11px] leading-relaxed text-[#9A845A]">
                      <AlertCircle className="h-4.5 w-4.5 text-[#9A845A] shrink-0 mt-0.5" />
                      <div>
                        <strong>Stripe Dev Sandbox enabled:</strong> You can mock input details safely to authorize credentials. Real stock and loyalty ledger updates will execute live!
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#9A845A] hover:bg-[#85714d] active:bg-[#6c5b3e] text-white font-sans font-bold text-xs py-3.5 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
                      id="stripe-pay-btn"
                    >
                      Authorize Transaction Total: ${total.toFixed(2)} USD
                    </button>
                  </form>
                )}
              </div>
            )}

            {step === 3 && placedOrder && (
              <div className="space-y-5 text-xs text-left" id="checkout-step-3">
                <div className="text-center space-y-2 py-4">
                  <div className="h-12 w-12 bg-emerald-500/20 text-emerald-500 mx-auto rounded-full flex items-center justify-center text-xl font-bold font-sans animate-bounce">
                    ✓
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-emerald-500 tracking-tight">Purchase Secured Successfully!</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Your automated dispatch routines have executed. Invoice code: <strong>{placedOrder.id}</strong>.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-150'
                } space-y-3`}>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="font-bold text-gray-450 uppercase font-mono text-[9px] tracking-wider">Shipment Delivery Coordinates</span>
                    <span className="font-mono text-[#9A845A] font-bold">BlueDart Logistic Service</span>
                  </div>
                  <div className="leading-snug text-gray-300">
                    <p className="font-bold">{placedOrder.address.fullName}</p>
                    <p>{placedOrder.address.street}</p>
                    <p>{placedOrder.address.city}, {placedOrder.address.state} {placedOrder.address.zipCode}</p>
                    <p>{placedOrder.address.country}</p>
                    <p className="font-mono text-[10px] text-gray-400 mt-2">Email Notification: {placedOrder.email}</p>
                  </div>

                  <div className="flex justify-between items-center bg-[#9A845A]/5 px-3 py-2 rounded-lg text-[#9A845A] font-bold border border-[#9A845A]/20">
                    <div className="flex items-center space-x-1">
                      <Truck className="h-4 w-4" />
                      <span>Tracking ID:</span>
                    </div>
                    <span className="font-mono font-bold tracking-wider">{placedOrder.trackingNumber}</span>
                  </div>

                  <div className="flex justify-between items-center bg-amber-500/5 px-3 py-2 rounded-lg text-amber-500 font-bold border border-amber-500/20">
                    <div className="flex items-center space-x-1">
                      <Sparkles className="h-4 w-4" />
                      <span>Elite Loyalty Bonus Credited:</span>
                    </div>
                    <span>+{placedOrder.pointsEarned} Points</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-[#9A845A] hover:bg-[#85714d] active:bg-[#6c5b3e] text-white font-sans font-bold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                  id="checkout-complete-dismiss-btn"
                >
                  Conclude Checkout & View Order Track status
                </button>
              </div>
            )}
          </div>

          {/* Right Side Order Breakdown Receipt Pane wrapper */}
          {step < 3 && (
            <div className={`w-full md:w-5/12 p-6 flex flex-col justify-between ${
              darkMode ? 'bg-slate-950/20' : 'bg-gray-50'
            }`}>
              <div>
                <div className="flex items-center space-x-1 mb-4 border-b border-gray-800 pb-2.5">
                  <Receipt className="h-4.5 w-4.5 text-gray-400" />
                  <span className="font-bold text-xs text-gray-400 uppercase tracking-widest font-mono">Invoice Summary</span>
                </div>

                <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between space-x-3 text-xs">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="h-8 w-8 object-cover rounded-md border border-transparent/10" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate text-left">
                          <h4 className="font-bold truncate text-[11px]">{item.product.name}</h4>
                          <span className="text-[10px] text-gray-400 block font-mono">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold shrink-0">${item.product.price * item.quantity}.00</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700/50 pt-3.5 mt-4 space-y-1.5 text-xs text-left">
                  <div className="flex justify-between text-gray-400 h-4">
                    <span>Subtotal Price</span>
                    <span className="font-mono">${subtotal}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400 h-4">
                    <span>Post & Carrier delivery</span>
                    <span className="font-mono">{shipping === 0 ? 'FREE DELIVERY' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 h-4">
                    <span>Sales tax (8% EST)</span>
                    <span className="font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-slate-800 pt-3 mt-2 h-6">
                    <span>Total cost</span>
                    <span className="text-blue-400 font-mono text-sm">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/30 pt-4 mt-6 text-left">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-400 block mb-0.5">Secure Transaction Guarantee</span>
                <p className="text-[10px] text-gray-450 leading-relaxed">
                  Stripe PCI compliance certifies this card validation structure meets high banking grade data protection protocols over peer connections.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
