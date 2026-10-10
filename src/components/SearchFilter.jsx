"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search } from "lucide-react";
import { useState, useEffect, Suspense } from "react";

function SearchFilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`/?${params.toString()}#all-products`, { scroll: false });
    }, 300);

    return () => clearTimeout(handler);
  }, [query, router, searchParams]);

  return (
    <div className="relative w-full md:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
        placeholder={lang === "en" ? "Search products..." : "পণ্য খুঁজুন..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default function SearchFilter() {
  return (
    <Suspense fallback={<div className="w-full md:w-64 h-[38px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg border border-gray-300 dark:border-gray-700"></div>}>
      <SearchFilterContent />
    </Suspense>
  );
}
