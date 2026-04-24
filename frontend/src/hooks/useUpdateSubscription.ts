// frontend/src/hooks/useUpdateSubscription.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubscriptionsApi, type UpdateSubscriptionInput } from "@/app/api/subscriptions.api";

export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubscriptionInput }) =>
      SubscriptionsApi.update(id, data),
    onSuccess: () => {
      // Invalidate subscription queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
    onError: (error) => {
      console.error("Failed to update subscription:", error);
    },
  });
}