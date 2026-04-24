// frontend/src/hooks/useUpdateExpense.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExpensesApi, type UpdateExpenseInput } from "@/app/api/expenses.api";

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExpenseInput }) =>
      ExpensesApi.update(id, data),
    onSuccess: () => {
      // Invalidate expense queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Failed to update expense:", error);
    },
  });
}