import { Router } from "express";
import * as SubscriptionController from "../controllers/subscription.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createSubscriptionSchema,
  getSubscriptionsSchema,
  getSubscriptionSchema,
  updateSubscriptionSchema,
  deleteSubscriptionSchema,
  deleteAllSubscriptionsSchema,
} from "../schemas/subscription.schema.js";

const router = Router();

router.use(authenticate);

/**
 * Get all subscriptions with optional filters
 */
router.get(
  "/",
  validate(getSubscriptionsSchema),
  SubscriptionController.getSubscriptions
);

/**
 * Create a new subscription (also creates first expense)
 */
router.post(
  "/",
  validate(createSubscriptionSchema),
  SubscriptionController.createSubscription
);

/**
 * Get a single subscription by ID
 */
router.get(
  "/:id",
  validate(getSubscriptionSchema),
  SubscriptionController.getSubscriptionById
);

/**
 * Update a subscription
 */
router.put(
  "/:id",
  validate(updateSubscriptionSchema),
  SubscriptionController.updateSubscription
);

/*
 * Delete a single subscription
 */
router.delete(
  "/:id",
  validate(deleteSubscriptionSchema),
  SubscriptionController.deleteSubscription
);

/*
 * Delete all subscriptions for the authenticated user
 */
router.delete(
  "/",
  validate(deleteAllSubscriptionsSchema),
  SubscriptionController.deleteAllSubscriptions
);

export default router;