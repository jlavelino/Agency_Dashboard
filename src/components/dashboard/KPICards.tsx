'use client';

import React from 'react';
import {
  DollarSign,
  Users,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  MessageSquare,
  ArrowUpRight,
  Target,
} from 'lucide-react';
import { AgencyMetricsSummary } from '@/types/infloww';

interface KPICardsProps {
  summary: AgencyMetricsSummary;
}

export default function KPICards({ summary }: KPICardsProps) {
  const targetMonthlyGoal = 160000;
  const progressPercent = Math.min(
    100,
    Math.round((summary.total_revenue_month / targetMonthlyGoal) * 100)
  );

  const isSafeChargeback = summary.chargeback_rate_percentage < 1.0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* TIER 1: PRIMARY NORTH-STAR HERO CARD (2 Columns Wide) */}
      <div className="lg:col-span-2 relative overflow-hidden bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm ring-1 ring-slate-900/5">
        {/* Subtle accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />

        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Primary Revenue Driver
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
                Tier 1
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+{summary.revenue_growth_percentage}% MoM</span>
            </div>
          </div>

          <div className="mb-3">
            <span className="text-[11px] text-slate-500 block mb-0.5 font-medium">Monthly Agency Gross</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-mono">
                ${summary.total_revenue_month.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-medium font-mono">USD</span>
            </div>
          </div>

          {/* Revenue Breakdown Mini-Tiers */}
          <div className="grid grid-cols-3 gap-2.5 py-2.5 px-3.5 bg-slate-50/90 rounded-xl border border-slate-200 my-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">Chatter PPV Sales</span>
              <span className="font-bold text-indigo-700 font-mono text-xs sm:text-sm">$68,500</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">46.1% share</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">Subscriptions</span>
              <span className="font-bold text-blue-700 font-mono text-xs sm:text-sm">$52,200</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">35.1% share</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">Fan Direct Tips</span>
              <span className="font-bold text-emerald-700 font-mono text-xs sm:text-sm">$27,820</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">18.8% share</span>
            </div>
          </div>
        </div>

        {/* Goal Progress Tracker */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 flex items-center gap-1.5 text-[11px] font-medium">
              <Target className="h-3.5 w-3.5 text-indigo-600" /> Target Pace ($160k Goal)
            </span>
            <span className="font-bold text-indigo-700 font-mono text-xs">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* TIER 2: SUBSCRIBER GROWTH ENGINE (1 Column) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-sm ring-1 ring-slate-900/5">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Active Subscribers
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <Users className="h-3.5 w-3.5" />
            </div>
          </div>

          <span className="text-[11px] text-slate-500 block mb-0.5 font-medium">Fan Base Volume</span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono mb-1.5">
            {summary.total_fans_count.toLocaleString()}
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 mb-2">
            <TrendingUp className="h-3 w-3" />
            <span>+{summary.fans_growth_percentage}% new subscriber rate</span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-slate-100 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Active Creators:</span>
            <span className="font-semibold text-slate-800">{summary.active_creators_count} models</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Average Spend / Fan:</span>
            <span className="font-bold text-slate-900 font-mono">
              ${(summary.total_revenue_month / summary.total_fans_count).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* TIER 3: CHATTER OPERATIONS & CHARGEBACK GUARDRAIL (1 Column - Stacked) */}
      <div className="flex flex-col gap-3">
        {/* Chatter Sales Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex-1 flex flex-col justify-between shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Chatter Team ROI
            </span>
            <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-bold text-slate-900 font-mono">
              {summary.marketing_roi_percentage}%
            </div>
            <span className="text-[10px] text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              {summary.active_chatters_count} active chatters
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Top sales lead: <span className="text-slate-900 font-semibold">Alex Rivera ($28.4k)</span>
          </div>
        </div>

        {/* Chargeback Guardrail Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex-1 flex flex-col justify-between shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Chargeback Risk
            </span>
            {isSafeChargeback ? (
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
            )}
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-xl font-bold font-mono text-slate-900">
              {summary.chargeback_rate_percentage}%
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isSafeChargeback
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
            >
              {isSafeChargeback ? 'Safe (< 1%)' : 'High Risk'}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
            ${summary.total_chargebacks_amount.toLocaleString()} disputed volume
          </div>
        </div>
      </div>
    </div>
  );
}
