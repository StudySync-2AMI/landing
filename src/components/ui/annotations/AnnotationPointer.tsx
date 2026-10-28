"use client";

import React from "react";
import {
  PointerVariant,
  PointerSize,
  PointerColor,
  BasePointerProps,
} from "./pointers/types";
import { CornerPointer } from "./pointers/CornerPointer";
import { SketchPointer } from "./pointers/SketchPointer";
import { LoopPointer } from "./pointers/LoopPointer";
import { HandPointer } from "./pointers/HandPointer";
import { CurvePointer } from "./pointers/CurvePointer";
import { BracketPointer } from "./pointers/BracketPointer";

export type { PointerVariant, PointerSize, PointerColor };
export {
  CornerPointer,
  SketchPointer,
  LoopPointer,
  HandPointer,
  CurvePointer,
  BracketPointer,
};

export interface AnnotationPointerProps extends BasePointerProps {
  variant?: PointerVariant;
}

/**
 * Editorial Scrapbook Annotation Pointer
 * Dynamic unified router that delegates to dedicated pointer components.
 * Automatically mirrors in RTL (Arabic) so arrows always point INTO the reading direction:
 * - English (LTR): curves down and right (↳ / ☞ / →)
 * - Arabic (RTL): curves down and left (↲ / ☜ / ←)
 */
export function AnnotationPointer({
  variant = "corner",
  ...props
}: AnnotationPointerProps) {
  switch (variant) {
    case "sketch":
      return <SketchPointer {...props} />;
    case "loop":
      return <LoopPointer {...props} />;
    case "hand":
      return <HandPointer {...props} />;
    case "curve":
      return <CurvePointer {...props} />;
    case "bracket":
      return <BracketPointer {...props} />;
    case "corner":
    default:
      return <CornerPointer {...props} />;
  }
}
