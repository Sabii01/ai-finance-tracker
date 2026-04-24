// frontend/src/app/api/insights.api.ts
import { httpClient } from "@/lib/httpClient";

export interface InsightsResponse {
  insights: string;
  expenseCount: number;
  subscriptionCount: number;
}

export const InsightsApi = {
  /**
   * Get AI-generated spending insights
   */
  get: () => {
    return httpClient<InsightsResponse>("/api/insights", {
      method: "GET",
    });
  },
};