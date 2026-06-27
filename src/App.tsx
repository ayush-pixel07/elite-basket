/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Product, CartItem, Order, User, SearchFilters, PushNotification, SimulatedEmail } from './types';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutWizard from './components/CheckoutWizard';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import RealTimeTracker from './components/RealTimeTracker';
import AIAssistant from './components/AIAssistant';
import LoginScreen from './components/LoginScreen';
import { Search, SlidersHorizontal, ShoppingBag, Eye, RefreshCw, Star, Info, X, ShieldCheck, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LUXURY_SLIDES = [
  {
    id: 'prod-lv',
    name: 'Louis Vuitton Keepall Bandoulière 50 Eclipse',
    price: 3300,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=350',
    tagline: 'The ultimate luxury cowhide-trimmed travel Monogram Eclipse canvas'
  },
  {
    id: 'prod-rolex',
    name: 'Rolex Submariner Date Ceramic Chronometer',
    price: 12400,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=350',
    tagline: 'Precision Geneva automatic self-winding marine chronometer'
  },
  {
    id: 'prod-apple',
    name: 'Apple Vision Pro Spatial Computer',
    price: 3499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=350',
    tagline: 'Apple\'s premium micro-OLED high-fidelity spatial wearable theater'
  },
  {
    id: 'prod-boat',
    name: 'boAt Nirvana Luxury Edition Over-Cuffs',
    price: 149,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=350',
    tagline: 'Special high-gloss gold-plated frame acoustics and smart hybrid ANC'
  },
  {
    id: 'prod-hermes',
    name: 'Hermès Birkin Togo Gold Leather Carryall',
    price: 18900,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=350',
    tagline: 'Ultimate haute-couture handwork from certified French boutiques'
  },
  {
    id: 'prod-cartier',
    name: 'Cartier Love Bracelet 18K Yellow Gold',
    price: 7300,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=350',
    tagline: 'Iconic solid 18K gold devotion band equipped with miniature screwdriver lock'
  },
  {
    id: 'prod-gucci',
    name: 'Gucci GG Marmont Gold Double G Leather Belt',
    price: 520,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5519?auto=format&fit=crop&q=80&w=350',
    tagline: 'Refined Italian calfskin waist styling showcasing gold brass logo emblem double G buckle'
  },
  {
    id: 'prod-13',
    name: 'Prada Symbole Geometric Sunglasses',
    price: 480,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=350',
    tagline: 'Prada geometric bold acetate temples combined with certified protective tinted lenses'
  }
];

export default function App() {
  // --- CORE WEB STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Views navigation controls
  const [activeTab, setActiveTab] = useState<'shop' | 'dashboard' | 'admin' | 'tracker'>('shop');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);

  // Authentication and system settings
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [emails, setEmails] = useState<SimulatedEmail[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(true); // Elegant dark boutique theme default
  const [offlineMode, setOfflineMode] = useState<boolean>(false);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  // Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    category: 'All',
    minPrice: 0,
    maxPrice: 600,
    minRating: 0,
    sortBy: 'popular'
  });

  const [expandedFilters, setExpandedFilters] = useState(false);

  // Luxury slideshow state (at least 5 gorgeous premium items)
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % LUXURY_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Beautiful premium elegant portal loading timer
    const splashTimer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2800);
    return () => clearTimeout(splashTimer);
  }, []);

  // --- COMPONENT LIFECYCLE & INTEGRAL SECURE APIs SYNC ---
  useEffect(() => {
    // 1. Initial configuration loading
    refreshBoutiqueState();

    // 2. Continuous system operation loop
    // Every 5s, the client checks in for order updates, emails, and notifications
    // simulating real-time web sockets
    const interval = setInterval(() => {
      if (!offlineMode) {
        syncSystemLogs();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [offlineMode, activeTab]);

  const refreshBoutiqueState = async () => {
    if (offlineMode) return;
    try {
      // Products
      const pRes = await fetch('/api/products');
      const pData = await pRes.json();
      if (pData.products) setProducts(pData.products);

      // Current session
      const uRes = await fetch('/api/auth/me');
      const uData = await uRes.json();
      if (uData.user) {
        setCurrentUser(uData.user);
      } else {
        setCurrentUser(null);
      }

      // System notification history
      syncSystemLogs();
    } catch (err) {
      console.error('Offline mode fallback triggered. Loaded visual mock files.');
      setCurrentUser(null);
    }
  };

  const autoSignInMockUser = async () => {
    try {
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'customer@test.com' })
      });
      const loginData = await loginRes.json();
      if (loginData.user) setCurrentUser(loginData.user);
    } catch (err) {
      // Core fallback configuration
      setCurrentUser({
        id: 'usr-customer',
        email: 'customer@test.com',
        name: 'Ayush Sharma',
        role: 'customer',
        loyaltyPoints: 340,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      });
    }
  };

  const syncSystemLogs = async () => {
    try {
      // Active orders
      const oRes = await fetch('/api/orders');
      const oData = await oRes.json();
      if (oData.orders) {
        setOrders(oData.orders);
        // If tracked order is active, sync its live status
        if (trackedOrder) {
          const freshTrack = oData.orders.find((x: Order) => x.id === trackedOrder.id);
          if (freshTrack) setTrackedOrder(freshTrack);
        }
      }

      // Notifications
      const nRes = await fetch('/api/notifications');
      const nData = await nRes.json();
      if (nData.notifications) setNotifications(nData.notifications);

      // Simulated emails
      const eRes = await fetch('/api/emails');
      const eData = await eRes.json();
      if (eData.emails) setEmails(eData.emails);

      // Sync active user context points
      const uRes = await fetch('/api/auth/me');
      const uData = await uRes.json();
      if (uData.user) setCurrentUser(uData.user);
    } catch (err) {
      console.warn('System logs failed sync during host reload.');
    }
  };

  // --- CARTS LOGIC HANDLERS ---
  const handleAddToCart = (product: Product) => {
    // Track engagement analytics
    logAnalyticsEvent('add_to_cart', `/shop`, { productId: product.id, name: product.name });

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Provide automatic push alert feedback
    pushSystemClientAlert(
      'Item added to Cart 🛒',
      `"${product.name}" was packed safely in your basket. Check out points are tallying up!`
    );
  };

  const handleUpdateCartQuantity = (pId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(pId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === pId ? { ...item, quantity: qty } : item));
  };

  const handleRemoveFromCart = (pId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== pId));
  };

  const executeSecureCheckoutSecured = async (address: any, paymentDetails: any) => {
    if (offlineMode) {
      throw new Error('Transaction aborted. Stripe PCI gateway cannot authorize coordinates while offline.');
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          address
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server rejected payment model.');
      return data.order;
    } catch (err: any) {
      console.error('Checkout error:', err);
      throw err;
    }
  };

  const handleCheckoutSuccess = (order: Order) => {
    setCart([]); // Reset Cart
    refreshBoutiqueState();
    setSelectedProduct(null);
    setTrackedOrder(order);
    setActiveTab('tracker'); // Direct routing to live tracker dashboard!
  };

  // --- REVIEWS LOGIC HANDLERS ---
  const handleAddReview = async (productId: string, review: { rating: number; comment: string; userName: string }) => {
    if (offlineMode) return;
    try {
      const res = await fetch(`/api/products/${productId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      const data = await res.json();
      if (data.success) {
        refreshBoutiqueState();
      }
    } catch (err) {
      console.error('Error logging review feedback:', err);
    }
  };

  // --- ADMIN PANEL SECURE OPERATIONS ---
  const handleAddProductAdmin = async (productVal: any) => {
    if (offlineMode) return;
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productVal)
      });
      const data = await res.json();
      if (data.success) {
        pushSystemClientAlert('Product Registered 📦', `New luxury variation "${productVal.name}" is now cued on storefront layouts!`);
        refreshBoutiqueState();
      }
    } catch (err) {
      console.error('Failed registering item:', err);
    }
  };

  const handleUpdateProductStockAdmin = async (pId: string, count: number) => {
    if (offlineMode) return;
    try {
      const res = await fetch(`/api/products/${pId}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ stock: count })
      });
      const data = await res.json();
      if (data.success) {
        pushSystemClientAlert('Stocks Adjusted ⚙️', `Merchandise stocks updated live by master management console.`);
        refreshBoutiqueState();
      }
    } catch (err) {
      console.error('Failed updating stock value:', err);
    }
  };

  const handleUpdateOrderStatusAdmin = async (orderId: string, statusIdx: Order['status']) => {
    if (offlineMode) return;
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusIdx })
      });
      const data = await res.json();
      if (data.success) {
        refreshBoutiqueState();
      }
    } catch (err) {
      console.error('Failed modifying dispatch carrier status:', err);
    }
  };

  // --- AUXILIARY UTILITIES ---
  const onMarkAllNotificationsAsRead = async () => {
    if (offlineMode) return;
    try {
      await fetch('/api/notifications/read', { method: 'POST' });
      syncSystemLogs();
    } catch (err) {
      console.warn('Notification markings failed.');
    }
  };

  const logAnalyticsEvent = (type: string, pathSegment: string, metadata?: Record<string, any>) => {
    if (offlineMode) return;
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, path: pathSegment, metadata })
    }).catch(() => {});
  };

  const pushSystemClientAlert = (title: string, message: string) => {
    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        title,
        message,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  const triggerSocialShareTracking = (productId: string, platform: string) => {
    logAnalyticsEvent('search', `/shop/share`, { productId, platform });
    pushSystemClientAlert('Social Shared Securely', `Shared item code with ${platform}. Thank you for promoting Elite Basket!`);
  };

  // --- DYNAMIC SEARCH & MULTI-FACET FILTER COMPUTATIONS ---
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                          p.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'All' || p.category === filters.category;
    const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
    const matchesRating = p.rating >= filters.minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return b.rating - a.rating; // Default popular / rating metrics
  });

  const categoriesList = ['All', 'Electronics', 'Accessories', 'Home & Living', 'Outdoor', 'Apparel'];

  if (isAppLoading) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ${
        darkMode ? 'bg-[#1E2229]' : 'bg-[#F7F7F5]'
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center px-4"
        >
          {/* Elite Basket Icon with Royal Amber/Gold Color Fills */}
          <div className="relative mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute -inset-5 rounded-full border border-dashed border-[#9A845A]/40"
            />
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#9A845A] to-[#C5B083] p-4 flex items-center justify-center shadow-xl shadow-[#9A845A]/20">
              <Layers className="h-8 w-8 text-white fill-amber-100/10 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-sans font-bold tracking-widest text-[#9A845A] uppercase">
            ELITE BASKET
          </h1>
          
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#9A845A] to-transparent mt-3" />
          
          <p className={`text-[10px] font-mono tracking-widest uppercase mt-3 ${darkMode ? 'text-gray-400' : 'text-stone-700'}`}>
            Curating Haute-Couture & Fine Tech
          </p>
          
          <div className="mt-8 flex items-center space-x-1.5 bg-[#9A845A]/10 px-3 py-1.5 rounded-full border border-[#9A845A]/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9A845A] animate-ping" />
            <span className="text-[10px] font-mono text-[#9A845A] font-bold">Securing Boutique Gateway...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans ${
      darkMode ? 'bg-[#1E2229] text-stone-100 selection:bg-[#9A845A]/20' : 'bg-[#F7F7F5] text-[#22252A] selection:bg-[#9A845A]/15'
    }`}>
      
      {/* Top Banner indicating connectivity states if simulated offline */}
      {offlineMode && (
        <div className="bg-amber-600/95 text-white text-xs h-9 font-mono flex items-center justify-center space-x-2 relative z-50">
          <Info className="h-4 w-4 animate-bounce shrink-0" />
          <span>Local Environment set to **Offline Simulation Mode**. Stripe PCI transaction engines and master admin database updates are held.</span>
          <button onClick={() => setOfflineMode(false)} className="underline hover:text-amber-250 font-bold ml-2">Re-connect</button>
        </div>
      )}

      {/* Global E-commerce Navigation bar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          logAnalyticsEvent('page_view', `/${tab}`);
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCart={() => setShowCart(!showCart)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        notifications={notifications}
        emails={emails}
        onMarkNotificationsRead={onMarkAllNotificationsAsRead}
        offlineMode={offlineMode}
        toggleOfflineMode={() => setOfflineMode(!offlineMode)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[75vh]" id="primary-main-wrapper">
        
        {/* VIEW 1: PRODUCT CATALOGUE SHOP ROUTE */}
        {activeTab === 'shop' && (
          <div className="space-y-6 text-left animate-fade-in" id="shop-catalog-panel">
            
            {/* Banner Jumbotron hero */}
            <div className={`p-6 sm:p-10 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden ${
              darkMode ? 'bg-[#1a1c22]/60 border-stone-800' : 'bg-white border-stone-200/80 shadow-sm'
            }`}>
              {/* Left Column: Brand description */}
              <div className="space-y-4 max-w-xl text-left z-10 flex-grow">
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#9A845A] font-extrabold flex items-center space-x-1">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#9A845A]" />
                  <span>Elite Basket Luxury Curated Showcase</span>
                </span>
                
                <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight leading-none text-[#9A845A]">
                  Elite Basket
                </h1>

                <p className="text-xs text-stone-500 dark:text-stone-300 leading-relaxed font-sans">
                  Welcome to Elite Basket. This elegant marketplace features authenticated Stripe mocks, real-time logistics tracking, customized loyalty milestones, and a luxury catalog curated meticulously for both Indian and international tastes. Reach out to our AI Boutique Concierge below for styling pairings.
                </p>
                
                {currentUser && (
                  <div className="inline-flex items-center space-x-2 bg-[#9A845A]/10 border border-[#9A845A]/25 rounded-xl py-1 px-3 text-xs text-[#9A845A] mt-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                    <span>Loyalty Level: Gold Tier Account (★ {currentUser.loyaltyPoints} points)</span>
                  </div>
                )}
              </div>

              {/* Right Column: Dynamic Slider with Lateral Slide Motion (Image Left, Text Right) */}
              <div className="w-full lg:w-[480px] shrink-0 relative flex flex-col items-center">
                <div className="absolute -inset-2 bg-[#9A845A]/5 blur-3xl rounded-full pointer-events-none" />
                
                {/* Active Slider Window */}
                <div className={`w-full h-64 relative overflow-hidden rounded-2xl border shadow-xl ${
                  darkMode ? 'bg-slate-950/80 border-stone-800' : 'bg-white border-stone-200'
                }`}>
                  <AnimatePresence>
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className={`absolute inset-0 p-4 flex flex-row items-stretch gap-4 rounded-2xl ${
                        darkMode ? 'bg-slate-950' : 'bg-white'
                      }`}
                    >
                      {/* Left Side: Product Image (Image component in Left Container) */}
                      <div className={`w-2/5 shrink-0 flex items-center justify-center p-2 rounded-xl border ${
                        darkMode ? 'bg-[#15181c] border-stone-800/60' : 'bg-stone-50 border-stone-100'
                      }`}>
                        <img 
                          src={LUXURY_SLIDES[activeSlide].image} 
                          alt={LUXURY_SLIDES[activeSlide].name} 
                          className="max-h-full max-w-full object-contain rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => {
                            const origProd = products.find(p => p.id === LUXURY_SLIDES[activeSlide].id);
                            if (origProd) setSelectedProduct(origProd);
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Right Side: Text & Detail description */}
                      <div className="w-3/5 flex flex-col justify-between py-1 text-left relative pr-6">
                        <div>
                          {/* Heading: Slot & Category Badges */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[8px] font-bold font-sans uppercase tracking-widest bg-[#9A845A] text-white px-2 py-0.5 rounded shadow-sm truncate">
                              {LUXURY_SLIDES[activeSlide].category}
                            </span>
                            <span className="text-[8px] font-mono font-bold text-[#9A845A] bg-[#9A845A]/15 border border-[#9A845A]/25 px-2 py-0.5 rounded">
                              Slot #{activeSlide + 1}
                            </span>
                          </div>

                          {/* Product title */}
                          <h4 
                            className="text-xs sm:text-sm font-sans font-extrabold leading-tight text-stone-900 dark:text-stone-100 hover:text-[#9A845A] transition-colors cursor-pointer line-clamp-2"
                            onClick={() => {
                              const origProd = products.find(p => p.id === LUXURY_SLIDES[activeSlide].id);
                              if (origProd) setSelectedProduct(origProd);
                            }}
                          >
                            {LUXURY_SLIDES[activeSlide].name}
                          </h4>

                          {/* Tagline text description */}
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            {LUXURY_SLIDES[activeSlide].tagline}
                          </p>
                        </div>

                        {/* Price tier and dynamic inspecting button */}
                        <div className="flex items-center justify-between gap-2 mt-2">
                          <span className="text-xs sm:text-sm font-extrabold text-[#9A845A] font-mono leading-none">
                            ${LUXURY_SLIDES[activeSlide].price}.00
                          </span>

                          <button
                            onClick={() => {
                              const origProd = products.find(p => p.id === LUXURY_SLIDES[activeSlide].id);
                              if (origProd) setSelectedProduct(origProd);
                            }}
                            className="text-[9px] font-sans font-bold px-2.5 py-1.5 rounded-lg bg-[#9A845A] hover:bg-[#85714d] active:scale-95 transition-all text-white shadow-sm flex items-center space-x-1 cursor-pointer"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Manual Arrow Controls Overlay */}
                  <div className="absolute inset-y-2 left-1 right-1 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide((prev) => (prev - 1 + LUXURY_SLIDES.length) % LUXURY_SLIDES.length);
                      }}
                      className="p-1.5 rounded-full bg-stone-900/50 hover:bg-[#9A845A] text-white transition-colors duration-200 pointer-events-auto backdrop-blur-sm shadow hover:scale-110 active:scale-95 cursor-pointer"
                      title="Previous premium slot"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide((prev) => (prev + 1) % LUXURY_SLIDES.length);
                      }}
                      className="p-1.5 rounded-full bg-stone-900/50 hover:bg-[#9A845A] text-white transition-colors duration-200 pointer-events-auto backdrop-blur-sm shadow hover:scale-110 active:scale-95 cursor-pointer"
                      title="Next premium slot"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Slideshow Dot Indicators */}
                <div className="flex gap-1.5 mt-3 justify-center z-10">
                  {LUXURY_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === idx ? 'w-5 bg-[#9A845A]' : 'w-1.5 bg-stone-500/40 hover:bg-stone-500'
                      }`}
                      title={`Navigate to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Structured Search input and Filters widget block */}
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-[#1a1c22]/50 border-stone-800/80' : 'bg-white border-stone-200/80 shadow-sm'
            } space-y-3`}>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow text-left">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <Search className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="text"
                    className={`w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-[#9A845A] ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                    placeholder="Search premium acoustic keyboards, TAS Merino hoodies..."
                    value={filters.search}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, search: e.target.value }));
                      logAnalyticsEvent('search', `/shop`, { searchString: e.target.value });
                    }}
                    id="search-input-field"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setExpandedFilters(!expandedFilters)}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold leading-normal flex items-center space-x-1.5 focus:outline-none transition-colors ${
                      expandedFilters || filters.minRating > 0 || filters.minPrice > 0
                        ? 'bg-[#9A845A]/15 border-[#9A845A] text-[#9A845A]'
                        : (darkMode ? 'bg-[#1a1c22] border-stone-800 text-stone-300 hover:text-white' : 'bg-white border-stone-200 text-stone-600 hover:text-black')
                    }`}
                    id="expand-filters-btn"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Multi-Filters</span>
                  </button>

                  <select
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    id="sort-select-field"
                  >
                    <option value="popular">Popular Recommendations</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated Stars</option>
                  </select>
                </div>
              </div>

              {/* Collapsed parameters fields */}
              {expandedFilters && (
                <div className={`p-4 border border-dashed rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs select-none text-left ${
                  darkMode ? 'border-layer border-slate-800' : 'border-gray-200'
                }`}>
                  <div>
                    <label className="block text-[10px] uppercase font-mono mb-1.5 text-stone-600 dark:text-stone-400">Price Ceiling Limit: ${filters.maxPrice}</label>
                    <input
                      type="range"
                      min="0"
                      max="600"
                      step="25"
                      className="w-full h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#9A845A]"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                      id="price-range-slider"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                      <span>$0 USD</span>
                      <span>$600 USD Ceiling</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono mb-1.5 text-stone-600 dark:text-stone-400">Star Rating Floor</label>
                    <div className="flex h-6 space-x-1 items-center">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, minRating: stars }))}
                          className="text-amber-500 hover:scale-110 h-full"
                          id={`filter-star-btn-${stars}`}
                        >
                          <Star className={`h-4.5 w-4.5 ${stars <= filters.minRating ? 'fill-current' : 'opacity-30'}`} />
                        </button>
                      ))}
                      {filters.minRating > 0 && (
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                          className="text-[10px] text-red-400 underline ml-2"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono mb-1.5 text-gray-455">Reset parameters</label>
                    <button
                      onClick={() => setFilters({
                        search: '',
                        category: 'All',
                        minPrice: 0,
                        maxPrice: 600,
                        minRating: 0,
                        sortBy: 'popular'
                      })}
                      className="px-3.5 py-1 text-[11px] font-sans font-semibold border rounded-lg hover:bg-slate-850 duration-200"
                      id="reset-filters-btn"
                    >
                      Restore Defaults
                    </button>
                  </div>
                </div>
              )}

              {/* Horizontal scroll category tags */}
              <div className="flex items-center space-x-2.5 overflow-x-auto pr-2 py-1 select-none">
                {categoriesList.map((catOpt) => (
                  <button
                    key={catOpt}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, category: catOpt }));
                      logAnalyticsEvent('search', `/shop/category`, { categoryName: catOpt });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold border transition-all truncate shrink-0 ${
                      filters.category === catOpt
                        ? 'bg-[#9A845A] border-[#9A845A] text-white shadow-sm'
                        : (darkMode ? 'bg-[#1a1c22] border-stone-800/80 text-stone-300 hover:text-white' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-black')
                    }`}
                    id={`filter-cat-${catOpt.replace(/\s+/g, '-')}`}
                  >
                    {catOpt}
                  </button>
                ))}
              </div>

            </div>

            {/* Product display grid layout */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center text-gray-400 border border-dashed rounded-3xl border-slate-800">
                <Search className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <h4 className="font-semibold text-xs">No matching merchandise found</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Try typing another pricing filter scope or adjusting keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="product-grid-catalogue">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    darkMode={darkMode}
                    onAddToCart={handleAddToCart}
                    onViewDetails={(p) => {
                      setSelectedProduct(p);
                      logAnalyticsEvent('page_view', `/product/${p.id}`);
                    }}
                    onTrackShare={triggerSocialShareTracking}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: ACCOUNT MANAGEMENT ROUTE */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in" id="dashboard-tab-panel">
            {currentUser ? (
              <UserDashboard
                currentUser={currentUser}
                orders={orders}
                darkMode={darkMode}
                products={products}
                onTrackOrder={(ord) => {
                  setTrackedOrder(ord);
                  setActiveTab('tracker');
                }}
                onViewProduct={(p) => setSelectedProduct(p)}
                onLogout={async () => {
                  try {
                    if (!offlineMode) {
                      await fetch('/api/auth/logout', { method: 'POST' });
                    }
                    setCurrentUser(null);
                    pushSystemClientAlert('Session Cleared 🔒', 'Successfully logged out of your boutique account session.');
                  } catch (err) {
                    setCurrentUser(null);
                  }
                }}
              />
            ) : (
              <LoginScreen
                onLoginSuccess={(user) => {
                  setCurrentUser(user);
                  refreshBoutiqueState();
                }}
                darkMode={darkMode}
                offlineMode={offlineMode}
                pushAlert={pushSystemClientAlert}
              />
            )}
          </div>
        )}

        {/* VIEW 3: SHIPMENT DISPATCHES LOGISTICS */}
        {activeTab === 'tracker' && (
          <div className="animate-fade-in" id="tracker-tab-panel">
            {trackedOrder ? (
              <RealTimeTracker
                order={trackedOrder}
                darkMode={darkMode}
                onClose={() => {
                  setTrackedOrder(null);
                  setActiveTab('dashboard');
                }}
              />
            ) : (
              <div className="p-8 text-center max-w-md mx-auto flex flex-col items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-400 mb-2" />
                <h3 className="font-sans font-bold text-lg">No Active Shipment Tracker</h3>
                <p className="text-xs text-gray-400 mt-1">Visit your personalized account dashboard below to select and track historic shipped packages in real-time.</p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 font-sans font-semibold rounded-lg text-xs"
                >
                  Visit My Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: ADMIN CONSOLE */}
        {currentUser?.role === 'admin' && activeTab === 'admin' && (
          <div className="animate-fade-in" id="admin-tab-panel">
            <AdminDashboard
              products={products}
              orders={orders}
              darkMode={darkMode}
              onAddProduct={handleAddProductAdmin}
              onUpdateProductStock={handleUpdateProductStockAdmin}
              onUpdateOrderStatus={handleUpdateOrderStatusAdmin}
            />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className={`border-t py-8 mt-12 text-xs select-none transition-colors ${
        darkMode ? 'bg-[#0a0807] border-stone-850 text-stone-400' : 'bg-[#f7f3eb] border-stone-200/80 text-stone-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-sans font-bold text-stone-800 dark:text-stone-100 uppercase tracking-widest text-[10px] block">ELITE BASKET MERCHANDISE INC.</p>
          <p className="text-[10px]">Internship Project Showcase • Secured via PCI compliant mock Stripe. Registered with full-stack analytics trackers.</p>
        </div>
      </footer>

      {/* INJECTABLE MODAL DIALOGS AND FLOATING DRAWERS */}
      
      {/* Product Detail Sheet modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          darkMode={darkMode}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onAddReview={handleAddReview}
          allProducts={products}
          onViewProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Cart Drawer index */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cart}
        darkMode={darkMode}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setShowCart(false);
          if (cart.length === 0) {
            alert('Your basket is empty!');
            return;
          }
          if (typeof window !== 'undefined' && (window as any).dispatchSecureCheckoutTrigger) {
            (window as any).dispatchSecureCheckoutTrigger();
          }
        }}
      />

      {/* Checkout Wizard flow (only if cart has objects and triggered) */}
      {cart.length > 0 && showCart === false && (
        /* Simple check overlay to pop-up wizard */
        <div className="hidden" />
      )}

      {/* Toggle Cartesian checkout wizard trigger */}
      {/* If cart is not empty, show a sticky checkout summary bar at bottom-right corner for high efficiency */}
      {cart.length > 0 && !showCart && activeTab === 'shop' && (
        <button
          onClick={() => {
            logAnalyticsEvent('checkout_start', '/shop');
            setShowCart(true);
          }}
          className="fixed bottom-24 right-6 z-40 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs py-3 px-5 rounded-full shadow-2xl flex items-center space-x-2 transition-transform duration-200 hover:scale-105 active:scale-95 border-2 border-white/10"
          id="sticky-checkout-trigger"
        >
          <ShoppingBag className="h-4.5 w-4.5 text-yellow-300 animate-bounce" />
          <span>Checkout: ${cart.reduce((s, i) => s + (i.product.price * i.quantity), 0)}.00 AUD ({cart.reduce((s, i) => s + i.quantity, 0)} units)</span>
        </button>
      )}

      {/* True Checkout wizard overlay */}
      {cart.length > 0 && !showCart && (
        /* Triggers the interactive popup portal wizard if triggered by the cart drawer proceeding */
         <div />
      )}

      {/* Handle displaying Checkout Wizard on dynamic actions */}
      {/* We can manage active modals via a specific string state: currentModal: 'checkout' | null */}
      {/* Let's embed the checkout wizard directly inline on a state block check */}
      {cart.length > 0 && (
        <div className="hidden" />
      )}

      {/* We manage the Checkout Wizard display via drawer proceed triggers */}
      {/* Let's create `checkoutModalOpen` state explicitly to mount checkout stepper smoothly! */}
      
      <CheckoutWizardContainer 
        cartItems={cart}
        darkMode={darkMode}
        currentUser={currentUser}
        onPlaceOrder={executeSecureCheckoutSecured}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Floating Smart Client stylized Assistant chat bubble thread */}
      <AIAssistant 
        darkMode={darkMode}
        onViewProductById={(pId) => {
          const matched = products.find(p => p.id === pId);
          if (matched) setSelectedProduct(matched);
        }}
      />

    </div>
  );
}

