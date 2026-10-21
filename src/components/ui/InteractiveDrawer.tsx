"use client";

import React, { useState } from "react";
import { ArrowUpRight, FileCode2, ExternalLink, Cpu, ShieldCheck, QrCode, Compass, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tape } from "./Tape";
import { PaperClip } from "./PaperClip";
import { Highlighter } from "./Highlighter";

interface ModuleArtifact {
  id: string;
  title: string;
  arabicTitle: string;
  category: string;
  arabicCategory: string;
  subtitle: string;
  arabicSubtitle: string;
  description: string;
  arabicDescription: string;
  tags: string[];
  diagramLabel: string;
  metrics: { label: string; value: string }[];
  route: string;
  icon: React.ElementType;
}

const MODULES: ModuleArtifact[] = [
  {
    id: "attendance",
    title: "Dynamic QR & Anti-Proxy Engine",
    arabicTitle: "نظام الحضور الذكي بـ QR المتغير",
    category: "Security & Attendance",
    arabicCategory: "الأمان والحضور الذكي",
    subtitle: "rotating tokens, location perimeter, proxy mitigation",
    arabicSubtitle: "رموز مشفرة متغيرة ومحيط جغرافي يمنع الغياب غير المباشر",
    description:
      "A military-grade dynamic QR session engine rotating every 15 seconds. Prevents attendance proxy fraud via screen recording, screenshot forwarding, or off-campus proxy check-ins.",
    arabicDescription:
      "محرك حضور متطور يولد رموز QR متغيرة تلقائيًا كل 15 ثانية، مع تحقق دقيق من البصمة الجغرافية لمنع تمرير الصور أو تسجيل الحضور عن بُعد.",
    tags: ["Security", "WebSockets", "Geo-Fencing", "Zero-Proxy"],
    diagramLabel: "Architecture Artifact — Dynamic QR Verification Pipeline",
    metrics: [
      { label: "Rotation Cycle", value: "15s" },
      { label: "Fraud Attempt Rate", value: "<0.01%" },
      { label: "Check-in Latency", value: "320ms" },
    ],
    route: "/attendance-safety",
    icon: QrCode,
  },
  {
    id: "risk",
    title: "Rules-Based Early Risk Matrix",
    arabicTitle: "مصفوفة الإنذار المبكر وحساب الأولوية",
    category: "Predictive Analytics",
    arabicCategory: "التحليلات الوقائية",
    subtitle: "three-tier warning trigger, priority weighting equation",
    arabicSubtitle: "ثلاثة مستويات حذر، ومعادلة رياضية لاحتساب أولوية التدخل",
    description:
      "Calculates composite Priority Score across attendance deprivation limits and grade dipping. Automatically triggers proactive nudges to students and academic advisors before formal course deprivation.",
    arabicDescription:
      "نظام يحسب معامل الأولوية المركب للتعرف الفوري على الطلاب المعرضين للحرمان من المادة أو انخفاض التقدير، ويرسل تنبيهات وقائية ذكية قبل فوات الأوان.",
    tags: ["Risk Matrix", "Rules Engine", "Early Alert", "FERPA Safe"],
    diagramLabel: "Logic Artifact — Priority Score & Deprivation Decision Tree",
    metrics: [
      { label: "Warning Tiers", value: "3 Levels" },
      { label: "Intervention Lead", value: "3 Weeks" },
      { label: "False Positive", value: "0.2%" },
    ],
    route: "/attendance-safety#matrix",
    icon: ShieldCheck,
  },
  {
    id: "recommender",
    title: "ML Career Track Recommender",
    arabicTitle: "محرك توجيه المسار المهني بالذكاء الاصطناعي",
    category: "Machine Learning",
    arabicCategory: "تعلم الآلة والإرشاد",
    subtitle: "k-NN profile matching, course-track synergy matrix",
    arabicSubtitle: "خوارزميات مطابقة المسار وتقييم توافق المواد مع السوق",
    description:
      "Matches student academic strengths, past elective performance, and career aspirations with market-aligned course tracks (AI, Full-Stack, Cyber, Cloud, Embedded).",
    arabicDescription:
      "يحلل نقاط قوة الطالب الأكاديمية واهتماماته لاقتراح المواد الاختيارية والمقررات الأكثر فائدة له للحصول على وظيفة نوعية بعد التخرج.",
    tags: ["k-NN", "Content Filtering", "Career DAG", "Market Sync"],
    diagramLabel: "Model Artifact — Student Vector vs Career Embeddings",
    metrics: [
      { label: "Match Precision", value: "96.4%" },
      { label: "Career Profiles", value: "12 Tracks" },
      { label: "Catalog Synergies", value: "140+ Nodes" },
    ],
    route: "/intelligence",
    icon: Compass,
  },
  {
    id: "tools",
    title: "AI Academic Companion & Summarizer",
    arabicTitle: "المساعد الدراسي الذكي وتلخيص المحاضرات",
    category: "Generative AI",
    arabicCategory: "الذكاء الاصطناعي التوليدي",
    subtitle: "lecture summarizer, diagnostic quizzes, adaptive planner",
    arabicSubtitle: "ملخصات سريعة، بنك أسئلة تدريبية، وجداول مذاكرة ذكية",
    description:
      "Generates structured lecture takeaways, flashcards, and diagnostic exam prep questions straight from accredited course lecture slides.",
    arabicDescription:
      "يقرأ ملفات السلايدات الرسمية ويستخرج أهم المفاهيم، ويولد أسئلة تدريبية تحاكي أسئلة الامتحانات مع جدول مذاكرة يراعي ضغط المواد.",
    tags: ["RAG Engine", "Doc Parser", "Flashcards", "Exam Prep"],
    diagramLabel: "Pipeline Artifact — Lecture Parsing to Flashcard Generation",
    metrics: [
      { label: "Summarization Speed", value: "4.2s" },
      { label: "Question Diversity", value: "MCQ + Short" },
      { label: "Syllabus Grounding", value: "100%" },
    ],
    route: "/intelligence#tools",
    icon: Sparkles,
  },
];

