import { notFound } from "next/navigation";
import ProductDetailsContent from "@/components/ProductDetailsContent";
import { getAllProducts } from "@/lib/api";

export const instant = false;

async function getProduct(slug) {
  const products = await getAllProducts();
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

  return (
    <ProductDetailsContent 
      product={product}
      globalMin={globalMin}
      globalMax={globalMax}
      avgPrice={avgPrice}
    />
  );
}
