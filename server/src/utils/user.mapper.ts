import { IUser } from "../models/User.js";

export const mapUserResponse = (user: IUser) => {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
