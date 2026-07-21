import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        AUTH_MESSAGES.USER_REGISTERED,
        result,
      ),
    );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, AUTH_MESSAGES.LOGIN_SUCCESS, result));
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.user!);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, AUTH_MESSAGES.USER_FETCHED, user));
});
