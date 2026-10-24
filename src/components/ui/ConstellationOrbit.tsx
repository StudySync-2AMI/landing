"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import {
  NODE_DEFS,
  accentBadgeColors,
  ConstellationNodeDef,
} from "./orbit/orbitConfig";

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
          strokeWidth="1.4"
          strokeDasharray="6 7"
          className="text-stone-400/40 dark:text-stone-500/30 -rotate-12 origin-center"
        />
        {/* Inner Counter-Orbit Accent Ring */}
        <ellipse
          cx="230"
          cy="230"
          rx="110"
          ry="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          className="text-stone-400/35 dark:text-stone-500/25 rotate-24 origin-center"
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
            "relative flex flex-col items-center justify-center text-center p-2 sm:p-3 rounded-full border-2 transition-all duration-300",
            "bg-[#FFFDF9] dark:bg-[#18212D]",
            "w-20 h-20 sm:w-26 sm:h-26",
            activeId
              ? "border-[var(--accent-terracotta)] scale-105 shadow-[0_0_16px_rgba(232,106,70,0.35)]"
              : "border-[#1A1A1A] dark:border-[#3E4A5C] shadow-[2.5px_2.5px_0px_#1A1A1A] dark:shadow-[2.5px_2.5px_0px_#0A0D12]"
          )}
        >
          <div className="absolute inset-1 rounded-full border border-dashed border-amber-600/30 dark:border-amber-400/25 pointer-events-none" />
          <span className="font-mono text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-[var(--accent-terracotta)]">
            {activeId ? "ACTIVE" : "CORE HUB"}
          </span>
          <span className="font-serif text-[10px] sm:text-xs font-black text-[var(--ink-primary)] leading-tight max-w-[70px] sm:max-w-[85px] mt-0.5 truncate">
            {activeId ? dict.hero.orbitNodes[activeId].title : "StudySync"}
          </span>
          <span className="font-mono text-[7px] sm:text-[8px] text-[var(--ink-muted)] mt-0.5 leading-none truncate max-w-[70px] sm:max-w-[80px]">
            {activeId ? dict.hero.orbitNodes[activeId].tag : dict.hero.orbitNodes.coreSub}
          </span>
        </div>
      </div>

      {/* 6 Balanced Celestial Nodes (Zero edge overflow, zero center collision) */}
      {NODE_DEFS.map((node) => {
        const Icon = node.icon;
        const isHovered = activeId === node.id;
        const nodeData = dict.hero.orbitNodes[node.id];

        const tooltipVertical = node.yPercent > 50 ? "bottom-full mb-2" : "top-full mt-2";
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
                  "bg-[var(--surface-card)] text-[var(--ink-primary)]",
                  "max-w-[95px] sm:max-w-[135px]",
                  node.rotation,
                  isHovered
                    ? "scale-105 rotate-0 border-[var(--accent-terracotta)] shadow-[3px_3px_0px_#E86A46]"
                    : "border-[#1A1A1A] dark:border-[#3E4A5C] shadow-[2px_2px_0px_#1A1A1A] dark:shadow-[2px_2px_0px_#0A0D12]"
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

                <div className="flex flex-col text-start overflow-hidden">
                  <span className="font-mono text-[7px] sm:text-[8.5px] font-black uppercase tracking-wider text-[var(--ink-muted)] leading-tight truncate">
                    {nodeData.tag}
                  </span>
                  <span className="text-[9.5px] sm:text-[11.5px] font-bold leading-tight font-sans truncate">
                    {nodeData.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Smart High-Contrast Telemetry Tooltip */}
            {isHovered && (
              <div
                className={cn(
                  "absolute z-50 w-40 sm:w-44 p-1.5 sm:p-2 rounded-lg text-center pointer-events-none shadow-xl",
                  "bg-[#151B24] text-[#F9F7F1] border-2 border-[var(--accent-terracotta)] shadow-[2.5px_2.5px_0px_#1A1A1A]",
                  "text-[9.5px] sm:text-[10px] font-mono",
                  tooltipVertical,
                  tooltipHorizontal
                )}
              >
                <div className="flex items-center justify-center gap-1 text-[#FCD34D] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-[#34D399] shrink-0" />
                  <span className="truncate">{nodeData.metric}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
