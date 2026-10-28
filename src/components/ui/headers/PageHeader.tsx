import React from "react";
import { cn } from "@/lib/utils";
import { ArchivalStamp } from "../annotations/ArchivalStamp";
import { Tape } from "../fasteners/Tape";
import { SketchUnderline } from "../annotations/SketchUnderline";

interface PageHeaderProps {
  code: string;
  title: string;
  subtitle?: string;
  stamp?: string;
  className?: string;
}

export function PageHeader({
  code,
  title,
  subtitle,
  stamp,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("relative pb-8 mb-10 border-b-2 border-[var(--border-paper)]/30", className)}>
      <Tape color="striped" rotation="slight-left" position="top-right" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent-terracotta)]">
          DOC. REF // {code}
        </span>
        {stamp && <ArchivalStamp variant="terracotta">{stamp}</ArchivalStamp>}
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink-primary)] leading-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed max-w-4xl font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
