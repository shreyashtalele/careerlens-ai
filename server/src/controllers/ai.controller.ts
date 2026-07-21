import { Request, Response } from "express";
import generateTestMessage from "../services/gemini.service.js";

const testAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await generateTestMessage();

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

export { testAI };
