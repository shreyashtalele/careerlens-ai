import { JwtPayload } from "../../types/auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export {};
