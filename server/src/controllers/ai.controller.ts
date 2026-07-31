import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import generateTestMessage from "../services/gemini.service.js";

const testAI = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const message = await generateTestMessage();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      statusCode: HTTP_STATUS.OK,
      message,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export { testAI };
