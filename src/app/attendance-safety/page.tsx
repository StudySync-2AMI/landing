"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { AttendanceSection } from "@/components/sections/attendance-safety/AttendanceSection";
import { RiskMatrixSection } from "@/components/sections/attendance-safety/RiskMatrixSection";
import { GradesRiskSection } from "@/components/sections/attendance-safety/GradesRiskSection";
import { NotificationsSection } from "@/components/sections/attendance-safety/NotificationsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function AttendanceSafetyPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code={dict.pageHeaders.attendanceSafety.code}
          stamp={dict.pageHeaders.attendanceSafety.stamp}
          title={dict.pageHeaders.attendanceSafety.title}
          subtitle={dict.pageHeaders.attendanceSafety.subtitle}
        />

        <AttendanceSection />
        <RiskMatrixSection />
        <GradesRiskSection />
        <NotificationsSection />
      </main>

      <Footer />
    </div>
  );
}
