import { z } from "zod";

// URL validation - allows empty string or valid URL
const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .or(z.string().length(0)) // Allow empty string
  .optional();

// Phone validation - allows empty string or valid phone
const phoneSchema = z
  .string()
  .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid phone number")
  .or(z.string().length(0)) // Allow empty string
  .optional();

export const profileSchema = z.object({
  headline: z.string().max(100, "Headline is too long").optional(),
  bio: z.string().max(500, "Bio is too long").optional(),
  location: z.string().max(100, "Location is too long").optional(),
  phone: phoneSchema,
  website: urlSchema,
  github: urlSchema,
  linkedin: urlSchema,
  portfolio: urlSchema,
});

export type ProfileFormData = z.infer<typeof profileSchema>;
