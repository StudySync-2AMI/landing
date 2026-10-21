"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { AiTrackSection } from "@/components/sections/AiTrackSection";
import { RecommendationSection } from "@/components/sections/RecommendationSection";
import { AiToolsSection } from "@/components/sections/AiToolsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function IntelligencePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code="INTEL-11-13"
          stamp="AI & ML ENGINE"
          title={
            language === "ar"
              ? "الذكاء الاصطناعي، توجيه المسار وأدوات المذاكرة"
              : "AI Career Classification & Grounded Study Engine"
          }
          subtitle={
            language === "ar"
              ? "نموذج تعلم الآلي لتصنيف المسارات الوظيفية مع محاكاة المراجعة البشرية HITL، محرك ترشيح المواد، وتلخيص المحاضرات الصارم."
              : "Multi-label text classification for career track mapping, human-in-the-loop review simulation, two-stage subject recommendations, and lecture summarization."
          }
        />

        <AiTrackSection />
        <RecommendationSection />
        <AiToolsSection />
      </main>

      <Footer />
    </div>
  );
}
