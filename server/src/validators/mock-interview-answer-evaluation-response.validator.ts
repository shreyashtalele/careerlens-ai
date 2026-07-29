import { z } from "zod";

export const mockInterviewAnswerEvaluationResponseSchema = z.object({
  score: z.number().min(0).max(100),

  strengths: z.array(z.string().trim().min(1)).min(1),

  improvements: z.array(z.string().trim().min(1)).min(1),

  feedback: z.string().trim().min(1),
});
