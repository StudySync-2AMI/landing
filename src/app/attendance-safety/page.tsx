"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { SpiralSpine } from "@/ui/SpiralSpine";
import { NotebookTabsNav } from "@/ui/NotebookTabsNav";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import { AttendanceSection } from "@/components/sections/AttendanceSection";
import { GradesRiskSection } from "@/components/sections/GradesRiskSection";
import { NotificationsSection } from "@/components/sections/NotificationsSection";
import { RiskMatrixSimulator } from "@/ui/RiskMatrixSimulator";
import { useLanguage } from "@/context/LanguageContext";

export default function AttendanceSafetyPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full py-8 space-y-8">
        <NotebookTabsNav />

        <div className="relative rounded-2xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[5px_5px_0px_#1A1A1A] dark:shadow-2xl overflow-hidden">
          <Tape color="mint" rotation="slight-left" position="top-left" />
          <Tape color="striped" rotation="slight-right" position="top-right" />
          <PaperClip color="rose" className="start-10" />

          <div className="pt-2 pb-1 border-b-2 border-[var(--border-paper)] bg-[var(--surface-subtle)]">
            <SpiralSpine count={16} />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-12 paper-ruled">
            <PageHeader
              code="SEC-ATT-05-10"
              stamp="SAFETY PROTOCOL"
              title={
                isArabic
                  ? "نظام الحضور الذكي واكتشاف الخطر الأكاديمي"
                  : "Smart Attendance, Absence Tracking & Academic Risk Detection"
              }
              subtitle={
                isArabic
                  ? "تسجيل الحضور عبر QR Code ديناميكي متجدد، مصفوفة الإنذار المبكر القائمة على القواعد، وقنوات التنبيه الإلزامية."
                  : "Cryptographic rotating QR codes for anti-proxy check-ins, rule-based academic risk matrices, and non-disable push notifications."
              }
            />

            <AttendanceSection />
            <RiskMatrixSimulator isArabic={isArabic} />
            <GradesRiskSection />
            <NotificationsSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
