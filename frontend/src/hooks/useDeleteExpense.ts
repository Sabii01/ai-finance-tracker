// frontend/src/hooks/useDeleteExpense.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExpensesApi } from "@/app/api/expenses.api";

/**
 * Hook to delete a single expense
 */
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ExpensesApi.delete(id),
    onSuccess: () => {
      // Invalidate expense queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Failed to delete expense:", error);
    },
  });
}

/**
 * Hook to delete all expenses
 * Use with caution!
 */
export function useDeleteAllExpenses() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ExpensesApi.deleteAll(),
    onSuccess: () => {
      // Invalidate expense queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Failed to delete all expenses:", error);
    },
  });
}