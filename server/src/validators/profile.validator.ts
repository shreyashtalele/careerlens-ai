import { body } from "express-validator";

export const updateProfileValidator = [
  body("phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone number cannot exceed 20 characters"),

  body("headline")
    .optional()
    .trim()
    .isLength({ max: 120 })
    .withMessage("Headline cannot exceed 120 characters"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Bio cannot exceed 1000 characters"),

  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL"),

  body("linkedin")
    .optional()
    .trim()
    .isURL()
    .withMessage("LinkedIn URL must be valid"),

  body("github")
    .optional()
    .trim()
    .isURL()
    .withMessage("GitHub URL must be valid"),

  body("portfolio")
    .optional()
    .trim()
    .isURL()
    .withMessage("Portfolio URL must be valid"),

  body("skills")
    .optional()
    .isArray({ max: 30 })
    .withMessage("Skills must be an array with a maximum of 30 items"),
];
