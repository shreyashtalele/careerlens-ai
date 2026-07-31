import { OpenAPIV3 } from "openapi-types";

export const healthPaths: OpenAPIV3.PathsObject = {
  "/api/health": {
    get: {
      tags: ["Health"],
      summary: "Check API health",
      description:
        "Returns the current availability status of the CareerLens AI API.",
      operationId: "getApiHealth",
      responses: {
        "200": {
          description: "API is running",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessResponse",
              },
              example: {
                success: true,
                message: "CareerLens AI API is running",
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
