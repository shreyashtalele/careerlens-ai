import mammoth from "mammoth";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { RESUME_ANALYSIS_MESSAGES } from "../constants/resume-analysis.constants.js";
import ApiError from "./ApiError.js";

export const extractTextFromDocx = async (
  fileBuffer: Buffer,
): Promise<string> => {
  try {
    const result = await mammoth.extractRawText({
      buffer: fileBuffer,
    });

    const extractedText = result.value.trim();

    if (!extractedText) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        RESUME_ANALYSIS_MESSAGES.EMPTY_RESUME,
      );
    }

    return extractedText;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      RESUME_ANALYSIS_MESSAGES.TEXT_EXTRACTION_FAILED,
    );
  }
};
