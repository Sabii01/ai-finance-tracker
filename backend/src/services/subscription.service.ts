import { prisma } from "../lib/prisma.js";
import { logAction } from "../lib/audit.js";
import type { 
  CreateSubscriptionInput, 
  UpdateSubscriptionInput, 
  GetSubscriptionsQuery 
} from "../schemas/subscription.schema.js";
import { categorizeSubscription } from "./ai.service.js";

/**
 * Create a new subscription AND first expense
 */
export async function createSubscription(userId: string, data: CreateSubscriptionInput) {
  // Create subscription and first expense in a transaction
    // ✨ Auto-categorize with AI if no category provided
  let category = data.category;
  if (!category) {
    category = await categorizeSubscription(data.name, data.price);
  }
  const result = await prisma.$transaction(async (tx) => {
    // 1. Create the subscription
    const subscription = await tx.subscription.create({
      data: {
        userId,
        name: data.name,
        category: category,
        price: data.price,
        billingCycle: data.billingCycle,
        nextBillingDate: new Date(data.nextBillingDate),
        status: data.status || "active",
        ...(data.paymentMethod && { paymentMethod: data.paymentMethod }),
      },
      select: {
        id: true,
        subscriptionId: true,
        name: true,
        category: true,
        price: true,
        billingCycle: true,
        nextBillingDate: true,
        status: true,
        paymentMethod: true,
        isAnomaly: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 2. Create the first expense (initial payment)
    const expense = await tx.expense.create({
      data: {
        userId,
        amount: data.price,
        description: `${data.name} subscription - Initial payment`,
        category: category,
        status: "completed",
        date: new Date(), // Today's date
        subscriptionId: subscription.id,
      },
    });

    return { subscription, expense };
  });

  // 3. Log the action
  await logAction(
    userId,
    "CREATE_SUBSCRIPTION",
    "Subscription",
    result.subscription.id
  );

  return result.subscription;
}

/**
 * Get all subscriptions for a user with optional filtering
 */
export async function getSubscriptions(userId: string, filters: GetSubscriptionsQuery) {
  const where: any = { userId };

  // Status filter
  if (filters.status) {
    where.status = filters.status;
  }

  // Category filter
  if (filters.category) {
    where.category = filters.category;
  }

  const subscriptions = await prisma.subscription.findMany({
    where,
    orderBy: {
      createdAt: "desc", // Most recent first
    },
    select: {
      id: true,
      subscriptionId: true,
      name: true,
      category: true,
      price: true,
      billingCycle: true,
      nextBillingDate: true,
      status: true,
      paymentMethod: true,
      isAnomaly: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return subscriptions;
}

/**
 * Get a single subscription by ID
 */
export async function getSubscriptionById(userId: string, subscriptionId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      id: subscriptionId,
      userId, 
    },
    select: {
      id: true,
      subscriptionId: true,
      name: true,
      category: true,
      price: true,
      billingCycle: true,
      nextBillingDate: true,
      status: true,
      paymentMethod: true,
      isAnomaly: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  return subscription;
}

/**
 * Update a subscription
 */
export async function updateSubscription(
  userId: string,
  subscriptionId: string,
  data: UpdateSubscriptionInput
) {
  // First check if subscription exists and belongs to user
  const existing = await prisma.subscription.findFirst({
    where: {
      id: subscriptionId,
      userId,
    },
  });

  if (!existing) {
    throw new Error("Subscription not found");
  }

  // Update the subscription
  const updated = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.billingCycle !== undefined && { billingCycle: data.billingCycle }),
      ...(data.nextBillingDate !== undefined && { nextBillingDate: new Date(data.nextBillingDate) }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.paymentMethod !== undefined && { paymentMethod: data.paymentMethod }),
    },
    select: {
      id: true,
      subscriptionId: true,
      name: true,
      category: true,
      price: true,
      billingCycle: true,
      nextBillingDate: true,
      status: true,
      paymentMethod: true,
      isAnomaly: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Log the action
  await logAction(
    userId,
    "UPDATE_SUBSCRIPTION",
    "Subscription",
    subscriptionId
  );

  return updated;
}

/**
 * Delete a single subscription
 * Also deletes all linked expenses (cascade)
 */
export async function deleteSubscription(userId: string, subscriptionId: string) {
  // First check if subscription exists and belongs to user
  const existing = await prisma.subscription.findFirst({
    where: {
      id: subscriptionId,
      userId,
    },
  });

  if (!existing) {
    throw new Error("Subscription not found");
  }

  await prisma.subscription.delete({
    where: { id: subscriptionId },

  });

  // Log the action
  await logAction(
    userId,
    "DELETE_SUBSCRIPTION",
    "Subscription",
    subscriptionId
  );

  return { success: true };
}

/**
 * Delete all subscriptions for a user
 */
export async function deleteAllSubscriptions(userId: string) {
  const result = await prisma.subscription.deleteMany({
    where: { userId },
  });

  await logAction(
    userId,
    "DELETE_ALL_SUBSCRIPTIONS",
    "Subscription",
    null as any
  );

  return {
    success: true,
    deletedCount: result.count,
  };
}