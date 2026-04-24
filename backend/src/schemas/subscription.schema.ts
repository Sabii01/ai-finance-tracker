// backend/src/schemas/subscription.schema.ts
import { z } from "zod";

/**
 * Create Subscription Schema
 * Creates both subscription record AND first expense
 */
export const createSubscriptionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Subscription name is required")
      .max(100, "Name is too long"),
    
    category: z
      .string()
      .min(1, "Category is required")
      .max(100, "Category name is too long")
      .optional(),
    
    price: z
      .number({ error: "Price is required" })
      .positive("Price must be greater than 0")
      .finite("Price must be a valid number"),
    
    billingCycle: z
      .enum(["monthly", "yearly"] as const, {
        message: "Billing cycle must be 'monthly' or 'yearly'"
      }),
    
    nextBillingDate: z
      .string()
      .datetime({ message: "Invalid date format, use ISO 8601" }),
    
    paymentMethod: z
      .string()
      .max(50, "Payment method name is too long")
      .optional(),
    
    status: z
      .enum(["active", "paused", "cancelled"])
      .optional()
      .default("active"),
  }),
});

/**
 * Update Subscription Schema
 * All fields optional
 */
export const updateSubscriptionSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid subscription ID"),
  }),
  body: z.object({
    name: z
      .string()
      .min(1, "Subscription name cannot be empty")
      .max(100, "Name is too long")
      .optional(),
    
    category: z
      .string()
      .min(1, "Category cannot be empty")
      .max(100, "Category name is too long")
      .optional(),
    
    price: z
      .number()
      .positive("Price must be greater than 0")
      .finite("Price must be a valid number")
      .optional(),
    
    billingCycle: z
      .enum(["monthly", "yearly"])
      .optional(),
    
    nextBillingDate: z
      .string()
      .datetime({ message: "Invalid date format, use ISO 8601" })
      .optional(),
    
    paymentMethod: z
      .string()
      .max(50, "Payment method name is too long")
      .optional(),
    
    status: z
      .enum(["active", "paused", "cancelled"])
      .optional(),
  }),
});

/**
 * Get Subscriptions Query Schema
 * Supports filtering by status and category
 */
export const getSubscriptionsSchema = z.object({
  query: z.object({
    status: z
      .enum(["active", "paused", "cancelled"])
      .optional(),
    
    category: z
      .string()
      .max(100)
      .optional(),
  }),
});

/**
 * Get Single Subscription Schema
 */
export const getSubscriptionSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid subscription ID"),
  }),
});

/**
 * Delete Subscription Schema
 */
export const deleteSubscriptionSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid subscription ID"),
  }),
});

/**
 * Delete All Subscriptions Schema
 * Requires confirmation to prevent accidental deletions
 */
export const deleteAllSubscriptionsSchema = z.object({
  query: z.object({
    confirm: z
      .literal("true", {
        message: "Must set confirm=true to delete all subscriptions"
      }),
  }),
});

/**
 * Type exports for TypeScript
 */
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>["body"];
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>["body"];
export type GetSubscriptionsQuery = z.infer<typeof getSubscriptionsSchema>["query"];