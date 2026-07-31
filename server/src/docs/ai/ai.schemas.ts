import { OpenAPIV3 } from "openapi-types";

export const aiSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  AiTestSuccessResponse: {
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
        example: "Gemini is connected to CareerLens AI.",
      },

      data: {
        nullable: true,
        example: null,
      },
    },
  },

  AIResumeReviewRequest: {
    type: "object",
    additionalProperties: false,
    required: ["resumeText", "atsAnalysis"],
    properties: {
      resumeText: {
        type: "string",
        minLength: 50,
        maxLength: 30000,
        description: "Plain text extracted from the candidate's resume.",
        example:
          "Full-stack developer with experience in React, Node.js, TypeScript, MongoDB and REST API development.",
      },

      atsAnalysis: {
        $ref: "#/components/schemas/AtsAnalysisResult",
      },

      jobDescription: {
        type: "string",
        maxLength: 15000,
        description:
          "Optional job description used to personalize the AI resume review.",
        example:
          "We are looking for a full-stack developer with React, Node.js, TypeScript, MongoDB, Docker and AWS experience.",
      },
    },
  },

  AIResumeReviewSectionSuggestions: {
    type: "object",
    required: ["summary", "experience", "projects", "skills", "education"],
    properties: {
      summary: {
        type: "string",
        example:
          "Add measurable impact and clearly state your strongest technologies.",
      },

      experience: {
        type: "string",
        example:
          "Use action verbs and include measurable results where available.",
      },

      projects: {
        type: "string",
        example:
          "Explain the problem solved, your contribution and the technical outcome.",
      },

      skills: {
        type: "string",
        example:
          "Group skills by category and prioritize skills relevant to the target role.",
      },

      education: {
        type: "string",
        example:
          "Keep education concise and include relevant coursework only when useful.",
      },
    },
  },

  AIResumeReviewResult: {
    type: "object",
    required: [
      "overallReview",
      "strengths",
      "weaknesses",
      "sectionSuggestions",
      "keywordSuggestions",
      "recruiterFeedback",
      "improvedSummary",
      "nextSteps",
    ],
    properties: {
      overallReview: {
        type: "string",
        example:
          "The resume has a solid technical foundation but would benefit from stronger measurable achievements and role-specific keywords.",
      },

      strengths: {
        type: "array",
        items: {
          type: "string",
        },
        example: [
          "Clear full-stack technology focus",
          "Relevant project experience",
          "Good coverage of modern JavaScript tools",
        ],
      },

      weaknesses: {
        type: "array",
        items: {
          type: "string",
        },
        example: [
          "Limited measurable impact",
          "Project descriptions are too brief",
        ],
      },

      sectionSuggestions: {
        $ref: "#/components/schemas/AIResumeReviewSectionSuggestions",
      },

      keywordSuggestions: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["REST API", "Docker", "AWS", "Performance Optimization"],
      },

      recruiterFeedback: {
        type: "string",
        example:
          "The candidate appears suitable for junior to mid-level full-stack roles, but the resume should better demonstrate outcomes and ownership.",
      },

      improvedSummary: {
        type: "string",
        example:
          "Full-stack developer experienced in building responsive web applications and REST APIs using React, Node.js, TypeScript and MongoDB.",
      },

      nextSteps: {
        type: "array",
        items: {
          type: "string",
        },
        example: [
          "Add measurable project outcomes",
          "Tailor keywords to the target job description",
          "Strengthen experience descriptions",
        ],
      },
    },
  },

  AIResumeReviewSuccessResponse: {
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
        example: "AI resume review generated successfully.",
      },

      data: {
        $ref: "#/components/schemas/AIResumeReviewResult",
      },
    },
  },

  InterviewQuestionGeneratorRequest: {
    type: "object",
    additionalProperties: false,
    required: ["resumeText", "atsAnalysis"],
    properties: {
      resumeText: {
        type: "string",
        minLength: 50,
        maxLength: 30000,
        description: "Plain text extracted from the candidate's resume.",
        example:
          "Full-stack developer with experience in React, Node.js, Express, MongoDB and REST APIs.",
      },

      atsAnalysis: {
        $ref: "#/components/schemas/AtsAnalysisResult",
      },

      jobDescription: {
        type: "string",
        maxLength: 15000,
        description:
          "Optional job description used to personalize the interview questions.",
        example:
          "We are hiring a React and Node.js developer with experience in REST APIs, MongoDB and Docker.",
      },

      difficulty: {
        type: "string",
        enum: ["easy", "medium", "hard"],
        default: "medium",
        example: "medium",
      },

      questionCount: {
        type: "integer",
        minimum: 5,
        maximum: 30,
        default: 10,
        example: 10,
      },
    },
  },

  InterviewQuestion: {
    type: "object",
    required: ["question", "difficulty", "topic", "reason"],
    properties: {
      question: {
        type: "string",
        example:
          "How would you structure authentication middleware in an Express application?",
      },

      difficulty: {
        type: "string",
        enum: ["easy", "medium", "hard"],
        example: "medium",
      },

      topic: {
        type: "string",
        example: "Node.js Authentication",
      },

      reason: {
        type: "string",
        example:
          "JWT authentication and Express are listed in the candidate's resume.",
      },
    },
  },

  InterviewQuestionGeneratorResult: {
    type: "object",
    required: [
      "technicalQuestions",
      "projectQuestions",
      "behavioralQuestions",
      "hrQuestions",
      "followUpQuestions",
      "preparationTips",
    ],
    properties: {
      technicalQuestions: {
        type: "array",
        items: {
          $ref: "#/components/schemas/InterviewQuestion",
        },
      },

      projectQuestions: {
        type: "array",
        items: {
          $ref: "#/components/schemas/InterviewQuestion",
        },
      },

      behavioralQuestions: {
        type: "array",
        items: {
          $ref: "#/components/schemas/InterviewQuestion",
        },
      },

      hrQuestions: {
        type: "array",
        items: {
          $ref: "#/components/schemas/InterviewQuestion",
        },
      },

      followUpQuestions: {
        type: "array",
        maxItems: 5,
        items: {
          $ref: "#/components/schemas/InterviewQuestion",
        },
      },

      preparationTips: {
        type: "array",
        items: {
          type: "string",
        },
        example: [
          "Prepare concise explanations for your main projects.",
          "Review React rendering and optimization concepts.",
          "Practice explaining JWT authentication flow.",
        ],
      },
    },
  },

  InterviewQuestionGeneratorSuccessResponse: {
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
        example: "Interview questions generated successfully.",
      },

      data: {
        $ref: "#/components/schemas/InterviewQuestionGeneratorResult",
      },
    },
  },
};
