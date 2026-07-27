import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { RESUME_ANALYSIS_MESSAGES } from "../constants/resume-analysis.constants.js";
import ApiError from "../utils/ApiError.js";

export const validateResumeUpload = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return next(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        RESUME_ANALYSIS_MESSAGES.NO_FILE_UPLOADED,
      ),
    );
  }

  next();
};
