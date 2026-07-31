import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;

  let message = "Internal server error";
  let errors: unknown[] = [];

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Validation failed";

    errors = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));
  } else if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    statusCode = HTTP_STATUS.CONFLICT;
    message = "Duplicate value already exists";
  } else if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    ...(process.env.NODE_ENV === "development" && {
      stack: error instanceof Error ? error.stack : undefined,
    }),
  });
};

export default errorHandler;
