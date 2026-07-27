const SKILL_SEPARATORS = /[\n,;|]+/;

const BULLET_PREFIX_PATTERN = /^[•●▪◦\-*]+\s*/;

const normalizeSkill = (skill: string): string => {
  return skill.replace(BULLET_PREFIX_PATTERN, "").trim();
};

export const extractSkills = (skillsText: string): string[] => {
  if (!skillsText.trim()) {
    return [];
  }

  const uniqueSkills = new Map<string, string>();

  const skills = skillsText.split(SKILL_SEPARATORS);

  for (const skill of skills) {
    const normalizedSkill = normalizeSkill(skill);

    if (!normalizedSkill) {
      continue;
    }

    const comparisonKey = normalizedSkill.toLowerCase();

    if (!uniqueSkills.has(comparisonKey)) {
      uniqueSkills.set(comparisonKey, normalizedSkill);
    }
  }

  return Array.from(uniqueSkills.values());
};
