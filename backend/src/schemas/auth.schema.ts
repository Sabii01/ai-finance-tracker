import { z } from "zod";

/**
 * Enhanced email validator with stricter rules
 */
const email = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email format")
  .refine(
    (email) => {
      // Check for common email providers or proper domain format
      const domain = email.split("@")[1];
      if (!domain) return false;
      if (!domain.includes(".")) return false;
      
      // TLD (top-level domain) must be at least 2 characters
      const tld = domain.split(".").pop();
      if (!tld || tld.length < 2) return false;
      
      return true;
    },
    { message: "Please enter a valid email address with a proper domain" }
  )
  .toLowerCase()
  .trim();

/**
 * Strong password validator
 * Requirements:
 * - 8-128 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)");

const name = z
  .string()
  .min(1, "Name cannot be empty")
  .max(100, "Name is too long")
  .trim()
  .optional();

/**
 * Signup Schema
 */
export const signupSchema = z.object({
  body: z.object({
    email,
    password,
    name,
  }),
});

/**
 * Login Schema (less strict - user may have old password)
 */
export const loginSchema = z.object({
  body: z.object({
    email,
    password: z.string().min(1, "Password is required"),
  }),
});

/**
 * Refresh Token Schema (validates cookie exists)
 */
export const refreshSchema = z.object({
  cookies: z.object({
    "refresh-token": z.string().min(1, "Refresh token is required"),
  }),
});

/**
 * Type exports for TypeScript
 */
export type SignupInput = z.infer<typeof signupSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];