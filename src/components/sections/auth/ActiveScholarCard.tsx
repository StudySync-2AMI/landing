"use client";

import React from "react";
import Link from "next/link";
import { LogOut, BookOpen, UserCheck, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Tape, PaperClip, ArchivalStamp, CornerPointer } from "@/ui";

export function ActiveScholarCard() {
  const { dict } = useLanguage();
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="relative rounded-xl border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[6px_6px_0px_var(--shadow-anchor)] dark:shadow-[6px_6px_0px_#0A0D12] p-5 sm:p-8 paper-ruled">
      <Tape color="yellow" className="absolute -top-3.5 start-10 w-28 sm:w-36 -rotate-2" />
      <PaperClip className="absolute -top-4 end-8" color="brass" />

      {/* Header with Verification Stamp */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[var(--border-paper)]/25 dark:border-white/10 pb-4 mb-6">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] font-black tracking-widest text-[var(--accent-terracotta)] uppercase">
            {dict.auth.activeSession}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-black text-[var(--ink-primary)] mt-0.5">
            {dict.auth.activeTitle}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
            {dict.auth.activeSubtitle}
          </p>
        </div>

        <ArchivalStamp variant="sage" className="-rotate-3 text-[10px] sm:text-xs">
          {dict.auth.statusVerified}
        </ArchivalStamp>
      </div>

      {/* Matriculated Scholar Dossier Ledger */}
      <div className="rounded-lg border-2 border-[var(--border-paper)]/40 dark:border-white/15 bg-[var(--surface-subtle)] dark:bg-[#141B24] p-4 sm:p-5 mb-6 space-y-3 shadow-inner">
        <div className="flex items-center gap-2 border-b border-dashed border-[var(--border-paper)]/30 dark:border-white/10 pb-2.5">
          <UserCheck className="w-4 h-4 text-[#265935] dark:text-[#3D8F55] shrink-0" />
          <span className="font-serif text-base sm:text-lg font-black text-[var(--ink-primary)] dark:text-[#F3EFE6]">
            {user.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[var(--ink-muted)] block uppercase font-bold">
              {dict.auth.scholarId}
            </span>
            <span className="font-black text-[var(--ink-primary)] dark:text-[#F3EFE6]">
              {user.scholarId}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[var(--ink-muted)] block uppercase font-bold">
              {dict.auth.facultyDept}
            </span>
            <span className="font-bold text-[var(--ink-primary)] dark:text-[#F3EFE6] truncate block">
              {user.faculty}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border-2 border-[#B84224] dark:border-[#FF8A65] bg-[#B84224] dark:bg-[#E86A46] text-[#FFF6E9] font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_var(--shadow-anchor)] dark:shadow-[3px_3px_0px_#0A0D12] hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>{dict.auth.returnHub}</span>
        </Link>

        <button
          type="button"
          onClick={signOut}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#141B24] text-[#B84224] dark:text-[#FF8A65] font-mono text-xs sm:text-sm font-bold shadow-[2px_2px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>{dict.auth.signOut}</span>
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-paper)]/15 dark:border-white/10 flex items-center justify-between text-xs text-[var(--ink-muted)]">
        <p className="font-handwriting flex items-center gap-1">
          <CornerPointer size="xs" />
          <span>{dict.auth.securityNotice}</span>
        </p>
        <button
          type="button"
          onClick={signOut}
          className="font-mono text-[11px] font-bold text-[var(--accent-terracotta)] hover:underline cursor-pointer"
        >
          {dict.auth.switchAccount}
        </button>
      </div>
    </div>
  );
}