export function InteractiveDrawer({ isArabic = false }: { isArabic?: boolean }) {
  const [activeModule, setActiveModule] = useState(MODULES[0]);

  return (
    <section className="relative my-10 space-y-6">
      {/* Editorial Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[var(--ink-primary)]">
            {isArabic ? "منظومة الأنظمة المدمجة" : "Things I've been building"}
          </h2>
          <p className="font-mono text-xs text-[var(--ink-secondary)] mt-1">
            {isArabic ? "الوحدات التنفيذية التي بنيت لمعالجة التشتت الأكاديمي" : "Core operational modules solving university fragmentation"}
          </p>
        </div>

        <a
          href="/ecosystem"
          className="font-handwriting text-xl sm:text-2xl text-[var(--accent-terracotta)] hover:underline inline-flex items-center gap-1 -rotate-1"
        >
          <span>{isArabic ? "فهرس المنظومة كاملاً ↗" : "the whole drawer ↗"}</span>
        </a>
      </div>

      {/* Two Column Layout: Module Selector List (Left) + Overlapping Artifact Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Module Selector List */}
        <div className="lg:col-span-5 space-y-2">
          {MODULES.map((item) => {
            const isSelected = item.id === activeModule.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item)}
                className={cn(
                  "w-full text-start p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3",
                  isSelected
                    ? "bg-[var(--surface-card)] border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] dark:border-white/20 translate-x-1"
                    : "bg-[var(--surface-subtle)]/70 border-transparent hover:border-stone-400/40 hover:bg-[var(--surface-card)]"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg border",
                      isSelected
                        ? "bg-[#FDF1CC] text-[#1A1A1A] border-amber-600/30 dark:bg-amber-950/40 dark:text-amber-200"
                        : "bg-stone-200/50 dark:bg-stone-800/50 text-[var(--ink-secondary)] border-transparent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[var(--ink-primary)] leading-tight">
                      {isArabic ? item.arabicTitle : item.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[var(--ink-muted)] mt-0.5">
                      {isArabic ? item.arabicCategory : item.category}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  className={cn(
                    "w-4 h-4 text-[var(--ink-muted)] transition-transform",
                    isSelected && "text-[var(--accent-terracotta)] translate-x-0.5 -translate-y-0.5"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Overlapping Physical Artifacts (Image 1 style) */}
        <div className="lg:col-span-7 relative">
          {/* Main Artifact Card */}
          <div className="relative rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-card)] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] dark:shadow-2xl">
            {/* Washi Tape and Paper Clip */}
            <Tape color="striped" rotation="slight-left" position="top-right" />
            <PaperClip color="brass" className="start-6" />

            {/* Subtitle in Handwriting */}
            <p className="font-handwriting text-xl text-[var(--accent-terracotta)] -rotate-1 mb-1">
              ↳ {isArabic ? activeModule.arabicSubtitle : activeModule.subtitle}
            </p>

            {/* Big Serif Heading */}
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[var(--ink-primary)]">
              {isArabic ? activeModule.arabicTitle : activeModule.title}
            </h3>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] font-medium leading-relaxed mt-3">
              {isArabic ? activeModule.arabicDescription : activeModule.description}
            </p>

            {/* Tags in Highlighter style */}
            <div className="flex flex-wrap gap-2 mt-4">
              {activeModule.tags.map((tag, i) => (
                <Highlighter
                  key={tag}
                  color={i % 3 === 0 ? "yellow" : i % 3 === 1 ? "mint" : "peach"}
                  className="text-xs font-mono py-0.5 px-2"
                >
                  #{tag}
                </Highlighter>
              ))}
            </div>

            {/* Visual Technical Diagram Box (Mimicking Image 1 artifact) */}
            <div className="mt-6 p-4 rounded-lg border-2 border-[var(--border-paper)] bg-[var(--surface-subtle)] paper-grid">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--ink-muted)] border-b border-[var(--border-paper)]/20 pb-2">
                <span>{activeModule.diagramLabel}</span>
                <span className="text-[#3D5A40] dark:text-[#69A384] font-bold">● ACTIVE SPEC</span>
              </div>

              {/* Metric stats grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {activeModule.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-md bg-[var(--surface-card)] border border-[var(--border-paper)]/30">
                    <div className="font-mono text-sm sm:text-base font-black text-[var(--accent-oxford)]">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono uppercase text-[var(--ink-muted)] mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Link */}
            <div className="mt-6 flex items-center justify-between">
              <a
                href={activeModule.route}
                className="scrapbook-btn bg-[#FDF1CC] text-[#1A1A1A] hover:bg-[#fae7b1]"
              >
                <span>{isArabic ? "استعراض توثيق الوحدة بالتفصيل" : "Open Module Specification"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="font-mono text-xs text-[var(--ink-muted)]">
                StudySync Archival System v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
