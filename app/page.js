export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ProductBrowser from "@/components/ProductBrowser";
import { getCategories, getProducts } from "@/lib/api";

function Section({ title, subtitle, icon, children, id }) {
  return (
    <section id={id} className="mt-10">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
          {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const risers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <>
      <Hero />
      {risers.length > 0 && (
        <Section title="আজ দাম বেড়েছে" subtitle="গতকালের তুলনায় সবচেয়ে বেশি বেড়েছে" icon={<span className="text-up">▲</span>}>
          <ProductGrid products={risers} />
        </Section>
      )}
      {fallers.length > 0 && (
        <Section title="আজ দাম কমেছে" subtitle="গতকালের তুলনায় সবচেয়ে বেশি কমেছে" icon={<span className="text-down">▼</span>}>
          <ProductGrid products={fallers} />
        </Section>
      )}
      <Section id="সব-পণ্য" title="সব পণ্য" subtitle="সব ক্যাটাগরির আজকের দাম ও পরিবর্তন">
        <ProductBrowser products={products} categories={categories} withFilters />
      </Section>
    </>
  );
}
