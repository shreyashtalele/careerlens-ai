import { z } from "zod";

import { MOCK_INTERVIEW_LIMITS } from "../constants/mock-interview.constants.js";

const scoreSchema = z
  .number()
  .min(MOCK_INTERVIEW_LIMITS.MIN_FEEDBACK_SCORE)
  .max(MOCK_INTERVIEW_LIMITS.MAX_FEEDBACK_SCORE);

export const mockInterviewFinalReportResponseSchema = z.object({
  overallScore: scoreSchema,

  scoreBreakdown: z.object({
    technicalScore: scoreSchema,
    communicationScore: scoreSchema,
    confidenceScore: scoreSchema,
    relevanceScore: scoreSchema,
  }),

  strengths: z.array(z.string().trim().min(1)).min(1),

  weaknesses: z.array(z.string().trim().min(1)).min(1),

  improvementAreas: z.array(z.string().trim().min(1)).min(1),

  hiringRecommendation: z.string().trim().min(1),
});
