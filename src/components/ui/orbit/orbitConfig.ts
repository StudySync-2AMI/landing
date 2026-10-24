import React from "react";
import {
  Sparkles,
  QrCode,
  GitBranch,
  ShieldAlert,
  CalendarDays,
  Award,
} from "lucide-react";

export interface ConstellationNodeDef {
  id: "ai" | "qr" | "dag" | "risk" | "cal" | "analytics";
  icon: React.ElementType;
  xPercent: number;
  yPercent: number;
  rotation: string;
  accent: "mint" | "yellow" | "peach" | "purple" | "oxford" | "terracotta";
  delayClass: string;
}

/**
 * 6 Balanced celestial orbital stations:
 * - Left nodes at 21% (safely inside left margin, generous clearance from center hub)
 * - Right nodes at 79% (safely inside right margin, generous clearance from center hub)
 * - Top node at 13%, Bottom node at 87%
 * - Center Hub at 50%, 50% remains 100% unobstructed on both mobile & desktop
 */
export const NODE_DEFS: ConstellationNodeDef[] = [
  {
    id: "ai",
    icon: Sparkles,
    xPercent: 50,
    yPercent: 13,
    rotation: "rotate-1",
    accent: "purple",
    delayClass: "animate-orbit-float",
  },
  {
    id: "qr",
    icon: QrCode,
    xPercent: 21,
    yPercent: 32,
    rotation: "-rotate-2",
    accent: "mint",
    delayClass: "animate-orbit-float-delayed",
  },
  {
    id: "dag",
    icon: GitBranch,
    xPercent: 79,
    yPercent: 32,
    rotation: "rotate-2",
    accent: "peach",
    delayClass: "animate-orbit-float-slow",
  },
  {
    id: "cal",
    icon: CalendarDays,
    xPercent: 21,
    yPercent: 68,
    rotation: "rotate-2",
    accent: "oxford",
    delayClass: "animate-orbit-float-delayed",
  },
  {
    id: "analytics",
    icon: Award,
    xPercent: 79,
    yPercent: 68,
    rotation: "-rotate-2",
    accent: "yellow",
    delayClass: "animate-orbit-float-slow",
  },
  {
    id: "risk",
    icon: ShieldAlert,
    xPercent: 50,
    yPercent: 87,
    rotation: "-rotate-1",
    accent: "terracotta",
    delayClass: "animate-orbit-float",
  },
];

export const accentBadgeColors = {
  mint: "bg-[#D1E8D1] text-[#1E3A24] dark:bg-[#69A384]/30 dark:text-[#A7E8C4] border-emerald-700/20",
  yellow: "bg-[#FDF1CC] text-[#4A3800] dark:bg-[#E5BE54]/30 dark:text-[#FFEBA8] border-amber-700/20",
  peach: "bg-[#FAD4C0] text-[#4A1F0D] dark:bg-[#E29373]/30 dark:text-[#FFCEBC] border-orange-700/20",
  purple: "bg-[#E6E0F0] text-[#2F1F45] dark:bg-[#8B7BA8]/30 dark:text-[#D8CCE8] border-purple-700/20",
  oxford: "bg-[#D8E2EC] text-[#132738] dark:bg-[#7AA2C7]/30 dark:text-[#C5DCF2] border-blue-700/20",
  terracotta: "bg-[#FAD4C0] text-[#E86A46] dark:bg-[#E86A46]/30 dark:text-[#FFB69E] border-orange-700/20",
};
