"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SketchUnderline } from "@/ui/SketchUnderline";
import { Highlight } from "@/ui/Highlighter";
import { ConstellationOrbit } from "@/ui/ConstellationOrbit";
import {
  BookMarked,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  QrCode,
  FileText,
} from "lucide-react";

export function HeroSection() {
  const { dict, language } = useLanguage();
  const isArabic = language === "ar";
  const hero = dict.hero;

  return (
    <section className="relative pt-4 sm:pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Editorial Headline & Ledger Notes */}
        <div className="lg:col-span-7 space-y-6">
          {/* Handwritten Greeting */}
          <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[var(--accent-terracotta)] -rotate-1">
            {hero.greeting}
          </p>

          {/* Large Authoritative Serif Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-black text-[var(--ink-primary)] leading-[1.04] tracking-tight">
            <SketchUnderline color="terracotta" variant="brush">
              {hero.title}
            </SketchUnderline>
          </h1>

          {/* Subheadline with Tactile Highlighters */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[var(--ink-primary)] leading-snug pt-1">
            {hero.subheadline1}{" "}
            <Highlight color="yellow" rotate="left">
              {hero.subheadlineSmart}
            </Highlight>{" "}
            {hero.subheadlineAnd}{" "}
            <Highlight color="mint" rotate="right">
              {hero.subheadlineUnified}
            </Highlight>
          </div>

          {/* Body Description */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--ink-secondary)] leading-relaxed font-medium max-w-2xl">
            {hero.description}
          </p>

          {/* Handwritten Micro-Annotation */}
          <div className="pt-1 flex items-center gap-2">
            <p className="font-handwriting text-xl sm:text-2xl text-[var(--accent-terracotta)] -rotate-2">
              ↳ {hero.welcomeAnnotation}
            </p>
          </div>

          {/* Scrapbook CTA Buttons with Bulletproof Contrast */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
            <a
              href="#modules"
              className="group scrapbook-btn bg-[#E86A46] text-white hover:bg-[#D45936] dark:bg-[#E86A46] dark:hover:bg-[#D45936] border-2 border-[#1A1A1A] dark:border-[#FF8A65] text-sm sm:text-base px-5 py-3 shadow-[3px_3px_0px_#1A1A1A] dark:shadow-[3px_3px_0px_#0A0D12]"
            >
              <span className="font-serif font-bold text-white">
                {hero.browseBtn}
              </span>
              <ArrowRight className="w-4 h-4 text-white shrink-0 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>

            <button
              onClick={() => window.print()}
              className="group scrapbook-btn bg-[#FFFDF9] dark:bg-[#18212D] text-[#1A1A1A] dark:text-[#F3EFE6] hover:bg-[#F3EFE6] dark:hover:bg-[#232D3B] hover:text-[#1A1A1A] dark:hover:text-[#FFFFFF] border-2 border-[#1A1A1A] dark:border-[#3E4A5C] text-sm sm:text-base px-5 py-3 shadow-[3px_3px_0px_#1A1A1A] dark:shadow-[3px_3px_0px_#0A0D12]"
            >
              <FileText className="w-4 h-4 text-[#E86A46] shrink-0" />
              <span className="font-serif font-bold">{hero.printBtn}</span>
            </button>
          </div>

          {/* Archival Catalog Index Slips */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
              <span>📑 {hero.quickCatalog}</span>
              <span className="opacity-40">// DOC.INDEX</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
              <Link
                href="/academics"
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 border-[#1A1A1A] dark:border-[#3E4A5C] border-s-4 border-s-[#2B4C7E] bg-[#FFFDF9] dark:bg-[#18212D] text-[#1A1A1A] dark:text-[#F3EFE6] shadow-[2.5px_2.5px_0px_#1A1A1A] dark:shadow-[2.5px_2.5px_0px_#0A0D12] hover:-translate-y-0.5 hover:rotate-0 -rotate-1 active:translate-y-0.5 transition-all select-none cursor-pointer"
              >
                <BookMarked className="w-3.5 h-3.5 text-[#2B4C7E] dark:text-[#7AA2C7] shrink-0" />
                <span className="font-mono text-[9px] font-bold text-[var(--ink-muted)]">CAT.01</span>
                <span className="font-serif font-bold">
                  {dict.nav.courses}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E86A46] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
              </Link>

              <Link
                href="/attendance-safety"
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 border-[#1A1A1A] dark:border-[#3E4A5C] border-s-4 border-s-[#2E6F40] bg-[#FFFDF9] dark:bg-[#18212D] text-[#1A1A1A] dark:text-[#F3EFE6] shadow-[2.5px_2.5px_0px_#1A1A1A] dark:shadow-[2.5px_2.5px_0px_#0A0D12] hover:-translate-y-0.5 hover:rotate-0 rotate-1 active:translate-y-0.5 transition-all select-none cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#2E6F40] dark:text-[#7BB882] shrink-0" />
                <span className="font-mono text-[9px] font-bold text-[var(--ink-muted)]">CAT.02</span>
                <span className="font-serif font-bold">
                  {dict.nav.attendance}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E86A46] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
              </Link>

              <Link
                href="/intelligence"
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-sm border-2 border-[#1A1A1A] dark:border-[#3E4A5C] border-s-4 border-s-[#E86A46] bg-[#FFFDF9] dark:bg-[#18212D] text-[#1A1A1A] dark:text-[#F3EFE6] shadow-[2.5px_2.5px_0px_#1A1A1A] dark:shadow-[2.5px_2.5px_0px_#0A0D12] hover:-translate-y-0.5 hover:rotate-0 -rotate-1 active:translate-y-0.5 transition-all select-none cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E86A46] dark:text-[#FF8A65] shrink-0" />
                <span className="font-mono text-[9px] font-bold text-[var(--ink-muted)]">CAT.03</span>
                <span className="font-serif font-bold">
                  {dict.nav.ai}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E86A46] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Constellation Orbit */}
        <div className="lg:col-span-5 relative flex justify-center">
          <ConstellationOrbit isArabic={isArabic} />
        </div>
      </div>
    </section>
  );
}
