import React from "react";
import { cn } from "@/lib/utils";

interface NotebookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "ruled" | "grid" | "plain";
  holePunches?: boolean;
  className?: string;
  badge?: React.ReactNode;
}

export function NotebookCard({
  children,
  variant = "ruled",
  holePunches = true,
  className,
  badge,
  ...props
}: NotebookCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-[var(--paper-card-border)] bg-[var(--paper-card)] p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md",
        variant === "ruled" && "notebook-ruled",
        variant === "grid" && "notebook-grid",
        className
      )}
      {...props}
    >
      {/* Hole punch decorations along margin */}
      {holePunches && (
        <div className="absolute -top-3 end-6 flex gap-2 no-print pointer-events-none">
          <span className="w-3 h-3 rounded-full bg-[var(--paper-bg)] border border-[var(--paper-card-border)] shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-[var(--paper-bg)] border border-[var(--paper-card-border)] shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-[var(--paper-bg)] border border-[var(--paper-card-border)] shadow-inner" />
        </div>
      )}

      {/* Optional top-corner bookmark or badge */}
      {badge && <div className="absolute -top-3 start-6">{badge}</div>}

      {children}
    </div>
  );
}
