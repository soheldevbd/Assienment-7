"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfileView({ initialUser }) {
  const { data } = useSession();
  const router = useRouter();
  const user = data?.user ?? initialUser;

  return (
    <div className="mx-auto w-full max-w-2xl py-8">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="mt-6 rounded-2xl border border-line bg-base-100 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="" className="size-16 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-2xl text-primary-content">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            )}
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-base-content/70 break-all">{user.email}</p>
            </div>
          </div>
          <button
            className="btn btn-outline btn-sm sm:btn-md border-line"
            onClick={async () => { await signOut(); toast.success("সফলভাবে সাইন আউট হয়েছে"); router.push("/"); router.refresh(); }}
          >
            ↩ সাইন আউট
          </button>
        </div>

        <h2 className="mb-2 mt-6 text-sm font-semibold text-base-content/70">তথ্য</h2>
        <dl className="divide-y divide-line rounded-xl border border-line">
          <div className="flex justify-between gap-4 p-3"><dt className="text-base-content/70">নাম</dt><dd className="font-medium">{user.name}</dd></div>
          <div className="flex justify-between gap-4 p-3"><dt className="text-base-content/70">ইমেইল</dt><dd className="break-all text-right font-medium">{user.email}</dd></div>
        </dl>

        <Link href="/profile/update" className="btn btn-primary btn-sm sm:btn-md mt-5">আপডেট</Link>
      </div>
    </div>
  );
}
