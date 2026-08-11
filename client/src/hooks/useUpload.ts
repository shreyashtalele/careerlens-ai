import { useState } from "react";
import { uploadApi } from "@/api/upload";
import {
  UploadResumeResponse,
  ATSAnalysisResponse,
  ATSAnalysisWithJDResponse,
} from "@/types/api";
import { toast } from "@/lib/toast";
import { logError } from "@/lib/error-handler";

export function useUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResumeResponse | null>(
    null,
  );
  const [analysisResult, setAnalysisResult] =
    useState<ATSAnalysisResponse | null>(null);
  const [analysisWithJDResult, setAnalysisWithJDResult] =
    useState<ATSAnalysisWithJDResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadResume = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setUploadedFile(file);
    setUploadResult(null);
    setAnalysisResult(null);
    setAnalysisWithJDResult(null);

    try {
      const result = await uploadApi.uploadResume(file);
      setUploadResult(result);
      toast.success("Resume uploaded successfully");
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to upload resume";
      setError(message);
      toast.error(message);
      logError(err, "Upload Resume");
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const analyzeResume = async (text: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await uploadApi.analyzeResume(text);
      setAnalysisResult(result);
      toast.success("Resume analyzed successfully");
      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to analyze resume";
      setError(message);
      toast.error(message);
      logError(err, "Analyze Resume");
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeWithJobDescription = async (
    text: string,
    jobDescription: string,
  ) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await uploadApi.analyzeWithJobDescription(
        text,
        jobDescription,
      );
      setAnalysisWithJDResult(result);
      toast.success("Resume analyzed with job description successfully");
      return result;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to analyze resume with job description";
      setError(message);
      toast.error(message);
      logError(err, "Analyze Resume with JD");
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setUploadedFile(null);
    setUploadResult(null);
    setAnalysisResult(null);
    setAnalysisWithJDResult(null);
    setError(null);
  };

  return {
    uploadedFile,
    uploadResult,
    analysisResult,
    analysisWithJDResult,
    isUploading,
    isAnalyzing,
    error,
    uploadResume,
    analyzeResume,
    analyzeWithJobDescription,
    reset,
  };
}
