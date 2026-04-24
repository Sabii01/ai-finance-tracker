import { DEFAULT_ARGON_CONFIG } from "../config/passwordConfig.js";
import type { argonConfig } from "../config/passwordConfig.js";
import argon2 from "argon2";

export class passwordUtility {
  private readonly config;
  
  constructor(config?: Partial<argonConfig>) {
    this.config = {
      ...DEFAULT_ARGON_CONFIG,
      ...config,
      type: argon2.argon2id,
    };
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const hash = await argon2.hash(password, this.config);
      return hash;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const isVerified = await argon2.verify(hash, password);
      return isVerified;
    } catch (error) {
      console.error("Error verifying password:", error);
      throw new Error("Failed to verify password");
    }
  }
}