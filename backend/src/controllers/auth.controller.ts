import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service.js";
import { prisma } from "../lib/prisma.js";
import { logAction } from "../lib/audit.js";
import type { SignupInput, LoginInput } from "../schemas/auth.schema.js";
import { passwordUtility } from "../utils/passwordUtility.js";
const passUtil = new passwordUtility();
// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 Minutes
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 Days

export const signup = async (req: Request, res: Response) => {
  console.log("Sign Up route hit!");
  try {
    // req.body is now type-safe thanks to Zod validation
    const { email, password, name } = req.body as SignupInput;
    
    const result = await AuthService.signUp({ email, password,...(name && { name }) });

    console.log("\n", result.accessToken);
    // Set Cookies
    res.cookie("auth-token", result.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("refresh-token", result.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_EXPIRY,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: result.user,
    });
  } catch (error: any) {
    // Handle database unique constraint errors
    if (error.code === "P2002") {
      return res.status(409).json({ 
        message: "Email already registered",
        errors: [{ field: "email", message: "This email is already in use" }]
      });
    }
    
    return res.status(400).json({ message: error.message || "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("Login Route Hit!");
  try {
    const { email, password } = req.body as LoginInput;
    
    const result = await AuthService.login({ email, password });
    await logAction(result.user.id, "USER_LOGIN", "User", result.user.id);

    res.cookie("auth-token", result.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("refresh-token", result.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_EXPIRY,
    });

    return res.status(200).json({
      message: "Login successful",
      user: result.user,
    });
  } catch (error: any) {
    return res.status(401).json({ message: error.message || "Login failed" });
  }
};

export const logout = async (req: Request, res: Response) => {
  console.log("Logout Route Hit");
  try {
    const refreshToken = req.cookies["refresh-token"];

    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }

    res.clearCookie("auth-token");
    res.clearCookie("refresh-token");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

export const logoutAll = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    await AuthService.logoutAll(userId);

    res.clearCookie("auth-token");
    res.clearCookie("refresh-token");

    return res.status(200).json({ message: "Logged out from all devices" });
  } catch (error) {
    return res.status(500).json({ message: "Global logout failed" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  console.log("Refresh route hit");
  try {
  
    const oldRefreshToken = req.cookies["refresh-token"];

    const result = await AuthService.refreshSession(oldRefreshToken);

  
    res.cookie("auth-token", result.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("refresh-token", result.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_EXPIRY,
    });

    return res.status(200).json({ user: result.user });
  } catch (error: any) {

    res.clearCookie("auth-token");
    res.clearCookie("refresh-token");
    return res.status(401).json({ message: error.message || "Session expired" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("User does not exist");
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};