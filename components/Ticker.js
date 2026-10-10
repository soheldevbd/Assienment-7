import { bnNumber, bnPercent } from "@/lib/bn";

function Item({ p }) {
  const up = p.change > 0.0001, down = p.change < -0.0001;
  return (
    <span className="flex items-center gap-2 whitespace-nowrap px-5 text-sm">
      <span>{p.emoji}</span>
      <span className="font-medium">{p.name}</span>
      <span className="text-base-content/70">{bnNumber(p.price)} টাকা/{p.unit}</span>
      <span className={up ? "font-semibold text-up" : down ? "font-semibold text-down" : "text-gray-500"}>
        {up ? "▲" : down ? "▼" : "—"} {bnPercent(p.change)}
      </span>
    </span>
  );
}

export default function Ticker({ products }) {
  if (!products?.length) return null;
  return (
    <div className="marquee overflow-hidden border-t border-line bg-primary/5" aria-label="দামের তালিকা">
      <div className="marquee-track flex py-2">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
            {products.map((p) => <Item key={p.id + k} p={p} />)}
          </div>
        ))}
      </div>
    </div>
  );
}
