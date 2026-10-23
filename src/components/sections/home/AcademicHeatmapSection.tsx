"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AcademicHeatmapSection() {
  const { dict } = useLanguage();
  const hm = dict.academicHeatmap;
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; count: number } | null>(null);

  const weeks = Array.from({ length: 48 }, (_, w) => {
    return Array.from({ length: 7 }, (_, d) => {
      const isWeekend = d === 5 || d === 6;
      const seed = Math.sin(w * 0.45) * Math.cos(d * 1.2);
      let count = 0;
      if (!isWeekend && (w % 4 === 1 || w % 5 === 0 || seed > 0.35)) {
        count = Math.floor(Math.abs(seed) * 5) + 1;
      }
      return count;
    });
  });

  const getCellColor = (count: number) => {
    if (count === 0) return "bg-stone-300/40 dark:bg-[#1E2530]";
    if (count === 1) return "bg-[#D1E8D1] dark:bg-[#32523C]";
    if (count === 2) return "bg-[#A7D8A7] dark:bg-[#467A53]";
    if (count === 3) return "bg-[#72BE72] dark:bg-[#5E9E6D]";
    return "bg-[#3D8F42] dark:bg-[#85C5B5]";
  };

  return (
    <section className="relative p-6 sm:p-8 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] select-none">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
            {hm.title}
          </h2>
          <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
            {hm.subtitle}
          </p>
        </div>

        <a
          href="/attendance-safety#matrix"
          className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent-terracotta)] hover:underline"
        >
          <span>{hm.ledger}</span>
          <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
        </a>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2 pt-1 scrollbar-thin">
        {/* Month Labels */}
        <div className="flex gap-[3px] text-[10px] font-mono text-[var(--ink-muted)] mb-1.5 ms-6">
          {hm.months.map((m: string, i: number) => (
            <span key={i} className="w-[42px] text-start">
              {m}
            </span>
          ))}
        </div>

        <div className="flex gap-1.5 items-start">
          {/* Day of Week Labels */}
          <div className="flex flex-col gap-[3px] text-[9px] font-mono text-[var(--ink-muted)] pt-0.5 pe-1.5">
            <span>{hm.days[0]}</span>
            <span className="invisible">Mon</span>
            <span>{hm.days[1]}</span>
            <span className="invisible">Wed</span>
            <span>{hm.days[2]}</span>
          </div>

          {/* Grid Columns (Weeks) */}
          <div className="flex gap-[3px]">
            {weeks.map((days, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {days.map((count, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => setHoveredCell({ week: wIdx + 1, day: dIdx + 1, count })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs transition-transform hover:scale-125 cursor-pointer ${getCellColor(count)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Hover Tooltip */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-[var(--border-paper)]/30 text-xs font-mono text-[var(--ink-muted)]">
        <div>
          {hoveredCell ? (
            <span className="text-[var(--accent-terracotta)] font-bold">
              {hoveredCell.count} {hm.interactions} {hm.onWeek} {hoveredCell.week}
            </span>
          ) : (
            <span>48 weeks across the academic year</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px]">
          <span>{hm.less}</span>
          <div className="w-2.5 h-2.5 rounded-xs bg-stone-300/40 dark:bg-[#1E2530]" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#D1E8D1] dark:bg-[#32523C]" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#A7D8A7] dark:bg-[#467A53]" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#72BE72] dark:bg-[#5E9E6D]" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#3D8F42] dark:bg-[#85C5B5]" />
          <span>{hm.more}</span>
        </div>
      </div>
    </section>
  );
}
