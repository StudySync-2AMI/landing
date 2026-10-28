"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, UserPlus, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export function ScholarDeskTickets({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const { dict } = useLanguage();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isSignIn = pathname === "/signin";
  const isSignUp = pathname === "/signup";
  const isAuthPage = isSignIn || isSignUp;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Authenticated State: Compact Vertical Scholar ID Badge
  if (isAuthenticated && user) {
    return (
      <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2 h-[38px] sm:h-[40px] px-2.5 rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] text-[var(--ink-primary)] dark:text-[#F3EFE6] shadow-[2.5px_2.5px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer -rotate-1 hover:rotate-0"
          title={user.name}
          aria-expanded={isOpen}
          aria-label={dict.nav.scholarBadge}
        >
          <div aria-hidden="true" className="absolute -top-2 start-3 w-5 h-2.5 bg-gradient-to-b from-[#E8C86D] to-[#A67B2E] border border-[#6B4A14] rounded-xs shadow-2xs pointer-events-none" />
          <div className="relative w-6 h-6 rounded-xs bg-[var(--surface-subtle)] dark:bg-[#141B24] border border-[var(--border-paper)] dark:border-[#4B5565] flex items-center justify-center shrink-0">
            <span className="font-serif text-[11px] font-black text-[var(--accent-terracotta)] leading-none">{user.name.charAt(0).toUpperCase()}</span>
            <span className="absolute -top-0.5 -end-0.5 w-1.5 h-1.5 rounded-full bg-[#265935] dark:bg-[#3D8F55] animate-pulse" />
          </div>
          <div className="flex flex-col text-start">
            <span className="font-serif text-[10px] sm:text-[11px] font-black tracking-tight max-w-[85px] truncate leading-none">{user.name}</span>
            <span className="font-mono text-[8px] font-bold text-[var(--ink-muted)] leading-none mt-0.5">{user.scholarId}</span>
          </div>
          <span className="font-mono text-[8px] font-black px-1 py-0.5 rounded bg-[#FAF0CB] dark:bg-white/10 text-[#8B3A22] dark:text-[#FFAB91] leading-none shrink-0">★</span>
          <ChevronDown className={`w-3 h-3 text-[var(--ink-muted)] transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full end-0 mt-2 w-56 p-3 rounded-lg border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[4px_4px_0px_var(--shadow-anchor)] dark:shadow-[4px_4px_0px_#0A0D12] z-50 paper-ruled flex flex-col gap-2">
            <div className="border-b border-dashed border-[var(--border-paper)]/30 dark:border-white/10 pb-2">
              <div className="flex items-center justify-between text-[8px] font-mono font-black text-[var(--ink-muted)]">
                <span>{dict.auth.activeSession}</span>
                <span className="text-[#265935] dark:text-[#3D8F55]">★ VERIFIED</span>
              </div>
              <p className="font-serif text-xs font-black text-[var(--ink-primary)] dark:text-[#F3EFE6] truncate mt-1">{user.name}</p>
              <p className="font-mono text-[9px] text-[var(--ink-muted)]">{dict.nav.scholarIdPrefix}{user.scholarId}</p>
            </div>
            <div className="text-[10px] font-sans text-[var(--ink-secondary)] bg-[var(--surface-subtle)] dark:bg-[#141B24] p-1.5 rounded border border-[var(--border-paper)]/20">
              <span className="font-mono text-[8px] font-bold text-[var(--accent-terracotta)] block">{dict.auth.facultyDept}</span>
              <span className="truncate block font-medium">{user.faculty}</span>
            </div>
            <div className="flex flex-col gap-1 pt-1 border-t border-dashed border-[var(--border-paper)]/30 dark:border-white/10">
              <Link href="/privacy" onClick={() => setIsOpen(false)} className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-bold text-[var(--ink-primary)] dark:text-[#F3EFE6] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" /><span>{dict.nav.myDossier}</span>
              </Link>
              <button type="button" onClick={() => { signOut(); setIsOpen(false); }} className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-bold text-[#B84224] dark:text-[#FF8A65] hover:bg-[#B84224]/10 dark:hover:bg-white/5 transition-colors cursor-pointer text-start w-full">
                <LogOut className="w-3.5 h-3.5 shrink-0" /><span>{dict.nav.signOut}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative isolate inline-flex flex-col items-center select-none shrink-0 ${className}`}>
      <div className="relative z-10 flex flex-col justify-between w-[96px] h-[38px] sm:h-[40px] rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[2.5px_2.5px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12] -rotate-1 hover:rotate-0 transition-transform">
        <div aria-hidden="true" className="absolute -top-2 start-1/2 -translate-x-1/2 w-7 h-2 bg-[#FAF0CB]/95 dark:bg-[#E5BE54]/75 border-y border-amber-600/35 -rotate-2 pointer-events-none shadow-2xs z-20" style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)" }} />

        {/* Top Half: Sign In (Oxford Navy Stationery Ink) */}
        <Link
          href="/signin"
          className={`group relative flex-1 flex items-center justify-between px-2 rounded-t-[4px] transition-all cursor-pointer ${
            isSignIn
              ? "bg-[#234575]/15 dark:bg-[#234575]/35 text-[#132A4B] dark:text-[#B4D2FF] font-black"
              : "text-[#234575] dark:text-[#88B2F8] hover:bg-[#234575]/10 font-bold"
          }`}
          title={dict.nav.signIn}
          aria-label={dict.nav.signIn}
        >
          <div className="flex items-center gap-1.5">
            <LogIn className="w-2.5 h-2.5 shrink-0 transition-transform group-hover:scale-110" />
            <span className="font-serif text-[10px] tracking-tight whitespace-nowrap leading-none">{dict.nav.signIn}</span>
          </div>
          <span className={`font-mono text-[8px] font-black leading-none ${isSignIn ? "opacity-100" : "opacity-70"}`}>01</span>
        </Link>

        {/* Horizontal Perforated Receipt Cut Line */}
        <div aria-hidden="true" className="relative w-full h-0 border-t border-dashed border-[var(--border-paper)]/40 dark:border-white/20">
          <span className="absolute -top-[3px] -start-[3px] w-1.5 h-1.5 rounded-full bg-[var(--bg-paper)] border border-[var(--border-paper)]/30" />
          <span className="absolute -top-[3px] -end-[3px] w-1.5 h-1.5 rounded-full bg-[var(--bg-paper)] border border-[var(--border-paper)]/30" />
        </div>

        {/* Bottom Half: Register / Enroll (Terracotta Seal Ink) */}
        <Link
          href="/signup"
          className={`group relative flex-1 flex items-center justify-between px-2 rounded-b-[4px] transition-all cursor-pointer ${
            isSignUp
              ? "bg-[#B93815]/15 dark:bg-[#B93815]/35 text-[#822409] dark:text-[#FFB59E] font-black"
              : "text-[#B93815] dark:text-[#FF8A65] hover:bg-[#B93815]/10 font-bold"
          }`}
          title={dict.nav.signUp}
          aria-label={dict.nav.signUp}
        >
          <div className="flex items-center gap-1.5">
            <UserPlus className="w-2.5 h-2.5 shrink-0 transition-transform group-hover:scale-110" />
            <span className="font-serif text-[10px] tracking-tight whitespace-nowrap leading-none">{dict.nav.signUp}</span>
          </div>
          <span className={`font-mono text-[8px] font-black leading-none ${isSignUp ? "opacity-100" : "opacity-70"}`}>02</span>
        </Link>
      </div>

      {/* Tactile Silk Bookmark Ribbon Tucked Beneath Ticket Docket, Overflowing Past Navbar Bottom */}
      <div
        aria-hidden="true"
        className={`absolute top-full -mt-2.5 z-0 transition-all duration-300 ease-out origin-top pointer-events-none ${
          isSignIn ? "start-2.5 opacity-100 translate-y-0 scale-100" : isSignUp ? "start-[50px] opacity-100 translate-y-0 scale-100" : "start-7 opacity-0 -translate-y-8 scale-75"
        }`}
      >
        <div
          className={`w-9 h-9 sm:h-10 flex flex-col items-center justify-between pb-2 pt-1 border-x border-white/25 dark:border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.3)] dark:shadow-[0_4px_18px_rgba(0,0,0,0.6)] ${
            isSignIn ? "bg-[#234575] dark:bg-[#325A96] text-[#EBF3FF]" : "bg-[#D97736] dark:bg-[#C06020] text-[#FFF6E9]"
          }`}
          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 7px), 50% 100%, 0 calc(100% - 7px))" }}
        >
          <span className="font-mono text-[8px] font-black tracking-widest leading-none">{isSignIn ? "01" : "02"}</span>
          <span className="font-serif text-[7.5px] font-black uppercase tracking-tight leading-none opacity-90">{isSignIn ? "IN" : "REG"}</span>
        </div>
      </div>
    </div>
  );
}