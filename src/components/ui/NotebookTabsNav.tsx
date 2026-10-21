"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function NotebookTabsNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const tabs = [
    {
      href: "/",
      label: language === "ar" ? "الفهرس العام" : "Overview",
      activeBg: "bg-[#FDF1CC] text-[#1A1A1A] border-[#1A1A1A]",
      inactiveBg: "bg-[var(--surface-subtle)] text-[var(--ink-secondary)]",
      tag: "01",
    },
    {
      href: "/academics",
      label: language === "ar" ? "المقررات والجداول" : "Academics",
      activeBg: "bg-[#D8E2EC] text-[#132738] border-[#1A1A1A]",
      inactiveBg: "bg-[var(--surface-subtle)] text-[var(--ink-secondary)]",
      tag: "02",
    },
    {
      href: "/attendance-safety",
      label: language === "ar" ? "الحضور والخطر" : "Safety & Risk",
      activeBg: "bg-[#FAD4C0] text-[#4A1F0D] border-[#1A1A1A]",
      inactiveBg: "bg-[var(--surface-subtle)] text-[var(--ink-secondary)]",
      tag: "03",
    },
    {
      href: "/intelligence",
      label: language === "ar" ? "الذكاء والمذاكرة" : "AI & Career",
      activeBg: "bg-[#E6E0F0] text-[#2F1F45] border-[#1A1A1A]",
      inactiveBg: "bg-[var(--surface-subtle)] text-[var(--ink-secondary)]",
      tag: "04",
    },
    {
      href: "/ecosystem",
      label: language === "ar" ? "الفرص والنطاق" : "Ecosystem",
      activeBg: "bg-[#D1E8D1] text-[#1E3A24] border-[#1A1A1A]",
      inactiveBg: "bg-[var(--surface-subtle)] text-[var(--ink-secondary)]",
      tag: "05",
    },
    {
      href: "/privacy",
      label: language === "ar" ? "المساحة الخاصة" : "Vault & Privacy",
      activeBg: "bg-[#EDEAE0] text-[#1A1A1A] border-[#1A1A1A]",
      inactiveBg: "bg-[var(--surface-subtle)] text-[var(--ink-secondary)]",
      tag: "06",
    },
  ];

  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 mb-2 select-none no-print">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative px-4 py-2.5 rounded-t-xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-2 border-2",
              isActive
                ? cn(
                    tab.activeBg,
                    "shadow-[2px_-2px_0px_#1A1A1A] -mb-px z-10 scale-[1.02] origin-bottom font-black"
                  )
                : cn(
                    tab.inactiveBg,
                    "border-stone-400/40 dark:border-white/10 hover:text-[var(--ink-primary)] hover:bg-[var(--surface-card)]"
                  )
            )}
          >
            <span className="font-mono text-[10px] font-black opacity-80">{tab.tag}</span>
            <span className="font-serif text-xs sm:text-sm">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
