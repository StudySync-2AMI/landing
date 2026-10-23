"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PaperCard } from "@/ui/PaperCard";
import { ArchivalStamp } from "@/ui/ArchivalStamp";
import { ShieldCheck, Lock } from "lucide-react";

export function PrivacyPillarsSection() {
  const { dict } = useLanguage();
  const priv = dict.privacyPage;

  return (
    <section className="space-y-8">
      {/* Declarations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PaperCard variant="ruled" className="p-8 border-s-4 border-s-[#3D5A40]">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-[#3D5A40] dark:text-[#69A384]" />
            <h3 className="font-serif font-bold text-xl text-[var(--ink-primary)]">
              {priv.geofenceTitle}
            </h3>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed font-medium">
            {priv.geofenceDesc}
          </p>
        </PaperCard>

        <PaperCard variant="ruled" className="p-8 border-s-4 border-s-[#2B3A4A]">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-[#2B3A4A] dark:text-[#7AA2C7]" />
            <h3 className="font-serif font-bold text-xl text-[var(--ink-primary)]">
              {priv.workspacePolicyTitle}
            </h3>
          </div>
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed font-medium">
            {priv.workspacePolicyDesc}
          </p>
        </PaperCard>
      </div>

      {/* Academic Governance Matrix */}
      <PaperCard variant="plain" className="p-8 md:p-10">
        <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[var(--border-paper)]/20">
          <h3 className="font-serif font-black text-2xl text-[var(--ink-primary)]">
            {priv.complianceTitle}
          </h3>
          <ArchivalStamp variant="sage">{priv.complianceStamp}</ArchivalStamp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[var(--ink-secondary)]">
          <div className="p-5 rounded-lg bg-[var(--surface-subtle)] border-2 border-[var(--border-paper)]/30">
            <div className="font-bold text-[var(--ink-primary)] mb-1.5 font-serif text-base">
              {priv.integrityTitle}
            </div>
            <p className="leading-relaxed">
              {priv.integrityDesc}
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[var(--surface-subtle)] border-2 border-[var(--border-paper)]/30">
            <div className="font-bold text-[var(--ink-primary)] mb-1.5 font-serif text-base">
              {priv.cryptoTitle}
            </div>
            <p className="leading-relaxed">
              {priv.cryptoDesc}
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[var(--surface-subtle)] border-2 border-[var(--border-paper)]/30">
            <div className="font-bold text-[var(--ink-primary)] mb-1.5 font-serif text-base">
              {priv.hitlTitle}
            </div>
            <p className="leading-relaxed">
              {priv.hitlDesc}
            </p>
          </div>
        </div>
      </PaperCard>
    </section>
  );
}