// Inline wrapper handling state tracking block to open and close checkout wizard cleanly
interface CheckoutWizardWrapperProps {
  cartItems: CartItem[];
  darkMode: boolean;
  currentUser: User | null;
  onPlaceOrder: (address: any, paymentDetails: any) => Promise<Order>;
  onSuccess: (order: Order) => void;
}

function CheckoutWizardContainer({
  cartItems,
  darkMode,
  currentUser,
  onPlaceOrder,
  onSuccess
}: CheckoutWizardWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // We synchronize checkout modal trigger with global window events
    // dispatched from the Cart drawer proceeding to bypass prop drill complexity!
    const handleTriggerCheckout = () => {
      setIsOpen(true);
    };

    window.addEventListener('trigger-secure-checkout', handleTriggerCheckout);
    return () => window.removeEventListener('trigger-secure-checkout', handleTriggerCheckout);
  }, []);

  if (!isOpen || cartItems.length === 0) return null;

  return (
    <CheckoutWizard
      onClose={() => setIsOpen(false)}
      cartItems={cartItems}
      darkMode={darkMode}
      currentUser={currentUser}
      onPlaceOrder={onPlaceOrder}
      onSuccess={(order) => {
        setIsOpen(false);
        onSuccess(order);
      }}
    />
  );
}

// Trigger secure checkout events helper passed to cart sidebar proceed click
if (typeof window !== 'undefined') {
  (window as any).dispatchSecureCheckoutTrigger = () => {
    window.dispatchEvent(new CustomEvent('trigger-secure-checkout'));
  };
}
