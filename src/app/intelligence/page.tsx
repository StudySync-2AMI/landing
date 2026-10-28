"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui";
import { AiTrackSection } from "@/components/sections/intelligence/AiTrackSection";
import { RecommendationSection } from "@/components/sections/intelligence/RecommendationSection";
import { AiToolsSection } from "@/components/sections/intelligence/AiToolsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function IntelligencePage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code={dict.pageHeaders.intelligence.code}
          stamp={dict.pageHeaders.intelligence.stamp}
          title={dict.pageHeaders.intelligence.title}
          subtitle={dict.pageHeaders.intelligence.subtitle}
        />

        <AiTrackSection />
        <RecommendationSection />
        <AiToolsSection />
      </main>

      <Footer />
    </div>
  );
}
