'use client';

import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const STEPS = [
  'Connecting to Infloww API…',
  'Fetching creator portfolio…',
  'Loading revenue metrics…',
  'Syncing chatter performance…',
  'Building your dashboard…',
];

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle through status steps
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 520);
    return () => clearInterval(interval);
  }, [visible]);

  // Animate progress bar
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev; // hold near end until actually done
        return prev + Math.random() * 14;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [visible]);

  // When loading finishes, complete progress then fade out
  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      const timer = setTimeout(() => setFadeOut(true), 350);
      const hide = setTimeout(() => setVisible(false), 850);
      return () => {
        clearTimeout(timer);
        clearTimeout(hide);
      };
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex flex-col items-center gap-6 px-8 max-w-xs w-full">
        {/* Logo mark */}
        <div className="relative">
          {/* Outer pulse ring */}
          <span className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping" />
          <div className="relative h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-black text-2xl tracking-tight">M</span>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Muse Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Agency Command OS</p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>

          {/* Status text */}
          <p className="text-center text-[11px] text-slate-400 mt-2.5 font-mono h-4 transition-all duration-300">
            {STEPS[stepIndex]}
          </p>
        </div>

        {/* Three dot spinner */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="absolute bottom-6 text-[10px] text-slate-300 font-mono">
        Infloww OpenAPI v1 · OID: 1223928978604066
      </p>
    </div>
  );
}
