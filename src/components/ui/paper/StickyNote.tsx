import React from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: React.ReactNode;
  color?: "yellow" | "mint" | "peach" | "lavender" | "cyan";
  rotation?: "left" | "right" | "none";
  tape?: boolean;
  className?: string;
  pin?: boolean;
  dir?: string;
}

export function StickyNote({
  children,
  color = "yellow",
  rotation = "left",
  tape = true,
  className,
  pin = false,
  dir,
}: StickyNoteProps) {
  const colorStyles = {
    yellow: "bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100",
    mint: "bg-emerald-100 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-100",
    peach: "bg-orange-100 dark:bg-orange-950/70 border-orange-300 dark:border-orange-700/60 text-orange-950 dark:text-orange-100",
    lavender: "bg-purple-100 dark:bg-purple-950/70 border-purple-300 dark:border-purple-700/60 text-purple-950 dark:text-purple-100",
    cyan: "bg-sky-100 dark:bg-sky-950/70 border-sky-300 dark:border-sky-700/60 text-sky-950 dark:text-sky-100",
  };

  const rotationStyles = {
    left: "-rotate-1 hover:rotate-0",
    right: "rotate-1 hover:rotate-0",
    none: "",
  };

  return (
    <div
      dir={dir}
      className={cn(
        "relative rounded-lg p-5 border shadow-md transition-transform duration-200",
        colorStyles[color],
        rotationStyles[rotation],
        className
      )}
    >
      {/* Washi tape at top */}
      {tape && <div className="washi-tape" />}

      {/* Push pin icon */}
      {pin && (
        <div className="absolute -top-3 end-3 w-5 h-5 rounded-full bg-red-500 border-2 border-white dark:border-slate-800 shadow-md flex items-center justify-center text-[10px] text-white font-bold">
          📌
        </div>
      )}

      {children}
    </div>
  );
}
