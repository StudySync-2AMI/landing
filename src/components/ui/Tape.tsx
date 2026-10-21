import React from "react";
import { cn } from "@/lib/utils";

export interface TapeProps {
  color?: "yellow" | "mint" | "peach" | "striped" | "parchment";
  rotation?: "left" | "right" | "straight" | "slight-left" | "slight-right";
  position?: "top-center" | "top-left" | "top-right" | "corner-left" | "corner-right";
  className?: string;
}

export function Tape({
  color = "yellow",
  rotation = "slight-left",
  position = "top-center",
  className,
}: TapeProps) {
  const colorStyles = {
    yellow: "bg-[#FDF1CC]/80 dark:bg-[#E5BE54]/50 border-y border-amber-500/25",
    mint: "bg-[#D1E8D1]/80 dark:bg-[#69A384]/45 border-y border-emerald-600/25",
    peach: "bg-[#FAD4C0]/85 dark:bg-[#E29373]/50 border-y border-orange-500/25",
    striped:
      "bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.08),rgba(0,0,0,0.08)_5px,transparent_5px,transparent_10px)] bg-[#FDF1CC]/90 dark:bg-[#E5BE54]/60 border-y border-amber-600/30",
    parchment: "bg-[#EDE6D4]/80 dark:bg-[#343C47]/80 border-y border-black/15 dark:border-white/15",
  };

  const rotations = {
    left: "-rotate-3",
    right: "rotate-3",
    "slight-left": "-rotate-1",
    "slight-right": "rotate-1",
    straight: "rotate-0",
  };

  const positions = {
    "top-center": "-top-3 left-1/2 -translate-x-1/2",
    "top-left": "-top-3 left-6",
    "top-right": "-top-3 right-6",
    "corner-left": "-top-2.5 -left-4 -rotate-45",
    "corner-right": "-top-2.5 -right-4 rotate-45",
  };

  return (
    <div
      className={cn(
        "absolute w-24 sm:w-28 h-6 z-20 backdrop-blur-xs shadow-xs pointer-events-none select-none",
        colorStyles[color],
        rotations[rotation],
        positions[position],
        className
      )}
      style={{
        clipPath: "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
      }}
      aria-hidden="true"
    />
  );
}
