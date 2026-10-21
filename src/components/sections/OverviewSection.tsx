"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StickyNote } from "@/ui/StickyNote";
import { AlertCircle, CheckCircle2, SplitSquareVertical } from "lucide-react";

export function OverviewSection() {
  const { dict, language } = useLanguage();
  const s = dict.s1_overview;

  return (
    <section id="sec-01" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: What is StudySync & Why Built */}
        <div className="lg:col-span-7 space-y-6">
          <NotebookCard variant="ruled" className="space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-[var(--ink-primary)]">
              {s.p1}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[var(--ink-secondary)]">
              {s.p2}
            </p>

            <div className="pt-4 border-t border-[var(--paper-card-border)] flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                ✓ {language === "ar" ? "نظام موحد شامل" : "Centralized Architecture"}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                ✓ {language === "ar" ? "ذكاء اصطناعي موجه" : "Grounded AI Tools"}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                ✓ {language === "ar" ? "تتبع فوري بدون تشتت" : "Zero Fragmentation"}
              </span>
            </div>
          </NotebookCard>
        </div>

        {/* Right Side: The Problem Statement (Sticky note on study desk) */}
        <div className="lg:col-span-5">
          <StickyNote color="peach" rotation="left" tape={true} pin={true} className="p-6">
            <div className="flex items-center gap-2 mb-3 text-orange-900 dark:text-orange-200 font-bold text-base">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span>{s.problemTitle}</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-orange-950 dark:text-orange-100 font-medium">
              {s.problemText}
            </p>

            <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800/50 flex items-center gap-2 text-xs text-orange-800 dark:text-orange-300">
              <SplitSquareVertical className="w-4 h-4 shrink-0" />
              <span>
                {language === "ar"
                  ? "سابقاً: تشتت بين السحابة، شات المجموعات، وملفات إكسل المتفرقة."
                  : "Previously: Chaos across chat groups, scattered drives, and separate spreadsheets."}
              </span>
            </div>
          </StickyNote>
        </div>
      </div>
    </section>
  );
}
