import { SUPPORTED_TECHNICAL_SKILLS } from "../constants/ats-analysis.constants.js";

const normalizeText = (value: string): string => {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
};

const createSkillPattern = (skill: string): RegExp => {
  const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return new RegExp(`(^|[^a-z0-9])${escapedSkill}([^a-z0-9]|$)`, "i");
};

export const extractJobDescriptionSkills = (
  jobDescription: string,
): string[] => {
  const normalizedJobDescription = normalizeText(jobDescription);

  if (!normalizedJobDescription) {
    return [];
  }

  const detectedSkills: string[] = [];

  for (const skill of SUPPORTED_TECHNICAL_SKILLS) {
    const skillPattern = createSkillPattern(skill);

    if (skillPattern.test(normalizedJobDescription)) {
      detectedSkills.push(skill);
    }
  }

  return detectedSkills;
};
