/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Link, ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  darkMode: boolean;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onTrackShare: (productId: string, platform: string) => void;
}

export default function ProductCard({
  product,
  darkMode,
  onAddToCart,
  onViewDetails,
  onTrackShare
}: ProductCardProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const handleShare = (e: React.MouseEvent, platform: string) => {
    e.stopPropagation();
    onTrackShare(product.id, platform);

    if (platform === 'copy') {
      const shareUrl = `${window.location.origin}/product/${product.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShowCopiedAlert(true);
        setTimeout(() => setShowCopiedAlert(false), 2000);
      });
    } else if (platform === 'twitter') {
      const url = `https://twitter.com/intent/tweet?text=Check+out+the+premium+${encodeURIComponent(product.name)}+at+Elite+Goods!&url=${encodeURIComponent(window.location.origin)}`;
      window.open(url, '_blank');
    } else if (platform === 'facebook') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`;
      window.open(url, '_blank');
    }
  };

  const hasHighRating = product.rating >= 4.7;

  return (
    <div 
      className={`group rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
        darkMode 
          ? 'bg-[#181615] border-stone-850 hover:border-stone-700 hover:shadow-xl hover:-translate-y-1' 
          : 'bg-white border-stone-200 hover:border-stone-350 hover:shadow-lg hover:-translate-y-1'
      }`}
      id={`product-card-${product.id}`}
    >
      
      {/* Product Tag Badge overlays */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        <span className={`text-[9px] font-sans font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
          darkMode ? 'bg-stone-900 text-stone-200 border border-stone-800' : 'bg-stone-100 text-stone-850 border border-stone-200'
        }`}>
          {product.category}
        </span>
        {hasHighRating && (
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 flex items-center space-x-1 shadow-md">
            <Star className="h-2.5 w-2.5 fill-current" />
            <span>Award Winning</span>
          </span>
        )}
      </div>

      {/* Share / Social trigger hover */}
      <div className="absolute top-3 right-3 z-10">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareOptions(!showShareOptions);
            }}
            className={`p-2 rounded-full shadow-sm backdrop-blur-md transition-all ${
              darkMode ? 'bg-stone-900/80 text-stone-300 hover:text-white' : 'bg-white/90 text-stone-700 hover:text-black hover:shadow'
            }`}
            title="Share item with social media loops"
            id={`share-btn-${product.id}`}
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>

          {showShareOptions && (
            <div className={`absolute right-0 mt-1 flex flex-col gap-1.5 p-1.5 rounded-lg border shadow-xl z-20 ${
              darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'
            }`}>
              <button
                onClick={(e) => handleShare(e, 'twitter')}
                className="p-1.5 hover:bg-sky-500/10 rounded text-sky-400"
                title="Share to Twitter/X"
                id={`twitter-share-${product.id}`}
              >
                <Twitter className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={(e) => handleShare(e, 'facebook')}
                className="p-1.5 hover:bg-blue-600/10 rounded text-blue-500"
                title="Share to Facebook"
                id={`facebook-share-${product.id}`}
              >
                <Facebook className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={(e) => handleShare(e, 'copy')}
                className="p-1.5 hover:bg-emerald-500/10 rounded text-emerald-400"
                title="Copy product link"
                id={`link-share-${product.id}`}
              >
                <Link className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Copied Feedback Alert overlay */}
      {showCopiedAlert && (
        <div className="absolute top-12 right-3 z-[25] bg-emerald-600 text-white text-[10px] py-1 px-2.5 rounded-md shadow-md font-sans">
          Link copied! Logged
        </div>
      )}

      {/* Img Box Header */}
      <div 
        onClick={() => onViewDetails(product)}
        className="w-full aspect-square relative overflow-hidden rounded-t-2xl cursor-pointer bg-stone-500/5 flex items-center justify-center p-4 border-b border-stone-150/10"
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full rounded-xl transform transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Animated slide mask */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="bg-white text-stone-900 rounded-full px-4 py-2 text-xs font-semibold flex items-center space-x-1 hover:bg-gray-100 shadow"
            id={`inspect-btn-${product.id}`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Specifications</span>
          </button>
        </div>
      </div>

      {/* Info Wrapper Body */}
      <div className="p-4 flex flex-col flex-grow text-left">
        
        {/* Star evaluation */}
        <div className="flex items-center space-x-1 text-[#9A845A] mb-1.5">
          <Star className="h-3.5 w-3.5 fill-current text-[#9A845A]" />
          <span className="text-xs font-bold text-[#9A845A]">{product.rating}</span>
          <span className={`text-[10px] ${darkMode ? 'text-stone-400' : 'text-stone-700 font-medium'}`}>({product.reviews.length} reviews)</span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onViewDetails(product)}
          className={`font-sans font-bold text-sm tracking-tight cursor-pointer leading-snug line-clamp-1 mb-1 hover:underline ${
            darkMode ? 'text-stone-100' : 'text-stone-900'
          }`}
        >
          {product.name}
        </h3>

        {/* Short description body (higher contrast for sunlight readability) */}
        <p className={`text-xs line-clamp-2 leading-relaxed mb-4 flex-grow ${darkMode ? 'text-stone-300' : 'text-stone-800 font-medium'}`}>
          {product.description}
        </p>

        {/* Action prices and basket operations footer */}
        <div className="flex items-center justify-between border-t border-stone-200 dark:border-stone-800 pt-3 mt-auto">
          <div>
            <span className={`text-[10px] uppercase tracking-widest block font-mono h-3 ${darkMode ? 'text-stone-500' : 'text-stone-700 font-bold'}`}>Price</span>
            <span className={`text-base font-bold font-sans ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
              ${product.price}.00
            </span>
          </div>

          <div className="text-right">
            {product.stock === 0 ? (
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-red-500/20">
                Out Of Stock
              </span>
            ) : (
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-mono hidden group-hover:inline ${darkMode ? 'text-stone-400' : 'text-stone-700 font-semibold'}`}>
                  {product.stock} left
                </span>
                {/* 10% Rule: A glorious premium gold checkout button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="p-2.5 rounded-xl transition-all duration-250 outline-none flex items-center bg-[#9A845A] hover:bg-[#85714d] active:bg-[#6c5b3e] text-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                  title="Add to shopping basket"
                  id={`add-to-cart-btn-${product.id}`}
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
