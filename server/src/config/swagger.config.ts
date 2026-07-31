import { OpenAPIV3 } from "openapi-types";

import { commonResponses, commonSchemas } from "../docs/common.docs.js";
import { healthPaths } from "../docs/health.docs.js";
import { authPaths, authSchemas } from "../docs/auth.docs.js";
import { profilePaths, profileSchemas } from "../docs/profile.docs.js";

import { resumeSchemas } from "../docs/resume/resume.schemas.js";
import { resumePaths } from "../docs/resume/resume.paths.js";

import { resumeAnalysisSchemas } from "../docs/resume-analysis/resume-analysis.schemas.js";
import { resumeAnalysisPaths } from "../docs/resume-analysis/resume-analysis.paths.js";

import { atsSchemas } from "../docs/ats/ats.schemas.js";
import { atsPaths } from "../docs/ats/ats.paths.js";

import { aiSchemas } from "../docs/ai/ai.schemas.js";
import { aiPaths } from "../docs/ai/ai.paths.js";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.3",

  info: {
    title: "CareerLens AI API",
    version: "1.0.0",
    description:
      "REST API for authentication, profile management, resume management, ATS analysis, AI resume review, and interview question generation.",
  },

  servers: [
    {
      url: "http://localhost:7000",
      description: "Local development server",
    },
  ],

  tags: [
    {
      name: "Health",
      description: "API health check",
    },
    {
      name: "Authentication",
      description: "User registration, login, and authenticated user details",
    },
    {
      name: "Profile",
      description: "Authenticated user profile management",
    },
    {
      name: "Resumes",
      description: "Resume creation and management",
    },
    {
      name: "Resume Analysis",
      description: "Resume file upload and parsing",
    },
    {
      name: "ATS Analysis",
      description: "Deterministic ATS resume analysis",
    },
    {
      name: "AI",
      description: "AI-powered resume review and interview question generation",
    },
  ],

  components: {
    schemas: {
      ...commonSchemas,
      ...authSchemas,
      ...profileSchemas,
      ...resumeSchemas,
      ...resumeAnalysisSchemas,
      ...atsSchemas,
      ...aiSchemas,
    },

    responses: {
      ...commonResponses,
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    ...healthPaths,
    ...authPaths,
    ...profilePaths,
    ...resumePaths,
    ...resumeAnalysisPaths,
    ...atsPaths,
    ...aiPaths,
  },
};

export default swaggerDocument;
