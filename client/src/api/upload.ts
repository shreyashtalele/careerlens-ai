import { apiClient } from "./client";
import {
  UploadResumeResponse,
  ATSAnalysisResponse,
  ATSAnalysisWithJDResponse,
} from "@/types/api";

export const uploadApi = {
  uploadResume: async (file: File): Promise<UploadResumeResponse> => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await apiClient.post<{ data: UploadResumeResponse }>(
      "/resume-analysis/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data;
  },

  analyzeResume: async (text: string): Promise<ATSAnalysisResponse> => {
    const response = await apiClient.post<{ data: ATSAnalysisResponse }>(
      "/ats/analyze",
      { resumeText: text },
    );
    return response.data.data;
  },

  analyzeWithJobDescription: async (
    text: string,
    jobDescription: string,
  ): Promise<ATSAnalysisWithJDResponse> => {
    const response = await apiClient.post<{ data: ATSAnalysisWithJDResponse }>(
      "/ats/analyze-with-job-description",
      { resumeText: text, jobDescription },
    );
    return response.data.data;
  },
};
