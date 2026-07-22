import { IUser } from "../models/User.js";

export const mapUserResponse = (user: IUser) => {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    headline: user.headline,
    bio: user.bio,
    location: user.location,
    website: user.website,
    linkedin: user.linkedin,
    github: user.github,
    portfolio: user.portfolio,
    skills: user.skills,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
