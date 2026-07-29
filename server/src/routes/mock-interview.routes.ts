import { Router } from "express";

import authenticate from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validate.middleware.js";

import {
  startMockInterview,
  getCurrentInterviewQuestion,
  submitMockInterviewAnswer,
  finishMockInterview,
} from "../controllers/mock-interview.controller.js";

import {
  startMockInterviewSchema,
  getCurrentInterviewQuestionSchema,
  submitMockInterviewAnswerSchema,
  finishMockInterviewSchema,
} from "../validators/mock-interview.validator.js";

const router = Router();

router.post(
  "/start",
  authenticate,
  validateRequest(startMockInterviewSchema),
  startMockInterview,
);

router.get(
  "/:sessionId/current-question",
  authenticate,
  validateRequest(getCurrentInterviewQuestionSchema),
  getCurrentInterviewQuestion,
);

router.post(
  "/:sessionId/answer",
  authenticate,
  validateRequest(submitMockInterviewAnswerSchema),
  submitMockInterviewAnswer,
);

router.post(
  "/:sessionId/finish",
  authenticate,
  validateRequest(finishMockInterviewSchema),
  finishMockInterview,
);

export default router;
