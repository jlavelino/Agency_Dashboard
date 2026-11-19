'use client';

import React from 'react';
import {
  Calendar,
  Search,
  Bell,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';

interface HeaderProps {
  timeframe: string;
  setTimeframe: (tf: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Header({
  timeframe,
  setTimeframe,
  onRefresh,
  isLoading,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex items-center gap-3 w-72">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search creators, chatters, links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
          />
        </div>
      </div>

      {/* Center Agency Headline */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
          <TrendingUp className="h-3 w-3" /> +14.8% Net Portfolio MoM
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Timeframe Selector */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs">
          {['7D', '30D', 'This Month', 'Q4'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                timeframe === tf
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Refresh Action Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh Infloww Data"
          className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-rose-400' : ''}`} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        {/* Agency Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-800">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold ring-1 ring-zinc-700">
            AG
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-zinc-200 leading-none">Agency Director</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Muse Mgmt OID: 1223928</p>
          </div>
        </div>
      </div>
    </header>
  );
}
