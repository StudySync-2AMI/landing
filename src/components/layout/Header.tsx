"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { SearchModal } from "./SearchModal";
import { BookmarkRibbonNav, MobileBookmarkSidebar } from "@/ui/BookmarkRibbonNav";

export function Header() {
  const { dict, language } = useLanguage();
  const isArabic = language === "ar";
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Mobile Side-Spine Bookmark Dock (Sticks out of the screen edge on small screens) */}
      <MobileBookmarkSidebar />

      {/* Main Academic Desk Header - Sticky only on desktop/lg screens */}
      <header className="relative lg:sticky lg:top-0 z-50 w-full bg-[var(--bg-paper)] border-b-2 border-dashed border-[var(--border-paper)]/25 shadow-xs transition-colors">
        {/* Subtle top edge binding line */}
        <div className="h-1 w-full bg-[var(--border-paper)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Physical Scrapbook Desk Label for StudySync */}
          <Link
            href="/"
            className="group relative flex items-center gap-3 select-none shrink-0"
          >
            {/* Taped Index Card Background */}
            <div className="relative px-3.5 py-1.5 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] group-hover:-translate-y-0.5 group-hover:rotate-1 transition-all">
              {/* Mini washi tape strip on corner */}
              <div
                className="absolute -top-2.5 -start-2.5 w-8 h-3.5 bg-[#FDF1CC]/95 dark:bg-[#E5BE54]/75 border-y border-amber-600/35 -rotate-12 pointer-events-none shadow-xs"
                style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
              />

              {/* Brass paperclip pinning the card on the opposite corner */}
              <div className="absolute -top-3 end-2 w-3.5 h-7 pointer-events-none drop-shadow-xs">
                <svg viewBox="0 0 16 36" fill="none" className="w-full h-full">
                  <path
                    d="M4 4 V22 C4 26 12 26 12 22 V6"
                    stroke="#D4A745"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[var(--ink-primary)]">
                  StudySync
                </span>
                <span className="font-mono text-[9px] font-black uppercase text-[var(--accent-terracotta)]">
                  v1.0
                </span>
              </div>

              {/* Handwritten micro-annotation */}
              <p className="font-handwriting text-xs text-[var(--ink-muted)] leading-none -mt-0.5">
                ↳ {isArabic ? "الكشكول الأكاديمي" : "academic atelier"}
              </p>
            </div>
          </Link>

          {/* Center: The Tactile Hanging Bookmark Ribbons (Visible on md and larger) */}
          <div className="hidden md:flex items-start self-start pt-0 -mb-4">
            <BookmarkRibbonNav />
          </div>

          {/* Right: Authentic Stationery Desk Utilities (Search, Day/Night Lamp, Language) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Search Desk Tool (Styled like an archival loupe card) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-card)] text-xs text-[var(--ink-primary)] shadow-[2px_2px_0px_#1A1A1A] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              title={dict.nav.searchPlaceholder}
            >
              <Search className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
              <span className="hidden sm:inline font-mono text-[11px] font-bold">
                {isArabic ? "بحث" : "FIND"}
              </span>
              <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-[var(--surface-subtle)] text-[10px] font-mono text-[var(--ink-muted)] border border-[var(--border-subtle)]">
                ⌘K
              </kbd>
            </button>

            {/* Brass Day/Night Lamp Toggle */}
            <ThemeToggle />

            {/* Archival Registrar Postmark Stamp Language Toggle */}
            <LanguageToggle />
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
