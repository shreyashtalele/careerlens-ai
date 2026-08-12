// ============================================
// USER & PROFILE TYPES
// ============================================

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
// RESUME TYPES
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
  personalDetails: PersonalDetails;
  summary?: string;
  skills?: string[];
  experience?: WorkExperience[];
  education?: Education[];
  projects?: Project[];
}

// ============================================
// PROFILE RESPONSE
// ============================================

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Profile;
}
