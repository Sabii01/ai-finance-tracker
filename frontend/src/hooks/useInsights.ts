// frontend/src/hooks/useInsights.ts
import { useMutation } from "@tanstack/react-query";
import { InsightsApi } from "@/app/api/insights.api";

/**
 * Hook to fetch AI insights on demand
 * Using mutation instead of query because insights are expensive to generate
 * and should only be fetched when user explicitly requests them
 */
export function useInsights() {
  return useMutation({
    mutationFn: () => InsightsApi.get(),
    onError: (error) => {
      console.error("Failed to fetch insights:", error);
    },
  });
}