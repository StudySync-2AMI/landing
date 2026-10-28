"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { dict } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-8 rounded-md border-2 border-[var(--border-paper)] bg-[var(--surface-card)] opacity-40" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md",
        "border-2 border-[var(--border-paper)] dark:border-[#4B5565]",
        "bg-[var(--surface-card)] dark:bg-[#18212D]",
        "text-[var(--ink-primary)] dark:text-[#F3EFE6]",
        "shadow-[2.5px_2.5px_0px_var(--shadow-anchor)] dark:shadow-[2.5px_2.5px_0px_#0A0D12]",
        "hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer select-none",
        className
      )}
      title={isDark ? dict.nav.themeLight : dict.nav.themeDark}
      aria-label="Toggle Desk Lighting"
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-indigo-700 dark:text-indigo-400 group-hover:-rotate-12 transition-transform" />
      )}

      {/* Tactile Mode Label (Compact on mobile) */}
      <span className="hidden sm:inline font-mono text-[10px] font-black uppercase tracking-wider text-[var(--ink-secondary)]">
        {isDark ? "NIGHT" : "DAY"}
      </span>
    </button>
  );
}
