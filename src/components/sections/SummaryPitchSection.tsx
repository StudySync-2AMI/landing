"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StickyNote } from "@/ui/StickyNote";
import { StampBadge } from "@/ui/StampBadge";
import { BookMarked, Sparkles, CheckCheck, Award } from "lucide-react";

export function SummaryPitchSection() {
  const { dict, language } = useLanguage();
  const s18 = dict.s18_summary;
  const s19 = dict.s19_pitch;

  return (
    <div className="space-y-12">
      {/* Section 18: Short Summary */}
      <section id="sec-18" className="py-8 scroll-mt-20">
        <SectionHeader number={s18.number} title={s18.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NotebookCard variant="ruled" className="p-6 border-s-4 border-s-amber-500">
            <div className="flex items-center gap-2 mb-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">
              <span>العربية (Arabic)</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-[var(--ink-primary)] font-medium">
              {s18.arText}
            </p>
          </NotebookCard>

          <NotebookCard variant="ruled" className="p-6 border-s-4 border-s-indigo-500">
            <div className="flex items-center gap-2 mb-3 font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">
              <span>English</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-[var(--ink-primary)] font-medium" dir="ltr">
              {s18.enText}
            </p>
          </NotebookCard>
        </div>
      </section>

      {/* Section 19: One-Sentence Pitch */}
      <section id="sec-19" className="py-8 scroll-mt-20">
        <SectionHeader number={s19.number} title={s19.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StickyNote color="yellow" rotation="none" tape={true} className="p-6">
            <div className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
              العربية (Arabic)
            </div>
            <blockquote className="text-base md:text-lg font-bold text-amber-950 dark:text-amber-100 leading-relaxed">
              &ldquo;{s19.arPitch}&rdquo;
            </blockquote>
          </StickyNote>

          <StickyNote color="lavender" rotation="none" tape={true} className="p-6" dir="ltr">
            <div className="font-mono text-xs font-bold text-purple-800 dark:text-purple-300 mb-2">
              English
            </div>
            <blockquote className="text-base md:text-lg font-bold text-purple-950 dark:text-purple-100 leading-relaxed">
              &ldquo;{s19.enPitch}&rdquo;
            </blockquote>
          </StickyNote>
        </div>
      </section>

      {/* Certification Badge Banner */}
      <div className="p-6 rounded-2xl border border-dashed border-[var(--paper-card-border)] bg-[var(--paper-card)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-sm md:text-base text-[var(--ink-primary)]">
              {language === "ar"
                ? "وثيقة المواصفات الأكاديمية المعتمدة"
                : "Accredited Academic System Specification"}
            </h4>
            <p className="text-xs text-[var(--ink-secondary)]">
              StudySync Version 1.0 • Comprehensive Specification
            </p>
          </div>
        </div>

        <StampBadge variant="approved">
          <CheckCheck className="w-4 h-4 me-1 inline" />
          {language === "ar" ? "معتمد رسمياً" : "OFFICIALLY ACCREDITED"}
        </StampBadge>
      </div>
    </div>
  );
}
