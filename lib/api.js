import { parseNum } from "./bn";

const BASES = [
  process.env.NEXT_PUBLIC_API_BASE || "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export const FALLBACK_CATEGORIES = [
  { slug: "chal", name: "চাল", emoji: "🍚" },
  { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🛢️" },
  { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { slug: "dim-dudh", name: "ডিম-দুধ", emoji: "🥛" },
  { slug: "moshla", name: "মসলা", emoji: "🌶️" },
];

async function get(path) {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.status === 404) return { notFound: true };
      if (res.ok) return { data: await res.json() };
    } catch {
      /* try the next base url */
    }
  }
  return { error: true };
}

const first = (o, keys) => {
  for (const k of keys) if (o?.[k] !== undefined && o?.[k] !== null && o?.[k] !== "") return o[k];
  return undefined;
};

/** API response can be [..] or { data/products/categories/items: [..] } */
function unwrapList(json, keys) {
  if (Array.isArray(json)) return json;
  for (const k of [...keys, "data", "items", "results"]) if (Array.isArray(json?.[k])) return json[k];
  return [];
}
function unwrapOne(json, keys) {
  if (!json || Array.isArray(json)) return json?.[0] ?? null;
  for (const k of [...keys, "data", "item", "result"]) if (json[k] && typeof json[k] === "object" && !Array.isArray(json[k])) return json[k];
  return json;
}

export function normalizeCategory(c) {
  if (typeof c === "string") {
    const f = FALLBACK_CATEGORIES.find((x) => x.slug === c);
    return { slug: c, name: f?.name ?? c, emoji: f?.emoji ?? "🛒" };
  }
  const slug = String(first(c, ["slug", "id", "key", "_id"]) ?? "");
  return {
    slug,
    name: first(c, ["name_bn", "nameBn", "name", "title", "label"]) ?? slug,
    emoji: first(c, ["emoji", "icon"]) ?? FALLBACK_CATEGORIES.find((x) => x.slug === slug)?.emoji ?? "🛒",
  };
}

function normalizeMarket(m) {
  const min = parseNum(first(m, ["min", "min_price", "minPrice", "lowest", "minimum"]));
  const max = parseNum(first(m, ["max", "max_price", "maxPrice", "highest", "maximum"]));
  let avg = parseNum(first(m, ["avg", "average", "avg_price", "avgPrice", "price"]));
  if (avg === null && min !== null && max !== null) avg = (min + max) / 2;
  return {
    name: first(m, ["market", "market_name", "marketName", "name", "bazar", "title"]) ?? "—",
    division: first(m, ["division", "region", "location", "area", "district", "city"]) ?? "—",
    min, max, avg,
  };
}

export function normalizeProduct(p) {
  if (!p) return null;
  const catRaw = first(p, ["category", "category_slug", "categorySlug", "category_id"]);
  const catObj = typeof catRaw === "object" && catRaw ? normalizeCategory(catRaw) : null;
  const catSlug = catObj?.slug ?? (catRaw ? String(catRaw) : "");
  const catMeta = catObj ?? FALLBACK_CATEGORIES.find((x) => x.slug === catSlug);
  const categoryName = first(p, ["category_name", "categoryName", "category_bn"]) ?? catMeta?.name ?? catSlug;

  const rawMarkets = first(p, ["markets", "market_prices", "marketPrices", "bazars", "prices", "market_data"]);
  const markets = Array.isArray(rawMarkets) ? rawMarkets.map(normalizeMarket) : [];

  let min = parseNum(first(p, ["min_price", "minPrice", "min", "lowest_price"]));
  let max = parseNum(first(p, ["max_price", "maxPrice", "max", "highest_price"]));
  let avg = parseNum(first(p, ["avg_price", "avgPrice", "average_price", "averagePrice", "avg", "average"]));
  const mins = markets.map((m) => m.min).filter((v) => v !== null);
  const maxs = markets.map((m) => m.max).filter((v) => v !== null);
  const avgs = markets.map((m) => m.avg).filter((v) => v !== null);
  if (min === null && mins.length) min = Math.min(...mins);
  if (max === null && maxs.length) max = Math.max(...maxs);
  if (avg === null && avgs.length) avg = avgs.reduce((a, b) => a + b, 0) / avgs.length;

  let price = parseNum(first(p, ["price", "today_price", "todayPrice", "current_price", "currentPrice"]));
  if (price === null) price = avg;
  if (price === null && min !== null && max !== null) price = (min + max) / 2;

  const prev = parseNum(first(p, ["yesterday_price", "yesterdayPrice", "previous_price", "previousPrice", "prev_price", "prevPrice"]));
  let change = parseNum(first(p, ["change_percent", "changePercent", "percent_change", "percentChange", "change_pct", "changePct", "change", "percentage"]));
  let changeAmount = parseNum(first(p, ["change_amount", "changeAmount", "price_change", "priceChange"]));
  if (prev !== null && price !== null) {
    if (change === null && prev !== 0) change = ((price - prev) / prev) * 100;
    if (changeAmount === null) changeAmount = price - prev;
  }
  if (change === null) change = 0;
  if (changeAmount === null && prev === null && price !== null && change !== 0) changeAmount = price - price / (1 + change / 100);

  const unitRaw = first(p, ["unit", "unit_bn", "unitBn", "per"]) ?? "কেজি";
  const unitShort = String(unitRaw).replace(/^প্রতি\s*/, "");

  return {
    id: String(first(p, ["id", "_id", "slug"]) ?? ""),
    slug: String(first(p, ["slug", "id", "_id"]) ?? ""),
    name: first(p, ["name_bn", "nameBn", "name", "title"]) ?? "পণ্য",
    emoji: first(p, ["emoji", "icon", "image"]) ?? catMeta?.emoji ?? "🛒",
    category: catSlug,
    categoryName,
    unit: unitShort,
    price, prev, change, changeAmount, min, max, avg, markets,
    description: first(p, ["description", "summary", "subtitle", "desc"]) ?? "",
    tags: Array.isArray(p.tags) && p.tags.length ? p.tags : categoryName ? [categoryName] : [],
  };
}

export async function getCategories() {
  const r = await get("/categories");
  if (r.data) {
    const list = unwrapList(r.data, ["categories"]).map(normalizeCategory).filter((c) => c.slug);
    if (list.length) return list;
  }
  return FALLBACK_CATEGORIES;
}

export async function getCategory(slug) {
  const r = await get(`/categories/${encodeURIComponent(slug)}`);
  if (r.data) {
    const one = unwrapOne(r.data, ["category"]);
    if (one && (one.slug || one.id || one.name || one.name_bn)) return normalizeCategory({ slug, ...one });
  }
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(category) {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  const r = await get(`/products${q}`);
  if (r.error) throw new Error("API unavailable");
  const list = unwrapList(r.data, ["products"]).map(normalizeProduct).filter(Boolean);
  return category ? list.filter((p) => !p.category || p.category === category) : list;
}

export async function getProduct(slug) {
  const r = await get(`/products/${encodeURIComponent(slug)}`);
  if (r.data) {
    const one = normalizeProduct(unwrapOne(r.data, ["product"]));
    if (one && one.name !== "পণ্য") return one;
  }
  if (r.notFound || r.data) {
    const all = await getProducts().catch(() => []);
    return all.find((p) => p.slug === slug || p.id === slug) ?? null;
  }
  throw new Error("API unavailable");
}
