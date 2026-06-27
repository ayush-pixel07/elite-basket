/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Truck, MapPin, ShieldCheck, Check, Clock, User, Package, Navigation, AlertCircle } from 'lucide-react';
import { Order } from '../types';

interface RealTimeTrackerProps {
  order: Order;
  darkMode: boolean;
  onClose: () => void;
}

export default function RealTimeTracker({
  order,
  darkMode,
  onClose
}: RealTimeTrackerProps) {
  // We simulate delivery vehicle traveling coordination percentages over time based on status
  let travelProgress = 15; // default processing
  if (order.status === 'shipped') travelProgress = 45;
  if (order.status === 'out-for-delivery') travelProgress = 80;
  if (order.status === 'delivered') travelProgress = 100;

  // Render stepper classes helper
  const getStepStatus = (stepIndex: number) => {
    // 0 = Processing, 1 = Shipped, 2 = Out for Delivery, 3 = Delivered
    const statusMap: Record<Order['status'], number> = {
      'processing': 0,
      'shipped': 1,
      'out-for-delivery': 2,
      'delivered': 3
    };

    const currentStepValue = statusMap[order.status];
    if (currentStepValue > stepIndex) return 'completed';
    if (currentStepValue === stepIndex) return 'active';
    return 'pending';
  };

  const stepsDetails = [
    {
      title: 'Transaction Securitized',
      desc: 'Invoice and items validated via PCI compliance tokens at Stripe gateways.',
      time: 'Phase 1'
    },
    {
      title: 'Dispatched from Hub',
      desc: 'Package sorted and routed into the BlueDart heavy carrier dispatch routine.',
      time: 'Phase 2'
    },
    {
      title: 'Final Mile Delivery Transit',
      desc: 'Local courier loaded items to carrier vehicle. Delivery expected today.',
      time: 'Phase 3'
    },
    {
      title: 'Delivered at porch',
      desc: 'Items successfully documented and delivered at customer coordinates.',
      time: 'Phase 4'
    }
  ];

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto" id="order-tracker-pane">
      
      {/* Header title */}
      <div className="flex items-center justify-between border-b border-gray-100/10 pb-3">
        <div>
          <button 
            onClick={onClose}
            className="text-xs text-blue-500 hover:underline mb-1 block"
            id="tracker-back-btn"
          >
            ← Back to Account Dashboard
          </button>
          <h2 className="text-xl font-sans font-bold tracking-tight">Active Shipment Tracking</h2>
          <p className="text-xs text-gray-450 mt-0.5">Real-time GPS carrier synchronization simulation.</p>
        </div>

        <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg ${
          darkMode ? 'bg-slate-950/80 border border-slate-750' : 'bg-gray-100 border border-gray-250 text-gray-800'
        }`}>
          Status: {order.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Step 1: Simulated Map / Vector path navigation board (Left Column) */}
        <div className={`md:col-span-3 p-5 rounded-3xl border flex flex-col justify-between h-[340px] relative overflow-hidden text-left ${
          darkMode ? 'bg-slate-850/20 border-slate-800' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          
          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-2">Carrier Tracking Route simulation</span>

          {/* Interactive animated SVG road coordinate schema */}
          <div className={`relative flex-grow border border-dashed rounded-2xl p-4 overflow-hidden flex items-center justify-center ${
            darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-gray-50 border-gray-200'
          }`}>
            
            {/* Grid coordinates indicators */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.03] pointer-events-none">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="border border-white" />
              ))}
            </div>

            {/* Simulated Road Svg Vectors */}
            <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
              {/* Route line */}
              <path
                d="M 50,80 C 130,-10 270,170 350,80"
                fill="none"
                stroke={darkMode ? '#334155' : '#cbd5e1'}
                strokeWidth="6"
                strokeLinecap="round"
              />
              
              {/* Completed tracking vector line */}
              <path
                d="M 50,80 C 130,-10 270,170 350,80"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset={400 - (travelProgress * 4)}
                className="transition-all duration-1000 ease-in-out"
              />

              {/* Warehouse Fulfilment Coordinate Hub Start */}
              <g transform="translate(50, 80)">
                <circle r="12" fill={darkMode ? '#1e293b' : '#f1f5f9'} stroke="#3b82f6" strokeWidth="2.5" />
                <Package className="h-4.5 w-4.5 -mt-2 -ml-2.5 text-blue-500" />
                <text y="-18" textAnchor="middle" fill="#94a3b8" fontSize="8" className="font-mono">Fulfillment Hub</text>
              </g>

              {/* Residence Coordinate End */}
              <g transform="translate(350, 80)">
                <circle r="12" fill={order.status === 'delivered' ? '#065f46' : (darkMode ? '#1e293b' : '#f1f5f9')} stroke={order.status === 'delivered' ? '#10b981' : '#64748b'} strokeWidth="2.5" className={order.status === 'delivered' ? 'animate-pulse' : ''} />
                <MapPin className={`h-4.5 w-4.5 -mt-2.5 -ml-2.5 ${order.status === 'delivered' ? 'text-emerald-500' : 'text-slate-400'}`} />
                <text y="-18" textAnchor="middle" fill="#94a3b8" fontSize="8" className="font-mono">My Residence</text>
              </g>

              {/* Moving Carrier Vehicle over route calculation */}
              {order.status !== 'delivered' && (
                <g 
                  className="transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `translate(${50 + (travelProgress * 3)}px, ${40 + (Math.sin(travelProgress / 10) * 40)}px)`
                  }}
                >
                  <circle r="16" fill="rgba(59, 130, 246, 0.15)" className="animate-ping" />
                  <circle r="10" fill="#3b82f6" />
                  <Truck className="h-3.5 w-3.5 text-white -mt-2 -ml-2" />
                  <text y="24" textAnchor="middle" fill="#3b82f6" fontSize="8" className="font-mono font-bold bg-slate-900/40 py-0.5 px-1 rounded uppercase">In route</text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs mt-3">
            <span className="text-gray-400 font-mono">Invoice reference: <strong className="text-blue-500">#{order.id}</strong></span>
            <span className="text-gray-400 font-sans">ETA Expected: <strong className="text-slate-200 font-serif font-bold dark:text-white text-slate-800">{order.status === 'delivered' ? 'Arranged at porch' : 'Within 48 Working Hours'}</strong></span>
          </div>

        </div>

        {/* Step 2: Milestone Stepper (Right Column) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-1 border-b border-gray-100/10 pb-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-400">Milestone Logs</span>
          </div>

          <div className="relative pl-6 border-l border-slate-800 space-y-6 text-xs text-left">
            {stepsDetails.map((st, idx) => {
              const stepStatus = getStepStatus(idx);
              return (
                <div key={idx} className="relative text-left" id={`tracker-milestone-${idx}`}>
                  {/* Circle Indicator over line */}
                  <div className={`absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 flex items-center justify-center font-bold font-mono transition-colors ${
                    stepStatus === 'completed' ? 'bg-emerald-600 border-emerald-500 text-white' :
                    stepStatus === 'active' ? 'bg-blue-600 border-blue-500 text-white animate-pulse' :
                    'bg-slate-900 border-slate-700 text-gray-400'
                  }`}>
                    {stepStatus === 'completed' && <Check className="h-2.5 w-2.5" />}
                    {stepStatus === 'active' && <Navigation className="h-2.5 w-2.5 animate-spin" />}
                  </div>

                  <div>
                    <span className={`block font-sans font-bold leading-none ${
                      stepStatus === 'active' ? 'text-blue-400' : (stepStatus === 'completed' ? 'text-emerald-400' : 'text-gray-400')
                    }`}>
                      {st.title}
                    </span>
                    <span className="text-[10px] font-mono block text-gray-450 mt-0.5">{st.time}</span>
                    <p className="text-[11px] text-gray-450 mt-1leading-relaxed leading-normal">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
