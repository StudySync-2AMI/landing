"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui";
import { WorkspaceSection } from "@/components/sections/privacy/WorkspaceSection";
import { PrivacyPillarsSection } from "@/components/sections/privacy/PrivacyPillarsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code={dict.pageHeaders.privacy.code}
          stamp={dict.pageHeaders.privacy.stamp}
          title={dict.pageHeaders.privacy.title}
          subtitle={dict.pageHeaders.privacy.subtitle}
        />

        {/* Workspace Feature (Section 7) */}
        <WorkspaceSection />

        {/* Institutional Privacy & Security Declarations */}
        <PrivacyPillarsSection />
      </main>

      <Footer />
    </div>
  );
}
