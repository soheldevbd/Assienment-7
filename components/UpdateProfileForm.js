"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";
import { Field } from "./AuthShell";

export default function UpdateProfileForm({ initialName }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name")?.toString().trim();
    if (!name) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md py-8">
      <div className="rounded-2xl border border-line bg-base-100 p-6 sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <Field label="নাম" name="name" defaultValue={initialName} required />
          <button className="btn btn-primary" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />} তথ্য আপডেট করুন
          </button>
          <Link href="/profile" className="btn btn-ghost">বাতিল</Link>
        </form>
      </div>
    </div>
  );
}
