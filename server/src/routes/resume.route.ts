import { Router } from "express";

import {
  createResumeController,
  deleteResumeController,
  getResumeByIdController,
  getResumesController,
  setDefaultResumeController,
  updateResumeController,
} from "../controllers/resume.controller.js";

import authenticate from "../middlewares/auth.middleware.js";
//import validateRequest from "../middlewares/validate.middleware.js";
import handleValidationErrors from "../middlewares/express-validation.middleware.js";

import {
  createResumeValidator,
  resumeIdValidator,
  updateResumeValidator,
} from "../validators/resume.validator.js";

const router = Router();

router.use(authenticate);

// router.post(
//   "/",
//   createResumeValidator,
//   validateRequest,
//   createResumeController,
// );

router.post(
  "/",
  createResumeValidator,
  handleValidationErrors,
  createResumeController,
);
router.get("/", getResumesController);

// router.get(
//   "/:resumeId",
//   resumeIdValidator,
//   validateRequest,
//   getResumeByIdController,
// );

// router.patch(
//   "/:resumeId",
//   [...resumeIdValidator, ...updateResumeValidator],
//   validateRequest,
//   updateResumeController,
// );

// router.patch(
//   "/:resumeId/default",
//   resumeIdValidator,
//   validateRequest,
//   setDefaultResumeController,
// );

// router.delete(
//   "/:resumeId",
//   resumeIdValidator,
//   validateRequest,
//   deleteResumeController,
// );

router.get(
  "/:resumeId",
  resumeIdValidator,
  handleValidationErrors,
  getResumeByIdController,
);

router.patch(
  "/:resumeId",
  [...resumeIdValidator, ...updateResumeValidator],
  handleValidationErrors,
  updateResumeController,
);

router.patch(
  "/:resumeId/default",
  resumeIdValidator,
  handleValidationErrors,
  setDefaultResumeController,
);

router.delete(
  "/:resumeId",
  resumeIdValidator,
  handleValidationErrors,
  deleteResumeController,
);

export default router;
