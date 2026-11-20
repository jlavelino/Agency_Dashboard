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
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Total Link Clicks</span>
            <MousePointerClick className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{totalClicks.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-1">Across all campaigns</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>New Subscriber Conversions</span>
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{totalConversions.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-1">Direct link signups</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Average Conversion Rate</span>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{avgConversionRate.toFixed(2)}%</div>
          <p className="text-[11px] text-slate-500 mt-1">Benchmark: 4.5% - 6.0%</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Attributed Revenue</span>
            <DollarSign className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">${totalAttributed.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-1">Earned via tracking links</p>
        </div>
      </div>

      {/* Marketing Assets Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-900/5">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Marketing Assets & Tracking Links</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Source attribution and ROI for social media links, trials, and promotions
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
            {['all', 'tracking_link', 'free_trial_link', 'promotion'].map((type) => (
              <button
                key={type}
                onClick={() => setAssetTypeFilter(type)}
                className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                  assetTypeFilter === type
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/85 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAssets.map((asset) => {
                const isCopied = copiedId === asset.asset_id;
                return (
                  <tr key={asset.asset_id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-slate-400" />
                      <span>{asset.name}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize bg-slate-100 border border-slate-200 text-slate-700">
                        {asset.asset_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-800">
                      {asset.creator_name || asset.creator_id}
                    </td>
                    <td className="py-3.5 px-5 font-mono">{asset.clicks.toLocaleString()}</td>
                    <td className="py-3.5 px-5 font-mono text-emerald-700 font-bold">
                      {asset.conversions.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 font-mono">{asset.conversion_rate}%</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 font-mono">
                      ${asset.attributed_revenue.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      {asset.target_url && (
                        <button
                          onClick={() => handleCopy(asset.asset_id, asset.target_url)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-[11px] font-semibold border border-slate-200"
                        >
                          {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
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
