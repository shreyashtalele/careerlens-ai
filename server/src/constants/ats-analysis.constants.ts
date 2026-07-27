import { ResumeSectionName } from "../types/ats-analysis.types.js";

export const ATS_ANALYSIS_MESSAGES = Object.freeze({
  RESUME_PARSED_SUCCESSFULLY: "Resume parsed successfully.",
  EMPTY_RESUME_TEXT: "Resume text is empty.",
  EMPTY_JOB_DESCRIPTION: "Job description is empty.",
});

export const RESUME_SECTION_HEADINGS = Object.freeze<
  Record<ResumeSectionName, readonly string[]>
>({
  summary: [
    "summary",
    "professional summary",
    "career summary",
    "profile",
    "objective",
    "career objective",
  ],

  skills: [
    "skills",
    "technical skills",
    "core skills",
    "key skills",
    "competencies",
  ],

  experience: [
    "experience",
    "work experience",
    "professional experience",
    "employment history",
  ],

  projects: ["projects", "personal projects", "academic projects"],

  education: [
    "education",
    "academic qualification",
    "academic background",
    "qualification",
  ],

  certifications: ["certifications", "certificates", "licenses"],

  achievements: ["achievements", "accomplishments", "awards"],

  languages: ["languages", "language proficiency"],
});

export const ATS_SCORE_WEIGHTS = Object.freeze({
  SUMMARY: 10,
  SKILLS: 10,
  EXPERIENCE: 20,
  PROJECTS: 15,
  EDUCATION: 10,
  CERTIFICATIONS: 5,
  ACHIEVEMENTS: 5,
  LANGUAGES: 5,
  SKILL_COUNT: 10,
  RESUME_LENGTH: 10,
});

export const ATS_SCORE_THRESHOLDS = Object.freeze({
  MINIMUM_SKILLS: 5,
  MINIMUM_WORD_COUNT: 200,
});

export const ATS_RECOMMENDATIONS = Object.freeze({
  summary:
    "Add a professional summary that highlights your experience and strengths.",
  skills:
    "Add a dedicated skills section with relevant technical and professional skills.",
  experience:
    "Add work experience with responsibilities and measurable achievements.",
  projects: "Add relevant projects that demonstrate your practical skills.",
  education: "Add your educational qualifications.",
  certifications: "Add relevant certifications, if available.",
  achievements: "Add measurable achievements or awards, if available.",
  languages: "Add the languages you can communicate in.",
  skillCount: "Include at least five relevant skills.",
  resumeLength:
    "Add more relevant content to make the resume sufficiently detailed.",
});

export const SUPPORTED_TECHNICAL_SKILLS = Object.freeze([
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "redis",
  "html",
  "css",
  "tailwind css",
  "bootstrap",
  "rest api",
  "graphql",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "git",
  "github",
  "jwt",
  "socket.io",
  "websocket",
  "python",
  "django",
  "fastapi",
  "java",
  "spring boot",
  "c#",
  ".net",
  "php",
  "laravel",
  "sql",
  "nosql",
  "microservices",
  "ci/cd",
  "jest",
  "vitest",
  "cypress",
  "selenium",
]);
