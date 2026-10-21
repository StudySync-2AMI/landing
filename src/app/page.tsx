"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaperCard } from "@/ui/PaperCard";
import { ArchivalStamp } from "@/ui/ArchivalStamp";
import { SpiralSpine } from "@/ui/SpiralSpine";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import { Highlighter, Highlight } from "@/ui/Highlighter";
import { HandwrittenNote } from "@/ui/HandwrittenNote";
import { NotebookTabsNav } from "@/ui/NotebookTabsNav";
import { SketchUnderline } from "@/ui/SketchUnderline";
import { ConstellationOrbit } from "@/ui/ConstellationOrbit";
import { ScrapbookStamper } from "@/ui/ScrapbookStamper";
import { AcademicHeatmap } from "@/ui/AcademicHeatmap";
import { InteractiveDrawer } from "@/ui/InteractiveDrawer";
import { RiskMatrixSimulator } from "@/ui/RiskMatrixSimulator";
import { MessyScratchpad } from "@/ui/MessyScratchpad";
import {
  GraduationCap,
  BookMarked,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  QrCode,
  FileText,
  Compass,
} from "lucide-react";

export function HomePage() {
  const { dict, language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedRole, setSelectedRole] = useState(0);

  const roles = dict.s3_roles.roles;
  const activeRole = roles[selectedRole] || roles[0];
  const roleIcons = [GraduationCap, BookMarked, Briefcase, ShieldCheck];
  const ActiveIcon = roleIcons[selectedRole] || GraduationCap;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-paper)] text-[var(--ink-primary)] selection:bg-[#FDF1CC] selection:text-[#1A1A1A]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full py-6 md:py-10 space-y-12">
        {/* Notebook Index Tabs Protruding at Top */}
        <NotebookTabsNav />

        {/* Physical Open Scrapbook Binder Sheet */}
        <div className="relative rounded-2xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[5px_5px_0px_#1A1A1A] dark:shadow-2xl overflow-hidden">
          {/* Top Washi Tape Corner Accents */}
          <Tape color="striped" rotation="slight-left" position="top-left" />
          <Tape color="mint" rotation="slight-right" position="top-right" />

          {/* Spiral Binder Ring Coil along top */}
          <div className="pt-2 pb-1 border-b-2 border-[var(--border-paper)] bg-[var(--surface-subtle)]">
            <SpiralSpine count={16} />
          </div>

          <div className="p-6 sm:p-10 md:p-12 space-y-16 paper-ruled">
            {/* HERO SECTION: Blending Editorial Elegance (Image 1) with Playful Scrapbook (Image 2) */}
            <section className="relative pt-2">
              <PaperClip color="brass" className="start-6" />

              {/* Top Meta Line */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-terracotta)]">
                  {isArabic
                    ? "المنظومة الأكاديمية الذكية الموحدة // الإصدار 1.0"
                    : "ACADEMIC ECOSYSTEM SPECIFICATION // v1.0"}
                </span>
                <ArchivalStamp variant="sage">OFFICIAL DOSSIER</ArchivalStamp>
              </div>

              {/* Two Column Grid: Bold Editorial Headline (Left) & Orbital Constellation (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  {/* Handwritten / Italic Greeting */}
                  <p className="font-handwriting text-2xl sm:text-3xl text-[var(--accent-terracotta)] -rotate-1 mb-1">
                    {isArabic ? "مرحبًا، هذه منصة" : "hello, we are"}
                  </p>

                  {/* Gigantic High-Contrast Serif Headline with Brush Underline */}
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink-primary)] leading-[1.08] tracking-tight">
                    <SketchUnderline color="terracotta" variant="brush">
                      {dict.hero.title}
                    </SketchUnderline>
                  </h1>

                  {/* Second Headline Row with Playful Highlighters (Image 2 style) */}
                  <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[var(--ink-primary)] leading-tight pt-1">
                    {isArabic ? (
                      <>
                        نصنع تجربة تعليمية{" "}
                        <Highlight color="yellow" rotate="left">
                          ذكية
                        </Highlight>{" "}
                        و{" "}
                        <Highlight color="mint" rotate="right">
                          موحدة للجميع.
                        </Highlight>
                      </>
                    ) : (
                      <>
                        We make learning{" "}
                        <Highlight color="yellow" rotate="left">
                          smart
                        </Highlight>{" "}
                        &{" "}
                        <Highlight color="mint" rotate="right">
                          unified.
                        </Highlight>
                      </>
                    )}
                  </div>

                  {/* Body Copy */}
                  <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed font-medium pt-1">
                    {dict.hero.description}
                  </p>

                  {/* Handwritten Annotation with arrow */}
                  <div className="pt-1 flex items-center gap-2">
                    <p className="font-handwriting text-xl text-[var(--accent-terracotta)] -rotate-2">
                      ↳ {isArabic ? "مرحبًا بك – تصفح ملف النظام ومحاكياته التفاعلية" : "welcome in – stay a while, flip through the live system"}
                    </p>
                  </div>

                  {/* Scrapbook Buttons (Solid 2px border + 3px solid offset shadow) */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <a
                      href="#modules"
                      className="scrapbook-btn bg-[#FAD4C0] text-[#1A1A1A] hover:bg-[#f7c2a7]"
                    >
                      <span>{isArabic ? "تصفح وحدات المنظومة →" : "Browse the scrapbook →"}</span>
                    </a>

                    <button
                      onClick={() => window.print()}
                      className="scrapbook-btn bg-[#F9F7F1] dark:bg-[#1E2530] text-[var(--ink-primary)] hover:bg-[#F2EFE7]"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{isArabic ? "طباعة المواصفات" : "Download Spec PDF"}</span>
                    </button>
                  </div>

                  {/* Orbital Quick Links Pills (Like Image 1) */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-xs text-[var(--ink-secondary)]">
                    <a
                      href="/academics"
                      className="px-2.5 py-1 rounded-full border border-[var(--border-paper)] bg-[var(--surface-subtle)] hover:border-[var(--accent-terracotta)] transition-colors flex items-center gap-1"
                    >
                      <BookMarked className="w-3 h-3 text-[var(--accent-oxford)]" />
                      <span>{isArabic ? "شجرة المقررات" : "Course DAG"} ↗</span>
                    </a>

                    <a
                      href="/attendance-safety"
                      className="px-2.5 py-1 rounded-full border border-[var(--border-paper)] bg-[var(--surface-subtle)] hover:border-[var(--accent-terracotta)] transition-colors flex items-center gap-1"
                    >
                      <QrCode className="w-3 h-3 text-[var(--accent-sage)]" />
                      <span>{isArabic ? "الحضور الذكي" : "Smart QR"} ↗</span>
                    </a>

                    <a
                      href="/intelligence"
                      className="px-2.5 py-1 rounded-full border border-[var(--border-paper)] bg-[var(--surface-subtle)] hover:border-[var(--accent-terracotta)] transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-[var(--accent-amber)]" />
                      <span>{isArabic ? "توجيه المسار" : "AI Career Match"} ↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Floating Constellation from Image 1 */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <ConstellationOrbit isArabic={isArabic} />
                </div>
              </div>

              {/* The One-Sentence Pitch Note (Section 19) */}
              <div className="mt-12 relative p-6 rounded-xl border-2 border-[#1A1A1A] bg-[#FDF1CC]/80 dark:bg-[#2A2415] shadow-[3px_3px_0px_#1A1A1A] -rotate-[0.5deg]">
                <Tape color="striped" rotation="slight-right" position="top-center" />
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-900 dark:text-amber-300 mb-2">
                  <span>📌 {dict.hero.pitchLabel}</span>
                  <span className="text-[10px] font-mono opacity-60">// Section 19</span>
                </div>
                <blockquote className="font-serif text-lg sm:text-xl font-bold text-amber-950 dark:text-amber-100 leading-relaxed">
                  &ldquo;{dict.hero.pitchText}&rdquo;
                </blockquote>
              </div>
            </section>

            {/* MESSY INTERACTIVE SCRAPBOOK ZONE: Student Scratchpad + Registrar Rubber Stamper */}
            <section className="pt-6 border-t-2 border-[var(--border-paper)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
                    {isArabic ? "طاولة العمل التفاعلية" : "Interactive Academic Scrapbook Desk"}
                  </h2>
                  <p className="font-mono text-xs text-[var(--ink-secondary)] mt-0.5">
                    {isArabic ? "ملاحظات فورية، وأداة ختم تفاعلية للمستندات" : "Tilted sticky notes, checklist tasks, and registrar stamp dispenser"}
                  </p>
                </div>
                <ArchivalStamp variant="amber">SCRAPBOOK TOOLKIT</ArchivalStamp>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5">
                  <MessyScratchpad isArabic={isArabic} />
                </div>
                <div className="lg:col-span-7">
                  <ScrapbookStamper isArabic={isArabic} />
                </div>
              </div>
            </section>

            {/* SECTION: Things I've Been Building / Core Modules (Image 1 Drawer) */}
            <div id="modules">
              <InteractiveDrawer isArabic={isArabic} />
            </div>

            {/* SECTION: Academic Risk Matrix & Priority Score Simulator (Section 6 & 8) */}
            <section className="pt-6 border-t-2 border-[var(--border-paper)]">
              <RiskMatrixSimulator isArabic={isArabic} />
            </section>

            {/* SECTION: Little by Little Academic Activity Heatmap (Image 1 Heatmap) */}
            <section className="pt-6 border-t-2 border-[var(--border-paper)]">
              <AcademicHeatmap isArabic={isArabic} />
            </section>

            {/* SECTION: 10 Strategic Objectives Bento Grid (Section 2) */}
            <section className="space-y-6 pt-6 border-t-2 border-[var(--border-paper)]">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--accent-oxford)]">SEC. 02 //</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
                      {dict.s2_objectives.title}
                    </h2>
                  </div>
                  <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
                    {dict.s2_objectives.subtitle}
                  </p>
                </div>

                <p className="font-handwriting text-xl text-[var(--accent-terracotta)] -rotate-2">
                  ↳ {isArabic ? "10 أهداف استراتيجية مصممة للنجاح" : "10 strategic pillars for student success"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dict.s2_objectives.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative p-5 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A] transition-all"
                  >
                    {index % 4 === 1 && <Tape color="mint" rotation="slight-left" position="top-right" />}
                    {index % 4 === 3 && <Tape color="peach" rotation="slight-right" position="top-left" />}

                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-md bg-[var(--surface-subtle)] border border-[var(--border-paper)]/40 font-mono text-xs font-black text-[var(--accent-oxford)] flex items-center justify-center">
                        {item.id.padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-[var(--ink-muted)]">
                        GOAL // SPEC
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[var(--ink-primary)] mb-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: 4 Ecosystem Stakeholder Roles (Section 3) */}
            <section className="space-y-6 pt-6 border-t-2 border-[var(--border-paper)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--accent-oxford)]">SEC. 03 //</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
                    {dict.s3_roles.title}
                  </h2>
                </div>
                <ArchivalStamp variant="oxford">4 KEY ROLES</ArchivalStamp>
              </div>

              {/* Physical Folder Subject Tabs */}
              <div className="flex flex-wrap gap-2">
                {roles.map((role, idx) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(idx)}
                    className={`scrapbook-btn text-xs font-bold transition-all cursor-pointer ${
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
              <div className="relative p-6 sm:p-8 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[4px_4px_0px_#1A1A1A] space-y-5">
                <Tape color="yellow" rotation="slight-left" position="top-right" />
                <PaperClip color="rose" className="start-8" />

                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[var(--border-paper)]/20">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--surface-subtle)] text-[var(--accent-oxford)] border-2 border-[var(--border-paper)] flex items-center justify-center font-bold shadow-xs">
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-black text-[var(--ink-primary)]">
                        {activeRole.name} <span className="text-sm font-sans font-medium text-[var(--ink-muted)]">({activeRole.enName})</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--ink-secondary)] font-medium mt-0.5">
                        {activeRole.summary}
                      </p>
                    </div>
                  </div>
                  <ArchivalStamp variant="amber">{activeRole.badge}</ArchivalStamp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeRole.permissions.map((perm, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-paper)]/30 text-xs text-[var(--ink-primary)] flex items-start gap-2.5"
                    >
                      <Check className="w-4 h-4 text-[#3D5A40] dark:text-[#69A384] shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{perm}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Specialized Notebook Chapters Directory */}
            <section className="pt-8 border-t-2 border-[var(--border-paper)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-black text-[var(--ink-primary)]">
                    {isArabic ? "فهرس الأقسام التخصصية في الكشكول الأكاديمي" : "Notebook Chapter Directory"}
                  </h3>
                  <p className="font-mono text-xs text-[var(--ink-secondary)] mt-0.5">
                    {isArabic ? "اضغط على أي قسم للاطلاع على مواصفاته ومحاكياته التفاعلية:" : "Select any chapter to explore full specifications & live simulators:"}
                  </p>
                </div>
                <ArchivalStamp variant="neutral">CHAPTER INDEX</ArchivalStamp>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/academics"
                  className="p-5 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1A1A1A] transition-all group"
                >
                  <div className="flex justify-between items-center mb-2 text-xs font-mono font-bold text-[var(--accent-oxford)]">
                    <span>TAB 02</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <div className="font-serif font-black text-base text-[var(--ink-primary)]">
                    {isArabic ? "المقررات والمتطلبات" : "Courses & Prerequisites"}
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono">
                    DAG Syllabus Graph & Labs
                  </p>
                </Link>

                <Link
                  href="/attendance-safety"
                  className="p-5 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1A1A1A] transition-all group"
                >
                  <div className="flex justify-between items-center mb-2 text-xs font-mono font-bold text-[var(--accent-terracotta)]">
                    <span>TAB 03</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <div className="font-serif font-black text-base text-[var(--ink-primary)]">
                    {isArabic ? "الحضور ومصفوفة الخطر" : "Attendance & Risk Matrix"}
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono">
                    Dynamic QR & 3-Tier Alert
                  </p>
                </Link>

                <Link
                  href="/intelligence"
                  className="p-5 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1A1A1A] transition-all group"
                >
                  <div className="flex justify-between items-center mb-2 text-xs font-mono font-bold text-[var(--accent-sage)]">
                    <span>TAB 04</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <div className="font-serif font-black text-base text-[var(--ink-primary)]">
                    {isArabic ? "الذكاء الاصطناعي والمذاكرة" : "AI & Career Engine"}
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono">
                    k-NN Tracks & Quiz Generator
                  </p>
                </Link>

                <Link
                  href="/ecosystem"
                  className="p-5 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] shadow-[3px_3px_0px_#1A1A1A] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#1A1A1A] transition-all group"
                >
                  <div className="flex justify-between items-center mb-2 text-xs font-mono font-bold text-[var(--accent-amber)]">
                    <span>TAB 05</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <div className="font-serif font-black text-base text-[var(--ink-primary)]">
                    {isArabic ? "الفرص والنطاق والأسئلة" : "Opportunity & Scope"}
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono">
                    Internships & FAQ Dossier
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return <HomePage />;
}
