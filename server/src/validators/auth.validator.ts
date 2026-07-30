import { z } from "zod";

export const registerValidator = z.object({
  body: z.object({
    fullName: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must not exceed 50 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email")
      .toLowerCase(),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
  }),
});

export const loginValidator = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email")
      .toLowerCase(),

    password: z.string().min(1, "Password is required"),
  }),
});
