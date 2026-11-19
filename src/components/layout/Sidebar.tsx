'use client';

import React from 'react';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Link2,
  ShieldAlert,
  MessageSquare,
  Sparkles,
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
    <aside className="w-64 bg-zinc-950 text-zinc-200 border-r border-zinc-800/80 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-500 via-fuchsia-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white font-bold text-lg">
            M
          </div>
          <div>
            <h1 className="font-semibold text-white tracking-tight text-sm">Muse Management</h1>
            <p className="text-[11px] text-zinc-400">Creator Agency OS</p>
          </div>
        </div>
      </div>

      {/* Connection Status Pill */}
      <div className="px-5 py-3">
        <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 rounded-lg px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isLive ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-amber-400 animate-pulse'}`} />
            <span className="text-zinc-300 font-medium">{isLive ? 'Infloww Live' : 'Infloww Ready'}</span>
          </div>
          <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">OID: 1223928</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-rose-400' : 'text-zinc-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Agency Target Box */}
      <div className="p-4 m-3 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/90 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-rose-400" /> Agency Target
          </span>
          <span className="text-xs font-semibold text-rose-400">92%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-indigo-500 h-1.5 rounded-full w-[92%]" />
        </div>
        <p className="text-[11px] text-zinc-400 mt-2">$148.5K / $160K Monthly Goal</p>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-zinc-800/80 text-xs text-zinc-400 flex items-center justify-between">
        <span>Infloww API v1</span>
        <a
          href="https://infloww-openapi.stoplight.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
        >
          <span>Docs</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
}
