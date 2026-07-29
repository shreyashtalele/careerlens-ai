import { z } from "zod";

const interviewQuestionSchema = z.object({
  question: z.string().trim().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topic: z.string().trim().min(1),
  reason: z.string().trim().min(1),
});

export const interviewQuestionGeneratorResponseSchema = z.object({
  technicalQuestions: z.array(interviewQuestionSchema),

  projectQuestions: z.array(interviewQuestionSchema),

  behavioralQuestions: z.array(interviewQuestionSchema),

  hrQuestions: z.array(interviewQuestionSchema),

  followUpQuestions: z.array(interviewQuestionSchema),

  preparationTips: z.array(z.string().trim().min(1)),
});

export type InterviewQuestionGeneratorResponse = z.infer<
  typeof interviewQuestionGeneratorResponseSchema
>;
