"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();
  const isArabic = language === "ar";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-card)] opacity-60" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex items-center justify-center gap-1.5 p-2 rounded-lg border-2 border-[var(--border-paper)]",
        "bg-[var(--surface-card)] text-[var(--ink-primary)]",
        "shadow-[2px_2px_0px_#1A1A1A] dark:shadow-md",
        "hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none",
        className
      )}
      title={isDark ? (isArabic ? "إضاءة نهارية" : "Day Study Mode") : (isArabic ? "مصباح مكتبي ليلي" : "Night Desk Mode")}
      aria-label="Toggle Desk Lighting"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 rotate-0 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-700 dark:text-indigo-400 -rotate-12 hover:rotate-0 transition-transform" />
      )}
    </button>
  );
}
