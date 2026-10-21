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
    yellow: "bg-[#FDF1CC] dark:bg-[#E5BE54]/25 text-[#1A1A1A] dark:text-[#F9F7F1]",
    mint: "bg-[#D1E8D1] dark:bg-[#69A384]/25 text-[#1A1A1A] dark:text-[#F9F7F1]",
    peach: "bg-[#FAD4C0] dark:bg-[#E29373]/25 text-[#1A1A1A] dark:text-[#F9F7F1]",
    terracotta: "bg-[#FAD4C0] dark:bg-[#E86A46]/25 text-[#1A1A1A] dark:text-[#F9F7F1]",
    purple: "bg-[#E6E0F0] dark:bg-[#8B7BA8]/25 text-[#1A1A1A] dark:text-[#F9F7F1]",
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
