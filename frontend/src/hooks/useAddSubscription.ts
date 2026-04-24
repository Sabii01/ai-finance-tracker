// frontend/src/hooks/useAddSubscription.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubscriptionsApi, type CreateSubscriptionInput } from "@/app/api/subscriptions.api";

/**
 * Add a new subscription
 * Also invalidates expenses since backend auto-creates first expense
 */
export function useAddSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubscriptionInput) => SubscriptionsApi.create(data),
    onSuccess: () => {
      // Invalidate both subscriptions and expenses
      // because backend creates an expense automatically
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Failed to create subscription:", error);
    },
  });
}