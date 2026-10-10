import Link from "next/link";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Helper function to fetch products
async function getProducts() {
  // Using alternative URL since the primary one returned HTML during testing
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
    next: { revalidate: 60 } // Revalidate every minute
  });
  
  if (!res.ok) {
    return [];
  }
  
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  
  // Get top 6 risers (dir === 'up') sorted by percentage change
  const risers = [...products]
    .filter(p => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
    
  // Get top 6 fallers (dir === 'down') sorted by percentage change
  const fallers = [...products]
    .filter(p => p.change.dir === 'down')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-16 pb-16">
      
      {/* Hero Section */}
      <section className="bg-green-50/50 py-12 md:py-20 border-b border-green-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex-1 space-y-6">
            <p className="text-green-600 font-medium">বাজার দর আপডেট — ১০ অক্টোবর ২০২৬</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-lg max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস থেকে শুরু করে সব ধরনের নিত্যপ্রয়োজনীয় বাজারের আপডেট দাম দেখে নিন।
            </p>
            <div>
              <a 
                href="#all-products" 
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                সব পণ্য দেখুন
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
              <ShoppingBasket className="w-32 h-32 text-green-600 absolute" />
              <div className="text-5xl absolute -top-4 right-8">🍎</div>
              <div className="text-5xl absolute top-8 -left-4">🥒</div>
              <div className="text-5xl absolute bottom-8 left-0">🧅</div>
              <div className="text-5xl absolute -bottom-4 right-12">🥔</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-16">
        
        {/* Section A - আজ দাম বেড়েছে */}
        {risers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">আজ দাম বেড়েছে</h2>
              <span className="text-red-500">▲</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {risers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B - আজ দাম কমেছে */}
        {fallers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">আজ দাম কমেছে</h2>
              <span className="text-green-500">▼</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fallers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C - সব পণ্য */}
        <section id="all-products">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">সব পণ্য</h2>
            <p className="text-gray-500 text-sm mt-1">বাজারের সকল পণ্যের তালিকা</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
