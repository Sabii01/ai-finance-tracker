// frontend/src/app/(protected)/subscriptions/page.tsx
"use client";

import Link from "next/link";
import { SubscriptionListSkeleton } from "@/components/SubscriptionListSkeleton";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { SubscriptionCard } from "@/components/SubscriptionCard";

export default function SubscriptionsPage() {
  const { data = [], isLoading } = useSubscriptions();

  if (isLoading) {
    return <SubscriptionListSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold dark:text-gray-900">
            Subscriptions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your recurring bills and monthly burn rate.
          </p>
        </div>
        
        {/* Secondary "Add" button for better accessibility */}
        {data.length > 0 && (
          <Link
            href="/subscriptions/add"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New
          </Link>
        )}
      </div>

      {data.length === 0 ? (
        /* --- EMPTY STATE --- */
        <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl">
          <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-800">No subscriptions found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-xs">
            Start tracking your recurring expenses to get a better view of your monthly spend.
          </p>
          <Link
            href="/subscriptions/add"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:opacity-90 transition-all"
          >
            Add Your First Subscription
          </Link>
        </div>
      ) : (
        /* --- GRID LAYOUT --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((sub) => (
            <SubscriptionCard key={sub.id} sub={sub} />
          ))}
        </div>
      )}
    </div>
  );
}