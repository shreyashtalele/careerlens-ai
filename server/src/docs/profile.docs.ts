import { OpenAPIV3 } from "openapi-types";

export const profileSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  UpdateProfileRequest: {
    type: "object",
    additionalProperties: false,
    properties: {
      phone: {
        type: "string",
        maxLength: 20,
        example: "+91 9876543210",
      },
      headline: {
        type: "string",
        maxLength: 120,
        example: "Full-Stack Developer",
      },
      bio: {
        type: "string",
        maxLength: 1000,
        example:
          "Full-stack developer experienced in React, Node.js and TypeScript.",
      },
      location: {
        type: "string",
        maxLength: 100,
        example: "Pune, Maharashtra",
      },
      website: {
        type: "string",
        format: "uri",
        example: "https://example.com",
      },
      linkedin: {
        type: "string",
        format: "uri",
        example: "https://www.linkedin.com/in/example",
      },
      github: {
        type: "string",
        format: "uri",
        example: "https://github.com/example",
      },
      portfolio: {
        type: "string",
        format: "uri",
        example: "https://portfolio.example.com",
      },
      skills: {
        type: "array",
        maxItems: 30,
        items: {
          type: "string",
          maxLength: 50,
        },
        example: ["JavaScript", "React", "Node.js"],
      },
    },
  },

  ProfileSuccessResponse: {
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
        example: "Profile fetched successfully",
      },
      data: {
        $ref: "#/components/schemas/User",
      },
    },
  },

  DeleteProfileSuccessResponse: {
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
        example: "Profile deleted successfully",
      },
      data: {
        nullable: true,
        example: null,
      },
    },
  },
};

export const profilePaths: OpenAPIV3.PathsObject = {
  "/api/profile": {
    get: {
      tags: ["Profile"],
      summary: "Get the authenticated user profile",
      description:
        "Returns the profile details of the currently authenticated user.",
      operationId: "getProfile",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "Profile fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProfileSuccessResponse",
              },
              example: {
                success: true,
                statusCode: 200,
                message: "Profile fetched successfully",
                data: {
                  id: "66ac1209e531fa006a123456",
                  fullName: "Shreyash Talele",
                  email: "shreyash@example.com",
                  role: "user",
                  phone: "+91 9876543210",
                  headline: "Full-Stack Developer",
                  bio: "Full-stack developer experienced in React and Node.js.",
                  location: "Pune, Maharashtra",
                  website: "https://example.com",
                  linkedin: "https://www.linkedin.com/in/example",
                  github: "https://github.com/example",
                  portfolio: "https://portfolio.example.com",
                  skills: ["JavaScript", "React", "Node.js"],
                  createdAt: "2026-07-31T13:30:00.000Z",
                  updatedAt: "2026-07-31T14:00:00.000Z",
                },
              },
            },
          },
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "404": {
          description: "The authenticated user no longer exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 404,
                message: "User not found",
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

    patch: {
      tags: ["Profile"],
      summary: "Update the authenticated user profile",
      description:
        "Updates one or more optional profile fields for the currently authenticated user.",
      operationId: "updateProfile",
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
              $ref: "#/components/schemas/UpdateProfileRequest",
            },
            example: {
              phone: "+91 9876543210",
              headline: "Full-Stack Developer",
              bio: "I build production-ready web applications.",
              location: "Pune, Maharashtra",
              website: "https://example.com",
              linkedin: "https://www.linkedin.com/in/example",
              github: "https://github.com/example",
              portfolio: "https://portfolio.example.com",
              skills: ["JavaScript", "React", "Node.js"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Profile updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProfileSuccessResponse",
              },
              example: {
                success: true,
                statusCode: 200,
                message: "Profile updated successfully",
                data: {
                  id: "66ac1209e531fa006a123456",
                  fullName: "Shreyash Talele",
                  email: "shreyash@example.com",
                  role: "user",
                  phone: "+91 9876543210",
                  headline: "Full-Stack Developer",
                  bio: "I build production-ready web applications.",
                  location: "Pune, Maharashtra",
                  website: "https://example.com",
                  linkedin: "https://www.linkedin.com/in/example",
                  github: "https://github.com/example",
                  portfolio: "https://portfolio.example.com",
                  skills: ["JavaScript", "React", "Node.js"],
                  createdAt: "2026-07-31T13:30:00.000Z",
                  updatedAt: "2026-07-31T14:00:00.000Z",
                },
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
          description: "The authenticated user no longer exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 404,
                message: "User not found",
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

    delete: {
      tags: ["Profile"],
      summary: "Delete the authenticated user profile",
      description:
        "Permanently deletes the currently authenticated user account and profile.",
      operationId: "deleteProfile",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "Profile deleted successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DeleteProfileSuccessResponse",
              },
              example: {
                success: true,
                statusCode: 200,
                message: "Profile deleted successfully",
                data: null,
              },
            },
          },
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "404": {
          description: "The authenticated user no longer exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 404,
                message: "User not found",
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
