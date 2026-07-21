// Constants
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { AUTH_MESSAGES } from "../constants/messages.constants.js";

// Models
import User from "../models/User.js";

// Types
import {
  JwtPayload,
  LoginUserInput,
  RegisterUserInput,
} from "../types/auth.types.js";

// Utilities
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/jwt.js";
import { mapUserResponse } from "../utils/user.mapper.js";

export const registerUser = async (userData: RegisterUserInput) => {
  const { fullName, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, AUTH_MESSAGES.USER_ALREADY_EXISTS);
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const userResponse = mapUserResponse(user);

  return {
    user: userResponse,
    token,
  };
};

export const loginUser = async (loginData: LoginUserInput) => {
  const { email, password } = loginData;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.INVALID_CREDENTIALS,
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: mapUserResponse(user),
    token,
  };
};

export const getCurrentUser = async (payload: JwtPayload) => {
  const user = await User.findById(payload.userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return mapUserResponse(user);
};
