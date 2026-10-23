"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";

export function PitchNoteSection() {
  const { dict } = useLanguage();

  return (
    <section className="relative p-6 sm:p-8 rounded-xl border-2 border-[#1A1A1A] bg-[#FDF1CC]/85 dark:bg-[#2A2415] shadow-[4px_4px_0px_#1A1A1A] -rotate-[0.5deg]">
      <Tape color="striped" rotation="slight-right" position="top-center" />
      <PaperClip color="brass" className="start-6" />

      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-900 dark:text-amber-300 mb-2">
        <span>📌 {dict.hero.pitchLabel}</span>
        <span className="text-[10px] font-mono opacity-60">// Section 19</span>
      </div>
      <blockquote className="font-serif text-lg sm:text-2xl font-bold text-amber-950 dark:text-amber-100 leading-relaxed">
        &ldquo;{dict.hero.pitchText}&rdquo;
      </blockquote>
    </section>
  );
}
