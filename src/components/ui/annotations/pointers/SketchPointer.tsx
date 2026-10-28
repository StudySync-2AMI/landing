"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BasePointerProps, colorMap, sizeMap, getPointerSvgClass } from "./types";

/**
 * SketchPointer: Hand-drawn sketchy horizontal arrow with organic waviness (replaces → / ←).
 * Automatically flips in Arabic (RTL) so it points forward in the reading direction.
 */
export function SketchPointer({
  size = "md",
  color = "terracotta",
  children,
  className,
  ...props
}: BasePointerProps) {
  const svg = (
    <svg viewBox="0 0 24 24" fill="none" className={getPointerSvgClass(size)}>
      <path
        d="M3 12.5 C 7 11.2, 13 11.8, 20 12 M 15 6.5 C 17 8.8, 19 10.8, 20.5 12 C 19 13.2, 17 15.2, 15.5 17.5"
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
