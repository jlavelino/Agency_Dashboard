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
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLive: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isLive,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'creators', label: 'Creators Portfolio', icon: Users },
    { id: 'revenue', label: 'Revenue & Trends', icon: TrendingUp },
    { id: 'marketing', label: 'Marketing & Links', icon: Link2 },
    { id: 'chatters', label: 'Chatter Team ROI', icon: MessageSquare },
    { id: 'chargebacks', label: 'Risk & Chargebacks', icon: ShieldAlert },
  ];

  return (
    <aside
      className={`bg-white text-slate-700 border-r border-slate-200/90 flex flex-col shrink-0 min-h-screen transition-all duration-300 ease-in-out z-20 ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Brand Header & Collapse Toggle */}
      <div className="h-16 px-4 border-b border-slate-200/90 flex items-center justify-between shrink-0">
        <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
            M
          </div>
          {!isCollapsed && (
            <div className="min-w-0 transition-opacity duration-200">
              <h1 className="font-bold text-slate-900 tracking-tight text-sm leading-none truncate">
                Muse Management
              </h1>
              <p className="text-[11px] text-slate-500 mt-1 truncate">Agency Command OS</p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* When collapsed, small expand button under header */}
      {isCollapsed && (
        <div className="flex justify-center py-2 border-b border-slate-100">
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Connection Status Pill */}
      <div className="px-3 py-3">
        {isCollapsed ? (
          <div
            title={isLive ? 'Infloww Live (OID: 1223928)' : 'Infloww Connected (OID: 1223928)'}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-default"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isLive ? 'bg-emerald-500 shadow-sm animate-pulse' : 'bg-indigo-600'
              }`}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  isLive ? 'bg-emerald-500 shadow-sm' : 'bg-indigo-600'
                }`}
              />
              <span className="text-slate-800 font-semibold truncate">
                {isLive ? 'Infloww Live' : 'Infloww Connected'}
              </span>
            </div>
            <span className="text-[10px] text-slate-600 font-mono bg-slate-200/70 px-2 py-0.5 rounded-full shrink-0">
              OID: 1223928
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'gap-3 px-3 py-2.5'
              } ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? 'text-indigo-600' : 'text-slate-400'
                }`}
              />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Agency Goal Summary Box */}
      <div className="px-2.5 mb-2">
        {isCollapsed ? (
          <div
            title="Monthly Target: 92% ($148.5K / $160K Goal)"
            className="flex flex-col items-center justify-center p-2 bg-slate-50 border border-slate-200 rounded-xl text-center cursor-default"
          >
            <span className="text-[10px] font-bold text-indigo-600 font-mono">92%</span>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-1 overflow-hidden">
              <div className="bg-indigo-600 h-1 rounded-full w-[92%]" />
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-700">Monthly Target</span>
              <span className="text-xs font-bold text-indigo-600 font-mono">92%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-600 h-1.5 rounded-full w-[92%]" />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 font-mono font-medium">
              $148.5K / $160K Goal
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200/90 text-xs text-slate-500">
        {isCollapsed ? (
          <div className="flex justify-center">
            <a
              href="https://infloww-openapi.stoplight.io/"
              target="_blank"
              rel="noopener noreferrer"
              title="Infloww OpenAPI v1 Documentation"
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[10px]">Infloww OpenAPI v1</span>
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
        )}
      </div>
    </aside>
  );
}
