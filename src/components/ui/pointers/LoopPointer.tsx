"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BasePointerProps, colorMap, sizeMap, getPointerSvgClass } from "./types";

/**
 * LoopPointer: Authentic editorial margin loop-de-loop note pointer.
 * Automatically flips in Arabic (RTL) so it sweeps and points in reading direction.
 */
export function LoopPointer({
  size = "md",
  color = "terracotta",
  children,
  className,
  ...props
}: BasePointerProps) {
  const svg = (
    <svg viewBox="0 0 24 24" fill="none" className={getPointerSvgClass(size)}>
      <path
        d="M4 4 C 8 1, 13 1, 13 5.5 C 13 10, 6.5 10, 6.5 14.5 C 6.5 18, 10 19.5, 19 19.5 M 15 15.5 l 4.5 4 l -4.5 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!children) {
    return (
      <span className={cn("inline-flex items-center", colorMap[color], className)} {...props}>
        {svg}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-handwriting inline-flex items-center gap-1.5 leading-none select-none",
        colorMap[color],
        sizeMap[size].text,
        className
      )}
      {...props}
    >
      {svg}
      <span className="font-handwriting">{children}</span>
    </span>
  );
}
