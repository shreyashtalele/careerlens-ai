export const RESUME_MESSAGES = {
  RESUME_CREATED: "Resume created successfully",
  RESUMES_FETCHED: "Resumes fetched successfully",
  RESUME_FETCHED: "Resume fetched successfully",
  RESUME_UPDATED: "Resume updated successfully",
  RESUME_DELETED: "Resume deleted successfully",
  RESUME_SET_AS_DEFAULT: "Resume set as default successfully",

  RESUME_NOT_FOUND: "Resume not found",
  INVALID_RESUME_ID: "Invalid resume ID",
  UNAUTHORIZED_ACCESS: "You are not authorized to access this resume",

  MAX_RESUME_LIMIT_REACHED: "You have reached the maximum number of resumes.",

  RESUME_TITLE_ALREADY_EXISTS: "A resume with this title already exists.",
} as const;
export const RESUME_LIMITS = {
  MAX_RESUMES_PER_USER: 20,
  MAX_SKILLS: 50,
  MAX_EDUCATION_ITEMS: 10,
  MAX_EXPERIENCE_ITEMS: 15,
  MAX_PROJECT_ITEMS: 15,
  MAX_CERTIFICATION_ITEMS: 15,
  MAX_ACHIEVEMENTS: 20,
  MAX_LANGUAGES: 10,
} as const;
