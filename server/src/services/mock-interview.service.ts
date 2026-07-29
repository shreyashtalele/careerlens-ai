import { randomUUID } from "crypto";

import {
  MOCK_INTERVIEW_MESSAGES,
  MOCK_INTERVIEW_QUESTION_TYPE,
  MOCK_INTERVIEW_STATUS,
} from "../constants/mock-interview.constants.js";

import { MockInterview } from "../models/mock-interview.model.js";
import Resume, { IResume } from "../models/Resume.js";

import {
  InterviewQuestion,
  InterviewQuestionGeneratorResult,
} from "../types/interview-question-generator.types.js";

import {
  FinishMockInterviewInput,
  FinishMockInterviewResult,
  GetCurrentInterviewQuestionInput,
  GetCurrentInterviewQuestionResult,
  InterviewDifficulty,
  InterviewQuestionType,
  MockInterviewAnswer,
  MockInterviewQuestion,
  StartMockInterviewInput,
  StartMockInterviewResult,
  SubmitMockInterviewAnswerInput,
  SubmitMockInterviewAnswerResult,
} from "../types/mock-interview.types.js";

import {
  analyzeResumeText,
  analyzeResumeWithJobDescription,
} from "./ats-analysis.service.js";

import { generateInterviewQuestions } from "./interview-question-generator.service.js";
import {
  evaluateInterviewAnswer,
  generateInterviewFinalReport,
} from "./mock-interview-ai.service.js";

function buildResumeText(resume: IResume): string {
  const resumeContent = {
    title: resume.title,
    personalDetails: resume.personalDetails,
    professionalSummary: resume.professionalSummary ?? "",
    skills: resume.skills,
    education: resume.education,
    experience: resume.experience,
    projects: resume.projects,
    certifications: resume.certifications,
    achievements: resume.achievements,
    languages: resume.languages,
  };

  return JSON.stringify(resumeContent, null, 2);
}

function buildAtsAnalysis(resumeText: string, jobDescription?: string) {
  if (jobDescription) {
    return analyzeResumeWithJobDescription({
      resumeText,
      jobDescription,
    });
  }

  return analyzeResumeText({
    resumeText,
  });
}

function buildMockInterviewQuestions(
  generatedQuestions: InterviewQuestionGeneratorResult,
): MockInterviewQuestion[] {
  const questions: MockInterviewQuestion[] = [];

  const addQuestions = (
    items: InterviewQuestion[],
    type: InterviewQuestionType,
  ): void => {
    for (const item of items) {
      questions.push({
        questionId: randomUUID(),
        question: item.question,
        type,
        topic: item.topic,
        difficulty: item.difficulty,
        reason: item.reason,
      });
    }
  };

  addQuestions(
    generatedQuestions.technicalQuestions,
    MOCK_INTERVIEW_QUESTION_TYPE.TECHNICAL,
  );

  addQuestions(
    generatedQuestions.projectQuestions,
    MOCK_INTERVIEW_QUESTION_TYPE.PROJECT,
  );

  addQuestions(
    generatedQuestions.behavioralQuestions,
    MOCK_INTERVIEW_QUESTION_TYPE.BEHAVIORAL,
  );

  addQuestions(generatedQuestions.hrQuestions, MOCK_INTERVIEW_QUESTION_TYPE.HR);

  return questions;
}

function mapStoredQuestionToMockQuestion(question: {
  questionId: string;
  question: string;
  type: string;
  topic: string;
  difficulty: string;
  reason: string;
}): MockInterviewQuestion {
  return {
    questionId: question.questionId,
    question: question.question,
    type: question.type as InterviewQuestionType,
    topic: question.topic,
    difficulty: question.difficulty as InterviewDifficulty,
    reason: question.reason,
  };
}

function mapStoredAnswersToMockAnswers(
  answers: Array<{
    questionId: string;
    answer: string;
    evaluation?: {
      score: number;
      strengths: string[];
      improvements: string[];
      feedback: string;
    } | null;
    answeredAt: Date;
  }>,
): MockInterviewAnswer[] {
  return answers.map((answer) => ({
    questionId: answer.questionId,
    answer: answer.answer,
    evaluation: answer.evaluation
      ? {
          score: answer.evaluation.score,
          strengths: answer.evaluation.strengths,
          improvements: answer.evaluation.improvements,
          feedback: answer.evaluation.feedback,
        }
      : undefined,
    answeredAt: answer.answeredAt,
  }));
}

export async function startMockInterview(
  input: StartMockInterviewInput,
): Promise<StartMockInterviewResult> {
  const resume = await Resume.findOne({
    _id: input.resumeId,
    owner: input.userId,
  });

  if (!resume) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.RESUME_NOT_FOUND);
  }

  const resumeText = buildResumeText(resume);

  const normalizedJobDescription = input.jobDescription?.trim() || undefined;

  const atsAnalysis = buildAtsAnalysis(resumeText, normalizedJobDescription);

  const generatedQuestions = await generateInterviewQuestions({
    resumeText,
    atsAnalysis,
    jobDescription: normalizedJobDescription,
    difficulty: input.difficulty,
    questionCount: input.questionCount,
  });

  const questions = buildMockInterviewQuestions(generatedQuestions);

  const firstQuestion = questions[0];

  if (!firstQuestion) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.QUESTION_GENERATION_FAILED);
  }

  const mockInterview = await MockInterview.create({
    userId: input.userId,
    resumeId: input.resumeId,
    jobDescription: normalizedJobDescription,
    difficulty: input.difficulty,
    status: MOCK_INTERVIEW_STATUS.IN_PROGRESS,
    questions,
    answers: [],
    currentQuestionIndex: 0,
  });

  return {
    sessionId: mockInterview._id.toString(),
    status: mockInterview.status,
    currentQuestionIndex: mockInterview.currentQuestionIndex,
    totalQuestions: questions.length,
    currentQuestion: firstQuestion,
  };
}

