import CategoryContent from "@/components/CategoryContent";

async function getCategoryProducts(category) {
  let url = `https://api.abcz.workers.dev/api/bazardor/products`;
  if (category && category !== 'all') {
    url += `?category=${category}`;
  }
  
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  
  const data = await res.json();
  if (category && category !== 'all') {
    return data.filter(p => p.category === category);
  }
  return data;
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { sort } = await searchParams;
  
  const products = await getCategoryProducts(slug);

  return (
    <CategoryContent 
      slug={slug}
      sort={sort}
      products={products}
    />
  );
}
