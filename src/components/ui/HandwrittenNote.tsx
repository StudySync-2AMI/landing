import React from "react";
import { cn } from "@/lib/utils";

interface HandwrittenNoteProps {
  children: React.ReactNode;
  color?: "blue" | "pencil" | "red";
  rotation?: "left" | "right" | "none";
  className?: string;
}

export function HandwrittenNote({
  children,
  color = "blue",
  rotation = "left",
  className,
}: HandwrittenNoteProps) {
  const inkColors = {
    blue: "text-[#1d4ed8] dark:text-[#60a5fa]",
    pencil: "text-[#475569] dark:text-[#94a3b8]",
    red: "text-[#b91c1c] dark:text-[#f87171]",
  };

  const rotations = {
    left: "-rotate-2",
    right: "rotate-2",
    none: "rotate-0",
  };

  return (
    <span
      className={cn(
        "font-[family-name:var(--font-handwritten)] text-lg sm:text-xl tracking-wide select-none inline-flex items-center gap-1.5",
        inkColors[color],
        rotations[rotation],
        className
      )}
    >
      {children}
    </span>
  );
}
