import type { Request, Response, NextFunction } from "express";
import type {  ZodSchema} from "zod";
import { ZodError } from "zod";

/**
 * Validation middleware factory
 * 
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 * 
 * @example
 * router.post('/signup', validate(signupSchema), signup);
 */
export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the entire request (body, params, query, cookies)
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError && error !== undefined) {
        // Format Zod errors into a user-friendly response
         console.log("in validate.middleware")
        const formattedErrors = error.issues.map((issue) => ({
         
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors: formattedErrors,
        });
      }

      // If it's not a Zod error, pass it to the error handler
      next(error);
    }
  };
};