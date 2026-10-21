"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import { Check, Layers, Filter } from "lucide-react";

export function ScopeMatrixSection() {
  const { dict, language } = useLanguage();
  const s = dict.s16_scope;
  const [filter, setFilter] = useState<string>("all");

  const filteredItems = s.items.filter((item) => {
    if (filter === "all") return true;
    return item.tier === filter;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "must":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200";
      case "should":
        return "border-indigo-500/40 bg-indigo-500/10 text-indigo-800 dark:text-indigo-200";
      case "could":
        return "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200";
      case "future":
        return "border-purple-500/40 bg-purple-500/10 text-purple-800 dark:text-purple-200";
      default:
        return "border-slate-500/40 bg-slate-500/10 text-slate-800 dark:text-slate-200";
    }
  };

  return (
    <section id="sec-16" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(s.filters).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              filter === key
                ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                : "bg-[var(--paper-card)] text-[var(--ink-secondary)] border-[var(--paper-card-border)] hover:bg-[var(--paper-bg)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredItems.map((item, idx) => (
          <NotebookCard
            key={idx}
            variant="plain"
            holePunches={false}
            className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="font-bold text-xs md:text-sm text-[var(--ink-primary)]">
                {item.title}
              </span>
              <div className="w-5 h-5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--paper-card-border)]/60 flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getTierColor(item.tier)}`}>
                {item.phase}
              </span>
              <span className="text-[10px] uppercase font-mono text-[var(--ink-muted)]">
                {item.tier}
              </span>
            </div>
          </NotebookCard>
        ))}
      </div>
    </section>
  );
}
