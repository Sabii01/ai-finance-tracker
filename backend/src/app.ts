  import express from "express";
  import cors from "cors";
  import cookieParser from "cookie-parser";
  import dotenv from "dotenv";
  import authRoutes from "./routes/auth.routes.js";
  import { errorHandler } from "./middlewares/error.middleware.js";
  import expenseRoutes from "./routes/expense.routes.js";
  import subscriptionRoutes from "./routes/subscription.routes.js";
  import insightsRoutes from "./routes/insights.routes.js";

  dotenv.config();

  const app = express();

  // Middlewares
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true // Required for cookies
  }));
  app.use(express.json());
  app.use(cookieParser());

  // Health Check
  app.use("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/expenses", expenseRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);
  app.use("/api/insights", insightsRoutes);
  
  app.use(errorHandler);
  export default app;