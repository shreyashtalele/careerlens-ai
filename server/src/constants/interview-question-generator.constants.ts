export const INTERVIEW_QUESTION_GENERATOR_MESSAGES = Object.freeze({
  GENERATED_SUCCESSFULLY: "Interview questions generated successfully.",
  GENERATION_FAILED: "Failed to generate interview questions.",
  INVALID_AI_RESPONSE: "AI returned an invalid interview question response.",
  EMPTY_RESUME_TEXT: "Resume text is required.",
});

export const INTERVIEW_QUESTION_GENERATOR_LIMITS = Object.freeze({
  MIN_RESUME_TEXT_LENGTH: 50,
  MAX_RESUME_TEXT_LENGTH: 30_000,
  MAX_JOB_DESCRIPTION_LENGTH: 15_000,
  DEFAULT_QUESTION_COUNT: 10,
  MIN_QUESTION_COUNT: 5,
  MAX_QUESTION_COUNT: 30,
});

export const INTERVIEW_DIFFICULTY = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
});

export const QUESTION_CATEGORIES = Object.freeze({
  TECHNICAL: "technicalQuestions",
  PROJECT: "projectQuestions",
  BEHAVIORAL: "behavioralQuestions",
  HR: "hrQuestions",
  FOLLOW_UP: "followUpQuestions",
});

export const INTERVIEW_DEFAULTS = Object.freeze({
  DEFAULT_DIFFICULTY: INTERVIEW_DIFFICULTY.MEDIUM,
  MAX_PREPARATION_TIPS: 10,
});
