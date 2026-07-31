import {
  INTERVIEW_DEFAULTS,
  INTERVIEW_QUESTION_GENERATOR_LIMITS,
  INTERVIEW_QUESTION_GENERATOR_MESSAGES,
} from "../constants/interview-question-generator.constants.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { buildInterviewQuestionPrompt } from "../prompts/interview-question-generator.prompt.js";
import {
  GenerateInterviewQuestionsInput,
  InterviewQuestionGeneratorResult,
} from "../types/interview-question-generator.types.js";
import ApiError from "../utils/ApiError.js";
import { interviewQuestionGeneratorResponseSchema } from "../validators/interview-question-generator-response.validator.js";
import { generateStructuredAIResponse } from "./ai.service.js";

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

  const validatedResponse = await generateStructuredAIResponse({
    prompt,
    schema: interviewQuestionGeneratorResponseSchema,
    temperature: 0.2,
  });

  const totalPrimaryQuestions =
    validatedResponse.technicalQuestions.length +
    validatedResponse.projectQuestions.length +
    validatedResponse.behavioralQuestions.length +
    validatedResponse.hrQuestions.length;

  if (totalPrimaryQuestions !== questionCount) {
    throw new ApiError(
      HTTP_STATUS.BAD_GATEWAY,
      INTERVIEW_QUESTION_GENERATOR_MESSAGES.INVALID_AI_RESPONSE,
      [
        {
          expectedQuestionCount: questionCount,
          receivedQuestionCount: totalPrimaryQuestions,
        },
      ],
    );
  }

  return validatedResponse;
}
