import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import SearchFilter from "@/components/SearchFilter";

export const instant = false;

export default async function Home({ searchParams }) {
  const { q } = await searchParams;
  let products = await getAllProducts();
  
  if (q) {
    const query = q.toLowerCase();
    products = products.filter(p => 
      (p.nameBn && p.nameBn.toLowerCase().includes(query)) ||
      (p.slug && p.slug.toLowerCase().includes(query)) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(query))
    );
  }

  const risers = [...products]
    .filter(p => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
    
  const fallers = [...products]
    .filter(p => p.change.dir === 'down')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-16 pb-16">
      
      <HeroSection />

      <div className="container mx-auto px-4 space-y-16">
        
        {risers.length > 0 && (
          <section>
            <SectionTitle titleKey="priceIncreased" icon="▲" iconColor="text-red-500" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {risers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section>
            <SectionTitle titleKey="priceDecreased" icon="▼" iconColor="text-green-500" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fallers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <section id="all-products">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <SectionTitle titleKey="allProducts" className="mb-0" />
            <SearchFilter />
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
