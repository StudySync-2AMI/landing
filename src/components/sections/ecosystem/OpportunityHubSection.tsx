"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader, NotebookCard, StickyNote, StampBadge } from "@/ui";
import { Briefcase, Trophy, GraduationCap, ArrowRight, CheckCheck } from "lucide-react";

export function OpportunityHubSection() {
  const { dict, language } = useLanguage();
  const s = dict.s14_opportunities;

  return (
    <section id="sec-14" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Supported Opportunity Types Tag Banner */}
      <NotebookCard variant="plain" className="p-5 mb-8 border-s-4 border-s-emerald-500">
        <div className="flex items-center gap-2 mb-2 font-bold text-sm text-[var(--ink-primary)]">
          <Briefcase className="w-4 h-4 text-emerald-500" />
          <span>{s.typesTitle}</span>
        </div>
        <p className="text-xs md:text-sm text-[var(--ink-secondary)] leading-relaxed font-mono">
          {s.types}
        </p>
      </NotebookCard>

      {/* 5-Step Pipeline Cards */}
      <div className="mb-4">
        <h4 className="font-extrabold text-sm md:text-base text-[var(--ink-primary)] mb-4">
          {s.pipelineTitle}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {s.pipeline.map((step, idx) => (
            <NotebookCard
              key={idx}
              variant="ruled"
              holePunches={false}
              className="p-4 border-t-4 border-t-amber-500 flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold flex items-center justify-center mb-3">
                  0{idx + 1}
                </div>
                <p className="text-xs text-[var(--ink-primary)] leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            </NotebookCard>
          ))}
        </div>
      </div>
    </section>
  );
}
