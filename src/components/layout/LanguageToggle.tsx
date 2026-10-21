"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--paper-card-border)] bg-[var(--paper-card)] hover:bg-[var(--paper-bg)] text-xs md:text-sm font-medium text-[var(--ink-primary)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
      aria-label="Switch Language"
      title={t("nav.switchLang")}
    >
      <Languages className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      <span className="font-semibold">
        {language === "ar" ? "English" : "العربية"}
      </span>
    </button>
  );
}
