"use client";

import React from "react";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ScholarDeskTickets({ className = "" }: { className?: string }) {
  const { dict } = useLanguage();

  return (
    <div
      className={`relative inline-flex items-center rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[2.5px_2.5px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12] select-none shrink-0 -rotate-1 hover:rotate-0 transition-transform ${className}`}
    >
      {/* Miniature Washi Tape pinning the unified sticker container */}
      <div
        aria-hidden="true"
        className="absolute -top-2.5 start-3 w-7 h-2.5 bg-[#FAF0CB]/95 dark:bg-[#E5BE54]/75 border-y border-amber-600/35 -rotate-6 pointer-events-none shadow-2xs z-10"
        style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }}
      />

      {/* Part 1: Sign In Ticket Half */}
      <Link
        href="/signin"
        className="group relative flex items-center gap-1.5 px-2.5 py-1 text-[var(--ink-primary)] dark:text-[#F3EFE6] hover:text-[var(--accent-terracotta)] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 rounded-s-[4px] transition-colors cursor-pointer"
        title={dict.nav.signIn}
        aria-label={dict.nav.signIn}
      >
        <LogIn className="w-3 h-3 text-[var(--accent-terracotta)] group-hover:scale-110 transition-transform shrink-0" />
        <span className="font-serif text-[11px] font-bold tracking-tight whitespace-nowrap leading-none">
          {dict.nav.signIn}
        </span>
      </Link>

      {/* Perforated Receipt Divider with Circular Punch Notches */}
      <div
        aria-hidden="true"
        className="relative h-4.5 w-0 border-s-2 border-dashed border-[var(--border-paper)]/40 dark:border-white/20 self-center shrink-0"
      >
        <span className="absolute -top-1.5 -start-[3px] w-1.5 h-1.5 rounded-full bg-[var(--bg-paper)] border border-[var(--border-paper)]/30" />
        <span className="absolute -bottom-1.5 -start-[3px] w-1.5 h-1.5 rounded-full bg-[var(--bg-paper)] border border-[var(--border-paper)]/30" />
      </div>

      {/* Part 2: Register / Matriculate Ticket Half */}
      <Link
        href="/signup"
        className="group relative flex items-center gap-1.5 px-2.5 py-1 text-[#B84224] dark:text-[#FF8A65] bg-[#FAF0CB]/70 dark:bg-[#281D1A]/80 hover:bg-[#FAF0CB] dark:hover:bg-[#352521] rounded-e-[4px] transition-colors cursor-pointer"
        title={dict.nav.signUp}
        aria-label={dict.nav.signUp}
      >
        <UserPlus className="w-3 h-3 group-hover:scale-110 transition-transform shrink-0" />
        <span className="font-serif text-[11px] font-black tracking-tight whitespace-nowrap leading-none">
          {dict.nav.signUp}
        </span>
      </Link>
    </div>
  );
}
