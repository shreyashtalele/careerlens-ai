// Centralized error handling for the application

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    code?: string,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    // Remove the problematic line - Error.captureStackTrace is not needed
  }
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const handleError = (error: unknown): ErrorResponse => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      isOperational: error.isOperational,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || "An unexpected error occurred",
      statusCode: 500,
      isOperational: false,
    };
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
    isOperational: false,
  };
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError || error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
};

export const logError = (error: unknown, context?: string): void => {
  const errorResponse = handleError(error);
  console.error(`[${context || "App"} Error]:`, {
    message: errorResponse.message,
    statusCode: errorResponse.statusCode,
    timestamp: new Date().toISOString(),
    context: context || "Application",
  });

  // In production, you would send this to a monitoring service like Sentry
  if (import.meta.env.PROD) {
    // Example: Sentry.captureException(error);
  }
};

export const createApiError = (
  message: string,
  statusCode: number,
  code?: string,
): AppError => {
  return new AppError(message, statusCode, true, code);
};

export const handleApiError = (error: unknown): string => {
  const response = error as {
    response?: {
      data?: {
        message?: string;
        errors?: Array<{ field: string; message: string }>;
      };
      status: number;
    };
  };

  if (response?.response?.data?.message) {
    return response.response.data.message;
  }

  if (response?.response?.data?.errors) {
    const messages = response.response.data.errors.map((e) => e.message);
    return messages.join(", ");
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};
