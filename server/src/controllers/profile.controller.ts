import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { PROFILE_MESSAGES } from "../constants/profile.constants.js";
import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "../services/profile.service.js";

export const getProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await getProfile(req.user!);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          PROFILE_MESSAGES.PROFILE_FETCHED,
          profile,
        ),
      );
  },
);

export const updateProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const profile = await updateProfile(req.user!, req.body);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          PROFILE_MESSAGES.PROFILE_UPDATED,
          profile,
        ),
      );
  },
);

export const deleteProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteProfile(req.user!);

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, PROFILE_MESSAGES.PROFILE_DELETED, null),
      );
  },
);
