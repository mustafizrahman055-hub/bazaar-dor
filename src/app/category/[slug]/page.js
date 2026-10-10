import CategoryContent from "@/components/CategoryContent";
import { getCategoryProducts } from "@/lib/api";

export const instant = false;

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { sort, q } = await searchParams;
  
  let products = await getCategoryProducts(slug);

  if (q) {
    const query = q.toLowerCase();
    products = products.filter(p => 
      (p.nameBn && p.nameBn.toLowerCase().includes(query)) ||
      (p.slug && p.slug.toLowerCase().includes(query)) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(query))
    );
  }

  return (
    <CategoryContent 
      slug={slug}
      sort={sort}
      products={products}
    />
  );
}
