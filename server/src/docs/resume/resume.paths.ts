import { OpenAPIV3 } from "openapi-types";

export const resumePaths: OpenAPIV3.PathsObject = {
  "/api/resumes": {
    post: {
      tags: ["Resumes"],
      summary: "Create a resume",
      description:
        "Creates a new resume for the authenticated user. The first resume created by a user is automatically marked as the default resume.",
      operationId: "createResume",
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
              $ref: "#/components/schemas/CreateResumeRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "Resume created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResumeResponse",
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

        "409": {
          $ref: "#/components/responses/Conflict",
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },

    get: {
      tags: ["Resumes"],
      summary: "Get all resumes",
      description: "Returns all resumes belonging to the authenticated user.",
      operationId: "getResumes",
      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        "200": {
          description: "Resumes fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResumeListResponse",
              },
            },
          },
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

  "/api/resumes/{resumeId}": {
    get: {
      tags: ["Resumes"],
      summary: "Get a resume by ID",
      description:
        "Returns a single resume belonging to the authenticated user.",
      operationId: "getResumeById",
      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "resumeId",
          in: "path",
          required: true,
          description: "MongoDB ID of the resume",
          schema: {
            type: "string",
            example: "66ac1209e531fa006a123456",
          },
        },
      ],

      responses: {
        "200": {
          description: "Resume fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResumeResponse",
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

        "404": {
          $ref: "#/components/responses/NotFound",
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },

    patch: {
      tags: ["Resumes"],
      summary: "Update a resume",
      description:
        "Updates one or more editable fields of a resume belonging to the authenticated user.",
      operationId: "updateResume",
      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "resumeId",
          in: "path",
          required: true,
          description: "MongoDB ID of the resume",
          schema: {
            type: "string",
            example: "66ac1209e531fa006a123456",
          },
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateResumeRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Resume updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResumeResponse",
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

        "404": {
          $ref: "#/components/responses/NotFound",
        },

        "409": {
          $ref: "#/components/responses/Conflict",
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },

    delete: {
      tags: ["Resumes"],
      summary: "Delete a resume",
      description:
        "Deletes a resume belonging to the authenticated user. If the deleted resume was the default resume, the newest remaining resume is automatically assigned as the default.",
      operationId: "deleteResume",
      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "resumeId",
          in: "path",
          required: true,
          description: "MongoDB ID of the resume",
          schema: {
            type: "string",
            example: "66ac1209e531fa006a123456",
          },
        },
      ],

      responses: {
        "200": {
          description: "Resume deleted successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DeleteResumeResponse",
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

        "404": {
          $ref: "#/components/responses/NotFound",
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },

  "/api/resumes/{resumeId}/default": {
    patch: {
      tags: ["Resumes"],
      summary: "Set a resume as default",
      description:
        "Marks the selected resume as the authenticated user's default resume and removes the default status from other resumes.",
      operationId: "setDefaultResume",
      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "resumeId",
          in: "path",
          required: true,
          description: "MongoDB ID of the resume",
          schema: {
            type: "string",
            example: "66ac1209e531fa006a123456",
          },
        },
      ],

      responses: {
        "200": {
          description: "Resume set as default successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResumeResponse",
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

        "404": {
          $ref: "#/components/responses/NotFound",
        },

        "500": {
          $ref: "#/components/responses/InternalServerError",
        },
      },
    },
  },
};
