export const dynamic = "force-dynamic";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ProductBrowser from "@/components/ProductBrowser";
import { getCategories, getProducts } from "@/lib/api";

function Section({ title, subtitle, icon, children, id }: { title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode; id?: string }) {
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

function Empty({ text }: { text: string }) {
  return <p className="rounded-xl border border-dashed border-line bg-base-100 p-6 text-center text-base-content/60">{text}</p>;
}

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const risers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <>
      <Hero />
      <Section title="আজ দাম বেড়েছে" icon={<span className="text-up">▲</span>}>
        {risers.length ? <ProductGrid products={risers} /> : <Empty text="আজ কোনো পণ্যের দাম বাড়েনি।" />}
      </Section>
      <Section title="আজ দাম কমেছে" icon={<span className="text-down">▼</span>}>
        {fallers.length ? <ProductGrid products={fallers} /> : <Empty text="আজ কোনো পণ্যের দাম কমেনি।" />}
      </Section>
      <Section id="সব-পণ্য" title="সব পণ্য" subtitle="সব ক্যাটাগরির আজকের দাম ও পরিবর্তন">
        <ProductBrowser products={products} categories={categories} withFilters />
      </Section>
    </>
  );
}
