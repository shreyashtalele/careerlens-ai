import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../config/swagger.config.js";

const router = Router();

router.get("/docs.json", (_req, res) => {
  res.status(200).json(swaggerDocument);
});

router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customSiteTitle: "CareerLens AI API Documentation",
  }),
);

export default router;
