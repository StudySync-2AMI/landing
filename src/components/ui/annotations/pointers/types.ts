import React from "react";
import { cn } from "@/lib/utils";

export type PointerVariant = "corner" | "sketch" | "loop" | "hand" | "curve" | "bracket";
export type PointerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type PointerColor = "terracotta" | "amber" | "oxford" | "sage" | "ink" | "currentColor";

export interface BasePointerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: PointerSize;
  color?: PointerColor;
  children?: React.ReactNode;
  className?: string;
}

export const sizeMap: Record<PointerSize, { svg: string; text: string }> = {
  xs: { svg: "w-3 h-3", text: "text-xs" },
  sm: { svg: "w-3.5 h-3.5", text: "text-sm" },
  md: { svg: "w-4 h-4", text: "text-base sm:text-lg" },
  lg: { svg: "w-5 h-5", text: "text-xl sm:text-2xl" },
  xl: { svg: "w-6 h-6", text: "text-2xl sm:text-3xl" },
};

export const colorMap: Record<PointerColor, string> = {
  terracotta: "text-[var(--accent-terracotta)] stroke-[var(--accent-terracotta)] fill-[var(--accent-terracotta)]",
  amber: "text-amber-600 dark:text-amber-400 stroke-amber-600 dark:stroke-amber-400 fill-amber-600",
  oxford: "text-[var(--accent-oxford)] stroke-[var(--accent-oxford)] fill-[var(--accent-oxford)]",
  sage: "text-[var(--accent-sage)] stroke-[var(--accent-sage)] fill-[var(--accent-sage)]",
  ink: "text-[var(--ink-primary)] stroke-[var(--ink-primary)] fill-[var(--ink-primary)]",
  currentColor: "text-currentColor stroke-currentColor fill-currentColor",
};

export function getPointerSvgClass(size: PointerSize, extraClass?: string) {
  return cn(
    "inline-block shrink-0 align-middle pointer-events-none select-none transition-transform",
    "rtl:-scale-x-100 rtl:origin-center",
    sizeMap[size].svg,
    extraClass
  );
}
