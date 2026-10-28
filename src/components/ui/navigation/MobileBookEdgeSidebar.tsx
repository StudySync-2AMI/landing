"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { BOOKMARKS } from "./BookmarkRibbonNav";
import { MobileRibbonItem } from "./MobileRibbonItem";
import { MobileScholarDocket } from "./MobileScholarDocket";
import { CornerPointer } from "../annotations/pointers/CornerPointer";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { SearchModal } from "@/components/layout/SearchModal";
import { ChevronLeft, ChevronRight, X, Search } from "lucide-react";

export function MobileBookEdgeSidebar() {
  const pathname = usePathname();
  const { language, dict } = useLanguage();
  const isArabic = language === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Active bookmark for sticky edge indicator
  const currentBookmark =
    BOOKMARKS.find((b) => b.href === pathname) || BOOKMARKS[0];
  const CurrentIcon = currentBookmark.icon;

  return (
    <aside aria-label="Mobile Book Edge Navigation" className="lg:hidden select-none">
      {/* 1. STICKY BOOKMARK INDICATOR ON SCREEN EDGE (Only sticky item on mobile) */}
      <div className="fixed top-24 end-0 z-40 flex items-start">
        <button
          onClick={() => setIsOpen(true)}
          style={{
            clipPath: isArabic
              ? "polygon(0 0, 100% 0, calc(100% - 10px) 50%, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)",
            filter:
              "drop-shadow(2px 0 0 #3D352E) drop-shadow(-2px 0 0 #3D352E) drop-shadow(0 2px 0 #3D352E) drop-shadow(0 -2px 0 #3D352E) drop-shadow(-3px 4px 0 #3D352E)",
          }}
          className={cn(
            "group relative flex items-center gap-2 py-2 ps-4 pe-3",
            currentBookmark.ribbonColor,
            currentBookmark.darkRibbonColor,
            currentBookmark.textColor,
            "transition-all active:scale-95 cursor-pointer"
          )}
          title={dict.sidebar.openFolio}
        >
          <div className="flex items-center gap-1.5">
            <CurrentIcon className="w-4 h-4 drop-shadow-xs" />
            <span className="font-serif text-xs font-bold whitespace-nowrap">
              {isArabic ? currentBookmark.arTitle : currentBookmark.enTitle}
            </span>
          </div>

          <div className="flex items-center text-xs opacity-90 animate-pulse">
            {isArabic ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </div>
        </button>
      </div>

      {/* 2. THE BOOK EDGE DRAWER */}
      {isOpen && (
        <>
          {/* Dimmed backdrop at z-[60] */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[60] transition-opacity duration-200"
          />

          {/* Book Edge Drawer at z-[70] */}
          <div
            className={cn(
              "fixed inset-y-0 end-0 z-[70] flex items-stretch w-[295px] sm:w-[325px] max-w-[88vw]",
              "overflow-visible transition-transform duration-300 ease-out select-none"
            )}
          >
            {/* A. Main Sheet Body */}
            <div
              className={cn(
                "relative z-10 flex-1 flex flex-col justify-between overflow-visible",
                "bg-[#FAF6EE] dark:bg-[#151A22] border-y-2 border-[var(--border-paper)] dark:border-[#3A4556]",
                isArabic
                  ? "border-e-2 border-s-0 shadow-[4px_0px_0px_var(--shadow-anchor)]"
                  : "border-s-2 border-e-0 shadow-[-4px_0px_0px_var(--shadow-anchor)]",
                "paper-ruled"
              )}
            >
              {/* Top Header */}
              <div className="px-3.5 pt-3.5 pb-2.5 flex items-center justify-between border-b-2 border-dashed border-[var(--border-paper)]/15 dark:border-white/10 bg-[#EBE3D3]/60 dark:bg-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">📖</span>
                  <span className="font-serif text-xs font-black tracking-tight text-[var(--ink-primary)]">
                    {dict.sidebar.folioIndex}
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-7 h-7 rounded border-2 border-[var(--border-paper)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-[2px_2px_0px_var(--shadow-anchor)] hover:bg-[var(--surface-subtle)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  title={dict.sidebar.close}
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Bookmarks List with unclipped realistic paperclips */}
              <div className="flex-1 flex flex-col justify-center gap-2.5 sm:gap-3 py-3 overflow-visible ps-1 pe-0">
                {BOOKMARKS.map((item) => (
                  <MobileRibbonItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                    isArabic={isArabic}
                    activeLabel={dict.sidebar.active}
                    onSelect={() => setIsOpen(false)}
                  />
                ))}
              </div>

              {/* Drawer Footer: Desk Utilities Tray & Micro Note */}
              <div className="p-2.5 bg-[#EBE3D3]/90 dark:bg-[#11161F] border-t-2 border-[var(--border-paper)]/20 dark:border-white/15 flex flex-col gap-2 shrink-0">
                {/* Authentic Scholar Pass (Signed In or Out state) */}
                <MobileScholarDocket onClose={() => setIsOpen(false)} />

                <div className="flex items-center justify-between gap-1.5 p-1 rounded-lg border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[2px_2px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12]">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-md border-2 border-[var(--border-paper)] dark:border-[#4B5565] bg-[var(--surface-subtle)] dark:bg-[#18212D] text-[var(--ink-primary)] dark:text-[#F3EFE6] shadow-[1.5px_1.5px_0px_var(--shadow-anchor)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    title={dict.nav.searchPlaceholder}
                  >
                    <Search className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
                    <span className="font-mono text-[10px] font-black uppercase">
                      {dict.nav.searchButton}
                    </span>
                  </button>
                  <ThemeToggle />
                  <LanguageToggle />
                </div>

                <p className="font-handwriting text-[11px] text-[var(--accent-terracotta)] font-bold flex items-center justify-center gap-1.5 leading-tight">
                  <CornerPointer size="xs" />
                  <span>{dict.sidebar.tip}</span>
                </p>
              </div>
            </div>

            {/* B. Leather Spine Strip */}
            <div
              className={cn(
                "relative z-20 w-10 sm:w-11 shrink-0 flex flex-col items-center justify-between py-5 px-1",
                "bg-[#1E2734] text-[#FDF1CC] border-y-2 border-[var(--border-paper)] dark:border-[#3A4556]",
                isArabic
                  ? "border-s-2 border-e-0 shadow-[-3px_0px_0px_var(--shadow-anchor)]"
                  : "border-e-2 border-s-0 shadow-[3px_0px_0px_var(--shadow-anchor)]"
              )}
            >
              <div
                className="w-7 h-3.5 bg-[#FDF1CC]/95 dark:bg-[#E5BE54]/70 border border-amber-600/40 -rotate-6 pointer-events-none shadow-xs shrink-0"
                style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
              />
              <span className="font-mono text-[8px] font-black text-[#E5BE54] uppercase tracking-wider shrink-0 mt-1">
                VOL.1
              </span>
              <div className="my-auto flex flex-col items-center select-none py-1">
                {isArabic ? (
                  <span
                    style={{ writingMode: "vertical-rl" }}
                    className="font-serif font-black tracking-widest text-xs uppercase text-[#E5BE54] drop-shadow-xs rotate-180"
                  >
                    {dict.sidebar.brandArabic}
                  </span>
                ) : (
                  <div className="flex flex-col items-center gap-0.5 font-serif font-black text-[10px] sm:text-[11px] leading-tight text-[#E5BE54] uppercase drop-shadow-xs">
                    {"STUDYSYNC".split("").map((letter, i) => (
                      <span key={i} className="leading-none">{letter}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-mono text-[8px] font-black text-[#E5BE54]/70 tracking-wider shrink-0 mb-1">
                v1.0
              </span>
            </div>
          </div>
        </>
      )}

      {/* Global Search Modal opened from mobile sidebar */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </aside>
  );
}
