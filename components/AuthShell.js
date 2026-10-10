import Link from "next/link";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto w-full max-w-md py-8">
      <div className="rounded-2xl border border-line bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-6 text-center text-sm">{footer}</p>
      </div>
      <Link href="/" className="mt-4 block text-center text-sm text-primary hover:underline">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}

export function Field({ label, ...props }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input {...props} className="input w-full border-line bg-base-100" />
    </label>
  );
}

export function Divider() {
  return (
    <div className="my-4 flex items-center gap-3 text-xs text-base-content/50">
      <span className="h-px flex-1 bg-line" /> অথবা <span className="h-px flex-1 bg-line" />
    </div>
  );
}
