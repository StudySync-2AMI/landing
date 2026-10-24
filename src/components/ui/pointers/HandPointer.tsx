"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BasePointerProps, colorMap, sizeMap, getPointerSvgClass } from "./types";

/**
 * HandPointer: Historical printer's & scholar's manicula (pointing hand ☞ / ☜).
 * Automatically flips in Arabic (RTL) so the index finger points into Arabic flow.
 */
export function HandPointer({
  size = "md",
  color = "terracotta",
  children,
  className,
  ...props
}: BasePointerProps) {
  const svg = (
    <svg viewBox="0 0 24 24" fill="none" className={getPointerSvgClass(size)}>
      <path
        d="M2 13.5 C 2 11, 4 10.5, 6 11 L 11 11 L 11 6.5 C 11 5, 12.5 4, 13.5 5 C 14.5 6, 14.5 7.5, 14.5 9.5 L 14.5 11.5 L 17 11.5 C 18.5 11.5, 19.5 12.5, 19.5 14 C 19.5 15, 18.5 16, 17 16 L 16 16 C 17.5 16, 18.5 17, 18.5 18 C 18.5 19.5, 17 20.5, 15 20.5 L 8 20.5 C 4.5 20.5, 2 17.5, 2 13.5 Z M 11 8.5 L 21 8.5 C 22 8.5, 22.5 9.5, 21.5 10.5 L 18 13.5"
        stroke="currentColor"
        strokeWidth="1.8"
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
