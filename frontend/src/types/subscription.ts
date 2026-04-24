// frontend/src/types/subscription.ts

export interface Subscription {
  id: string;
  subscriptionId?: string;
  name: string;
  category?: string;
  price: number; // Changed from 'amount' to 'price' to match backend
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
  status: "active" | "paused" | "cancelled";
  paymentMethod?: string;
  isAnomaly?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus = "active" | "paused" | "cancelled";
export type BillingCycle = "monthly" | "yearly";