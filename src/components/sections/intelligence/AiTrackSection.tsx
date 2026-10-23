"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import {
  BrainCircuit,
  Cpu,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
} from "lucide-react";

export function AiTrackSection() {
  const { dict, language } = useLanguage();
  const s = dict.s11_ai_track;

  // Interactive HITL Approval state
  const [approvals, setApprovals] = useState<Record<string, boolean>>({
    "Mobile Development": true,
    "Software Engineering": true,
    "Frontend Development": false,
    "Data Science": false,
  });

  const toggleApproval = (name: string) => {
    setApprovals((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <section id="sec-11" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      <NotebookCard variant="plain" className="p-5 mb-8 border-s-4 border-s-purple-500">
        <p className="text-sm md:text-base leading-relaxed text-[var(--ink-secondary)]">
          {s.intro}
        </p>
        <div className="mt-3 font-mono text-xs font-bold text-purple-700 dark:text-purple-300">
          {s.modelType}
        </div>
      </NotebookCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Features & HITL Explanation */}
        <div className="lg:col-span-6 space-y-6">
          <NotebookCard variant="ruled" className="p-6">
            <h4 className="text-sm font-bold text-[var(--ink-primary)] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>{s.featuresTitle}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-[var(--ink-secondary)]">
              {s.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[var(--paper-bg)] border border-[var(--paper-card-border)] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </NotebookCard>

          <NotebookCard variant="plain" className="p-6 border-s-4 border-s-emerald-500">
            <h4 className="text-sm font-bold text-[var(--ink-primary)] mb-2 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-emerald-500" />
              <span>{s.hitlTitle}</span>
            </h4>
            <p className="text-xs md:text-sm text-[var(--ink-secondary)] leading-relaxed">
              {s.hitlDesc}
            </p>
            <div className="mt-4 pt-3 border-t border-[var(--paper-card-border)] text-xs text-[var(--ink-muted)]">
              {s.algorithms}
            </div>
          </NotebookCard>
        </div>

        {/* Right Side: Interactive HITL Admin Review Simulation */}
        <div className="lg:col-span-6">
          <NotebookCard variant="grid" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-extrabold text-sm text-[var(--ink-primary)] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {s.demoTitle}
              </span>
              <StampBadge variant="official">Live ML Output</StampBadge>
            </div>

            <div className="p-3 mb-5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 font-mono text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {s.demoCourse}
            </div>

            {/* Simulated Tracks List */}
            <div className="space-y-3">
              {s.tracks.map((tr) => {
                const isApproved = approvals[tr.name] ?? (tr.status === "approved");
                const isStrong = parseInt(tr.confidence) >= 70;
                const isPossible = parseInt(tr.confidence) >= 50 && parseInt(tr.confidence) < 70;

                return (
                  <div
                    key={tr.name}
                    className="p-3.5 rounded-xl border border-[var(--paper-card-border)] bg-[var(--paper-bg)]/80 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-[var(--ink-primary)]">
                        {tr.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isStrong
                              ? "text-emerald-600 dark:text-emerald-400"
                              : isPossible
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-slate-500"
                          }`}
                        >
                          {tr.confidence}
                        </span>
                        <span className="text-[10px] text-[var(--ink-muted)]">
                          {isStrong ? "Strong" : isPossible ? "Possible" : "Weak"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleApproval(tr.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                        isApproved
                          ? "bg-emerald-500 text-white shadow-xs"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                      }`}
                    >
                      {isApproved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === "ar" ? "معتمد" : "Approved"}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{language === "ar" ? "مستبعد" : "Rejected"}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Confidence Legend */}
            <div className="mt-5 pt-4 border-t border-[var(--paper-card-border)] flex flex-wrap gap-3 text-[10px] text-[var(--ink-muted)]">
              {s.legend.map((lg, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      idx === 0 ? "bg-emerald-500" : idx === 1 ? "bg-amber-500" : "bg-slate-400"
                    }`}
                  />
                  <span>{lg.label}: {lg.range}</span>
                </div>
              ))}
            </div>
          </NotebookCard>
        </div>
      </div>
    </section>
  );
}
