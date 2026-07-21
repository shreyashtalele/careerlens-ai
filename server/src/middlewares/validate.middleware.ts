import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Validation failed",
      errors.array(),
    );
  }

  next();
};

export default validateRequest;
