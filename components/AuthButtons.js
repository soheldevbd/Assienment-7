"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data, isPending } = useSession();
  const router = useRouter();

  if (isPending) return <div className="skeleton h-9 w-28" aria-label="লোড হচ্ছে" />;

  if (data?.user) {
    const name = data.user.name || "প্রোফাইল";
    return (
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-sm sm:btn-md btn-ghost gap-2">
          {data.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.user.image} alt="" className="size-7 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm text-primary-content">{name.charAt(0).toUpperCase()}</span>
          )}
          <span className="hidden max-w-28 truncate sm:inline">{name}</span>
          <span className="text-xs">▾</span>
        </button>
        <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-52 rounded-xl border border-line bg-base-100 p-2 shadow-lg">
          <li><Link href="/profile">👤 আমার প্রোফাইল</Link></li>
          <li>
            <button
              onClick={async () => {
                await signOut();
                toast.success("সফলভাবে সাইন আউট হয়েছে");
                router.push("/");
                router.refresh();
              }}
            >
              ↩ সাইন আউট
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-sm sm:btn-md btn-ghost">সাইন ইন</Link>
      <Link href="/signup" className="btn btn-sm sm:btn-md btn-primary">সাইন আপ</Link>
    </div>
  );
}
