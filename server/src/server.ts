import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db";
import validateEnvironment from "./config/env.js";

dotenv.config();

const PORT = process.env.PORT || 7000;

const startServer = async (): Promise<void> => {
  validateEnvironment();
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
