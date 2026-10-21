"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-9 h-9 rounded-lg border border-[var(--paper-card-border)] bg-[var(--paper-card)] flex items-center justify-center opacity-70"
      >
        <span className="w-4 h-4 rounded-full bg-amber-400" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-lg border border-[var(--paper-card-border)] bg-[var(--paper-card)] hover:bg-[var(--paper-bg)] text-[var(--ink-primary)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
      title={isDark ? t("nav.themeLight") : t("nav.themeDark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
