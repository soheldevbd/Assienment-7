import Link from "next/link";
import type { Product } from "@/lib/types";
import PriceBadge from "./PriceBadge";
import { bnTaka } from "@/lib/bn";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(p.slug)}`}
      className="group flex flex-col gap-3 rounded-xl border border-line bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-base-200 text-2xl">{p.emoji}</span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold group-hover:text-primary">{p.name}</h3>
          <p className="text-xs text-base-content/60">প্রতি {p.unit}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold">{bnTaka(p.price)}</p>
        </div>
        <PriceBadge change={p.change} />
      </div>
    </Link>
  );
}
