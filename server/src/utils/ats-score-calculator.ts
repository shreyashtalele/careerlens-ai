import {
  ATS_RECOMMENDATIONS,
  ATS_SCORE_THRESHOLDS,
  ATS_SCORE_WEIGHTS,
} from "../constants/ats-analysis.constants.js";
import {
  AtsScoreBreakdown,
  AtsScoreResult,
  CalculateAtsScoreInput,
  ResumeSectionName,
} from "../types/ats-analysis.types.js";

const hasContent = (value: string): boolean => {
  return value.trim().length > 0;
};

export const calculateAtsScore = ({
  sections,
  skills,
  resumeText,
}: CalculateAtsScoreInput): AtsScoreResult => {
  const missingSections: ResumeSectionName[] = [];
  const recommendations: string[] = [];

  const breakdown: AtsScoreBreakdown = {
    summary: 0,
    skills: 0,
    experience: 0,
    projects: 0,
    education: 0,
    certifications: 0,
    achievements: 0,
    languages: 0,
    skillCount: 0,
    resumeLength: 0,
  };

  if (hasContent(sections.summary)) {
    breakdown.summary = ATS_SCORE_WEIGHTS.SUMMARY;
  } else {
    missingSections.push("summary");
    recommendations.push(ATS_RECOMMENDATIONS.summary);
  }

  if (hasContent(sections.skills)) {
    breakdown.skills = ATS_SCORE_WEIGHTS.SKILLS;
  } else {
    missingSections.push("skills");
    recommendations.push(ATS_RECOMMENDATIONS.skills);
  }

  if (hasContent(sections.experience)) {
    breakdown.experience = ATS_SCORE_WEIGHTS.EXPERIENCE;
  } else {
    missingSections.push("experience");
    recommendations.push(ATS_RECOMMENDATIONS.experience);
  }

  if (hasContent(sections.projects)) {
    breakdown.projects = ATS_SCORE_WEIGHTS.PROJECTS;
  } else {
    missingSections.push("projects");
    recommendations.push(ATS_RECOMMENDATIONS.projects);
  }

  if (hasContent(sections.education)) {
    breakdown.education = ATS_SCORE_WEIGHTS.EDUCATION;
  } else {
    missingSections.push("education");
    recommendations.push(ATS_RECOMMENDATIONS.education);
  }

  if (hasContent(sections.certifications)) {
    breakdown.certifications = ATS_SCORE_WEIGHTS.CERTIFICATIONS;
  } else {
    missingSections.push("certifications");
    recommendations.push(ATS_RECOMMENDATIONS.certifications);
  }

  if (hasContent(sections.achievements)) {
    breakdown.achievements = ATS_SCORE_WEIGHTS.ACHIEVEMENTS;
  } else {
    missingSections.push("achievements");
    recommendations.push(ATS_RECOMMENDATIONS.achievements);
  }

  if (hasContent(sections.languages)) {
    breakdown.languages = ATS_SCORE_WEIGHTS.LANGUAGES;
  } else {
    missingSections.push("languages");
    recommendations.push(ATS_RECOMMENDATIONS.languages);
  }

  if (skills.length >= ATS_SCORE_THRESHOLDS.MINIMUM_SKILLS) {
    breakdown.skillCount = ATS_SCORE_WEIGHTS.SKILL_COUNT;
  } else {
    recommendations.push(ATS_RECOMMENDATIONS.skillCount);
  }

  const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length;

  if (wordCount >= ATS_SCORE_THRESHOLDS.MINIMUM_WORD_COUNT) {
    breakdown.resumeLength = ATS_SCORE_WEIGHTS.RESUME_LENGTH;
  } else {
    recommendations.push(ATS_RECOMMENDATIONS.resumeLength);
  }

  const overallScore = Object.values(breakdown).reduce(
    (total, score) => total + score,
    0,
  );

  return {
    overallScore,
    breakdown,
    missingSections,
    recommendations,
  };
};
