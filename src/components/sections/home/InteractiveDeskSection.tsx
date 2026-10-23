"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArchivalStamp } from "@/ui/ArchivalStamp";
import { MessyScratchpad } from "./MessyScratchpad";
import { ScrapbookStamper } from "./ScrapbookStamper";

export function InteractiveDeskSection() {
  const { dict } = useLanguage();
  const desk = dict.homeDesk;

  return (
    <section className="relative space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[var(--ink-primary)]">
            {desk.title}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
            {desk.subtitle}
          </p>
        </div>
        <ArchivalStamp variant="amber">{desk.stamp}</ArchivalStamp>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
          <MessyScratchpad />
        </div>
        <div className="lg:col-span-7">
          <ScrapbookStamper />
        </div>
      </div>
    </section>
  );
}
