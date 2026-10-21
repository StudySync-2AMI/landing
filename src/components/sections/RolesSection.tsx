"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/ui/SectionHeader";
import { NotebookCard } from "@/ui/NotebookCard";
import { StampBadge } from "@/ui/StampBadge";
import {
  GraduationCap,
  Briefcase,
  BookMarked,
  ShieldCheck,
  Check,
} from "lucide-react";

export function RolesSection() {
  const { dict, language } = useLanguage();
  const s = dict.s3_roles;
  const [selectedRole, setSelectedRole] = useState(0);

  const roleIcons = [GraduationCap, BookMarked, Briefcase, ShieldCheck];
  const activeRole = s.roles[selectedRole] || s.roles[0];
  const ActiveIcon = roleIcons[selectedRole] || GraduationCap;

  return (
    <section id="sec-03" className="py-12 scroll-mt-20">
      <SectionHeader number={s.number} title={s.title} subtitle={s.subtitle} />

      {/* Role Selector Tabs (like colored notebook index dividers) */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
        {s.roles.map((role, idx) => {
          const Icon = roleIcons[idx];
          const isSelected = selectedRole === idx;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(idx)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all shadow-xs ${
                isSelected
                  ? "bg-amber-500 text-white border-amber-600 shadow-md scale-102"
                  : "bg-[var(--paper-card)] text-[var(--ink-secondary)] border-[var(--paper-card-border)] hover:bg-[var(--paper-bg)] hover:text-[var(--ink-primary)]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{role.name}</span>
            </button>
          );
        })}
      </div>

      {/* Role Details Presentation Card */}
      <NotebookCard variant="ruled" className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--paper-card-border)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-2xl shadow-inner">
              <ActiveIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-[var(--ink-primary)]">
                  {activeRole.name}
                </h3>
                <span className="text-xs font-mono font-medium text-[var(--ink-muted)]">
                  ({activeRole.enName})
                </span>
              </div>
              <p className="text-sm text-[var(--ink-secondary)] mt-1 font-medium">
                {activeRole.summary}
              </p>
            </div>
          </div>

          <StampBadge variant="official">{activeRole.badge}</StampBadge>
        </div>

        {/* Authorized Duties & Permissions List */}
        <div className="mt-6">
          <h4 className="text-sm font-mono uppercase font-bold tracking-wider text-[var(--ink-muted)] mb-4">
            {language === "ar"
              ? "الوظائف والصلاحيات المعتمدة في النظام:"
              : "Authorized Duties & System Capabilities:"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeRole.permissions.map((perm, pIdx) => (
              <div
                key={pIdx}
                className="flex items-start gap-3 p-3 rounded-lg border border-[var(--paper-card-border)]/60 bg-[var(--paper-bg)]/50 hover:bg-[var(--paper-bg)] transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs md:text-sm text-[var(--ink-primary)] leading-snug font-medium">
                  {perm}
                </span>
              </div>
            ))}
          </div>
        </div>
      </NotebookCard>
    </section>
  );
}
