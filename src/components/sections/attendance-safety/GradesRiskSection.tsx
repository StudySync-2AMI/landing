"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Award,
} from "lucide-react";

export function GradesRiskSection() {
  const { dict } = useLanguage();
  const s = dict.s6_grades;

  // Simulator states
  const [attendance, setAttendance] = useState(78);
  const [missingTasks, setMissingTasks] = useState(1);

  // Compute calculated risk tier based on rules
  const getRiskStatus = () => {
    if (attendance <= 75 || missingTasks >= 3) {
      return s.levels[3]; // Critical
    }
    if (attendance <= 77 || missingTasks >= 2) {
      return s.levels[2]; // At Risk
    }
    if (attendance <= 84 || missingTasks >= 1) {
      return s.levels[1]; // Attention Required
    }
    return s.levels[0]; // Safe
  };

  const currentRisk = getRiskStatus();

  return (
    <section id="sec-06" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <NotebookCard variant="plain" className="p-5 mb-8 border-s-4 border-s-indigo-500">
        <p className="text-sm md:text-base leading-relaxed text-[var(--ink-secondary)]">
          {s.intro}
        </p>
      </NotebookCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 4 Matrix Rules Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-bold text-base text-[var(--ink-primary)] mb-3">
            {s.matrixTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.levels.map((lvl) => (
              <div
                key={lvl.id}
                className={`p-4 rounded-xl border transition-all ${lvl.badgeClass}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm">{lvl.name}</span>
                  {lvl.id === "safe" && <CheckCircle2 className="w-4 h-4" />}
                  {lvl.id === "attention" && <AlertTriangle className="w-4 h-4" />}
                  {(lvl.id === "risk" || lvl.id === "critical") && (
                    <ShieldAlert className="w-4 h-4" />
                  )}
                </div>

                <div className="text-xs font-semibold mb-2 opacity-90">
                  {s.conditionPrefix}
                  {lvl.condition}
                </div>

                <div className="p-2 rounded-md bg-white/40 dark:bg-black/30 text-xs font-medium italic">
                  &ldquo;{lvl.message}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Risk Simulator */}
        <div className="lg:col-span-5">
          <NotebookCard variant="ruled" className="p-6">
            <div className="flex items-center gap-2 mb-4 font-bold text-base text-[var(--ink-primary)]">
              <Sliders className="w-5 h-5 text-amber-500" />
              <span>{s.simulator.title}</span>
            </div>

            {/* Attendance Slider */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[var(--ink-secondary)]">
                  {s.simulator.attendanceLabel}
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400">
                  {attendance}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                value={attendance}
                onChange={(e) => setAttendance(Number(e.target.value))}
                aria-label={s.simulator.attendanceLabel}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--ink-muted)] font-mono">
                <span>60%</span>
                <span className="text-rose-500 font-bold">75% (Limit)</span>
                <span>100%</span>
              </div>
            </div>

            {/* Missing Tasks Radio Selector */}
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-[var(--ink-secondary)] block">
                {s.simulator.missingTasksLabel}
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMissingTasks(num)}
                    className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                      missingTasks === num
                        ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                        : "bg-[var(--paper-bg)] text-[var(--ink-primary)] border-[var(--paper-card-border)] hover:bg-[var(--paper-card)]"
                    }`}
                  >
                    {num === 3 ? "3+" : num}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Calculated Output Result */}
            <div className="pt-4 border-t border-[var(--paper-card-border)]">
              <div className="text-xs font-mono font-bold text-[var(--ink-muted)] mb-2">
                {s.simulator.diagnosisTitle}
              </div>

              <div className={`p-4 rounded-xl border ${currentRisk.badgeClass} animate-in fade-in`}>
                <div className="font-black text-sm mb-1">{currentRisk.name}</div>
                <p className="text-xs font-medium leading-relaxed">
                  {currentRisk.message}
                </p>
              </div>
            </div>
          </NotebookCard>
        </div>
      </div>
    </section>
  );
}
