"use client";

import React, { useState } from "react";
import { Stamp, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PlacedStamp {
  id: number;
  text: string;
  variant: "approved" | "risk" | "honors" | "verified";
  x: number;
  y: number;
  rotate: number;
}

export function ScrapbookStamper() {
  const { dict } = useLanguage();
  const desk = dict.interactiveDesk;
  const presets = desk.stampPresets;

  const [stamps, setStamps] = useState<PlacedStamp[]>([]);
  const [selectedId, setSelectedId] = useState<string>("approved");

  const colorMap: Record<string, string> = {
    approved: "text-[#3D5A40] dark:text-[#69A384] border-[#3D5A40]",
    honors: "text-[#8B7BA8] dark:text-[#A695C4] border-[#8B7BA8]",
    verified: "text-[#2B3A4A] dark:text-[#7AA2C7] border-[#2B3A4A]",
    risk: "text-[#E86A46] border-[#E86A46]",
  };

  const handleAddStamp = (presetId = selectedId) => {
    const preset = presets.find((p: { id: string; text: string }) => p.id === presetId) || presets[0];
    const newStamp: PlacedStamp = {
      id: Date.now() + Math.random(),
      text: preset.text,
      variant: preset.id as PlacedStamp["variant"],
      x: Math.floor(Math.random() * 60) + 20,
      y: Math.floor(Math.random() * 50) + 25,
      rotate: Math.floor(Math.random() * 24) - 12,
    };

    setStamps((prev) => [...prev.slice(-6), newStamp]);
  };

  const handleClear = () => {
    setStamps([]);
  };

  return (
    <div className="relative my-6 p-4 rounded-xl border-2 border-[var(--border-paper)] bg-[var(--surface-subtle)] shadow-[3px_3px_0px_#1A1A1A] select-none">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Stamp className="w-4 h-4 text-[var(--accent-terracotta)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink-primary)]">
            {desk.stamperTitle}
          </span>
        </div>

        <button
          onClick={handleClear}
          disabled={stamps.length === 0}
          className="inline-flex items-center gap-1 text-xs font-mono text-[var(--ink-muted)] hover:text-rose-500 disabled:opacity-30 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{desk.stamperClear}</span>
        </button>
      </div>

      {/* Preset Stamp Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {presets.map((p: { id: string; text: string }) => {
          const isSelected = p.id === selectedId;
          const stampColors = colorMap[p.id] || "text-[#1A1A1A] border-[#1A1A1A]";

          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedId(p.id);
                handleAddStamp(p.id);
              }}
              className={`p-2.5 rounded-lg border-2 font-mono text-xs font-bold tracking-wider transition-transform cursor-pointer text-center ${stampColors} ${
                isSelected
                  ? "bg-white/80 dark:bg-black/30 scale-105 shadow-[2px_2px_0px_currentColor]"
                  : "bg-white/30 dark:bg-black/10 hover:bg-white/60 opacity-80"
              }`}
            >
              {p.text}
            </button>
          );
        })}
      </div>

      {/* Archival Surface Area for Placed Stamps */}
      <div
        onClick={() => handleAddStamp(selectedId)}
        className="relative h-44 rounded-lg border-2 border-dashed border-[var(--border-paper)] bg-[var(--surface-card)] paper-grid cursor-crosshair overflow-hidden flex items-center justify-center"
      >
        {stamps.length === 0 ? (
          <p className="font-handwriting text-lg text-[var(--ink-muted)] pointer-events-none select-none">
            {desk.stamperHelper}
          </p>
        ) : null}

        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            style={{
              position: "absolute",
              left: `${stamp.x}%`,
              top: `${stamp.y}%`,
              transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg)`,
            }}
            className={`px-3 py-1.5 rounded border-2 border-dashed font-mono font-black text-xs uppercase tracking-widest pointer-events-none select-none ${
              colorMap[stamp.variant] || "text-[#1A1A1A] border-[#1A1A1A]"
            }`}
          >
            {stamp.text}
          </div>
        ))}
      </div>
    </div>
  );
}
