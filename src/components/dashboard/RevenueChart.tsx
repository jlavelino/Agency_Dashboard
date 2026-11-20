'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockRevenueTrends, mockCreators } from '@/lib/mockData';
import { getScaledTrends } from '@/lib/timeframeUtils';
import { TrendingUp, PieChart as PieIcon, Layers } from 'lucide-react';

interface RevenueChartProps {
  timeframe?: string;
}

export default function RevenueChart({ timeframe = '30D' }: RevenueChartProps) {
  const [viewType, setViewType] = useState<'total' | 'breakdown'>('breakdown');
  const activeTrends = getScaledTrends(mockRevenueTrends, timeframe);

  // Clean, professional light theme categorical colors
  const PIE_COLORS = [
    '#4f46e5', // Indigo-600
    '#0284c7', // Sky-600
    '#7c3aed', // Violet-600
    '#db2777', // Pink-600
    '#059669', // Emerald-600
    '#d97706', // Amber-600
    '#2563eb', // Blue-600
    '#475569', // Slate-600
  ];

  const creatorShareData = mockCreators.map((c) => ({
    name: c.name,
    value: c.monthly_revenue,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 2 Cols: Revenue Over Time Light Area Chart */}
      <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm ring-1 ring-slate-900/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Agency Revenue Velocity (USD)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown across Chatter PPVs, Subscriptions, and Direct Fan Tips
            </p>
          </div>

          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1 text-xs">
            <button
              onClick={() => setViewType('breakdown')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all ${viewType === 'breakdown'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Layers className="h-3 w-3" /> Breakdown
            </button>
            <button
              onClick={() => setViewType('total')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all ${viewType === 'total'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Total
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorChatterLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorSubsLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTipsLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTotalLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  fontSize: '12px',
                  color: '#0f172a',
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
              />
              {viewType === 'total' ? (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Total Gross"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fill="url(#colorTotalLight)"
                />
              ) : (
                <>
                  <Area
                    type="monotone"
                    dataKey="messages"
                    name="Chatter PPV Messages"
                    stackId="1"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#colorChatterLight)"
                  />
                  <Area
                    type="monotone"
                    dataKey="subscriptions"
                    name="Subscriptions"
                    stackId="1"
                    stroke="#0284c7"
                    strokeWidth={2}
                    fill="url(#colorSubsLight)"
                  />
                  <Area
                    type="monotone"
                    dataKey="tips"
                    name="Fan Tips"
                    stackId="1"
                    stroke="#059669"
                    strokeWidth={2}
                    fill="url(#colorTipsLight)"
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            <span className="font-medium">Chatter PPV Messages</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-600" />
            <span className="font-medium">Subscriptions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            <span className="font-medium">Fan Direct Tips</span>
          </div>
        </div>
      </div>

      {/* 1 Col: Creator Revenue Share Donut */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm ring-1 ring-slate-900/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PieIcon className="h-4 w-4 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Portfolio Concentration</h2>
          </div>
          <p className="text-xs text-slate-500">Share of monthly gross per model</p>
        </div>

        <div className="h-56 w-full relative flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={creatorShareData}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
              >
                {creatorShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '8px',
                  fontSize: '11px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Monthly Gross']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] text-slate-500 font-medium">Top Earner</span>
            <span className="text-sm font-bold text-slate-900">Aria Steele</span>
            <span className="text-[10px] text-indigo-600 font-mono font-semibold">35.3% share</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            <span className="truncate">Aria: $52.4k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-600" />
            <span className="truncate">Elena: $34.8k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-600" />
            <span className="truncate">Chloe: $26.9k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            <span className="truncate">Others: $34.4k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
