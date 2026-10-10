export default function Loading() {
  return (
    <div className="flex flex-col gap-6 pt-6">
      <div className="skeleton h-4 w-56" />
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="skeleton h-24" />)}</div>
      <div className="skeleton h-64 w-full" />
    </div>
  );
}
