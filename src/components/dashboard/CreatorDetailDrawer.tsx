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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-xl bg-zinc-950 border-l border-zinc-800 text-zinc-100 h-full overflow-y-auto p-6 sm:p-8 flex flex-col z-10 shadow-2xl animate-slideLeft">
        {/* Header Close & Actions */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Creator Deep-Dive
          </span>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="py-6 flex items-start justify-between gap-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-rose-500/40 via-purple-500/40 to-indigo-500/40 border-2 border-zinc-700 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-rose-500/10">
              {creator.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{creator.name}</h2>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                    creator.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  {creator.status}
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">{creator.username}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-zinc-400" /> Joined {creator.joined_date}
                </span>
                <span>•</span>
                <span className="font-mono text-zinc-400">ID: {creator.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial & Fan Metric Grid */}
        <div className="py-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-b border-zinc-800/60">
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-1">
              <span>Monthly Gross</span>
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white">${creator.monthly_revenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[10px] mt-1">
              <span
                className={`font-semibold ${
                  isGrowthPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isGrowthPositive ? '+' : ''}
                {creator.growth_rate}%
              </span>
              <span className="text-zinc-400">vs prev mo</span>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-1">
              <span>Active Fans</span>
              <Users className="h-3.5 w-3.5 text-rose-400" />
            </div>
            <div className="text-lg font-bold text-white">{creator.fans_count.toLocaleString()}</div>
            <div className="text-[10px] text-zinc-400 mt-1">Subscribers active</div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3.5 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-1">
              <span>Avg Spend / Fan</span>
              <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <div className="text-lg font-bold text-white">${arpu}</div>
            <div className="text-[10px] text-zinc-400 mt-1">High-value ARPU</div>
          </div>
        </div>

        {/* Operations: Primary Chatter Lead */}
        <div className="py-5 border-b border-zinc-800/60">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Assigned Chatter Operations
          </h3>
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-rose-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {creator.primary_chatter || 'Unassigned'}
                </div>
                <div className="text-xs text-zinc-400">Primary Chatter Lead & Content Sales</div>
              </div>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
              Active Shift
            </span>
          </div>
        </div>

        {/* Marketing Attribution & Tracking Links */}
        <div className="py-5 border-b border-zinc-800/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Marketing Links & Funnels ({creatorAssets.length})
            </h3>
            <span className="text-[11px] text-zinc-400 font-mono">Infloww Tracking</span>
          </div>

          {creatorAssets.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">No marketing assets directly tagged to this creator.</p>
          ) : (
            <div className="space-y-2.5">
              {creatorAssets.map((asset) => {
                const isCopied = copiedId === asset.asset_id;
                return (
                  <div
                    key={asset.asset_id}
                    className="bg-zinc-900/60 border border-zinc-800/70 rounded-xl p-3.5 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 text-zinc-400" />
                        <span className="text-xs font-semibold text-white">{asset.name}</span>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 capitalize">
                        {asset.asset_type.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/50">
                      <span>Clicks: <b className="text-zinc-200">{asset.clicks.toLocaleString()}</b></span>
                      <span>Conversions: <b className="text-emerald-400">{asset.conversions}</b></span>
                      <span>Conv Rate: <b className="text-zinc-200">{asset.conversion_rate}%</b></span>
                      <span>Attributed: <b className="text-white">${asset.attributed_revenue.toLocaleString()}</b></span>
                    </div>

                    {asset.target_url && (
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[10px] text-zinc-400 truncate font-mono">
                          {asset.target_url}
                        </span>
                        <button
                          onClick={() => handleCopy(asset.asset_id, asset.target_url)}
                          className="shrink-0 flex items-center gap-1 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-[10px] transition-colors"
                        >
                          {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
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
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Chargeback & Dispute Risk
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-medium">
              {isHighRisk ? (
                <span className="flex items-center gap-1 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full text-[10px]">
                  <ShieldAlert className="h-3 w-3" /> High Risk ({creator.chargeback_rate}%)
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px]">
                  <ShieldCheck className="h-3 w-3" /> Safe ({creator.chargeback_rate}%)
                </span>
              )}
            </div>
          </div>

          {creatorChargebacks.length === 0 ? (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3.5 text-center text-xs text-emerald-400">
              Clean Record: No recent chargebacks or active disputes on this profile.
            </div>
          ) : (
            <div className="space-y-2">
              {creatorChargebacks.map((cb) => (
                <div
                  key={cb.id}
                  className="bg-zinc-900/60 border border-zinc-800/70 rounded-xl p-3 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>${cb.amount}</span>
                      <span className="text-[10px] font-mono text-zinc-400">{cb.id}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">{cb.reason}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded border bg-amber-500/10 text-amber-400 border-amber-500/20">
                      {cb.status}
                    </span>
                    <div className="text-[10px] font-mono text-zinc-400 mt-1">{cb.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="mt-auto pt-6 border-t border-zinc-800/80">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
          >
            Close Creator Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
