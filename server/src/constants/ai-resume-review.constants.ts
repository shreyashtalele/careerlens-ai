export const AI_RESUME_REVIEW_MESSAGES = Object.freeze({
  GENERATED_SUCCESSFULLY: "AI resume review generated successfully.",
  GENERATION_FAILED: "Failed to generate AI resume review.",
  INVALID_AI_RESPONSE: "AI returned an invalid resume review response.",
  EMPTY_RESUME_TEXT: "Resume text is required.",
});

export const AI_RESUME_REVIEW_LIMITS = Object.freeze({
  MIN_RESUME_TEXT_LENGTH: 50,
  MAX_RESUME_TEXT_LENGTH: 30_000,
  MAX_JOB_DESCRIPTION_LENGTH: 15_000,
});

export const AI_RESUME_REVIEW_SECTIONS = Object.freeze({
  SUMMARY: "summary",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  SKILLS: "skills",
  EDUCATION: "education",
});

export const AI_RESUME_REVIEW_DEFAULTS = Object.freeze({
  EMPTY_JOB_DESCRIPTION: "",
  MAX_STRENGTHS: 5,
  MAX_WEAKNESSES: 5,
  MAX_KEYWORD_SUGGESTIONS: 10,
  MAX_NEXT_STEPS: 5,
});
