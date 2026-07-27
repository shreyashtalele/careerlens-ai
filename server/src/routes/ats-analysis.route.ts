import { Router } from "express";

import {
  analyzeResumeController,
  analyzeResumeWithJobDescriptionController,
} from "../controllers/ats-analysis.controller.js";
import validateRequest from "../middlewares/validate.middleware.js";
import {
  analyzeResumeSchema,
  analyzeResumeWithJobDescriptionSchema,
} from "../validators/ats-analysis.validator.js";

const atsAnalysisRouter = Router();

atsAnalysisRouter.post(
  "/analyze",
  validateRequest(analyzeResumeSchema),
  analyzeResumeController,
);

atsAnalysisRouter.post(
  "/analyze-with-job-description",
  validateRequest(analyzeResumeWithJobDescriptionSchema),
  analyzeResumeWithJobDescriptionController,
);

export default atsAnalysisRouter;
