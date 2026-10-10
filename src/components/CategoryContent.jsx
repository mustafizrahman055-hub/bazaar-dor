"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard, { engToBnNum } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryName } from "@/lib/i18n";

export default function CategoryContent({ slug, sort, products }) {
  const { t, lang } = useLanguage();

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t("noProducts")}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center">{t("noProductsDesc")}</p>
        <Link 
          href="/" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backHome")}
        </Link>
      </div>
    );
  }

  // Sort products
  let sortedProducts = [...products];
  if (sort === "asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const categoryName = getCategoryName(slug, lang);
  const categoryIcon = sortedProducts[0]?.categoryIcon || "📦";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl shadow-inner">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{categoryName}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {engToBnNum(sortedProducts.length, lang)} {t("productsFound")}
            </p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-lg border border-gray-100 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium px-2">{t("sortBy")}</span>
          <Link 
            href={`/category/${slug}`}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              !sort 
                ? "bg-white dark:bg-gray-700 text-green-700 dark:text-green-400 shadow-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50"
            }`}
          >
            {t("default")}
          </Link>
          <Link 
            href={`/category/${slug}?sort=asc`}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              sort === "asc" 
                ? "bg-white dark:bg-gray-700 text-green-700 dark:text-green-400 shadow-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50"
            }`}
          >
            {t("priceLowToHigh")}
          </Link>
          <Link 
            href={`/category/${slug}?sort=desc`}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              sort === "desc" 
                ? "bg-white dark:bg-gray-700 text-green-700 dark:text-green-400 shadow-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50"
            }`}
          >
            {t("priceHighToLow")}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
