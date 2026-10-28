"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { PitchNoteSection } from "@/components/sections/home/PitchNoteSection";
import { InteractiveDeskSection } from "@/components/sections/home/InteractiveDeskSection";
import { InteractiveDrawerSection } from "@/components/sections/home/InteractiveDrawerSection";
import { RiskMatrixSection } from "@/components/sections/attendance-safety/RiskMatrixSection";
import { AcademicHeatmapSection } from "@/components/sections/home/AcademicHeatmapSection";
import { ObjectivesSection } from "@/components/sections/home/ObjectivesSection";
import { RolesSection } from "@/components/sections/home/RolesSection";
import { ChaptersDirectorySection } from "@/components/sections/home/ChaptersDirectorySection";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] selection:bg-[#FAF0CB] selection:text-[#28231D] paper-grain-overlay">
      <Header />

      {/* FULLSCREEN IMMERSIVE EDITORIAL SCRAPBOOK CANVAS */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-24 md:space-y-32">
        {/* SECTION 1: Editorial Scrapbook Hero */}
        <HeroSection />

        {/* SECTION 2: One-Sentence Thesis Pitch Note */}
        <PitchNoteSection />

        {/* SECTION 3: Messy Interactive Scrapbook Zone (Scratchpad + Stamper) */}
        <InteractiveDeskSection />

        {/* SECTION 4: Interactive Core Modules Drawer */}
        <InteractiveDrawerSection />

        {/* SECTION 5: Academic Risk Matrix & Priority Score Simulator */}
        <RiskMatrixSection />

        {/* SECTION 6: Academic Activity Heatmap */}
        <AcademicHeatmapSection />

        {/* SECTION 7: 10 Strategic Objectives Bento Grid */}
        <ObjectivesSection />

        {/* SECTION 8: 4 Ecosystem Stakeholder Roles Dossier */}
        <RolesSection />

        {/* SECTION 9: Specialized Notebook Chapters Directory */}
        <ChaptersDirectorySection />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return <HomePage />;
}
