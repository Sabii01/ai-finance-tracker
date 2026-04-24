"use client";

import { MonthlyTimelineChart } from "@/components/MonthlyTimelineChart";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import { StatCard } from "@/components/StatCard";
import { ExpenseVsSubscriptionChart } from "@/components/ExpenseVsSubscriptionChart";
import { StatCardSkeleton } from "@/components/StatCardSkeleton";
import { ChartSkeleton } from "@/components/ChartSkeleton";
import { InsightsModal } from "@/components/InsightsModal";

export default function DashboardPage() {
  const data = useDashboardSummary();

  // Empty state
  if (
    Object.keys(data).length === 0 ||
    (!data.isLoading && data.totalMonthlySpend === 0)
  ) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-primary opacity-20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No Data Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start adding your expenses and subscriptions to see your financial
            insights here.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (data.isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 no-scrollbar">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        {/* Charts Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  // Main dashboard content
  return (
    <div className="space-y-8 animate-page-enter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your financial overview at a glance
        </p>
          <div className="mt-4">
    <InsightsModal />
  </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          label="Total Monthly Spend"
          value={data.totalMonthlySpend} // Pass number directly
          trend="up"
          icon="wallet"
        />
        <StatCard
          label="Subscriptions (Monthly)"
          value={data.subscriptionMonthlySpend} // Pass number directly
          trend="neutral"
          icon="subscription"
        />
        <StatCard
          label="Other Expenses"
          value={`₹${Math.round(data.nonSubscriptionSpend).toLocaleString()}`}
          trend="down"
          icon="expense"
        />
        <StatCard
          label="Active Subscriptions"
          value={`${data.activeSubscriptions}`}
          icon="active"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses vs Subscriptions Chart */}
        <div className="premium-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Expenses vs Subscriptions
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Monthly comparison
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-primary opacity-20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-600 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <ExpenseVsSubscriptionChart />
        </div>

        {/* Monthly Timeline Chart */}
        <div className="premium-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Monthly Timeline
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Last 6 months trend
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-secondary opacity-20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-secondary-600 dark:text-secondary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
          </div>
          <MonthlyTimelineChart />
        </div>
      </div>
    </div>
  );
}
