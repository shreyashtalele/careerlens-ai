import { Request, Response } from "express";

import { MOCK_INTERVIEW_MESSAGES } from "../constants/mock-interview.constants.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

import {
  finishMockInterview as finishMockInterviewService,
  getCurrentInterviewQuestion as getCurrentInterviewQuestionService,
  startMockInterview as startMockInterviewService,
  submitMockInterviewAnswer as submitMockInterviewAnswerService,
} from "../services/mock-interview.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const startMockInterview = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await startMockInterviewService({
      userId: req.user!.userId,
      resumeId: req.body.resumeId,
      jobDescription: req.body.jobDescription,
      difficulty: req.body.difficulty,
      questionCount: req.body.questionCount,
    });

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          MOCK_INTERVIEW_MESSAGES.SESSION_CREATED,
          result,
        ),
      );
  },
);

export const getCurrentInterviewQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getCurrentInterviewQuestionService({
      userId: req.user!.userId,
      sessionId: req.params.sessionId as string,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          MOCK_INTERVIEW_MESSAGES.QUESTION_FETCHED,
          result,
        ),
      );
  },
);

export const submitMockInterviewAnswer = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await submitMockInterviewAnswerService({
      userId: req.user!.userId,
      sessionId: req.params.sessionId as string,
      answer: req.body.answer,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          MOCK_INTERVIEW_MESSAGES.ANSWER_SUBMITTED,
          result,
        ),
      );
  },
);

export const finishMockInterview = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await finishMockInterviewService({
      userId: req.user!.userId,
      sessionId: req.params.sessionId as string,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          MOCK_INTERVIEW_MESSAGES.INTERVIEW_COMPLETED,
          result,
        ),
      );
  },
);
