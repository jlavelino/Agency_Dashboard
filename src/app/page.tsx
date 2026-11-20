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
import { getScaledSummary } from '@/lib/timeframeUtils';
import { exportAgencyAuditCsv } from '@/lib/exportCsv';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

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
      console.warn('API sync warning; rendering cached portfolio dataset.', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeSummary = getScaledSummary(summary, timeframe);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
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
          onExportCsv={() => exportAgencyAuditCsv(activeSummary, creators, marketingAssets, chargebacks)}
        />

        <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Executive Overview Header Banner */}
          <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Infloww API Active
                </span>
                <span className="text-xs text-indigo-700 font-mono font-medium">Agency OID: 1223928978604066</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Agency Operations Command
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Managing revenue velocity, chatter shift efficiency, subscriber acquisition, and risk across 8 managed creators.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('creators')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>Creator Roster</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('chatters')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all"
              >
                <Zap className="h-3.5 w-3.5 text-indigo-600" />
                <span>Chatter Sales</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Executive Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <KPICards summary={activeSummary} />
              <RevenueChart timeframe={timeframe} />
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
              <RevenueChart timeframe={timeframe} />
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
