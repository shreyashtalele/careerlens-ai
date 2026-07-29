export type MockInterviewStatus = "in_progress" | "completed" | "cancelled";

export type InterviewQuestionType =
  | "technical"
  | "project"
  | "behavioral"
  | "hr"
  | "follow_up";

export type InterviewDifficulty = "easy" | "medium" | "hard";

export interface MockInterviewQuestion {
  questionId: string;
  question: string;
  type: InterviewQuestionType;
  topic: string;
  difficulty: InterviewDifficulty;
  reason: string;
}

export interface MockInterviewAnswerEvaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

export interface MockInterviewAnswer {
  questionId: string;
  answer: string;
  evaluation?: MockInterviewAnswerEvaluation;
  answeredAt: Date;
}

export interface MockInterviewScoreBreakdown {
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  relevanceScore: number;
}

export interface MockInterviewFinalReport {
  overallScore: number;
  scoreBreakdown: MockInterviewScoreBreakdown;
  strengths: string[];
  weaknesses: string[];
  improvementAreas: string[];
  hiringRecommendation: string;
}

export interface StartMockInterviewInput {
  userId: string;
  resumeId: string;
  jobDescription?: string;
  difficulty: InterviewDifficulty;
  questionCount: number;
}

export interface StartMockInterviewResult {
  sessionId: string;
  status: MockInterviewStatus;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: MockInterviewQuestion;
}

export interface SubmitMockInterviewAnswerInput {
  userId: string;
  sessionId: string;
  answer: string;
}

export interface SubmitMockInterviewAnswerResult {
  evaluation: MockInterviewAnswerEvaluation;
  hasNextQuestion: boolean;
  nextQuestion?: MockInterviewQuestion;
  currentQuestionIndex: number;
}

export interface GetCurrentInterviewQuestionInput {
  userId: string;
  sessionId: string;
}

export interface GetCurrentInterviewQuestionResult {
  sessionId: string;
  status: MockInterviewStatus;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: MockInterviewQuestion;
}

export interface FinishMockInterviewInput {
  userId: string;
  sessionId: string;
}

export interface FinishMockInterviewResult {
  sessionId: string;
  status: MockInterviewStatus;
  report: MockInterviewFinalReport;
}
export interface BuildAnswerEvaluationPromptInput {
  question: MockInterviewQuestion;
  answer: string;
  resumeText: string;
  jobDescription?: string;
}
