import { Request, Response } from "express";

import {
  createResume,
  deleteResume,
  getResumeById,
  getResumes,
  setDefaultResume,
  updateResume,
} from "../services/resume.service.js";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { RESUME_MESSAGES } from "../constants/resume.constants.js";

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// ------------------------------------------------------
// Private Helper Functions
// ------------------------------------------------------

const getResumeIdFromParams = (req: Request): string => {
  const { resumeId } = req.params;

  if (typeof resumeId !== "string") {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      RESUME_MESSAGES.INVALID_RESUME_ID,
    );
  }

  return resumeId;
};

// ------------------------------------------------------
// Controller Functions
// ------------------------------------------------------

export const createResumeController = asyncHandler(
  async (req: Request, res: Response) => {
    const resume = await createResume(req.user!, req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          RESUME_MESSAGES.RESUME_CREATED,
          resume,
        ),
      );
  },
);

export const getResumesController = asyncHandler(
  async (req: Request, res: Response) => {
    const resumes = await getResumes(req.user!);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          RESUME_MESSAGES.RESUMES_FETCHED,
          resumes,
        ),
      );
  },
);

export const getResumeByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const resumeId = getResumeIdFromParams(req);

    const resume = await getResumeById(req.user!, resumeId);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, RESUME_MESSAGES.RESUME_FETCHED, resume),
      );
  },
);

export const updateResumeController = asyncHandler(
  async (req: Request, res: Response) => {
    const resumeId = getResumeIdFromParams(req);

    const resume = await updateResume(req.user!, resumeId, req.body);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, RESUME_MESSAGES.RESUME_UPDATED, resume),
      );
  },
);

export const setDefaultResumeController = asyncHandler(
  async (req: Request, res: Response) => {
    const resumeId = getResumeIdFromParams(req);

    const resume = await setDefaultResume(req.user!, resumeId);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          RESUME_MESSAGES.RESUME_SET_AS_DEFAULT,
          resume,
        ),
      );
  },
);

export const deleteResumeController = asyncHandler(
  async (req: Request, res: Response) => {
    const resumeId = getResumeIdFromParams(req);

    await deleteResume(req.user!, resumeId);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, RESUME_MESSAGES.RESUME_DELETED, null),
      );
  },
);
