'use client';

import React, { useState } from 'react';
import { MarketingAsset } from '@/types/infloww';
import {
  Link2,
  MousePointerClick,
  Users,
  DollarSign,
  TrendingUp,
  Tag,
  Copy,
  Check,
} from 'lucide-react';

interface MarketingPanelProps {
  assets: MarketingAsset[];
}

export default function MarketingPanel({ assets }: MarketingPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [assetTypeFilter, setAssetTypeFilter] = useState<string>('all');

  const handleCopy = (id: string, url?: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAssets = assets.filter((a) => {
    if (assetTypeFilter === 'all') return true;
    return a.asset_type === assetTypeFilter;
  });

  const totalClicks = assets.reduce((sum, a) => sum + a.clicks, 0);
  const totalConversions = assets.reduce((sum, a) => sum + a.conversions, 0);
  const totalAttributed = assets.reduce((sum, a) => sum + a.attributed_revenue, 0);
  const avgConversionRate = (totalConversions / (totalClicks || 1)) * 100;

  return (
    <div className="space-y-6">
      {/* Top Marketing KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>Total Link Clicks</span>
            <MousePointerClick className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">{totalClicks.toLocaleString()}</div>
          <p className="text-[11px] text-zinc-400 mt-1">Across all campaigns</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>New Subscriber Conversions</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">{totalConversions.toLocaleString()}</div>
          <p className="text-[11px] text-zinc-400 mt-1">Direct link signups</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>Average Conversion Rate</span>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white">{avgConversionRate.toFixed(2)}%</div>
          <p className="text-[11px] text-zinc-400 mt-1">Benchmark: 4.5% - 6.0%</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>Attributed Revenue</span>
            <DollarSign className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-white">${totalAttributed.toLocaleString()}</div>
          <p className="text-[11px] text-zinc-400 mt-1">Earned via tracking links</p>
        </div>
      </div>

      {/* Marketing Assets Table */}
      <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">Marketing Assets & Tracking Links</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Source attribution and ROI for social media links, trials, and promotions
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-1 text-xs">
            {['all', 'tracking_link', 'free_trial_link', 'promotion'].map((type) => (
              <button
                key={type}
                onClick={() => setAssetTypeFilter(type)}
                className={`px-3 py-1 rounded-md font-medium capitalize transition-all ${
                  assetTypeFilter === type
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-5 font-semibold">Campaign Asset Name</th>
                <th className="py-3 px-5 font-semibold">Asset Type</th>
                <th className="py-3 px-5 font-semibold">Creator</th>
                <th className="py-3 px-5 font-semibold">Clicks</th>
                <th className="py-3 px-5 font-semibold">Conversions</th>
                <th className="py-3 px-5 font-semibold">Conv. Rate</th>
                <th className="py-3 px-5 font-semibold">Attributed Gross</th>
                <th className="py-3 px-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredAssets.map((asset) => {
                const isCopied = copiedId === asset.asset_id;
                return (
                  <tr key={asset.asset_id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-white flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{asset.name}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium capitalize bg-zinc-800 border border-zinc-700 text-zinc-300">
                        {asset.asset_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-zinc-200">
                      {asset.creator_name || asset.creator_id}
                    </td>
                    <td className="py-3.5 px-5 font-mono">{asset.clicks.toLocaleString()}</td>
                    <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">
                      {asset.conversions.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 font-mono">{asset.conversion_rate}%</td>
                    <td className="py-3.5 px-5 font-semibold text-white">
                      ${asset.attributed_revenue.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      {asset.target_url && (
                        <button
                          onClick={() => handleCopy(asset.asset_id, asset.target_url)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors text-[11px]"
                        >
                          {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
