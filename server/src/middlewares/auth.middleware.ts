import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token is required");
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Authentication token is required");
  }

  try {
    const decodedToken = verifyToken(token);

    req.user = decodedToken;

    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default authenticate;
