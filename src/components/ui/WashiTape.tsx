import React from "react";
import { Tape, TapeProps } from "./Tape";

export interface WashiTapeProps {
  color?: "parchment" | "sage" | "amber" | "terracotta" | "striped" | "yellow" | "mint" | "peach";
  rotation?: "left" | "right" | "straight" | "slight-left" | "slight-right";
  className?: string;
}

export function WashiTape({
  color = "striped",
  rotation = "slight-left",
  className,
}: WashiTapeProps) {
  const mapColor = (): TapeProps["color"] => {
    if (color === "amber" || color === "yellow") return "yellow";
    if (color === "sage" || color === "mint") return "mint";
    if (color === "terracotta" || color === "peach") return "peach";
    if (color === "striped") return "striped";
    return "parchment";
  };

  return <Tape color={mapColor()} rotation={rotation} className={className} />;
}

export { Tape };
