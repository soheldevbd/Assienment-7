"use client";
import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";
import { sortProducts, toBnDigits } from "@/lib/bn";
import type { Category, Product, SortMode } from "@/lib/types";

/** Client-side sort (+ optional search & category chips for the home page). */
export default function ProductBrowser({ products, categories = [], withFilters = false }: { products: Product[]; categories?: Category[]; withFilters?: boolean }) {
  const [sort, setSort] = useState<SortMode>("default");
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = products;
    if (cat !== "all") l = l.filter((p) => p.category === cat);
    if (q.trim()) l = l.filter((p) => p.name.includes(q.trim()));
    return sortProducts(l, sort);
  }, [products, cat, q, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-base-content/70">মোট {toBnDigits(list.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="flex flex-wrap items-center gap-3">
          {withFilters && (
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="পণ্য খুঁজুন…"
              aria-label="পণ্য খুঁজুন"
              className="input input-sm sm:input-md w-full border-line bg-base-100 sm:w-48"
            />
          )}
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      {withFilters && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[{ slug: "all", name: "সব", emoji: "" } as Category, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                cat === c.slug ? "border-primary bg-primary text-primary-content" : "border-line bg-base-100 hover:bg-base-200"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      )}

      {list.length ? <ProductGrid products={list} /> : (
        <p className="rounded-xl border border-dashed border-line bg-base-100 p-8 text-center text-base-content/60">কোনো পণ্য পাওয়া যায়নি।</p>
      )}
    </div>
  );
}
