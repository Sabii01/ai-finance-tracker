import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExpensesApi, type CreateExpenseInput } from "@/app/api/expenses.api";

export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseInput) => ExpensesApi.create(data),
    onSuccess: () => {
      // Invalidate all expense queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Failed to create expense:", error);
    },
  });
}