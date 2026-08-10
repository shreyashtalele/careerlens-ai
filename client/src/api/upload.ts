import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000/api";

export interface UploadResponse {
  fileName: string;
  fileSize: number;
  text: string;
  wordCount: number;
  characterCount: number;
}

export interface ATSSection {
  name: string;
  content: string;
  isPresent: boolean;
}

export interface ATSAnalysisResponse {
  score: number;
  sections: ATSSection[];
  missingSections: string[];
  recommendations: string[];
  extractedSkills: string[];
}

export interface ATSAnalysisWithJDResponse extends ATSAnalysisResponse {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
}

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const uploadApi = {
  // Upload resume file (PDF/DOCX)
  uploadResume: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await axios.post(
      `${API_URL}/resume-analysis/upload`,
      formData,
      {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data;
  },

  // ATS Analysis
  analyzeResume: async (text: string): Promise<ATSAnalysisResponse> => {
    const response = await axios.post(
      `${API_URL}/ats/analyze`,
      { text },
      getAuthHeaders(),
    );
    return response.data.data;
  },

  // ATS Analysis with Job Description
  analyzeWithJobDescription: async (
    text: string,
    jobDescription: string,
  ): Promise<ATSAnalysisWithJDResponse> => {
    const response = await axios.post(
      `${API_URL}/ats/analyze-with-job-description`,
      { text, jobDescription },
      getAuthHeaders(),
    );
    return response.data.data;
  },
};
