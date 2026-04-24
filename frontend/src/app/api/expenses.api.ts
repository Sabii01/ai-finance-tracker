// frontend/src/app/api/expenses.api.ts
import { httpClient } from "@/lib/httpClient";

export interface Expense {
  id: string;
  amount: number;
  description?: string;
  category?: string;
  status: "completed" | "pending";
  isAnomaly?: boolean;
  date: string;
  subscriptionId?: string;
}

export interface CreateExpenseInput {
  amount: number;
  description?: string;
  category?: string;
  status?: "completed" | "pending";
  date?: string; // ISO date string
  subscriptionId?: string;
}

export interface UpdateExpenseInput {
  amount?: number;
  description?: string;
  category?: string;
  status?: "completed" | "pending";
  date?: string;
  subscriptionId?: string | null;
}

export interface ExpenseFilters {
  category?: string;
  status?: "completed" | "pending";
  startDate?: string; // ISO date string
  endDate?: string;   // ISO date string
}

export const ExpensesApi = {
  /**
   * Create a new expense
   */
  create: (data: CreateExpenseInput) => {
    return httpClient<{ message: string; expense: Expense }>("/api/expenses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Get all expenses with optional filters
   */
  getAll: (filters?: ExpenseFilters) => {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append("category", filters.category);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);
    
    const queryString = params.toString();
    const url = queryString ? `/api/expenses?${queryString}` : "/api/expenses";
    
    return httpClient<{ expenses: Expense[]; count: number }>(url, {
      method: "GET",
    });
  },

  /**
   * Get a single expense by ID
   */
  getById: (id: string) => {
    return httpClient<{ expense: Expense }>(`/api/expenses/${id}`, {
      method: "GET",
    });
  },

  /**
   * Update an expense
   */
  update: (id: string, data: UpdateExpenseInput) => {
    return httpClient<{ message: string; expense: Expense }>(
      `/api/expenses/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  /**
   * Delete a single expense
   */
  delete: (id: string) => {
    return httpClient<{ message: string }>(`/api/expenses/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Delete all expenses (requires confirmation)
   */
  deleteAll: () => {
    return httpClient<{ message: string; deletedCount: number }>(
      "/api/expenses?confirm=true",
      {
        method: "DELETE",
      }
    );
  },
};