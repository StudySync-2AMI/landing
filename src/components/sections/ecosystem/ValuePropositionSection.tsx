"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader, NotebookCard, StampBadge } from "@/ui";
import { HelpCircle, ChevronDown, Sparkles, Compass } from "lucide-react";

export function ValuePropositionSection() {
  const { dict, language } = useLanguage();
  const s = dict.s17_value;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleQuestion = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="sec-17" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Holistic Academic Chain */}
      <NotebookCard variant="grid" className="p-6 mb-8 border-s-4 border-s-indigo-500">
        <h4 className="text-xs md:text-sm font-bold text-[var(--ink-secondary)] mb-3">
          {s.intro}
        </h4>
        <div className="p-4 rounded-xl bg-[var(--paper-bg)] border border-[var(--paper-card-border)] font-mono text-xs md:text-sm font-bold text-indigo-700 dark:text-indigo-300 overflow-x-auto whitespace-nowrap shadow-inner">
          {s.chain}
        </div>
      </NotebookCard>

      {/* 8 Vital Questions Accordion / Cards */}
      <div>
        <h4 className="font-extrabold text-base md:text-lg text-[var(--ink-primary)] mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>{s.questionsTitle}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {s.questions.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <NotebookCard
                key={idx}
                variant="plain"
                holePunches={false}
                className="p-5 cursor-pointer hover:border-amber-500 transition-all"
                onClick={() => toggleQuestion(idx)}
              >
                <div className="flex items-start justify-between gap-3">
                  <h5 className="font-bold text-sm text-[var(--ink-primary)] leading-snug">
                    {item.q}
                  </h5>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--ink-secondary)] shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </div>

                <div
                  className={`mt-3 pt-3 border-t border-[var(--paper-card-border)] text-xs md:text-sm text-[var(--ink-secondary)] leading-relaxed ${
                    isOpen ? "block animate-in fade-in" : "hidden md:block opacity-85"
                  }`}
                >
                  <span className="font-bold text-amber-600 dark:text-amber-400 me-1">
                    {language === "ar" ? "إجابة StudySync: " : "StudySync Answer: "}
                  </span>
                  {item.a}
                </div>
              </NotebookCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
