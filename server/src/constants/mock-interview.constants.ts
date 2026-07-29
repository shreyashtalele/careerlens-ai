export const MOCK_INTERVIEW_STATUS = Object.freeze({
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

export const MOCK_INTERVIEW_QUESTION_TYPE = Object.freeze({
  TECHNICAL: "technical",
  PROJECT: "project",
  BEHAVIORAL: "behavioral",
  HR: "hr",
  FOLLOW_UP: "follow_up",
});

export const MOCK_INTERVIEW_DIFFICULTY = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
});

export const MOCK_INTERVIEW_LIMITS = Object.freeze({
  MIN_QUESTION_COUNT: 5,
  MAX_QUESTION_COUNT: 20,
  DEFAULT_QUESTION_COUNT: 10,

  MAX_JOB_DESCRIPTION_LENGTH: 10000,

  MIN_ANSWER_LENGTH: 10,
  MAX_ANSWER_LENGTH: 10000,

  MIN_FEEDBACK_SCORE: 0,
  MAX_FEEDBACK_SCORE: 100,
});

export const MOCK_INTERVIEW_MESSAGES = Object.freeze({
  SESSION_CREATED: "Mock interview session created successfully.",
  SESSION_NOT_FOUND: "Mock interview session not found.",
  SESSION_ALREADY_COMPLETED:
    "Mock interview session has already been completed.",
  SESSION_CANCELLED: "Mock interview session has been cancelled.",
  QUESTION_NOT_FOUND: "Interview question not found.",
  ANSWER_SUBMITTED: "Interview answer submitted successfully.",
  INTERVIEW_COMPLETED: "Mock interview completed successfully.",
  INVALID_SESSION: "Invalid mock interview session.",
  INVALID_ANSWER: "Invalid interview answer.",
  AI_EVALUATION_FAILED: "Failed to evaluate interview answer.",
  REPORT_GENERATION_FAILED: "Failed to generate interview report.",
  RESUME_NOT_FOUND: "Resume not found.",
  QUESTION_GENERATION_FAILED: "Failed to generate interview questions.",
  QUESTION_ALREADY_ANSWERED:
    "The current interview question has already been answered.",
  INTERVIEW_NOT_FINISHED:
    "Please answer all interview questions before finishing the interview.",
  QUESTION_FETCHED: "Current interview question fetched successfully.",
});

export const MOCK_INTERVIEW_COLLECTION = Object.freeze({
  NAME: "mock_interviews",
});
