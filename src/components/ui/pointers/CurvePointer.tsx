"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BasePointerProps, colorMap, sizeMap, getPointerSvgClass } from "./types";

/**
 * CurvePointer: Hand-sketched upward swoop margin pointer (⤴).
 * Automatically flips in Arabic (RTL) so it sweeps upward and points in direction.
 */
export function CurvePointer({
  size = "md",
  color = "terracotta",
  children,
  className,
  ...props
}: BasePointerProps) {
  const svg = (
    <svg viewBox="0 0 24 24" fill="none" className={getPointerSvgClass(size)}>
      <path
        d="M4 19 C 5 12, 10 6.5, 20 6.5 M 14 1.5 L 20.5 6.5 L 14 11.5"
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
