import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { INTERVIEW_QUESTION_GENERATOR_MESSAGES } from "../constants/interview-question-generator.constants.js";
import { generateInterviewQuestions } from "../services/interview-question-generator.service.js";

export async function generateInterviewQuestionsController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const interviewQuestions = await generateInterviewQuestions(req.body);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: INTERVIEW_QUESTION_GENERATOR_MESSAGES.GENERATED_SUCCESSFULLY,
      data: interviewQuestions,
    });
  } catch (error) {
    next(error);
  }
}
