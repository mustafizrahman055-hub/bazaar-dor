"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductName, getCategoryName, getUnitText } from "@/lib/i18n";
import { engToBnNum } from "@/components/ProductCard";

export default function ProductDetailsContent({ product, globalMin, globalMax, avgPrice }) {
  const { t, lang } = useLanguage();

  const productName = getProductName(product, lang);
  const categoryName = getCategoryName(product.category, lang);
  const unitText = getUnitText(product.unit, lang);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Top Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-32 h-32 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-6xl shadow-inner">
          {product.image || product.categoryIcon}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex gap-2 mb-2">
            <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
              {categoryName}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{productName}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t("summaryDesc")} {t("pricePer")} {unitText}
          </p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
          <p className="text-red-800 dark:text-red-300 font-medium mb-1">{t("lowestPrice")}</p>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {engToBnNum(globalMin, lang)} <span className="text-lg font-normal text-red-500 dark:text-red-400/80">{t("currency")}</span>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-2xl border border-green-100 dark:border-green-900/30">
          <p className="text-green-800 dark:text-green-300 font-medium mb-1">{t("averagePrice")}</p>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {engToBnNum(avgPrice, lang)} <span className="text-lg font-normal text-green-500 dark:text-green-400/80">{t("currency")}</span>
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
          <p className="text-orange-800 dark:text-orange-300 font-medium mb-1">{t("highestPrice")}</p>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {engToBnNum(globalMax, lang)} <span className="text-lg font-normal text-orange-500 dark:text-orange-400/80">{t("currency")}</span>
          </div>
        </div>
      </div>

      {/* Market-wise Prices */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("marketPrices")}</h2>
        
        {product.markets && product.markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm border-b dark:border-gray-700">
                  <th className="p-4 font-medium rounded-tl-lg">{t("marketName")}</th>
                  <th className="p-4 font-medium">{t("division")}</th>
                  <th className="p-4 font-medium">{t("lowestPrice")}</th>
                  <th className="p-4 font-medium rounded-tr-lg">{t("highestPrice")}</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, idx) => (
                  <tr key={idx} className="border-b dark:border-gray-700/60 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{market.market}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{market.division}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{engToBnNum(market.min, lang)} {t("currency")}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{engToBnNum(market.max, lang)} {t("currency")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t("noMarketData")}</p>
        )}
      </div>
    </div>
  );
}
