"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StickyNote } from "@/ui/StickyNote";
import { StampBadge } from "@/ui/StampBadge";
import { Check, Compass, Calculator, Eye, Sparkles } from "lucide-react";

export function RecommendationSection() {
  const { dict, language } = useLanguage();
  const s = dict.s12_recommendation;

  return (
    <section id="sec-02" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Stage 1 Strict Regulatory Checks */}
        <div className="lg:col-span-6 space-y-6">
          <NotebookCard variant="plain" className="p-6 border-s-4 border-s-amber-500">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-sm md:text-base text-[var(--ink-primary)] flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-500" />
                <span>{s.stage1Title}</span>
              </h4>
              <StampBadge variant="official">Stage 1 Filter</StampBadge>
            </div>

            <div className="space-y-2.5">
              {s.stage1Items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-[var(--paper-bg)]/60 border border-[var(--paper-card-border)]/70 text-xs md:text-sm text-[var(--ink-secondary)]"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </NotebookCard>
        </div>

        {/* Right Side: Stage 2 Formula & Explainable Recommendation Note */}
        <div className="lg:col-span-6 space-y-6">
          <NotebookCard variant="grid" className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm md:text-base text-[var(--ink-primary)] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-500" />
                <span>{s.stage2Title}</span>
              </h4>
              <StampBadge variant="approved">Stage 2 Rank</StampBadge>
            </div>

            <div className="p-4 rounded-xl bg-[var(--paper-bg)] border border-[var(--paper-card-border)] font-mono text-xs md:text-sm font-bold text-[var(--ink-primary)] overflow-x-auto whitespace-nowrap shadow-inner mb-4">
              {s.formula}
            </div>

            {/* Weights visualization badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono font-bold">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                Track: 45%
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Skill: 30%
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                Workload: 15%
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                Interest: 10%
              </div>
            </div>
          </NotebookCard>

          {/* Sticky Note on Explainable Recommendation */}
          <StickyNote color="cyan" rotation="left" tape={true} className="p-5">
            <div className="flex items-center gap-2 mb-2 font-bold text-sky-900 dark:text-sky-200 text-sm">
              <Eye className="w-4 h-4 text-sky-600" />
              <span>Explainable AI (XAI)</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-sky-950 dark:text-sky-100 font-medium">
              {s.explainable}
            </p>
          </StickyNote>
        </div>
      </div>
    </section>
  );
}
