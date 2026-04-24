import { useExpenses } from "./useExpenses";
import { useSubscriptions } from "./useSubscriptions";

function getLastNMonths(n: number) {
  const months = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    // We target the END of the month to check if a sub was active at any point during it
    const date = new Date(d.getFullYear(), d.getMonth() - i + 1, 0); 
    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleString("default", { month: "short" }),
      month: date.getMonth(),
      year: date.getFullYear(),
      endOfMonth: date,
      startOfMonth: new Date(date.getFullYear(), date.getMonth(), 1)
    });
  }
  return months;
}

export function useExpenseSubscriptionChart() {
  const { data: expenses = [], isLoading: eLoading } = useExpenses();
  const { data: subs = [], isLoading: sLoading } = useSubscriptions();

  if (eLoading || sLoading) return { isLoading: true, data: [] };

  const months = getLastNMonths(6);

  const data = months.map((m) => {
    // 1. Calculate historical subscription cost
    const subscriptionMonthly = subs
      .filter((s) => {
        const subStart = new Date(s.createdAt);
        // Use endDate if it exists; otherwise, if cancelled, assume updatedAt is the end date
        const subEnd = s.status === "cancelled" 
          ? new Date(s.updatedAt /*|| s.endDate*/) 
          : null;

        /**
         * LOGIC: A subscription should appear in this month if:
         * 1. It started before or during this month.
         * 2. It is either still active OR it was cancelled AFTER this month started.
         */
        const startedBeforeMonthEnd = subStart <= m.endOfMonth;
        const endedAfterMonthStart = !subEnd || subEnd >= m.startOfMonth;

        return startedBeforeMonthEnd && endedAfterMonthStart;
      })
      .reduce((sum, s) => {
        // We still normalize the cost to see the "Burn Rate"
        if (s.billingCycle === "monthly") return sum + s.price;
        if (s.billingCycle === "yearly") return sum + s.price / 12;
        return sum;
      }, 0);

    // 2. Calculate non-subscription expenses (Direct Date Match)
    const nonSubscriptionMonthly = expenses
      .filter((e) => {
        if (e.subscriptionId) return false;
        const expDate = new Date(e.date);
        return (
          expDate.getMonth() === m.month &&
          expDate.getFullYear() === m.year
        );
      })
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      month: m.label,
      Subscriptions: Math.round(subscriptionMonthly),
      Expenses: Math.round(nonSubscriptionMonthly),
    };
  });

  return {
    isLoading: false,
    data,
  };
}