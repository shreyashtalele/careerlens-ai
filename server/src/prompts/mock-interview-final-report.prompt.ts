import { MockInterviewAnswer } from "../types/mock-interview.types.js";

export interface BuildFinalInterviewReportPromptInput {
  answers: MockInterviewAnswer[];
  resumeText: string;
  jobDescription?: string;
}

export function buildFinalInterviewReportPrompt({
  answers,
  resumeText,
  jobDescription,
}: BuildFinalInterviewReportPromptInput): string {
  return `
You are an experienced technical interviewer.

Generate a final interview assessment based ONLY on:

1. Candidate resume
2. Candidate interview answers
3. Optional job description

Do not invent any experience, projects, achievements, technologies, companies, or skills.

CANDIDATE RESUME

${resumeText}

JOB DESCRIPTION

${jobDescription ?? "No job description provided."}

INTERVIEW ANSWERS

${JSON.stringify(answers, null, 2)}

INSTRUCTIONS

1. Evaluate the interview as a whole.
2. Use only the provided interview answers.
3. Do not assume missing information.
4. Score the candidate fairly.
5. Give practical improvement suggestions.
6. Hiring recommendation must be concise.
7. Return JSON only.
8. No markdown.
9. No explanations outside JSON.

Return exactly this JSON:

{
  "overallScore": 0,
  "scoreBreakdown": {
    "technicalScore": 0,
    "communicationScore": 0,
    "confidenceScore": 0,
    "relevanceScore": 0
  },
  "strengths": [
    "..."
  ],
  "weaknesses": [
    "..."
  ],
  "improvementAreas": [
    "..."
  ],
  "hiringRecommendation": "..."
}
`.trim();
}
