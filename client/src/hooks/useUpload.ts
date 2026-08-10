import { useState } from "react";
import {
  uploadApi,
  UploadResponse,
  ATSAnalysisResponse,
  ATSAnalysisWithJDResponse,
} from "@/api/upload";

export function useUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<ATSAnalysisResponse | null>(null);
  const [analysisWithJDResult, setAnalysisWithJDResult] =
    useState<ATSAnalysisWithJDResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload resume
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
      return result;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to upload resume";
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  // ATS Analysis
  const analyzeResume = async (text: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await uploadApi.analyzeResume(text);
      setAnalysisResult(result);
      return result;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to analyze resume";
      setError(message);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ATS Analysis with Job Description
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
      return result;
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Failed to analyze resume with job description";
      setError(message);
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
