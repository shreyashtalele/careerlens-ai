import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { RESUME_ANALYSIS_MESSAGES } from "../constants/resume-analysis.constants.js";
import {
  ExtractedResumeData,
  UploadedResumeFile,
} from "../types/resume-analysis.types.js";
import ApiError from "../utils/ApiError.js";
import { extractTextFromDocx } from "../utils/docx-parser.js";
import { extractTextFromPdf } from "../utils/pdf-parser.js";

export const analyzeResume = async (
  file: UploadedResumeFile,
): Promise<ExtractedResumeData> => {
  let extractedText: string;

  switch (file.mimeType) {
    case "application/pdf":
      extractedText = await extractTextFromPdf(file.buffer);
      break;

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      extractedText = await extractTextFromDocx(file.buffer);
      break;

    default:
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        RESUME_ANALYSIS_MESSAGES.INVALID_FILE_TYPE,
      );
  }

  const normalizedText = extractedText.trim();
  const wordCount = normalizedText.split(/\s+/).filter(Boolean).length;

  return {
    fileName: file.originalName,
    mimeType: file.mimeType,
    size: file.size,
    text: normalizedText,
    characterCount: normalizedText.length,
    wordCount,
  };
};
