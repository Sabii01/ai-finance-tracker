import { prisma } from "../lib/prisma.js";
import type {
  CreateExpenseInput,
  UpdateExpenseInput,
  GetExpensesQuery,
} from "../schemas/expense.schema.js";
import { categorizeExpense } from "./ai.service.js";
/**
 * Create a new expense
 */
export async function createExpense(userId: string, data: CreateExpenseInput) {
    // ✨ Auto-categorize with AI if no category provided
  let category = data.category;
  if (!category) {
    category = await categorizeExpense(
      data.description || "Expense", 
      data.amount
    );
  }
  const expense = await prisma.expense.create({
    data: {
      userId,
      amount: data.amount,
      ...(data.description && { description: data.description }),
      category: category,
      status: data.status || "completed",
      date: data.date ? new Date(data.date) : new Date(),
      ...(data.subscriptionId && { subscriptionId: data.subscriptionId }),
    },
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      status: true,
      date: true,
      isAnomaly: true,
      subscriptionId: true,
    },
  });

  return expense;
}

/**
 * Get all expenses for a user with optional filtering
 */
export async function getExpenses(userId: string, filters: GetExpensesQuery) {
  const where: any = { userId };

  // Category filter
  if (filters.category) {
    where.category = filters.category;
  }

  // Status filter
  if (filters.status) {
    where.status = filters.status;
  }

  // Date range filter
  if (filters.startDate || filters.endDate) {
    where.date = {};

    if (filters.startDate) {
      where.date.gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      where.date.lte = new Date(filters.endDate);
    }
  }

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: {
      date: "desc", // Most recent first
    },
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      status: true,
      date: true,
      isAnomaly: true,
      subscriptionId: true,
    },
  });

  return expenses;
}

/**
 * Get a single expense by ID
 */
export async function getExpenseById(userId: string, expenseId: string) {
  const expense = await prisma.expense.findFirst({
    where: {
      id: expenseId,
      userId, // Security: user can only access their own expenses
    },
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      status: true,
      date: true,
      isAnomaly: true,
      subscriptionId: true,
    },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
}

/**
 * Update an expense
 */
export async function updateExpense(
  userId: string,
  expenseId: string,
  data: UpdateExpenseInput
) {
 
  const existing = await prisma.expense.findFirst({
    where: {
      id: expenseId,
      userId,
    },
  });

  if (!existing) {
    throw new Error("Expense not found");
  }

  // Update the expense
  const updated = await prisma.expense.update({
    where: { id: expenseId },
    data: {
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.date !== undefined && { date: new Date(data.date) }),
      ...(data.subscriptionId !== undefined && {
        subscriptionId: data.subscriptionId,
      }),
    },
    select: {
      id: true,
      amount: true,
      description: true,
      category: true,
      status: true,
      date: true,
      isAnomaly: true,
      subscriptionId: true,
    },
  });

  return updated;
}

/**
 * Delete a single expense
 */
export async function deleteExpense(userId: string, expenseId: string) {
  // First check if expense exists and belongs to user
  const existing = await prisma.expense.findFirst({
    where: {
      id: expenseId,
      userId,
    },
  });

  if (!existing) {
    throw new Error("Expense not found");
  }

  await prisma.expense.delete({
    where: { id: expenseId },
  });

  return { success: true };
}

/**
 * Delete all expenses for a user
 */
export async function deleteAllExpenses(userId: string) {
  const result = await prisma.expense.deleteMany({
    where: { userId },
  });

  return {
    success: true,
    deletedCount: result.count,
  };
}
