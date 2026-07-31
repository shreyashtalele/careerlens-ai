export const AI_CONFIG = Object.freeze({
  MAX_RETRY_ATTEMPTS: 3,
  INITIAL_RETRY_DELAY_MS: 2000,
  REQUEST_TIMEOUT_MS: 30_000,
  RESPONSE_MIME_TYPE: "application/json",
});

export const AI_ERROR_MESSAGES = Object.freeze({
  SERVICE_UNAVAILABLE:
    "AI service is temporarily unavailable. Please try again later.",

  RATE_LIMIT_EXCEEDED:
    "AI request limit has been reached. Please try again shortly.",

  REQUEST_TIMEOUT: "AI service took too long to respond. Please try again.",

  INVALID_RESPONSE: "AI service returned an invalid response.",

  EMPTY_RESPONSE: "AI service returned an empty response.",

  GENERATION_FAILED: "Unable to generate AI content at this time.",
});
