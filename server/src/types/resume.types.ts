export interface ResumePersonalDetails {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  location?: string;
  description?: string;
}

export interface ResumeExperience {
  company: string;
  jobTitle: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking: boolean;
  description?: string;
  achievements: string[];
}

export interface ResumeProject {
  title: string;
  description?: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface ResumeCertification {
  name: string;
  issuingOrganization?: string;
  issueDate?: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ResumeLanguage {
  name: string;
  proficiency?: string;
}

export interface CreateResumeInput {
  title: string;
  personalDetails: ResumePersonalDetails;
  professionalSummary?: string;
  skills?: string[];
  education?: ResumeEducation[];
  experience?: ResumeExperience[];
  projects?: ResumeProject[];
  certifications?: ResumeCertification[];
  achievements?: string[];
  languages?: ResumeLanguage[];
}

export interface UpdateResumeInput {
  title?: string;
  personalDetails?: ResumePersonalDetails;
  professionalSummary?: string;
  skills?: string[];
  education?: ResumeEducation[];
  experience?: ResumeExperience[];
  projects?: ResumeProject[];
  certifications?: ResumeCertification[];
  achievements?: string[];
  languages?: ResumeLanguage[];
}
