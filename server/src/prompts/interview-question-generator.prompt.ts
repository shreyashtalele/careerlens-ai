import { INTERVIEW_DEFAULTS } from "../constants/interview-question-generator.constants.js";
import {
  GenerateInterviewQuestionsInput,
  InterviewQuestionDifficulty,
} from "../types/interview-question-generator.types.js";

interface BuildInterviewQuestionPromptInput extends GenerateInterviewQuestionsInput {
  difficulty: InterviewQuestionDifficulty;
  questionCount: number;
}

export const buildInterviewQuestionPrompt = ({
  resumeText,
  atsAnalysis,
  jobDescription,
  difficulty = INTERVIEW_DEFAULTS.DEFAULT_DIFFICULTY,
  questionCount,
}: BuildInterviewQuestionPromptInput): string => {
  return `
You are an experienced technical interviewer and hiring manager.

Generate realistic interview questions using only the information provided
in the resume, ATS analysis, and optional job description.

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

==============================
INTERVIEW SETTINGS
==============================
Difficulty: ${difficulty}
Total primary questions: ${questionCount}

Generate a personalized and evidence-based interview question set.

CRITICAL GROUNDING RULES:

1. Use only facts explicitly present in the resume, ATS analysis, or job description.
2. Never invent company names, project names, technologies, responsibilities,
   achievements, certifications, dates, metrics, job titles, or experience.
3. When referring to a company, project, certification, or role, use the exact
   name present in the resume.
4. If an exact company or project name is unavailable, use generic wording such as:
   - "your previous experience"
   - "one of your projects"
   - "a project mentioned in your resume"
5. Never replace missing information with a fabricated example.
6. Do not assume seniority, production experience, leadership experience,
   years of experience, or domain expertise unless explicitly stated.
7. If a skill appears only in the job description and not in the resume:
   - do not imply that the candidate already knows or has used it
   - do not ask implementation questions that assume hands-on experience
   - ask about learning approach, adaptability, migration strategy,
     preparation, or willingness to learn
8. Never convert a missing skill into a claimed candidate skill.
9. If there is insufficient information for a personalized question,
   generate a relevant generic question instead.
10. Every "reason" must be supported by the provided input.
11. Do not state that a technology appears in the resume unless it actually does.
12. Do not hallucinate.

OUTPUT RULES:

1. Return only valid JSON.
2. Do not include Markdown, code fences, headings, or explanatory text.
3. Do not include any content before or after the JSON object.
4. Keep every question clear, specific, and interview-ready.
5. Use "${difficulty}" as the difficulty for every generated question.
6. Generate exactly ${questionCount} primary questions across:
   - technicalQuestions
   - projectQuestions
   - behavioralQuestions
   - hrQuestions
7. followUpQuestions are additional and do not count toward the primary total.
8. Generate no more than 5 follow-up questions.
9. Generate between 3 and 6 preparation tips.
10. Avoid duplicate and near-duplicate questions.
11. Use empty arrays when a category is not applicable.
12. Every question object must contain:
   - question
   - difficulty
   - topic
   - reason

Return JSON in exactly this structure:

{
  "technicalQuestions": [
    {
      "question": "",
      "difficulty": "${difficulty}",
      "topic": "",
      "reason": ""
    }
  ],
  "projectQuestions": [
    {
      "question": "",
      "difficulty": "${difficulty}",
      "topic": "",
      "reason": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "difficulty": "${difficulty}",
      "topic": "",
      "reason": ""
    }
  ],
  "hrQuestions": [
    {
      "question": "",
      "difficulty": "${difficulty}",
      "topic": "",
      "reason": ""
    }
  ],
  "followUpQuestions": [
    {
      "question": "",
      "difficulty": "${difficulty}",
      "topic": "",
      "reason": ""
    }
  ],
  "preparationTips": []
}
`;
};
