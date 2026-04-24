import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-gray-200 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}