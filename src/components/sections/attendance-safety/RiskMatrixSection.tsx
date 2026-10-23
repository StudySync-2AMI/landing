"use client";

import React, { useState } from "react";
import { Calculator, ShieldCheck, AlertTriangle, AlertOctagon, RotateCcw } from "lucide-react";
import { Tape } from "@/ui/Tape";
import { useLanguage } from "@/context/LanguageContext";

export function RiskMatrixSection() {
  const { dict } = useLanguage();
  const rm = dict.riskMatrix;

  const [attendancePercent, setAttendancePercent] = useState<number>(82);
  const [midtermPercent, setMidtermPercent] = useState<number>(68);
  const [quizParticipation, setQuizParticipation] = useState<number>(85);

  const attendanceRiskWeight = (100 - attendancePercent) * 0.45;
  const gradeRiskWeight = (100 - midtermPercent) * 0.35;
  const quizRiskWeight = (100 - quizParticipation) * 0.2;
  const priorityScore = Math.round(attendanceRiskWeight + gradeRiskWeight + quizRiskWeight);

  let statusLevel: "safe" | "warning" | "critical" = "safe";
  let statusBadge = rm.safeBadge;
  let statusAction = rm.safeAction;

  if (attendancePercent < 75 || priorityScore > 40) {
    statusLevel = "critical";
    statusBadge = rm.criticalBadge;
    statusAction = rm.criticalAction;
  } else if (attendancePercent <= 85 || priorityScore > 22) {
    statusLevel = "warning";
    statusBadge = rm.warningBadge;
    statusAction = rm.warningAction;
  }

  const pillStyles = {
    safe: "bg-[#D1E8D1] text-[#1E3A24] dark:bg-[#69A384]/30 dark:text-[#A7E8C4] border-emerald-600/40",
    warning: "bg-[#FDF1CC] text-[#4A3800] dark:bg-[#E5BE54]/30 dark:text-[#FFEBA8] border-amber-600/40",
    critical: "bg-[#FAD4C0] text-[#7A1C1C] dark:bg-[#E86A46]/30 dark:text-[#FFB69E] border-rose-600/40",
  };

  const handleReset = () => {
    setAttendancePercent(82);
    setMidtermPercent(68);
    setQuizParticipation(85);
  };

  return (
    <section id="matrix" className="relative p-6 sm:p-8 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[4px_4px_0px_#1A1A1A] select-none my-8">
      <Tape color="mint" rotation="slight-left" position="top-left" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[var(--accent-terracotta)]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
              {rm.title}
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
            {rm.subtitle}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="scrapbook-btn bg-[var(--surface-subtle)] text-[var(--ink-primary)] hover:bg-[#F2EFE7] dark:hover:bg-[#232D3B] text-xs font-mono flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{rm.reset}</span>
        </button>
      </div>

      {/* Priority Score Formula Chip */}
      <div className="mb-6 p-2.5 rounded-md bg-[var(--surface-subtle)] border border-[var(--border-paper)] font-mono text-xs text-[var(--ink-secondary)]">
        {rm.equation}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-7 space-y-5">
          {/* Attendance Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="font-bold text-[var(--ink-primary)]">{rm.rateAttendance}</span>
              <span className={attendancePercent < 75 ? "text-rose-600 font-bold" : "text-[var(--accent-terracotta)] font-bold"}>
                {attendancePercent}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={attendancePercent}
              onChange={(e) => setAttendancePercent(Number(e.target.value))}
              className="w-full accent-[var(--accent-terracotta)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)] mt-0.5">
              <span>50%</span>
              <span className="text-rose-500 font-bold">75% (Deprivation Limit)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Midterm Score Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="font-bold text-[var(--ink-primary)]">{rm.rateMidterm}</span>
              <span className="font-bold text-[var(--accent-oxford)]">{midtermPercent}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={midtermPercent}
              onChange={(e) => setMidtermPercent(Number(e.target.value))}
              className="w-full accent-[var(--accent-oxford)] cursor-pointer"
            />
          </div>

          {/* Quiz & Lab Participation Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="font-bold text-[var(--ink-primary)]">{rm.rateQuiz}</span>
              <span className="font-bold text-[var(--accent-sage)]">{quizParticipation}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={quizParticipation}
              onChange={(e) => setQuizParticipation(Number(e.target.value))}
              className="w-full accent-[var(--accent-sage)] cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Result Indicator Card */}
        <div className="lg:col-span-5">
          <div className="p-5 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-subtle)] text-center relative overflow-hidden">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink-muted)]">
              {rm.scoreLabel}
            </div>
            <div className="font-serif text-5xl sm:text-6xl font-black text-[var(--ink-primary)] my-2">
              {priorityScore}
            </div>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase mb-3 ${pillStyles[statusLevel]}`}>
              {statusLevel === "safe" && <ShieldCheck className="w-3.5 h-3.5" />}
              {statusLevel === "warning" && <AlertTriangle className="w-3.5 h-3.5" />}
              {statusLevel === "critical" && <AlertOctagon className="w-3.5 h-3.5" />}
              <span>{statusBadge}</span>
            </div>

            <p className="text-xs text-[var(--ink-secondary)] leading-relaxed font-sans mb-3 px-2">
              {statusAction}
            </p>

            <div className="pt-3 border-t border-[var(--border-paper)]/40 font-mono text-[10px] text-[var(--ink-muted)]">
              {rm.deprivationThreshold}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
