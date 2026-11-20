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
    <header className="h-16 shrink-0 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 gap-4 shadow-sm">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-3 w-56 sm:w-64 shrink-0">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search creators, chatters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Center: Growth Metric */}
      <div className="hidden xl:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold shrink-0">
        <TrendingUp className="h-3.5 w-3.5" />
        <span>+14.8% Net Portfolio MoM</span>
      </div>

      {/* Right: Actions, Filters, Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-nowrap">
        {/* Timeframe Selector */}
        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5 text-xs shrink-0">
          {['7D', '30D', 'This Month', 'Q4'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all whitespace-nowrap ${
                timeframe === tf
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
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
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shrink-0 whitespace-nowrap shadow-sm"
        >
          {isExported ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-600 text-[11px] hidden sm:inline">Exported!</span>
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-[11px] hidden sm:inline">Export CSV</span>
            </>
          )}
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh Data"
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all disabled:opacity-50 shrink-0 shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
        </button>

        {/* Notifications */}
        <button
          title="Notifications"
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shrink-0 shadow-sm"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        {/* User / Director Profile */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 shrink-0">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
            AG
          </div>
          <div className="hidden md:flex flex-col justify-center text-left leading-tight shrink-0">
            <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">Agency Director</span>
            <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">OID: 1223928</span>
          </div>
        </div>
      </div>
    </header>
  );
}
