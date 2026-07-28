import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { AI_RESUME_REVIEW_MESSAGES } from "../constants/ai-resume-review.constants.js";
import gemini from "../config/gemini.config.js";
import { buildResumeReviewPrompt } from "../prompts/ai-resume-review.prompt.js";
import {
  AIResumeReviewResult,
  GenerateAIResumeReviewInput,
} from "../types/ai-resume-review.types.js";
import ApiError from "../utils/ApiError.js";
import { aiResumeReviewResponseSchema } from "../validators/ai-resume-review-response.validator.js";

const parseGeminiResponse = (responseText: string): unknown => {
  const cleanedResponse = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      AI_RESUME_REVIEW_MESSAGES.INVALID_AI_RESPONSE,
    );
  }
};

export const generateAIResumeReview = async ({
  resumeText,
  atsAnalysis,
  jobDescription,
}: GenerateAIResumeReviewInput): Promise<AIResumeReviewResult> => {
  const model = process.env.GEMINI_MODEL;

  if (!model) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "GEMINI_MODEL is missing",
    );
  }

  const prompt = buildResumeReviewPrompt({
    resumeText,
    atsAnalysis,
    jobDescription,
  });

  try {
    const response = await gemini.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const responseText = response.text?.trim();

    if (!responseText) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        AI_RESUME_REVIEW_MESSAGES.INVALID_AI_RESPONSE,
      );
    }

    const parsedResponse = parseGeminiResponse(responseText);

    const validationResult =
      aiResumeReviewResponseSchema.safeParse(parsedResponse);

    if (!validationResult.success) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        AI_RESUME_REVIEW_MESSAGES.INVALID_AI_RESPONSE,
        validationResult.error.issues,
      );
    }

    return validationResult.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error("Gemini resume review error:", error);

    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      AI_RESUME_REVIEW_MESSAGES.GENERATION_FAILED,
    );
  }
};
