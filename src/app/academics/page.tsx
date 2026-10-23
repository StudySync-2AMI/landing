"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { CoursesSection } from "@/components/sections/academics/CoursesSection";
import { CalendarNextSection } from "@/components/sections/academics/CalendarNextSection";
import { TimetableHallsSection } from "@/components/sections/academics/TimetableHallsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicsPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-16 space-y-20">
        <PageHeader
          code={dict.pageHeaders.academics.code}
          stamp={dict.pageHeaders.academics.stamp}
          title={dict.pageHeaders.academics.title}
          subtitle={dict.pageHeaders.academics.subtitle}
        />

        <CoursesSection />
        <CalendarNextSection />
        <TimetableHallsSection />
      </main>

      <Footer />
    </div>
  );
}
