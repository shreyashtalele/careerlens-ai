import { useState } from "react";
import { aiApi } from "@/api/ai";
import { AIReviewResponse, InterviewQuestionsResponse } from "@/types/api";
import { toast } from "@/lib/toast";
import { logError } from "@/lib/error-handler";

export function useAI() {
  const [reviewResult, setReviewResult] = useState<AIReviewResponse | null>(
    null,
  );
  const [interviewQuestions, setInterviewQuestions] =
    useState<InterviewQuestionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewLoading, setIsInterviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAIAvailable, setIsAIAvailable] = useState<boolean | null>(null);

  // Check if AI service is available
  const checkAIAvailability = async (): Promise<boolean> => {
    try {
      await aiApi.testConnection();
      setIsAIAvailable(true);
      return true;
    } catch (err) {
      setIsAIAvailable(false);
      const message =
        err instanceof Error
          ? err.message
          : "AI service is currently unavailable";
      toast.error(message);
      logError(err, "AI Availability Check");
      return false;
    }
  };

  // Get AI Resume Review
  const getResumeReview = async (resumeText: string, atsAnalysis?: any) => {
    if (!resumeText) {
      toast.error("No resume text provided");
      return;
    }

    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("AI is reviewing your resume...");

    try {
      const result = await aiApi.getResumeReview(resumeText, atsAnalysis);
      setReviewResult(result);
      toast.dismiss(toastId);
      toast.success("Resume review completed!");
      return result;
    } catch (err: any) {
      toast.dismiss(toastId);
      const status = err.response?.status;
      let message = "Failed to get resume review. Please try again.";

      if (status === 503 || status === 504) {
        message =
          "AI service is temporarily unavailable. Please try again later.";
      } else if (status === 502) {
        message = "Invalid AI response. Please try again.";
      } else if (status === 429) {
        message = "Too many requests. Please wait a moment and try again.";
      }

      setError(message);
      toast.error(message);
      logError(err, "AI Resume Review");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Interview Questions - UPDATED to accept atsAnalysis
  const generateInterviewQuestions = async (
    resumeText: string,
    difficulty: "easy" | "medium" | "hard" = "medium",
    count: number = 5,
    atsAnalysis?: any,
  ) => {
    if (!resumeText) {
      toast.error("No resume text provided");
      return;
    }

    setIsInterviewLoading(true);
    setError(null);
    const toastId = toast.loading("Generating interview questions...");

    try {
      const result = await aiApi.generateInterviewQuestions(
        resumeText,
        difficulty,
        count,
        atsAnalysis,
      );
      setInterviewQuestions(result);
      toast.dismiss(toastId);
      toast.success("Interview questions generated!");
      return result;
    } catch (err: any) {
      toast.dismiss(toastId);
      const status = err.response?.status;
      let message = "Failed to generate interview questions. Please try again.";

      if (status === 503 || status === 504) {
        message =
          "AI service is temporarily unavailable. Please try again later.";
      } else if (status === 502) {
        message = "Invalid AI response. Please try again.";
      } else if (status === 429) {
        message = "Too many requests. Please wait a moment and try again.";
      }

      setError(message);
      toast.error(message);
      logError(err, "Generate Interview Questions");
      throw err;
    } finally {
      setIsInterviewLoading(false);
    }
  };

  const resetReview = () => {
    setReviewResult(null);
    setError(null);
  };

  const resetInterview = () => {
    setInterviewQuestions(null);
    setError(null);
  };

  return {
    reviewResult,
    interviewQuestions,
    isLoading,
    isInterviewLoading,
    error,
    isAIAvailable,
    checkAIAvailability,
    getResumeReview,
    generateInterviewQuestions,
    resetReview,
    resetInterview,
  };
}
