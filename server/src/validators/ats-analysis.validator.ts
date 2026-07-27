import { z } from "zod";

import { ATS_ANALYSIS_MESSAGES } from "../constants/ats-analysis.constants.js";

export const analyzeResumeSchema = z.object({
  body: z.object({
    resumeText: z
      .string()
      .trim()
      .min(1, ATS_ANALYSIS_MESSAGES.EMPTY_RESUME_TEXT),
  }),
});

export const analyzeResumeWithJobDescriptionSchema = z.object({
  body: z.object({
    resumeText: z
      .string()
      .trim()
      .min(1, ATS_ANALYSIS_MESSAGES.EMPTY_RESUME_TEXT),

    jobDescription: z
      .string()
      .trim()
      .min(1, ATS_ANALYSIS_MESSAGES.EMPTY_JOB_DESCRIPTION),
  }),
});
