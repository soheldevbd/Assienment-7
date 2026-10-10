const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const EN_MAP = Object.fromEntries(BN.map((d, i) => [d, String(i)]));

export const toBnDigits = (v) => String(v).replace(/[0-9]/g, (d) => BN[d]);

/** Bengali string/number -> JS number ("১,৮৫০.৫০" -> 1850.5) */
export function parseNum(v) {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v).replace(/[০-৯]/g, (d) => EN_MAP[d]).replace(/[,\s৳]/g, "").replace(/[^\d.\-+]/g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

/** 1850 -> "১,৮৫০" ; 63.5 -> "৬৩.৫০" */
export function bnNumber(n, { decimals } = {}) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const hasFrac = Math.abs(n % 1) > 0.0001;
  const d = decimals ?? (hasFrac ? 2 : 0);
  const [int, frac] = Math.abs(n).toFixed(d).split(".");
  const withComma = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toBnDigits((n < 0 ? "-" : "") + withComma + (frac ? "." + frac : ""));
}

export const bnTaka = (n) => `${bnNumber(n)} টাকা`;

export function bnPercent(n) {
  return `${toBnDigits(Math.abs(n ?? 0).toFixed(1))}%`;
}

export function bnToday(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
  }).format(date);
}

export function sortProducts(list, mode) {
  const arr = [...list];
  if (mode === "asc") arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  if (mode === "desc") arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  return arr;
}
