"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const { dict, language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Index all sections mapped to their dedicated subpage routes
  const searchIndex = useMemo(() => {
    return [
      { href: "/#sec-01", num: "01", title: dict.s1_overview.title, desc: dict.s1_overview.subtitle },
      { href: "/#sec-02", num: "02", title: dict.s2_objectives.title, desc: dict.s2_objectives.subtitle },
      { href: "/#sec-03", num: "03", title: dict.s3_roles.title, desc: dict.s3_roles.subtitle },
      { href: "/academics#sec-04", num: "04", title: dict.s4_courses.title, desc: dict.s4_courses.subtitle },
      { href: "/attendance-safety#sec-05", num: "05", title: dict.s5_attendance.title, desc: dict.s5_attendance.subtitle },
      { href: "/attendance-safety#sec-06", num: "06", title: dict.s6_grades.title, desc: dict.s6_grades.subtitle },
      { href: "/privacy#sec-07", num: "07", title: dict.s7_workspace.title, desc: dict.s7_workspace.subtitle },
      { href: "/academics#sec-08", num: "08", title: dict.s8_calendar.title, desc: dict.s8_calendar.subtitle },
      { href: "/academics#sec-09", num: "09", title: dict.s9_timetable.title, desc: dict.s9_timetable.subtitle },
      { href: "/attendance-safety#sec-10", num: "10", title: dict.s10_notifications.title, desc: dict.s10_notifications.subtitle },
      { href: "/intelligence#sec-11", num: "11", title: dict.s11_ai_track.title, desc: dict.s11_ai_track.subtitle },
      { href: "/intelligence#sec-12", num: "12", title: dict.s12_recommendation.title, desc: dict.s12_recommendation.subtitle },
      { href: "/intelligence#sec-13", num: "13", title: dict.s13_ai_tools.title, desc: dict.s13_ai_tools.subtitle },
      { href: "/ecosystem#sec-14", num: "14", title: dict.s14_opportunities.title, desc: dict.s14_opportunities.subtitle },
      { href: "/ecosystem#sec-15", num: "15", title: dict.s15_workflows.title, desc: dict.s15_workflows.subtitle },
      { href: "/ecosystem#sec-16", num: "16", title: dict.s16_scope.title, desc: dict.s16_scope.subtitle },
      { href: "/ecosystem#sec-17", num: "17", title: dict.s17_value.title, desc: dict.s17_value.subtitle },
      { href: "/ecosystem#sec-18", num: "18", title: dict.s18_summary.title, desc: dict.s18_summary.title },
      { href: "/ecosystem#sec-19", num: "19", title: dict.s19_pitch.title, desc: dict.s19_pitch.title },
    ];
  }, [dict]);

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex;
    const lower = query.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.desc.toLowerCase().includes(lower) ||
        item.num.includes(lower)
    );
  }, [query, searchIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-xl border border-[var(--border-stone)] bg-[var(--surface-card)] shadow-xl overflow-hidden">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-stone)]">
          <Search className="w-4 h-4 text-[var(--ink-secondary)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.nav.searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-[var(--ink-primary)] outline-none placeholder:text-[var(--ink-muted)]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--ink-secondary)] hover:bg-[var(--surface-subtle)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[var(--border-stone)]/50">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--surface-subtle)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[var(--surface-subtle)] border border-[var(--border-stone)] text-[var(--accent-oxford)] font-mono text-xs font-bold flex items-center justify-center">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[var(--accent-oxford)]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--ink-secondary)] line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-[-90deg]" />
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-[var(--ink-muted)]">
              {language === "ar" ? "لا توجد نتائج مطابقة لبحثك" : "No results matching your query"}
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-[var(--surface-subtle)] border-t border-[var(--border-stone)] flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
          <span>{language === "ar" ? "ESC للإغلاق" : "Press ESC to close"}</span>
          <span className="flex items-center gap-1 font-mono">
            <BookOpen className="w-3.5 h-3.5" /> 19 {language === "ar" ? "قسماً مفهرساً" : "Sections"}
          </span>
        </div>
      </div>
    </div>
  );
}
