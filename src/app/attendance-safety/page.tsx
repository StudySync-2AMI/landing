"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { AttendanceSection } from "@/components/sections/AttendanceSection";
import { GradesRiskSection } from "@/components/sections/GradesRiskSection";
import { NotificationsSection } from "@/components/sections/NotificationsSection";
import { RiskMatrixSimulator } from "@/ui/RiskMatrixSimulator";
import { useLanguage } from "@/context/LanguageContext";

export default function AttendanceSafetyPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
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
      </main>

      <Footer />
    </div>
  );
}
