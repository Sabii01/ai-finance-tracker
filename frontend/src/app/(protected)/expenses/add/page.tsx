//frontend\src\app\(protected)\expenses\add\page.tsx:
"use client";

import { useState } from "react";
//import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useAddExpense } from "@/hooks/useAddExpense";
import { useRouter } from "next/navigation";

export default function AddExpensePage() {
  //const { data: subs = [] } = useSubscriptions();
  const [form, setForm] = useState({
    amount: "",
    description: "",
    subscriptionId: "",
  });

  const router = useRouter();
  const { mutate: addExpense, isPending, error } = useAddExpense();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    addExpense(
      {
        amount: parseFloat(form.amount), // Convert string to number
        description: form.description,
        //category: form.category || undefined, // Empty string → undefined
        subscriptionId: form.subscriptionId || undefined,
        status: "completed", // Default status
      },
      {
        onSuccess: () => {
          router.push("/expenses"); // Redirect to list
        },
      }
    );
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 animate-page-enter">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
            Add Expense
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Record a new expense transaction
          </p>
        </div>

        {/* Form Card */}
        <div className="premium-card p-6 md:p-8 space-y-6">
          {/* Add this above the form */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              Failed to create expense: {error.message}
            </div>
          )}
          <form onSubmit={submit} className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold text-lg pointer-events-none">
                  ₹
                </span>
                <input
                  className="w-full pl-10 pr-4 py-3.5 bg-background border-2 border-border rounded-xl text-foreground font-semibold text-lg transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none
                  /* Remove number arrows */
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enter the expense amount in rupees
              </p>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Description *
              </label>
              <input
                className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl text-foreground font-medium transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none"
                placeholder="e.g., Grocery shopping at Whole Foods"
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Category Select
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Category
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-4 py-3.5 bg-background border-2 border-border rounded-xl text-foreground font-medium transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none cursor-pointer"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  <option value="Food">🍔 Food & Dining</option>
                  <option value="Utilities">💡 Utilities</option>
                  <option value="Transport">🚗 Transport</option>
                  <option value="Entertainment">🎮 Entertainment</option>
                  <option value="Shopping">🛍️ Shopping</option>
                  <option value="Healthcare">🏥 Healthcare</option>
                  <option value="Education">📚 Education</option>
                  <option value="Other">📦 Other</option>
                </select>
                 Custom dropdown arrow 
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="sm:flex-1 px-6 py-3.5 bg-gray-200 dark:text-foreground border-2 border-border text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:text-background dark:hover:border-gray-600 active:scale-[0.98] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="sm:flex-1 px-6 py-3.5 bg-gray-200 dark:text-foreground border-2 border-border text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:text-background dark:hover:border-gray-600 active:scale-[0.98] cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {isPending ? "Creating..." : "Add Expense"}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-900 rounded-xl">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm dark:text-primary-300">
              <p className="font-semibold mb-1">✨ AI-Powered</p>
              <p className="...">
                Our AI will automatically categorize your expense based on the
                description!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
