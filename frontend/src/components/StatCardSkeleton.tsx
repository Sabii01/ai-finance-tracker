import { Skeleton } from "./Skeleton";

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
      {/* Icon and trend skeleton */}
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-5 w-12 rounded-lg" />
      </div>

      {/* Label skeleton */}
      <Skeleton className="h-4 w-2/3" />

      {/* Value skeleton */}
      <Skeleton className="h-9 w-3/4" />
    </div>
  );
}