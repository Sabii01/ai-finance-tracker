// import { useMutation } from "@tanstack/react-query";

// type ExpenseInput = {
//   amount: number;
//   description: string;
// };

// export function useAddExpense() {
//   return useMutation({
//     mutationFn: async (data: ExpenseInput) => {
//       // mock for now
//       return new Promise((resolve) =>
//         setTimeout(() => resolve(data), 500)
//       );
//     },
//   });
// }


// frontend/src/hooks/useAddExpense.ts
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