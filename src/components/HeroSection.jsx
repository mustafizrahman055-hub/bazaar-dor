"use client";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTodayDate } from "@/lib/i18n";

export default function HeroSection() {
  const { t, lang } = useLanguage();
  
  return (
    <section className="bg-green-50/70 dark:bg-emerald-950/20 py-12 md:py-20 border-b border-green-100 dark:border-emerald-900/40">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex-1 space-y-6">
          <p className="text-green-700 dark:text-emerald-400 font-semibold tracking-wide text-sm md:text-base">
            {t("datePrefix")} {getTodayDate(lang)}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div>
            <a 
              href="#all-products" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              {t("heroButton")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 bg-green-100/80 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shadow-inner">
            <ShoppingBasket className="w-32 h-32 text-green-600 dark:text-emerald-400 absolute" />
            <div className="text-5xl absolute -top-4 right-8">🍎</div>
            <div className="text-5xl absolute top-8 -left-4">🥒</div>
            <div className="text-5xl absolute bottom-8 left-0">🧅</div>
            <div className="text-5xl absolute -bottom-4 right-12">🥔</div>
          </div>
        </div>
      </div>
    </section>
  );
}
