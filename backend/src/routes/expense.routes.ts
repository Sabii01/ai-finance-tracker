import { Router } from "express";
import * as ExpenseController from "../controllers/expense.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createExpenseSchema,
  getExpensesSchema,
  getExpenseSchema,
  updateExpenseSchema,
  deleteExpenseSchema,
  deleteAllExpensesSchema,
} from "../schemas/expense.schema.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  validate(getExpensesSchema),
  ExpenseController.getExpenses
);

/**
 * Create a new expense
 */
router.post(
  "/",
  validate(createExpenseSchema),
  ExpenseController.createExpense
);

/**
 * Get a single expense by ID
 */
router.get(
  "/:id",
  validate(getExpenseSchema),
  ExpenseController.getExpenseById
);

/**
 * Update an expense
 */
router.put(
  "/:id",
  validate(updateExpenseSchema),
  ExpenseController.updateExpense
);

/**
 * Delete a single expense
 */
router.delete(
  "/:id",
  validate(deleteExpenseSchema),
  ExpenseController.deleteExpense
);

/**
 * DELETE
 */
router.delete(
  "/",
  validate(deleteAllExpensesSchema),
  ExpenseController.deleteAllExpenses
);

export default router;