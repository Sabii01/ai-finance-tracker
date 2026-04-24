// frontend/src/app/(protected)/subscriptions/add/page.tsx
"use client";

import { useState } from "react";
import { useAddSubscription } from "@/hooks/useAddSubscription";
import { useRouter } from "next/navigation";

export default function AddSubscriptionPage() {
  const router = useRouter();
  const { mutate: addSubscription, isPending, error } = useAddSubscription();

  const [form, setForm] = useState({
    name: "",
    //category: "",
    amount: "",
    billingCycle: "monthly" as "monthly" | "yearly",
    nextBillingDate: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert date to ISO 8601 format
    const nextBillingDateISO = new Date(form.nextBillingDate).toISOString();

    addSubscription(
      {
        name: form.name,
        price: parseFloat(form.amount), // Convert string to number
        billingCycle: form.billingCycle,
        nextBillingDate: nextBillingDateISO,
      },
      {
        onSuccess: () => {
          router.push("/subscriptions"); // Redirect to subscriptions list
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
            Add Subscription
          </h1>
          <p className="dark:text-gray-400">Track a new recurring payment</p>
        </div>

        {/* Form Card */}
        <div className="premium-card p-6 md:p-8 space-y-6">
          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300">
              <p className="font-semibold">Failed to create subscription</p>
              <p className="text-sm mt-1">{error.message}</p>
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Subscription Name *
              </label>
              <input
                className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl dark:text-gray-800 font-medium transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none"
                placeholder="e.g., Netflix, Spotify, Amazon Prime"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Category Input 
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Category *
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-4 py-3.5 bg-background border-2 border-border rounded-xl dark:text-gray-500 font-medium transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none cursor-pointer"
                  value={form.category}
                  required
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  <option value="Entertainment">🎬 Entertainment</option>
                  <option value="Software">💻 Software & Tools</option>
                  <option value="Music">🎵 Music & Audio</option>
                  <option value="Streaming">📺 Video Streaming</option>
                  <option value="Cloud Storage">☁️ Cloud Storage</option>
                  <option value="News">📰 News & Magazines</option>
                  <option value="Fitness">💪 Fitness & Health</option>
                  <option value="Education">📚 Education</option>
                  <option value="Gaming">🎮 Gaming</option>
                  <option value="Other">📦 Other</option>
                </select>
                 Custom dropdown arrow 
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 dark:text-gray-400"
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

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-700 font-semibold text-lg pointer-events-none">
                  ₹
                </span>
                <input
                  className="w-full pl-10 pr-4 py-3.5 bg-background border-2 border-border rounded-xl dark:text-gray-800 font-semibold text-lg transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </div>
              <p className="text-xs dark:text-gray-400">
                Enter the subscription cost per billing cycle
              </p>
            </div>

            {/* Billing Cycle */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Billing Cycle *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, billingCycle: "monthly" })}
                  className={`px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                    form.billingCycle === "monthly"
                      ? "text-background bg-purple-500 text-white shadow-md"
                      : "bg-background border-2 border-border dark:text-gray-800 hover:border-primary-400"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, billingCycle: "yearly" })}
                  className={`px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                    form.billingCycle === "yearly"
                      ? "text-background bg-purple-500 text-white shadow-md"
                      : "bg-background border-2 border-border dark:text-gray-800 hover:border-primary-400"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Next Billing Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold dark:text-gray-500">
                Next Billing Date *
              </label>
              <input
                type="date"
                className="w-full px-4 py-3.5 dark:bg-blue-100/30 border-2 border-border rounded-xl dark:text-gray-800 font-medium transition-all duration-200 hover:border-primary-400 dark:hover:border-primary-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none"
                required
                value={form.nextBillingDate}
                onChange={(e) =>
                  setForm({ ...form, nextBillingDate: e.target.value })
                }
              />
              <p className="text-xs dark:text-gray-400">
                When will you be charged next?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                disabled={isPending}
                className="sm:flex-1 px-6 py-3.5 bg-gray-200 dark:text-foreground border-2 border-border text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:text-background dark:hover:border-gray-600 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="sm:flex-1 px-6 py-3.5 bg-gray-200 dark:text-foreground border-2 border-border text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:text-background dark:hover:border-gray-600 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
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
                      Add Subscription
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-secondary-50 dark:bg-secondary-950/30 border border-secondary-200 dark:border-secondary-900 rounded-xl">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm text-secondary-800 dark:text-secondary-300">
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
