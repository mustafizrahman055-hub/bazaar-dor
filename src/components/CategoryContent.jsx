"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard, { engToBnNum } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryName } from "@/lib/i18n";
import SearchFilter from "@/components/SearchFilter";

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

        <div className="hidden md:block">
          <SearchFilter />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t("sortBy")}</span>
          <div className="relative">
            <select
              value={sort || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  window.location.href = `/category/${slug}?sort=${val}`;
                } else {
                  window.location.href = `/category/${slug}`;
                }
              }}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer font-medium"
            >
              <option value="">{t("default")}</option>
              <option value="asc">{t("priceLowToHigh")}</option>
              <option value="desc">{t("priceHighToLow")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
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
