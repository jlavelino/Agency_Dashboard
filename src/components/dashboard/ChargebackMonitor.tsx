'use client';

import React from 'react';
import { ChargebackRecord } from '@/types/infloww';
import { getScaledChargebacks } from '@/lib/timeframeUtils';
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
  timeframe?: string;
}

export default function ChargebackMonitor({
  chargebacks,
  timeframe = '30D',
}: ChargebackMonitorProps) {
  const activeChargebacks = getScaledChargebacks(chargebacks, timeframe);
  const totalAmount = activeChargebacks.reduce((sum, cb) => sum + cb.amount, 0);
  const disputedCount = activeChargebacks.filter((c) => c.status === 'disputed').length;
  const lostCount = activeChargebacks.filter((c) => c.status === 'lost').length;
  const resolvedCount = activeChargebacks.filter((c) => c.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Total Disputed Volume</span>
            <DollarSign className="h-4 w-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">${totalAmount.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-1">Total chargebacks logged</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Under Dispute</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">{disputedCount} cases</div>
          <p className="text-[11px] text-slate-500 mt-1">Pending banking review</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Successfully Won</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">{resolvedCount} cases</div>
          <p className="text-[11px] text-slate-500 mt-1">Representment accepted</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Lost Disputes</span>
            <XCircle className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-700 font-mono">{lostCount} cases</div>
          <p className="text-[11px] text-slate-500 mt-1">Stolen card / unrecoverable</p>
        </div>
      </div>

      {/* Chargebacks Log Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-900/5">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">Dispute & Chargeback Incident Feed</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking from Infloww /chargeback-analytics endpoint
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/85 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-5 font-semibold">Incident ID</th>
                <th className="py-3 px-5 font-semibold">Creator</th>
                <th className="py-3 px-5 font-semibold">Disputed Amount</th>
                <th className="py-3 px-5 font-semibold">Reported Reason</th>
                <th className="py-3 px-5 font-semibold">Date Logged</th>
                <th className="py-3 px-5 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {activeChargebacks.map((cb) => {
                const statusStyles = {
                  disputed: 'bg-amber-50 text-amber-700 border-amber-200',
                  resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  lost: 'bg-slate-100 text-slate-600 border-slate-200',
                }[cb.status];

                return (
                  <tr key={cb.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-slate-500 flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>{cb.id}</span>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{cb.creator_name}</td>
                    <td className="py-3.5 px-5 font-bold text-rose-600 text-sm font-mono">
                      ${cb.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 text-slate-700">{cb.reason}</td>
                    <td className="py-3.5 px-5 font-mono text-slate-500">{cb.date}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusStyles}`}
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
