'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KPICards from '@/components/dashboard/KPICards';
import RevenueChart from '@/components/dashboard/RevenueChart';
import CreatorTable from '@/components/dashboard/CreatorTable';
import MarketingPanel from '@/components/dashboard/MarketingPanel';
import ChattersPanel from '@/components/dashboard/ChattersPanel';
import ChargebackMonitor from '@/components/dashboard/ChargebackMonitor';
import CreatorDetailDrawer from '@/components/dashboard/CreatorDetailDrawer';
import { Creator, MarketingAsset, ChargebackRecord, AgencyMetricsSummary } from '@/types/infloww';
import { mockAgencySummary, mockCreators, mockMarketingAssets, mockChargebacks } from '@/lib/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [timeframe, setTimeframe] = useState<string>('30D');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const [summary, setSummary] = useState<AgencyMetricsSummary>(mockAgencySummary);
  const [creators, setCreators] = useState<Creator[]>(mockCreators);
  const [marketingAssets, setMarketingAssets] = useState<MarketingAsset[]>(mockMarketingAssets);
  const [chargebacks, setChargebacks] = useState<ChargebackRecord[]>(mockChargebacks);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [creatorsRes, marketingRes, chargebacksRes, summaryRes] = await Promise.allSettled([
        fetch('/api/creators').then((r) => r.json()),
        fetch('/api/marketing').then((r) => r.json()),
        fetch('/api/chargebacks').then((r) => r.json()),
        fetch('/api/summary').then((r) => r.json()),
      ]);

      if (creatorsRes.status === 'fulfilled' && creatorsRes.value?.creators) {
        setCreators(creatorsRes.value.creators);
        if (creatorsRes.value.isLive) setIsLive(true);
      }

      if (marketingRes.status === 'fulfilled' && marketingRes.value?.assets) {
        setMarketingAssets(marketingRes.value.assets);
      }

      if (chargebacksRes.status === 'fulfilled' && chargebacksRes.value?.chargebacks) {
        setChargebacks(chargebacksRes.value.chargebacks);
      }

      if (summaryRes.status === 'fulfilled' && summaryRes.value?.summary) {
        setSummary(summaryRes.value.summary);
      }
    } catch (e) {
      console.warn('Using client-side dataset:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isLive={isLive} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          onRefresh={loadData}
          isLoading={isLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Executive Overview Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-rose-950/40 via-zinc-900 to-indigo-950/40 border border-zinc-800/80 rounded-3xl p-6 sm:p-8">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Sparkles className="h-3.5 w-3.5" /> Infloww API Connected
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Agency OID: 1223928978604066</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Agency Command Center
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                  Monitoring revenue velocity, chatter shift efficiency, subscriber acquisition, and chargeback risk across 8 managed creators.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('creators')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Explore Creator Roster</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTab('chatters')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-all"
                >
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>Chatter ROI</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab 1: Executive Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <KPICards summary={summary} />
              <RevenueChart />
              <CreatorTable
                creators={creators}
                searchFilter={searchQuery}
                onSelectCreator={setSelectedCreator}
              />
              <MarketingPanel assets={marketingAssets} />
            </div>
          )}

          {/* Tab 2: Creators */}
          {activeTab === 'creators' && (
            <div className="space-y-6 animate-fadeIn">
              <CreatorTable
                creators={creators}
                searchFilter={searchQuery}
                onSelectCreator={setSelectedCreator}
              />
            </div>
          )}

          {/* Tab 3: Revenue & Trends */}
          {activeTab === 'revenue' && (
            <div className="space-y-6 animate-fadeIn">
              <RevenueChart />
            </div>
          )}

          {/* Tab 4: Marketing & Tracking Links */}
          {activeTab === 'marketing' && (
            <div className="space-y-6 animate-fadeIn">
              <MarketingPanel assets={marketingAssets} />
            </div>
          )}

          {/* Tab 5: Chatter Team ROI */}
          {activeTab === 'chatters' && (
            <div className="space-y-6 animate-fadeIn">
              <ChattersPanel />
            </div>
          )}

          {/* Tab 6: Risk & Chargebacks */}
          {activeTab === 'chargebacks' && (
            <div className="space-y-6 animate-fadeIn">
              <ChargebackMonitor chargebacks={chargebacks} />
            </div>
          )}
        </main>

        {/* Creator Drilldown Drawer */}
        <CreatorDetailDrawer
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          marketingAssets={marketingAssets}
          chargebacks={chargebacks}
        />
      </div>
    </div>
  );
}
