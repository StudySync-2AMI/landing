import React from "react";
import { cn } from "@/lib/utils";

interface SpiralSpineProps {
  count?: number;
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function SpiralSpine({
  count = 14,
  direction = "horizontal",
  className,
}: SpiralSpineProps) {
  const rings = Array.from({ length: count });

  if (direction === "vertical") {
    return (
      <div className={cn("flex flex-col items-center justify-between py-4 select-none pointer-events-none", className)}>
        {rings.map((_, i) => (
          <div key={i} className="relative flex items-center justify-center my-1.5">
            {/* Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--bg-paper)] border border-[var(--border-stone-strong)] shadow-inner" />
            {/* Metal Ring Coil */}
            <div className="absolute w-7 h-2.5 rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 dark:from-slate-700 dark:via-slate-400 dark:to-slate-800 shadow-sm transform -rotate-12" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full flex items-center justify-around px-4 select-none pointer-events-none overflow-hidden", className)}>
      {rings.map((_, i) => (
        <div key={i} className="relative flex flex-col items-center justify-center mx-1">
          {/* Metal Ring Coil */}
          <div className="w-3 h-7 rounded-full bg-gradient-to-b from-slate-400 via-slate-100 to-slate-500 dark:from-slate-700 dark:via-slate-300 dark:to-slate-800 shadow-md transform -rotate-6 z-10" />
          {/* Punch Hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-[var(--bg-paper)] border border-[var(--border-stone-strong)] shadow-inner -mt-2" />
        </div>
      ))}
    </div>
  );
}
