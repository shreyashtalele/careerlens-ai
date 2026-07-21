import { Router } from "express";
import { testAI } from "../controllers/ai.controller.js";

const router = Router();

router.get("/test", testAI);

export default router;
