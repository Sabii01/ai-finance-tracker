// backend/src/routes/auth.routes.ts
import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema, loginSchema, refreshSchema } from "../schemas/auth.schema.js";

const router = Router();


router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout); 
router.post("/refresh", validate(refreshSchema), AuthController.refresh);
router.get("/me", authenticate, AuthController.getMe);
export default router;