// User & Profile
export interface User {
  id: string;
  email: string;
  name: string;
  profile?: Profile;
}

export interface Profile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Profile;
}

export interface UpdateProfileData {
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
// RESUME TYPES - COMPLETE
// ============================================

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  isDefault: boolean;
  personalDetails: PersonalDetails;
  summary?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
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
  experience?: WorkExperience[];
  education?: Education[];
  projects?: Project[];
}

// Resume API Response
export interface ResumeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Resume | Resume[];
}

// ============================================
// UPLOAD & ATS TYPES
// ============================================

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

export interface ATSAnalysis {
  score: number;
  sections: ATSSection[];
  missingSections: string[];
  recommendations: string[];
  extractedSkills: string[];
}

export interface ATSAnalysisWithJD extends ATSAnalysis {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
}

// ============================================
// AI TYPES
// ============================================

export interface AIReview {
  overallReview: string;
  strengths: string[];
  weaknesses: string[];
  recruiterFeedback: string;
  improvedSummary: string;
  sectionSuggestions: {
    summary?: string;
    experience?: string;
    projects?: string;
    skills?: string;
    education?: string;
  };
  keywordSuggestions: string[];
  nextSteps: string[];
}

export interface InterviewQuestions {
  technical: string[];
  project: string[];
  behavioral: string[];
  hr: string[];
  followUp: string[];
  preparationTips: string[];
}
