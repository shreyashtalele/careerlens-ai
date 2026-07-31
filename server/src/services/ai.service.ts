import type { ZodType } from "zod";

import gemini from "../config/gemini.config.js";
import { environment } from "../config/env.js";
import { AI_CONFIG, AI_ERROR_MESSAGES } from "../constants/ai.constants.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";
import { isRetryableAIError } from "../utils/ai-error.util.js";
import { parseAIJsonResponse } from "../utils/ai-json-parser.util.js";
import { retryOperation } from "../utils/retry.util.js";

interface GenerateStructuredResponseOptions<T> {
  prompt: string;
  schema: ZodType<T>;
  temperature?: number;
  model?: string;
}

interface GenerateTextResponseOptions {
  prompt: string;
  temperature?: number;
  model?: string;
}

export const generateAITextResponse = async ({
  prompt,
  temperature = 0.3,
  model = environment.GEMINI_MODEL,
}: GenerateTextResponseOptions): Promise<string> => {
  try {
    return await retryOperation(
      async () => {
        const response = await gemini.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature,
          },
        });

        const responseText = response.text?.trim();

        if (!responseText) {
          throw new ApiError(
            HTTP_STATUS.BAD_GATEWAY,
            AI_ERROR_MESSAGES.EMPTY_RESPONSE,
          );
        }

        return responseText;
      },
      {
        maxAttempts: AI_CONFIG.MAX_RETRY_ATTEMPTS,
        initialDelayMs: AI_CONFIG.INITIAL_RETRY_DELAY_MS,
        shouldRetry: isRetryableAIError,
        onRetry: (error, attempt, delayMs) => {
          console.warn(
            `AI text request failed on attempt ${attempt}. Retrying in ${delayMs}ms.`,
            error,
          );
        },
      },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error("AI text generation error:", error);

    throw mapAIProviderError(error);
  }
};

const mapAIProviderError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (
    message.includes("429") ||
    message.includes("too many requests") ||
    message.includes("resource exhausted") ||
    message.includes("quota")
  ) {
    return new ApiError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      AI_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
    );
  }

  if (
    message.includes("timeout") ||
    message.includes("timed out") ||
    message.includes("504")
  ) {
    return new ApiError(
      HTTP_STATUS.GATEWAY_TIMEOUT,
      AI_ERROR_MESSAGES.REQUEST_TIMEOUT,
    );
  }

  if (
    message.includes("500") ||
    message.includes("502") ||
    message.includes("503") ||
    message.includes("unavailable") ||
    message.includes("high demand") ||
    message.includes("network")
  ) {
    return new ApiError(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      AI_ERROR_MESSAGES.SERVICE_UNAVAILABLE,
    );
  }

  return new ApiError(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    AI_ERROR_MESSAGES.GENERATION_FAILED,
  );
};

export const generateStructuredAIResponse = async <T>({
  prompt,
  schema,
  temperature = 0.3,
  model = environment.GEMINI_MODEL,
}: GenerateStructuredResponseOptions<T>): Promise<T> => {
  try {
    const responseText = await retryOperation(
      async () => {
        const response = await gemini.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: AI_CONFIG.RESPONSE_MIME_TYPE,
            temperature,
          },
        });

        const text = response.text?.trim();

        if (!text) {
          throw new ApiError(
            HTTP_STATUS.BAD_GATEWAY,
            AI_ERROR_MESSAGES.EMPTY_RESPONSE,
          );
        }

        return text;
      },
      {
        maxAttempts: AI_CONFIG.MAX_RETRY_ATTEMPTS,
        initialDelayMs: AI_CONFIG.INITIAL_RETRY_DELAY_MS,
        shouldRetry: isRetryableAIError,
        onRetry: (error, attempt, delayMs) => {
          console.warn(
            `AI request failed on attempt ${attempt}. Retrying in ${delayMs}ms.`,
            error,
          );
        },
      },
    );

    const parsedResponse = parseAIJsonResponse<unknown>(responseText);

    const validationResult = schema.safeParse(parsedResponse);

    if (!validationResult.success) {
      throw new ApiError(
        HTTP_STATUS.BAD_GATEWAY,
        AI_ERROR_MESSAGES.INVALID_RESPONSE,
        validationResult.error.issues,
      );
    }

    return validationResult.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error("AI generation error:", error);

    throw mapAIProviderError(error);
  }
};
