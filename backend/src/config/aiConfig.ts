/**
 * AI Configuration for Gemini
 */
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { env } from "node:process";
/**
 * AI Configuration for Gemini
 * Using official Enums to resolve TypeScript 'string' vs 'HarmCategory' incompatibility.
 */
export const AI_CONFIG = {
  model: "gemini-2.5-flash-lite", 

  // Generation settings
  generationConfig: {
    temperature: 0.3, // Low temperature for consistent categorization
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1024,
  },

  // Safety settings (block harmful content)
  // These now use the proper Enum types required by the SDK
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],

  // Available categories for expenses and subscriptions
  categories: [
    "Food",
    "Utilities",
    "Transport",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Education",
    "Software",
    "Music",
    "Streaming",
    "Cloud Storage",
    "News",
    "Fitness",
    "Gaming",
    "Other",
  ] as const, 
};

/**
 * Get API key from environment
 */
export function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not defined in environment variables"
    );
  }
  
  return apiKey;
}