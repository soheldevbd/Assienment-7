import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import PriceBadge from "@/components/PriceBadge";
import { bnNumber, bnTaka } from "@/lib/bn";

export async function generateMetadata({ params }) {
  const p = await getProduct(decodeURIComponent((await params).slug)).catch(() => null);
  return { title: p?.name ?? "পণ্য পাওয়া যায়নি" };
}

function Stat({ label, value, note }) {
  return (
    <div className="rounded-xl border border-line bg-base-100 p-4">
      <p className="text-sm text-base-content/70">{label}</p>
      <p className="mt-1 text-2xl font-bold">{bnTaka(value)}</p>
      {note && <p className="mt-1 text-xs text-base-content/60">{note}</p>}
    </div>
  );
}

export default async function ProductPage({ params }) {
  const slug = decodeURIComponent((await params).slug);
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?reason=protected&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);

  const p = await getProduct(slug);
  if (!p) notFound();

  const cheapest = p.markets.find((m) => m.min === p.min);
  const priciest = p.markets.find((m) => m.max === p.max);
  const dir = p.change > 0 ? "বেড়েছে" : p.change < 0 ? "কমেছে" : "অপরিবর্তিত আছে";

  return (
    <div className="pt-6">
      <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-base-content/70">
        <Link href="/" className="hover:text-primary">হোম</Link>›
        {p.category && <><Link href={`/category/${p.category}`} className="hover:text-primary">{p.categoryName}</Link>›</>}
        <span className="font-medium text-base-content">{p.name}</span>
      </nav>

      <section className="rounded-2xl border border-line bg-base-100 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-base-200 text-4xl sm:size-20 sm:text-5xl">{p.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{p.name}</h1>
              {p.description && <p className="mt-1 text-sm text-base-content/70">{p.description}</p>}
              <div className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{t}</span>)}
                <span className="rounded-full bg-base-200 px-2.5 py-0.5 text-xs">প্রতি {p.unit}</span>
              </div>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-base-content/70">আজকের দাম</p>
            <p className="text-4xl font-bold text-primary">{bnNumber(p.price)} <span className="text-base font-medium text-base-content/70">টাকা / {p.unit}</span></p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm sm:justify-end">
              গতকালের তুলনায় আজ দাম {dir}{p.changeAmount ? ` · ${bnNumber(Math.abs(p.changeAmount))} টাকা` : ""}
              <PriceBadge change={p.change} />
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="সর্বনিম্ন দাম" value={p.min} note={cheapest ? `সবচেয়ে কম দামের বাজার: ${cheapest.name}` : `প্রতি ${p.unit}-এর হিসাবে`} />
          <Stat label="সর্বাধিক দাম" value={p.max} note={priciest ? `সবচেয়ে বেশি দামের বাজার: ${priciest.name}` : `প্রতি ${p.unit}-এর হিসাবে`} />
          <Stat label="গড় দাম" value={p.avg} note={`প্রতি ${p.unit}-এর হিসাবে`} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {p.markets.length ? (
          <div className="overflow-x-auto rounded-xl border border-line bg-base-100">
            <table className="table min-w-[560px]">
              <thead>
                <tr className="text-base-content/70"><th>বাজার</th><th>বিভাগ</th><th className="text-right">সর্বনিম্ন</th><th className="text-right">সর্বাধিক</th><th className="text-right">গড়</th></tr>
              </thead>
              <tbody>
                {p.markets.map((m, i) => (
                  <tr key={m.name + i} className="hover:bg-base-200/60">
                    <td className="font-medium">{m.name}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{m.min !== null ? bnTaka(m.min) : "—"}</td>
                    <td className="text-right">{m.max !== null ? bnTaka(m.max) : "—"}</td>
                    <td className="text-right font-semibold">{m.avg !== null ? bnTaka(m.avg) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-line bg-base-100 p-6 text-center text-base-content/60">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        )}
      </section>
    </div>
  );
}
