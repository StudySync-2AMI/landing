"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { BOOKMARKS } from "./BookmarkRibbonNav";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function MobileBookEdgeSidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [isOpen, setIsOpen] = useState(false);

  // Active bookmark for sticky indicator
  const currentBookmark =
    BOOKMARKS.find((b) => b.href === pathname) || BOOKMARKS[0];
  const CurrentIcon = currentBookmark.icon;

  return (
    <aside aria-label="Mobile Book Edge Navigation" className="md:hidden select-none">
      {/* 1. THE STICKY BOOKMARK INDICATOR ON SCREEN EDGE (Trigger) */}
      <div className="fixed top-24 end-0 z-40 flex items-start">
        <button
          onClick={() => setIsOpen(true)}
          style={{
            // V-notch cut into the inner edge, apex pointing inward (bookmark tail)
            clipPath: isArabic
              ? "polygon(0 0, 100% 0, calc(100% - 10px) 50%, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%, 10px 50%)",
            // 4 offset drop-shadows fake a 2px border that follows the notch,
            // last one is your hard offset shadow
            filter:
              "drop-shadow(2px 0 0 #1A1A1A) drop-shadow(-2px 0 0 #1A1A1A) drop-shadow(0 2px 0 #1A1A1A) drop-shadow(0 -2px 0 #1A1A1A) drop-shadow(-3px 4px 0 #1A1A1A)",
          }}
          className={cn(
            "group relative flex items-center gap-2 py-2 ps-4 pe-3",
            currentBookmark.ribbonColor,
            currentBookmark.darkRibbonColor,
            currentBookmark.textColor,
            "transition-all active:scale-95 cursor-pointer"
          )}
          title={isArabic ? "فتح فهرس الكشكول" : "Open Book Index"}
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

      {/* 2. THE BOOK EDGE DRAWER (Higher z-index than navbar z-50, full-height book folio) */}
      {isOpen && (
        <>
          {/* Dimmed backdrop at z-[60] (above navbar z-50) */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[60] transition-opacity duration-200"
          />

          {/* Book Edge Drawer at z-[70] (cleanly overlays navbar) */}
          <div
            className={cn(
              "fixed inset-y-0 end-0 z-[70] flex items-stretch w-[285px] sm:w-[320px] max-w-[88vw]",
              "overflow-visible transition-transform duration-300 ease-out select-none",
              isArabic ? "flex-row" : "flex-row"
            )}
          >
            {/* A. THE NOTEBOOK SHEET (Main Body) */}
            <div
              className={cn(
                "relative z-10 flex-1 flex flex-col justify-between overflow-visible",
                "bg-[#FCFAF5] dark:bg-[#151A22] border-y-2 border-[#1A1A1A] dark:border-[#3A4556]",
                isArabic
                  ? "border-e-2 border-s-0 shadow-[4px_0px_0px_#1A1A1A]"
                  : "border-s-2 border-e-0 shadow-[-4px_0px_0px_#1A1A1A]",
                "paper-ruled"
              )}
            >
              {/* Header: Folio Index & Stamped Close Button */}
              <div className="px-3.5 pt-4 pb-2.5 flex items-center justify-between border-b-2 border-dashed border-[#1A1A1A]/15 dark:border-white/10 bg-[#F4EFE6]/60 dark:bg-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">📖</span>
                  <span className="font-serif text-xs font-black tracking-tight text-[var(--ink-primary)]">
                    {isArabic ? "فهرس الكشكول" : "FOLIO INDEX"}
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-7 h-7 rounded border-2 border-[#1A1A1A] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-[2px_2px_0px_#1A1A1A] hover:bg-[var(--surface-subtle)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                  title={isArabic ? "إغلاق" : "Close"}
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* B. THE BOOKMARKS: Thicker, tactile ribbons rooted in spine & overflowing into screen */}
              <div className="flex-1 flex flex-col justify-center gap-2.5 sm:gap-3 py-3 overflow-visible ps-1 pe-0">
                {BOOKMARKS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        // Thicker swallowtail ribbon notch pointing out into the open screen!
                        clipPath: isArabic
                          ? "polygon(0% 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 0% 100%)"
                          : "polygon(15px 0%, 100% 0%, 100% 100%, 15px 100%, 0% 50%)",
                      }}
                      className={cn(
                        // Thicker height (h-12 / 48px) for tactile, luxurious bookmark feel
                        "group relative flex items-center h-12 sm:h-12.5 border-2 border-[#1A1A1A] transition-all duration-200 cursor-pointer overflow-visible",
                        // Root firmly anchored against spine, active expands outward at start
                        isActive
                          ? "-ms-10 sm:-ms-11 pe-2.5 ps-2 z-30 scale-[1.02]"
                          : "-ms-7 sm:-ms-8 pe-2.5 ps-2 z-20 opacity-95 hover:opacity-100",
                        item.ribbonColor,
                        item.darkRibbonColor,
                        item.textColor,
                        isArabic ? "shadow-[3px_3px_0px_#1A1A1A]" : "shadow-[-3px_3px_0px_#1A1A1A]",
                        isActive && (isArabic ? "-rotate-1" : "rotate-1")
                      )}
                    >
                      {/* 1. Protruding Swallowtail Tip (Roman Numeral / Active Stamp) */}
                      <div className="w-7 shrink-0 flex items-center justify-center font-serif text-[11px] font-black">
                        {isActive ? (
                          <span className="font-mono text-[7.5px] font-black px-1 py-0.5 rounded bg-black/40 border border-white/30 uppercase leading-none">
                            {isArabic ? "مفتوح" : "ACT"}
                          </span>
                        ) : (
                          <span className="opacity-85">{item.romanNumeral}</span>
                        )}
                      </div>

                      {/* 2. Active Brass Paperclip on Ribbon */}
                      {isActive && (
                        <div className="absolute -top-3.5 start-4 w-3.5 h-6 pointer-events-none drop-shadow-xs z-30">
                          <svg viewBox="0 0 16 36" fill="none" className="w-full h-full">
                            <path d="M4 4 V22 C4 26 12 26 12 22 V6" stroke="#FFE082" strokeWidth="2.8" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}

                      {/* 3. Ribbon Chapter Info (Clear, crisp, unblocked) */}
                      <div className="flex items-center gap-2.5 overflow-hidden flex-1 ms-1">
                        <div className="w-6 h-6 rounded-md bg-black/25 flex items-center justify-center shrink-0 border border-white/20">
                          <Icon className="w-3.5 h-3.5 drop-shadow-xs" />
                        </div>

                        <div className="flex flex-col text-start overflow-hidden">
                          <span className="font-mono text-[8px] font-black uppercase tracking-wider opacity-90 leading-tight">
                            {isArabic ? item.arCode : item.enCode}
                          </span>
                          <span className="font-serif text-xs sm:text-[13px] font-bold truncate leading-tight">
                            {isArabic ? item.arTitle : item.enTitle}
                          </span>
                        </div>
                      </div>

                      {/* 4. Root Anchor: Solid stitched binding seam firmly meeting the spine */}
                      <div className="w-1.5 h-full border-s border-dashed border-white/40 shrink-0 opacity-75" />
                    </Link>
                  );
                })}
              </div>

              {/* Footer: Handwritten Note */}
              <div className="px-3 py-2.5 bg-[#F4EFE6]/60 dark:bg-white/5 border-t border-[#1A1A1A]/15 dark:border-white/10 text-center">
                <p className="font-handwriting text-xs text-[var(--accent-terracotta)] font-bold">
                  {isArabic ? "↳ اسحب أي علامة لتقليب الفصول" : "↳ tap any bookmark to flip chapters"}
                </p>
              </div>
            </div>

            {/* C. THE STUDYSYNC SPINE (Oxford Navy / Deep Leather Spine Anchor) */}
            <div
              className={cn(
                "relative z-20 w-10 sm:w-11 shrink-0 flex flex-col items-center justify-between py-5 px-1",
                "bg-[#1E2734] text-[#FDF1CC] border-y-2 border-[#1A1A1A] dark:border-[#3A4556]",
                isArabic
                  ? "border-s-2 border-e-0 shadow-[-3px_0px_0px_#1A1A1A]"
                  : "border-e-2 border-s-0 shadow-[3px_0px_0px_#1A1A1A]"
              )}
            >
              {/* Masking tape strip on spine corner */}
              <div
                className="w-7 h-3.5 bg-[#FDF1CC]/95 dark:bg-[#E5BE54]/70 border border-amber-600/40 -rotate-6 pointer-events-none shadow-xs shrink-0"
                style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
              />

              <span className="font-mono text-[8px] font-black text-[#E5BE54] uppercase tracking-wider shrink-0 mt-1">
                VOL.1
              </span>

              {/* VERTICAL "STUDYSYNC" STAMPED IN GOLD FOIL DOWN THE SPINE */}
              <div className="my-auto flex flex-col items-center select-none py-1">
                {isArabic ? (
                  <span
                    style={{ writingMode: "vertical-rl" }}
                    className="font-serif font-black tracking-widest text-xs uppercase text-[#E5BE54] drop-shadow-xs rotate-180"
                  >
                    ستادي سينك
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
    </aside>
  );
}
