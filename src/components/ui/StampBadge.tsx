import React from "react";
import { cn } from "@/lib/utils";

interface StampBadgeProps {
  children: React.ReactNode;
  variant?: "approved" | "critical" | "warning" | "safe" | "official";
  className?: string;
}

export function StampBadge({
  children,
  variant = "approved",
  className,
}: StampBadgeProps) {
  const variantStyles = {
    approved: "text-emerald-700 dark:text-emerald-400 border-emerald-600 dark:border-emerald-500 bg-emerald-500/10",
    critical: "text-rose-700 dark:text-rose-400 border-rose-600 dark:border-rose-500 bg-rose-500/10",
    warning: "text-amber-700 dark:text-amber-400 border-amber-600 dark:border-amber-500 bg-amber-500/10",
    safe: "text-blue-700 dark:text-blue-400 border-blue-600 dark:border-blue-500 bg-blue-500/10",
    official: "text-purple-700 dark:text-purple-400 border-purple-600 dark:border-purple-500 bg-purple-500/10",
  };

  return (
    <span
      className={cn(
        "stamp-border text-xs uppercase font-mono tracking-wider select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
