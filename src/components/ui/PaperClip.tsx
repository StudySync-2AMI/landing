import React from "react";
import { cn } from "@/lib/utils";

interface PaperClipProps {
  color?: "silver" | "brass" | "rose";
  className?: string;
}

export function PaperClip({ color = "brass", className }: PaperClipProps) {
  const gradients = {
    brass: "from-amber-300 via-amber-100 to-amber-500 border-amber-600/70 dark:from-amber-600 dark:via-amber-400 dark:to-amber-700",
    silver: "from-slate-300 via-slate-100 to-slate-400 border-slate-500 dark:from-slate-600 dark:via-slate-300 dark:to-slate-700",
    rose: "from-rose-300 via-rose-100 to-rose-400 border-rose-500 dark:from-rose-600 dark:via-rose-300 dark:to-rose-700",
  };

  return (
    <div
      className={cn(
        "absolute -top-3.5 z-20 w-3.5 h-9 rounded-full border-2 bg-gradient-to-b shadow-md pointer-events-none select-none",
        gradients[color],
        className
      )}
    >
      {/* Inner loop of clip */}
      <div className="absolute top-1.5 inset-x-0.5 bottom-1 rounded-full border border-black/20 dark:border-white/20" />
    </div>
  );
}
