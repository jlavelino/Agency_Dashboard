'use client';

import React, { useState } from 'react';
import { Creator } from '@/types/infloww';
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  Search,
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
    <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-white">Managed Creators Performance</h3>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time revenue, active subscriber volume, and risk per model
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                statusFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All ({creators.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                statusFilter === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Active ({creators.filter((c) => c.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                statusFilter === 'inactive' ? 'bg-zinc-800 text-zinc-300' : 'text-zinc-400 hover:text-zinc-200'
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
          <thead className="bg-zinc-950/60 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
            <tr>
              <th className="py-3 px-5 font-semibold">Creator</th>
              <th
                onClick={() => handleSort('monthly_revenue')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Monthly Gross</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('growth_rate')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Growth</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('fans_count')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Active Fans</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-5 font-semibold">Primary Chatter</th>
              <th
                onClick={() => handleSort('chargeback_rate')}
                className="py-3 px-5 font-semibold cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Chargeback Risk</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-5 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {filteredCreators.map((creator) => {
              const isGrowthPositive = creator.growth_rate >= 0;
              const isHighRisk = creator.chargeback_rate > 1.5;

              return (
                <tr
                  key={creator.id}
                  onClick={() => onSelectCreator && onSelectCreator(creator)}
                  className="hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                >
                  {/* Creator Profile */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-rose-500/30 to-indigo-500/30 border border-zinc-700/80 flex items-center justify-center text-white font-medium text-xs">
                        {creator.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-medium text-white flex items-center gap-1.5">
                          <span>{creator.name}</span>
                          <ExternalLink className="h-3 w-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono">{creator.username}</div>
                      </div>
                    </div>
                  </td>

                  {/* Monthly Revenue */}
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-white text-sm">
                      ${creator.monthly_revenue.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      prev: ${creator.previous_monthly_revenue.toLocaleString()}
                    </div>
                  </td>

                  {/* Growth Rate */}
                  <td className="py-3.5 px-5">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        isGrowthPositive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
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
                    <div className="font-medium text-zinc-200">
                      {creator.fans_count.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-zinc-400">subscribed</div>
                  </td>

                  {/* Primary Chatter */}
                  <td className="py-3.5 px-5">
                    <div className="text-zinc-300 font-medium">{creator.primary_chatter || 'Unassigned'}</div>
                    <div className="text-[10px] text-zinc-400">assigned lead</div>
                  </td>

                  {/* Chargeback Rate */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1.5">
                      {isHighRisk ? (
                        <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                      ) : (
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      )}
                      <span className={`font-medium ${isHighRisk ? 'text-rose-400 font-bold' : 'text-zinc-300'}`}>
                        {creator.chargeback_rate}%
                      </span>
                      <span className="text-[10px] text-zinc-400">({creator.chargebacks_count})</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                        creator.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
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
