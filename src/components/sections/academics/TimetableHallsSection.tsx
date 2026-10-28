"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader, NotebookCard, StickyNote } from "@/ui";
import { CalendarRange, Building2, Users2, CheckCircle2 } from "lucide-react";

export function TimetableHallsSection() {
  const { dict, language } = useLanguage();
  const s = dict.s9_timetable;

  return (
    <section id="sec-09" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 4 Step Rescheduling Protocol */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.steps.map((st, idx) => (
              <NotebookCard
                key={st.step}
                variant="plain"
                holePunches={false}
                className="p-5 border-t-4 border-t-indigo-500 hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono text-sm font-black flex items-center justify-center mb-3">
                  {st.step}
                </div>
                <p className="text-xs md:text-sm text-[var(--ink-primary)] leading-relaxed font-medium">
                  {st.text}
                </p>
              </NotebookCard>
            ))}
          </div>
        </div>

        {/* Right Side: Available Study Halls Sticky Note */}
        <div className="lg:col-span-4">
          <StickyNote color="mint" rotation="right" tape={true} pin={true} className="p-6">
            <div className="flex items-center gap-2 mb-3 text-emerald-900 dark:text-emerald-200 font-bold text-base">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>{s.hallsTitle}</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 font-medium">
              {s.hallsDesc}
            </p>

            <div className="mt-4 pt-4 border-t border-emerald-300 dark:border-emerald-800/50 space-y-2 text-xs">
              <div className="flex justify-between font-mono font-bold text-emerald-800 dark:text-emerald-300">
                <span>Hall 204 (Central Library)</span>
                <span className="text-emerald-600">Free 12:00 - 14:00</span>
              </div>
              <div className="flex justify-between font-mono font-bold text-emerald-800 dark:text-emerald-300">
                <span>Room C12 (Engineering Wing)</span>
                <span className="text-emerald-600">Free 14:30 - 16:00</span>
              </div>
            </div>
          </StickyNote>
        </div>
      </div>
    </section>
  );
}
