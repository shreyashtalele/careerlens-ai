import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

import {
  RESUME_ANALYSIS_LIMITS,
  RESUME_ANALYSIS_MESSAGES,
  SUPPORTED_RESUME_MIME_TYPES,
} from "../constants/resume-analysis.constants.js";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const isSupportedFileType = SUPPORTED_RESUME_MIME_TYPES.includes(
    file.mimetype as (typeof SUPPORTED_RESUME_MIME_TYPES)[number],
  );

  if (!isSupportedFileType) {
    callback(new Error(RESUME_ANALYSIS_MESSAGES.INVALID_FILE_TYPE));
    return;
  }

  callback(null, true);
};

export const resumeUpload = multer({
  storage,
  limits: {
    fileSize: RESUME_ANALYSIS_LIMITS.MAX_FILE_SIZE_IN_BYTES,
    files: 1,
  },
  fileFilter,
});
