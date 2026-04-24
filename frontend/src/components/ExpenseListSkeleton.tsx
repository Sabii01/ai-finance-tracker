

import { Skeleton } from "./Skeleton";

export function ExpenseListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-xl p-5 space-y-3"
        >
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>
          
          {/* Badges row */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}