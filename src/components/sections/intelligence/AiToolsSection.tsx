"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import confetti from "canvas-confetti";
import {
  FileText,
  HelpCircle,
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function AiToolsSection() {
  const { dict, language } = useLanguage();
  const s = dict.s13_ai_tools;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    setShowFeedback(true);
    if (idx === s.quizDemo.correct) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const toolIcons = [FileText, HelpCircle, ShieldCheck, CalendarCheck];

  return (
    <section id="sec-13" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* 4 AI Tools Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {s.tools.map((tool, idx) => {
          const Icon = toolIcons[idx];
          return (
            <NotebookCard
              key={idx}
              variant="ruled"
              holePunches={false}
              className="p-5 flex flex-col justify-between border-t-4 border-t-amber-500 hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3 shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm md:text-base font-bold text-[var(--ink-primary)] mb-2">
                  {tool.title}
                </h4>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </NotebookCard>
          );
        })}
      </div>

      {/* Interactive AI Quiz Simulator */}
      <NotebookCard variant="grid" className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="font-extrabold text-sm md:text-base text-[var(--ink-primary)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {s.quizDemo.title}
          </span>
          <StampBadge variant="approved">Interactive Quiz</StampBadge>
        </div>

        <div className="p-4 rounded-xl bg-[var(--paper-bg)] border border-[var(--paper-card-border)] mb-4">
          <p className="font-bold text-sm md:text-base text-[var(--ink-primary)]">
            ❓ {s.quizDemo.question}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          {s.quizDemo.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === s.quizDemo.correct;

            let btnClass = "border-[var(--paper-card-border)] bg-[var(--paper-card)] hover:bg-[var(--paper-bg)] text-[var(--ink-primary)]";
            if (showFeedback && isSelected) {
              btnClass = isCorrect
                ? "border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-200"
                : "border-rose-500 bg-rose-500/15 text-rose-900 dark:text-rose-200";
            } else if (showFeedback && isCorrect) {
              btnClass = "border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-200";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-start p-3.5 rounded-xl border font-medium text-xs md:text-sm transition-all flex items-center justify-between ${btnClass}`}
              >
                <span>{opt}</span>
                {showFeedback && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs md:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{s.quizDemo.feedback}</span>
          </div>
        )}
      </NotebookCard>
    </section>
  );
}
