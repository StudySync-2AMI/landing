"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import { FolderLock, Link2, ShieldAlert, FileText, Mic, Image as ImageIcon } from "lucide-react";

export function WorkspaceSection() {
  const { dict, language } = useLanguage();
  const s = dict.s7_workspace;

  const icons = [FolderLock, Link2, ShieldAlert];

  return (
    <section id="sec-07" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {s.features.map((feat, idx) => {
          const Icon = icons[idx];
          return (
            <NotebookCard
              key={idx}
              variant="ruled"
              className="p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform border-t-4 border-t-purple-500"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shadow-inner">
                    <Icon className="w-5 h-5" />
                  </div>
                  {idx === 2 && (
                    <StampBadge variant="critical">
                      {language === "ar" ? "مشفر وخاص 100%" : "Zero-Knowledge Vault"}
                    </StampBadge>
                  )}
                </div>

                <h3 className="text-base font-bold text-[var(--ink-primary)] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              {idx === 0 && (
                <div className="mt-4 pt-3 border-t border-[var(--paper-card-border)] flex items-center gap-3 text-xs text-[var(--ink-muted)]">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Notes</span>
                  <span className="flex items-center gap-1"><Mic className="w-3.5 h-3.5" /> Audio</span>
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" /> Media</span>
                </div>
              )}
            </NotebookCard>
          );
        })}
      </div>
    </section>
  );
}
