import Link from "next/link";

export default function NotFoundView({ title = "পেজটি খুঁজে পাওয়া যায়নি", text = "আপনি যে পেজ বা পণ্যটি খুঁজছেন তা নেই, অথবা লিংকটি ভুল।" }: { title?: string; text?: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <p className="text-6xl font-bold text-primary">৪০৪</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base-content/70">{text}</p>
      <Link href="/" className="btn btn-primary mt-2">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
