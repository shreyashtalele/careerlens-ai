import { buildResumeReviewPrompt } from "../prompts/ai-resume-review.prompt.js";
import { generateStructuredAIResponse } from "./ai.service.js";
import {
  AIResumeReviewResult,
  GenerateAIResumeReviewInput,
} from "../types/ai-resume-review.types.js";
import { aiResumeReviewResponseSchema } from "../validators/ai-resume-review-response.validator.js";

export const generateAIResumeReview = async ({
  resumeText,
  atsAnalysis,
  jobDescription,
}: GenerateAIResumeReviewInput): Promise<AIResumeReviewResult> => {
  const prompt = buildResumeReviewPrompt({
    resumeText,
    atsAnalysis,
    jobDescription,
  });

  return generateStructuredAIResponse({
    prompt,
    schema: aiResumeReviewResponseSchema,
    temperature: 0.3,
  });
};
