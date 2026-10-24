"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookmarkItem } from "./BookmarkRibbonNav";

interface MobileRibbonItemProps {
  item: BookmarkItem;
  isActive: boolean;
  isArabic: boolean;
  activeLabel: string;
  onSelect: () => void;
}

export function MobileRibbonItem({
  item,
  isActive,
  isArabic,
  activeLabel,
  onSelect,
}: MobileRibbonItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className={cn(
        "group relative flex items-center h-12 sm:h-12.5 transition-all duration-200 cursor-pointer overflow-visible",
        isActive
          ? "-ms-9 sm:-ms-10 pe-2.5 ps-2 z-30 scale-[1.02]"
          : "-ms-7 sm:-ms-8 pe-2.5 ps-2 z-20 opacity-95 hover:opacity-100",
        isActive && (isArabic ? "-rotate-1" : "rotate-1")
      )}
    >
      {/* 1. Clipped Swallowtail Ribbon Layer (Kept separate so it doesn't clip children above) */}
      <div
        style={{
          clipPath: isArabic
            ? "polygon(0% 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 0% 100%)"
            : "polygon(15px 0%, 100% 0%, 100% 100%, 15px 100%, 0% 50%)",
        }}
        className={cn(
          "absolute inset-0 z-0 border-2 border-[#1A1A1A]",
          item.ribbonColor,
          item.darkRibbonColor,
          isArabic ? "shadow-[3px_3px_0px_#1A1A1A]" : "shadow-[-3px_3px_0px_#1A1A1A]"
        )}
      />

      {/* 2. Active Brass Wire Paperclip (Unclipped, looping over the top edge realistically) */}
      {isActive && (
        <div
          className={cn(
            "absolute -top-3.5 w-4 h-7.5 pointer-events-none drop-shadow-md z-30 select-none",
            isArabic ? "end-7 rotate-6" : "start-7 -rotate-6"
          )}
        >
          <svg viewBox="0 0 18 40" fill="none" className="w-full h-full overflow-visible">
            {/* Back wire loop behind the ribbon */}
            <path
              d="M5 14 V5 C5 2.5 13 2.5 13 5 V29 C13 33.5 3 33.5 3 29 V12"
              stroke="#8C6514"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front wire clasp loop sitting on top of the ribbon */}
            <path
              d="M5 5 V22 C5 25 10 25 10 22 V7"
              stroke="#FCD34D"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* 3. Content Layer (sitting at z-10) */}
      <div className={cn("relative z-10 flex items-center w-full h-full", item.textColor)}>
        {/* Swallowtail Tip: Chapter Code / ACT Stamp */}
        <div className="w-7 shrink-0 flex items-center justify-center font-serif text-[11px] font-black">
          {isActive ? (
            <span className="font-mono text-[7.5px] font-black px-1 py-0.5 rounded bg-black/40 border border-white/30 uppercase leading-none">
              {activeLabel}
            </span>
          ) : (
            <span className="opacity-85">{item.romanNumeral}</span>
          )}
        </div>

        {/* Ribbon Title & Icon */}
        <div className="flex items-center gap-2.5 overflow-hidden flex-1 ms-1">
          <div className="w-6 h-6 rounded-md bg-black/25 flex items-center justify-center shrink-0 border border-white/20">
            <Icon className="w-3.5 h-3.5 drop-shadow-xs" />
          </div>

          <div className="flex flex-col text-start overflow-hidden">
            <span className="font-mono text-[8px] font-black uppercase tracking-wider opacity-90 leading-tight">
              {isArabic ? item.arCode : item.enCode}
            </span>
            <span className="font-serif text-xs sm:text-[13px] font-bold truncate leading-tight">
              {isArabic ? item.arTitle : item.enTitle}
            </span>
          </div>
        </div>

        {/* Binding stitch seam against spine */}
        <div className="w-1.5 h-full border-s border-dashed border-white/40 shrink-0 opacity-75" />
      </div>
    </Link>
  );
}
