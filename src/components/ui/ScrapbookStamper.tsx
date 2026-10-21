"use client";

import React, { useState } from "react";
import { Stamp, Sparkles, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlacedStamp {
  id: number;
  text: string;
  variant: "approved" | "risk" | "honors" | "spec" | "verified";
  x: number;
  y: number;
  rotate: number;
}

const STAMP_PRESETS = [
  { id: "approved", text: "APPROVED // DEAN", arText: "معتمد // العميد", variant: "approved" as const, color: "text-[#3D5A40] dark:text-[#69A384] border-[#3D5A40]" },
  { id: "honors", text: "★ HIGH HONORS ★", arText: "★ مرتبة الشرف الأولى ★", variant: "honors" as const, color: "text-[#8B7BA8] dark:text-[#A695C4] border-[#8B7BA8]" },
  { id: "verified", text: "100% QR VERIFIED", arText: "حضور مؤكد 100%", variant: "verified" as const, color: "text-[#2B3A4A] dark:text-[#7AA2C7] border-[#2B3A4A]" },
  { id: "risk", text: "EARLY RISK DETECTED", arText: "إنذار أكاديمي مبكر", variant: "risk" as const, color: "text-[#E86A46] border-[#E86A46]" },
];

export function ScrapbookStamper({ isArabic = false }: { isArabic?: boolean }) {
  const [stamps, setStamps] = useState<PlacedStamp[]>([]);
  const [selectedStamp, setSelectedStamp] = useState(STAMP_PRESETS[0]);
  const [stampFeedback, setStampFeedback] = useState<string | null>(null);

  const handleAddStamp = (preset = selectedStamp) => {
    // Generate random offset within bounds
    const newStamp: PlacedStamp = {
      id: Date.now() + Math.random(),
      text: isArabic ? preset.arText : preset.text,
      variant: preset.variant,
      x: Math.floor(Math.random() * 60) + 20, // 20% to 80%
      y: Math.floor(Math.random() * 50) + 25,
      rotate: Math.floor(Math.random() * 24) - 12, // -12deg to +12deg
    };

    setStamps((prev) => [...prev.slice(-6), newStamp]);
    setStampFeedback(preset.id);
    setTimeout(() => setStampFeedback(null), 1200);
  };

  const handleClear = () => {
    setStamps([]);
  };

  return (
    <div className="relative my-6 p-4 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-subtle)] shadow-[3px_3px_0px_#1A1A1A] select-none">
      {/* Tape on top */}
      <div
        className="absolute -top-3 left-8 w-24 h-5.5 bg-[#FDF1CC]/90 dark:bg-[#E5BE54]/60 border-y border-amber-600/30 -rotate-2"
        style={{ clipPath: "polygon(4% 0%, 96% 0%, 100% 50%, 96% 100%, 4% 100%, 0% 50%)" }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Stamp className="w-4 h-4 text-[var(--accent-terracotta)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink-primary)]">
            {isArabic ? "طابعة أختام السجل الأكاديمي (جرب الختم)" : "Interactive Registrar Stamper (Click to Stamp)"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[var(--ink-muted)]">
            {stamps.length} {isArabic ? "أختام موضوعة" : "stamped"}
          </span>
          {stamps.length > 0 && (
            <button
              onClick={handleClear}
              className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isArabic ? "مسح" : "Clear"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Preset Stamp Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {STAMP_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setSelectedStamp(preset);
              handleAddStamp(preset);
            }}
            className={cn(
              "px-2.5 py-1.5 rounded-md border-2 font-mono text-[11px] font-extrabold uppercase tracking-wider transition-all",
              "bg-[var(--surface-card)] hover:scale-105 active:scale-95 shadow-xs cursor-pointer",
              preset.color,
              selectedStamp.id === preset.id && "ring-2 ring-[var(--accent-terracotta)] ring-offset-1"
            )}
          >
            {stampFeedback === preset.id ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" /> {isArabic ? "تم الختم!" : "STAMPED!"}
              </span>
            ) : (
              isArabic ? preset.arText : preset.text
            )}
          </button>
        ))}
      </div>

      {/* Interactive Stamp Canvas Workspace */}
      <div
        onClick={() => handleAddStamp()}
        className="relative h-28 w-full rounded-lg border border-dashed border-stone-400/50 dark:border-stone-600/50 bg-[var(--surface-card)] paper-ruled flex items-center justify-center cursor-pointer overflow-hidden group hover:border-[var(--accent-terracotta)] transition-colors"
      >
        <span className="font-handwriting text-lg text-[var(--ink-muted)] group-hover:text-[var(--accent-terracotta)] transition-colors pointer-events-none">
          ↳ {isArabic ? "اضغط هنا لوضع ختم اعتمادي على السجل!" : "Click anywhere in this box to stamp the registrar sheet!"}
        </span>

        {/* Render stamped items */}
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            style={{
              left: `${stamp.x}%`,
              top: `${stamp.y}%`,
              transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg)`,
            }}
            className={cn(
              "absolute pointer-events-none transition-transform duration-100",
              "px-3 py-1 rounded-sm border-2 font-mono text-xs font-black uppercase tracking-widest",
              stamp.variant === "approved" && "text-[#3D5A40] border-[#3D5A40] bg-emerald-50/50 dark:bg-emerald-950/20",
              stamp.variant === "honors" && "text-[#8B7BA8] border-[#8B7BA8] bg-purple-50/50 dark:bg-purple-950/20",
              stamp.variant === "verified" && "text-[#2B3A4A] border-[#2B3A4A] bg-blue-50/50 dark:bg-blue-950/20",
              stamp.variant === "risk" && "text-[#E86A46] border-[#E86A46] bg-orange-50/50 dark:bg-orange-950/20"
            )}
          >
            {stamp.text}
          </div>
        ))}
      </div>
    </div>
  );
}
