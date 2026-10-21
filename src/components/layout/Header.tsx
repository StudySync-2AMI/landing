"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search, Download, Menu, X, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { SearchModal } from "./SearchModal";

export function Header() {
  const { dict, language } = useLanguage();
  const isArabic = language === "ar";
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: dict.nav.overview },
    { href: "/academics", label: dict.nav.courses },
    { href: "/attendance-safety", label: dict.nav.attendance },
    { href: "/intelligence", label: dict.nav.ai },
    { href: "/ecosystem", label: dict.nav.workflows },
    { href: "/privacy", label: isArabic ? "الخصوصية" : "Student Vault" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg-paper)]/95 border-b-2 border-[var(--border-paper)]/25">
        {/* Subtle stationery rule top border */}
        <div className="h-1 w-full bg-[var(--border-paper)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo with notebook branding & serif typography */}
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            <div className="w-9 h-9 rounded-lg bg-[var(--surface-card)] border-2 border-[var(--border-paper)] text-[var(--ink-primary)] flex items-center justify-center font-bold shadow-[2px_2px_0px_#1A1A1A] group-hover:-translate-y-0.5 transition-transform">
              <BookOpen className="w-4 h-4 text-[var(--accent-terracotta)]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-black tracking-tight text-[var(--ink-primary)]">
                StudySync
              </span>
              <span className="hidden sm:inline font-mono text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#FDF1CC] text-[#1A1A1A] dark:bg-[#E5BE54]/30 dark:text-[#FFEBA8] border border-amber-600/30">
                v1.0
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[var(--ink-secondary)]">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[var(--surface-card)] text-[var(--ink-primary)] border-2 border-[var(--border-paper)] font-black shadow-[2px_2px_0px_#1A1A1A]"
                      : "hover:text-[var(--ink-primary)] hover:bg-[var(--surface-card)]/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Bar (Download Spec, Search, Theme, Language) */}
          <div className="flex items-center gap-2">
            {/* Download Spec / CV matching Image 1 */}
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-card)] text-xs font-bold text-[var(--ink-primary)] shadow-[2px_2px_0px_#1A1A1A] hover:-translate-y-0.5 transition-all cursor-pointer"
              title={dict.nav.print}
            >
              <Download className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
              <span>{isArabic ? "تحميل التوثيق" : "Download Spec"}</span>
            </button>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border-paper)]/40 bg-[var(--surface-card)] text-xs text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-all shadow-xs cursor-pointer"
              title={dict.nav.searchPlaceholder}
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="hidden md:inline px-1 py-0.2 rounded bg-[var(--surface-subtle)] text-[10px] font-mono text-[var(--ink-muted)]">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />
            <LanguageToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-[2px_2px_0px_#1A1A1A]"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[var(--border-paper)] bg-[var(--surface-card)] p-4 space-y-2 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-bold ${
                  pathname === link.href
                    ? "bg-[#FDF1CC] text-[#1A1A1A] border-2 border-[#1A1A1A]"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[var(--border-paper)]/20">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.print();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-paper)] text-xs font-bold text-[var(--ink-primary)]"
              >
                <Download className="w-4 h-4 text-[var(--accent-terracotta)]" />
                <span>{isArabic ? "تحميل التوثيق الأكاديمي" : "Download Spec PDF"}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
