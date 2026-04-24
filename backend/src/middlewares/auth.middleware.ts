import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_DEFAULT_CONFIG } from "../config/jwtConfig.js";
import type { AccessTokenPayload } from "../types/tokens.types.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.cookies["auth-token"];

  if (!token) {
    return res.status(401).json({ message: "Authentication required. Please log in." });
  }

  try {
    
    const decoded = jwt.verify(token, JWT_DEFAULT_CONFIG.secret) as AccessTokenPayload;

    // Check if it's actually an access token (defense against token swapping)
    if (decoded.tokenType !== "access") {
      return res.status(401).json({ message: "Invalid token type." });
    }

    // Attach user data to the request object
    req.user = {
      id: decoded.sub,
      email: decoded.email || "",
    };

    next();
  } catch (error: any) {
    // Handle expired vs invalid tokens
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please refresh." });
    }
    return res.status(401).json({ message: "Invalid or tampered token." });
  }
};