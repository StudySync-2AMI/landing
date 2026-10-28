"use client";

import React from "react";
import { cn } from "@/lib/utils";

type PinColor = "brass" | "crimson" | "silver";
type PinSize = "sm" | "md" | "lg";

/**
 * How the pin should behave inside right-to-left layouts.
 * - "auto"   → mirrors inside any [dir="rtl"] ancestor (Tailwind `rtl:` variant)
 * - "never"  → always draws the needle pointing bottom-right
 * - "always" → always draws the needle pointing bottom-left
 */
type PinMirror = "auto" | "never" | "always";

interface PushPinProps {
  color?: PinColor;
  size?: PinSize;
  className?: string;
  inline?: boolean;
  mirror?: PinMirror;
}

const SIZE_MAP: Record<PinSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-[18px] h-[18px]",
  lg: "w-6 h-6",
};

const PALETTES: Record<
  PinColor,
  {
    core: string;
    mid: string;
    rim: string;
    outer: string;
    deep: string;
    glint: string;
  }
> = {
  brass: {
    core: "#FFF3C4",
    mid: "#D4A745",
    rim: "#F6DE9C",
    outer: "#6B4A10",
    deep: "#382505",
    glint: "#FFFEF6",
  },
  crimson: {
    core: "#FFD9D1",
    mid: "#C0362A",
    rim: "#F0957F",
    outer: "#6E150E",
    deep: "#320603",
    glint: "#FFF5F1",
  },
  silver: {
    core: "#FFFFFF",
    mid: "#A9B6C6",
    rim: "#E5ECF4",
    outer: "#3F4B5C",
    deep: "#19212F",
    glint: "#FFFFFF",
  },
};

/**
 * A desk pushpin drawn as a small still-life: a wide domed head seen
 * slightly off-axis, sitting almost flush against the paper, with a
 * short tapered steel needle emerging from underneath it.
 *
 * Deliberately *not* a generic 📌 emoji and *not* a plain dot: the
 * silhouette is a circle plus a short needle stub, which stays legible
 * down to 12px.
 */
export function PushPin({
  color = "brass",
  size = "md",
  className,
  inline = false,
  mirror = "auto",
}: PushPinProps) {
  const p = PALETTES[color];

  // Unique per-instance prefix so several pins never share gradient ids.
  const rawId = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const gid = (s: string) => `${rawId}-${s}`;

  const mirrorClass =
    mirror === "always"
      ? "[transform:scaleX(-1)]"
      : mirror === "never"
        ? ""
        : "rtl:[transform:scaleX(-1)]";

  const svg = (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "overflow-visible shrink-0",
        SIZE_MAP[size],
        mirrorClass,
      )}
    >
      <defs>
        {/* Domed head, lit from the upper-left */}
        <radialGradient id={gid("dome")} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor={p.core} />
          <stop offset="42%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.outer} />
        </radialGradient>

        {/* Beveled rim, lit across its diagonal */}
        <linearGradient id={gid("rim")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.rim} />
          <stop offset="45%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.deep} />
        </linearGradient>

        {/* Steel needle. The axis runs ACROSS the shaft so every point
            along its length picks up the same cylindrical shading. */}
        <linearGradient
          id={gid("steel")}
          gradientUnits="userSpaceOnUse"
          x1="19.6"
          y1="16.4"
          x2="16.4"
          y2="19.6"
        >
          <stop offset="0%" stopColor="#F4F8FC" />
          <stop offset="22%" stopColor="#FFFFFF" />
          <stop offset="48%" stopColor="#B4BECB" />
          <stop offset="76%" stopColor="#6C7683" />
          <stop offset="100%" stopColor="#39414C" />
        </linearGradient>

        {/* Ambient contact shadow — tight, because the pin sits flat */}
        <radialGradient id={gid("contact")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0D0A07" stopOpacity="0.38" />
          <stop offset="60%" stopColor="#0D0A07" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0D0A07" stopOpacity="0" />
        </radialGradient>

        <filter
          id={gid("soft")}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
        <filter
          id={gid("haze")}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>

      {/* 1 — contact shadow hugging the head */}
      <ellipse
        cx="14.2"
        cy="14.2"
        rx="10.8"
        ry="10.2"
        fill={`url(#${gid("contact")})`}
      />

      {/* 2 — faint shadow trailing the needle */}
      <line
        x1="19.5"
        y1="20"
        x2="27.5"
        y2="28"
        stroke="#0D0A07"
        strokeOpacity="0.16"
        strokeWidth="2.2"
        strokeLinecap="round"
        filter={`url(#${gid("soft")})`}
      />

      {/* 3 — the needle: a short tapered shaft from under the head */}
      <path
        d="M17.1 18.9 L18.9 17.1 L26 26 Z"
        fill={`url(#${gid("steel")})`}
      />
      <circle cx="25.1" cy="24.3" r="0.45" fill="#FFFFFF" fillOpacity="0.85" />

      {/* 4 — rim */}
      <circle cx="12.5" cy="12.5" r="10" fill={`url(#${gid("rim")})`} />
      <circle
        cx="12.5"
        cy="12.5"
        r="10"
        stroke={p.deep}
        strokeWidth="0.5"
        strokeOpacity="0.5"
      />

      {/* 5 — dome */}
      <circle cx="12.5" cy="12.5" r="8.5" fill={`url(#${gid("dome")})`} />

      {/* 6 — dome sinks into the rim on the shadowed side */}
      <path
        d="M18.51 18.51 A 8.5 8.5 0 0 1 6.49 18.51"
        fill="none"
        stroke={p.deep}
        strokeWidth="1.5"
        strokeOpacity="0.32"
        strokeLinecap="round"
        filter={`url(#${gid("soft")})`}
      />

      {/* 7 — rim catch-light on the lit side */}
      <path
        d="M3.23 10.02 A 9.6 9.6 0 0 1 14.98 3.23"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.55"
        strokeWidth="0.9"
        strokeLinecap="round"
        filter={`url(#${gid("haze")})`}
      />

      {/* 8 — specular on the dome + point glint */}
      <ellipse
        cx="9.3"
        cy="8.9"
        rx="3.4"
        ry="2.1"
        transform="rotate(-38 9.3 8.9)"
        fill={p.glint}
        fillOpacity="0.72"
        filter={`url(#${gid("soft")})`}
      />
      <circle cx="9.1" cy="9" r="0.9" fill="#FFFFFF" fillOpacity="0.95" />
    </svg>
  );

  if (inline) {
    return (
      <span
        className={cn(
          "inline-flex items-center align-middle select-none",
          className,
        )}
      >
        {svg}
      </span>
    );
  }

  return (
    <div
      className={cn("absolute z-30 pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {svg}
    </div>
  );
}