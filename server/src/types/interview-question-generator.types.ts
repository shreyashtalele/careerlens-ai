import { AtsResumeAnalysisResult } from "./ats-analysis.types.js";

export type InterviewQuestionDifficulty = "easy" | "medium" | "hard";

export interface InterviewQuestion {
  question: string;
  difficulty: InterviewQuestionDifficulty;
  topic: string;
  reason: string;
}

export interface InterviewQuestionGeneratorResult {
  technicalQuestions: InterviewQuestion[];
  projectQuestions: InterviewQuestion[];
  behavioralQuestions: InterviewQuestion[];
  hrQuestions: InterviewQuestion[];
  followUpQuestions: InterviewQuestion[];
  preparationTips: string[];
}

export interface GenerateInterviewQuestionsInput {
  resumeText: string;
  atsAnalysis: AtsResumeAnalysisResult;
  jobDescription?: string;
  difficulty?: InterviewQuestionDifficulty;
  questionCount?: number;
}
