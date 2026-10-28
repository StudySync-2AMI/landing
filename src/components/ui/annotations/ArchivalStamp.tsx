import React from "react";
import { cn } from "@/lib/utils";

interface ArchivalStampProps {
  children: React.ReactNode;
  variant?: "terracotta" | "oxford" | "sage" | "amber" | "neutral";
  className?: string;
}

export function ArchivalStamp({
  children,
  variant = "oxford",
  className,
}: ArchivalStampProps) {
  const styles = {
    terracotta: "text-[var(--accent-terracotta)] border-[var(--accent-terracotta)]/40 bg-[var(--accent-terracotta)]/5",
    oxford: "text-[var(--accent-oxford)] border-[var(--accent-oxford)]/40 bg-[var(--accent-oxford)]/5",
    sage: "text-[var(--accent-sage)] border-[var(--accent-sage)]/40 bg-[var(--accent-sage)]/5",
    amber: "text-[var(--accent-amber)] border-[var(--accent-amber)]/40 bg-[var(--accent-amber)]/5",
    neutral: "text-[var(--ink-secondary)] border-[var(--border-stone-strong)] bg-[var(--surface-subtle)]",
  };

  return (
    <span className={cn("archival-stamp font-medium", styles[variant], className)}>
      {children}
    </span>
  );
}
