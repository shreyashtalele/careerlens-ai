// Constants
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { AUTH_MESSAGES } from "../constants/messages.constants.js";

// Models
import User from "../models/User.js";

// Types
import { JwtPayload } from "../types/auth.types.js";
import { UpdateProfileInput } from "../types/profile.types.js";

// Utilities
import ApiError from "../utils/ApiError.js";
import { mapUserResponse } from "../utils/user.mapper.js";

export const getProfile = async (payload: JwtPayload) => {
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }

  return mapUserResponse(user);
};

export const updateProfile = async (
  payload: JwtPayload,
  profileData: UpdateProfileInput,
) => {
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }

  if (profileData.phone !== undefined) {
    user.phone = profileData.phone;
  }

  if (profileData.headline !== undefined) {
    user.headline = profileData.headline;
  }

  if (profileData.bio !== undefined) {
    user.bio = profileData.bio;
  }

  if (profileData.location !== undefined) {
    user.location = profileData.location;
  }

  if (profileData.website !== undefined) {
    user.website = profileData.website;
  }

  if (profileData.linkedin !== undefined) {
    user.linkedin = profileData.linkedin;
  }

  if (profileData.github !== undefined) {
    user.github = profileData.github;
  }

  if (profileData.portfolio !== undefined) {
    user.portfolio = profileData.portfolio;
  }

  if (profileData.skills !== undefined) {
    user.skills = profileData.skills;
  }

  await user.save();

  return mapUserResponse(user);
};

export const deleteProfile = async (payload: JwtPayload) => {
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }

  await user.deleteOne();

  return null;
};
