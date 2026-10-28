import React from "react";
import { cn } from "@/lib/utils";

interface SketchUnderlineProps {
  children: React.ReactNode;
  color?: "terracotta" | "yellow" | "mint" | "purple" | "oxford";
  variant?: "brush" | "wave" | "double" | "zigzag";
  className?: string;
}

export function SketchUnderline({
  children,
  color = "terracotta",
  variant = "brush",
  className,
}: SketchUnderlineProps) {
  const strokeColors = {
    terracotta: "text-[#E86A46]",
    yellow: "text-[#D9822B] dark:text-[#E5BE54]",
    mint: "text-[#3D5A40] dark:text-[#69A384]",
    purple: "text-[#8B7BA8]",
    oxford: "text-[#2B3A4A] dark:text-[#7AA2C7]",
  };

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <span
        className={cn(
          "absolute -bottom-1.5 left-0 w-full pointer-events-none select-none overflow-visible",
          strokeColors[color]
        )}
        aria-hidden="true"
      >
        {variant === "brush" && (
          <svg
            viewBox="0 0 240 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-3 md:h-3.5 -rotate-[0.5deg]"
            preserveAspectRatio="none"
          >
            <path
              d="M3 11C45 5.5 130 3 237 9C175 14 60 15 5 13"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.88"
            />
          </svg>
        )}
        {variant === "wave" && (
          <svg
            viewBox="0 0 240 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-2.5 md:h-3"
            preserveAspectRatio="none"
          >
            <path
              d="M2 7C22 2 38 12 58 7C78 2 98 12 118 7C138 2 158 12 178 7C198 2 218 12 238 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        )}
        {variant === "zigzag" && (
          <svg
            viewBox="0 0 240 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-2.5 md:h-3"
            preserveAspectRatio="none"
          >
            <path
              d="M2 10L14 3L26 10L38 3L50 10L62 3L74 10L86 3L98 10L110 3L122 10L134 3L146 10L158 3L170 10L182 3L194 10L206 3L218 10L230 3L238 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </svg>
        )}
        {variant === "double" && (
          <svg
            viewBox="0 0 240 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-3 md:h-3.5"
            preserveAspectRatio="none"
          >
            <path
              d="M3 6C65 4 170 4.5 237 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M10 12C85 10 155 10.5 230 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.65"
            />
          </svg>
        )}
      </span>
    </span>
  );
}
