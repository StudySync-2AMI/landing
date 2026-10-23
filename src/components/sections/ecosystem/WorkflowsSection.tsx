"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import { Network, ArrowRight, ArrowDown } from "lucide-react";

export function WorkflowsSection() {
  const { dict, language } = useLanguage();
  const s = dict.s15_workflows;
  const [activeTab, setActiveTab] = useState(0);

  const currentWorkflow = s.tabs[activeTab] || s.tabs[0];

  return (
    <section id="sec-15" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {s.tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(idx)}
            className={`px-3.5 py-2.5 rounded-xl border text-xs md:text-sm font-bold transition-all shadow-xs ${
              activeTab === idx
                ? "bg-amber-500 text-white border-amber-600 shadow-md scale-102"
                : "bg-[var(--paper-card)] text-[var(--ink-secondary)] border-[var(--paper-card-border)] hover:bg-[var(--paper-bg)] hover:text-[var(--ink-primary)]"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Active Workflow Steps Progression */}
      <NotebookCard variant="grid" className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--paper-card-border)]">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-base md:text-lg text-[var(--ink-primary)]">
              {currentWorkflow.title}
            </h3>
          </div>
          <StampBadge variant="approved">
            5 {language === "ar" ? "مراحل مترابطة" : "Connected Stages"}
          </StampBadge>
        </div>

        {/* Steps Flow (Horizontal on desktop, vertical on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {currentWorkflow.steps.map((st, sIdx) => (
            <div
              key={sIdx}
              className="relative p-4 rounded-xl border border-[var(--paper-card-border)] bg-[var(--paper-card)] hover:border-amber-500 transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-xs font-black flex items-center justify-center mb-3">
                  0{sIdx + 1}
                </div>
                <p className="text-xs md:text-sm text-[var(--ink-primary)] leading-relaxed font-semibold">
                  {st}
                </p>
              </div>

              {sIdx < currentWorkflow.steps.length - 1 && (
                <div className="hidden md:block absolute -end-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] rtl:rotate-180">
                  ▶
                </div>
              )}
            </div>
          ))}
        </div>
      </NotebookCard>
    </section>
  );
}
