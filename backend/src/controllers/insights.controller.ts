import type { Request, Response } from "express";
import { generateInsights } from "../services/ai.service.js";
import { prisma } from "../lib/prisma.js";

/**
 * Generate AI insights for user's spending
 */
export const getInsights = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.id,
        date: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        amount: true,
        category: true,
        description: true,
        date: true,
      },
    });

    // Get user's active subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: req.user.id,
        status: "active",
      },
      select: {
        name: true,
        price: true,
        billingCycle: true,
        status: true,
      },
    });

    // Generate insights with AI
    const insights = await generateInsights(expenses, subscriptions);

    return res.status(200).json({
      insights,
      expenseCount: expenses.length,
      subscriptionCount: subscriptions.length,
    });
  } catch (error: any) {
    console.error("Get insights error:", error);
    return res.status(500).json({
      message: error.message || "Failed to generate insights",
    });
  }
};