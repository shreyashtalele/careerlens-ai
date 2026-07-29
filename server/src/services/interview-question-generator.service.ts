import gemini from "../config/gemini.config.js";
import { environment } from "../config/env.js";

import {
  INTERVIEW_DEFAULTS,
  INTERVIEW_QUESTION_GENERATOR_LIMITS,
  INTERVIEW_QUESTION_GENERATOR_MESSAGES,
} from "../constants/interview-question-generator.constants.js";
import { buildInterviewQuestionPrompt } from "../prompts/interview-question-generator.prompt.js";
import {
  GenerateInterviewQuestionsInput,
  InterviewQuestionGeneratorResult,
} from "../types/interview-question-generator.types.js";
import { interviewQuestionGeneratorResponseSchema } from "../validators/interview-question-generator-response.validator.js";

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2000;

function validateInterviewResponse(
  parsedResponse: unknown,
): InterviewQuestionGeneratorResult {
  const validatedResponse =
    interviewQuestionGeneratorResponseSchema.safeParse(parsedResponse);

  if (!validatedResponse.success) {
    throw new Error(INTERVIEW_QUESTION_GENERATOR_MESSAGES.INVALID_AI_RESPONSE);
  }

  return validatedResponse.data;
}

function parseAndValidateInterviewResponse(
  responseText: string,
): InterviewQuestionGeneratorResult {
  const jsonStart = responseText.indexOf("{");
  const jsonEnd = responseText.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
    throw new Error(INTERVIEW_QUESTION_GENERATOR_MESSAGES.INVALID_AI_RESPONSE);
  }

  const jsonResponse = responseText.slice(jsonStart, jsonEnd + 1);

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(jsonResponse);
  } catch {
    throw new Error(INTERVIEW_QUESTION_GENERATOR_MESSAGES.INVALID_AI_RESPONSE);
  }

  return validateInterviewResponse(parsedResponse);
}

async function generateValidatedInterviewResponse(
  prompt: string,
): Promise<InterviewQuestionGeneratorResult> {
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
        throw new Error(
          INTERVIEW_QUESTION_GENERATOR_MESSAGES.GENERATION_FAILED,
        );
      }

      return parseAndValidateInterviewResponse(responseText);
    } catch (error) {
      lastError = error;

      console.warn(
        `Interview question generation failed on attempt ${attempt}/${MAX_RETRY_ATTEMPTS}.`,
      );

      if (attempt === MAX_RETRY_ATTEMPTS) {
        break;
      }

      const delay = RETRY_DELAY_MS * attempt;

      await new Promise<void>((resolve) => {
        setTimeout(resolve, delay);
      });
    }
  }

  throw lastError;
}

export async function generateInterviewQuestions(
  input: GenerateInterviewQuestionsInput,
): Promise<InterviewQuestionGeneratorResult> {
  const difficulty = input.difficulty ?? INTERVIEW_DEFAULTS.DEFAULT_DIFFICULTY;

  const questionCount =
    input.questionCount ??
    INTERVIEW_QUESTION_GENERATOR_LIMITS.DEFAULT_QUESTION_COUNT;

  const prompt = buildInterviewQuestionPrompt({
    ...input,
    difficulty,
    questionCount,
  });

  const validatedResponse = await generateValidatedInterviewResponse(prompt);

  const totalPrimaryQuestions =
    validatedResponse.technicalQuestions.length +
    validatedResponse.projectQuestions.length +
    validatedResponse.behavioralQuestions.length +
    validatedResponse.hrQuestions.length;

  if (totalPrimaryQuestions !== questionCount) {
    throw new Error(
      `Expected ${questionCount} primary questions but received ${totalPrimaryQuestions}.`,
    );
  }

  return validatedResponse;
}
