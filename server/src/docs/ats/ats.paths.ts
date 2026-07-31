import { OpenAPIV3 } from "openapi-types";

export const atsPaths: OpenAPIV3.PathsObject = {
  "/api/ats/analyze": {
    post: {
      tags: ["ATS Analysis"],
      summary: "Analyze resume text",
      description:
        "Parses resume text into sections, extracts supported technical skills, calculates an ATS score and returns recommendations.",
      operationId: "analyzeResumeText",
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
              $ref: "#/components/schemas/AnalyzeResumeRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Resume analyzed successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtsAnalysisResponse",
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

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/ats/analyze-with-job-description": {
    post: {
      tags: ["ATS Analysis"],
      summary: "Analyze resume against a job description",
      description:
        "Analyzes resume text, calculates an ATS score and compares extracted resume skills with skills detected in the supplied job description.",
      operationId: "analyzeResumeWithJobDescription",
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
              $ref: "#/components/schemas/AnalyzeResumeWithJobDescriptionRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Resume and job description analyzed successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtsAnalysisWithJobDescriptionResponse",
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

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};
