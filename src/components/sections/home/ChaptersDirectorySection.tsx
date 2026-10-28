"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArchivalStamp } from "@/ui";
import { ArrowRight } from "lucide-react";

export function ChaptersDirectorySection() {
  const { dict } = useLanguage();
  const chapters = dict.homeChapters;

  const accentColorMap: Record<string, string> = {
    oxford: "text-[var(--accent-oxford)]",
    terracotta: "text-[var(--accent-terracotta)]",
    sage: "text-[var(--accent-sage)]",
    amber: "text-[var(--accent-amber)]",
  };

  return (
    <section className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
            {chapters.title}
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
            {chapters.subtitle}
          </p>
        </div>
        <ArchivalStamp variant="neutral">{chapters.stamp}</ArchivalStamp>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {chapters.items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="p-6 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[4px_4px_0px_var(--shadow-anchor)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--shadow-anchor)] transition-all group"
          >
            <div className={`flex justify-between items-center mb-2 text-xs font-mono font-bold ${accentColorMap[item.accent] || "text-[var(--accent-oxford)]"}`}>
              <span>{item.chapter}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </div>
            <div className="font-serif font-black text-lg text-[var(--ink-primary)]">
              {item.title}
            </div>
            <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
