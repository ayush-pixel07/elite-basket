/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Bell, Mail, Sun, Moon, Sparkles, User as UserIcon, Shield, Layers, RefreshCw } from 'lucide-react';
import { User, PushNotification, SimulatedEmail } from '../types';

interface NavbarProps {
  currentUser: User | null;
  activeTab: 'shop' | 'dashboard' | 'admin' | 'tracker';
  setActiveTab: (tab: 'shop' | 'dashboard' | 'admin' | 'tracker') => void;
  cartCount: number;
  toggleCart: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  notifications: PushNotification[];
  emails: SimulatedEmail[];
  onMarkNotificationsRead: () => void;
  offlineMode: boolean;
  toggleOfflineMode: () => void;
}

export default function Navbar({
  currentUser,
  activeTab,
  setActiveTab,
  cartCount,
  toggleCart,
  darkMode,
  toggleDarkMode,
  notifications,
  emails,
  onMarkNotificationsRead,
  offlineMode,
  toggleOfflineMode
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmails, setShowEmails] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
      darkMode ? 'bg-[#1E2229]/95 border-stone-800/80 text-stone-100' : 'bg-white/95 border-stone-200/80 text-[#22252A]'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Platform branding */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setActiveTab('shop')} 
            className="flex items-center space-x-2.5 group focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#9A845A] to-[#C5B083] text-white shadow-md shadow-[#9A845A]/20 transition-all duration-300 transform group-hover:scale-105">
              <Layers className="h-5 w-5 fill-amber-100/10" />
            </div>
            <div className="text-left">
              <span className="font-sans font-bold text-lg tracking-tight block">ELITE BASKET</span>
              <span className="text-[10px] font-mono tracking-wider text-gray-400 block -mt-1 uppercase">EST. 2026</span>
            </div>
          </button>
          
          <div className="hidden md:flex items-center space-x-1.5 text-sm font-medium">
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'shop' 
                  ? (darkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black font-semibold')
                  : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')
              }`}
              id="nav-shop-tab"
            >
              Shop Boutique
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                activeTab === 'dashboard'
                  ? (darkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black font-semibold')
                  : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')
              }`}
              id="nav-dashboard-tab"
            >
              <UserIcon className="h-3.5 w-3.5" />
              <span>My Account</span>
            </button>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                  activeTab === 'admin'
                    ? (darkMode ? 'bg-slate-800 text-white animate-pulse' : 'bg-red-50 text-red-700 font-semibold border border-red-200')
                    : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-red-600')
                }`}
                id="nav-admin-tab"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Admin Console</span>
              </button>
            )}
          </div>
        </div>

        {/* Action Controls & Simulated Services tabs */}
        <div className="flex items-center space-x-3">
          
          {/* Offline Simulation toggle */}
          <button
            onClick={toggleOfflineMode}
            className={`hidden sm:flex items-center space-x-1 text-xs border rounded-full px-3 py-1 transition-all ${
              offlineMode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 font-semibold'
                : darkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-gray-200 hover:bg-gray-50 text-gray-500'
            }`}
            title="Toggle simulated network connectivity drops"
            id="nav-offline-toggle"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${offlineMode ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`} />
            <span>{offlineMode ? 'Offline Simulated' : 'Cloud Connected'}</span>
          </button>

          {/* Dark Mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-all focus:outline-none ${
              darkMode ? 'hover:bg-slate-800 text-amber-400' : 'hover:bg-gray-100 text-slate-600'
            }`}
            aria-label="Toggle visual theme"
            id="nav-theme-toggle"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Automated Mail notifications (Inbox simulation) */}
          <div className="relative">
            <button
              onClick={() => {
                setShowEmails(!showEmails);
                setShowNotifications(false);
              }}
              className={`p-2 rounded-lg transition-all relative focus:outline-none ${
                showEmails ? (darkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-600')
              }`}
              title="View automated transactional email updates"
              id="nav-email-toggle"
            >
              <Mail className="h-5 w-5" />
              {emails.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white font-mono text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {emails.length}
                </span>
              )}
            </button>

            {/* Email Inbox simulator menu dropdown */}
            {showEmails && (
              <div className={`absolute right-0 mt-3 w-80 sm:w-96 rounded-xl shadow-xl border overflow-hidden transform origin-top-right transition-all z-50 ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-100 text-gray-800'
              }`}>
                <div className="p-3 border-b flex items-center justify-between border-slate-700 bg-slate-950/20">
                  <div className="flex items-center space-x-1.5">
                    <Mail className="h-4 w-4 text-sky-400" />
                    <span className="font-semibold text-xs tracking-tight uppercase">Simulated Email Client</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">{currentUser?.email}</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-700/50">
                  {emails.length === 0 ? (
                    <div className="p-6 text-center text-xs text-gray-400">
                      Log in or checkout to see business-automated transaction notifications here immediately.
                    </div>
                  ) : (
                    emails.map((em) => (
                      <div key={em.id} className="p-3 text-left hover:bg-slate-500/10 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-blue-500">{em.type.replace('_', ' ').toUpperCase()}</span>
                          <span className="text-[9px] font-mono text-gray-400">{new Date(em.sentAt).toLocaleTimeString()}</span>
                        </div>
                        <h4 className="font-semibold text-xs mt-1 truncate">{em.subject}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-3 whitespace-pre-line leading-relaxed">{em.body}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2.5 text-center border-t border-slate-700 bg-slate-950/20">
                  <span className="text-[10px] font-mono text-gray-400">Simulates real automated dispatch emails</span>
                </div>
              </div>
            )}
          </div>

          {/* Push App Alerts notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowEmails(false);
                if (!showNotifications && unreadNotifications > 0) {
                  onMarkNotificationsRead();
                }
              }}
              className={`p-2 rounded-lg transition-all relative focus:outline-none ${
                showNotifications ? (darkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-black') : (darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-600')
              }`}
              title="System operation and tracking logs"
              id="nav-alerts-toggle"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications panel dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 mt-3 w-80 rounded-xl shadow-xl border overflow-hidden transform origin-top-right transition-all z-50 ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-100 text-gray-800'
              }`}>
                <div className="p-3 border-b flex items-center justify-between border-slate-700 bg-slate-950/20">
                  <span className="font-semibold text-xs tracking-tight uppercase">Push Alerts Center</span>
                  <button 
                    onClick={onMarkNotificationsRead}
                    className="text-[10px] text-blue-400 hover:underline"
                    id="mark-all-read-btn"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-700/30">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-gray-400">
                      No recent alerts. Place an order to activate real-time logistics steps!
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={`p-3 text-left transition-colors ${n.read ? 'opacity-70' : 'bg-blue-500/5'}`}>
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-xs">{n.title}</span>
                          <span className="text-[9px] font-mono text-stone-500 dark:text-stone-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User profile identifier or quick login */}
          <div className={`hidden sm:flex items-center space-x-2 text-xs border rounded-lg py-1 px-2.5 ${darkMode ? 'border-slate-700/50' : 'border-stone-200'}`}>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className={`font-medium max-w-[90px] truncate ${darkMode ? 'text-gray-400' : 'text-stone-805 font-bold'}`}>
              {currentUser ? currentUser.name : 'Guest Client'}
            </span>
            {currentUser && (
              <span className="font-mono text-amber-500 bg-amber-500/10 px-1 rounded">
                ★ {currentUser.loyaltyPoints}p
              </span>
            )}
          </div>

          {/* Shopping basket checkout cart button */}
          <button
            onClick={toggleCart}
            className={`p-2.5 rounded-xl flex items-center space-x-2 border transition-all focus:outline-none shadow-sm ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white' 
                : 'bg-black border-black hover:bg-gray-800 text-white'
            }`}
            id="nav-cart-btn"
          >
            <ShoppingBag className="h-4.5 w-4.5 text-[#9A845A]" />
            <span className="font-mono text-xs font-bold leading-none">{cartCount}</span>
          </button>
          
        </div>
      </div>
    </header>
  );
}
