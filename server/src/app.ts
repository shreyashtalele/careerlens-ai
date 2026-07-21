import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import aiRoutes from "./routes/ai.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
//test routes for ai , database & server
app.use("/api/ai", aiRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerLens AI API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
