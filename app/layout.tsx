import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: { default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে", template: "%s | বাজার দর" },
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর এক জায়গায়।",
  icons: { icon: "/logo-icon.png" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts().catch(() => [])]);
  return (
    <html lang="bn" data-theme="bazar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-40 shadow-sm">
          <Navbar categories={categories} />
          <Ticker products={products} />
        </header>
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4 pb-4">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
