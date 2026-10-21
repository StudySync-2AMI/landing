"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-dashed border-[var(--border-paper)]",
        "bg-[var(--surface-card)] text-[var(--ink-primary)]",
        "shadow-[2px_2px_0px_#1A1A1A] dark:shadow-md",
        "font-mono text-xs font-black tracking-wider uppercase",
        "hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none",
        className
      )}
      aria-label="Switch Language"
      title={isArabic ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span className="text-sm">🌐</span>
      <span>{isArabic ? "EN" : "عربي"}</span>
    </button>
  );
}
