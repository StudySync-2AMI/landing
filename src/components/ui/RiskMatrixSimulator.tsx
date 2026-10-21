"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, AlertOctagon, HelpCircle, Calculator, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tape } from "./Tape";
import { Highlighter } from "./Highlighter";

export function RiskMatrixSimulator({ isArabic = false }: { isArabic?: boolean }) {
  // Inputs from StudySync Section 6 and 8
  const [attendancePercent, setAttendancePercent] = useState<number>(82);
  const [midtermPercent, setMidtermPercent] = useState<number>(68);
  const [quizParticipation, setQuizParticipation] = useState<number>(85);

  // Calculation logic based on Section 6 & 8:
  // Deprivation threshold is 75% attendance.
  // Below 75% = Critical Deprivation Risk.
  // 75% - 85% = Warning / Caution.
  // > 85% = Safe.
  // Priority Score Equation = (100 - Attendance) * 0.45 + (100 - Midterm) * 0.35 + (100 - Quizzes) * 0.20
  const attendanceRiskWeight = (100 - attendancePercent) * 0.45;
  const gradeRiskWeight = (100 - midtermPercent) * 0.35;
  const quizRiskWeight = (100 - quizParticipation) * 0.2;
  const priorityScore = Math.round(attendanceRiskWeight + gradeRiskWeight + quizRiskWeight);

  let statusLevel: "safe" | "warning" | "critical" = "safe";
  let statusBadge = isArabic ? "آمن ومستقر" : "Safe • Low Risk";
  let statusAction = isArabic
    ? "سجل منتظم ومستقر. لا توجد أي مؤشرات حرمان حالياً."
    : "Excellent academic standing. Zero deprivation risk detected.";

  if (attendancePercent < 75 || priorityScore > 40) {
    statusLevel = "critical";
    statusBadge = isArabic ? "حرج // مهدد بالحرمان" : "Critical // Course Deprivation Risk";
    statusAction = isArabic
      ? "تنبيه فوري! نسبة الحضور دون الحد الأدنى (75%). سيتم إشعار المرشد الأكاديمي لتقديم عذر معتمد."
      : "Immediate intervention required! Attendance below 75% threshold. Proactive escalation sent to academic advisor.";
  } else if (attendancePercent <= 85 || priorityScore > 22) {
    statusLevel = "warning";
    statusBadge = isArabic ? "إنذار وقائي // اقتراب من الحرمان" : "Warning // Approaching Deprivation Limit";
    statusAction = isArabic
      ? "تنبيه استباقي: غياب محاضرة إضافية واحدة سينقلك لمنطقة الحرمان. نوصي بتكثيف الحضور."
      : "Proactive caution: Exactly 1 more absence will breach safe thresholds. Automated nudge dispatched.";
  }

  const pillStyles = {
    safe: "bg-[#D1E8D1] text-[#1E3A24] dark:bg-[#69A384]/30 dark:text-[#A7E8C4] border-emerald-600/40",
    warning: "bg-[#FDF1CC] text-[#4A3800] dark:bg-[#E5BE54]/30 dark:text-[#FFEBA8] border-amber-600/40",
    critical: "bg-[#FAD4C0] text-[#7A1C1C] dark:bg-[#E86A46]/30 dark:text-[#FFB69E] border-rose-600/40",
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[4px_4px_0px_#1A1A1A] select-none my-8">
      <Tape color="mint" rotation="slight-left" position="top-left" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[var(--accent-terracotta)]" />
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
              {isArabic ? "محاكي مصفوفة الإنذار ومعادلة الأولوية" : "Academic Risk Matrix & Priority Score Simulator"}
            </h3>
          </div>
          <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
            {isArabic
              ? "معادلة احتساب درجة الخطر وفق توثيق StudySync (البند 6 و 8)"
              : "Live rules engine computing Priority Score from attendance and grade thresholds"}
          </p>
        </div>

        {/* Live Status Pill */}
        <div
          className={cn(
            "px-3.5 py-1.5 rounded-full border-2 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs",
            pillStyles[statusLevel]
          )}
        >
          {statusLevel === "safe" && <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />}
          {statusLevel === "warning" && <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400" />}
          {statusLevel === "critical" && <AlertOctagon className="w-4 h-4 text-rose-700 dark:text-rose-400" />}
          <span>{statusBadge}</span>
        </div>
      </div>

      {/* Interactive Controls & Live Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Sliders */}
        <div className="lg:col-span-7 space-y-5">
          {/* Slider 1: Attendance */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-[var(--ink-primary)]">
                {isArabic ? "1. نسبة حضور المحاضرات والسكاشن:" : "1. Verified Attendance Rate:"}
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border-paper)]/30 font-black text-sm">
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
            <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
              <span>{isArabic ? "50% (حرمان حتمي)" : "50% (Deprivation)"}</span>
              <span className="text-amber-600 font-bold">{isArabic ? "75% (الحد الأدنى)" : "75% (Cut-off)"}</span>
              <span className="text-emerald-700 font-bold">{isArabic ? "100% (مثالي)" : "100% (Full)"}</span>
            </div>
          </div>

          {/* Slider 2: Midterm */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-[var(--ink-primary)]">
                {isArabic ? "2. متوسط أعمال السنة والميدتيرم:" : "2. Midterm & Coursework Score:"}
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border-paper)]/30 font-black text-sm">
                {midtermPercent}%
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={midtermPercent}
              onChange={(e) => setMidtermPercent(Number(e.target.value))}
              className="w-full accent-[var(--accent-oxford)] cursor-pointer"
            />
          </div>

          {/* Slider 3: Quiz Participation */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-[var(--ink-primary)]">
                {isArabic ? "3. التفاعل مع التكليفات والكويزات:" : "3. Quizzes & Lab Tasks:"}
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border-paper)]/30 font-black text-sm">
                {quizParticipation}%
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={quizParticipation}
              onChange={(e) => setQuizParticipation(Number(e.target.value))}
              className="w-full accent-[var(--accent-sage)] cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Calculated Composite Priority Score Card */}
        <div className="lg:col-span-5 relative">
          <div
            className={cn(
              "p-5 rounded-xl border-2 transition-all",
              statusLevel === "safe" && "bg-emerald-50/70 border-emerald-700/40 dark:bg-[#1A2E22]",
              statusLevel === "warning" && "bg-amber-50/70 border-amber-700/40 dark:bg-[#2E2818]",
              statusLevel === "critical" && "bg-rose-50/70 border-rose-700/40 dark:bg-[#331818]"
            )}
          >
            <div className="flex items-center justify-between text-xs font-mono text-[var(--ink-muted)] mb-1">
              <span>{isArabic ? "معامل الأولوية المركب" : "COMPOSITE PRIORITY SCORE"}</span>
              <span className="font-bold">P-SCORE</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl sm:text-5xl font-black text-[var(--ink-primary)]">
                {priorityScore}
              </span>
              <span className="font-mono text-sm text-[var(--ink-muted)]">/ 100</span>
            </div>

            <p className="text-xs text-[var(--ink-secondary)] font-medium leading-relaxed mt-3">
              {statusAction}
            </p>

            <div className="mt-4 pt-3 border-t border-[var(--border-paper)]/20 flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)]">
              <span>{isArabic ? "سياسة الخصوصية: FERPA Safe" : "Privacy: Zero-Knowledge"}</span>
              <span className="text-[var(--accent-terracotta)] font-bold">
                {isArabic ? "تنبيه مبكر قبل 3 أسابيع" : "3-Week Early Lead"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
