"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { SpiralSpine } from "@/ui/SpiralSpine";
import { NotebookTabsNav } from "@/ui/NotebookTabsNav";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import { OpportunityHubSection } from "@/components/sections/OpportunityHubSection";
import { WorkflowsSection } from "@/components/sections/WorkflowsSection";
import { ScopeMatrixSection } from "@/components/sections/ScopeMatrixSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { SummaryPitchSection } from "@/components/sections/SummaryPitchSection";
import { useLanguage } from "@/context/LanguageContext";

export default function EcosystemPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full py-8 space-y-8">
        <NotebookTabsNav />

        <div className="relative rounded-2xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[5px_5px_0px_#1A1A1A] dark:shadow-2xl overflow-hidden">
          <Tape color="striped" rotation="slight-left" position="top-left" />
          <Tape color="mint" rotation="slight-right" position="top-right" />
          <PaperClip color="silver" className="start-10" />

          <div className="pt-2 pb-1 border-b-2 border-[var(--border-paper)] bg-[var(--surface-subtle)]">
            <SpiralSpine count={16} />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-12 paper-ruled">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
