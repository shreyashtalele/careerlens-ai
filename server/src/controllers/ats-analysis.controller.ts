import { NextFunction, Request, Response } from "express";

import { ATS_ANALYSIS_MESSAGES } from "../constants/ats-analysis.constants.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import {
  analyzeResumeText,
  analyzeResumeWithJobDescription,
} from "../services/ats-analysis.service.js";

export const analyzeResumeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const result = analyzeResumeText({
      resumeText: req.body.resumeText,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: ATS_ANALYSIS_MESSAGES.RESUME_PARSED_SUCCESSFULLY,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeResumeWithJobDescriptionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const result = analyzeResumeWithJobDescription({
      resumeText: req.body.resumeText,
      jobDescription: req.body.jobDescription,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: ATS_ANALYSIS_MESSAGES.RESUME_PARSED_SUCCESSFULLY,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
