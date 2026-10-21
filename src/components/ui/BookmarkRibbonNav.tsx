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
  ChevronLeft,
  ChevronRight,
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

{/* MOBILE & TABLET: THE CURRENT ACTIVE TAB'S PROTRUDING BOOKMARK RIBBON */ }
export function MobileBookmarkSidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isOpen, setIsOpen] = useState(false);

  // Find currently active bookmark (or default to Overview)
  const currentBookmark =
    BOOKMARKS.find((b) => b.href === pathname) || BOOKMARKS[0];
  const CurrentIcon = currentBookmark.icon;

  return (
    <aside
      aria-label="Mobile Bookmarks Navigation"
      className="md:hidden fixed top-24 end-0 z-50 flex items-start select-none"
    >
      {/* The protruding bookmark tab of the CURRENT active tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group relative flex items-center gap-2 py-2.5 px-3 rounded-s-xl border-2 border-e-0 border-[#1A1A1A]",
          currentBookmark.ribbonColor,
          currentBookmark.darkRibbonColor,
          currentBookmark.textColor,
          "shadow-[-3px_4px_0px_#1A1A1A] transition-all active:scale-95 cursor-pointer overflow-visible"
        )}
        title={isArabic ? "فتح علامات الفهرس الأكاديمي" : "Open Bookmark Index"}
      >
        {/* Layered metallic paperclip clipping onto the side bookmark */}
        <div className="absolute -top-3.5 start-2 w-3.5 h-7 pointer-events-none">
          <svg viewBox="0 0 16 36" fill="none" className="w-full h-full">
            <path
              d="M4 4 V22 C4 26 12 26 12 22 V6"
              stroke="#FFE082"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex items-center gap-1.5">
          <CurrentIcon className="w-4 h-4 drop-shadow-xs" />
          <span className="font-serif text-xs font-bold whitespace-nowrap">
            {isArabic ? currentBookmark.arTitle : currentBookmark.enTitle}
          </span>
        </div>

        {/* Small slide/tap indicator arrow */}
        <div className="flex items-center text-xs opacity-90 animate-pulse">
          {isArabic ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Slide-out Scrapbook Bookmark Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-40 transition-opacity"
          />

          {/* Drawer Paper Sheet */}
          <div
            className={cn(
              "fixed top-0 end-0 bottom-0 w-72 max-w-[85vw] z-50 p-6 flex flex-col justify-between",
              "bg-[var(--surface-card)] border-s-2 border-[#1A1A1A] shadow-[-6px_0px_0px_#1A1A1A]",
              "paper-ruled overflow-y-auto"
            )}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-[#1A1A1A]/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔖</span>
                  <h3 className="font-serif text-lg font-black text-[var(--ink-primary)]">
                    {isArabic ? "علامات الأبواب الأكاديمية" : "Academic Bookmarks"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-[var(--border-paper)] bg-[var(--surface-subtle)] text-xs font-mono font-bold hover:bg-[var(--surface-card)]"
                >
                  ✕
                </button>
              </div>

              {/* Stack of physical hanging ribbons */}
              <div className="space-y-3">
                {BOOKMARKS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "relative flex items-center justify-between p-3.5 rounded-xl border-2 transition-all",
                        item.textColor,
                        item.ribbonColor,
                        item.darkRibbonColor,
                        isActive
                          ? "border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] scale-[1.02] translate-x-1"
                          : "border-transparent opacity-90 hover:opacity-100 hover:translate-x-1"
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex flex-col text-start overflow-hidden">
                          <span className="font-mono text-[9px] font-black uppercase opacity-85">
                            {isArabic ? item.arCode : item.enCode}
                          </span>
                          <span className="font-serif text-sm font-bold truncate">
                            {isArabic ? item.arTitle : item.enTitle}
                          </span>
                        </div>
                      </div>

                      {isActive && (
                        <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-black/25">
                          ACTIVE
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Footer note in drawer */}
            <div className="pt-4 border-t border-[var(--border-paper)]/20 text-center font-handwriting text-sm text-[var(--accent-terracotta)]">
              {isArabic ? "↳ اختر الباب للانتقال الفوري إليه" : "↳ tap any bookmark to flip chapters"}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
