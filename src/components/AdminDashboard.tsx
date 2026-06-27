/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PackageOpen, DollarSign, Eye, Search, PlusCircle, Edit3, ClipboardList, TrendingUp, HelpCircle, Layers, Check, Database } from 'lucide-react';
import { Product, Order } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  darkMode: boolean;
  onAddProduct: (product: any) => void;
  onUpdateProductStock: (productId: string, stock: number) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export default function AdminDashboard({
  products,
  orders,
  darkMode,
  onAddProduct,
  onUpdateProductStock,
  onUpdateOrderStatus
}: AdminDashboardProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'analytics' | 'inventory' | 'orders'>('analytics');
  
  // Analytics State loaded from server
  const [stats, setStats] = useState<any>({
    revenue: 0,
    views: 1450,
    searches: 285,
    carts: 120,
    categoryChart: [],
    weeklySales: []
  });

  // Add Product State
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Electronics');
  const [newProdPrice, setNewProdPrice] = useState('149');
  const [newProdStock, setNewProdStock] = useState('15');
  const [newProdFeatures, setNewProdFeatures] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit inline stock states
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  useEffect(() => {
    // Fetch live statistics values
    fetch('/api/analytics/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(err => console.error('Error fetching analytics:', err));
  }, [orders, products]);

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) {
      alert('Product primary name and price required.');
      return;
    }

    onAddProduct({
      name: newProdName,
      description: newProdDesc || 'Premium, finely calibrated commercial merchandise curated by Elite Basket.',
      category: newProdCategory,
      price: Number(newProdPrice),
      stock: Number(newProdStock),
      image: newProdImage || '',
      features: newProdFeatures ? newProdFeatures.split(',').map(f => f.trim()) : ['Sought-after designer edition', 'Built for ergonomic durability']
    });

    // Reset Form
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice('149');
    setNewProdStock('15');
    setNewProdFeatures('');
    setNewProdImage('');
    setShowAddForm(false);
  };

  const handleSaveStock = (pId: string) => {
    onUpdateProductStock(pId, tempStockValue);
    setEditingStockId(null);
  };

  // SVG Chart calculation parameters
  const chartHeight = 120;
  const chartWidth = 320;
  const maxWeeklySale = stats.weeklySales.length > 0 
    ? Math.max(...stats.weeklySales.map((w: any) => w.sales)) 
    : 1000;

  return (
    <div className="space-y-6 text-left max-w-6xl mx-auto" id="admin-dashboard-container">
      
      {/* Menu Sub Navigation headers */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100/10 pb-3">
        <div>
          <h2 className="text-xl font-sans font-bold tracking-tight">Admin Console</h2>
          <p className="text-xs text-gray-400 mt-0.5">Inventory optimization, shipping logistics, and customer engagement metrics.</p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-950/20 p-1 border border-slate-705/10 rounded-xl text-xs">
          <button
            onClick={() => setActiveAdminSubTab('analytics')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeAdminSubTab === 'analytics'
                ? (darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black shadow-sm')
                : 'text-gray-400 hover:text-white'
            }`}
            id="admin-tab-analytics"
          >
            <TrendingUp className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
            <span>Store Metrics</span>
          </button>
          <button
            onClick={() => setActiveAdminSubTab('inventory')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeAdminSubTab === 'inventory'
                ? (darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black shadow-sm')
                : 'text-gray-400 hover:text-white'
            }`}
            id="admin-tab-inventory"
          >
            <Database className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
            <span>Inventory Stocks</span>
          </button>
          <button
            onClick={() => setActiveAdminSubTab('orders')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeAdminSubTab === 'orders'
                ? (darkMode ? 'bg-slate-800 text-white animate-pulse' : 'bg-white text-black shadow-sm')
                : 'text-gray-400 hover:text-white'
            }`}
            id="admin-tab-orders"
          >
            <ClipboardList className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
            <span>Shipping Dispatches</span>
          </button>
        </div>
      </div>

      {activeAdminSubTab === 'analytics' && (
        <div className="space-y-6" id="admin-analytics-view">
          
          {/* Bento-grid counters banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-slate-850/35 border-slate-800' : 'bg-white border-gray-150 b-shadow-sm shadow-sm'
            }`}>
              <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-emerald-500 block">Total Revenue (Stripe Gate)</span>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <DollarSign className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-bold font-sans">${stats.revenue.toFixed(2)}</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-slate-850/35 border-slate-800' : 'bg-white border-gray-150 b-shadow-sm shadow-sm'
            }`}>
              <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-blue-500 block">Client Impressions</span>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Eye className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-bold font-sans">{stats.views} views</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-slate-850/35 border-slate-800' : 'bg-white border-gray-150 b-shadow-sm shadow-sm'
            }`}>
              <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-orange-500 block">Search Filter Queries</span>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <div className="p-1.5 bg-orange-500/10 text-orange-500 rounded-lg">
                  <Search className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-bold font-sans">{stats.searches} clicks</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${
              darkMode ? 'bg-slate-850/35 border-slate-800' : 'bg-white border-gray-150 b-shadow-sm shadow-sm'
            }`}>
              <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-yellow-500 block">Warehousing Booked</span>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <div className="p-1.5 bg-yellow-500/10 text-yellow-500 rounded-lg">
                  <ClipboardList className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-bold font-sans">{orders.length} secure orders</span>
              </div>
            </div>
          </div>

          {/* SVG Analytical visualizations panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Visual 1: Weekly sales bars in clean SVG vectors */}
            <div className={`p-5 rounded-2xl border text-left ${
              darkMode ? 'bg-slate-850/20 border-slate-800' : 'bg-white border-gray-150 shadow-sm'
            }`}>
              <h4 className="text-xs font-sans font-extrabold uppercase tracking-widest text-gray-400 mb-4 flex items-center justify-between">
                <span>Weekly Revenue Pipeline</span>
                <span className="text-[9px] font-mono font-bold text-blue-500 bg-blue-500/10 px-1 rounded">MOCK TRANSACTION STREAM</span>
              </h4>

              {stats.weeklySales && stats.weeklySales.length > 0 ? (
                <div className="flex justify-center flex-col items-center">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full max-w-sm h-32 overflow-visible">
                    {/* Render gridlines */}
                    <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.3" />
                    <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#334155" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.3" />
                    <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#334155" strokeWidth="1" opacity="0.1" />

                    {/* Bars */}
                    {stats.weeklySales.map((w: any, idx: number) => {
                      const barWidth = 24;
                      const spacing = (chartWidth - (stats.weeklySales.length * barWidth)) / (stats.weeklySales.length - 1);
                      const x = idx * (barWidth + spacing);
                      const percent = w.sales / maxWeeklySale;
                      const barHeight = Math.max(8, percent * (chartHeight - 16));
                      const y = chartHeight - barHeight;

                      return (
                        <g key={idx} className="group cursor-pointer">
                          <title>{`Day: ${w.day}, Revenue: $${w.sales}`}</title>
                          
                          {/* Main bar background */}
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="4"
                            className="fill-blue-500 hover:fill-blue-400 transition-colors duration-200"
                          />
                          
                          {/* Inner glowing core */}
                          <rect
                            x={x + 4}
                            y={y + 4}
                            width={barWidth - 8}
                            height={barHeight - 8}
                            rx="2"
                            className="fill-cyan-400 hover:fill-cyan-300 opacity-60 transition-colors"
                          />

                          {/* Day text Label */}
                          <text
                            x={x + (barWidth / 2)}
                            y={chartHeight + 14}
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="8"
                            className="font-mono"
                          >
                            {w.day}
                          </text>

                          {/* Price label on top hover */}
                          <text
                            x={x + (barWidth / 2)}
                            y={y - 5}
                            textAnchor="middle"
                            fill="#60a5fa"
                            fontSize="8"
                            className="opacity-0 group-hover:opacity-100 font-mono font-bold transition-opacity"
                          >
                            ${w.sales}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              ) : (
                <p className="text-xs text-gray-450 italic py-6 text-center">Awaiting chart variables...</p>
              )}
            </div>

            {/* Visual 2: Category Donut segment visualization */}
            <div className={`p-5 rounded-2xl border text-left ${
              darkMode ? 'bg-slate-850/20 border-slate-800' : 'bg-white border-gray-150 shadow-sm'
            }`}>
              <h4 className="text-xs font-sans font-extrabold uppercase tracking-widest text-gray-400 mb-4 flex items-center justify-between">
                <span>Merchandise Categories Spread</span>
                <span className="text-[9px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1 rounded font-bold">STOCKS LEVEL</span>
              </h4>

              <div className="space-y-3.5 text-xs">
                {stats.categoryChart && stats.categoryChart.map((cat: any, idx: number) => {
                  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-orange-500', 'bg-purple-500', 'bg-amber-500'];
                  const themeColor = colors[idx % colors.length];
                  return (
                    <div key={cat.name} className="space-y-1 text-left">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-gray-300 flex items-center space-x-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${themeColor}`} />
                          <span>{cat.name}</span>
                        </span>
                        <span className="font-mono text-gray-400 font-bold">{cat.value} standard variations</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-gray-150'}`}>
                        <div 
                          className={`h-full rounded-full ${themeColor}`} 
                          style={{ width: `${(cat.value / products.length) * 100}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeAdminSubTab === 'inventory' && (
        <div className="space-y-6" id="admin-inventory-view">
          
          {/* Header Action buttons */}
          <div className="flex items-center justify-between border-b border-gray-800/10 pb-2">
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider">Catalog Stocks Ledger</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-950 dark:bg-stone-750 dark:hover:bg-stone-700 text-white font-sans text-xs font-bold rounded-lg flex items-center space-x-1 shadow transition-all active:scale-95"
              id="admin-open-add-product-btn"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Register New Object variation</span>
            </button>
          </div>

          {/* Collapsible Forms to Add NEW product */}
          {showAddForm && (
            <form onSubmit={handleAddProductSubmit} className={`p-5 rounded-2xl border text-xs space-y-4 shadow-xl text-left ${
              darkMode ? 'bg-slate-950 border-slate-750' : 'bg-gray-50 border-gray-250'
            }`}>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider">Register brand-new merchandise</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono mb-1 text-gray-405">Product Title</label>
                  <input
                    type="text"
                    required
                    className={`w-full p-2.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200'
                    }`}
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Stealth Matte Mechanical Keyboard"
                    id="new-product-name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono mb-1 text-gray-405">Category</label>
                  <select
                    className={`w-full p-2.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-75 * text-white' : 'bg-white border-gray-200'
                    }`}
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    id="new-product-category"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Apparel">Apparel</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] uppercase font-mono mb-1 text-gray-405">Description</label>
                  <textarea
                    rows={2}
                    className={`w-full p-2.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200'
                    }`}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Describe design acoustics, vegetable tannins..."
                    id="new-product-desc"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">Price (USD)</label>
                  <input
                    type="number"
                    required
                    className={`w-full p-2.5 rounded-lg border text-xs font-mono ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200'
                    }`}
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    id="new-product-price"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">Initial units stock</label>
                  <input
                    type="number"
                    required
                    className={`w-full p-2.5 rounded-lg border text-xs font-mono ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-200'
                    }`}
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    id="new-product-stock"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">Graphic image URL (Optional, or default placeholder)</label>
                  <input
                    type="url"
                    className={`w-full p-2.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-705 text-white' : 'bg-white border-gray-200'
                    }`}
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    id="new-product-img"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] uppercase font-mono mb-1 text-gray-450">Technical Specifications (Comma separated traits list)</label>
                  <input
                    type="text"
                    className={`w-full p-2.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-705 text-white' : 'bg-white border-gray-200'
                    }`}
                    value={newProdFeatures}
                    onChange={(e) => setNewProdFeatures(e.target.value)}
                    placeholder="Hot-swappable tactile brown switches, Dual-mode connectivity, Polycarbonate layouts"
                    id="new-product-features"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-800 transition-colors"
                  id="new-product-cancel"
                >
                  Dismiss form
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-lg transition-all dark:bg-stone-700 dark:hover:bg-stone-600"
                  id="new-product-save"
                >
                  Commit registration live
                </button>
              </div>
            </form>
          )}

          {/* Stocks listings table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-700/55 shadow-sm text-xs">
            <table className="w-full text-left ">
              <thead className={`${darkMode ? 'bg-slate-950/80 text-gray-400' : 'bg-gray-100 text-gray-600'} text-[10px] uppercase font-mono tracking-wider`}>
                <tr>
                  <th className="p-3.5">Merchandise / ID</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-right">Price</th>
                  <th className="p-3.5 text-center">Remaining Stock</th>
                  <th className="p-3.5 text-right">Operation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-medium">
                {products.map((prod) => {
                  const isEditingStock = editingStockId === prod.id;
                  const isLow = prod.stock < 5;
                  return (
                    <tr key={prod.id} className={`${darkMode ? 'hover:bg-slate-850/20' : 'hover:bg-gray-50/50'} transition-colors`} id={`admin-product-row-${prod.id}`}>
                      <td className="p-3.5 flex items-center space-x-3 text-left">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="h-10 w-10 object-cover rounded-lg shrink-0 border border-transparent/10"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="font-sans font-bold text-gray-200 truncate max-w-[170px] dark:text-white text-slate-800">{prod.name}</h4>
                          <span className="font-mono text-[9px] text-gray-450 uppercase">{prod.id}</span>
                        </div>
                      </td>

                      <td className="p-3.5 text-gray-400 font-mono text-[10px] uppercase">
                        {prod.category}
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-slate-200 dark:text-white text-slate-800">
                        ${prod.price}.00
                      </td>

                      <td className="p-3.5 text-center">
                        {isEditingStock ? (
                          <div className="flex items-center justify-center space-x-1 max-w-[90px] mx-auto">
                            <input
                              type="number"
                              className={`w-14 p-1 rounded font-mono text-center border font-bold ${
                                darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-300'
                              }`}
                              value={tempStockValue}
                              onChange={(e) => setTempStockValue(Number(e.target.value))}
                              id={`stock-input-${prod.id}`}
                            />
                            <button
                              onClick={() => handleSaveStock(prod.id)}
                              className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded"
                              title="Commit update"
                              id={`stock-save-btn-${prod.id}`}
                            >
                              <Check className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingStockId(prod.id);
                              setTempStockValue(prod.stock);
                            }}
                            className={`px-3 py-1 rounded font-mono font-bold hover:underline ${
                              isLow ? 'bg-red-500/10 text-red-500' : 'bg-slate-900/10 text-gray-400'
                            }`}
                            title="Interactive micro update"
                            id={`stock-cell-btn-${prod.id}`}
                          >
                            {prod.stock} Units {isLow && '⚠️ LOW'}
                          </button>
                        )}
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setEditingStockId(prod.id);
                            setTempStockValue(prod.stock);
                          }}
                          className="text-xs text-blue-400 hover:underline flex items-center space-x-1.5 ml-auto"
                          id={`quick-edit-btn-${prod.id}`}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Quick Stock Adjust</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeAdminSubTab === 'orders' && (
        <div className="space-y-6" id="admin-orders-view">
          
          <div className="border-b border-gray-100/10 pb-2 flex items-center justify-between">
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider">Logistics Dispatch Controller</h3>
            <span className="text-[10px] uppercase font-mono text-gray-400 flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LOGISTICS SIMULATOR FEED ACTIVE</span>
            </span>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="p-6 text-center text-xs text-gray-400 italic">No shipments registered in the checkout system yet.</p>
            ) : (
              orders.map((ord) => (
                <div 
                  key={ord.id}
                  className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 text-left ${
                    darkMode ? 'bg-slate-850/20 border-slate-800' : 'bg-white border-gray-200 shadow-sm'
                  }`}
                  id={`admin-order-card-${ord.id}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-sans font-bold text-xs text-blue-500">#{ord.id}</span>
                      <span className="text-[10px] font-mono text-gray-400">Carrier ID: {ord.trackingNumber}</span>
                    </div>
                    <div className="text-gray-300 leading-snug">
                      <p className="font-semibold text-slate-800 dark:text-gray-100">{ord.address.fullName}</p>
                      <p className="text-[11px] text-gray-450 font-mono truncate max-w-xs">{ord.address.street}, {ord.address.city}, {ord.address.country}</p>
                    </div>
                    <p className="text-[10px] text-gray-450 font-sans block pt-1">
                      Contains: {ord.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 border-slate-800/10 pt-3 md:pt-0 shrink-0">
                    <span className="text-xs font-mono font-bold dark:text-white text-slate-800">${ord.total.toFixed(2)} USD</span>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-mono text-gray-450 hidden sm:inline">Set Status:</span>
                      <select
                        className={`p-1.5 rounded-lg text-[11px] font-mono font-bold ${
                          ord.status === 'delivered' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/10' :
                          ord.status === 'out-for-delivery' ? 'bg-amber-500/15 text-amber-500 animate-pulse border border-amber-500/10' :
                          'bg-blue-500/15 text-blue-500 border border-blue-500/10'
                        }`}
                        value={ord.status}
                        onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order['status'])}
                        id={`status-select-${ord.id}`}
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="out-for-delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
