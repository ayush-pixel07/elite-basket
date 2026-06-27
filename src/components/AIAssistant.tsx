/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, RefreshCw, MessageSquare } from 'lucide-react';

interface AIAssistantProps {
  darkMode: boolean;
  onViewProductById: (productId: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({
  darkMode,
  onViewProductById
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am your AI Stylist & Concierge at Elite Basket. I have real-time access to our active stock list, features, and loyalty values.\n\nWhat elegant objects are you shopping for, or how can I help you find your style pairing today?`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  const endMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll chat on content arrivals
    endMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, isOpen]);

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || inputVal.trim();
    if (!textToSend || loading) return;

    if (!customMessage) setInputVal('');

    // Update state user message
    const updatedMsgs = [...messages, { role: 'user' as const, content: textToSend }];
    setMessages(updatedMsgs);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: updatedMsgs.slice(0, -1) // pass previous messages context
        })
      });

      const data = await response.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Apologies, I encountered a connection drop. I can still query our styling assets!' }]);
      }
    } catch (err: any) {
      console.error('Error fetching assist response:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Our full-stack AI model is refreshing. Under offline simulation mode, I am still loaded with standard catalog layouts!' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestionPills = [
    'Tactile keyboards specifications?',
    'Recommend a durable leather travel backpack',
    'How do loyalty program points operate?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="ai-stylist-capsule">
      
      {/* Dynamic Chat board panel */}
      {isOpen && (
        <div className={`mb-4 w-80 sm:w-[360px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border flex flex-col justify-between transition-all ${
          darkMode ? 'bg-slate-900 border-slate-750 text-white' : 'bg-white border-gray-150 text-gray-800'
        }`}>
          
          {/* Header block with glowing gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 shrink-0 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1.5 rounded-xl">
                <Sparkles className="h-4.5 w-4.5 text-yellow-300 animate-pulse" />
              </div>
              <div className="text-left">
                <h3 className="font-sans font-bold text-xs tracking-tight">AI Stylist Lounge</h3>
                <span className="text-[10px] font-mono text-indigo-200 block uppercase">Powered by Gemini 3.5</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              id="close-chat-widget"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages list bubble scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div key={idx} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                  <div className={`flex items-start space-x-2 max-w-[85%] text-left`}>
                    {isAssistant && (
                      <div className="h-7 w-7 rounded-lg bg-blue-150 text-blue-500 flex items-center justify-center font-bold text-[10px] uppercase shrink-0 border border-blue-500/20">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isAssistant
                        ? (darkMode ? 'bg-slate-800 text-gray-200' : 'bg-gray-100 text-slate-800')
                        : 'bg-stone-800 dark:bg-stone-700 text-white shadow-sm'
                    }`}>
                      {/* Render markdown ticks or newlines beautifully */}
                      <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%] text-left">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-[10px] uppercase shrink-0">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  </div>
                  <div className={`p-3 rounded-2xl text-xs text-gray-400 font-sans italic ${
                    darkMode ? 'bg-slate-850' : 'bg-gray-50'
                  }`}>
                    Searching store listings...
                  </div>
                </div>
              </div>
            )}
            <div ref={endMsgRef} />
          </div>

          {/* Suggestions block on bottom focus */}
          {messages.length < 4 && (
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-gray-100/10 bg-slate-950/10">
              {suggestionPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleSendMessage(pill)}
                  className={`text-[10px] px-2.5 py-1 text-left rounded-lg transition-all line-clamp-1 truncate select-none border border-transparent hover:border-gray-300 focus:outline-none ${
                    darkMode ? 'bg-slate-850 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-black'
                  }`}
                  id={`suggest-pill-${pill.slice(0, 10)}`}
                >
                  {pill}
                </button>
              ))}
            </div>
          )}

          {/* Footer dispatch inputs */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-gray-100/10 flex gap-2 shrink-0 bg-slate-950/20"
          >
            <input
              type="text"
              className={`flex-grow text-xs p-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                darkMode ? 'bg-slate-950 border-slate-75 * text-white' : 'bg-white border-gray-250 text-gray-800'
              }`}
              placeholder="Ask for tactile keys, wool sizes, point rebates..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              id="ai-stylist-input"
            />
            <button
              type="submit"
              className="bg-stone-800 hover:bg-stone-950 dark:bg-stone-750 dark:hover:bg-stone-700 p-2.5 text-white rounded-xl shadow transition-transform focus:outline-none shrink-0"
              id="ai-stylist-send-btn"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>

        </div>
      )}

      {/* Primary Floating Action bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl flex items-center justify-center transform hover:scale-105 active:scale-95 transition-transform relative focus:outline-none border-2 border-white/10"
        title="Open intelligent stylist and inventory counselor"
        id="ai-stylist-bubble"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-indigo-100" />
        ) : (
          <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500 border-2 border-white/10 text-[9px] font-bold text-slate-950 justify-center items-center font-mono">1</span>
          </span>
        )}
      </button>

    </div>
  );
}
