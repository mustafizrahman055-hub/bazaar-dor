"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export const engToBnNum = (num, lang) => {
  if (lang === 'en') return num.toString();
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (w) => bn[w]);
};

const ProductCard = ({ product }) => {
  const { t, lang } = useLanguage();
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';
  
  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden">
        
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg group-hover:text-green-600 transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t("pricePer")} {product.unit === 'kg' ? (lang === 'en' ? 'kg' : 'কেজি') : product.unit === 'l' ? (lang === 'en' ? 'L' : 'লিটার') : product.unit === 'dozen' ? (lang === 'en' ? 'dozen' : 'ডজন') : (lang === 'en' ? 'pc' : 'পিস')}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{t("todayPrice")}</span>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {engToBnNum(product.today, lang)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t("currency")}</span>
              </div>
              
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${
                isUp ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 
                isDown ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 
                'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <span>{isUp ? '▲' : isDown ? '▼' : '-'}</span>
                <span>{engToBnNum(product.change.pct, lang)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
