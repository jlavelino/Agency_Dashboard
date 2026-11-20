'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  RefreshCw,
  TrendingUp,
  Download,
  Check,
  ShieldCheck,
  ShieldAlert,
  Target,
  Zap,
  ArrowUpRight,
  AlertTriangle,
  X,
} from 'lucide-react';
import { AgencyMetricsSummary, ChargebackRecord } from '@/types/infloww';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

interface HeaderProps {
  timeframe: string;
  setTimeframe: (tf: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onExportCsv?: () => void;
  summary?: AgencyMetricsSummary;
  chargebacks?: ChargebackRecord[];
}

function buildNotifications(
  summary?: AgencyMetricsSummary,
  chargebacks?: ChargebackRecord[]
): Notification[] {
  const notes: Notification[] = [];

  if (!summary) return notes;

  // 1. Revenue goal progress
  const goal = 160000;
  const pct = Math.round((summary.total_revenue_month / goal) * 100);
  if (pct >= 90) {
    notes.push({
      id: 'goal',
      type: 'success',
      title: `${pct}% to Monthly Target`,
      body: `$${(goal - summary.total_revenue_month).toLocaleString()} remaining to hit the $160K goal.`,
      time: 'Now',
      read: false,
    });
  } else if (pct < 70) {
    notes.push({
      id: 'goal',
      type: 'warning',
      title: `Revenue Pacing Below Target`,
      body: `Only ${pct}% to goal — $${(goal - summary.total_revenue_month).toLocaleString()} gap remaining.`,
      time: 'Now',
      read: false,
    });
  }

  // 2. Chargeback rate
  if (summary.chargeback_rate_percentage >= 1.0) {
    notes.push({
      id: 'chargeback-danger',
      type: 'danger',
      title: 'Chargeback Rate Exceeded 1%',
      body: `Rate is at ${summary.chargeback_rate_percentage}% — above the safe threshold. Review disputed transactions immediately.`,
      time: '1h ago',
      read: false,
    });
  } else if (summary.chargeback_rate_percentage >= 0.8) {
    notes.push({
      id: 'chargeback-warn',
      type: 'warning',
      title: 'Chargeback Rate Near Limit',
      body: `Rate is ${summary.chargeback_rate_percentage}% — approaching the 1% danger zone. Monitor closely.`,
      time: '1h ago',
      read: false,
    });
  } else {
    notes.push({
      id: 'chargeback-ok',
      type: 'success',
      title: 'Chargeback Rate Safe',
      body: `Rate is ${summary.chargeback_rate_percentage}% — well under the 1% threshold.`,
      time: '2h ago',
      read: false,
    });
  }

  // 3. Chatter ROI
  if (summary.marketing_roi_percentage >= 300) {
    notes.push({
      id: 'chatter-roi',
      type: 'success',
      title: `Chatter Team ROI at ${summary.marketing_roi_percentage}%`,
      body: `${summary.active_chatters_count} active chatters delivering exceptional return. Alex Rivera leads with $28.4K.`,
      time: '3h ago',
      read: false,
    });
  }

  // 4. Revenue growth
  if (summary.revenue_growth_percentage >= 10) {
    notes.push({
      id: 'growth',
      type: 'info',
      title: `+${summary.revenue_growth_percentage}% MoM Portfolio Growth`,
      body: `Portfolio is outperforming last month across all revenue streams.`,
      time: '6h ago',
      read: false,
    });
  }

  // 5. Open chargebacks
  if (chargebacks && chargebacks.length > 0) {
    const disputed = chargebacks.filter((c) => c.status === 'disputed');
    if (disputed.length > 0) {
      notes.push({
        id: 'open-cb',
        type: 'warning',
        title: `${disputed.length} Chargeback${disputed.length > 1 ? 's' : ''} Awaiting Review`,
        body: `$${disputed.reduce((s, c) => s + c.amount, 0).toLocaleString()} in disputed volume needs attention.`,
        time: '8h ago',
        read: false,
      });
    }
  }

  return notes;
}

const typeConfig = {
  success: {
    icon: ShieldCheck,
    dot: 'bg-emerald-500',
    iconClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    border: 'border-l-emerald-500',
  },
  warning: {
    icon: AlertTriangle,
    dot: 'bg-amber-500',
    iconClass: 'text-amber-600 bg-amber-50 border-amber-200',
    border: 'border-l-amber-500',
  },
  danger: {
    icon: ShieldAlert,
    dot: 'bg-rose-500',
    iconClass: 'text-rose-600 bg-rose-50 border-rose-200',
    border: 'border-l-rose-500',
  },
  info: {
    icon: TrendingUp,
    dot: 'bg-indigo-500',
    iconClass: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    border: 'border-l-indigo-500',
  },
};

export default function Header({
  timeframe,
  setTimeframe,
  onRefresh,
  isLoading,
  searchQuery,
  setSearchQuery,
  onExportCsv,
  summary,
  chargebacks,
}: HeaderProps) {
  const [isExported, setIsExported] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    buildNotifications(summary, chargebacks)
  );
  const notifRef = useRef<HTMLDivElement>(null);

