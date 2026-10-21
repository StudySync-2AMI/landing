"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import {
  FileText,
  QrCode,
  Activity,
  Calendar,
  BellRing,
  Compass,
  Bot,
  Clock,
  Briefcase,
  AlertTriangle,
} from "lucide-react";

export function ObjectivesSection() {
  const { dict } = useLanguage();
  const s = dict.s2_objectives;

  const icons = [
    FileText,
    QrCode,
    Activity,
    Calendar,
    BellRing,
    Compass,
    Bot,
    Clock,
    Briefcase,
    AlertTriangle,
  ];

  return (
    <section id="sec-02" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {s.items.map((item, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <NotebookCard
              key={item.id}
              variant="plain"
              holePunches={false}
              className="p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform border-s-4 border-s-amber-500"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-sm font-black flex items-center justify-center">
                    {item.id}
                  </span>
                  <Icon className="w-4 h-4 text-[var(--ink-secondary)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--ink-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </NotebookCard>
          );
        })}
      </div>
    </section>
  );
}
