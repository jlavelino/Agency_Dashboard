'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  RefreshCw,
  TrendingUp,
  Download,
  Check,
} from 'lucide-react';

interface HeaderProps {
  timeframe: string;
  setTimeframe: (tf: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onExportCsv?: () => void;
}

export default function Header({
  timeframe,
  setTimeframe,
  onRefresh,
  isLoading,
  searchQuery,
  setSearchQuery,
  onExportCsv,
}: HeaderProps) {
  const [isExported, setIsExported] = useState(false);

  const handleExport = () => {
    if (onExportCsv) {
      onExportCsv();
      setIsExported(true);
      setTimeout(() => setIsExported(false), 2500);
    }
  };

  const timeframeLabels: Record<string, string> = {
    '7D': '7D',
    '30D': '30D',
    'This Month': 'Month',
    'Q4': 'Q4',
  };

  return (
    <header className="h-16 shrink-0 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-6 flex items-center justify-between sticky top-0 z-30 gap-4">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-3 w-56 sm:w-64 shrink-0">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search creators, chatters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
          />
        </div>
      </div>

      {/* Center: Growth Metric (Only visible on wide screens to prevent header cramming) */}
      <div className="hidden xl:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-medium shrink-0">
        <TrendingUp className="h-3 w-3" />
        <span>+14.8% Net Portfolio MoM</span>
      </div>

      {/* Right: Actions, Filters, Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-nowrap">
        {/* Timeframe Selector */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs shrink-0">
          {['7D', '30D', 'This Month', 'Q4'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-all whitespace-nowrap ${
                timeframe === tf
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {timeframeLabels[tf] || tf}
            </button>
          ))}
        </div>

        {/* CSV Export Button */}
        <button
          onClick={handleExport}
          title="Export Complete Agency Audit to CSV"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all shrink-0 whitespace-nowrap"
        >
          {isExported ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px] hidden sm:inline">Exported!</span>
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[11px] hidden sm:inline">Export CSV</span>
            </>
          )}
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh Data"
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-all disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-rose-400' : ''}`} />
        </button>

        {/* Notifications */}
        <button
          title="Notifications"
          className="relative p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-all shrink-0"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        {/* User / Director Profile */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-zinc-800 shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold ring-1 ring-zinc-700 shadow-sm shrink-0">
            AG
          </div>
          <div className="hidden md:flex flex-col justify-center text-left leading-tight shrink-0">
            <span className="text-xs font-semibold text-zinc-200 whitespace-nowrap">Agency Director</span>
            <span className="text-[10px] text-zinc-400 font-mono whitespace-nowrap">OID: 1223928</span>
          </div>
        </div>
      </div>
    </header>
  );
}
