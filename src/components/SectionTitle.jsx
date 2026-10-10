"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SectionTitle({ titleKey, icon, iconColor = "text-gray-500" }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t(titleKey)}</h2>
      {icon && <span className={iconColor}>{icon}</span>}
    </div>
  );
}
