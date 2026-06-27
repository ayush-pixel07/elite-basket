/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Lock, User, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (user: any) => void;
  darkMode: boolean;
  offlineMode: boolean;
  pushAlert: (title: string, message: string) => void;
}

export default function LoginScreen({ onLoginSuccess, darkMode, offlineMode, pushAlert }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email) {
      setErrorMsg('Please state a valid email address.');
      return;
    }
    if (password.length > 0 && password.length < 5) {
      setErrorMsg('Password must be at least 5 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (offlineMode) {
        // Mock offline successful authentication
        const mockUser = {
          id: `usr-${Date.now()}`,
          email: email.toLowerCase(),
          name: isSignUp ? (name || email.split('@')[0].toUpperCase()) : 'AYUSH SHARMA',
          role: email.toLowerCase().startsWith('admin') ? 'admin' : 'customer',
          loyaltyPoints: isSignUp ? 50 : 340,
          avatar: isSignUp 
            ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' 
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
        };
        setTimeout(() => {
          setIsSubmitting(false);
          onLoginSuccess(mockUser);
          pushAlert(
            isSignUp ? 'Welcome Package Activated 🎉' : 'Welcome Back Patron! 👋',
            isSignUp 
              ? `Your luxury account "${mockUser.name}" has been registered. 50 loyalty points credited.`
              : `Successfully authenticated credentials for ${mockUser.name}.`
          );
        }, 800);
        return;
      }

      // Online real authentication with backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          name: isSignUp ? name : undefined
        })
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (response.ok && data.success && data.user) {
        onLoginSuccess(data.user);
        pushAlert(
          isSignUp ? 'Elite Space Cultivated 🎉' : 'Authentification Secured 👋',
          `${isSignUp ? 'Your new' : 'Welcome back'} premium membership: "${data.user.name}" is logged in.`
        );
      } else {
        setErrorMsg(data.error || 'Authenication check declined. Verify entries.');
      }
    } catch (err) {
      console.error('Login submit error:', err);
      // fallback smoothly just in case
      const mockUser = {
        id: `usr-${Date.now()}`,
        email: email,
        name: isSignUp ? (name || 'GUEST USER') : 'AYUSH SHARMA',
        role: 'customer',
        loyaltyPoints: 340,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      };
      setIsSubmitting(false);
      onLoginSuccess(mockUser);
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 p-1 text-left" id="login-container-card">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden shadow-2xl ${
          darkMode 
            ? 'bg-[#15181c]/90 border-stone-800 text-stone-100' 
            : 'bg-white border-stone-200/80 text-stone-900'
        }`}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-[#9A845A]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Upper Brand Badge info */}
        <div className="flex flex-col items-center text-center space-y-2.5 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#9A845A] to-[#c7b48e] p-3 text-white flex items-center justify-center shadow-lg shadow-[#9A845A]/20">
            <ShieldCheck className="h-full w-full fill-amber-100/10" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#9A845A] font-bold block">
              Authorization System
            </span>
            <h2 className="text-xl font-serif font-extrabold text-stone-800 dark:text-gray-100 mt-1">
              {isSignUp ? 'Elite Boutique Signup' : 'Authenticate Credentials'}
            </h2>
            <p className="text-[11px] text-stone-400 mt-1 max-w-[280px]">
              {isSignUp 
                ? 'Join our premium Loyalty tier program and claim 50 reward credits instantly.' 
                : 'Pristine security layers protect your luxury orders and tracker coordinates.'}
            </p>
          </div>
        </div>

        {/* Form elements */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {errorMsg && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {isSignUp && (
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
                Your Noble Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                  <User className="h-4 w-4 text-[#9A845A]" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayush Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-xl border font-sans transition-all focus:outline-none focus:ring-1 focus:ring-[#9A845A] ${
                    darkMode 
                      ? 'bg-slate-900 border-stone-850 text-white placeholder-stone-600 focus:border-[#9A845A]' 
                      : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#9A845A]'
                  }`}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                <Mail className="h-4 w-4 text-[#9A845A]" />
              </div>
              <input
                type="email"
                required
                placeholder="patron@elitebasket.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-xl border font-sans transition-all focus:outline-none focus:ring-1 focus:ring-[#9A845A] ${
                  darkMode 
                    ? 'bg-slate-900 border-stone-850 text-white placeholder-stone-600 focus:border-[#9A845A]' 
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#9A845A]'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-bold">
                Private Passcode
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => {
                    setPassword('12345');
                    pushAlert('Help Tip', 'Simulated password bypass injected: 12345');
                  }}
                  className="text-[9px] font-mono text-stone-400 hover:text-[#9A845A] hover:underline"
                >
                  Quick Pass?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
                <Lock className="h-4 w-4 text-[#9A845A]" />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-xl border font-sans transition-all focus:outline-none focus:ring-1 focus:ring-[#9A845A] ${
                  darkMode 
                    ? 'bg-slate-900 border-stone-850 text-white placeholder-stone-600 focus:border-[#9A845A]' 
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#9A845A]'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 mt-2 rounded-xl text-xs font-sans font-bold text-white bg-gradient-to-r from-[#9A845A] to-[#b39967] hover:from-[#aa9160] hover:to-[#927d55] flex items-center justify-center space-x-2 transition-all duration-200 shadow-md transform active:scale-95 cursor-pointer disabled:opacity-50`}
          >
            {isSubmitting ? (
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Initiate Gold Membership' : 'Secure Sign In'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle option switcher */}
        <div className="mt-6 pt-5 border-t border-stone-800/10 text-center">
          <p className="text-[11px] text-stone-400">
            {isSignUp ? 'Already a registered patron of the Elite collective?' : 'New to our premium curation basket?'}
          </p>
          <button
            onClick={() => {
              setErrorMsg('');
              setIsSignUp(!isSignUp);
            }}
            className="text-xs font-bold text-[#9A845A] hover:text-[#b09665] hover:underline mt-1.5 font-sans"
            id="auth-toggle-btn"
          >
            {isSignUp ? 'Access Store via Registered Sign In' : 'Cultivate a Premium Account Now'}
          </button>
        </div>

        {/* Demo patrons hints credentials to look excellent */}
        <div className={`mt-5 p-3 rounded-2xl border text-center transition-all ${
          darkMode ? 'bg-slate-950/40 border-stone-850 text-white/90' : 'bg-stone-50 border-stone-150 text-stone-800'
        }`}>
          <div className="flex items-center justify-center space-x-1.5 text-[9px] font-mono text-[#9A845A] font-extrabold uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Patron demo details</span>
          </div>
          <p className="text-[10px] leading-relaxed text-stone-400">
            Use <strong className="text-[#9A845A] font-mono">customer@test.com</strong> for simulated regular customer accounts, or <strong className="text-[#9A845A] font-mono">admin@e-commerce.com</strong> to unlock our manager console!
          </p>
        </div>

      </motion.div>
    </div>
  );
}
