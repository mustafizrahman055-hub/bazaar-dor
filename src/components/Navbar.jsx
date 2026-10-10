"use client";
import Link from "next/link";
import { User, Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, toggleLanguage, t, mounted } = useLanguage();

  return (
    <>
      {/* Price Ticker */}
      <div className="bg-green-600 dark:bg-green-800 text-white py-1 overflow-hidden">
        <div className="marquee flex gap-8 whitespace-nowrap text-sm">
          <span>{t("datePrefix")} {lang === "en" ? "October 10, 2026" : "১০ অক্টোবর ২০২৬"}</span>
          <span>•</span>
          <span>চাল: ⬆ ২%</span>
          <span>•</span>
          <span>ডাল: ⬇ ১%</span>
          <span>•</span>
          <span>সয়াবিন তেল: ➖ অপরিবর্তিত</span>
          <span>•</span>
          <span>মুরগি: ⬆ ৩%</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ব
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">বাজার দর</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors">
                {t("home")}
              </Link>
              <div className="relative group">
                <button className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors flex items-center gap-1">
                  {t("category")}
                  <span className="text-xs">▼</span>
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <Link href="/category/chal" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">চাল</Link>
                    <Link href="/category/dal" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">ডাল</Link>
                    <Link href="/category/tel" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">তেল</Link>
                  </div>
                </div>
              </div>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors">
                {t("contact")}
              </Link>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Toggle */}
              {mounted && (
                <button 
                  onClick={toggleLanguage}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  title="Toggle Language"
                >
                  <Languages className="w-5 h-5" />
                  <span className="text-xs font-bold absolute -mt-4 ml-3">{lang.toUpperCase()}</span>
                </button>
              )}
              
              {/* Theme Toggle */}
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Sun className="w-5 h-5 hidden dark:block" />
                <Moon className="w-5 h-5 block dark:hidden" />
              </button>

              <Link 
                href="/signin" 
                className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg font-medium hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
              >
                <User className="w-4 h-4" />
                {t("signin")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-600 dark:text-gray-300"
              >
                <Sun className="w-5 h-5 hidden dark:block" />
                <Moon className="w-5 h-5 block dark:hidden" />
              </button>
              <button 
                className="p-2 text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block text-gray-600 dark:text-gray-300 font-medium py-2">{t("home")}</Link>
              <Link href="/category" className="block text-gray-600 dark:text-gray-300 font-medium py-2">{t("category")}</Link>
              <Link href="/contact" className="block text-gray-600 dark:text-gray-300 font-medium py-2">{t("contact")}</Link>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <Link href="/signin" className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium py-2">
                  <User className="w-4 h-4" />
                  {t("signin")}
                </Link>
                {mounted && (
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium py-2"
                  >
                    <Languages className="w-5 h-5" />
                    {lang === 'bn' ? 'English' : 'বাংলা'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
