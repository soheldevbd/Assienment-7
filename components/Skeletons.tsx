export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-base-100 p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton size-12 shrink-0" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="skeleton h-10 w-full" />
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
