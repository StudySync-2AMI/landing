"use client";

import React, { useState } from "react";
import { ArrowUpRight, ShieldCheck, QrCode, Compass, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import { Highlighter } from "@/ui/Highlighter";
import { AnnotationPointer } from "@/ui/AnnotationPointer";
import { useLanguage } from "@/context/LanguageContext";

const MODULE_ICONS = {
  attendance: QrCode,
  risk: ShieldCheck,
  recommender: Compass,
  tools: Sparkles,
};

const MODULE_ROUTES = {
  attendance: "/attendance-safety",
  risk: "/attendance-safety#matrix",
  recommender: "/intelligence",
  tools: "/intelligence#tools",
};

export function InteractiveDrawerSection() {
  const { dict } = useLanguage();
  const d = dict.interactiveDrawer;
  const moduleKeys = ["attendance", "risk", "recommender", "tools"] as const;
  type ModuleKey = (typeof moduleKeys)[number];

  const [activeKey, setActiveKey] = useState<ModuleKey>("attendance");
  const activeModule = d.modules[activeKey];
  const ActiveIcon = MODULE_ICONS[activeKey];

  return (
    <section id="modules" className="relative my-10 space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[var(--ink-primary)]">
            {d.title}
          </h2>
          <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
            {d.subtitle}
          </p>
        </div>

        <a
          href="/ecosystem"
          className="font-handwriting text-xl sm:text-2xl text-[var(--accent-terracotta)] hover:underline inline-flex items-center gap-1 -rotate-1"
        >
          <span>{d.drawerLink}</span>
          <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Selector List */}
        <div className="lg:col-span-5 space-y-2">
          {moduleKeys.map((key) => {
            const isSelected = key === activeKey;
            const item = d.modules[key];
            const Icon = MODULE_ICONS[key];

            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={cn(
                  "w-full text-start p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3",
                  isSelected
                    ? "bg-[var(--surface-card)] border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] dark:border-white/20 translate-x-1 rtl:-translate-x-1"
                    : "bg-[var(--surface-subtle)]/70 border-transparent hover:border-stone-400/40 hover:bg-[var(--surface-card)]"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg border",
                      isSelected
                        ? "bg-[#FDF1CC] text-[#1A1A1A] border-amber-600/30 dark:bg-amber-950/40 dark:text-amber-200"
                        : "bg-stone-200/50 dark:bg-stone-800/50 text-[var(--ink-secondary)] border-transparent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[var(--ink-primary)] leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[var(--ink-muted)] mt-0.5">
                      {item.category}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  className={cn(
                    "w-4 h-4 text-[var(--ink-muted)] transition-transform rtl:-scale-x-100",
                    isSelected && "text-[var(--accent-terracotta)] translate-x-0.5 -translate-y-0.5 rtl:-translate-x-0.5"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Selected Module Card */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] dark:shadow-2xl">
            <Tape color="striped" rotation="slight-left" position="top-right" />
            <PaperClip color="brass" className="start-6" />

            <p className="font-handwriting text-xl text-[var(--accent-terracotta)] -rotate-1 mb-1 flex items-center gap-1.5">
              <AnnotationPointer size="sm" />
              <span>{activeModule.subtitle}</span>
            </p>

            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
              {activeModule.title}
            </h3>

            <p className="text-sm sm:text-base text-[var(--ink-secondary)] font-medium leading-relaxed mt-3">
              {activeModule.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {activeModule.tags.map((tag: string, i: number) => (
                <Highlighter
                  key={tag}
                  color={i % 3 === 0 ? "yellow" : i % 3 === 1 ? "mint" : "peach"}
                  className="text-xs font-mono py-0.5 px-2"
                >
                  #{tag}
                </Highlighter>
              ))}
            </div>

            {/* Technical Diagram Metric Box */}
            <div className="mt-6 p-4 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-subtle)] paper-grid">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--ink-muted)] border-b border-[var(--border-paper)]/20 pb-2">
                <span>{activeModule.diagramLabel}</span>
                <span className="text-[#3D5A40] dark:text-[#69A384] font-bold">● {d.activeSpec}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {activeModule.metrics.map((m: { label: string; value: string }, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-md bg-[var(--surface-card)] border border-[var(--border-paper)]/30">
                    <div className="font-mono text-sm sm:text-base font-black text-[var(--accent-oxford)]">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono uppercase text-[var(--ink-muted)] mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Link */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <a
                href={MODULE_ROUTES[activeKey]}
                className="scrapbook-btn bg-[#FDF1CC] text-[#1A1A1A] hover:bg-[#fae7b1] border-2 border-[#1A1A1A] shadow-[2.5px_2.5px_0px_#1A1A1A]"
              >
                <span>{d.openSpec}</span>
                <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
              </a>

              <span className="font-mono text-xs text-[var(--ink-muted)]">
                {d.versionStamp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
