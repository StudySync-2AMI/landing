"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader, NotebookCard, StickyNote, StampBadge } from "@/ui";
import {
  Calendar,
  Clock,
  Flame,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export function CalendarNextSection() {
  const { dict, language } = useLanguage();
  const s = dict.s8_calendar;

  return (
    <section id="sec-08" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Priority Score Formula Board */}
      <NotebookCard variant="grid" className="p-6 mb-8 border-s-4 border-s-amber-500">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase font-bold text-amber-700 dark:text-amber-400">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>{s.formulaTitle}</span>
        </div>
        <div className="p-4 rounded-xl bg-[var(--paper-bg)] border border-[var(--paper-card-border)] font-mono text-sm md:text-base font-bold text-[var(--ink-primary)] overflow-x-auto whitespace-nowrap shadow-inner">
          {s.formula}
        </div>
      </NotebookCard>

      {/* Focus List: What Should I Do Next? */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--ink-primary)] flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              <span>{s.focusTitle}</span>
            </h3>
            <p className="text-xs text-[var(--ink-secondary)] mt-1">
              {s.focusSubtitle}
            </p>
          </div>
          <StampBadge variant="approved">
            {language === "ar" ? "تحديث حي مباشر" : "Live Auto-Update"}
          </StampBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.tasks.map((task, idx) => {
            const statusBorder = {
              urgent: "border-t-rose-500 bg-rose-500/5",
              warning: "border-t-amber-500 bg-amber-500/5",
              info: "border-t-blue-500 bg-blue-500/5",
              success: "border-t-emerald-500 bg-emerald-500/5",
            }[task.status as "urgent" | "warning" | "info" | "success"] || "border-t-amber-500";

            const badgeVariant = {
              urgent: "critical",
              warning: "warning",
              info: "safe",
              success: "approved",
            }[task.status as "urgent" | "warning" | "info" | "success"] as any;

            return (
              <NotebookCard
                key={idx}
                variant="plain"
                holePunches={false}
                className={`p-5 flex flex-col justify-between border-t-4 ${statusBorder} hover:-translate-y-1 transition-transform`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--paper-bg)] border border-[var(--paper-card-border)] text-[var(--ink-secondary)]">
                      Score {task.score}
                    </span>
                    <StampBadge variant={badgeVariant}>{task.badge}</StampBadge>
                  </div>

                  <h4 className="font-bold text-sm text-[var(--ink-primary)] mb-2 line-clamp-2">
                    {task.title}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--paper-card-border)] text-xs text-[var(--ink-muted)] flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{task.time}</span>
                </div>
              </NotebookCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
