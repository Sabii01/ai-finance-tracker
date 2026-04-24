// Note: We import from your CUSTOM generated path
import { PrismaClient } from "../generated/prisma/client.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Helpful for debugging your chart data later!
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;