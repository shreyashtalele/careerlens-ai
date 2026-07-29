import { z } from "zod";

import {
  INTERVIEW_DIFFICULTY,
  INTERVIEW_QUESTION_GENERATOR_LIMITS,
} from "../constants/interview-question-generator.constants.js";

const atsScoreBreakdownSchema = z.object({
  summary: z.number().nonnegative(),
  skills: z.number().nonnegative(),
  experience: z.number().nonnegative(),
  projects: z.number().nonnegative(),
  education: z.number().nonnegative(),
  certifications: z.number().nonnegative(),
  achievements: z.number().nonnegative(),
  languages: z.number().nonnegative(),
  skillCount: z.number().nonnegative(),
  resumeLength: z.number().nonnegative(),
});

const atsScoreSchema = z.object({
  overallScore: z.number().min(0).max(100),
  breakdown: atsScoreBreakdownSchema,
  missingSections: z.array(z.string()),
  recommendations: z.array(z.string()),
});

const parsedResumeSectionsSchema = z.object({
  summary: z.string(),
  skills: z.string(),
  experience: z.string(),
  projects: z.string(),
  education: z.string(),
  certifications: z.string(),
  achievements: z.string(),
  languages: z.string(),
});

const skillMatchSchema = z.object({
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  matchPercentage: z.number().min(0).max(100),
});

const atsAnalysisSchema = z.object({
  sections: parsedResumeSectionsSchema,
  skills: z.array(z.string()),
  score: atsScoreSchema,
  skillMatch: skillMatchSchema.optional(),
});

export const generateInterviewQuestionsSchema = z.object({
  body: z.object({
    resumeText: z
      .string()
      .trim()
      .min(
        INTERVIEW_QUESTION_GENERATOR_LIMITS.MIN_RESUME_TEXT_LENGTH,
        `Resume text must contain at least ${INTERVIEW_QUESTION_GENERATOR_LIMITS.MIN_RESUME_TEXT_LENGTH} characters.`,
      )
      .max(
        INTERVIEW_QUESTION_GENERATOR_LIMITS.MAX_RESUME_TEXT_LENGTH,
        `Resume text cannot exceed ${INTERVIEW_QUESTION_GENERATOR_LIMITS.MAX_RESUME_TEXT_LENGTH} characters.`,
      ),

    atsAnalysis: atsAnalysisSchema,

    jobDescription: z
      .string()
      .trim()
      .max(
        INTERVIEW_QUESTION_GENERATOR_LIMITS.MAX_JOB_DESCRIPTION_LENGTH,
        `Job description cannot exceed ${INTERVIEW_QUESTION_GENERATOR_LIMITS.MAX_JOB_DESCRIPTION_LENGTH} characters.`,
      )
      .optional(),

    difficulty: z
      .enum([
        INTERVIEW_DIFFICULTY.EASY,
        INTERVIEW_DIFFICULTY.MEDIUM,
        INTERVIEW_DIFFICULTY.HARD,
      ])
      .optional(),

    questionCount: z
      .number()
      .int()
      .min(INTERVIEW_QUESTION_GENERATOR_LIMITS.MIN_QUESTION_COUNT)
      .max(INTERVIEW_QUESTION_GENERATOR_LIMITS.MAX_QUESTION_COUNT)
      .optional(),
  }),
});
