import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "secondary";
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 select-none default",
    success: "bg-green-500 dark:bg-green-600/80 dark:text-gray-100 select-none sec",
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 select-none",
    secondary: "bg-blue-600 dark:bg-blue-500 select-none sec",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}