export type ResumeSectionName =
  | "summary"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "certifications"
  | "achievements"
  | "languages";

export interface ParsedResumeSections {
  summary: string;
  skills: string;
  experience: string;
  projects: string;
  education: string;
  certifications: string;
  achievements: string;
  languages: string;
}

export interface ParseResumeSectionsInput {
  resumeText: string;
}

export interface AtsResumeAnalysisResult {
  sections: ParsedResumeSections;
  skills: string[];
  score: AtsScoreResult;
  skillMatch?: SkillMatchResult;
}

export interface AtsScoreBreakdown {
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
}

export interface AtsScoreResult {
  overallScore: number;
  breakdown: AtsScoreBreakdown;
  missingSections: ResumeSectionName[];
  recommendations: string[];
}

export interface CalculateAtsScoreInput {
  sections: ParsedResumeSections;
  skills: string[];
  resumeText: string;
}

export interface AnalyzeResumeWithJobDescriptionInput {
  resumeText: string;
  jobDescription: string;
}

export interface SkillMatchResult {
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
}
