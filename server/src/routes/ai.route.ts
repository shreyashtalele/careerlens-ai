import { Router } from "express";

import { testAI } from "../controllers/ai.controller.js";
import { generateAIResumeReviewController } from "../controllers/ai-resume-review.controller.js";
import validateRequest from "../middlewares/validate.middleware.js";
import { generateAIResumeReviewSchema } from "../validators/ai-resume-review.validator.js";

const router = Router();

// Gemini connection test
router.get("/test", testAI);

// AI Resume Review
router.post(
  "/resume-review",
  validateRequest(generateAIResumeReviewSchema),
  generateAIResumeReviewController,
);

export default router;
