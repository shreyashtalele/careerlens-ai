import { OpenAPIV3 } from "openapi-types";

export const atsSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  AnalyzeResumeRequest: {
    type: "object",
    additionalProperties: false,
    required: ["resumeText"],
    properties: {
      resumeText: {
        type: "string",
        minLength: 1,
        maxLength: 50000,
        description: "Plain text extracted from the candidate's resume.",
        example:
          "Professional Summary\nFull-stack developer with experience in React and Node.js...\n\nSkills\nJavaScript, TypeScript, React, Node.js, MongoDB",
      },
    },
  },

  AnalyzeResumeWithJobDescriptionRequest: {
    type: "object",
    additionalProperties: false,
    required: ["resumeText", "jobDescription"],
    properties: {
      resumeText: {
        type: "string",
        minLength: 1,
        maxLength: 50000,
        description: "Plain text extracted from the candidate's resume.",
        example:
          "Professional Summary\nFull-stack developer with experience in React and Node.js...\n\nSkills\nJavaScript, TypeScript, React, Node.js, MongoDB",
      },

      jobDescription: {
        type: "string",
        minLength: 1,
        maxLength: 30000,
        description:
          "Job description used to compare the candidate's resume skills against the role requirements.",
        example:
          "We are looking for a full-stack developer with experience in React, Node.js, TypeScript, MongoDB, Docker and AWS.",
      },
    },
  },

  ParsedResumeSections: {
    type: "object",
    required: [
      "summary",
      "skills",
      "experience",
      "projects",
      "education",
      "certifications",
      "achievements",
      "languages",
    ],
    properties: {
      summary: {
        type: "string",
        example:
          "Full-stack developer with experience in React, Node.js and TypeScript.",
      },

      skills: {
        type: "string",
        example: "JavaScript, TypeScript, React, Next.js, Node.js, MongoDB",
      },

      experience: {
        type: "string",
        example:
          "Software Development Trainee at Simtrak Solutions. Developed responsive modules and integrated REST APIs.",
      },

      projects: {
        type: "string",
        example:
          "CareerLens AI — AI-powered resume analysis and interview preparation platform.",
      },

      education: {
        type: "string",
        example:
          "Master of Computer Applications, D. Y. Patil Institute, 2025.",
      },

      certifications: {
        type: "string",
        example: "AWS Certified Cloud Practitioner.",
      },

      achievements: {
        type: "string",
        example: "Built and deployed multiple production-ready applications.",
      },

      languages: {
        type: "string",
        example: "English, Hindi, Marathi.",
      },
    },
  },

  AtsScoreBreakdown: {
    type: "object",
    required: [
      "summary",
      "skills",
      "experience",
      "projects",
      "education",
      "certifications",
      "achievements",
      "languages",
      "skillCount",
      "resumeLength",
    ],
    properties: {
      summary: {
        type: "number",
        minimum: 0,
        maximum: 10,
        example: 10,
      },

      skills: {
        type: "number",
        minimum: 0,
        maximum: 10,
        example: 10,
      },

      experience: {
        type: "number",
        minimum: 0,
        maximum: 20,
        example: 20,
      },

      projects: {
        type: "number",
        minimum: 0,
        maximum: 15,
        example: 15,
      },

      education: {
        type: "number",
        minimum: 0,
        maximum: 10,
        example: 10,
      },

      certifications: {
        type: "number",
        minimum: 0,
        maximum: 5,
        example: 5,
      },

      achievements: {
        type: "number",
        minimum: 0,
        maximum: 5,
        example: 5,
      },

      languages: {
        type: "number",
        minimum: 0,
        maximum: 5,
        example: 5,
      },

      skillCount: {
        type: "number",
        minimum: 0,
        maximum: 10,
        example: 10,
      },

      resumeLength: {
        type: "number",
        minimum: 0,
        maximum: 10,
        example: 10,
      },
    },
  },

  AtsScoreResult: {
    type: "object",
    required: [
      "overallScore",
      "breakdown",
      "missingSections",
      "recommendations",
    ],
    properties: {
      overallScore: {
        type: "number",
        minimum: 0,
        maximum: 100,
        example: 85,
      },

      breakdown: {
        $ref: "#/components/schemas/AtsScoreBreakdown",
      },

      missingSections: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "summary",
            "skills",
            "experience",
            "projects",
            "education",
            "certifications",
            "achievements",
            "languages",
          ],
        },
        example: ["certifications", "achievements"],
      },

      recommendations: {
        type: "array",
        items: {
          type: "string",
        },
        example: [
          "Add relevant certifications, if available.",
          "Add measurable achievements or awards, if available.",
        ],
      },
    },
  },

  SkillMatchResult: {
    type: "object",
    required: ["matchedSkills", "missingSkills", "matchPercentage"],
    properties: {
      matchedSkills: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["javascript", "typescript", "react", "node.js", "mongodb"],
      },

      missingSkills: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["docker", "aws"],
      },

      matchPercentage: {
        type: "number",
        minimum: 0,
        maximum: 100,
        example: 71.43,
      },
    },
  },

  AtsAnalysisResult: {
    type: "object",
    required: ["sections", "skills", "score"],
    properties: {
      sections: {
        $ref: "#/components/schemas/ParsedResumeSections",
      },

      skills: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["javascript", "typescript", "react", "node.js", "mongodb"],
      },

      score: {
        $ref: "#/components/schemas/AtsScoreResult",
      },
    },
  },

  AtsAnalysisWithJobDescriptionResult: {
    type: "object",
    required: ["sections", "skills", "score", "skillMatch"],
    properties: {
      sections: {
        $ref: "#/components/schemas/ParsedResumeSections",
      },

      skills: {
        type: "array",
        items: {
          type: "string",
        },
      },

      score: {
        $ref: "#/components/schemas/AtsScoreResult",
      },

      skillMatch: {
        $ref: "#/components/schemas/SkillMatchResult",
      },
    },
  },

  AtsAnalysisResponse: {
    type: "object",
    required: ["success", "statusCode", "message", "data"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      statusCode: {
        type: "integer",
        example: 200,
      },

      message: {
        type: "string",
        example: "Resume parsed successfully.",
      },

      data: {
        $ref: "#/components/schemas/AtsAnalysisResult",
      },
    },
  },

  AtsAnalysisWithJobDescriptionResponse: {
    type: "object",
    required: ["success", "statusCode", "message", "data"],
    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      statusCode: {
        type: "integer",
        example: 200,
      },

      message: {
        type: "string",
        example: "Resume parsed successfully.",
      },

      data: {
        $ref: "#/components/schemas/AtsAnalysisWithJobDescriptionResult",
      },
    },
  },
};
