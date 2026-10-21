"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { StickyNote } from "@/ui/StickyNote";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import {
  Users,
  Layers,
  Cpu,
  QrCode,
  ArrowDown,
  Sparkles,
  BookOpen,
} from "lucide-react";

export function HeroSection() {
  const { dict, language } = useLanguage();
  const hero = dict.hero;

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Decorative notebook ruler grid pattern in background */}
      <div className="absolute inset-0 opacity-40 notebook-ruled pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Version Stamp Badge */}
            <div className="inline-flex items-center gap-2">
              <StampBadge variant="approved">
                <Sparkles className="w-3.5 h-3.5 me-1 inline text-emerald-600" />
                {hero.badge}
              </StampBadge>
            </div>

            {/* Main Brand Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--ink-primary)]">
                <span className="relative inline-block">
                  {hero.title}
                  <span className="absolute -bottom-2 inset-x-0 h-3 bg-amber-400/30 -rotate-1 rounded-sm -z-10" />
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400">
                {hero.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {hero.description}
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#sec-01"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98"
              >
                <span>{hero.exploreBtn}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#sec-16"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm border border-[var(--paper-card-border)] bg-[var(--paper-card)] hover:bg-[var(--paper-bg)] text-[var(--ink-primary)] shadow-xs transition-all hover:scale-102 active:scale-98"
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>{hero.scopeBtn}</span>
              </a>
            </div>
          </div>

          {/* Right Side: Sticky Note & Cover Notebook Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md">
              {/* Highlight Sticky Note with One-Sentence Pitch */}
              <StickyNote color="yellow" rotation="right" tape={true} pin={true} className="p-6">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase font-extrabold tracking-wider text-amber-900 dark:text-amber-200">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>{hero.pitchLabel}</span>
                </div>
                <blockquote className="text-sm md:text-base leading-relaxed font-semibold text-amber-950 dark:text-amber-100">
                  &ldquo;{hero.pitchText}&rdquo;
                </blockquote>
              </StickyNote>
            </div>
          </div>
        </div>

        {/* 4 Key Numerical Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <NotebookCard variant="plain" holePunches={false} className="p-5 text-center border-t-4 border-t-amber-500">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xl md:text-2xl font-black text-[var(--ink-primary)]">
              {hero.stats.roles.value}
            </div>
            <div className="text-xs text-[var(--ink-secondary)] mt-1 font-medium">
              {hero.stats.roles.label}
            </div>
          </NotebookCard>

          <NotebookCard variant="plain" holePunches={false} className="p-5 text-center border-t-4 border-t-indigo-500">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xl md:text-2xl font-black text-[var(--ink-primary)]">
              {hero.stats.modules.value}
            </div>
            <div className="text-xs text-[var(--ink-secondary)] mt-1 font-medium">
              {hero.stats.modules.label}
            </div>
          </NotebookCard>

          <NotebookCard variant="plain" holePunches={false} className="p-5 text-center border-t-4 border-t-purple-500">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-xl md:text-2xl font-black text-[var(--ink-primary)]">
              {hero.stats.ai.value}
            </div>
            <div className="text-xs text-[var(--ink-secondary)] mt-1 font-medium">
              {hero.stats.ai.label}
            </div>
          </NotebookCard>

          <NotebookCard variant="plain" holePunches={false} className="p-5 text-center border-t-4 border-t-emerald-500">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="text-xl md:text-2xl font-black text-[var(--ink-primary)]">
              {hero.stats.qr.value}
            </div>
            <div className="text-xs text-[var(--ink-secondary)] mt-1 font-medium">
              {hero.stats.qr.label}
            </div>
          </NotebookCard>
        </div>
      </div>
    </section>
  );
}
