import { RESUME_SECTION_HEADINGS } from "../constants/ats-analysis.constants.js";
import {
  ParsedResumeSections,
  ParseResumeSectionsInput,
  ResumeSectionName,
} from "../types/ats-analysis.types.js";

const createEmptySections = (): ParsedResumeSections => ({
  summary: "",
  skills: "",
  experience: "",
  projects: "",
  education: "",
  certifications: "",
  achievements: "",
  languages: "",
});

const getSectionName = (line: string): ResumeSectionName | null => {
  const normalizedLine = line.trim().toLowerCase();

  for (const [sectionName, headings] of Object.entries(
    RESUME_SECTION_HEADINGS,
  )) {
    if (headings.includes(normalizedLine)) {
      return sectionName as ResumeSectionName;
    }
  }

  return null;
};

export const parseResumeSections = ({
  resumeText,
}: ParseResumeSectionsInput): ParsedResumeSections => {
  const sections = createEmptySections();

  const lines = resumeText.split(/\r?\n/);

  let currentSection: ResumeSectionName | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    const detectedSection = getSectionName(trimmedLine);

    if (detectedSection) {
      currentSection = detectedSection;
      continue;
    }

    if (!currentSection) {
      continue;
    }

    sections[currentSection] +=
      (sections[currentSection] ? "\n" : "") + trimmedLine;
  }

  return sections;
};
