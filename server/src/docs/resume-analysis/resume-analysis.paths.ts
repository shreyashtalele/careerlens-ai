import { OpenAPIV3 } from "openapi-types";

export const resumeAnalysisPaths: OpenAPIV3.PathsObject = {
  "/api/resume-analysis/upload": {
    post: {
      tags: ["Resume Analysis"],
      summary: "Upload and analyze a resume",
      description:
        "Uploads a PDF or DOCX resume, extracts its text and returns file metadata, character count and word count.",
      operationId: "uploadResume",
      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["resume"],
              properties: {
                resume: {
                  type: "string",
                  format: "binary",
                  description:
                    "Resume file. Supported formats are PDF and DOCX.",
                },
              },
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Resume uploaded and analyzed successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UploadResumeResponse",
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
