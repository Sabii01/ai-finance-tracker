// frontend/src/app/api/subscriptions.api.ts
import { httpClient } from "@/lib/httpClient";

export interface Subscription {
  id: string;
  subscriptionId?: string;
  name: string;
  category: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
  status: "active" | "paused" | "cancelled";
  paymentMethod?: string;
  isAnomaly?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionInput {
  name: string;
  category?: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string; // ISO date string
  paymentMethod?: string;
  status?: "active" | "paused" | "cancelled";
}

export interface UpdateSubscriptionInput {
  name?: string;
  category?: string;
  price?: number;
  billingCycle?: "monthly" | "yearly";
  nextBillingDate?: string;
  paymentMethod?: string;
  status?: "active" | "paused" | "cancelled";
}

export interface SubscriptionFilters {
  status?: "active" | "paused" | "cancelled";
  category?: string;
}

export const SubscriptionsApi = {
  /**
   * Create a new subscription (also creates first expense)
   */
  create: (data: CreateSubscriptionInput) => {
    return httpClient<{ message: string; subscription: Subscription }>("/api/subscriptions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Get all subscriptions with optional filters
   */
  getAll: (filters?: SubscriptionFilters) => {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append("status", filters.status);
    if (filters?.category) params.append("category", filters.category);
    
    const queryString = params.toString();
    const url = queryString ? `/api/subscriptions?${queryString}` : "/api/subscriptions";
    
    return httpClient<{ subscriptions: Subscription[]; count: number }>(url, {
      method: "GET",
    });
  },

  /**
   * Get a single subscription by ID
   */
  getById: (id: string) => {
    return httpClient<{ subscription: Subscription }>(`/api/subscriptions/${id}`, {
      method: "GET",
    });
  },

  /**
   * Update a subscription
   */
  update: (id: string, data: UpdateSubscriptionInput) => {
    return httpClient<{ message: string; subscription: Subscription }>(
      `/api/subscriptions/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  /**
   * Delete a single subscription
   */
  delete: (id: string) => {
    return httpClient<{ message: string }>(`/api/subscriptions/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Delete all subscriptions (requires confirmation)
   */
  deleteAll: () => {
    return httpClient<{ message: string; deletedCount: number }>(
      "/api/subscriptions?confirm=true",
      {
        method: "DELETE",
      }
    );
  },
};