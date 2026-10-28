"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui";
import { OpportunityHubSection } from "@/components/sections/ecosystem/OpportunityHubSection";
import { WorkflowsSection } from "@/components/sections/ecosystem/WorkflowsSection";
import { ScopeMatrixSection } from "@/components/sections/ecosystem/ScopeMatrixSection";
import { ValuePropositionSection } from "@/components/sections/ecosystem/ValuePropositionSection";
import { SummaryPitchSection } from "@/components/sections/ecosystem/SummaryPitchSection";
import { useLanguage } from "@/context/LanguageContext";

export default function EcosystemPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code={dict.pageHeaders.ecosystem.code}
          stamp={dict.pageHeaders.ecosystem.stamp}
          title={dict.pageHeaders.ecosystem.title}
          subtitle={dict.pageHeaders.ecosystem.subtitle}
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
