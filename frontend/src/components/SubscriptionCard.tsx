// frontend/src/components/SubscriptionCard.tsx
"use client";

import Link from "next/link";
import type { Subscription } from "@/app/api/subscriptions.api";

interface SubscriptionCardProps {
  sub: Subscription;
}

export function SubscriptionCard({ sub }: SubscriptionCardProps) {
  return (
    <Link
      href={`/subscriptions/${sub.id}`}
      className="group block premium-card p-5 hover:shadow-lg hover:border-primary-400 dark:hover:border-primary-500 hover:-translate-y-1 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold dark:text-gray-700 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {sub.name}
          </h3>
          <p className="text-sm dark:text-gray-500">{sub.category}</p>
        </div>
        
        {/* Status Badge */}
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            sub.status === "active"
              ? "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300"
              : sub.status === "paused"
              ? "bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300"
              : "bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300"
          }`}
        >
          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
        </span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold dark:text-gray-600">
            ₹{sub.price.toFixed(2)}
          </span>
          <span className="text-sm dark:text-gray-600">
            /{sub.billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </div>
      </div>

      {/* Next Billing */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="dark:text-gray-500">Next billing</span>
          <span className="font-medium dark:text-gray-500">
            {new Date(sub.nextBillingDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none" />
      
    </Link>
  );
}