"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Tape, AnnotationPointer } from "@/ui";

export function ObjectivesSection() {
  const { dict } = useLanguage();
  const objectives = dict.s2_objectives;
  const homeObjectives = dict.homeObjectives;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent-oxford)]">
              SEC. {objectives.number} //
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[var(--ink-primary)]">
              {objectives.title}
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
            {objectives.subtitle}
          </p>
        </div>

        <p className="font-handwriting text-2xl text-[var(--accent-terracotta)] -rotate-2 flex items-center gap-1.5">
          <AnnotationPointer size="sm" />
          <span>{homeObjectives.annotation}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {objectives.items.map((item, index) => (
          <div
            key={item.id}
            className="relative p-6 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[4px_4px_0px_var(--shadow-anchor)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--shadow-anchor)] transition-all"
          >
            {index % 4 === 1 && <Tape color="mint" rotation="slight-left" position="top-right" />}
            {index % 4 === 3 && <Tape color="peach" rotation="slight-right" position="top-left" />}

            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border-2 border-[var(--border-paper)] font-mono text-xs font-black text-[var(--accent-oxford)] flex items-center justify-center">
                {item.id.padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono uppercase text-[var(--ink-muted)]">
                GOAL // SPEC
              </span>
            </div>

            <h3 className="font-serif text-lg font-bold text-[var(--ink-primary)] mb-1.5">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
