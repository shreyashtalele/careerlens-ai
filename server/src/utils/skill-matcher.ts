import { SkillMatchResult } from "../types/ats-analysis.types.js";

const normalizeSkill = (skill: string): string => {
  return skill.trim().toLowerCase();
};

export const matchSkills = (
  resumeSkills: string[],
  jobDescriptionSkills: string[],
): SkillMatchResult => {
  const normalizedResumeSkills = new Set(resumeSkills.map(normalizeSkill));

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of jobDescriptionSkills) {
    const normalizedSkill = normalizeSkill(skill);

    if (normalizedResumeSkills.has(normalizedSkill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  const matchPercentage =
    jobDescriptionSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / jobDescriptionSkills.length) * 100);

  return {
    matchedSkills,
    missingSkills,
    matchPercentage,
  };
};
