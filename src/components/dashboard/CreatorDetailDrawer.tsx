'use client';

import React, { useEffect } from 'react';
import { Creator, MarketingAsset, ChargebackRecord } from '@/types/infloww';
import {
  X,
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  ShieldAlert,
  MessageSquare,
  Calendar,
  Tag,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

interface CreatorDetailDrawerProps {
  creator: Creator | null;
  onClose: () => void;
  marketingAssets: MarketingAsset[];
  chargebacks: ChargebackRecord[];
}

export default function CreatorDetailDrawer({
  creator,
  onClose,
  marketingAssets,
  chargebacks,
}: CreatorDetailDrawerProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!creator) return null;

  const isGrowthPositive = creator.growth_rate >= 0;
  const isHighRisk = creator.chargeback_rate > 1.5;
  const arpu = creator.fans_count > 0 ? (creator.monthly_revenue / creator.fans_count).toFixed(2) : '0.00';

  // Filter creator-specific assets & chargebacks
  const creatorAssets = marketingAssets.filter(
    (a) => a.creator_id === creator.id || a.creator_name === creator.name
  );
  const creatorChargebacks = chargebacks.filter(
    (c) => c.creator_id === creator.id || c.creator_name === creator.name
  );

  const handleCopy = (id: string, url?: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-xl bg-white border-l border-slate-200 text-slate-800 h-full overflow-y-auto p-6 sm:p-8 flex flex-col z-10 shadow-2xl animate-slideLeft">
        {/* Header Close & Actions */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Creator Deep-Dive
          </span>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="py-6 flex items-start justify-between gap-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 text-xl font-black shadow-sm">
              {creator.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{creator.name}</h2>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                    creator.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {creator.status}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 mt-0.5">{creator.username}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-slate-400" /> Joined {creator.joined_date}
                </span>
                <span>•</span>
                <span className="font-mono text-slate-500">ID: {creator.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial & Fan Metric Grid */}
        <div className="py-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-b border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1 font-medium">
              <span>Monthly Gross</span>
              <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono">${creator.monthly_revenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[10px] mt-1">
              <span
                className={`font-bold ${
                  isGrowthPositive ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {isGrowthPositive ? '+' : ''}
                {creator.growth_rate}%
              </span>
              <span className="text-slate-500">vs prev mo</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1 font-medium">
              <span>Active Fans</span>
              <Users className="h-3.5 w-3.5 text-indigo-600" />
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono">{creator.fans_count.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 mt-1">Subscribers active</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1 font-medium">
              <span>Avg Spend / Fan</span>
              <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-slate-900 font-mono">${arpu}</div>
            <div className="text-[10px] text-slate-500 mt-1">High-value ARPU</div>
          </div>
        </div>

        {/* Operations: Primary Chatter Lead */}
        <div className="py-5 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Assigned Chatter Operations
          </h3>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {creator.primary_chatter || 'Unassigned'}
                </div>
                <div className="text-xs text-slate-500">Primary Chatter Lead & Content Sales</div>
              </div>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
              Active Shift
            </span>
          </div>
        </div>

        {/* Marketing Attribution & Tracking Links */}
        <div className="py-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Marketing Links & Funnels ({creatorAssets.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Infloww Tracking</span>
          </div>

          {creatorAssets.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No marketing assets directly tagged to this creator.</p>
          ) : (
            <div className="space-y-2.5">
              {creatorAssets.map((asset) => {
                const isCopied = copiedId === asset.asset_id;
                return (
                  <div
                    key={asset.asset_id}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-900">{asset.name}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 capitalize shadow-sm">
                        {asset.asset_type.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                      <span>Clicks: <b className="text-slate-900 font-mono">{asset.clicks.toLocaleString()}</b></span>
                      <span>Conversions: <b className="text-emerald-700 font-mono">{asset.conversions}</b></span>
                      <span>Conv Rate: <b className="text-slate-900 font-mono">{asset.conversion_rate}%</b></span>
                      <span>Attributed: <b className="text-slate-900 font-mono">${asset.attributed_revenue.toLocaleString()}</b></span>
                    </div>

                    {asset.target_url && (
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[10px] text-slate-500 truncate font-mono">
                          {asset.target_url}
                        </span>
                        <button
                          onClick={() => handleCopy(asset.asset_id, asset.target_url)}
                          className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded text-[10px] font-semibold transition-colors border border-slate-200 shadow-sm"
                        >
                          {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Chargeback & Risk Section */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Chargeback & Dispute Risk
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-medium">
              {isHighRisk ? (
                <span className="flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <ShieldAlert className="h-3 w-3" /> High Risk ({creator.chargeback_rate}%)
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <ShieldCheck className="h-3 w-3" /> Safe ({creator.chargeback_rate}%)
                </span>
              )}
            </div>
          </div>

          {creatorChargebacks.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-center text-xs text-emerald-700 font-semibold">
              Clean Record: No recent chargebacks or active disputes on this profile.
            </div>
          ) : (
            <div className="space-y-2">
              {creatorChargebacks.map((cb) => (
                <div
                  key={cb.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span className="font-mono text-rose-600">${cb.amount}</span>
                      <span className="text-[10px] font-mono text-slate-500">{cb.id}</span>
                    </div>
                    <div className="text-[11px] text-slate-600">{cb.reason}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
                      {cb.status}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{cb.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="mt-auto pt-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Close Creator Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
