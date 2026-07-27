export const RESUME_ANALYSIS_MESSAGES = Object.freeze({
  RESUME_UPLOADED_SUCCESSFULLY: "Resume uploaded and analyzed successfully.",

  NO_FILE_UPLOADED: "Please upload a resume file.",

  INVALID_FILE_TYPE: "Only PDF and DOCX resume files are supported.",

  FILE_TOO_LARGE: "Resume file size cannot exceed 5 MB.",

  EMPTY_RESUME: "The uploaded resume does not contain any readable text.",

  TEXT_EXTRACTION_FAILED: "Failed to extract text from the uploaded resume.",
  ONLY_ONE_FILE_ALLOWED: "Only one resume file can be uploaded.",
  FILE_UPLOAD_FAILED: "Failed to upload the resume file.",
});

export const RESUME_ANALYSIS_LIMITS = Object.freeze({
  MAX_FILE_SIZE_IN_BYTES: 5 * 1024 * 1024,
});

export const SUPPORTED_RESUME_MIME_TYPES = Object.freeze([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const);
