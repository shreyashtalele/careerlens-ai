import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000/api";

export interface Resume {
  id: string;
  userId: string;
  title: string;
  content?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeData {
  title: string;
  personalDetails: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary?: string;
  skills?: string[];
  experience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

export interface UpdateResumeData {
  title?: string;
  content?: string;
}

// Helper to get token and headers
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

export const resumeApi = {
  // Get all resumes
  getResumes: async (): Promise<Resume[]> => {
    const response = await axios.get(`${API_URL}/resumes`, getHeaders());
    return response.data.data;
  },

  // Get single resume
  getResume: async (id: string): Promise<Resume> => {
    const response = await axios.get(`${API_URL}/resumes/${id}`, getHeaders());
    return response.data.data;
  },

  // Create resume - UPDATED
  createResume: async (data: CreateResumeData): Promise<Resume> => {
    const response = await axios.post(`${API_URL}/resumes`, data, getHeaders());
    return response.data.data;
  },

  // Update resume
  updateResume: async (id: string, data: UpdateResumeData): Promise<Resume> => {
    const response = await axios.patch(
      `${API_URL}/resumes/${id}`,
      data,
      getHeaders(),
    );
    return response.data.data;
  },

  // Delete resume
  deleteResume: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/resumes/${id}`, getHeaders());
  },

  // Set default resume
  setDefaultResume: async (id: string): Promise<Resume> => {
    const response = await axios.patch(
      `${API_URL}/resumes/${id}/default`,
      {},
      getHeaders(),
    );
    return response.data.data;
  },
};
