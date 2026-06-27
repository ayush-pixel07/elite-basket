/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User as UserType, Order, Product } from '../types';
import { Award, Package, Clock, ShieldAlert, Sparkles, MapPin, Eye, CheckCircle, RefreshCw, LogOut } from 'lucide-react';

interface UserDashboardProps {
  currentUser: UserType | null;
  orders: Order[];
  darkMode: boolean;
  onTrackOrder: (order: Order) => void;
  products: Product[];
  onViewProduct: (product: Product) => void;
  onLogout: () => void;
}

export default function UserDashboard({
  currentUser,
  orders,
  darkMode,
  onTrackOrder,
  products,
  onViewProduct,
  onLogout
}: UserDashboardProps) {
  if (!currentUser) {
    return (
      <div className="p-8 text-center max-w-md mx-auto flex flex-col items-center justify-center">
        <ShieldAlert className="h-10 w-10 text-amber-500 mb-2" />
        <h3 className="font-sans font-bold text-lg">Account Login required</h3>
        <p className="text-xs text-gray-400 mt-1">Please sign in from our top navigation bar or checkout form to open your personalized dashboard space.</p>
      </div>
    );
  }

  // Generate personalized recommended products based on user purchase history categories or general popular
  const purchasedCategories = new Set(orders.flatMap(o => o.items.map(i => {
    const orig = products.find(p => p.id === i.productId);
    return orig ? orig.category : '';
  })).filter(Boolean));

  const recommendations = products
    .filter(p => purchasedCategories.size > 0 ? purchasedCategories.has(p.category) : true)
    .slice(0, 3);

  return (
    <div className="space-y-6 text-left max-w-6xl mx-auto" id="user-dashboard-wrapper">
      
      {/* Banner Card / Welcomer */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 justify-left ${
        darkMode ? 'bg-gradient-to-r from-slate-850 to-indigo-950 border-slate-800' : 'bg-gradient-to-r from-gray-50 to-blue-50/30 border-gray-150'
      }`}>
        <div className="flex items-center space-x-4">
          <img 
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'} 
            alt={currentUser.name} 
            className="h-16 w-16 rounded-full border-2 border-blue-500 shadow-md object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold font-sans tracking-tight">{currentUser.name}</h2>
              <span className={`text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                currentUser.role === 'admin' ? 'bg-red-500/10 text-red-500 border border-red-500/15' : 'bg-blue-500/10 text-blue-500 border border-blue-500/15'
              }`}>
                {currentUser.role.toUpperCase()}
              </span>
            </div>
            
            <p className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-0.5">{currentUser.email}</p>
            
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <div className="flex items-center space-x-1 text-[11px] text-gray-405">
                <MapPin className="h-3 w-3 text-blue-400" />
                <span>Delhi, India</span>
              </div>
              <button
                onClick={onLogout}
                className="text-[10px] font-mono text-stone-400 hover:text-red-400 font-bold flex items-center space-x-1 border border-transparent hover:border-red-500/20 rounded-full px-2 py-0.5 hover:bg-red-500/5 transition-all"
                id="user-logout-btn"
              >
                <LogOut className="h-2.5 w-2.5 text-red-400" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loyalty Program points wallet card widget */}
        <div className={`p-4 rounded-2xl border flex items-center space-x-4 shrink-0 shadow-lg relative overflow-hidden text-left ${
          darkMode ? 'bg-slate-900/90 border-slate-750/80 text-white' : 'bg-white border-gray-250/90 text-gray-800'
        }`}>
          <div className="absolute top-1 right-1 opacity-10">
            <Award className="h-16 w-16 text-amber-500" />
          </div>
          <div className="p-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl text-slate-950">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-sans font-extrabold tracking-widest text-amber-500 block">Elite Rewards Bank</span>
            <span className="text-2xl font-extrabold leading-none block my-0.5">
              {currentUser.loyaltyPoints} <span className="text-xs font-semibold uppercase font-sans text-stone-500 dark:text-stone-400">Points</span>
            </span>
            <span className="text-[10px] text-gray-400 block"> Redeemable value: ${currentUser.loyaltyPoints}.00 USD rebating</span>
          </div>
        </div>
      </div>

      {/* Grid: Order history List vs Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Orders History lists pane */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100/10 pb-2.5">
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider flex items-center space-x-1.5">
              <Package className="h-4.5 w-4.5 text-blue-400" />
              <span>Purchase History & Shipment Logs</span>
            </h3>
            <span className="text-xs font-mono text-gray-400">{orders.length} secure shipments logged</span>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className={`p-8 text-center rounded-2xl border ${
                darkMode ? 'bg-slate-850/30 border-slate-800' : 'bg-gray-50 border-gray-200'
              }`}>
                <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h4 className="font-semibold text-xs">No order indexes found</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Purchase objects from our store catalog to activate transaction records and carrier status updates.</p>
              </div>
            ) : (
              orders.map((ord) => {
                const isDelivered = ord.status === 'delivered';
                return (
                  <div 
                    key={ord.id}
                    className={`p-4 rounded-2xl border transition-all relative ${
                      darkMode ? 'bg-slate-850/20 border-slate-800' : 'bg-white border-gray-250/70 hover:border-gray-200 shadow-sm'
                    }`}
                    id={`order-log-${ord.id}`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-b border-slate-800/10 pb-3 mb-3 text-left">
                      <div>
                        <span className="font-sans font-bold text-xs text-blue-500">#{ord.id}</span>
                        <span className="text-[10px] font-mono text-gray-400 ml-2">Logged: {new Date(ord.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded font-bold ${
                          ord.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                          ord.status === 'out-for-delivery' ? 'bg-amber-500/10 text-amber-500 animate-pulse' :
                          'bg-blue-500/10 text-blue-500'
                        }`}>
                          {ord.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail items */}
                    <div className="space-y-2 mb-4 text-left">
                      {ord.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-8 w-8 object-cover rounded-md border border-transparent/10" 
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h5 className="font-semibold truncate max-w-[200px] text-[11px]">{item.name}</h5>
                              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">Units quantity: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-mono text-stone-500 dark:text-stone-400">${item.price * item.quantity}.00</span>
                        </div>
                      ))}
                    </div>

                    {/* Total cost and action panel */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-100/10">
                      <div className="text-left text-xs text-gray-400">
                        <span className="block font-sans text-[10px]">Total secure charge: <strong className="text-blue-500 font-mono">${ord.total.toFixed(2)}</strong></span>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => onTrackOrder(ord)}
                          className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white dark:bg-stone-750 dark:hover:bg-stone-700 font-sans text-[11px] font-bold rounded-lg shadow-sm flex items-center space-x-1 transition-all"
                          id={`track-order-btn-${ord.id}`}
                        >
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span>Track Carrier Live</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Dynamic Personal recommendations space */}
        <div className="space-y-4 text-left">
          <div className="border-b border-gray-100/10 pb-2.5">
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
              <span>Smart stylist Curated items</span>
            </h3>
          </div>

          <div className="space-y-3">
            {recommendations.map(p => (
              <div 
                key={p.id}
                onClick={() => onViewProduct(p)}
                className={`p-3 rounded-2xl border cursor-pointer hover:scale-[1.02] hover:shadow-md transition-all flex items-center space-x-3.5 ${
                  darkMode ? 'bg-slate-850/30 border-slate-800' : 'bg-white border-gray-150'
                }`}
                id={`dashboard-recommended-${p.id}`}
              >
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="h-12 w-12 object-cover rounded-xl shrink-0 border border-transparent/10" 
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold truncate leading-snug">{p.name}</h4>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block uppercase font-mono">{p.category}</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs font-bold text-blue-500 font-mono">${p.price}.00</span>
                    <span className="text-[9px] font-mono text-amber-500">★ {p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick styling assist alert banner */}
          <div className={`p-4 rounded-2xl border text-left ${
            darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-gray-50 border-gray-150'
          }`}>
            <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-blue-500 block mb-1">Awaiting styling feedback?</span>
            <p className="text-xs text-gray-455 leading-normal">
              Activate our custom AI Stylist sidebar by clicking the **Sparkling Floating Chat bubble** in the bottom-right corner! It has full access to active catalog stock lines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
