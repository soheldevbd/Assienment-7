import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 pt-6">
      <div className="skeleton h-56 w-full rounded-2xl" />
      <div className="skeleton h-6 w-48" />
      <GridSkeleton count={6} />
    </div>
  );
}
