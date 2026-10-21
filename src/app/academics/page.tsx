"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { CalendarNextSection } from "@/components/sections/CalendarNextSection";
import { TimetableHallsSection } from "@/components/sections/TimetableHallsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code="ACAD-04-09"
          stamp="CURRICULUM SPEC"
          title={
            language === "ar"
              ? "إدارة المواد، المخطط الدراسي والتقويم الأكاديمي"
              : "Academic Curriculum, Prerequisites & Schedule Engine"
          }
          subtitle={
            language === "ar"
              ? "مواصفات المقررات الأكاديمية، نظام حجب المتطلبات السابقة، التقويم الموحد، وحاسبة المواعيد وقاعات المذاكرة."
              : "Official course specification schemas, prerequisite gating logic, unified smart calendar, and timetable conflict resolution."
          }
        />

        <CoursesSection />
        <CalendarNextSection />
        <TimetableHallsSection />
      </main>

      <Footer />
    </div>
  );
}
