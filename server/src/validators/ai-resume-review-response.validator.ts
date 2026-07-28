import { z } from "zod";

export const aiResumeReviewResponseSchema = z.object({
  overallReview: z.string().trim().min(1),

  strengths: z.array(z.string().trim().min(1)),

  weaknesses: z.array(z.string().trim().min(1)),

  sectionSuggestions: z.object({
    summary: z.string().trim(),
    experience: z.string().trim(),
    projects: z.string().trim(),
    skills: z.string().trim(),
    education: z.string().trim(),
  }),

  keywordSuggestions: z.array(z.string().trim().min(1)),

  recruiterFeedback: z.string().trim().min(1),

  improvedSummary: z.string().trim().min(1),

  nextSteps: z.array(z.string().trim().min(1)),
});
