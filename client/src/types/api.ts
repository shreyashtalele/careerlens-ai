// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp?: string;
  path?: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Error Type
export type ApiError = {
  response?: {
    data?: ApiErrorResponse;
    status: number;
  };
  message: string;
};

// Request Types
export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

// Profile Types
export interface UpdateProfileRequest {
  headline?: string;
  bio?: string;
  skills?: string[];
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  location?: string;
}

// Resume Types
export interface CreateResumeRequest {
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

export interface UpdateResumeRequest {
  title?: string;
  personalDetails?: {
    fullName?: string;
    email?: string;
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

// Upload Types
export interface UploadResumeRequest {
  resume: File;
}

export interface UploadResumeResponse {
  fileName: string;
  fileSize: number;
  text: string;
  wordCount: number;
  characterCount: number;
}

// ATS Types
export interface ATSAnalyzeRequest {
  text: string;
}

export interface ATSAnalyzeWithJDRequest {
  text: string;
  jobDescription: string;
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

// AI Types
export interface AIReviewRequest {
  resumeText: string;
}

export interface AIReviewResponse {
  overallReview: string;
  strengths: string[];
  weaknesses: string[];
  sectionSuggestions: {
    summary?: string;
    experience?: string;
    projects?: string;
    skills?: string;
    education?: string;
  };
  recruiterFeedback: string;
  improvedSummary: string;
  keywordSuggestions: string[];
  nextSteps: string[];
}

export interface InterviewQuestionsRequest {
  resumeText: string;
  difficulty?: "easy" | "medium" | "hard";
  count?: number;
}

export interface InterviewQuestionsResponse {
  technical: string[];
  project: string[];
  behavioral: string[];
  hr: string[];
  followUp: string[];
  preparationTips: string[];
}
