export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import ProductBrowser from "@/components/ProductBrowser";
import NotFoundView from "@/components/NotFoundView";
import { getCategory, getProducts } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = await getCategory(decodeURIComponent(slug));
  return { title: c?.name ?? "ক্যাটাগরি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }) {
  const slug = decodeURIComponent((await params).slug);
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getProducts(slug);

  return (
    <div className="pt-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-xl bg-base-100 text-3xl ring-1 ring-line">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-sm text-base-content/70">{toBnDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      {products.length ? (
        <ProductBrowser products={products} />
      ) : (
        <NotFoundView title="এই ক্যাটাগরিতে কোনো পণ্য নেই" text="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।" />
      )}
    </div>
  );
}
