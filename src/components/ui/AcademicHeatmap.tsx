"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS_EN = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const MONTHS_AR = ["أكتوبر", "نوفمبر", "ديسمبر", "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر"];

export function AcademicHeatmap({ isArabic = false }: { isArabic?: boolean }) {
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; count: number } | null>(null);

  // Generate 48 weeks x 7 days
  // Seed a realistic pattern of high activity during midterms, project deadlines, and finals
  const weeks = Array.from({ length: 48 }, (_, w) => {
    return Array.from({ length: 7 }, (_, d) => {
      // Create some variance
      const isWeekend = d === 5 || d === 6;
      const seed = Math.sin(w * 0.45) * Math.cos(d * 1.2);
      let count = 0;
      if (!isWeekend && (w % 4 === 1 || w % 5 === 0 || seed > 0.35)) {
        count = Math.floor(Math.abs(seed) * 5) + 1;
      }
      return count;
    });
  });

  const months = isArabic ? MONTHS_AR : MONTHS_EN;

  const getCellColor = (count: number) => {
    if (count === 0) return "bg-stone-300/40 dark:bg-[#1E2530]";
    if (count === 1) return "bg-[#D1E8D1] dark:bg-[#32523C]";
    if (count === 2) return "bg-[#A7D8A7] dark:bg-[#467A53]";
    if (count === 3) return "bg-[#72BE72] dark:bg-[#5E9E6D]";
    return "bg-[#3D8F42] dark:bg-[#85C5B5]";
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] select-none">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
            {isArabic ? "قطرة قطرة .. يُبنى التفوق" : "Little by little"}
          </h2>
          <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
            {isArabic
              ? "482 عملية تفاعل أكاديمي (حضور محاضرات، كويزات، ومذكرات ملخصة بالذكاء الاصطناعي)"
              : "482 academic interactions (lecture check-ins, lab quizzes, AI summary reviews)"}
          </p>
        </div>

        <a
          href="#attendance"
          className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent-terracotta)] hover:underline"
        >
          <span>{isArabic ? "سجل الحضور الكامل" : "Academic Ledger"}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Month Labels */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[620px]">
          <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)] mb-1.5 px-1">
            {months.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>

          {/* Grid: 7 rows x 48 columns */}
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {weeks.map((weekDays, wIndex) =>
              weekDays.map((count, dIndex) => (
                <div
                  key={`${wIndex}-${dIndex}`}
                  onMouseEnter={() => setHoveredCell({ week: wIndex, day: dIndex, count })}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={cn(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-transform hover:scale-125 cursor-pointer",
                    getCellColor(count)
                  )}
                />
              ))
            )}
          </div>

          {/* Legend and Hover info */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-[11px] font-mono text-[var(--ink-muted)]">
            <div>
              {hoveredCell ? (
                <span className="text-[var(--accent-terracotta)] font-bold">
                  {hoveredCell.count > 0
                    ? isArabic
                      ? `الأسبوع ${hoveredCell.week + 1}: سجل ${hoveredCell.count} أنشطة تعليمية`
                      : `Week ${hoveredCell.week + 1}: ${hoveredCell.count} academic events verified`
                    : isArabic
                    ? "لا توجد محاضرات في هذا اليوم"
                    : "No lectures scheduled on this day"}
                </span>
              ) : (
                <span>
                  {isArabic
                    ? "معدل التزام فصلي: 94.6% • خلو تام من أي حرمان"
                    : "Semester Attendance Consistency: 94.6% • Zero Deprivation Flags"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span>{isArabic ? "أقل" : "Less"}</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-stone-300/40 dark:bg-[#1E2530]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#D1E8D1] dark:bg-[#32523C]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#A7D8A7] dark:bg-[#467A53]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#72BE72] dark:bg-[#5E9E6D]" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-[#3D8F42] dark:bg-[#85C5B5]" />
              <span>{isArabic ? "أكثر" : "More"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
