import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types.js";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret is missing");
  }

  return secret;
};

export const generateToken = (payload: JwtPayload): string => {
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!expiresIn) {
    throw new Error("JWT expiry configuration is missing");
  }

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, getJwtSecret(), options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};
