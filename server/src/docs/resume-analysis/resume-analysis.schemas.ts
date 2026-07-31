import { OpenAPIV3 } from "openapi-types";

export const resumeAnalysisSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  ResumeAnalysisData: {
    type: "object",
    required: [
      "fileName",
      "mimeType",
      "size",
      "text",
      "characterCount",
      "wordCount",
    ],
    properties: {
      fileName: {
        type: "string",
        example: "shreyash-resume.pdf",
      },

      mimeType: {
        type: "string",
        enum: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        example: "application/pdf",
      },

      size: {
        type: "integer",
        minimum: 1,
        description: "Uploaded file size in bytes.",
        example: 245760,
      },

      text: {
        type: "string",
        description: "Text extracted from the uploaded resume.",
        example:
          "Full-stack developer with experience in React, Node.js and MongoDB.",
      },

      characterCount: {
        type: "integer",
        minimum: 0,
        example: 3250,
      },

      wordCount: {
        type: "integer",
        minimum: 0,
        example: 510,
      },
    },
  },

  UploadResumeResponse: {
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
        example: "Resume uploaded successfully",
      },

      data: {
        $ref: "#/components/schemas/ResumeAnalysisData",
      },
    },
  },
};
