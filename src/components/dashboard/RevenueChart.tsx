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
  Legend,
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

  // Colors for Creator Share
  const COLORS = ['#f43f5e', '#a855f7', '#6366f1', '#3b82f6', '#14b8a6', '#f59e0b', '#ec4899', '#64748b'];

  const creatorShareData = mockCreators.map((c) => ({
    name: c.name,
    value: c.monthly_revenue,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 2 Cols: Revenue Over Time Area Chart */}
      <div className="lg:col-span-2 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-rose-400" />
              <h2 className="text-sm font-semibold text-white">Agency Revenue Velocity (USD)</h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live breakdown across Subscriptions, PPV Messages, and Direct Tips
            </p>
          </div>

          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setViewType('breakdown')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                viewType === 'breakdown'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="h-3 w-3" /> Breakdown
            </button>
            <button
              onClick={() => setViewType('total')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                viewType === 'total'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Total Only
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorMsgs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTips" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#27272a',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
              />
              {viewType === 'total' ? (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Total Gross"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              ) : (
                <>
                  <Area
                    type="monotone"
                    dataKey="subscriptions"
                    name="Subscriptions"
                    stackId="1"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSubs)"
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    name="Chatter PPV Messages"
                    stackId="1"
                    stroke="#ec4899"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorMsgs)"
                  />
                  <Area
                    type="monotone"
                    dataKey="tips"
                    name="Fan Tips"
                    stackId="1"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTips)"
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 1 Col: Portfolio Revenue Share Donut */}
      <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PieIcon className="h-4 w-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Creator Revenue Share</h2>
          </div>
          <p className="text-xs text-zinc-400">Distribution across managed roster</p>
        </div>

        <div className="h-60 w-full relative flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={creatorShareData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
              >
                {creatorShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#27272a',
                  borderRadius: '10px',
                  fontSize: '11px',
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Monthly Gross']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-zinc-400 font-medium">Top Earner</span>
            <span className="text-sm font-bold text-white">Aria Steele</span>
            <span className="text-[10px] text-rose-400">35.3% of agency</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="truncate">Aria: $52.4k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            <span className="truncate">Elena: $34.8k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="truncate">Chloe: $26.9k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="truncate">Others: $34.4k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
