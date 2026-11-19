'use client';

import React from 'react';
import {
  DollarSign,
  Users,
  TrendingUp,
  ShieldCheck,
  Percent,
  MessageCircle,
} from 'lucide-react';
import { AgencyMetricsSummary } from '@/types/infloww';

interface KPICardsProps {
  summary: AgencyMetricsSummary;
}

export default function KPICards({ summary }: KPICardsProps) {
  const cards = [
    {
      label: 'Monthly Agency Gross',
      value: `$${summary.total_revenue_month.toLocaleString()}`,
      change: `+${summary.revenue_growth_percentage}% vs last month`,
      isPositive: true,
      icon: DollarSign,
      color: 'from-emerald-500/20 to-teal-500/5',
      iconColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      subtext: 'Subscriptions, tips, & pay-to-view messages',
    },
    {
      label: 'Active Fan Base',
      value: summary.total_fans_count.toLocaleString(),
      change: `+${summary.fans_growth_percentage}% new subs`,
      isPositive: true,
      icon: Users,
      color: 'from-rose-500/20 to-pink-500/5',
      iconColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      subtext: `${summary.active_creators_count} managed creators active`,
    },
    {
      label: 'Marketing ROI',
      value: `${summary.marketing_roi_percentage}%`,
      change: 'High Conversion Funnels',
      isPositive: true,
      icon: Percent,
      color: 'from-indigo-500/20 to-blue-500/5',
      iconColor: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      subtext: 'Attributed from TikTok, IG & Promo Links',
    },
    {
      label: 'Portfolio Chargeback Rate',
      value: `${summary.chargeback_rate_percentage}%`,
      change: 'Within Safe Bounds (< 1%)',
      isPositive: true,
      icon: ShieldCheck,
      color: 'from-amber-500/20 to-orange-500/5',
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      subtext: `$${summary.total_chargebacks_amount.toLocaleString()} disputed this month`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="relative overflow-hidden bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-5 hover:border-zinc-700/80 transition-all group"
          >
            {/* Soft Ambient Glow */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} rounded-full blur-2xl pointer-events-none -mr-8 -mt-8 opacity-60 group-hover:opacity-100 transition-opacity`}
            />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400">{card.label}</span>
              <div className={`p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60 ${card.iconColor}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold tracking-tight text-white">{card.value}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${card.badgeBg}`}>
                {card.change}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mt-2.5 truncate">{card.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
