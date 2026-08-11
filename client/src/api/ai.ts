import { apiClient } from "./client";
import {
  AIReviewResponse,
  InterviewQuestionsResponse,
  AITestResponse,
} from "@/types/api";

export const aiApi = {
  // Test AI connection
  testConnection: async (): Promise<AITestResponse> => {
    const response = await apiClient.get<{ data: AITestResponse }>("/ai/test");
    return response.data.data;
  },

  // AI Resume Review
  getResumeReview: async (
    resumeText: string,
    atsAnalysis?: any,
  ): Promise<AIReviewResponse> => {
    const payload: any = { resumeText };
    if (atsAnalysis) {
      payload.atsAnalysis = atsAnalysis;
    }
    const response = await apiClient.post<{ data: AIReviewResponse }>(
      "/ai/resume-review",
      payload,
    );
    return response.data.data;
  },

  // Interview Questions Generator - UPDATED to include atsAnalysis
  generateInterviewQuestions: async (
    resumeText: string,
    difficulty: "easy" | "medium" | "hard" = "medium",
    count: number = 5,
    atsAnalysis?: any,
  ): Promise<InterviewQuestionsResponse> => {
    const payload: any = { resumeText, difficulty, count };
    if (atsAnalysis) {
      payload.atsAnalysis = atsAnalysis;
    }
    const response = await apiClient.post<{ data: InterviewQuestionsResponse }>(
      "/ai/interview-questions",
      payload,
    );
    return response.data.data;
  },
};
