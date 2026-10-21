"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { SpiralSpine } from "@/ui/SpiralSpine";
import { NotebookTabsNav } from "@/ui/NotebookTabsNav";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import { AiTrackSection } from "@/components/sections/AiTrackSection";
import { RecommendationSection } from "@/components/sections/RecommendationSection";
import { AiToolsSection } from "@/components/sections/AiToolsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function IntelligencePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full py-8 space-y-8">
        <NotebookTabsNav />

        <div className="relative rounded-2xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[5px_5px_0px_#1A1A1A] dark:shadow-2xl overflow-hidden">
          <Tape color="yellow" rotation="slight-left" position="top-left" />
          <Tape color="striped" rotation="slight-right" position="top-right" />
          <PaperClip color="brass" className="start-10" />

          <div className="pt-2 pb-1 border-b-2 border-[var(--border-paper)] bg-[var(--surface-subtle)]">
            <SpiralSpine count={16} />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-12 paper-ruled">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
