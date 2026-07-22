import { body, param } from "express-validator";
import { RESUME_LIMITS } from "../constants/resume.constants.js";

const urlOptions = {
  protocols: ["http", "https"],
  require_protocol: true,
};

const personalDetailsValidators = [
  body("personalDetails")
    .exists()
    .withMessage("Personal details are required")
    .bail()
    .isObject()
    .withMessage("Personal details must be an object"),

  body("personalDetails.fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Full name cannot exceed 100 characters"),

  body("personalDetails.email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .isLength({ max: 150 })
    .withMessage("Email cannot exceed 150 characters"),

  body("personalDetails.phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone cannot exceed 20 characters"),

  body("personalDetails.location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("personalDetails.linkedin")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid LinkedIn URL")
    .isLength({ max: 300 })
    .withMessage("LinkedIn URL cannot exceed 300 characters"),

  body("personalDetails.github")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid GitHub URL")
    .isLength({ max: 300 })
    .withMessage("GitHub URL cannot exceed 300 characters"),

  body("personalDetails.portfolio")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid portfolio URL")
    .isLength({ max: 300 })
    .withMessage("Portfolio URL cannot exceed 300 characters"),

  body("personalDetails.website")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid website URL")
    .isLength({ max: 300 })
    .withMessage("Website URL cannot exceed 300 characters"),
];

const optionalPersonalDetailsValidators = [
  body("personalDetails")
    .optional()
    .isObject()
    .withMessage("Personal details must be an object"),

  body("personalDetails.fullName")
    .if(body("personalDetails").exists())
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Full name cannot exceed 100 characters"),

  body("personalDetails.email")
    .if(body("personalDetails").exists())
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .isLength({ max: 150 })
    .withMessage("Email cannot exceed 150 characters"),

  body("personalDetails.phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone cannot exceed 20 characters"),

  body("personalDetails.location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("personalDetails.linkedin")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid LinkedIn URL")
    .isLength({ max: 300 })
    .withMessage("LinkedIn URL cannot exceed 300 characters"),

  body("personalDetails.github")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid GitHub URL")
    .isLength({ max: 300 })
    .withMessage("GitHub URL cannot exceed 300 characters"),

  body("personalDetails.portfolio")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid portfolio URL")
    .isLength({ max: 300 })
    .withMessage("Portfolio URL cannot exceed 300 characters"),

  body("personalDetails.website")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid website URL")
    .isLength({ max: 300 })
    .withMessage("Website URL cannot exceed 300 characters"),
];

const commonResumeValidators = [
  body("professionalSummary")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Professional summary cannot exceed 2000 characters"),

  body("skills")
    .optional()
    .isArray({ max: RESUME_LIMITS.MAX_SKILLS })
    .withMessage(
      `Skills must be an array containing no more than ${RESUME_LIMITS.MAX_SKILLS} items`,
    ),

  body("skills.*")
    .trim()
    .notEmpty()
    .withMessage("Skill cannot be empty")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Each skill cannot exceed 50 characters"),

  body("education")
    .optional()
    .isArray({ max: RESUME_LIMITS.MAX_EDUCATION_ITEMS })
    .withMessage(
      `Education must contain no more than ${RESUME_LIMITS.MAX_EDUCATION_ITEMS} items`,
    ),

  body("education.*.institution")
    .trim()
    .notEmpty()
    .withMessage("Institution is required")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Institution cannot exceed 150 characters"),

  body("education.*.degree")
    .trim()
    .notEmpty()
    .withMessage("Degree is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Degree cannot exceed 100 characters"),

  body("education.*.fieldOfStudy")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Field of study cannot exceed 100 characters"),

  body("education.*.startDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Education start date cannot exceed 30 characters"),

  body("education.*.endDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Education end date cannot exceed 30 characters"),

  body("education.*.grade")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Grade cannot exceed 30 characters"),

  body("education.*.location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Education location cannot exceed 100 characters"),

  body("education.*.description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Education description cannot exceed 1000 characters"),

  body("experience")
    .optional()
    .isArray({ max: RESUME_LIMITS.MAX_EXPERIENCE_ITEMS })
    .withMessage(
      `Experience must contain no more than ${RESUME_LIMITS.MAX_EXPERIENCE_ITEMS} items`,
    ),

  body("experience.*.company")
    .trim()
    .notEmpty()
    .withMessage("Company is required")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Company cannot exceed 150 characters"),

  body("experience.*.jobTitle")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Job title cannot exceed 100 characters"),

  body("experience.*.employmentType")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Employment type cannot exceed 50 characters"),

  body("experience.*.location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Experience location cannot exceed 100 characters"),

  body("experience.*.startDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Experience start date cannot exceed 30 characters"),

  body("experience.*.endDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Experience end date cannot exceed 30 characters"),

  body("experience.*.currentlyWorking")
    .optional()
    .isBoolean()
    .withMessage("Currently working must be true or false"),

  body("experience.*.description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Experience description cannot exceed 2000 characters"),

  body("experience.*.achievements")
    .optional()
    .isArray()
    .withMessage("Experience achievements must be an array"),

  body("experience.*.achievements.*")
    .trim()
    .notEmpty()
    .withMessage("Experience achievement cannot be empty")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Experience achievement cannot exceed 500 characters"),

  body("projects")
    .optional()
    .isArray({ max: RESUME_LIMITS.MAX_PROJECT_ITEMS })
    .withMessage(
      `Projects must contain no more than ${RESUME_LIMITS.MAX_PROJECT_ITEMS} items`,
    ),

  body("projects.*.title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Project title cannot exceed 150 characters"),

  body("projects.*.description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Project description cannot exceed 2000 characters"),

  body("projects.*.technologies")
    .optional()
    .isArray()
    .withMessage("Project technologies must be an array"),

  body("projects.*.technologies.*")
    .trim()
    .notEmpty()
    .withMessage("Technology cannot be empty")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Technology cannot exceed 50 characters"),

  body("projects.*.projectUrl")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid project URL")
    .isLength({ max: 300 })
    .withMessage("Project URL cannot exceed 300 characters"),

  body("projects.*.githubUrl")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid project GitHub URL")
    .isLength({ max: 300 })
    .withMessage("Project GitHub URL cannot exceed 300 characters"),

  body("projects.*.startDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Project start date cannot exceed 30 characters"),

  body("projects.*.endDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Project end date cannot exceed 30 characters"),

  body("certifications")
    .optional()
    .isArray({ max: RESUME_LIMITS.MAX_CERTIFICATION_ITEMS })
    .withMessage(
      `Certifications must contain no more than ${RESUME_LIMITS.MAX_CERTIFICATION_ITEMS} items`,
    ),

  body("certifications.*.name")
    .trim()
    .notEmpty()
    .withMessage("Certification name is required")
    .bail()
    .isLength({ max: 150 })
    .withMessage("Certification name cannot exceed 150 characters"),

  body("certifications.*.issuingOrganization")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Issuing organization cannot exceed 150 characters"),

  body("certifications.*.issueDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Certification issue date cannot exceed 30 characters"),

  body("certifications.*.expirationDate")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Certification expiration date cannot exceed 30 characters"),

  body("certifications.*.credentialId")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Credential ID cannot exceed 100 characters"),

  body("certifications.*.credentialUrl")
    .optional({ values: "falsy" })
    .trim()
    .isURL(urlOptions)
    .withMessage("Please provide a valid credential URL")
    .isLength({ max: 300 })
    .withMessage("Credential URL cannot exceed 300 characters"),

  body("achievements")
    .optional()
    .isArray({ max: RESUME_LIMITS.MAX_ACHIEVEMENTS })
    .withMessage(
      `Achievements must contain no more than ${RESUME_LIMITS.MAX_ACHIEVEMENTS} items`,
    ),

  body("achievements.*")
    .trim()
    .notEmpty()
    .withMessage("Achievement cannot be empty")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Achievement cannot exceed 500 characters"),

  body("languages")
    .optional()
    .isArray({ max: RESUME_LIMITS.MAX_LANGUAGES })
    .withMessage(
      `Languages must contain no more than ${RESUME_LIMITS.MAX_LANGUAGES} items`,
    ),

  body("languages.*.name")
    .trim()
    .notEmpty()
    .withMessage("Language name is required")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Language name cannot exceed 50 characters"),

  body("languages.*.proficiency")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Language proficiency cannot exceed 50 characters"),
];

export const createResumeValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Resume title is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Resume title cannot exceed 100 characters"),

  ...personalDetailsValidators,
  ...commonResumeValidators,
];

export const updateResumeValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Resume title cannot be empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Resume title cannot exceed 100 characters"),

  ...optionalPersonalDetailsValidators,
  ...commonResumeValidators,

  body().custom((value) => {
    const allowedFields = [
      "title",
      "personalDetails",
      "professionalSummary",
      "skills",
      "education",
      "experience",
      "projects",
      "certifications",
      "achievements",
      "languages",
    ];

    const hasUpdateField = allowedFields.some((field) =>
      Object.prototype.hasOwnProperty.call(value, field),
    );

    if (!hasUpdateField) {
      throw new Error("Please provide at least one field to update");
    }

    return true;
  }),
];

export const resumeIdValidator = [
  param("resumeId").isMongoId().withMessage("Invalid resume ID"),
];
