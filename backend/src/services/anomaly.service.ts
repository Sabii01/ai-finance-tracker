import {prisma} from "../lib/prisma.js"

export const AnomalyService = {
  /**
   * Checks if a new expense is an anomaly based on user history
   */
  async detectExpenseAnomaly(userId: string, category: string, amount: number): Promise<boolean> {
    // 1. Fetch the last 10 expenses in this category for the user
    const historicalExpenses = await prisma.expense.findMany({
      where: { userId, category },
      orderBy: { date: 'desc' },
      take: 10,
    });

    // If they don't have enough history, we can't accurately call it an anomaly yet
    if (historicalExpenses.length < 3) return false;

    // 2. Calculate Average
    const sum = historicalExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    const average = sum / historicalExpenses.length;

    // 3. Logic: If current amount is > 2.5x the average, flag it
    // You can adjust this multiplier based on how sensitive you want the AI to be
    const threshold = average * 2.5;

    if (amount > threshold) {
      console.log(`[Anomaly Detected] User ${userId}: ${amount} is significantly higher than avg ${average}`);
      return true;
    }

    return false;
  }
};
