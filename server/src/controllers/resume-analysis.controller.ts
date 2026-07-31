import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { RESUME_ANALYSIS_MESSAGES } from "../constants/resume-analysis.constants.js";
import { SupportedResumeMimeType } from "../types/resume-analysis.types.js";
import { analyzeResume } from "../services/resume-analysis.service.js";
import ApiError from "../utils/ApiError.js";

export const uploadResumeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    if (!req.file) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        RESUME_ANALYSIS_MESSAGES.NO_FILE_UPLOADED,
      );
    }

    const result = await analyzeResume({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype as SupportedResumeMimeType,
      size: req.file.size,
      buffer: req.file.buffer,
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: RESUME_ANALYSIS_MESSAGES.RESUME_UPLOADED_SUCCESSFULLY,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
