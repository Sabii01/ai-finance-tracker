// frontend/src/hooks/useDeleteSubscription.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubscriptionsApi } from "@/app/api/subscriptions.api";

/**
 * Hook to delete a single subscription
 */
export function useDeleteSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => SubscriptionsApi.delete(id),
    onSuccess: () => {
      // Invalidate subscription and expense queries
      // (linked expenses get their subscriptionId set to null)
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Failed to delete subscription:", error);
    },
  });
}

/**
 * Hook to delete all subscriptions
 * Use with caution!
 */
export function useDeleteAllSubscriptions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => SubscriptionsApi.deleteAll(),
    onSuccess: () => {
      // Invalidate all subscription and expense queries
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Failed to delete all subscriptions:", error);
    },
  });
}