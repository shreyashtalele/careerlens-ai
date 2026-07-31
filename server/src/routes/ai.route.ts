import { Router } from "express";

import { testAI } from "../controllers/ai.controller.js";
import { generateAIResumeReviewController } from "../controllers/ai-resume-review.controller.js";
import validateRequest from "../middlewares/validate.middleware.js";
import { generateAIResumeReviewSchema } from "../validators/ai-resume-review.validator.js";
import { generateInterviewQuestionsController } from "../controllers/interview-question-generator.controller.js";
import { generateInterviewQuestionsSchema } from "../validators/interview-question-generator.validator.js";

import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

// Gemini connection test
router.get("/test", testAI);

// AI Resume Review
router.post(
  "/resume-review",
  authenticate,
  validateRequest(generateAIResumeReviewSchema),
  generateAIResumeReviewController,
);

router.post(
  "/interview-questions",
  authenticate,
  validateRequest(generateInterviewQuestionsSchema),
  generateInterviewQuestionsController,
);
export default router;
