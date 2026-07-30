import { Router } from "express";

import validateRequest from "../middlewares/validate.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { login, register, getMe } from "../controllers/auth.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRequest(registerValidator), register);

router.post("/login", validateRequest(loginValidator), login);
router.get("/me", authenticate, getMe);

export default router;
