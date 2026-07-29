import gemini from "../config/gemini.config.js";
import { environment } from "../config/env.js";

import { MOCK_INTERVIEW_MESSAGES } from "../constants/mock-interview.constants.js";

import { buildAnswerEvaluationPrompt } from "../prompts/mock-interview-answer-evaluation.prompt.js";
import { buildFinalInterviewReportPrompt } from "../prompts/mock-interview-final-report.prompt.js";

import {
  BuildAnswerEvaluationPromptInput,
  MockInterviewAnswerEvaluation,
  MockInterviewFinalReport,
} from "../types/mock-interview.types.js";

import { mockInterviewAnswerEvaluationResponseSchema } from "../validators/mock-interview-answer-evaluation-response.validator.js";
import { mockInterviewFinalReportResponseSchema } from "../validators/mock-interview-final-report-response.validator.js";

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2000;

function validateAnswerEvaluationResponse(
  parsedResponse: unknown,
): MockInterviewAnswerEvaluation {
  const validatedResponse =
    mockInterviewAnswerEvaluationResponseSchema.safeParse(parsedResponse);

  if (!validatedResponse.success) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.AI_EVALUATION_FAILED);
  }

  return validatedResponse.data;
}

function parseAndValidateAnswerEvaluation(
  responseText: string,
): MockInterviewAnswerEvaluation {
  const jsonStart = responseText.indexOf("{");
  const jsonEnd = responseText.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.AI_EVALUATION_FAILED);
  }

  const jsonResponse = responseText.slice(jsonStart, jsonEnd + 1);

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(jsonResponse);
  } catch {
    throw new Error(MOCK_INTERVIEW_MESSAGES.AI_EVALUATION_FAILED);
  }

  return validateAnswerEvaluationResponse(parsedResponse);
}

async function generateAnswerEvaluation(
  prompt: string,
): Promise<MockInterviewAnswerEvaluation> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt += 1) {
    try {
      const response = await gemini.models.generateContent({
        model: environment.GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text;

      if (!responseText) {
        throw new Error(MOCK_INTERVIEW_MESSAGES.AI_EVALUATION_FAILED);
      }

      return parseAndValidateAnswerEvaluation(responseText);
    } catch (error) {
      lastError = error;

      console.warn(
        `Answer evaluation failed on attempt ${attempt}/${MAX_RETRY_ATTEMPTS}.`,
      );

      if (attempt === MAX_RETRY_ATTEMPTS) {
        break;
      }

      await new Promise<void>((resolve) => {
        setTimeout(resolve, RETRY_DELAY_MS * attempt);
      });
    }
  }

  throw lastError;
}

function validateFinalReportResponse(
  parsedResponse: unknown,
): MockInterviewFinalReport {
  const validatedResponse =
    mockInterviewFinalReportResponseSchema.safeParse(parsedResponse);

  if (!validatedResponse.success) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.REPORT_GENERATION_FAILED);
  }

  return validatedResponse.data;
}
function parseAndValidateFinalReport(
  responseText: string,
): MockInterviewFinalReport {
  const jsonStart = responseText.indexOf("{");
  const jsonEnd = responseText.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.REPORT_GENERATION_FAILED);
  }

  const jsonResponse = responseText.slice(jsonStart, jsonEnd + 1);

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(jsonResponse);
  } catch {
    throw new Error(MOCK_INTERVIEW_MESSAGES.REPORT_GENERATION_FAILED);
  }

  return validateFinalReportResponse(parsedResponse);
}
async function generateFinalReport(
  prompt: string,
): Promise<MockInterviewFinalReport> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt += 1) {
    try {
      const response = await gemini.models.generateContent({
        model: environment.GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text;

      if (!responseText) {
        throw new Error(MOCK_INTERVIEW_MESSAGES.REPORT_GENERATION_FAILED);
      }

      return parseAndValidateFinalReport(responseText);
    } catch (error) {
      lastError = error;

      console.warn(
        `Final interview report generation failed on attempt ${attempt}/${MAX_RETRY_ATTEMPTS}.`,
      );

      if (attempt === MAX_RETRY_ATTEMPTS) {
        break;
      }

      await new Promise<void>((resolve) => {
        setTimeout(resolve, RETRY_DELAY_MS * attempt);
      });
    }
  }

  throw lastError;
}

export async function evaluateInterviewAnswer(
  input: BuildAnswerEvaluationPromptInput,
): Promise<MockInterviewAnswerEvaluation> {
  const prompt = buildAnswerEvaluationPrompt(input);

  return generateAnswerEvaluation(prompt);
}
export async function generateInterviewFinalReport(
  input: Parameters<typeof buildFinalInterviewReportPrompt>[0],
): Promise<MockInterviewFinalReport> {
  const prompt = buildFinalInterviewReportPrompt(input);

  return generateFinalReport(prompt);
}
