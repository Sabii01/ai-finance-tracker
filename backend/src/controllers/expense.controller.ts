import type { Request, Response } from "express";
import * as ExpenseService from "../services/expense.service.js";
import type { CreateExpenseInput, UpdateExpenseInput, GetExpensesQuery } from "../schemas/expense.schema.js";

/**
 * Create a new expense
 */
export const createExpense = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = req.body as CreateExpenseInput;
    const expense = await ExpenseService.createExpense(req.user.id, data);

    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error: any) {
    console.error("Create expense error:", error);
    return res.status(400).json({
      message: error.message || "Failed to create expense",
    });
  }
};

/**
 * Get all expenses with optional filters
 */
export const getExpenses = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filters = req.query as GetExpensesQuery;
    const expenses = await ExpenseService.getExpenses(req.user.id, filters);

    return res.status(200).json({
      expenses,
      count: expenses.length,
    });
  } catch (error: any) {
    console.error("Get expenses error:", error);
    return res.status(400).json({
      message: error.message || "Failed to fetch expenses",
    });
  }
};

/**
 * Get a single expense by ID
 */
export const getExpenseById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if(typeof id !== "string") throw new Error("Id is not string");
    const expense = await ExpenseService.getExpenseById(req.user.id, id!);

    return res.status(200).json({ expense });
  } catch (error: any) {
    console.error("Get expense error:", error);
    
    if (error.message === "Expense not found") {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(400).json({
      message: error.message || "Failed to fetch expense",
    });
  }
};

/**
 * Update an expense
 */
export const updateExpense = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const data = req.body as UpdateExpenseInput;
    if(typeof id !== "string") throw new Error("Id is not string");
    const expense = await ExpenseService.updateExpense(req.user.id, id, data);

    return res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error: any) {
    console.error("Update expense error:", error);
    
    if (error.message === "Expense not found") {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(400).json({
      message: error.message || "Failed to update expense",
    });
  }
};

/**
 * Delete a single expense
 */
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if(typeof id !== "string") return;
    await ExpenseService.deleteExpense(req.user.id, id);

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete expense error:", error);
    
    if (error.message === "Expense not found") {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(400).json({
      message: error.message || "Failed to delete expense",
    });
  }
};

/**
 * Delete all expenses for the authenticated user
 */
export const deleteAllExpenses = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await ExpenseService.deleteAllExpenses(req.user.id);

    return res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} expenses`,
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error("Delete all expenses error:", error);
    return res.status(400).json({
      message: error.message || "Failed to delete expenses",
    });
  }
};