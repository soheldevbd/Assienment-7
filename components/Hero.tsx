import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-line bg-base-100">
      <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
        <div className="flex flex-col items-start gap-4">
          <BanglaDate className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary" />
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="text-base text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">সব পণ্য দেখুন</a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src="/bazar-hero.png" alt="বাজারের পণ্যের ছবি" width={315} height={263} priority className="h-auto w-full max-w-xs md:max-w-sm" />
        </div>
      </div>
    </section>
  );
}
