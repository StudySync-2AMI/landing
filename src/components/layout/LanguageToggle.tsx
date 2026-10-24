"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, toggleLanguage, dict } = useLanguage();
  const isArabic = language === "ar";

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "group relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md",
        "border-2 border-dashed border-[#1A1A1A] dark:border-[#4B5565]",
        "bg-white dark:bg-[#18212D]",
        "text-[#1A1A1A] dark:text-[#F3EFE6]",
        "shadow-[2.5px_2.5px_0px_#1A1A1A] dark:shadow-[2.5px_2.5px_0px_#0A0D12]",
        "hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none",
        className
      )}
      aria-label="Switch Language"
      title={dict.nav.switchLang}
    >
      {/* Archival Inked Postmark Stamp Badge (Compact on mobile) */}
      <span className="hidden sm:inline font-mono text-[9px] font-black px-1 py-0.2 rounded bg-amber-200/60 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-600/30">
        POST
      </span>

      <span className="font-mono text-[11px] font-black tracking-wider uppercase text-[var(--accent-terracotta)]">
        {isArabic ? "EN" : "عربي"}
      </span>

      {/* Tiny stamped cancellation lines (Compact on mobile) */}
      <span
        aria-hidden="true"
        className="hidden sm:inline text-[9px] font-mono tracking-tighter text-[var(--ink-muted)] opacity-60 select-none"
      >
        ///
      </span>
    </button>
  );
}
