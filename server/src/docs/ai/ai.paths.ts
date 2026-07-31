import { OpenAPIV3 } from "openapi-types";

export const aiPaths: OpenAPIV3.PathsObject = {
  "/api/ai/test": {
    get: {
      tags: ["AI"],
      summary: "Test Gemini connectivity",
      description:
        "Checks whether the configured Gemini model can successfully respond to a basic request.",
      operationId: "testAIConnection",

      responses: {
        "200": {
          description: "Gemini connection test completed successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AiTestSuccessResponse",
              },
            },
          },
        },

        "429": {
          description: "AI request quota or rate limit has been exceeded",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 429,
                message:
                  "AI request limit has been reached. Please try again shortly.",
                errors: [],
              },
            },
          },
        },

        "503": {
          $ref: "#/components/responses/ServiceUnavailable",
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/ai/resume-review": {
    post: {
      tags: ["AI"],
      summary: "Generate an AI resume review",
      description:
        "Generates a structured resume review using the supplied resume text, ATS analysis, and optional job description.",
      operationId: "generateAIResumeReview",
      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AIResumeReviewRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "AI resume review generated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AIResumeReviewSuccessResponse",
              },
            },
          },
        },

        "400": {
          $ref: "#/components/responses/BadRequest",
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },

        "429": {
          description: "AI request quota or rate limit has been exceeded",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 429,
                message:
                  "AI request limit has been reached. Please try again shortly.",
                errors: [],
              },
            },
          },
        },

        "502": {
          description:
            "The AI provider returned an invalid or unusable structured response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 502,
                message: "AI service returned an invalid response.",
                errors: [],
              },
            },
          },
        },

        "503": {
          $ref: "#/components/responses/ServiceUnavailable",
        },

        "504": {
          description:
            "The AI provider did not respond within the allowed time",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 504,
                message:
                  "AI service took too long to respond. Please try again.",
                errors: [],
              },
            },
          },
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/ai/interview-questions": {
    post: {
      tags: ["AI"],
      summary: "Generate personalized interview questions",
      description:
        "Generates technical, project, behavioral, HR, and follow-up interview questions using the supplied resume text, ATS analysis, optional job description, difficulty, and question count.",
      operationId: "generateInterviewQuestions",
      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/InterviewQuestionGeneratorRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Interview questions generated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/InterviewQuestionGeneratorSuccessResponse",
              },
            },
          },
        },

        "400": {
          $ref: "#/components/responses/BadRequest",
        },

        "401": {
          $ref: "#/components/responses/Unauthorized",
        },

        "429": {
          description: "AI request quota or rate limit has been exceeded",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 429,
                message:
                  "AI request limit has been reached. Please try again shortly.",
                errors: [],
              },
            },
          },
        },

        "502": {
          description:
            "The AI provider returned an invalid response or an incorrect number of primary questions",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 502,
                message: "AI returned an invalid interview question response.",
                errors: [
                  {
                    expectedQuestionCount: 10,
                    receivedQuestionCount: 8,
                  },
                ],
              },
            },
          },
        },

        "503": {
          $ref: "#/components/responses/ServiceUnavailable",
        },

        "504": {
          description:
            "The AI provider did not respond within the allowed time",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 504,
                message:
                  "AI service took too long to respond. Please try again.",
                errors: [],
              },
            },
          },
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};
