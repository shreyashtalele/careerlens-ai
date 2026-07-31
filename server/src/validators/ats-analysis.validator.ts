import { z } from "zod";

import { ATS_ANALYSIS_MESSAGES } from "../constants/ats-analysis.constants.js";

const ATS_TEXT_LIMITS = Object.freeze({
  RESUME_TEXT_MAX_LENGTH: 50_000,
  JOB_DESCRIPTION_MAX_LENGTH: 30_000,
});

export const analyzeResumeSchema = z.object({
  body: z.object({
    resumeText: z
      .string()
      .trim()
      .min(1, ATS_ANALYSIS_MESSAGES.EMPTY_RESUME_TEXT)
      .max(
        ATS_TEXT_LIMITS.RESUME_TEXT_MAX_LENGTH,
        `Resume text must not exceed ${ATS_TEXT_LIMITS.RESUME_TEXT_MAX_LENGTH} characters.`,
      ),
  }),
});

export const analyzeResumeWithJobDescriptionSchema = z.object({
  body: z.object({
    resumeText: z
      .string()
      .trim()
      .min(1, ATS_ANALYSIS_MESSAGES.EMPTY_RESUME_TEXT)
      .max(
        ATS_TEXT_LIMITS.RESUME_TEXT_MAX_LENGTH,
        `Resume text must not exceed ${ATS_TEXT_LIMITS.RESUME_TEXT_MAX_LENGTH} characters.`,
      ),

    jobDescription: z
      .string()
      .trim()
      .min(1, ATS_ANALYSIS_MESSAGES.EMPTY_JOB_DESCRIPTION)
      .max(
        ATS_TEXT_LIMITS.JOB_DESCRIPTION_MAX_LENGTH,
        `Job description must not exceed ${ATS_TEXT_LIMITS.JOB_DESCRIPTION_MAX_LENGTH} characters.`,
      ),
  }),
});
