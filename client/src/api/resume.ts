import { apiClient } from "./client";
import { Resume, CreateResumeData } from "@/types/models";

export const resumeApi = {
  // Get all resumes
  getResumes: async (): Promise<Resume[]> => {
    const response = await apiClient.get("/resumes");
    return response.data.data;
  },

  // Get single resume
  getResume: async (id: string): Promise<Resume> => {
    const response = await apiClient.get(`/resumes/${id}`);
    return response.data.data;
  },

  // Create resume
  createResume: async (data: CreateResumeData): Promise<Resume> => {
    const response = await apiClient.post("/resumes", data);
    return response.data.data;
  },

  // Update resume
  updateResume: async (
    id: string,
    data: Partial<CreateResumeData>,
  ): Promise<Resume> => {
    const response = await apiClient.patch(`/resumes/${id}`, data);
    return response.data.data;
  },

  // Delete resume
  deleteResume: async (id: string): Promise<void> => {
    await apiClient.delete(`/resumes/${id}`);
  },

  // Set default resume
  setDefaultResume: async (id: string): Promise<Resume> => {
    const response = await apiClient.patch(`/resumes/${id}/default`, {});
    return response.data.data;
  },
};
