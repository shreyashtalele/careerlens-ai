import { PDFParse } from "pdf-parse";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { RESUME_ANALYSIS_MESSAGES } from "../constants/resume-analysis.constants.js";
import ApiError from "./ApiError.js";

export const extractTextFromPdf = async (
  fileBuffer: Buffer,
): Promise<string> => {
  const parser = new PDFParse({
    data: fileBuffer,
  });

  try {
    const result = await parser.getText();
    const extractedText = result.text.trim();

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
  } finally {
    await parser.destroy();
  }
};
