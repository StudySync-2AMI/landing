"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import {
  GitFork,
  CheckCircle2,
  Lock,
  Unlock,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";

export function CoursesSection() {
  const { dict, language } = useLanguage();
  const s = dict.s4_courses;
  const [activeNode, setActiveNode] = useState<string>("algo");

  const nodes = [
    {
      id: "prog",
      title: "Prog. Fundamentals",
      code: "CS101",
      status: "completed",
      label: language === "ar" ? "مكتملة بنجاح" : "Passed",
    },
    {
      id: "oop",
      title: "Object-Oriented Prog.",
      code: "CS201",
      status: "completed",
      label: language === "ar" ? "مكتملة بنجاح" : "Passed",
    },
    {
      id: "ds",
      title: "Data Structures",
      code: "CS301",
      status: "completed",
      label: language === "ar" ? "مكتملة بنجاح" : "Passed",
    },
    {
      id: "algo",
      title: "Algorithms Analysis",
      code: "CS302",
      status: "unlocked",
      label: language === "ar" ? "مؤهلة ومفتوحة للتسجيل" : "Eligible & Unlocked",
    },
    {
      id: "ai",
      title: "Artificial Intelligence",
      code: "CS401",
      status: "locked",
      label: language === "ar" ? "مغلقة (تتطلب Algorithms)" : "Locked (Requires CS302)",
    },
  ];

  return (
    <section id="sec-04" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Course Attributes Table & Hierarchy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Table of Attributes */}
        <div className="lg:col-span-8">
          <NotebookCard variant="plain" className="p-0 overflow-hidden">
            <div className="p-5 border-b border-[var(--paper-card-border)] bg-[var(--paper-bg)]/60 flex items-center justify-between">
              <h3 className="font-bold text-base text-[var(--ink-primary)]">
                {s.attributesTitle}
              </h3>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                10 Schema Fields
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-[var(--paper-card-border)] bg-[var(--paper-bg)]/40 font-mono text-[var(--ink-secondary)]">
                    <th className="p-3 text-start font-bold">Attribute</th>
                    <th className="p-3 text-start font-bold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--paper-card-border)]/60">
                  {s.attributes.map((attr, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[var(--paper-bg)]/70 transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                        {attr.key}
                      </td>
                      <td className="p-3 text-[var(--ink-secondary)] leading-relaxed">
                        {attr.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </NotebookCard>
        </div>

        {/* Content Hierarchy & Prerequisites Notice */}
        <div className="lg:col-span-4 space-y-6">
          <NotebookCard variant="ruled" className="p-6">
            <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>{s.structureTitle}</span>
            </div>
            <div className="p-3 rounded-lg bg-[var(--paper-bg)] border border-[var(--paper-card-border)] font-mono text-xs md:text-sm text-[var(--ink-primary)] leading-relaxed">
              {s.structureDesc}
            </div>
          </NotebookCard>

          <NotebookCard variant="plain" className="p-6 border-s-4 border-s-rose-500">
            <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <Info className="w-4 h-4" />
              <span>{s.prereqTitle}</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--ink-secondary)] leading-relaxed">
              {s.prereqDesc}
            </p>
          </NotebookCard>
        </div>
      </div>

      {/* Interactive Course Dependency Graph */}
      <NotebookCard variant="grid" className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--ink-primary)] flex items-center gap-2">
              <GitFork className="w-5 h-5 text-indigo-500" />
              <span>{s.graphTitle}</span>
            </h3>
            <p className="text-xs text-[var(--ink-secondary)] mt-1">
              {s.graphDesc}
            </p>
          </div>
          <div className="text-xs font-mono text-amber-700 dark:text-amber-300">
            {s.graphNote}
          </div>
        </div>

        {/* Interactive flow chain */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 py-4">
          {nodes.map((node, idx) => {
            const isCompleted = node.status === "completed";
            const isUnlocked = node.status === "unlocked";
            const isLocked = node.status === "locked";

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setActiveNode(node.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-center min-w-[150px] shadow-xs ${
                    isCompleted
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-200 hover:scale-105"
                      : isUnlocked
                      ? "bg-blue-500/15 border-blue-500/60 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/30 hover:scale-105"
                      : "bg-slate-500/10 border-slate-500/30 text-slate-500 dark:text-slate-400 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    {isUnlocked && <Unlock className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    {isLocked && <Lock className="w-4 h-4 text-slate-400" />}
                    <span className="font-mono text-xs font-bold">{node.code}</span>
                  </div>
                  <div className="font-bold text-sm">{node.title}</div>
                  <div className="text-[10px] mt-1 font-medium opacity-80">{node.label}</div>
                </div>

                {idx < nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[var(--ink-muted)] shrink-0 hidden sm:block rtl:rotate-180" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </NotebookCard>
    </section>
  );
}
