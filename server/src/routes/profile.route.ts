import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validate.middleware.js";
import {
  deleteProfileController,
  getProfileController,
  updateProfileController,
} from "../controllers/profile.controller.js";
import { updateProfileValidator } from "../validators/profile.validator.js";

const router = Router();

router.use(authenticate);

router.get("/", getProfileController);

router.patch(
  "/",
  updateProfileValidator,
  validateRequest,
  updateProfileController,
);

router.delete("/", deleteProfileController);

export default router;
