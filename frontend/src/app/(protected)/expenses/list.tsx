/* eslint-disable prefer-const */

// frontend/src/app/(protected)/expenses/list.tsx
"use client";

import { useExpenses, ExpenseFilters } from "@/hooks/useExpenses";
import { Badge } from "@/components/Badge";
import { ExpenseListSkeleton } from "@/components/ExpenseListSkeleton";
import { useDeleteExpense } from "@/hooks/useDeleteExpense";


type Props = {
  filters?: ExpenseFilters;
};

export default function ExpenseList({ filters }: Props) {
  const { data, isLoading } = useExpenses(filters);
  const { mutate: deleteExpense } = useDeleteExpense();
  // const { data: subData = [] } = useSubscriptions();
  // const { mutate: deleteSubscription } = useDeleteSubscription();
  // const router = useRouter();
  // const subs: Subscription[] = [];
  // if (subData?.length !== 0 && data?.length !== 0) {
  //   // collect subscriptions that match any expense by subscriptionId
  //   for (let i = 0; i < subData.length; i++) {
  //     const sub = subData[i];
  //     if (data!.some((exp) => exp.subscriptionId === sub.id)) {
  //       subs.push(sub);
  //     }
  //   }
  // }

const handleDelete = (id: string, description: string) => {
  // Check if expense is linked to a subscription
  const expense = data?.find((exp) => exp.id === id);
  const isLinked = !!expense?.subscriptionId;
  
  const message = isLinked
    ? `This expense is linked to a subscription. Delete expense only?\n\n(The subscription will remain active)`
    : `Delete "${description}"?`;
  
  if (confirm(message)) {
    deleteExpense(id);
  }
};

  // Show skeleton while loading
  if (isLoading) {
    return <ExpenseListSkeleton />;
  }

  // Show empty state when no results
  if (!data || data.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400 mb-2">
          No expenses found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {filters?.category || filters?.status
            ? "Try adjusting your filters to see more results."
            : "Start by adding your first expense."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl">
      {data.map((e) => (
        <div
          key={e.id}
          className="group relative bg-surface border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary-400 dark:hover:border-primary-500 hover:-translate-y-1 list-shade"
        >
          {/* Main Content */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-2xl font-bold text-foreground">
                  ₹{e.amount.toFixed(2)}
                </h3>
                {e.isAnomaly && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-warning bg-warning-light px-2 py-1 rounded-full">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    High Spend
                  </span>
                )}
              </div>
              <p className="dark:text-gray-900 font-medium">{e.description}</p>
            </div>

            {/* Date */}
            <div className="text-right">
              <p className="text-sm font-medium dark:text-gray-600">
                {new Date(e.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(e.id, e.description || "this expense");
            }}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mb-3.5"
            title="Delete expense"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 bg">
            <Badge variant="default">{e.category ?? "Uncategorized"}</Badge>
            <Badge variant={e.status === "completed" ? "success" : "warning"}>
              {e.status}
            </Badge>
            {e.subscriptionId && (
              <Badge variant="secondary">Subscription</Badge>
            )}
          </div>

          {/* Hover Gradient Border Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-800 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
