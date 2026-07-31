import { OpenAPIV3 } from "openapi-types";

export const authSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  RegisterRequest: {
    type: "object",
    additionalProperties: false,
    required: ["fullName", "email", "password"],
    properties: {
      fullName: {
        type: "string",
        minLength: 3,
        maxLength: 50,
        example: "Shreyash Talele",
      },
      email: {
        type: "string",
        format: "email",
        example: "shreyash@example.com",
      },
      password: {
        type: "string",
        format: "password",
        minLength: 8,
        writeOnly: true,
        example: "StrongPassword123",
      },
    },
  },

  LoginRequest: {
    type: "object",
    additionalProperties: false,
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "shreyash@example.com",
      },
      password: {
        type: "string",
        format: "password",
        writeOnly: true,
        example: "StrongPassword123",
      },
    },
  },

  User: {
    type: "object",
    required: [
      "id",
      "fullName",
      "email",
      "role",
      "skills",
      "createdAt",
      "updatedAt",
    ],
    properties: {
      id: {
        type: "string",
        example: "66ac1209e531fa006a123456",
      },
      fullName: {
        type: "string",
        example: "Shreyash Talele",
      },
      email: {
        type: "string",
        format: "email",
        example: "shreyash@example.com",
      },
      role: {
        type: "string",
        example: "user",
      },
      phone: {
        type: "string",
        nullable: true,
        maxLength: 20,
        example: "+91 9876543210",
      },
      headline: {
        type: "string",
        nullable: true,
        maxLength: 120,
        example: "Full-Stack Developer",
      },
      bio: {
        type: "string",
        nullable: true,
        maxLength: 1000,
        example:
          "Full-stack developer experienced in React, Node.js and TypeScript.",
      },
      location: {
        type: "string",
        nullable: true,
        maxLength: 100,
        example: "Pune, Maharashtra",
      },
      website: {
        type: "string",
        format: "uri",
        nullable: true,
        example: "https://example.com",
      },
      linkedin: {
        type: "string",
        format: "uri",
        nullable: true,
        example: "https://www.linkedin.com/in/example",
      },
      github: {
        type: "string",
        format: "uri",
        nullable: true,
        example: "https://github.com/example",
      },
      portfolio: {
        type: "string",
        format: "uri",
        nullable: true,
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
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-07-31T13:30:00.000Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-07-31T13:30:00.000Z",
      },
    },
  },

  AuthResult: {
    type: "object",
    required: ["user", "token"],
    properties: {
      user: {
        $ref: "#/components/schemas/User",
      },
      token: {
        type: "string",
        description:
          "JWT access token. Send it in the Authorization header using the Bearer scheme.",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  },

  AuthSuccessResponse: {
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
        example: "Login successful",
      },
      data: {
        $ref: "#/components/schemas/AuthResult",
      },
    },
  },

  CurrentUserSuccessResponse: {
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
        example: "User fetched successfully",
      },
      data: {
        $ref: "#/components/schemas/User",
      },
    },
  },
};

export const authPaths: OpenAPIV3.PathsObject = {
  "/api/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register a new user",
      description:
        "Creates a new user account, hashes the password, and returns the public user details with a JWT access token.",
      operationId: "registerUser",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthSuccessResponse",
              },
              example: {
                success: true,
                statusCode: 201,
                message: "User registered successfully",
                data: {
                  user: {
                    id: "66ac1209e531fa006a123456",
                    fullName: "Shreyash Talele",
                    email: "shreyash@example.com",
                    role: "user",
                    skills: [],
                    createdAt: "2026-07-31T13:30:00.000Z",
                    updatedAt: "2026-07-31T13:30:00.000Z",
                  },
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "409": {
          description: "A user with the provided email already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 409,
                message: "User already exists",
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

  "/api/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Log in a user",
      description:
        "Authenticates a user using email and password and returns a JWT access token.",
      operationId: "loginUser",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthSuccessResponse",
              },
              example: {
                success: true,
                statusCode: 200,
                message: "Login successful",
                data: {
                  user: {
                    id: "66ac1209e531fa006a123456",
                    fullName: "Shreyash Talele",
                    email: "shreyash@example.com",
                    role: "user",
                    skills: ["JavaScript", "React"],
                    createdAt: "2026-07-31T13:30:00.000Z",
                    updatedAt: "2026-07-31T13:30:00.000Z",
                  },
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/BadRequest",
        },
        "401": {
          description: "The email or password is incorrect",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                statusCode: 401,
                message: "Invalid email or password",
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

  "/api/auth/me": {
    get: {
      tags: ["Authentication"],
      summary: "Get the authenticated user",
      description:
        "Returns the public details of the user associated with the supplied JWT access token.",
      operationId: "getCurrentUser",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "Authenticated user fetched successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CurrentUserSuccessResponse",
              },
            },
          },
        },
        "401": {
          $ref: "#/components/responses/Unauthorized",
        },
        "404": {
          description: "The user associated with the token no longer exists",
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
