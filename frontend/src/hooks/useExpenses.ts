// frontend/src/hooks/useExpenses.ts
import { useQuery } from "@tanstack/react-query";
import { ExpensesApi, type ExpenseFilters } from "@/app/api/expenses.api";

export type Expense = {
  id: string;
  amount: number;
  description?: string;
  category?: string;
  status: "completed" | "pending";
  isAnomaly?: boolean;
  date: string;
  subscriptionId?: string;
};

export type { ExpenseFilters };

export function useExpenses(filters?: ExpenseFilters) {
  return useQuery({
    queryKey: ["expenses", filters],
    queryFn: async () => {
      const response = await ExpensesApi.getAll(filters);
      return response.expenses;
    },
    staleTime: 1000 * 60, // 1 minute - expenses don't change that often
  });
}