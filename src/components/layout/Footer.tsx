"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="mt-20 border-t border-[var(--border-stone)] bg-[var(--surface-card)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-[var(--border-stone)]">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-stone)] text-[var(--accent-oxford)] flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-[var(--ink-primary)]">
                StudySync
              </span>
            </div>
            <p className="text-xs text-[var(--ink-secondary)] leading-relaxed max-w-sm">
              {dict.hero.tagline}
            </p>
          </div>

          <div className="md:col-span-7 flex flex-wrap gap-8 justify-start md:justify-end text-xs font-semibold">
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                {dict.footer.prospectus}
              </div>
              <ul className="space-y-1.5 text-[var(--ink-secondary)]">
                <li><Link href="/" className="hover:text-[var(--ink-primary)]">Home</Link></li>
                <li><Link href="/academics" className="hover:text-[var(--ink-primary)]">Academics</Link></li>
                <li><Link href="/attendance-safety" className="hover:text-[var(--ink-primary)]">Safety & Risk</Link></li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <div className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                {dict.footer.governance}
              </div>
              <ul className="space-y-1.5 text-[var(--ink-secondary)]">
                <li><Link href="/intelligence" className="hover:text-[var(--ink-primary)]">AI Engine</Link></li>
                <li><Link href="/ecosystem" className="hover:text-[var(--ink-primary)]">Opportunity & Scope</Link></li>
                <li><Link href="/privacy" className="hover:text-[var(--ink-primary)]">Privacy & Vault</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
          <p>{dict.footer.copyright}</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-sage)]" />
              {dict.footer.vaultBadge}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
