import { AtsResumeAnalysisResult } from "./ats-analysis.types.js";

export interface SectionSuggestions {
  summary: string;
  experience: string;
  projects: string;
  skills: string;
  education: string;
}

export interface AIResumeReviewResult {
  overallReview: string;
  strengths: string[];
  weaknesses: string[];
  sectionSuggestions: SectionSuggestions;
  keywordSuggestions: string[];
  recruiterFeedback: string;
  improvedSummary: string;
  nextSteps: string[];
}

export interface GenerateAIResumeReviewInput {
  resumeText: string;
  atsAnalysis: AtsResumeAnalysisResult;
  jobDescription?: string;
}
