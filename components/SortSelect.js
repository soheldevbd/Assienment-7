"use client";

export default function SortSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-base-content/70">সাজান:</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select select-sm sm:select-md appearance-none border-line bg-base-100 pr-8"
          aria-label="সাজান"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </span>
    </label>
  );
}
