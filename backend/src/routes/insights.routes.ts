import { Router } from "express";
import * as InsightsController from "../controllers/insights.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

/**
 * GET /api/insights
 */
router.get("/", InsightsController.getInsights);

export default router;