export async function submitMockInterviewAnswer(
  input: SubmitMockInterviewAnswerInput,
): Promise<SubmitMockInterviewAnswerResult> {
  const mockInterview = await MockInterview.findOne({
    _id: input.sessionId,
    userId: input.userId,
  });

  if (!mockInterview) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.SESSION_NOT_FOUND);
  }

  if (mockInterview.status === MOCK_INTERVIEW_STATUS.COMPLETED) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.SESSION_ALREADY_COMPLETED);
  }

  const currentQuestion =
    mockInterview.questions[mockInterview.currentQuestionIndex];

  if (!currentQuestion) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.QUESTION_NOT_FOUND);
  }

  const isAlreadyAnswered = mockInterview.answers.some(
    (answer) => answer.questionId === currentQuestion.questionId,
  );

  if (isAlreadyAnswered) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.QUESTION_ALREADY_ANSWERED);
  }

  const resume = await Resume.findOne({
    _id: mockInterview.resumeId,
    owner: input.userId,
  });

  if (!resume) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.RESUME_NOT_FOUND);
  }

  const normalizedAnswer = input.answer.trim();
  const resumeText = buildResumeText(resume);

  const typedCurrentQuestion = mapStoredQuestionToMockQuestion(currentQuestion);

  const evaluation = await evaluateInterviewAnswer({
    question: typedCurrentQuestion,
    answer: normalizedAnswer,
    resumeText,
    jobDescription: mockInterview.jobDescription ?? undefined,
  });

  mockInterview.answers.push({
    questionId: currentQuestion.questionId,
    answer: normalizedAnswer,
    evaluation,
    answeredAt: new Date(),
  });

  const nextQuestionIndex = mockInterview.currentQuestionIndex + 1;

  const nextQuestion = mockInterview.questions[nextQuestionIndex];

  mockInterview.currentQuestionIndex = nextQuestionIndex;

  await mockInterview.save();

  const typedNextQuestion = nextQuestion
    ? mapStoredQuestionToMockQuestion(nextQuestion)
    : undefined;

  return {
    evaluation,
    hasNextQuestion: Boolean(typedNextQuestion),
    nextQuestion: typedNextQuestion,
    currentQuestionIndex: nextQuestionIndex,
  };
}

export async function getCurrentInterviewQuestion(
  input: GetCurrentInterviewQuestionInput,
): Promise<GetCurrentInterviewQuestionResult> {
  const mockInterview = await MockInterview.findOne({
    _id: input.sessionId,
    userId: input.userId,
  });

  if (!mockInterview) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.SESSION_NOT_FOUND);
  }

  if (mockInterview.status === MOCK_INTERVIEW_STATUS.COMPLETED) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.SESSION_ALREADY_COMPLETED);
  }

  const currentQuestion =
    mockInterview.questions[mockInterview.currentQuestionIndex];

  if (!currentQuestion) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.QUESTION_NOT_FOUND);
  }

  const typedCurrentQuestion = mapStoredQuestionToMockQuestion(currentQuestion);

  return {
    sessionId: mockInterview._id.toString(),
    status: mockInterview.status,
    currentQuestionIndex: mockInterview.currentQuestionIndex,
    totalQuestions: mockInterview.questions.length,
    currentQuestion: typedCurrentQuestion,
  };
}

export async function finishMockInterview(
  input: FinishMockInterviewInput,
): Promise<FinishMockInterviewResult> {
  const mockInterview = await MockInterview.findOne({
    _id: input.sessionId,
    userId: input.userId,
  });

  if (!mockInterview) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.SESSION_NOT_FOUND);
  }

  if (mockInterview.status === MOCK_INTERVIEW_STATUS.COMPLETED) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.SESSION_ALREADY_COMPLETED);
  }

  const totalQuestions = mockInterview.questions.length;
  const totalAnswers = mockInterview.answers.length;

  const hasAnsweredAllQuestions =
    totalQuestions > 0 &&
    totalAnswers === totalQuestions &&
    mockInterview.currentQuestionIndex >= totalQuestions;

  if (!hasAnsweredAllQuestions) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.INTERVIEW_NOT_FINISHED);
  }

  const resume = await Resume.findOne({
    _id: mockInterview.resumeId,
    owner: input.userId,
  });

  if (!resume) {
    throw new Error(MOCK_INTERVIEW_MESSAGES.RESUME_NOT_FOUND);
  }

  const resumeText = buildResumeText(resume);

  const answers = mapStoredAnswersToMockAnswers(mockInterview.answers);

  const report = await generateInterviewFinalReport({
    answers,
    resumeText,
    jobDescription: mockInterview.jobDescription ?? undefined,
  });

  mockInterview.finalReport = report;
  mockInterview.status = MOCK_INTERVIEW_STATUS.COMPLETED;
  mockInterview.completedAt = new Date();

  await mockInterview.save();

  return {
    sessionId: mockInterview._id.toString(),
    status: mockInterview.status,
    report,
  };
}
