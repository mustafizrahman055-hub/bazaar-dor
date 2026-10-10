"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SectionTitle({ titleKey, icon, iconColor = "text-gray-500", className = "" }) {
  const { t } = useLanguage();
  return (
    <div className={`flex items-center gap-2 mb-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t(titleKey)}</h2>
      {icon && <span className={iconColor}>{icon}</span>}
    </div>
  );
}
