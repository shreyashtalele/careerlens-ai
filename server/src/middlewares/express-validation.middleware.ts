import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";

const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(
      new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Validation failed",
        errors.array(),
      ),
    );
    return;
  }

  next();
};

export default handleValidationErrors;
