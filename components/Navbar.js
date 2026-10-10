"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "./AuthButtons";
import BanglaDate from "./BanglaDate";

export default function Navbar({ categories }) {
  const pathname = usePathname();
  return (
    <div className="border-b border-line bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-primary sm:text-2xl">🛒 বাজার দর</span>
          <BanglaDate className="text-[11px] text-base-content/60 sm:text-xs" />
        </Link>
        <AuthButtons />
      </div>
      <nav aria-label="পণ্যের বিভাগ" className="mx-auto max-w-6xl px-4 pb-2">
        <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition ${
                    active ? "border-primary bg-primary text-primary-content" : "border-line bg-base-100 hover:border-primary/60 hover:bg-base-200"
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
