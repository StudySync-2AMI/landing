"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { SearchModal } from "./SearchModal";
import { BookmarkRibbonNav, MobileBookmarkSidebar, CornerPointer, ScholarDeskTickets } from "@/ui";

export function Header() {
  const { dict } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Mobile Side-Spine Bookmark Dock (Sticks out of the screen edge on small screens) */}
      <MobileBookmarkSidebar />

      {/* Main Academic Desk Header - Relative on mobile (scrolls away), Sticky on desktop (md+) */}
      <header className="relative md:sticky md:top-0 z-40 w-full bg-[var(--bg-paper)]/95 backdrop-blur-xs border-b-2 border-dashed border-[var(--border-paper)]/25 shadow-xs transition-colors">
        {/* Subtle top edge binding line */}
        <div className="h-1 w-full bg-[var(--border-paper)]" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Physical Scrapbook Desk Label for StudySync */}
          <Link
            href="/"
            className="group relative flex items-center select-none shrink-0"
          >
            {/* Taped Index Card Background */}
            <div className="relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[2.5px_2.5px_0px_var(--shadow-anchor)] sm:shadow-[3px_3px_0px_var(--shadow-anchor)] group-hover:-translate-y-0.5 group-hover:rotate-1 transition-all">
              {/* Mini washi tape strip on corner */}
              <div
                className="absolute -top-2.5 -start-2.5 w-6 sm:w-8 h-3 sm:h-3.5 bg-[#FAF0CB]/95 dark:bg-[#E5BE54]/75 border-y border-amber-600/35 -rotate-12 pointer-events-none shadow-xs"
                style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
              />

              {/* Brass paperclip pinning the card on the opposite corner */}
              <div className="absolute -top-2.5 sm:-top-3 end-1.5 sm:end-2 w-3 sm:w-3.5 h-6 sm:h-7 pointer-events-none drop-shadow-xs">
                <svg viewBox="0 0 16 36" fill="none" className="w-full h-full">
                  <path
                    d="M4 4 V22 C4 26 12 26 12 22 V6"
                    stroke="#D4A745"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[var(--ink-primary)]">
                  StudySync
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase text-[var(--accent-terracotta)]">
                  v1.0
                </span>
              </div>

              {/* Handwritten micro-annotation with RTL-mirrored CornerPointer */}
              <p className="font-handwriting text-[11px] sm:text-xs text-[var(--ink-muted)] leading-none -mt-0.5 flex items-center gap-1">
                <CornerPointer size="xs" className="sm:hidden" />
                <CornerPointer size="sm" className="hidden sm:inline-flex" />
                <span className="whitespace-nowrap">{dict.nav.academicAtelier}</span>
              </p>
            </div>
          </Link>

          {/* Center: The Tactile Hanging Bookmark Ribbons (Visible on lg and larger) */}
          <div className="hidden lg:flex items-start self-start pt-0 -mb-4">
            <BookmarkRibbonNav />
          </div>

          {/* Right: Authentic Scrapbook Desk Utilities + Scholar Access Docket */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Desktop Two-Ticket Scholar Access Docket (Sign In & Sign Up) */}
            <ScholarDeskTickets className="hidden sm:flex" />

            {/* Authentic Scrapbook Desk Utilities Pen Tray (Clean & Proportionate) */}
            <div className="relative flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-lg border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#141B24] shadow-[2.5px_2.5px_0px_var(--shadow-anchor)] sm:shadow-[3px_3px_0px_var(--shadow-anchor)] dark:shadow-[2.5px_2.5px_0px_#0A0D12] sm:dark:shadow-[3px_3px_0px_#0A0D12]">
              {/* Mini Washi Tape corner on the utility dock */}
              <div
                aria-hidden="true"
                className="absolute -top-2.5 end-2 sm:end-3 w-5 sm:w-7 h-2.5 sm:h-3 bg-[#E86A46]/30 border-y border-[#E86A46]/50 rotate-3 pointer-events-none"
                style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
              />

              {/* Search Desk Tool (Archival Catalog Loupe Slip) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-md border-2 border-[var(--border-paper)] dark:border-[#4B5565] bg-[var(--surface-card)] dark:bg-[#18212D] text-[var(--ink-primary)] dark:text-[#F3EFE6] shadow-[2px_2px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                title={dict.nav.searchPlaceholder}
                aria-label={dict.nav.searchButton}
              >
                <Search className="w-3.5 h-3.5 text-[var(--accent-terracotta)] group-hover:scale-110 transition-transform shrink-0" />
                <span className="hidden lg:inline font-mono text-[11px] font-black uppercase tracking-wider">
                  {dict.nav.searchButton}
                </span>
              </button>

              {/* Brass Day/Night Desk Lamp Toggle */}
              <ThemeToggle />

              {/* Archival Registrar Postmark Language Toggle */}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
