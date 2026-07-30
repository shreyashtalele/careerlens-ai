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

function isTemporaryGeminiError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes('"code":503') ||
    message.includes('"code":429') ||
    message.includes('"status":"unavailable"') ||
    message.includes("high demand") ||
    message.includes("resource_exhausted") ||
    message.includes("temporarily unavailable")
  );
}

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

      const shouldRetry = isTemporaryGeminiError(error);

      console.warn(
        `Interview question generation failed on attempt ${attempt}/${MAX_RETRY_ATTEMPTS}. Retryable: ${shouldRetry}`,
      );

      if (!shouldRetry || attempt === MAX_RETRY_ATTEMPTS) {
        break;
      }

      const delay = RETRY_DELAY_MS * 2 ** (attempt - 1);

      console.warn(`Retrying Gemini request in ${delay}ms...`);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, delay);
      });
    }
  }

  throw lastError;
}

function createDevelopmentFallbackQuestions(
  questionCount: number,
  difficulty: "easy" | "medium" | "hard",
): InterviewQuestionGeneratorResult {
  const questionBank = [
    {
      category: "technical",
      question:
        "What is the difference between state and props in React, and when would you use each one?",
      topic: "React fundamentals",
      reason:
        "This evaluates your understanding of data management within React components.",
    },
    {
      category: "project",
      question:
        "Choose one project from your resume and explain its architecture, your responsibilities, and the main technical challenges.",
      topic: "Project architecture",
      reason:
        "This evaluates your practical experience and your ability to explain technical decisions.",
    },
    {
      category: "behavioral",
      question:
        "Describe a difficult technical problem you faced and explain how you solved it.",
      topic: "Problem solving",
      reason:
        "This evaluates your analytical approach and how you respond to technical challenges.",
    },
    {
      category: "hr",
      question:
        "Why are you interested in this role, and what value would you bring to the organization?",
      topic: "Career motivation",
      reason:
        "This evaluates your motivation, communication, and suitability for the position.",
    },
    {
      category: "technical",
      question:
        "How do you handle loading, success, and error states while calling an API from a React application?",
      topic: "API integration",
      reason:
        "This evaluates your practical understanding of frontend API integration.",
    },
    {
      category: "project",
      question:
        "Explain one feature you developed from start to finish, including frontend, backend, and database interaction.",
      topic: "End-to-end development",
      reason:
        "This evaluates whether you understand the complete flow of a real application feature.",
    },
    {
      category: "behavioral",
      question:
        "Tell me about a time when you received feedback on your work. How did you respond?",
      topic: "Feedback and improvement",
      reason:
        "This evaluates your openness to feedback and your ability to improve.",
    },
    {
      category: "hr",
      question:
        "Where do you see yourself professionally over the next three years?",
      topic: "Career goals",
      reason:
        "This evaluates whether your career goals align with the opportunity.",
    },
    {
      category: "technical",
      question:
        "How would you debug an API that is returning a 500 Internal Server Error?",
      topic: "Backend debugging",
      reason:
        "This evaluates your debugging process and understanding of backend error handling.",
    },
    {
      category: "project",
      question:
        "What improvements would you make to one of your existing projects if you had more time?",
      topic: "Project improvement",
      reason:
        "This evaluates your ability to review your own work and identify areas for improvement.",
    },
  ] as const;

  const fallbackResult: InterviewQuestionGeneratorResult = {
    technicalQuestions: [],
    projectQuestions: [],
    behavioralQuestions: [],
    hrQuestions: [],
    followUpQuestions: [
      {
        question:
          "Can you explain your answer with a practical example from one of your projects?",
        difficulty,
        topic: "Practical experience",
        reason:
          "This helps evaluate whether you can connect theoretical knowledge with real experience.",
      },
      {
        question:
          "What challenges did you face, and what would you do differently next time?",
        difficulty,
        topic: "Reflection",
        reason:
          "This evaluates your ability to learn from previous technical decisions.",
      },
    ],
    preparationTips: [
      "Explain your answers using examples from your own projects.",
      "Structure behavioral answers using the situation, task, action, and result format.",
      "Keep technical answers clear and mention why you selected a particular approach.",
    ],
  };

  for (let index = 0; index < questionCount; index += 1) {
    // const template = questionBank[index % questionBank.length];
    const template = questionBank[index % questionBank.length];

    if (!template) {
      throw new Error("Fallback interview question template not found");
    }
    const question = {
      question: template.question,
      difficulty,
      topic: template.topic,
      reason: template.reason,
    };

    switch (template.category) {
      case "technical":
        fallbackResult.technicalQuestions.push(question);
        break;

      case "project":
        fallbackResult.projectQuestions.push(question);
        break;

      case "behavioral":
        fallbackResult.behavioralQuestions.push(question);
        break;

      case "hr":
        fallbackResult.hrQuestions.push(question);
        break;
    }
  }

  return validateInterviewResponse(fallbackResult);
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

  let validatedResponse: InterviewQuestionGeneratorResult;

  try {
    validatedResponse = await generateValidatedInterviewResponse(prompt);
  } catch (error) {
    const canUseDevelopmentFallback =
      environment.NODE_ENV !== "production" && isTemporaryGeminiError(error);

    if (!canUseDevelopmentFallback) {
      throw error;
    }

    console.warn(
      "Gemini is temporarily unavailable. Using development fallback interview questions.",
    );

    validatedResponse = createDevelopmentFallbackQuestions(
      questionCount,
      difficulty,
    );
  }

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
