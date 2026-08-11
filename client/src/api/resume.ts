import { api } from "./client";
import { Resume, CreateResumeData } from "@/types/models";

export const resumeApi = {
  // Get all resumes
  getResumes: (): Promise<Resume[]> => {
    return api.get<Resume[]>("/resumes");
  },

  // Get single resume
  getResume: (id: string): Promise<Resume> => {
    return api.get<Resume>(`/resumes/${id}`);
  },

  // Create resume
  createResume: (data: CreateResumeData): Promise<Resume> => {
    return api.post<Resume>("/resumes", data);
  },

  // Update resume
  updateResume: (
    id: string,
    data: Partial<CreateResumeData>,
  ): Promise<Resume> => {
    return api.patch<Resume>(`/resumes/${id}`, data);
  },

  // Delete resume
  deleteResume: (id: string): Promise<void> => {
    return api.delete<void>(`/resumes/${id}`);
  },

  // Set default resume
  setDefaultResume: (id: string): Promise<Resume> => {
    return api.patch<Resume>(`/resumes/${id}/default`, {});
  },
};
