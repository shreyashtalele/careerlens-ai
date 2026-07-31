import Resume, { IResume } from "../models/Resume.js";

import { JwtPayload } from "../types/auth.types.js";
import { CreateResumeInput, UpdateResumeInput } from "../types/resume.types.js";

import { HTTP_STATUS } from "../constants/http-status.constants.js";
import {
  RESUME_LIMITS,
  RESUME_MESSAGES,
} from "../constants/resume.constants.js";

import ApiError from "../utils/ApiError.js";
import { mapResumeResponse } from "../utils/resume.mapper.js";

// ------------------------------------------------------
// Private Helper Functions
// ------------------------------------------------------

const getOwnedResume = async (resumeId: string, userId: string) => {
  const resume = await Resume.findOne({
    _id: resumeId,
    owner: userId,
  });

  if (!resume) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, RESUME_MESSAGES.RESUME_NOT_FOUND);
  }

  return resume;
};

const updateAllowedFields = (
  resume: IResume,
  resumeData: UpdateResumeInput,
) => {
  const allowedFields: (keyof UpdateResumeInput)[] = [
    "title",
    "personalDetails",
    "professionalSummary",
    "skills",
    "education",
    "experience",
    "projects",
    "certifications",
    "achievements",
    "languages",
  ];

  for (const field of allowedFields) {
    if (resumeData[field] !== undefined) {
      resume[field] = resumeData[field] as never;
    }
  }
};

// ------------------------------------------------------
// Service Functions
// ------------------------------------------------------

export const createResume = async (
  payload: JwtPayload,
  resumeData: CreateResumeInput,
) => {
  const totalResumes = await Resume.countDocuments({
    owner: payload.userId,
  });

  if (totalResumes >= RESUME_LIMITS.MAX_RESUMES_PER_USER) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      RESUME_MESSAGES.MAX_RESUME_LIMIT_REACHED,
    );
  }

  const trimmedTitle = resumeData.title.trim();

  const existingResume = await Resume.findOne({
    owner: payload.userId,
    title: trimmedTitle,
  }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingResume) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      RESUME_MESSAGES.RESUME_TITLE_ALREADY_EXISTS,
    );
  }

  const resume = await Resume.create({
    owner: payload.userId,
    ...resumeData,
    title: trimmedTitle,
    isDefault: totalResumes === 0,
  });

  return mapResumeResponse(resume);
};

export const getResumes = async (payload: JwtPayload) => {
  const resumes = await Resume.find({
    owner: payload.userId,
  }).sort({
    isDefault: -1,
    updatedAt: -1,
  });

  return resumes.map(mapResumeResponse);
};

export const getResumeById = async (payload: JwtPayload, resumeId: string) => {
  const resume = await getOwnedResume(resumeId, payload.userId);

  return mapResumeResponse(resume);
};

export const updateResume = async (
  payload: JwtPayload,
  resumeId: string,
  resumeData: UpdateResumeInput,
) => {
  const resume = await getOwnedResume(resumeId, payload.userId);

  if (resumeData.title !== undefined) {
    const trimmedTitle = resumeData.title.trim();

    const existingResume = await Resume.findOne({
      owner: payload.userId,
      title: trimmedTitle,
      _id: {
        $ne: resumeId,
      },
    }).collation({
      locale: "en",
      strength: 2,
    });

    if (existingResume) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        RESUME_MESSAGES.RESUME_TITLE_ALREADY_EXISTS,
      );
    }

    resumeData.title = trimmedTitle;
  }

  updateAllowedFields(resume, resumeData);

  await resume.save();

  return mapResumeResponse(resume);
};

export const setDefaultResume = async (
  payload: JwtPayload,
  resumeId: string,
) => {
  const resume = await getOwnedResume(resumeId, payload.userId);

  if (resume.isDefault) {
    return mapResumeResponse(resume);
  }

  await Resume.updateMany(
    {
      owner: payload.userId,
      isDefault: true,
    },
    {
      $set: {
        isDefault: false,
      },
    },
  );

  resume.isDefault = true;

  await resume.save();

  return mapResumeResponse(resume);
};

export const deleteResume = async (payload: JwtPayload, resumeId: string) => {
  const resume = await getOwnedResume(resumeId, payload.userId);

  const wasDefaultResume = resume.isDefault;

  await resume.deleteOne();

  if (wasDefaultResume) {
    const nextDefaultResume = await Resume.findOne({
      owner: payload.userId,
    }).sort({
      updatedAt: -1,
    });

    if (nextDefaultResume) {
      nextDefaultResume.isDefault = true;

      await nextDefaultResume.save();
    }
  }

  return null;
};
