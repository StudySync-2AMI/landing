"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { BookmarkPaperclip } from "./BookmarkPaperclip";
import {
  BookOpen,
  GitBranch,
  ShieldAlert,
  Sparkles,
  Layers,
  Lock,
} from "lucide-react";

export interface BookmarkItem {
  href: string;
  enTitle: string;
  arTitle: string;
  enCode: string;
  arCode: string;
  icon: React.ElementType;
  ribbonColor: string;
  darkRibbonColor: string;
  textColor: string;
  accentBg: string;
  romanNumeral: string;
}

export const BOOKMARKS: BookmarkItem[] = [
  {
    href: "/",
    enTitle: "Overview",
    arTitle: "الفهرس العام",
    enCode: "Ch. I",
    arCode: "باب ١",
    icon: BookOpen,
    ribbonColor: "bg-[#D97736]", // Terracotta / amber silk
    darkRibbonColor: "dark:bg-[#C06020]",
    textColor: "text-[#FFF6E9]",
    accentBg: "#D97736",
    romanNumeral: "I",
  },
  {
    href: "/academics",
    enTitle: "Courses",
    arTitle: "المقررات",
    enCode: "Ch. II",
    arCode: "باب ٢",
    icon: GitBranch,
    ribbonColor: "bg-[#2B4C7E]", // Oxford navy
    darkRibbonColor: "dark:bg-[#3B66A3]",
    textColor: "text-[#EBF3FF]",
    accentBg: "#2B4C7E",
    romanNumeral: "II",
  },
  {
    href: "/attendance-safety",
    enTitle: "Safety & Risk",
    arTitle: "الحضور والخطر",
    enCode: "Ch. III",
    arCode: "باب ٣",
    icon: ShieldAlert,
    ribbonColor: "bg-[#C4432B]", // Sealing wax crimson
    darkRibbonColor: "dark:bg-[#D9553B]",
    textColor: "text-[#FFF0ED]",
    accentBg: "#C4432B",
    romanNumeral: "III",
  },
  {
    href: "/intelligence",
    enTitle: "AI & Career",
    arTitle: "الذكاء والمذاكرة",
    enCode: "Ch. IV",
    arCode: "باب ٤",
    icon: Sparkles,
    ribbonColor: "bg-[#2E6F40]", // Scholar sage
    darkRibbonColor: "dark:bg-[#3D8F55]",
    textColor: "text-[#E8F8EC]",
    accentBg: "#2E6F40",
    romanNumeral: "IV",
  },
  {
    href: "/ecosystem",
    enTitle: "Ecosystem",
    arTitle: "الفرص والنطاق",
    enCode: "Ch. V",
    arCode: "باب ٥",
    icon: Layers,
    ribbonColor: "bg-[#6A4786]", // Royal purple
    darkRibbonColor: "dark:bg-[#855CA6]",
    textColor: "text-[#F8F0FF]",
    accentBg: "#6A4786",
    romanNumeral: "V",
  },
  {
    href: "/privacy",
    enTitle: "Student Vault",
    arTitle: "الخصوصية والحوكمة",
    enCode: "Ch. VI",
    arCode: "باب ٦",
    icon: Lock,
    ribbonColor: "bg-[#333A44]", // Scholar graphite
    darkRibbonColor: "dark:bg-[#454E5B]",
    textColor: "text-[#F3F4F6]",
    accentBg: "#333A44",
    romanNumeral: "VI",
  },
];

export function BookmarkRibbonNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <nav
      aria-label="Academic Desktop Bookmark Ribbons"
      className={cn(
        "relative flex items-start justify-center gap-2 lg:gap-3 select-none z-30",
        className
      )}
    >
      {BOOKMARKS.map((item, idx) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredIdx === idx;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-terracotta)]"
          >
            {/* REALISTIC METALLIC WIRE PAPERCLIP (Rendered over the top edge of the ribbon) */}
            {/* Half of the paperclip is behind (z-0), ribbon body is in middle (z-10), and front clasp loops over (z-20) */}
            <BookmarkPaperclip
              color={isActive ? "brass" : "silver"}
              isSelected={isActive}
              isHovered={isHovered}
              className={cn(
                "transition-opacity duration-200",
                isActive ? "opacity-100" : isHovered ? "opacity-90" : "opacity-0"
              )}
            />

            {/* THE PHYSICAL RIBBON HANGING FLUSH FROM THE TOP EDGE (ZERO DETACHMENT GAP) */}
            <div
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 10px), 50% 100%, 0 calc(100% - 10px))",
              }}
              className={cn(
                "relative z-10 flex flex-col items-center justify-between pb-4 px-2.5 sm:px-3 w-[74px] sm:w-[86px] lg:w-[94px]",
                "transition-all duration-300 ease-out origin-top",
                // Anchored solidly to the top binder line with NO downward translate gap
                "-mt-1.5 pt-3",
                item.ribbonColor,
                item.darkRibbonColor,
                item.textColor,
                "shadow-[0_4px_12px_rgba(0,0,0,0.22)] dark:shadow-[0_4px_18px_rgba(0,0,0,0.55)]",
                // Subtle side fabric stitch
                "border-x border-white/20 dark:border-white/10",
                // Selected: expands downward to h-[96px] showing full details; Unselected: clean compact h-[66px]
                isActive
                  ? "h-[94px] scale-[1.03] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                  : isHovered
                    ? "h-[78px] opacity-100 brightness-105"
                    : "h-[64px] opacity-85 hover:opacity-100"
              )}
            >
              {/* Top Section: Only the Selected / Active bookmark shows the Roman Numeral / Chapter Code */}
              {isActive ? (
                <div className="w-full text-center mb-0.5">
                  <span className="font-mono text-[9px] font-black tracking-widest uppercase opacity-90 block">
                    {isArabic ? item.arCode : item.enCode}
                  </span>
                </div>
              ) : (
                <div className="h-1" />
              )}

              {/* Icon: Always visible */}
              <div className="my-0.5 shrink-0">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isActive ? "scale-115 drop-shadow-sm" : "scale-100"
                  )}
                />
              </div>

              {/* Title: Always clearly visible, crisp, and legible */}
              <div className="w-full text-center shrink-0">
                <span
                  className={cn(
                    "font-serif font-bold leading-tight tracking-tight block truncate px-0.5",
                    isActive ? "text-xs font-black" : "text-[11px] sm:text-xs"
                  )}
                >
                  {isArabic ? item.arTitle : item.enTitle}
                </span>
              </div>
            </div>

            {/* Hanging drop shadow beneath the V-notch */}
            <div
              className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-black/25 blur-[2px] rounded-full pointer-events-none transition-opacity",
                isActive ? "opacity-80" : "opacity-30"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
export { MobileBookEdgeSidebar as MobileBookmarkSidebar } from "./MobileBookEdgeSidebar";
