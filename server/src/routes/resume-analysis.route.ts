import { Router } from "express";

import { uploadResumeController } from "../controllers/resume-analysis.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import { handleResumeUpload } from "../middlewares/upload-error.middleware.js";
import { validateResumeUpload } from "../validators/resume-analysis.validator.js";

const resumeAnalysisRouter = Router();

resumeAnalysisRouter.post(
  "/upload",
  authenticate,
  handleResumeUpload,
  validateResumeUpload,
  uploadResumeController,
);

export default resumeAnalysisRouter;
