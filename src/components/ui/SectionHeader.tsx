import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function SectionHeader({
  number,
  title,
  subtitle,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div id={id} className={cn("mb-8 scroll-mt-28", className)}>
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-mono font-black rounded-md bg-[#FDF1CC] text-[#1A1A1A] dark:bg-[#E5BE54]/25 dark:text-[#FFEBA8] border-2 border-[var(--border-paper)] shadow-xs">
          SEC. {number}
        </span>
        <div className="h-0.5 flex-1 bg-[var(--border-paper)]/20" />
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-[var(--ink-secondary)] font-medium leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
