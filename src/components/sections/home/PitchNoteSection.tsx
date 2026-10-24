"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import { PushPin } from "@/ui/PushPin";
import { BookOpen, Compass, Zap, ShieldAlert, Award } from "lucide-react";

export function PitchNoteSection() {
  const { dict } = useLanguage();

  const pillars = [
    {
      key: "academic",
      icon: BookOpen,
      data: dict.hero.pitchPillars.academic,
      bg: "bg-[#EBF3FF] dark:bg-[#1C2838]",
      border: "border-[#2B4C7E]/40 dark:border-[#4B73A8]/40",
      text: "text-[#1C355E] dark:text-[#BFD7FF]",
      accent: "text-[#2B4C7E] dark:text-[#6FA2E2]",
    },
    {
      key: "career",
      icon: Compass,
      data: dict.hero.pitchPillars.career,
      bg: "bg-[#EAF6ED] dark:bg-[#182B1E]",
      border: "border-[#2E6F40]/40 dark:border-[#4D9B65]/40",
      text: "text-[#1B4527] dark:text-[#BAE8C6]",
      accent: "text-[#2E6F40] dark:text-[#5FBF7F]",
    },
    {
      key: "urgent",
      icon: Zap,
      data: dict.hero.pitchPillars.urgent,
      bg: "bg-[#FFF8E6] dark:bg-[#2D2412]",
      border: "border-[#D97736]/40 dark:border-[#F29654]/40",
      text: "text-[#6B340E] dark:text-[#FFE0B2]",
      accent: "text-[#D97736] dark:text-[#FFA96B]",
    },
    {
      key: "safety",
      icon: ShieldAlert,
      data: dict.hero.pitchPillars.safety,
      bg: "bg-[#FDF0ED] dark:bg-[#2E1815]",
      border: "border-[#C4432B]/40 dark:border-[#EB6950]/40",
      text: "text-[#631A0F] dark:text-[#FFC4B8]",
      accent: "text-[#C4432B] dark:text-[#FF8169]",
    },
  ];

  return (
    <section aria-label={dict.hero.pitchLabel} className="relative select-none">
      {/* Background Kraft Card for Tactile Physical Collage Depth */}
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 rounded-2xl bg-[#E8DEC8] dark:bg-[#10141C] border-2 border-[#1A1A1A] dark:border-[#3E4A5C] rotate-1" />

      {/* Main Archival Parchment Sheet */}
      <div className="relative rounded-2xl border-2 border-[#1A1A1A] dark:border-[#3E4A5C] bg-[#FFFDF9] dark:bg-[#171F2B] p-6 sm:p-10 shadow-[4px_4px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_#0A0D12] -rotate-[0.3deg] overflow-hidden paper-ruled">
        {/* Physical Tape, Real Wire Paperclip & Antique Brass Pushpin Mountings */}
        <Tape color="striped" rotation="slight-right" position="top-center" />
        <PaperClip color="brass" size="md" className="start-6 -top-3.5" />

        {/* Top Header: Archival Docket Number & Registrar Postmark Seal */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded border-2 border-[#1A1A1A] dark:border-[#4B5565] bg-[#FDF1CC] dark:bg-[#2A2415] text-[#1A1A1A] dark:text-[#F3EFE6] shadow-[1.5px_1.5px_0px_#1A1A1A]">
              <PushPin size="sm" inline color="brass" className="-ms-0.5 me-1" />
              <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase">
                {dict.hero.pitchDocketNumber}
              </span>
            </div>
          </div>

          {/* Distressed Red Registrar Seal */}
          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[var(--accent-terracotta)] border-2 border-dashed border-[var(--accent-terracotta)]/70 px-2.5 py-0.5 rounded rotate-1 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[var(--accent-terracotta)] shrink-0" />
            <span>{dict.hero.pitchExecutiveStamp}</span>
          </div>
        </div>

        {/* Giant Decorative Opening Quote Mark */}
        <div
          aria-hidden="true"
          className="absolute -top-4 end-6 font-serif text-8xl sm:text-9xl text-[var(--accent-terracotta)]/15 dark:text-[var(--accent-terracotta)]/10 select-none pointer-events-none"
        >
          &ldquo;
        </div>

        {/* The One-Sentence Thesis Manifesto */}
        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-[var(--ink-primary)] leading-snug sm:leading-relaxed tracking-tight relative z-10 mb-6">
          &ldquo;{dict.hero.pitchText}&rdquo;
        </blockquote>

        {/* 4 Architectural Pillar Slips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-5 border-t-2 border-dashed border-[#1A1A1A]/15 dark:border-white/10 relative z-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.key}
                className={`flex items-start gap-2.5 p-3 rounded-lg border-2 border-[#1A1A1A] dark:border-[#3E4A5C] ${pillar.bg} shadow-[2px_2px_0px_#1A1A1A] dark:shadow-[2px_2px_0px_#0A0D12] hover:-translate-y-0.5 transition-transform`}
              >
                <div className={`p-1.5 rounded-md bg-white/70 dark:bg-black/30 border border-[#1A1A1A]/20 ${pillar.accent} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`font-mono text-[10px] font-black uppercase tracking-wider ${pillar.text}`}>
                    {pillar.data.label}
                  </span>
                  <span className="font-sans text-xs text-[var(--ink-muted)] leading-tight mt-0.5 truncate">
                    {pillar.data.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
