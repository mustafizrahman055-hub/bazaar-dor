import { notFound } from "next/navigation";
import { engToBnNum } from "@/components/ProductCard";

async function getProduct(slug) {
  // Since the API uses ID for single product (/products/1), we fetch all and find by slug.
  // In a real API with slug endpoint, we'd fetch directly.
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) return null;
  const products = await res.json();
  return products.find(p => p.slug === slug);
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Calculate global min, max, avg
  let globalMin = Infinity;
  let globalMax = -Infinity;
  let totalMin = 0;
  let totalMax = 0;

  if (product.markets && product.markets.length > 0) {
    product.markets.forEach(m => {
      if (m.min < globalMin) globalMin = m.min;
      if (m.max > globalMax) globalMax = m.max;
      totalMin += m.min;
      totalMax += m.max;
    });
  } else {
    globalMin = product.today;
    globalMax = product.today;
  }
  
  const marketCount = product.markets?.length || 1;
  const avgPrice = Math.round((totalMin + totalMax) / (2 * marketCount)) || product.today;
  const unitText = product.unit === 'kg' ? 'কেজি' : product.unit === 'l' ? 'লিটার' : product.unit === 'dozen' ? 'ডজন' : 'পিস';

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Top Summary */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-32 h-32 bg-green-50 rounded-2xl flex items-center justify-center text-6xl shadow-inner">
          {product.image || product.categoryIcon}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex gap-2 mb-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              {product.categoryNameBn}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.nameBn}</h1>
          <p className="text-gray-500">বাজারের সার্বিক অবস্থা ও গড় দামের সারাংশ। প্রতি {unitText} হিসেবে দাম দেয়া হলো।</p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <p className="text-red-800 font-medium mb-1">সর্বনিম্ন দাম</p>
          <div className="text-3xl font-bold text-red-600">
            {engToBnNum(globalMin)} <span className="text-lg font-normal">টাকা</span>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-green-800 font-medium mb-1">গড় দাম</p>
          <div className="text-3xl font-bold text-green-600">
            {engToBnNum(avgPrice)} <span className="text-lg font-normal">টাকা</span>
          </div>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <p className="text-orange-800 font-medium mb-1">সর্বোচ্চ দাম</p>
          <div className="text-3xl font-bold text-orange-600">
            {engToBnNum(globalMax)} <span className="text-lg font-normal">টাকা</span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">বাজারভিত্তিক আজকের দাম</h2>
        
        {product.markets && product.markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                  <th className="p-4 font-medium rounded-tl-lg">বাজারের নাম</th>
                  <th className="p-4 font-medium">বিভাগ</th>
                  <th className="p-4 font-medium">সর্বনিম্ন দাম</th>
                  <th className="p-4 font-medium rounded-tr-lg">সর্বোচ্চ দাম</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{market.market}</td>
                    <td className="p-4 text-gray-500">{market.division}</td>
                    <td className="p-4 text-gray-700">{engToBnNum(market.min)} টাকা</td>
                    <td className="p-4 text-gray-700">{engToBnNum(market.max)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">এই পণ্যের বাজারভিত্তিক কোনো তথ্য পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  );
}
