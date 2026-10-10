import HeroSection from "@/components/HeroSection";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";

// Helper function to fetch products
async function getProducts() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
    next: { revalidate: 60 } 
  });
  
  if (!res.ok) {
    return [];
  }
  
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  
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
          <SectionTitle titleKey="allProducts" />
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
