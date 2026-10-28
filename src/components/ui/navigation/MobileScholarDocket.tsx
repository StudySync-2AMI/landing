"use client";

import React from "react";
import Link from "next/link";
import { LogIn, UserPlus, LogOut, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export function MobileScholarDocket({ onClose }: { onClose: () => void }) {
  const { dict } = useLanguage();
  const { user, isAuthenticated, signOut } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex flex-col gap-1.5 p-2 rounded-lg border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[2px_2px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12]">
        <div className="flex items-center justify-between text-[9px] font-mono font-black text-[var(--ink-muted)] uppercase tracking-wider px-0.5">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#265935] dark:bg-[#3D8F55] animate-pulse" />
            <span className="truncate max-w-[120px] font-bold text-[var(--ink-primary)] dark:text-[#F3EFE6]">
              {user.name}
            </span>
          </div>
          <span className="text-[#265935] dark:text-[#3D8F55] font-black">★ VERIFIED</span>
        </div>

        <div className="text-[10px] font-mono text-[var(--ink-muted)] px-0.5 truncate">
          {dict.nav.scholarIdPrefix}{user.scholarId}
        </div>

        <div className="grid grid-cols-2 gap-1.5 mt-0.5">
          <Link
            href="/privacy"
            onClick={onClose}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded border border-[var(--border-paper)] dark:border-[#4B5565] bg-[var(--surface-subtle)] dark:bg-[#141B24] text-[var(--ink-primary)] font-mono text-[10px] font-bold shadow-[1px_1px_0px_var(--shadow-anchor)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center"
          >
            <ShieldCheck className="w-3 h-3 text-[var(--accent-terracotta)] shrink-0" />
            <span className="truncate">{dict.nav.myDossier}</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              signOut();
              onClose();
            }}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded border border-[#B84224]/50 dark:border-[#FF8A65]/50 bg-[#B84224]/10 dark:bg-[#E86A46]/20 text-[#B84224] dark:text-[#FF8A65] font-mono text-[10px] font-bold shadow-[1px_1px_0px_var(--shadow-anchor)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center cursor-pointer"
          >
            <LogOut className="w-3 h-3 shrink-0" />
            <span className="truncate">{dict.nav.signOut}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 p-2 rounded-lg border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[2px_2px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12]">
      <div className="flex items-center justify-between text-[9px] font-mono font-black text-[var(--ink-muted)] uppercase tracking-wider px-0.5">
        <span>{dict.sidebar.readerFolio}</span>
        <span className="text-[var(--accent-terracotta)]">CAT.AUTH</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <Link
          href="/signin"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border border-[var(--border-paper)] dark:border-[#4B5565] bg-[var(--surface-subtle)] dark:bg-[#141B24] text-[var(--ink-primary)] font-mono text-[11px] font-bold shadow-[1px_1px_0px_var(--shadow-anchor)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center"
        >
          <LogIn className="w-3 h-3 text-[var(--accent-terracotta)] shrink-0" />
          <span className="truncate">{dict.nav.signIn}</span>
        </Link>

        <Link
          href="/signup"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded border border-[#B84224] dark:border-[#FF8A65] bg-[#B84224] dark:bg-[#E86A46] text-[#FFF6E9] font-mono text-[11px] font-black shadow-[1px_1px_0px_var(--shadow-anchor)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center"
        >
          <UserPlus className="w-3 h-3 shrink-0" />
          <span className="truncate">{dict.nav.signUp}</span>
        </Link>
      </div>
    </div>
  );
}
