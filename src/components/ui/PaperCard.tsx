import React from "react";
import { cn } from "@/lib/utils";

export interface PaperCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "plain" | "ruled" | "grid";
  tilt?: "none" | "left" | "right" | "slight-left" | "slight-right";
  shadow?: "none" | "scrapbook" | "scrapbook-lg" | "soft";
  subtle?: boolean;
  className?: string;
}

export function PaperCard({
  children,
  variant = "plain",
  tilt = "none",
  shadow = "scrapbook",
  subtle = false,
  className,
  ...props
}: PaperCardProps) {
  const tilts = {
    none: "rotate-0",
    "slight-left": "-rotate-[0.5deg] hover:rotate-0",
    "slight-right": "rotate-[0.5deg] hover:rotate-0",
    left: "-rotate-1 hover:rotate-0",
    right: "rotate-1 hover:rotate-0",
  };

  const shadowStyles = {
    none: "",
    scrapbook: "scrapbook-card",
    "scrapbook-lg":
      "bg-[var(--surface-card)] border-2 border-[var(--border-paper)] shadow-[5px_5px_0px_var(--border-paper)] dark:shadow-xl dark:border-white/15",
    soft: "bg-[var(--surface-card)] border border-[var(--border-subtle)] shadow-md",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl p-6 transition-all duration-200",
        shadow === "scrapbook" ? "scrapbook-card" : shadowStyles[shadow],
        subtle && "bg-[var(--surface-subtle)]",
        variant === "ruled" && "paper-ruled",
        variant === "grid" && "paper-grid",
        tilts[tilt],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
