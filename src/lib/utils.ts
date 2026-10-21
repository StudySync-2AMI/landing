import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, locale: string = "ar"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(num);
}
