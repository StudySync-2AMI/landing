import React from "react";
import { cn } from "@/lib/utils";

interface BookmarkPaperclipProps {
  color?: "brass" | "silver" | "rose";
  className?: string;
  isHovered?: boolean;
  isSelected?: boolean;
}

export function BookmarkPaperclip({
  color = "brass",
  className,
  isHovered = false,
  isSelected = false,
}: BookmarkPaperclipProps) {
  // Gradients for realistic metallic wire reflection
  const gradientColors = {
    brass: {
      front: ["#FFF7D1", "#D4A745", "#946B18"],
      back: ["#B88D33", "#7A5812", "#4D3608"],
    },
    silver: {
      front: ["#FFFFFF", "#CBD5E1", "#64748B"],
      back: ["#94A3B8", "#475569", "#1E293B"],
    },
    rose: {
      front: ["#FFE4E6", "#FDA4AF", "#E11D48"],
      back: ["#BE123C", "#881337", "#4C0519"],
    },
  };

  const selectedPalette = gradientColors[color];

  return (
    <div
      className={cn(
        "absolute -top-3.5 left-1/2 -translate-x-1/2 w-4 sm:w-4.5 h-9 pointer-events-none transition-transform duration-300 ease-out select-none",
        isSelected && "scale-110 -rotate-3",
        isHovered && !isSelected && "rotate-3",
        className
      )}
    >
      {/* 1. BACK WIRE LAYER (Rendered behind the ribbon, z-0) */}
      <svg
        viewBox="0 0 18 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full z-0 overflow-visible"
      >
        <defs>
          <linearGradient id={`clipBack-${color}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={selectedPalette.back[0]} />
            <stop offset="50%" stopColor={selectedPalette.back[1]} />
            <stop offset="100%" stopColor={selectedPalette.back[2]} />
          </linearGradient>
        </defs>

        {/* Outer loop that goes behind the ribbon and arches over the top */}
        <path
          d="M5 14 V5 C5 2.5 13 2.5 13 5 V29 C13 33.5 3 33.5 3 29 V12"
          stroke={`url(#clipBack-${color})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-xs"
        />
      </svg>

      {/* 2. FRONT WIRE LAYER (Rendered on top of the ribbon, z-20) */}
      {/* The ribbon body sits in between z-0 and z-20 so half of the clip is realistically covered! */}
      <svg
        viewBox="0 0 18 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full z-20 overflow-visible"
      >
        <defs>
          <linearGradient id={`clipFront-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={selectedPalette.front[0]} />
            <stop offset="45%" stopColor={selectedPalette.front[1]} />
            <stop offset="100%" stopColor={selectedPalette.front[2]} />
          </linearGradient>
        </defs>

        {/* The inner front clasp loop sitting on top of the ribbon */}
        <path
          d="M5 5 V22 C5 25 10 25 10 22 V7"
          stroke={`url(#clipFront-${color})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  );
}
