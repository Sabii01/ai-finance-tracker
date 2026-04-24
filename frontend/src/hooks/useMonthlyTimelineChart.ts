// import { useExpenses } from "./useExpenses";
// import { useSubscriptions } from "./useSubscriptions";

// function getLastNMonths(n: number) {
//   const months = [];
//   const d = new Date();
//   for (let i = n - 1; i >= 0; i--) {
//     const date = new Date(d.getFullYear(), d.getMonth() - i, 1);
//     months.push({
//       key: `${date.getFullYear()}-${date.getMonth()}`,
//       label: date.toLocaleString("default", { month: "short" }),
//       month: date.getMonth(),
//       year: date.getFullYear(),
//     });
//   }
//   return months;
// }

// export function useMonthlyTimelineChart(monthsCount = 6) {
//   const { data: expenses = [], isLoading: eLoading } = useExpenses();
//   const { data: subs = [], isLoading: sLoading } = useSubscriptions();

//   if (eLoading || sLoading) return { isLoading: true, data: [] };

//   const months = getLastNMonths(monthsCount);

//   const data = months.map((m) => {
//     // Calculate subscription cost for this specific month
//     const monthlySub = subs
//       .filter((s) => {
//         if (s.status !== "active") return false;
        
//         // Check if subscription was active during this month
//         const subStart = new Date(s.createdAt);
//         const monthDate = new Date(m.year, m.month, 1);
        
//         // Only include if subscription started before or during this month
//         return subStart <= monthDate;
//       })
//       .reduce((sum, s) => {
//         if (s.billingCycle === "monthly") return sum + s.amount;
//         if (s.billingCycle === "yearly") return sum + s.amount / 12;
//         return sum;
//       }, 0);

//     // Calculate non-subscription expenses for this specific month
//     const otherExpenses = expenses
//       .filter((e) => {
//         if (e.subscriptionId) return false;
//         const expDate = new Date(e.date);
//         return (
//           expDate.getMonth() === m.month &&
//           expDate.getFullYear() === m.year
//         );
//       })
//       .reduce((sum, e) => sum + e.amount, 0);

//     return {
//       month: m.label,
//       Subscriptions: Math.round(monthlySub),
//       Expenses: Math.round(otherExpenses),
//     };
//   });

//   return { isLoading: false, data };
// }






import { useExpenses } from "./useExpenses";
import { useSubscriptions } from "./useSubscriptions";

function getLastNMonths(n: number) {
  const months = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    // End of month to check overlap
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

export function useMonthlyTimelineChart() {
  const { data: expenses = [], isLoading: eLoading } = useExpenses();
  const { data: subs = [], isLoading: sLoading } = useSubscriptions();

  if (eLoading || sLoading) return { isLoading: true, data: [] };

  const months = getLastNMonths(6);

  const data = months.map((m) => {
    // 1. Calculate historical subscription cost (Fixed: using 'price' from your schema)
    const subscriptionMonthly = subs
      .filter((s) => {
        const subStart = new Date(s.createdAt);
        const subEnd = s.status === "cancelled" ? new Date(s.updatedAt || s.nextBillingDate) : null;
        
        return subStart <= m.endOfMonth && (!subEnd || subEnd >= m.startOfMonth);
      })
      .reduce((sum, s) => {
        const val = s.price || 0; // Fixed from s.amount
        return s.billingCycle === "yearly" ? sum + val / 12 : sum + val;
      }, 0);

    // 2. Calculate ALL expenses for this month
    const allExpensesMonthly = expenses
      .filter((e) => {
        const expDate = new Date(e.date);
        return expDate.getMonth() === m.month && expDate.getFullYear() === m.year;
      })
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      month: m.label,
      Subscriptions: Math.round(subscriptionMonthly),
      Expenses: Math.round(allExpensesMonthly),
      Total: Math.round(subscriptionMonthly + allExpensesMonthly),
      // Adding metadata for the Tooltip
      activeCount: subs.filter(s => s.status === 'active').length,
    };
  });

  return { isLoading: false, data };
}