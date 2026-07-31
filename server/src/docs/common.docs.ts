import { OpenAPIV3 } from "openapi-types";

export const commonSchemas: Record<string, OpenAPIV3.SchemaObject> = {
  SuccessResponse: {
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
        example: "Request completed successfully",
      },
      data: {
        nullable: true,
      },
    },
  },

  ErrorDetail: {
    type: "object",
    properties: {
      field: {
        type: "string",
        example: "email",
      },
      message: {
        type: "string",
        example: "Please enter a valid email",
      },
    },
  },

  ErrorResponse: {
    type: "object",
    required: ["success", "statusCode", "message", "errors"],
    properties: {
      success: {
        type: "boolean",
        example: false,
      },
      statusCode: {
        type: "integer",
        example: 400,
      },
      message: {
        type: "string",
        example: "Request failed",
      },
      errors: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ErrorDetail",
        },
      },
    },
  },

  ValidationErrorResponse: {
    type: "object",
    required: ["success", "statusCode", "message", "errors"],
    properties: {
      success: {
        type: "boolean",
        example: false,
      },
      statusCode: {
        type: "integer",
        example: 400,
      },
      message: {
        type: "string",
        example: "Validation failed",
      },
      errors: {
        type: "array",
        items: {
          $ref: "#/components/schemas/ErrorDetail",
        },
      },
    },
  },
};

export const commonResponses: Record<string, OpenAPIV3.ResponseObject> = {
  BadRequest: {
    description: "The request contains invalid input",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ValidationErrorResponse",
        },
      },
    },
  },

  Unauthorized: {
    description: "Authentication is required or the token is invalid",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
        examples: {
          tokenRequired: {
            summary: "Token was not provided",
            value: {
              success: false,
              statusCode: 401,
              message: "Authentication token is required",
              errors: [],
            },
          },
          invalidToken: {
            summary: "Token is invalid or expired",
            value: {
              success: false,
              statusCode: 401,
              message: "Invalid or expired token",
              errors: [],
            },
          },
        },
      },
    },
  },

  NotFound: {
    description: "The requested resource was not found",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
      },
    },
  },

  Conflict: {
    description: "The request conflicts with an existing resource",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
      },
    },
  },

  InternalServerError: {
    description: "An unexpected server error occurred",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
        example: {
          success: false,
          statusCode: 500,
          message: "Internal server error",
          errors: [],
        },
      },
    },
  },

  ServiceUnavailable: {
    description: "The external AI service is temporarily unavailable",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
        example: {
          success: false,
          statusCode: 503,
          message:
            "AI service is temporarily unavailable. Please try again later.",
          errors: [],
        },
      },
    },
  },
};
