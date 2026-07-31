import { NextFunction, Request, Response } from "express";

import { AI_RESUME_REVIEW_MESSAGES } from "../constants/ai-resume-review.constants.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { generateAIResumeReview } from "../services/ai-resume-review.service.js";
import { GenerateAIResumeReviewInput } from "../types/ai-resume-review.types.js";

export const generateAIResumeReviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { resumeText, atsAnalysis, jobDescription } =
      req.body as GenerateAIResumeReviewInput;

    const review = await generateAIResumeReview({
      resumeText,
      atsAnalysis,
      jobDescription,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: AI_RESUME_REVIEW_MESSAGES.GENERATED_SUCCESSFULLY,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};
