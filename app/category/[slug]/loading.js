import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="pt-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="skeleton size-14" />
        <div className="flex flex-col gap-2"><div className="skeleton h-6 w-32" /><div className="skeleton h-4 w-48" /></div>
      </div>
      <GridSkeleton count={6} />
    </div>
  );
}
