import type { jwtTypes } from "../types/jwt.types.js";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("Environment variable JWT_SECRET must be defined");
}

export const JWT_DEFAULT_CONFIG: jwtTypes = {
    secret,
    accessTokenTTL: Number(process.env.JWT_ACCESS_TOKEN_TTL ?? 3600),
    issuedAt: new Date(),
} as jwtTypes;