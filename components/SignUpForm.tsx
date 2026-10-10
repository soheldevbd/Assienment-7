"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import AuthShell, { Field, Divider } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString().trim();
    const email = fd.get("email")?.toString().trim();
    const password = fd.get("password")?.toString() ?? "";
    const confirm = fd.get("confirm")?.toString() ?? "";
    const fail = (m: string) => { setError(m); toast.error(m); };

    if (!name || !email || !password) return fail("সব ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true); setError("");
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) return fail(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin?registered=1");
  }

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footer={<>অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-primary hover:underline">সাইন ইন করুন</Link></>}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Field label="নাম" name="name" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" required />
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" required />
        <Field label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" placeholder="আবার লিখুন" autoComplete="new-password" required />
        {error && <p role="alert" className="rounded-lg bg-down/10 px-3 py-2 text-sm text-down">{error}</p>}
        <button className="btn btn-primary" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />} অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
      <Divider />
      <SocialButtons callbackURL="/" />
    </AuthShell>
  );
}
