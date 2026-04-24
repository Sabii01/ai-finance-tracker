import type { Request, Response } from "express";
import * as SubscriptionService from "../services/subscription.service.js";
import type { 
  CreateSubscriptionInput, 
  UpdateSubscriptionInput, 
  GetSubscriptionsQuery 
} from "../schemas/subscription.schema.js";

/**
 * Create a new subscription (and first expense)
 */
export const createSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = req.body as CreateSubscriptionInput;
    const subscription = await SubscriptionService.createSubscription(req.user.id, data);

    return res.status(201).json({
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error: any) {
    console.error("Create subscription error:", error);
    return res.status(400).json({
      message: error.message || "Failed to create subscription",
    });
  }
};

/**
 * Get all subscriptions with optional filters
 */
export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const filters = req.query as GetSubscriptionsQuery;
    const subscriptions = await SubscriptionService.getSubscriptions(req.user.id, filters);

    return res.status(200).json({
      subscriptions,
      count: subscriptions.length,
    });
  } catch (error: any) {
    console.error("Get subscriptions error:", error);
    return res.status(400).json({
      message: error.message || "Failed to fetch subscriptions",
    });
  }
};

/**
 * Get a single subscription by ID
 */
export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if(typeof id !== "string") throw new Error("Id must be string");
    const subscription = await SubscriptionService.getSubscriptionById(req.user.id, id);

    return res.status(200).json({ subscription });
  } catch (error: any) {
    console.error("Get subscription error:", error);
    
    if (error.message === "Subscription not found") {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(400).json({
      message: error.message || "Failed to fetch subscription",
    });
  }
};

/**
 * Update a subscription
 */
export const updateSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if(typeof id !== "string") throw new Error("Id must be string");
    const data = req.body as UpdateSubscriptionInput;
    
    const subscription = await SubscriptionService.updateSubscription(req.user.id, id, data);

    return res.status(200).json({
      message: "Subscription updated successfully",
      subscription,
    });
  } catch (error: any) {
    console.error("Update subscription error:", error);
    
    if (error.message === "Subscription not found") {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(400).json({
      message: error.message || "Failed to update subscription",
    });
  }
};

/**
 * Delete a single subscription
 */
export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if(typeof id !== "string") throw new Error("Id must be string");
    await SubscriptionService.deleteSubscription(req.user.id, id);

    return res.status(200).json({
      message: "Subscription deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete subscription error:", error);
    
    if (error.message === "Subscription not found") {
      return res.status(404).json({ message: error.message });
    }
    
    return res.status(400).json({
      message: error.message || "Failed to delete subscription",
    });
  }
};

/**
 * Delete all subscriptions for the authenticated user
 */
export const deleteAllSubscriptions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

  
    const result = await SubscriptionService.deleteAllSubscriptions(req.user.id);

    return res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} subscriptions`,
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error("Delete all subscriptions error:", error);
    return res.status(400).json({
      message: error.message || "Failed to delete subscriptions",
    });
  }
};