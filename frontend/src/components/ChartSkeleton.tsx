import { Skeleton } from "./Skeleton";

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>

      {/* Chart area with animated bars/lines effect */}
      <div className="h-64 flex items-end justify-between gap-2 px-2">
        <Skeleton className="h-32 w-full rounded-t-lg" />
        <Skeleton className="h-40 w-full rounded-t-lg" />
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <Skeleton className="h-36 w-full rounded-t-lg" />
        <Skeleton className="h-52 w-full rounded-t-lg" />
        <Skeleton className="h-44 w-full rounded-t-lg" />
      </div>
    </div>
  );
}