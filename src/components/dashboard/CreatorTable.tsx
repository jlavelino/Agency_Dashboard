'use client';

import React, { useState } from 'react';
import { Creator } from '@/types/infloww';
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  UserCheck,
} from 'lucide-react';

interface CreatorTableProps {
  creators: Creator[];
  onSelectCreator?: (creator: Creator) => void;
  searchFilter?: string;
}

export default function CreatorTable({
  creators,
  onSelectCreator,
  searchFilter = '',
}: CreatorTableProps) {
  const [sortField, setSortField] = useState<keyof Creator>('monthly_revenue');
  const [sortAsc, setSortAsc] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const handleSort = (field: keyof Creator) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filteredCreators = creators
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        c.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (c.primary_chatter && c.primary_chatter.toLowerCase().includes(searchFilter.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-900/5">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Managed Creators Performance</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time revenue, active subscriber volume, and risk per model
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({creators.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'active' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active ({creators.filter((c) => c.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                statusFilter === 'inactive' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Table Component */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/85 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-5 font-semibold">Creator</th>
              <th
                onClick={() => handleSort('monthly_revenue')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Monthly Gross</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('growth_rate')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Growth</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('fans_count')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Active Fans</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-5 font-semibold">Primary Chatter</th>
              <th
                onClick={() => handleSort('chargeback_rate')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Chargeback Risk</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-5 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredCreators.map((creator) => {
              const isGrowthPositive = creator.growth_rate >= 0;
              const isHighRisk = creator.chargeback_rate > 1.5;

              return (
                <tr
                  key={creator.id}
                  onClick={() => onSelectCreator && onSelectCreator(creator)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  {/* Creator Profile */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {creator.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{creator.name}</span>
                          <ExternalLink className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">{creator.username}</div>
                      </div>
                    </div>
                  </td>

                  {/* Monthly Revenue */}
                  <td className="py-3.5 px-5">
                    <div className="font-extrabold text-slate-900 text-sm font-mono">
                      ${creator.monthly_revenue.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      prev: ${creator.previous_monthly_revenue.toLocaleString()}
                    </div>
                  </td>

                  {/* Growth Rate */}
                  <td className="py-3.5 px-5">
                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isGrowthPositive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {isGrowthPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>
                        {isGrowthPositive ? '+' : ''}
                        {creator.growth_rate}%
                      </span>
                    </div>
                  </td>

                  {/* Fans Count */}
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-slate-900 font-mono">
                      {creator.fans_count.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500">subscribed</div>
                  </td>

                  {/* Primary Chatter */}
                  <td className="py-3.5 px-5">
                    <div className="text-slate-800 font-semibold">{creator.primary_chatter || 'Unassigned'}</div>
                    <div className="text-[10px] text-slate-500">assigned lead</div>
                  </td>

                  {/* Chargeback Rate */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1.5">
                      {isHighRisk ? (
                        <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
                      ) : (
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                      <span className={`font-bold font-mono ${isHighRisk ? 'text-rose-600' : 'text-slate-800'}`}>
                        {creator.chargeback_rate}%
                      </span>
                      <span className="text-[10px] text-slate-500">({creator.chargebacks_count})</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        creator.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {creator.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
