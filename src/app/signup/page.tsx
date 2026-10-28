"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/ui/PageHeader";
import { AuthDossierSection } from "@/components/sections/auth/AuthDossierSection";
import { useLanguage } from "@/context/LanguageContext";

export default function SignUpPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] paper-grain-overlay">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 md:py-14 space-y-10">
        <PageHeader
          code={dict.pageHeaders.signUp.code}
          stamp={dict.pageHeaders.signUp.stamp}
          title={dict.pageHeaders.signUp.title}
          subtitle={dict.pageHeaders.signUp.subtitle}
        />

        <AuthDossierSection initialMode="signup" />
      </main>

      <Footer />
    </div>
  );
}
