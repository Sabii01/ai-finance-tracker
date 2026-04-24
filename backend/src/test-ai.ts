// backend/src/test-ai.ts
/**
 * Test file to verify Gemini AI integration
 * Run this to test AI categorization before integrating into endpoints
 * 
 * Usage: npx tsx src/test-ai.ts
 */

import { categorizeExpense, categorizeSubscription, generateInsights } from "./services/ai.service.js";

async function testAI() {
  console.log("Testing Gemini AI Integration...\n");
  
  // Test 1: Categorize expenses
  console.log("Test 1: Expense Categorization");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const testExpenses = [
    { description: "Coffee at Starbucks", amount: 5.50 },
    { description: "Uber to airport", amount: 45.00 },
    { description: "Grocery shopping at Whole Foods", amount: 120.00 },
    { description: "Doctor visit copay", amount: 30.00 },
    { description: "Running shoes from Nike", amount: 85.00 },
  ];
  
  for (const expense of testExpenses) {
    const category = await categorizeExpense(expense.description, expense.amount);
    console.log(`"${expense.description}" → ${category}`);
  }
  
  console.log("\n");
  
  // Test 2: Categorize subscriptions
  console.log("Test 2: Subscription Categorization");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const testSubscriptions = [
    { name: "Netflix", price: 12.99 },
    { name: "Spotify Premium", price: 9.99 },
    { name: "GitHub Pro", price: 7.00 },
    { name: "ChatGPT Plus", price: 20.00 },
    { name: "Planet Fitness", price: 10.00 },
  ];
  
  for (const sub of testSubscriptions) {
    const category = await categorizeSubscription(sub.name, sub.price);
    console.log(`"${sub.name}" → ${category}`);
  }
  
  console.log("\n");
  
  // Test 3: Generate insights
  console.log("Test 3: Spending Insights");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const mockExpenses = [
    { amount: 50, category: "Food" },
    { amount: 120, category: "Food" },
    { amount: 45, category: "Transport" },
    { amount: 30, category: "Healthcare" },
    { amount: 85, category: "Shopping" },
  ];
  
  const mockSubscriptions = [
    { name: "Netflix", price: 12.99, status: "active", billingCycle: "monthly" },
    { name: "Spotify", price: 9.99, status: "active", billingCycle: "monthly" },
    { name: "GitHub", price: 7.00, status: "active", billingCycle: "monthly" },
  ];
  
  const insights = await generateInsights(mockExpenses, mockSubscriptions);
  console.log("AI Insights:");
  console.log("─────────────────────────────────────");
  console.log(insights);
  console.log("─────────────────────────────────────");
  
  console.log("\n✅ All tests completed!\n");
}

// Run tests
testAI().catch(console.error);