"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("bn");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load preference from localStorage
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "bn" ? "en" : "bn";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key) => {
    if (!mounted) return translations.bn[key] || key; // Default to bn during SSR
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
