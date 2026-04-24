import type { Request, Response, NextFunction } from "express";
import { ZodError} from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    console.log("Zod issue")
    const errors = err.issues.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  // Handle Prisma errors
// Add type guard for Prisma errors
if (err && typeof err === 'object' && 'code' in err && err.code === "P2002") {
  const prismaError = err as any; // Safe to use 'any' here after type guard
  return res.status(409).json({
    message: "Duplicate entry",
    errors: [
      {
        field: prismaError.meta?.target?.[0] || "unknown",
        message: `This ${prismaError.meta?.target?.[0] || "field"} is already in use`,
      },
    ],
  });
}

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  // Default error
  console.error("Error:", err);
  
  return res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
};