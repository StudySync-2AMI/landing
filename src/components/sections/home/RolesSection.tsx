"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArchivalStamp } from "@/ui/ArchivalStamp";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import {
  GraduationCap,
  BookMarked,
  Briefcase,
  ShieldCheck,
  Check,
} from "lucide-react";

export function RolesSection() {
  const { dict } = useLanguage();
  const [selectedRole, setSelectedRole] = useState(0);

  const roles = dict.s3_roles.roles;
  const activeRole = roles[selectedRole] || roles[0];
  const roleIcons = [GraduationCap, BookMarked, Briefcase, ShieldCheck];
  const ActiveIcon = roleIcons[selectedRole] || GraduationCap;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[var(--accent-oxford)]">
            SEC. {dict.s3_roles.number} //
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[var(--ink-primary)]">
            {dict.s3_roles.title}
          </h2>
        </div>
        <ArchivalStamp variant="oxford">4 KEY ROLES</ArchivalStamp>
      </div>

      {/* Physical Folder Subject Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {roles.map((role, idx) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(idx)}
            className={`scrapbook-btn text-xs sm:text-sm font-bold transition-all cursor-pointer px-4 py-2 ${
              selectedRole === idx
                ? "bg-[#FAD4C0] text-[#1A1A1A] border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A]"
                : "bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--border-paper)] hover:text-[var(--ink-primary)]"
            }`}
          >
            {role.name}
          </button>
        ))}
      </div>

      {/* Active Role Dossier Card */}
      <div className="relative p-6 sm:p-10 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[5px_5px_0px_#1A1A1A] space-y-6">
        <Tape color="yellow" rotation="slight-left" position="top-right" />
        <PaperClip color="rose" className="start-10" />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[var(--border-paper)]/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[var(--surface-subtle)] text-[var(--accent-oxford)] border-2 border-[var(--border-paper)] flex items-center justify-center font-bold shadow-xs">
              <ActiveIcon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
                {activeRole.name}{" "}
                <span className="text-base font-sans font-medium text-[var(--ink-muted)]">
                  ({activeRole.enName})
                </span>
              </h3>
              <p className="text-sm text-[var(--ink-secondary)] font-medium mt-1">
                {activeRole.summary}
              </p>
            </div>
          </div>
          <ArchivalStamp variant="amber">{activeRole.badge}</ArchivalStamp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeRole.permissions.map((perm, pIdx) => (
            <div
              key={pIdx}
              className="p-3.5 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-paper)]/30 text-xs sm:text-sm text-[var(--ink-primary)] flex items-start gap-3"
            >
              <Check className="w-4 h-4 text-[#3D5A40] dark:text-[#69A384] shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{perm}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
