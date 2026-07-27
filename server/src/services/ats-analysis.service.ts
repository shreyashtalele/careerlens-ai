import { ATS_ANALYSIS_MESSAGES } from "../constants/ats-analysis.constants.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import {
  AnalyzeResumeWithJobDescriptionInput,
  AtsResumeAnalysisResult,
  ParseResumeSectionsInput,
} from "../types/ats-analysis.types.js";
import ApiError from "../utils/ApiError.js";
import { calculateAtsScore } from "../utils/ats-score-calculator.js";
import { extractJobDescriptionSkills } from "../utils/job-description-skill-extractor.js";
import { parseResumeSections } from "../utils/resume-section-parser.js";
import { extractSkills } from "../utils/skill-extractor.js";
import { matchSkills } from "../utils/skill-matcher.js";

export const analyzeResumeText = ({
  resumeText,
}: ParseResumeSectionsInput): AtsResumeAnalysisResult => {
  const normalizedResumeText = resumeText.trim();

  if (!normalizedResumeText) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      ATS_ANALYSIS_MESSAGES.EMPTY_RESUME_TEXT,
    );
  }

  const sections = parseResumeSections({
    resumeText: normalizedResumeText,
  });

  const skills = extractSkills(sections.skills);

  const score = calculateAtsScore({
    sections,
    skills,
    resumeText: normalizedResumeText,
  });

  return {
    sections,
    skills,
    score,
  };
};

export const analyzeResumeWithJobDescription = ({
  resumeText,
  jobDescription,
}: AnalyzeResumeWithJobDescriptionInput): AtsResumeAnalysisResult => {
  const normalizedJobDescription = jobDescription.trim();

  if (!normalizedJobDescription) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      ATS_ANALYSIS_MESSAGES.EMPTY_JOB_DESCRIPTION,
    );
  }

  const resumeAnalysis = analyzeResumeText({
    resumeText,
  });

  const jobDescriptionSkills = extractJobDescriptionSkills(
    normalizedJobDescription,
  );

  const skillMatch = matchSkills(resumeAnalysis.skills, jobDescriptionSkills);

  return {
    ...resumeAnalysis,
    skillMatch,
  };
};
