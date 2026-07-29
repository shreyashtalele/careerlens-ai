import { z } from "zod";

import {
  MOCK_INTERVIEW_DIFFICULTY,
  MOCK_INTERVIEW_LIMITS,
} from "../constants/mock-interview.constants.js";

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId.");

export const startMockInterviewSchema = z.object({
  body: z.object({
    resumeId: objectIdSchema,

    jobDescription: z
      .string()
      .trim()
      .max(
        MOCK_INTERVIEW_LIMITS.MAX_JOB_DESCRIPTION_LENGTH,
        `Job description cannot exceed ${MOCK_INTERVIEW_LIMITS.MAX_JOB_DESCRIPTION_LENGTH} characters.`,
      )
      .optional(),

    difficulty: z
      .enum([
        MOCK_INTERVIEW_DIFFICULTY.EASY,
        MOCK_INTERVIEW_DIFFICULTY.MEDIUM,
        MOCK_INTERVIEW_DIFFICULTY.HARD,
      ])
      .optional(),

    questionCount: z
      .number()
      .int()
      .min(MOCK_INTERVIEW_LIMITS.MIN_QUESTION_COUNT)
      .max(MOCK_INTERVIEW_LIMITS.MAX_QUESTION_COUNT)
      .optional(),
  }),
});

export const submitMockInterviewAnswerSchema = z.object({
  params: z.object({
    sessionId: objectIdSchema,
  }),

  body: z.object({
    answer: z
      .string()
      .trim()
      .min(
        MOCK_INTERVIEW_LIMITS.MIN_ANSWER_LENGTH,
        `Answer must contain at least ${MOCK_INTERVIEW_LIMITS.MIN_ANSWER_LENGTH} characters.`,
      )
      .max(
        MOCK_INTERVIEW_LIMITS.MAX_ANSWER_LENGTH,
        `Answer cannot exceed ${MOCK_INTERVIEW_LIMITS.MAX_ANSWER_LENGTH} characters.`,
      ),
  }),
});

export const getCurrentInterviewQuestionSchema = z.object({
  params: z.object({
    sessionId: objectIdSchema,
  }),
});

export const finishMockInterviewSchema = z.object({
  params: z.object({
    sessionId: objectIdSchema,
  }),
});
