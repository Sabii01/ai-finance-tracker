
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_CONFIG, getGeminiApiKey } from "../config/aiConfig.js";

/**
 * Initialize Gemini AI
 */
let genAI: GoogleGenerativeAI;
let model: any;

function initializeGemini() {
  if (!genAI) {
    const apiKey = getGeminiApiKey();
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: AI_CONFIG.model,
      generationConfig: AI_CONFIG.generationConfig,
      safetySettings: AI_CONFIG.safetySettings,
    });
  }
  return model;
}

/**
 * Categorize an expense using AI
 * 
 * @param description - Expense description (e.g., "Coffee at Starbucks")
 * @param amount - Expense amount (e.g., 5.50)
 * @returns Category name (e.g., "Food")
 */
export async function categorizeExpense(
  description: string,
  amount: number
): Promise<string> {
  try {
    const model = initializeGemini();
    console.log("AI Categorization happened");
    const prompt = `You are a financial categorization expert. Categorize the following expense into ONE of these categories:

${AI_CONFIG.categories.join(", ")}

Expense Details:
- Description: "${description}"
- Amount: ₹${amount}

Rules:
1. Return ONLY the category name, nothing else
2. Choose the MOST specific category that fits
3. If unsure, use "Other"
4. Be consistent - similar expenses should get the same category

Examples:
- "Coffee at Starbucks" → Food
- "Uber to airport" → Transport
- "Netflix subscription" → Entertainment
- "Amazon Prime subscription" → Entertainment
- "Electricity bill" → Utilities
- "Running shoes" → Shopping
- "Gym membership" → Fitness

Category:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const category = response.text().trim();
    
    // Validate category is in allowed list
    if (AI_CONFIG.categories.includes(category)) {
      console.log("AI Categorization happened")
      console.log(`✨ AI categorized expense "${description}" as: ${category}`);
      return category;
    } else {
      console.warn(`AI returned invalid category "${category}", using "Other"`);
      return "Other";
    }
  } catch (error: any) {
    console.error("AI categorization error:", error.message);
    // Fallback to "Other" if AI fails
    return "Other";
  }
}

/**
 * Categorize a subscription using AI
 * 
 * @param name - Subscription name (e.g., "Netflix")
 * @param price - Subscription price (e.g., 12.99)
 * @returns Category name (e.g., "Entertainment")
 */
export async function categorizeSubscription(
  name: string,
  price: number
): Promise<string> {
  try {
    const model = initializeGemini();
    
    const prompt = `You are a financial categorization expert. Categorize the following subscription into ONE of these categories:

${AI_CONFIG.categories.join(", ")}

Subscription Details:
- Name: "${name}"
- Price: ₹${price}

Rules:
1. Return ONLY the category name, nothing else
2. Choose the MOST specific category that fits
3. If unsure, use "Other"
4. Be consistent - similar subscriptions should get the same category

Common Subscriptions Example:
- Netflix, Hulu, Disney+ → Streaming
- Amazon Prime → Entertainment
- Spotify, Apple Music → Music
- GitHub, Figma, Adobe → Software
- NYTimes, WSJ → News
- Peloton, ClassPass → Fitness
- PlayStation Plus, Xbox → Gaming
- Dropbox, Google One → Cloud Storage

Category:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const category = response.text().trim();
    
    // Validate category is in allowed list
    if (AI_CONFIG.categories.includes(category)) {
      console.log(`✨ AI categorized subscription "${name}" as: ${category}`);
      return category;
    } else {
      console.warn(`AI returned invalid category "${category}", using "Other"`);
      return "Other";
    }
  } catch (error: any) {
    console.error("AI categorization error:", error.message);
    // Fallback to "Other" if AI fails
    return "Other";
  }
}

/**
 * Generate spending insights for a user
 * 
 * @param expenses - User's recent expenses
 * @param subscriptions - User's active subscriptions
 * @returns AI-generated insights
 */
export async function generateInsights(
  expenses: any[],
  subscriptions: any[]
): Promise<string> {
  try {
    const model = initializeGemini();
    
    // Calculate totals
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalSubscriptions = subscriptions
      .filter(s => s.status === "active")
      .reduce((sum, s) => sum + s.price, 0);
    
    // Group expenses by category
    const categorySpending: Record<string, number> = {};
    expenses.forEach(e => {
      const cat = e.category || "Other";
      categorySpending[cat] = (categorySpending[cat] || 0) + e.amount;
    });
    
    const prompt = `You are a personal finance advisor. Analyze this user's spending and provide helpful insights.

EXPENSES (Last 30 Days):
Total: $${totalExpenses.toFixed(2)}
By Category:
${Object.entries(categorySpending)
  .sort(([, a], [, b]) => b - a)
  .map(([cat, amount]) => `- ${cat}: ₹${amount.toFixed(2)}`)
  .join("\n")}

ACTIVE SUBSCRIPTIONS:
Total Monthly: ₹${totalSubscriptions.toFixed(2)}
${subscriptions
  .filter(s => s.status === "active")
  .map(s => `- ${s.name}: ₹${s.price}/${s.billingCycle}`)
  .join("\n") || "None"}

Provide 3-4 personalized insights:
1. Top spending category observation
2. Subscription optimization tip (if applicable)
3. Budget-friendly recommendation
4. Positive reinforcement or encouragement

Keep it:
- Friendly and conversational
- Specific to their data
- Actionable
- Under 200 words

Insights:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const insights = response.text().trim();
    
    console.log("✨ AI generated insights successfully");
    return insights;
  } catch (error: any) {
    console.error("AI insights generation error:", error.message);
    return "Unable to generate insights at this time. Please try again later.";
  }
}