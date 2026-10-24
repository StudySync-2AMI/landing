"use client";

import React, { useState } from "react";
import {
  Sparkles,
  QrCode,
  GitBranch,
  ShieldAlert,
  CalendarDays,
  Award,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnnotationPointer } from "./AnnotationPointer";

interface ConstellationNode {
  id: string;
  title: string;
  arabicTitle: string;
  tag: string;
  metric: string;
  icon: React.ElementType;
  xPercent: number; // percentage in SVG coordinate space
  yPercent: number;
  rotation: string;
  accent: "mint" | "yellow" | "peach" | "purple" | "oxford";
  delayClass: string;
}

const NODES: ConstellationNode[] = [
  {
    id: "ai",
    title: "AI Track Recommender",
    arabicTitle: "محرك توجيه المسار المهني",
    tag: "ML Engine",
    metric: "k-NN + Content Match",
    icon: Sparkles,
    xPercent: 48,
    yPercent: 12,
    rotation: "rotate-2",
    accent: "purple",
    delayClass: "animate-orbit-float",
  },
  {
    id: "qr",
    title: "Dynamic QR Attendance",
    arabicTitle: "حضور ذكي برمز متغير",
    tag: "Anti-Proxy",
    metric: "15s Cycle • GPS Token",
    icon: QrCode,
    xPercent: 14,
    yPercent: 34,
    rotation: "-rotate-3",
    accent: "mint",
    delayClass: "animate-orbit-float-delayed",
  },
  {
    id: "dag",
    title: "Prerequisite DAG Graph",
    arabicTitle: "مخطط المتطلبات السابقة",
    tag: "Course Hierarchy",
    metric: "Zero Cyclic Deadlocks",
    icon: GitBranch,
    xPercent: 82,
    yPercent: 28,
    rotation: "rotate-3",
    accent: "peach",
    delayClass: "animate-orbit-float-slow",
  },
  {
    id: "risk",
    title: "Early Warning Matrix",
    arabicTitle: "مصفوفة الإنذار المبكر",
    tag: "Risk Matrix",
    metric: "3-Tier Safety Rules",
    icon: ShieldAlert,
    xPercent: 52,
    yPercent: 52,
    rotation: "-rotate-2",
    accent: "terracotta" as any,
    delayClass: "animate-orbit-float",
  },
  {
    id: "cal",
    title: "Unified Calendar",
    arabicTitle: "التقويم الأكاديمي الموحد",
    tag: "Sync Engine",
    metric: "Lectures, Labs & Exams",
    icon: CalendarDays,
    xPercent: 22,
    yPercent: 78,
    rotation: "rotate-2",
    accent: "oxford",
    delayClass: "animate-orbit-float-delayed",
  },
  {
    id: "analytics",
    title: "Grade & GPA Ledger",
    arabicTitle: "سجل التقديرات والمعدل",
    tag: "Analytics",
    metric: "Instant Accredited Ranks",
    icon: Award,
    xPercent: 76,
    yPercent: 74,
    rotation: "-rotate-1",
    accent: "yellow",
    delayClass: "animate-orbit-float-slow",
  },
];

export function ConstellationOrbit({ isArabic = false }: { isArabic?: boolean }) {
  const [activeNode, setActiveNode] = useState<ConstellationNode | null>(null);

  const accentBadgeColors = {
    mint: "bg-[#D1E8D1] text-[#1E3A24] dark:bg-[#69A384]/30 dark:text-[#A7E8C4] border-emerald-700/20",
    yellow: "bg-[#FDF1CC] text-[#4A3800] dark:bg-[#E5BE54]/30 dark:text-[#FFEBA8] border-amber-700/20",
    peach: "bg-[#FAD4C0] text-[#4A1F0D] dark:bg-[#E29373]/30 dark:text-[#FFCEBC] border-orange-700/20",
    purple: "bg-[#E6E0F0] text-[#2F1F45] dark:bg-[#8B7BA8]/30 dark:text-[#D8CCE8] border-purple-700/20",
    oxford: "bg-[#D8E2EC] text-[#132738] dark:bg-[#7AA2C7]/30 dark:text-[#C5DCF2] border-blue-700/20",
    terracotta: "bg-[#FAD4C0] text-[#E86A46] dark:bg-[#E86A46]/30 dark:text-[#FFB69E] border-orange-700/20",
  };

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto select-none">
      {/* SVG Orbital Dashed Trails */}
      <svg
        viewBox="0 0 460 460"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Orbit Ellipse */}
        <ellipse
          cx="230"
          cy="230"
          rx="195"
          ry="150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="5 6"
          className="text-stone-400/40 dark:text-stone-500/30 -rotate-12 origin-center"
        />
        {/* Inner Orbit Ellipse */}
        <ellipse
          cx="230"
          cy="230"
          rx="135"
          ry="95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          className="text-stone-400/50 dark:text-stone-500/35 rotate-18 origin-center"
        />
        {/* Center Connecting Dashed Lines */}
        <path
          d="M100 160 Q 230 110 370 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 4"
          className="text-stone-400/35 dark:text-stone-500/25"
        />
        <path
          d="M120 340 Q 230 240 340 330"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 4"
          className="text-stone-400/35 dark:text-stone-500/25"
        />
      </svg>

      {/* Floating System Cards */}
      {NODES.map((node) => {
        const Icon = node.icon;
        const isHovered = activeNode?.id === node.id;

        return (
          <div
            key={node.id}
            style={{
              left: `${node.xPercent}%`,
              top: `${node.yPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            className={cn(
              "absolute z-10 transition-all duration-300 cursor-pointer",
              node.delayClass
            )}
            onMouseEnter={() => setActiveNode(node)}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => setActiveNode(isHovered ? null : node)}
          >
            <div
              className={cn(
                "group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-lg border transition-all duration-200",
                "bg-[var(--surface-card)] text-[var(--ink-primary)]",
                "shadow-[2px_2px_0px_#1A1A1A] dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
                "border-2 border-[#1A1A1A] dark:border-white/20",
                node.rotation,
                isHovered && "scale-110 rotate-0 z-30 shadow-[4px_4px_0px_#E86A46]"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-md border text-xs flex items-center justify-center transition-colors",
                  accentBadgeColors[node.accent as keyof typeof accentBadgeColors] || accentBadgeColors.mint
                )}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex flex-col text-start">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                  {node.tag}
                </span>
                <span className="text-xs font-bold leading-tight font-sans">
                  {isArabic ? node.arabicTitle : node.title}
                </span>
              </div>
            </div>

            {/* Tooltip on hover / active */}
            {isHovered && (
              <div
                className={cn(
                  "absolute top-full mt-2 left-1/2 -translate-x-1/2 z-40 w-48 p-2 rounded-lg text-center",
                  "bg-[#1A1A1A] text-[#F9F7F1] dark:bg-[#1E2530] dark:border dark:border-white/15",
                  "text-[11px] font-mono shadow-xl pointer-events-none"
                )}
              >
                <div className="flex items-center justify-center gap-1 text-[#E5BE54] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-[#69A384]" />
                  <span>{node.metric}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
