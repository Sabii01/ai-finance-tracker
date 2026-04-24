import { useExpenses } from "./useExpenses";
import { useSubscriptions } from "./useSubscriptions";

export function useDashboardSummary() {
  const { data: expenses = [], isLoading: eLoading } = useExpenses();
  const { data: subs = [], isLoading: sLoading } = useSubscriptions();

  const isLoading = eLoading || sLoading;

  if (isLoading) {
    return {
      isLoading: true,
      totalMonthlySpend: 0,
      subscriptionMonthlySpend: 0,
      nonSubscriptionSpend: 0,
      activeSubscriptions: 0,
    };
  }

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // 1. Calculate Recurring Monthly Burn (Subscriptions)
  // We normalize yearly subs to monthly cost
  const subscriptionMonthlySpend = subs
    .filter((s) => s.status === "active")
    .reduce((sum, s) => {
      const price = s.price || 0; // Ensure price exists
      if (s.billingCycle === "monthly") return sum + price;
      if (s.billingCycle === "yearly") return sum + price / 12;
      return sum;
    }, 0);

  // 2. Calculate One-Off Expenses for THIS Month
  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const nonSubscriptionSpend = monthlyExpenses
    .filter((e) => !e.subscriptionId) // Exclude subscription-linked expenses
    .reduce((sum, e) => sum + e.amount, 0);

  // 3. Total
  const totalMonthlySpend = subscriptionMonthlySpend + nonSubscriptionSpend;

  return {
    isLoading: false,
    totalMonthlySpend: Math.round(totalMonthlySpend), // Round for cleaner UI
    subscriptionMonthlySpend: Math.round(subscriptionMonthlySpend),
    nonSubscriptionSpend: Math.round(nonSubscriptionSpend),
    activeSubscriptions: subs.filter((s) => s.status === "active").length,
  };
}