"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, ShieldCheck, Building, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Tape, PaperClip, ArchivalStamp, CornerPointer } from "@/ui";
import { AuthFormFields } from "./AuthFormFields";

interface AuthDossierSectionProps {
  initialMode?: "signin" | "signup";
}

export function AuthDossierSection({ initialMode = "signin" }: AuthDossierSectionProps) {
  const router = useRouter();
  const { dict } = useLanguage();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "student",
    faculty: "",
    rememberMe: true,
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(
        mode === "signin"
          ? dict.auth.toastSignInSuccess
          : dict.auth.toastSignUpSuccess
      );
      setTimeout(() => {
        router.push("/");
      }, 1400);
    }, 800);
  };

  const handleDemoSignIn = () => {
    setFormState({
      email: "demo.scholar@studysync.edu",
      password: "••••••••••••",
      fullName: dict.auth.demoName,
      role: "student",
      faculty: dict.auth.demoFaculty,
      rememberMe: true,
    });
    setSuccessMsg(dict.auth.toastSignInSuccess);
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto py-6 sm:py-10">
      {/* 1. Archival Folder Tab Selector (Overlapping Manila Tabs linking to dedicated pages) */}
      <div className="flex items-end gap-1.5 px-4 -mb-[2px] relative z-20">
        <Link
          href="/signin"
          className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-t-lg border-2 border-b-0 font-mono text-xs sm:text-sm font-black transition-all cursor-pointer ${
            mode === "signin"
              ? "border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] text-[var(--accent-terracotta)] shadow-[2px_-2px_0px_var(--shadow-anchor)] -translate-y-0.5"
              : "border-dashed border-[var(--border-paper)]/40 dark:border-white/20 bg-[var(--surface-subtle)] dark:bg-[#141B24] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>{dict.auth.signInTab}</span>
        </Link>

        <Link
          href="/signup"
          className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-t-lg border-2 border-b-0 font-mono text-xs sm:text-sm font-black transition-all cursor-pointer ${
            mode === "signup"
              ? "border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] text-[var(--accent-terracotta)] shadow-[2px_-2px_0px_var(--shadow-anchor)] -translate-y-0.5"
              : "border-dashed border-[var(--border-paper)]/40 dark:border-white/20 bg-[var(--surface-subtle)] dark:bg-[#141B24] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{dict.auth.signUpTab}</span>
        </Link>
      </div>

      {/* 2. Main Matriculation Dossier Paper Card */}
      <div className="relative rounded-xl border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-card)] dark:bg-[#18212D] shadow-[6px_6px_0px_var(--shadow-anchor)] dark:shadow-[6px_6px_0px_#0A0D12] p-5 sm:p-8 paper-ruled">
        {/* Fasteners: Top Washi Tape strip & Brass PaperClip */}
        <Tape color="yellow" className="absolute -top-3.5 start-10 w-28 sm:w-36 -rotate-2" />
        <PaperClip className="absolute -top-4 end-8" color="brass" />

        {/* Dossier Meta Strip & Ink Stamp */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-[var(--border-paper)]/25 dark:border-white/10 pb-4 mb-6">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] sm:text-[10px] font-black tracking-widest text-[var(--ink-muted)] uppercase">
              {dict.auth.dossierNumber}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-black text-[var(--ink-primary)] mt-0.5">
              {mode === "signin" ? dict.auth.signInTitle : dict.auth.signUpTitle}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[var(--ink-secondary)] mt-1">
              {mode === "signin" ? dict.auth.signInSubtitle : dict.auth.signUpSubtitle}
            </p>
          </div>

          <ArchivalStamp variant="sage" className="-rotate-3 text-[10px] sm:text-xs">
            {dict.auth.stampVerified}
          </ArchivalStamp>
        </div>

        {/* Feedback Alert if inscribe success */}
        {successMsg && (
          <div className="mb-5 flex items-center gap-2 p-3 rounded-lg border-2 border-[#265935] dark:border-[#3D8F55] bg-[#E8F4EB] dark:bg-[#152519] text-[#265935] dark:text-[#A8E6B5] font-mono text-xs sm:text-sm shadow-[2px_2px_0px_#265935]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {/* Ledger Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthFormFields mode={mode} formState={formState} onChange={handleFieldChange} />

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 sm:py-3 px-4 rounded-md border-2 border-[#B84224] dark:border-[#FF8A65] bg-[#B84224] dark:bg-[#E86A46] text-[#FFF6E9] font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_var(--shadow-anchor)] dark:shadow-[3px_3px_0px_#0A0D12] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting
              ? "⏳ INSCRIBING..."
              : mode === "signin"
              ? dict.auth.signInSubmit
              : dict.auth.signUpSubmit}
          </button>
        </form>

        {/* Institutional SSO & Demo Options */}
        <div className="mt-6 pt-5 border-t-2 border-dashed border-[var(--border-paper)]/25 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-center">
            <span className="px-3 font-mono text-[9px] sm:text-[10px] font-black uppercase text-[var(--ink-muted)]">
              {dict.auth.orInstitutional}
            </span>
          </div>

          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md border-2 border-[var(--border-paper)] dark:border-[#3E4A5C] bg-[var(--surface-subtle)] dark:bg-[#141B24] text-[var(--ink-primary)] font-mono text-xs font-bold shadow-[2px_2px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Building className="w-3.5 h-3.5 text-[var(--accent-terracotta)]" />
            <span>{dict.auth.ssoButton}</span>
          </button>

          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md border border-dashed border-[var(--border-paper)]/50 dark:border-white/20 bg-transparent text-[var(--accent-terracotta)] hover:bg-[var(--surface-subtle)] font-mono text-[11px] font-bold transition-all cursor-pointer"
          >
            <span>⚡ {dict.auth.guestDemo}</span>
          </button>
        </div>

        {/* Security Footnote & Mode Switching Link */}
        <div className="mt-6 pt-4 border-t border-[var(--border-paper)]/15 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
          <p className="font-handwriting text-xs text-[var(--ink-muted)] flex items-center gap-1">
            <CornerPointer size="xs" />
            <span>{dict.auth.securityNotice}</span>
          </p>

          <Link
            href={mode === "signin" ? "/signup" : "/signin"}
            className="font-mono text-[11px] font-black text-[var(--accent-terracotta)] hover:underline cursor-pointer whitespace-nowrap"
          >
            {mode === "signin" ? dict.auth.switchToSignUp : dict.auth.switchToSignIn}
          </Link>
        </div>
      </div>
    </section>
  );
}
