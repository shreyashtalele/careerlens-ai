import { IResume } from "../models/Resume.js";

export const mapResumeResponse = (resume: IResume) => {
  return {
    id: resume._id.toString(),
    owner: resume.owner,
    title: resume.title,
    personalDetails: resume.personalDetails,
    professionalSummary: resume.professionalSummary,
    skills: resume.skills,
    education: resume.education,
    experience: resume.experience,
    projects: resume.projects,
    certifications: resume.certifications,
    achievements: resume.achievements,
    languages: resume.languages,
    isDefault: resume.isDefault,
    createdAt: resume.createdAt,
    updatedAt: resume.updatedAt,
  };
};
