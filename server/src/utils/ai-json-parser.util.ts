import { AI_ERROR_MESSAGES } from "../constants/ai.constants.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "./ApiError.js";

const removeMarkdownCodeBlock = (text: string): string =>
  text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const extractJsonContent = (text: string): string => {
  const cleanedText = removeMarkdownCodeBlock(text);

  const objectStartIndex = cleanedText.indexOf("{");
  const arrayStartIndex = cleanedText.indexOf("[");

  const startsWithObject =
    objectStartIndex !== -1 &&
    (arrayStartIndex === -1 || objectStartIndex < arrayStartIndex);

  if (startsWithObject) {
    const objectEndIndex = cleanedText.lastIndexOf("}");

    if (objectEndIndex === -1) {
      throw new ApiError(
        HTTP_STATUS.BAD_GATEWAY,
        AI_ERROR_MESSAGES.INVALID_RESPONSE,
      );
    }

    return cleanedText.slice(objectStartIndex, objectEndIndex + 1);
  }

  if (arrayStartIndex !== -1) {
    const arrayEndIndex = cleanedText.lastIndexOf("]");

    if (arrayEndIndex === -1) {
      throw new ApiError(
        HTTP_STATUS.BAD_GATEWAY,
        AI_ERROR_MESSAGES.INVALID_RESPONSE,
      );
    }

    return cleanedText.slice(arrayStartIndex, arrayEndIndex + 1);
  }

  throw new ApiError(
    HTTP_STATUS.BAD_GATEWAY,
    AI_ERROR_MESSAGES.INVALID_RESPONSE,
  );
};

export const parseAIJsonResponse = <T>(responseText: string): T => {
  if (!responseText.trim()) {
    throw new ApiError(
      HTTP_STATUS.BAD_GATEWAY,
      AI_ERROR_MESSAGES.EMPTY_RESPONSE,
    );
  }

  try {
    const jsonContent = extractJsonContent(responseText);

    return JSON.parse(jsonContent) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      HTTP_STATUS.BAD_GATEWAY,
      AI_ERROR_MESSAGES.INVALID_RESPONSE,
    );
  }
};
