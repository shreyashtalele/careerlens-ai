import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import aiRoutes from "./routes/ai.route.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/ai", aiRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerLens AI API is running",
  });
});

export default app;
