"use client";

import React, { useState } from "react";
import { Pin, CheckSquare, Square, Pencil, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tape } from "./Tape";
import { PaperClip } from "./PaperClip";

interface NoteItem {
  id: string;
  enText: string;
  arText: string;
  done: boolean;
}

export function MessyScratchpad({ isArabic = false }: { isArabic?: boolean }) {
  const [rotation, setRotation] = useState<number>(-1);
  const [items, setItems] = useState<NoteItem[]>([
    { id: "1", enText: "Scan CS302 dynamic QR before 10:15 AM", arText: "مسح رمز QR لمادة هياكل البيانات قبل 10:15 ص", done: true },
    { id: "2", enText: "Review AI track elective recommendations", arText: "مراجعة ترشيحات مواد مسار الذكاء الاصطناعي", done: false },
    { id: "3", enText: "Generate diagnostic quiz for OS Midterm", arText: "توليد كويز تدريبي لميدتيرم نظم التشغيل", done: false },
  ]);

  const toggleItem = (id: string) => {
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
      {/* Real taped top with striped pattern */}
      <Tape color="striped" rotation="slight-left" position="top-center" />
      <PaperClip color="silver" className="start-4" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#1A1A1A]/20 pb-2 mb-3">
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#7A5800] dark:text-[#E5BE54]">
          <Pencil className="w-3.5 h-3.5" />
          <span>{isArabic ? "مفكرة الطالب التفاعلية" : "Student Desk Sticky Note"}</span>
        </div>

        <button
          onClick={handleTilt}
          title={isArabic ? "إمالة الورقة" : "Tilt note"}
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
            className="flex items-start gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            {item.done ? (
              <CheckSquare className="w-4 h-4 text-[#3D5A40] dark:text-[#69A384] shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-stone-600 dark:text-stone-400 shrink-0 mt-0.5" />
            )}
            <span
              className={cn(
                "text-xs sm:text-sm font-handwriting text-lg leading-tight transition-all",
                item.done && "line-through opacity-60 text-stone-600 dark:text-stone-400"
              )}
            >
              {isArabic ? item.arText : item.enText}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom handwritten footnote */}
      <div className="mt-3 pt-2 border-t border-[#1A1A1A]/10 text-end">
        <span className="font-handwriting text-sm text-[var(--accent-terracotta)]">
          {isArabic ? "↳ انقر على الملاحظة للتعليم عليها أو إمالتها!" : "↳ Click any item to check off, or tilt the note!"}
        </span>
      </div>
    </div>
  );
}
