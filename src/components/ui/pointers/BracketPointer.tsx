"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BasePointerProps, colorMap, sizeMap, getPointerSvgClass } from "./types";

/**
 * BracketPointer: Archival margin bracket callout with pointer.
 * Automatically flips in Arabic (RTL) so bracket embraces the margin and points into text.
 */
export function BracketPointer({
  size = "md",
  color = "terracotta",
  children,
  className,
  ...props
}: BasePointerProps) {
  const svg = (
    <svg viewBox="0 0 24 24" fill="none" className={getPointerSvgClass(size)}>
      <path
        d="M5 3 H 2.5 V 21 H 5 M 2.5 12 H 19.5 M 14.5 7.5 L 20 12 L 14.5 16.5"
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
