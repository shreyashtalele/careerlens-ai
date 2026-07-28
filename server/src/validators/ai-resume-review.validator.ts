import { z } from "zod";

import { AI_RESUME_REVIEW_LIMITS } from "../constants/ai-resume-review.constants.js";

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

export const generateAIResumeReviewSchema = z.object({
  body: z.object({
    resumeText: z
      .string()
      .trim()
      .min(
        AI_RESUME_REVIEW_LIMITS.MIN_RESUME_TEXT_LENGTH,
        `Resume text must contain at least ${AI_RESUME_REVIEW_LIMITS.MIN_RESUME_TEXT_LENGTH} characters.`,
      )
      .max(
        AI_RESUME_REVIEW_LIMITS.MAX_RESUME_TEXT_LENGTH,
        `Resume text cannot exceed ${AI_RESUME_REVIEW_LIMITS.MAX_RESUME_TEXT_LENGTH} characters.`,
      ),

    atsAnalysis: atsAnalysisSchema,

    jobDescription: z
      .string()
      .trim()
      .max(
        AI_RESUME_REVIEW_LIMITS.MAX_JOB_DESCRIPTION_LENGTH,
        `Job description cannot exceed ${AI_RESUME_REVIEW_LIMITS.MAX_JOB_DESCRIPTION_LENGTH} characters.`,
      )
      .optional(),
  }),
});
