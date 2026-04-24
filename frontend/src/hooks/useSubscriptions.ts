// frontend/src/hooks/useSubscriptions.ts
import { useQuery } from "@tanstack/react-query";
import { SubscriptionsApi, type SubscriptionFilters } from "@/app/api/subscriptions.api";

export type { SubscriptionFilters };

export function useSubscriptions(filters?: SubscriptionFilters) {
  return useQuery({
    queryKey: ["subscriptions", filters],
    queryFn: async () => {
      const response = await SubscriptionsApi.getAll(filters);
      return response.subscriptions;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes - subscriptions don't change often
  });
}