  // Rebuild notifications when summary/chargebacks data changes
  useEffect(() => {
    setNotifications(buildNotifications(summary, chargebacks));
  }, [summary, chargebacks]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [notifOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBellClick = () => {
    setNotifOpen((prev) => !prev);
    // Mark all as read when opening
    if (!notifOpen) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const dismissNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

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
    <header className="h-16 shrink-0 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between z-20 gap-3 shadow-xs">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-xs min-w-0">
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
        <ArrowUpRight className="h-3.5 w-3.5" />
        <span>+14.8% Net Portfolio MoM</span>
      </div>

      {/* Right: Actions, Filters, Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-nowrap">
        {/* Timeframe Selector */}
        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5 text-xs shrink-0">
          {['7D', '30D', 'This Month', 'Q4'].map((tf) => {
            const isSelected = timeframe === tf || (tf === 'This Month' && timeframe === 'Month');
            return (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all whitespace-nowrap cursor-pointer ${isSelected
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {timeframeLabels[tf] || tf}
              </button>
            );
          })}
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

        {/* Notification Bell */}
        <div className="relative shrink-0" ref={notifRef}>
          <button
            onClick={handleBellClick}
            title="Notifications"
            className={`relative p-2 border rounded-xl transition-all shrink-0 shadow-sm ${notifOpen
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
              }`}
          >
            <Bell className="h-3.5 w-3.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-900">Agency Alerts</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {notifications.length} alert{notifications.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-xs text-slate-400">
                    No alerts — all systems normal
                  </div>
                ) : (
                  notifications.map((n) => {
                    const cfg = typeConfig[n.type];
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={n.id}
                        className={`flex gap-3 px-4 py-3 border-l-2 ${cfg.border} hover:bg-slate-50/70 transition-colors`}
                      >
                        <div
                          className={`mt-0.5 h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 ${cfg.iconClass}`}
                        >
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-slate-900 leading-tight">
                            {n.title}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                            {n.body}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1 font-mono">{n.time}</p>
                        </div>
                        <button
                          onClick={() => dismissNotif(n.id)}
                          className="mt-0.5 text-slate-300 hover:text-slate-500 transition-colors shrink-0"
                          title="Dismiss"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-2.5 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setNotifications([])}
                    className="text-[10px] text-slate-400 hover:text-slate-700 font-semibold transition-colors"
                  >
                    Dismiss all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User / Director Profile */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200 shrink-0">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0">
            AG
          </div>
          <div className="hidden sm:flex flex-col justify-center text-left leading-tight shrink-0 pr-1">
            <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">Agency Director</span>
            <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">OID: 1223928</span>
          </div>
        </div>
      </div>
    </header>
  );
}
