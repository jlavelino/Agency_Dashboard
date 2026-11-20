'use client';

import React from 'react';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Link2,
  ShieldAlert,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLive: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, isLive }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'creators', label: 'Creators Portfolio', icon: Users },
    { id: 'revenue', label: 'Revenue & Trends', icon: TrendingUp },
    { id: 'marketing', label: 'Marketing & Links', icon: Link2 },
    { id: 'chatters', label: 'Chatter Team ROI', icon: MessageSquare },
    { id: 'chargebacks', label: 'Risk & Chargebacks', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 bg-white text-slate-700 border-r border-slate-200 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-sm">
            M
          </div>
          <div>
            <h1 className="font-bold text-slate-900 tracking-tight text-sm leading-none">Muse Management</h1>
            <p className="text-[11px] text-slate-500 mt-1">Agency Command OS</p>
          </div>
        </div>
      </div>

      {/* Connection Status Pill */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isLive ? 'bg-emerald-500 shadow-sm' : 'bg-indigo-600'
              }`}
            />
            <span className="text-slate-800 font-semibold">
              {isLive ? 'Infloww Live' : 'Infloww Connected'}
            </span>
          </div>
          <span className="text-[10px] text-slate-600 font-mono bg-slate-200/70 px-2 py-0.5 rounded-full">
            OID: 1223928
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Agency Goal Summary Box */}
      <div className="p-4 m-3 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-700">Monthly Target</span>
          <span className="text-xs font-bold text-indigo-600 font-mono">92%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div className="bg-indigo-600 h-2 rounded-full w-[92%]" />
        </div>
        <p className="text-[11px] text-slate-500 mt-2 font-mono font-medium">$148.5K / $160K Goal</p>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span className="font-mono text-[11px]">Infloww OpenAPI v1</span>
        <a
          href="https://infloww-openapi.stoplight.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors text-[11px]"
        >
          <span>Docs</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
}
