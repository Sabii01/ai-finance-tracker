import { prisma } from "./prisma.js";

export const logAction = async (
  userId: string, 
  action: string, 
  entity?: string, 
  entityId?: string, 
  details?: any | undefined
) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity: entity ?? null,
        entityId: entityId ?? null,
        details: details ?? {},
      },
    });
  } catch (err) {
    console.error("Failed to create audit log:", err);
  }
};