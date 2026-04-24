// backend/src/schemas/expense.schema.ts
import { z } from "zod";

/**
 * Create Expense Schema
 * Required: amount
 * Optional: description, category (AI adds later), date (defaults to now), status (defaults to completed)
 */
export const createExpenseSchema = z.object({
  body: z.object({
    amount: z
      .number({ error: "Amount is required" })
      .positive("Amount must be greater than 0")
      .finite("Amount must be a valid number"),

    description: z.string().max(500, "Description is too long").optional(),

    category: z.string().max(100, "Category name is too long").optional(),

    date: z
      .string()
      .datetime({ message: "Invalid date format, use ISO 8601" })
      .optional(), // Defaults to current date if not provided

    status: z.enum(["completed", "pending"]).optional().default("completed"),

    subscriptionId: z.string().uuid("Invalid subscription ID").optional(), // Links to subscription if auto-generated
  }),
});

/**
 * Update Expense Schema
 * All fields optional
 */
export const updateExpenseSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid expense ID"),
  }),
  body: z.object({
    amount: z
      .number()
      .positive("Amount must be greater than 0")
      .finite("Amount must be a valid number")
      .optional(),

    description: z.string().max(500, "Description is too long").optional(),

    category: z.string().max(100, "Category name is too long").optional(),

    date: z
      .string()
      .datetime({ message: "Invalid date format, use ISO 8601" })
      .optional(),

    status: z.enum(["completed", "pending"]).optional(),

    subscriptionId: z
      .string()
      .uuid("Invalid subscription ID")
      .nullable() // Can be set to null to unlink
      .optional(),
  }),
});

/**
 * Get Expenses Query Schema
 * Supports filtering by category, status, and date range
 */
export const getExpensesSchema = z.object({
  query: z.object({
    category: z.string().max(100).optional(),

    status: z.enum(["completed", "pending"]).optional(),

    // Date range filtering
    startDate: z
      .string()
      .datetime({ message: "Invalid startDate format, use ISO 8601" })
      .optional(),

    endDate: z
      .string()
      .datetime({ message: "Invalid endDate format, use ISO 8601" })
      .optional(),
  }),
});

/**
 * Get Single Expense Schema
 */
export const getExpenseSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid expense ID"),
  }),
});

/**
 * Delete Expense Schema
 */
export const deleteExpenseSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid expense ID"),
  }),
});

/**
 * Delete All Expenses Schema
 * Requires confirmation query param to prevent accidental deletions
 */
export const deleteAllExpensesSchema = z.object({
  query: z.object({
    confirm: z.literal("true", {
      error: "Must set confirm=true to delete all expenses",
    }),
  }),
});

/**
 * Type exports for TypeScript
 */
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>["body"];
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>["body"];
export type GetExpensesQuery = z.infer<typeof getExpensesSchema>["query"];
