"use client";

import React, { useState } from "react";
import { CheckSquare, Square, Pencil, RotateCw } from "lucide-react";
import { Tape } from "@/ui/Tape";
import { PaperClip } from "@/ui/PaperClip";
import { useLanguage } from "@/context/LanguageContext";

interface NoteItem {
  id: number;
  text: string;
  done: boolean;
}

export function MessyScratchpad() {
  const { dict } = useLanguage();
  const desk = dict.interactiveDesk;
  const [rotation, setRotation] = useState<number>(-1);
  const [items, setItems] = useState<NoteItem[]>(() =>
    desk.notes.map((n: { text: string; done: boolean }, idx: number) => ({
      id: idx,
      text: n.text,
      done: n.done,
    }))
  );

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleTilt = () => {
    setRotation((r) => (r === -1 ? 2 : r === 2 ? -2 : -1));
  };

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className="relative p-5 sm:p-6 rounded-xl border-2 border-[#1A1A1A] bg-[#FDF1CC] dark:bg-[#2D2817] text-[#1A1A1A] dark:text-[#F9F7F1] shadow-[4px_4px_0px_#1A1A1A] dark:shadow-xl transition-transform duration-200 select-none group"
    >
      <Tape color="striped" rotation="slight-left" position="top-center" />
      <PaperClip color="silver" className="start-4" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#1A1A1A]/20 pb-2 mb-3">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#7A5800] dark:text-[#E5BE54]">
          <Pencil className="w-3.5 h-3.5" />
          <span>{desk.scratchpadTitle}</span>
        </div>

        <button
          onClick={handleTilt}
          title={desk.scratchpadTilt}
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-xs font-mono flex items-center gap-1 cursor-pointer"
        >
          <RotateCw className="w-3 h-3" />
        </button>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="flex items-start gap-2.5 p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-xs sm:text-sm font-sans"
          >
            {item.done ? (
              <CheckSquare className="w-4 h-4 text-[#3D5A40] shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            )}
            <span
              className={`leading-relaxed ${
                item.done ? "line-through opacity-60 text-stone-600 dark:text-stone-400" : "font-medium"
              }`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
