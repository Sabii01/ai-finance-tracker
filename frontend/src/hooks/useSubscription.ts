// frontend/src/hooks/useSubscription.ts
import { useQuery } from "@tanstack/react-query";
import { SubscriptionsApi } from "@/app/api/subscriptions.api";

/**
 * Get a single subscription by ID
 * Now calls the API directly instead of filtering all subscriptions
 */
export function useSubscription(id: string) {
  return useQuery({
    queryKey: ["subscription", id],
    queryFn: async () => {
      const response = await SubscriptionsApi.getById(id);
      return response.subscription;
    },
    enabled: !!id, // Only run if ID exists
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}