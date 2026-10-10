import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";

async function getCategoryProducts(category) {
  // We can fetch from API and filter by category locally 
  // since the API /products?category=chal might not work on alternative URL or if we want to ensure robustness.
  // Actually, let's try the filter URL first.
  let url = `https://api.abcz.workers.dev/api/bazardor/products`;
  if (category && category !== 'all') {
    url += `?category=${category}`;
  }
  
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  
  // If API filtering doesn't work, we can fallback to filtering locally just in case
  const data = await res.json();
  if (category && category !== 'all') {
    return data.filter(p => p.category === category);
  }
  return data;
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { sort } = await searchParams; // 'asc', 'desc', or undefined
  
  const products = await getCategoryProducts(slug);

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-8">হয়তো আপনি ভুল লিংকে এসেছেন অথবা এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি।</p>
        <Link 
          href="/" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Sort products
  let sortedProducts = [...products];
  if (sort === 'asc') {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === 'desc') {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  // Get category info from the first product
  const categoryName = sortedProducts[0]?.categoryNameBn || "ক্যাটাগরি";
  const categoryIcon = sortedProducts[0]?.categoryIcon || "📦";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl shadow-inner">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-sm text-gray-500">{sortedProducts.length} টি পণ্য পাওয়া গেছে</p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
          <span className="text-sm text-gray-500 font-medium px-2">সাজান:</span>
          <Link 
            href={`/category/${slug}`}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${!sort ? 'bg-white text-green-700 shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            ডিফল্ট
          </Link>
          <Link 
            href={`/category/${slug}?sort=asc`}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${sort === 'asc' ? 'bg-white text-green-700 shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            দাম: কম থেকে বেশি
          </Link>
          <Link 
            href={`/category/${slug}?sort=desc`}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${sort === 'desc' ? 'bg-white text-green-700 shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            দাম: বেশি থেকে কম
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
