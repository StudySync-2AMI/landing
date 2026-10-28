"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader, NotebookCard, StampBadge } from "@/ui";
import {
  QrCode,
  ShieldCheck,
  MapPin,
  Clock,
  AlertTriangle,
  RotateCw,
  CheckCircle2,
} from "lucide-react";

export function AttendanceSection() {
  const { dict } = useLanguage();
  const s = dict.s5_attendance;

  const [timeLeft, setTimeLeft] = useState(10);
  const [token, setToken] = useState("TK-88219-XF");
  const [isScanned, setIsScanned] = useState(false);

  // Auto-refresh dynamic token every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setToken(`TK-${Math.floor(10000 + Math.random() * 90000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateScan = async () => {
    setIsScanned(true);
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // Graceful fallback if confetti module fails
    }
    setTimeout(() => {
      setIsScanned(false);
    }, 4000);
  };

  return (
    <section id="sec-05" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 5 Feature Cards */}
        <div className="lg:col-span-7 space-y-4">
          {s.features.map((feat, idx) => (
            <NotebookCard
              key={idx}
              variant="plain"
              holePunches={false}
              className="p-4 flex items-start gap-3.5 border-s-4 border-s-amber-500"
            >
              <span className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <div>
                <h4 className="text-sm font-bold text-[var(--ink-primary)] mb-1">
                  {feat.title}
                </h4>
                <p className="text-xs md:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </NotebookCard>
          ))}
        </div>

        {/* Right Side: Interactive Dynamic QR & Deprivation Gauge */}
        <div className="lg:col-span-5 space-y-6">
          <NotebookCard variant="grid" className="p-6 text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[var(--ink-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {s.interactive.liveSession}
              </span>
              <StampBadge variant="approved">
                <ShieldCheck className="w-3 h-3 me-1 inline" />
                Anti-Proxy
              </StampBadge>
            </div>

            {/* Simulated Dynamic QR Box */}
            <div className="relative mx-auto w-48 h-48 rounded-2xl bg-white p-4 border-2 border-dashed border-amber-500/50 shadow-inner flex flex-col items-center justify-center">
              <QrCode className="w-32 h-32 text-slate-900 animate-pulse duration-1000" />
              <div className="mt-1 font-mono text-[10px] text-slate-600 font-bold tracking-wider">
                {token}
              </div>

              {/* Refresh countdown overlay badge */}
              <div className="absolute top-2 end-2 px-1.5 py-0.5 rounded bg-amber-500 text-white font-mono text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <RotateCw className="w-2.5 h-2.5 animate-spin" />
                {timeLeft}s
              </div>
            </div>

            <div className="mt-4 text-xs text-[var(--ink-secondary)] flex items-center justify-center gap-1">
              <span>{s.interactive.tokenRefresh}</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {timeLeft} {s.interactive.seconds}
              </span>
            </div>

            {/* Scan Simulation Button */}
            <button
              onClick={handleSimulateScan}
              disabled={isScanned}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>{s.interactive.scanBtn}</span>
            </button>

            {/* Success toast */}
            {isScanned && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{s.interactive.scannedSuccess}</span>
              </div>
            )}

            {/* Deprivation warning progress bar */}
            <div className="mt-6 pt-6 border-t border-[var(--paper-card-border)] text-start">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-[var(--ink-secondary)] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  {s.interactive.remainingAbsences}
                </span>
                <span className="text-rose-600 dark:text-rose-400 font-mono">
                  {s.interactive.absenceCount}
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-3 rounded-full bg-[var(--paper-bg)] border border-[var(--paper-card-border)] overflow-hidden flex">
                <div className="h-full bg-emerald-500 w-[77%]" title="77% Attendance" />
                <div className="h-full bg-rose-500/40 w-[23%]" title="23% Absences" />
              </div>
              <div className="flex justify-between text-[10px] text-[var(--ink-muted)] mt-1 font-mono">
                <span>0%</span>
                <span className="text-rose-500 font-bold">75% {s.interactive.threshold}</span>
                <span>100%</span>
              </div>
            </div>
          </NotebookCard>
        </div>
      </div>
    </section>
  );
}
