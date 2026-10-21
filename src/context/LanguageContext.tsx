"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import arTranslations from "@/locales/ar.json";
import enTranslations from "@/locales/en.json";

export type Language = "ar" | "en";
export type Direction = "rtl" | "ltr";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => any;
  dict: typeof arTranslations;
}

const translations = {
  ar: arTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    // Check saved preference or fallback to Arabic default
    const saved = localStorage.getItem("studysync-lang") as Language;
    if (saved && (saved === "ar" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    const dir: Direction = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    localStorage.setItem("studysync-lang", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "ar" ? "en" : "ar"));
  };

  // Helper to query nested keys like "hero.stats.roles.label"
  const t = (path: string, fallback: string = ""): any => {
    const keys = path.split(".");
    let current: any = translations[language];
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return current;
  };

  const dict = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction: language === "ar" ? "rtl" : "ltr",
        setLanguage,
        toggleLanguage,
        t,
        dict,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
