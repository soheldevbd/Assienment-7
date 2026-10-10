"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import AuthShell, { Field, Divider } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toasted = useRef(false);

  useEffect(() => {
    if (toasted.current) return;
    toasted.current = true;
    if (params.get("reason") === "protected") toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    if (params.get("registered")) toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email")?.toString().trim();
    const password = fd.get("password")?.toString();
    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    }
    setLoading(true); setError("");
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      return toast.error(msg);
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footer={<>অ্যাকাউন্ট নেই? <Link href="/signup" className="font-semibold text-primary hover:underline">সাইন আপ করুন</Link></>}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="current-password" required />
        {error && <p role="alert" className="rounded-lg bg-down/10 px-3 py-2 text-sm text-down">{error}</p>}
        <button className="btn btn-primary" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />} সাইন ইন
        </button>
      </form>
      <Divider />
      <SocialButtons callbackURL={callbackUrl} />
    </AuthShell>
  );
}
