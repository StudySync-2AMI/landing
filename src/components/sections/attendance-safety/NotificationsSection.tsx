"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader, NotebookCard, StampBadge } from "@/ui";
import {
  BellRing,
  BookOpen,
  CalendarCheck,
  FileCheck2,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export function NotificationsSection() {
  const { dict, language } = useLanguage();
  const s = dict.s10_notifications;

  const categoryIcons = [
    BookOpen,
    CalendarCheck,
    FileCheck2,
    AlertTriangle,
    GraduationCap,
  ];

  return (
    <section id="sec-10" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Strict Non-Disable Rule Banner */}
      <NotebookCard variant="plain" className="p-4 mb-6 border-s-4 border-s-rose-500 bg-rose-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs md:text-sm font-bold text-rose-800 dark:text-rose-300">
            <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0" />
            <span>{s.ruleNotice}</span>
          </div>
          <StampBadge variant="critical">
            {language === "ar" ? "قاعدة إلزامية" : "Enforced Policy"}
          </StampBadge>
        </div>
      </NotebookCard>

      {/* 5 Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {s.categories.map((cat, idx) => {
          const Icon = categoryIcons[idx];
          return (
            <NotebookCard
              key={idx}
              variant="ruled"
              holePunches={false}
              className="p-5 flex flex-col justify-between border-t-4 border-t-amber-500 hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold mb-3 shadow-inner">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[var(--ink-primary)] mb-2">
                  {cat.title}
                </h4>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </NotebookCard>
          );
        })}
      </div>
    </section>
  );
}
