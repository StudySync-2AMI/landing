"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import {
  NODE_DEFS,
  accentBadgeColors,
  ConstellationNodeDef,
} from "./orbitConfig";

export function ConstellationOrbit({ isArabic = false }: { isArabic?: boolean }) {
  const { dict } = useLanguage();
  const [activeId, setActiveId] = useState<ConstellationNodeDef["id"] | null>(null);

  const activeDef = NODE_DEFS.find((n) => n.id === activeId);

  return (
    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[460px] mx-auto select-none">
      {/* SVG Orbital Dashed Rings & Active Ray Line */}
      <svg
        viewBox="0 0 460 460"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Astrolabe Orbit Ring */}
        <ellipse
          cx="230"
          cy="230"
          rx="165"
          ry="165"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 7"
          className="text-[#C4BCAD] dark:text-stone-500/35 -rotate-12 origin-center"
        />
        {/* Inner Counter-Orbit Accent Ring */}
        <ellipse
          cx="230"
          cy="230"
          rx="110"
          ry="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="4 6"
          className="text-[#D6CEC3] dark:text-stone-500/25 rotate-24 origin-center"
        />
        {/* Active Laser Telemetry Ray */}
        {activeDef && (
          <line
            x1="230"
            y1="230"
            x2={`${(activeDef.xPercent / 100) * 460}`}
            y2={`${(activeDef.yPercent / 100) * 460}`}
            stroke="#E86A46"
            strokeWidth="2.2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Central StudySync Celestial Core Hub (Clear, uncluttered focal center) */}
      <div
        style={{ left: "50%", top: "50%" }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        <div
          className={cn(
            "relative flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-full border-2 transition-all duration-300",
            "bg-[#FAF6EE] dark:bg-[#18212D] text-[var(--ink-primary)] dark:text-[#F9F7F1]",
            "w-22 h-22 sm:w-28 sm:h-28",
            activeId
              ? "border-[#B93815] dark:border-[#E86A46] scale-105 shadow-[4px_4px_0px_var(--shadow-anchor)] dark:shadow-[4px_4px_0px_#0A0D12]"
              : "border-[var(--border-paper)] dark:border-[#3E4A5C] shadow-[3.5px_3.5px_0px_var(--shadow-anchor)] dark:shadow-[3.5px_3.5px_0px_#0A0D12]"
          )}
        >
          <div className="absolute inset-1.5 rounded-full border border-dashed border-[#B93815]/30 dark:border-amber-400/40 pointer-events-none" />
          <span className="font-mono text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-[#B93815] dark:text-[#FCD34D]">
            {activeId ? "ACTIVE" : "CORE HUB"}
          </span>
          <span className="font-serif text-[11px] sm:text-xs font-black text-[var(--ink-primary)] dark:text-[#F9F7F1] leading-snug max-w-[80px] sm:max-w-[95px] mt-0.5 line-clamp-2 px-1">
            {activeId ? dict.hero.orbitNodes[activeId].title : "StudySync"}
          </span>
          <span className="font-mono text-[7px] sm:text-[8px] text-[var(--ink-muted)] dark:text-[#CBD5E1] mt-0.5 leading-none line-clamp-1 max-w-[75px] sm:max-w-[85px]">
            {activeId ? dict.hero.orbitNodes[activeId].tag : dict.hero.orbitNodes.coreSub}
          </span>
        </div>
      </div>

      {/* 6 Balanced Celestial Nodes (Zero edge overflow, zero center collision) */}
      {NODE_DEFS.map((node) => {
        const Icon = node.icon;
        const isHovered = activeId === node.id;
        const nodeData = dict.hero.orbitNodes[node.id];

        const tooltipVertical = node.yPercent >= 50 ? "bottom-full mb-3" : "top-full mt-3";
        const tooltipHorizontal =
          node.xPercent > 65
            ? "end-0"
            : node.xPercent < 35
            ? "start-0"
            : "left-1/2 -translate-x-1/2";

        return (
          <div
            key={node.id}
            style={{
              left: `${node.xPercent}%`,
              top: `${node.yPercent}%`,
            }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none transition-all",
              isHovered ? "z-50" : "z-10"
            )}
            onMouseEnter={() => setActiveId(node.id)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() => setActiveId(isHovered ? null : node.id)}
          >
            {/* Inner Float Wrapper (Preserves parent's -translate-x-1/2 anchor) */}
            <div
              style={{ animationPlayState: isHovered ? "paused" : "running" }}
              className={node.delayClass}
            >
              <div
                className={cn(
                  "group relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg border-2 transition-all duration-200",
                  "bg-[var(--surface-card)] dark:bg-[#18212D] text-[var(--ink-primary)] dark:text-[#F9F7F1]",
                  "w-[115px] sm:w-[145px]",
                  node.rotation,
                  isHovered
                    ? "scale-105 rotate-0 border-[var(--accent-terracotta)] shadow-[3px_3px_0px_var(--shadow-anchor)] dark:shadow-[3px_3px_0px_#0A0D12]"
                    : "border-[var(--border-paper)] dark:border-[#3E4A5C] shadow-[2px_2px_0px_var(--shadow-anchor)] dark:shadow-[2px_2px_0px_#0A0D12]"
                )}
              >
                <div
                  className={cn(
                    "p-1 sm:p-1.5 rounded-md border text-xs flex items-center justify-center shrink-0",
                    accentBadgeColors[node.accent]
                  )}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>

                <div className="flex flex-col text-start overflow-hidden min-w-0 flex-1">
                  <span className="font-mono text-[7px] sm:text-[8.5px] font-black uppercase tracking-wider text-[var(--ink-muted)] leading-tight truncate">
                    {nodeData.tag}
                  </span>
                  <span className="text-[9.5px] sm:text-[11px] font-bold leading-tight font-sans line-clamp-2 mt-0.5">
                    {nodeData.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Smart High-Contrast Telemetry Tooltip (Archival Docket Callout) */}
            {isHovered && (
              <div
                className={cn(
                  "absolute z-50 w-44 sm:w-52 p-2 sm:p-2.5 rounded-lg text-center pointer-events-none",
                  "bg-[var(--surface-card)] dark:bg-[#151B24] text-[var(--ink-primary)] dark:text-[#F9F7F1]",
                  "border-2 border-[var(--border-paper)] dark:border-[var(--accent-terracotta)] shadow-[3px_3px_0px_var(--shadow-anchor)] dark:shadow-[3px_3px_0px_#0A0D12]",
                  "text-[10px] sm:text-[11px] font-mono",
                  tooltipVertical,
                  tooltipHorizontal
                )}
              >
                <div className="flex items-center justify-center gap-1.5 text-[var(--ink-primary)] dark:text-[#FCD34D] font-bold leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6F40] dark:text-[#34D399] shrink-0" />
                  <span className="whitespace-normal">{nodeData.metric}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
