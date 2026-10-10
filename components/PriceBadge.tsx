import { bnPercent } from "@/lib/bn";

export default function PriceBadge({ change = 0, className = "" }: { change?: number; className?: string }) {
  const up = change > 0.0001;
  const down = change < -0.0001;
  const tone = up ? "bg-up/10 text-up" : down ? "bg-down/10 text-down" : "bg-gray-200 text-gray-500";
  const icon = up ? "▲" : down ? "▼" : "—";
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${tone} ${className}`}>
      {icon} {bnPercent(change)}
    </span>
  );
}
