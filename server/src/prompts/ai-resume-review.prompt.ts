import { AtsResumeAnalysisResult } from "../types/ats-analysis.types.js";

interface BuildResumeReviewPromptInput {
  resumeText: string;
  atsAnalysis: AtsResumeAnalysisResult;
  jobDescription?: string;
}

export const buildResumeReviewPrompt = ({
  resumeText,
  atsAnalysis,
  jobDescription,
}: BuildResumeReviewPromptInput): string => {
  return `
You are an experienced technical recruiter and resume reviewer.

Analyze the candidate's resume based on the following information.

==============================
RESUME
==============================
${resumeText}

==============================
ATS ANALYSIS
==============================
${JSON.stringify(atsAnalysis, null, 2)}

${
  jobDescription
    ? `
==============================
JOB DESCRIPTION
==============================
${jobDescription}
`
    : ""
}

Your task is to provide constructive, actionable, and professional feedback.

Rules:

1. Return ONLY valid JSON.
2. Do NOT include markdown.
3. Do NOT wrap the response inside \`\`\`.
4. Do NOT explain your reasoning.
5. Keep feedback concise and professional.
6. Suggestions must be specific and actionable.
7. Never invent experience, skills, certifications, metrics, projects, or achievements.
8. If a job-required skill is missing, recommend learning or gaining experience in it instead of claiming it on the resume.
9. The improved summary must only use facts supported by the provided resume.

Return JSON in exactly this format:

{
  "overallReview": "",
  "strengths": [],
  "weaknesses": [],
  "sectionSuggestions": {
    "summary": "",
    "experience": "",
    "projects": "",
    "skills": "",
    "education": ""
  },
  "keywordSuggestions": [],
  "recruiterFeedback": "",
  "improvedSummary": "",
  "nextSteps": []
}
`;
};
