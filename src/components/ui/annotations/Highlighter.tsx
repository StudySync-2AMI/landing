import React from "react";
import { cn } from "@/lib/utils";

export interface HighlighterProps {
  children: React.ReactNode;
  color?: "yellow" | "mint" | "peach" | "terracotta" | "purple";
  rotate?: "none" | "left" | "right";
  className?: string;
}

export function Highlighter({
  children,
  color = "yellow",
  rotate = "none",
  className,
}: HighlighterProps) {
  const markerColors = {
    yellow: "bg-[#FEF3C7] dark:bg-[#E5BE54]/30 text-[var(--ink-primary)] dark:text-[#FDFBF7]",
    mint: "bg-[#D1FAE5] dark:bg-[#69A384]/30 text-[var(--ink-primary)] dark:text-[#FDFBF7]",
    peach: "bg-[#FFEDD5] dark:bg-[#E29373]/30 text-[var(--ink-primary)] dark:text-[#FDFBF7]",
    terracotta: "bg-[#FEE2E2] dark:bg-[#E86A46]/30 text-[var(--ink-primary)] dark:text-[#FDFBF7]",
    purple: "bg-[#EDE9FE] dark:bg-[#8B7BA8]/30 text-[var(--ink-primary)] dark:text-[#FDFBF7]",
  };

  const rotations = {
    none: "rotate-0",
    left: "-rotate-1",
    right: "rotate-1",
  };

  return (
    <span
      className={cn(
        "inline-block px-1.5 py-0.5 rounded-sm font-semibold transition-transform duration-200",
        "box-decoration-clone",
        markerColors[color],
        rotations[rotate],
        className
      )}
      style={{ boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}
    >
      {children}
    </span>
  );
}

export const Highlight = Highlighter;
