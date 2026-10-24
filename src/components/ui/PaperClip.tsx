"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PaperClipProps {
  color?: "silver" | "brass" | "rose" | "black";
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Authentic metallic wire paperclip with specular highlights & contact shadows.
 * Replaces generic lozenge gradients with physical wire geometry.
 */
export function PaperClip({
  color = "brass",
  className,
  size = "md",
}: PaperClipProps) {
  const palettes = {
    brass: {
      outer: "#8C6514",
      highlight: "#FFE082",
    },
    silver: {
      outer: "#475569",
      highlight: "#F8FAFC",
    },
    rose: {
      outer: "#9F1239",
      highlight: "#FFE4E6",
    },
    black: {
      outer: "#111827",
      highlight: "#6B7280",
    },
  };

  const sizeMap = {
    sm: "w-3.5 h-8",
    md: "w-4.5 h-10",
    lg: "w-6 h-13",
  };

  const p = palettes[color];

  return (
    <div
      className={cn(
        "absolute -top-4 z-30 pointer-events-none select-none drop-shadow-md",
        sizeMap[size],
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Soft cast contact shadow onto paper */}
        <path
          d="M6 16 V5 C6 2 14 2 14 5 V31 C14 36 4 36 4 31 V12"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="3.2"
          strokeLinecap="round"
          className="translate-x-0.5 translate-y-0.5"
        />

        {/* Outer loop that wraps around the paper */}
        <path
          d="M6 16 V5 C6 2 14 2 14 5 V31 C14 36 4 36 4 31 V12"
          stroke={p.outer}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 16 V5 C6 2 14 2 14 5 V31 C14 36 4 36 4 31 V12"
          stroke={p.highlight}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="opacity-75"
        />

        {/* Front inner clasp clamping over top of the sheet */}
        <path
          d="M6 5 V24 C6 27.5 11 27.5 11 24 V7"
          stroke={p.outer}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 5 V24 C6 27.5 11 27.5 11 24 V7"
          stroke={p.highlight}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="opacity-90"
        />
      </svg>
    </div>
  );
}
