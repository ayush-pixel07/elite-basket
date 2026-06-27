/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Calendar, MessageSquare, Check, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailsModalProps {
  product: Product;
  darkMode: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddReview: (productId: string, review: { rating: number; comment: string; userName: string }) => void;
  allProducts: Product[];
  onViewProduct: (product: Product) => void;
}

export default function ProductDetailsModal({
  product,
  darkMode,
  onClose,
  onAddToCart,
  onAddReview,
  allProducts,
  onViewProduct
}: ProductDetailsModalProps) {
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newReviewerName, setNewReviewerName] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddReview(product.id, {
      rating: newRating,
      comment: newComment,
      userName: newReviewerName.trim() || 'Anonymous Client'
    });

    setSuccessMsg(true);
    setNewComment('');
    setNewReviewerName('');
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  // Recommendations: find similar products in the same category
  const recommendations = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  // Ratings calculation breakdown
  const totalReviews = product.reviews.length;
  const ratingDistribution = [0, 0, 0, 0, 0]; // index 0 = 5 star, 4 = 1 star
  product.reviews.forEach(r => {
    const star = Math.max(1, Math.min(5, r.rating));
    ratingDistribution[5 - star]++;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Background Mask */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity" 
      />

      {/* Main Sheet */}
      <div className={`relative rounded-3xl overflow-hidden max-w-4xl w-full text-left shadow-2xl border transform transition-all flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh] ${
        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-150 text-gray-800'
      }`}>
        
        {/* Close Button absolute */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full focus:outline-none transition-colors shadow ${
            darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-slate-700'
          }`}
          id="close-details-btn"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Left Side: Product Zoom and specifications */}
        <div className={`w-full md:w-5/12 p-6 flex flex-col justify-between border-r ${
          darkMode ? 'border-slate-800 bg-slate-950/20' : 'border-gray-100 bg-gray-50/50'
        }`}>
          <div className="overflow-hidden rounded-2xl w-full aspect-square mb-6 shadow-sm border border-transparent/10">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transform hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-2 flex items-center space-x-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Lifetime Guarantee Spec</span>
            </h4>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className={`text-xs flex items-start space-x-2 ${darkMode ? 'text-stone-300' : 'text-stone-800 font-medium'}`}>
                  <Check className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Primary Info, Reviews list and Write review form (Scroller) */}
        <div className={`w-full md:w-7/12 p-6 overflow-y-auto h-[55vh] md:h-[80vh] flex flex-col justify-between`}>
          <div>
            {/* Header Product description */}
            <span className={`text-[10px] uppercase font-sans font-extrabold tracking-widest ${darkMode ? 'text-gray-400' : 'text-stone-600 font-bold'}`}>
              {product.category} BOUTIQUE
            </span>
            <h2 className="text-2xl font-bold font-sans mt-0.5 mb-2 leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center space-x-3 mb-4">
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                ${product.price}.00
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                product.stock > 0 
                  ? 'bg-emerald-500/15 text-emerald-500' 
                  : 'bg-red-500/15 text-red-500'
              }`}>
                {product.stock > 0 ? `${product.stock} Units in stock` : 'Awaiting Inventory Restock'}
              </span>
            </div>

            <p className={`text-xs leading-relaxed mb-6 ${darkMode ? 'text-gray-400' : 'text-stone-800'}`}>
              {product.description}
            </p>

            {/* Quick add to cart: Gold Accent Button (10% rule) */}
            {product.stock > 0 && (
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-[#9A845A] hover:bg-[#85714d] text-white font-sans font-bold text-xs py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 mb-6 flex items-center justify-center space-x-2 active:scale-95 duration-150"
                id="details-add-to-cart-btn"
              >
                <span>Proceed to Add to Basket</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Reviews header & Average rating breakdowns */}
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span>Customer Satisfaction ({totalReviews})</span>
            </h3>

            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl p-4 mb-6 text-center sm:text-left ${
              darkMode ? 'bg-slate-800/40' : 'bg-gray-50'
            }`}>
              <div className="flex flex-col items-center justify-center sm:border-r sm:border-slate-700/50">
                <span className="text-3xl font-extrabold leading-none">{product.rating}</span>
                <div className="flex items-center text-amber-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.round(product.rating) ? 'fill-current' : 'opacity-30'}`} 
                    />
                  ))}
                </div>
                <span className={`text-[10px] mt-1 ${darkMode ? 'text-gray-400' : 'text-stone-600 font-semibold'}`}>Total score</span>
              </div>
              <div className="col-span-2 space-y-1 text-xs">
                {ratingDistribution.map((count, index) => {
                  const starNum = 5 - index;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={starNum} className={`flex items-center space-x-2 text-[10px] ${darkMode ? 'text-gray-400' : 'text-stone-600 font-medium'}`}>
                      <span className="w-8 font-mono text-right">{starNum} Star</span>
                      <div className={`flex-grow h-1.5 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: `${percentage}%` }} 
                        />
                      </div>
                      <span className="w-6 font-mono text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews display listing */}
            <div className="space-y-4 mb-6">
              {product.reviews.length === 0 ? (
                <p className={`text-xs text-center py-4 italic ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>No verified reviews has been cued. Be the first to express thoughts!</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className={`p-3.5 rounded-xl border ${
                    darkMode ? 'bg-slate-800/20 border-slate-800' : 'bg-white border-gray-100'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold">
                        <div className="h-6 w-6 rounded-full bg-slate-500/20 flex items-center justify-center text-[10px] uppercase font-bold text-blue-400">
                          {rev.userName.slice(0, 2)}
                        </div>
                        <span className={darkMode ? 'text-stone-100' : 'text-stone-900'}>{rev.userName}</span>
                      </div>
                      <div className="flex text-amber-500 scale-90">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'opacity-20'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className={`text-xs leading-normal pl-7 ${darkMode ? 'text-stone-300' : 'text-stone-900 font-medium'}`}>{rev.comment}</p>
                    <div className="text-[9px] text-stone-500 dark:text-stone-400 text-right mt-1 font-mono">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Write a review forms */}
            <div className={`rounded-2xl p-4 border mb-6 text-left ${
              darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-gray-50 border-gray-150'
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3">Add Custom Review</h4>
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-[10px] uppercase font-mono mb-1 ${darkMode ? 'text-gray-400' : 'text-stone-700 font-bold'}`}>Your Name</label>
                    <input
                      type="text"
                      className={`w-full text-xs p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-850'
                      }`}
                      placeholder="e.g. John Doe"
                      value={newReviewerName}
                      onChange={(e) => setNewReviewerName(e.target.value)}
                      id="review-name-input"
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] uppercase font-mono mb-1 ${darkMode ? 'text-gray-400' : 'text-stone-700 font-bold'}`}>Score Rating</label>
                    <div className="flex h-8 items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setNewRating(s)}
                          className="text-amber-500 hover:scale-110 focus:outline-none"
                          id={`review-star-btn-${s}`}
                        >
                          <Star className={`h-4.5 w-4.5 ${s <= newRating ? 'fill-current' : 'opacity-35'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-[10px] uppercase font-mono mb-1 ${darkMode ? 'text-gray-400' : 'text-stone-700 font-bold'}`}>Commentary Profile</label>
                  <textarea
                    rows={2}
                    className={`w-full text-xs p-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-850'
                    }`}
                    placeholder="Describe your tactile, acoustic, or visual quality experiences..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    id="review-comment-input"
                  />
                </div>

                {successMsg && (
                  <div className="text-emerald-500 text-xs font-semibold py-1">
                    ✓ Feedback logged onto backend index! Rating updated live!
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-sans font-bold text-xs py-2 px-4 rounded-lg transition-colors w-full"
                  id="submit-review-btn"
                >
                  Log verified Customer feedback
                </button>
              </form>
            </div>

            {/* Recommendations Shelf */}
            {recommendations.length > 0 && (
              <div className="border-t border-slate-700/50 pt-5 mt-4 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3">Elite Pairings & Recommendations</h4>
                <div className="grid grid-cols-2 gap-3">
                  {recommendations.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => onViewProduct(p)}
                      className={`p-2.5 rounded-xl border flex items-center space-x-3 cursor-pointer hover:border-stone-400 dark:hover:border-stone-600 transition-all ${
                        darkMode ? 'bg-slate-800/30 border-slate-800' : 'bg-gray-50 border-gray-200'
                      }`}
                      id={`rec-item-${p.id}`}
                    >
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="h-10 w-10 object-cover rounded-lg shrink-0" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h5 className="text-[11px] font-semibold truncate leading-tight">{p.name}</h5>
                        <span className="text-[10px] font-mono font-bold text-stone-500 dark:text-stone-400">${p.price}.00</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
