"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { OpportunityHubSection } from "@/components/sections/OpportunityHubSection";
import { WorkflowsSection } from "@/components/sections/WorkflowsSection";
import { ScopeMatrixSection } from "@/components/sections/ScopeMatrixSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { SummaryPitchSection } from "@/components/sections/SummaryPitchSection";
import { useLanguage } from "@/context/LanguageContext";

export default function EcosystemPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code="ECO-14-19"
          stamp="ECOSYSTEM BLUEPRINT"
          title={
            language === "ar"
              ? "منصة الفرص، ترابط الوحدات ونطاق تنفيذ المشروع"
              : "Opportunity Hub, System Workflows & Scope Roadmap"
          }
          subtitle={
            language === "ar"
              ? "بوابة فرص التدريب والهاكاثونات (ITI / Creativa)، تدفقات العمل المتكاملة، مصفوفة النطاق، والإجابة عن أسئلة الطالب الثمانية."
              : "Verified internship & hackathon hub, end-to-end operational workflows, tiered MVP delivery roadmap, and student value proposition."
          }
        />

        <OpportunityHubSection />
        <WorkflowsSection />
        <ScopeMatrixSection />
        <ValuePropositionSection />
        <SummaryPitchSection />
      </main>

      <Footer />
    </div>
  );
}
