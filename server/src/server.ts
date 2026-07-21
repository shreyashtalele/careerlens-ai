import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 7000;

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
