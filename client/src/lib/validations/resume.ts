import { z } from "zod";

// Reusable schemas
const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .or(z.string().length(0))
  .optional();

const dateSchema = z.string().min(1, "Date is required");

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: dateSchema,
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: dateSchema,
  endDate: dateSchema,
});

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()),
  link: urlSchema,
});

const personalDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: urlSchema,
  github: urlSchema,
  website: urlSchema,
});

export const resumeSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  personalDetails: personalDetailsSchema,
  summary: z.string().max(500, "Summary is too long").optional(),
  skills: z.array(z.string()),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
