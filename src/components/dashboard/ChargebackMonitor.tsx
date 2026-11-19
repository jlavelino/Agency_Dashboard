'use client';

import React from 'react';
import { ChargebackRecord } from '@/types/infloww';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
} from 'lucide-react';

interface ChargebackMonitorProps {
  chargebacks: ChargebackRecord[];
}

export default function ChargebackMonitor({ chargebacks }: ChargebackMonitorProps) {
  const totalAmount = chargebacks.reduce((sum, cb) => sum + cb.amount, 0);
  const disputedCount = chargebacks.filter((c) => c.status === 'disputed').length;
  const lostCount = chargebacks.filter((c) => c.status === 'lost').length;
  const resolvedCount = chargebacks.filter((c) => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Total Disputed Volume</span>
            <DollarSign className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-white">${totalAmount.toLocaleString()}</div>
          <p className="text-[11px] text-zinc-400 mt-1">Total chargebacks logged</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Under Dispute</span>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400">{disputedCount} cases</div>
          <p className="text-[11px] text-zinc-400 mt-1">Pending banking review</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Successfully Won</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400">{resolvedCount} cases</div>
          <p className="text-[11px] text-zinc-400 mt-1">Representment accepted</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Lost Disputes</span>
            <XCircle className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-xl font-bold text-zinc-300">{lostCount} cases</div>
          <p className="text-[11px] text-zinc-400 mt-1">Stolen card / unrecoverable</p>
        </div>
      </div>

      {/* Chargebacks Log Table */}
      <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <h3 className="text-sm font-semibold text-white">Dispute & Chargeback Incident Feed</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live tracking from Infloww /chargeback-analytics endpoint
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-5 font-semibold">Incident ID</th>
                <th className="py-3 px-5 font-semibold">Creator</th>
                <th className="py-3 px-5 font-semibold">Disputed Amount</th>
                <th className="py-3 px-5 font-semibold">Reported Reason</th>
                <th className="py-3 px-5 font-semibold">Date Logged</th>
                <th className="py-3 px-5 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {chargebacks.map((cb) => {
                const statusStyles = {
                  disputed: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                  resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                  lost: 'bg-zinc-800 text-zinc-400 border-zinc-700',
                }[cb.status];

                return (
                  <tr key={cb.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-zinc-400 flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{cb.id}</span>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-white">{cb.creator_name}</td>
                    <td className="py-3.5 px-5 font-semibold text-rose-400 text-sm">
                      ${cb.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-zinc-300">{cb.reason}</td>
                    <td className="py-3.5 px-5 font-mono text-zinc-400">{cb.date}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase border ${statusStyles}`}
                      >
                        {cb.status}
                      </span>
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
