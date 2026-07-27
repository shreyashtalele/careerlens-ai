import { NextFunction, Request, Response } from "express";
import multer from "multer";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { RESUME_ANALYSIS_MESSAGES } from "../constants/resume-analysis.constants.js";
import ApiError from "../utils/ApiError.js";
import { resumeUpload } from "./resume-upload.middleware.js";

export const handleResumeUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  resumeUpload.single("resume")(req, res, (error: unknown) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        next(
          new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            RESUME_ANALYSIS_MESSAGES.FILE_TOO_LARGE,
          ),
        );
        return;
      }

      if (error.code === "LIMIT_FILE_COUNT") {
        next(
          new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            RESUME_ANALYSIS_MESSAGES.ONLY_ONE_FILE_ALLOWED,
          ),
        );
        return;
      }

      next(new ApiError(HTTP_STATUS.BAD_REQUEST, error.message));
      return;
    }

    if (error instanceof Error) {
      next(new ApiError(HTTP_STATUS.BAD_REQUEST, error.message));
      return;
    }

    next(
      new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESUME_ANALYSIS_MESSAGES.FILE_UPLOAD_FAILED,
      ),
    );
  });
};
