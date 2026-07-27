import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";

const validateRequest =
  (schema: ZodType) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Validation failed",
            error.issues,
          ),
        );
        return;
      }

      next(error);
    }
  };

export default validateRequest;
