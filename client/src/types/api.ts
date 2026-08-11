// ============================================
// API RESPONSE TYPES
// ============================================

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

export type ApiError = {
  response?: {
    data?: ApiErrorResponse;
    status: number;
  };
  message: string;
};

// ============================================
// REQUEST TYPES
// ============================================

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ============================================
// AUTH TYPES
// ============================================

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

// ============================================
// PROFILE TYPES
// ============================================

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

// ============================================
// RESUME TYPES
// ============================================

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

// ============================================
// UPLOAD TYPES
// ============================================

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

// ============================================
// ATS TYPES - UPDATED
// ============================================

export interface ATSAnalyzeRequest {
  text: string;
}

export interface ATSAnalyzeWithJDRequest {
  text: string;
  jobDescription: string;
}

export interface ATSScore {
  overallScore: number;
  breakdown: {
    summary: number;
    skills: number;
    experience: number;
    projects: number;
    education: number;
    certifications: number;
    achievements: number;
    languages: number;
    skillCount: number;
    resumeLength: number;
  };
  missingSections: string[];
  recommendations: string[];
}

export interface ATSAnalysisResponse {
  sections: {
    summary: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    certifications: string;
    achievements: string;
    languages: string;
  };
  skills: string[];
  score: ATSScore;
}

export interface ATSAnalysisWithJDResponse extends ATSAnalysisResponse {
  skillMatch: {
    matchedSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
  };
}

// ============================================
// AI TYPES
// ============================================

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
  technicalQuestions: Array<{
    question: string;
    difficulty: string;
    topic: string;
    reason: string;
  }>;
  projectQuestions: Array<{
    question: string;
    difficulty: string;
    topic: string;
    reason: string;
  }>;
  behavioralQuestions: Array<{
    question: string;
    difficulty: string;
    topic: string;
    reason: string;
  }>;
  hrQuestions: Array<{
    question: string;
    difficulty: string;
    topic: string;
    reason: string;
  }>;
  followUpQuestions: Array<{
    question: string;
    difficulty: string;
    topic: string;
    reason: string;
  }>;
  preparationTips: string[];
}

// ============================================
// AI TYPES - Add these to your api.ts
// ============================================

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

export interface AITestResponse {
  status: string;
  message?: string;
}
