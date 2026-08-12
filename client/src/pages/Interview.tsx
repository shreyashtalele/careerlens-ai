import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAI } from "@/hooks/useAI";
import { useResume } from "@/hooks/useResume";
import { useUpload } from "@/hooks/useUpload";
import { LoadingSpinner } from "@/components/comman";
import { toast } from "@/lib/toast";

export default function Interview() {
  const navigate = useNavigate();
  const {
    resumes,
    isLoading: resumesLoading,
    loadResume,
    selectedResume,
  } = useResume();
  const {
    generateInterviewQuestions,
    interviewQuestions,
    isInterviewLoading,
    error,
    resetInterview,
  } = useAI();
  const { analyzeResume, isAnalyzing } = useUpload();
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [selectedResumeText, setSelectedResumeText] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load resume content when selected
  useEffect(() => {
    if (selectedResumeId) {
      loadResume(selectedResumeId);
    }
  }, [selectedResumeId]);

  // Update text when resume is loaded
  useEffect(() => {
    if (selectedResume) {
      const resumeText = [
        selectedResume.personalDetails?.fullName || "",
        selectedResume.personalDetails?.email || "",
        selectedResume.personalDetails?.phone || "",
        selectedResume.personalDetails?.location || "",
        selectedResume.summary || "",
        selectedResume.skills?.join(", ") || "",
        selectedResume.experience
          ?.map(
            (exp) => `${exp.position} at ${exp.company}: ${exp.description}`,
          )
          .join(" ") || "",
        selectedResume.education
          ?.map(
            (edu) =>
              `${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution}`,
          )
          .join(" ") || "",
        selectedResume.projects
          ?.map((proj) => `${proj.name}: ${proj.description}`)
          .join(" ") || "",
      ]
        .filter(Boolean)
        .join("\n\n");

      setSelectedResumeText(resumeText);
    }
  }, [selectedResume]);

  const handleResumeSelect = (resumeId: string) => {
    setSelectedResumeId(resumeId);
    setSelectedResumeText("");
  };

  const handleGenerate = async () => {
    if (!selectedResumeId) {
      toast.error("Please select a resume first");
      return;
    }

    if (!selectedResumeText || selectedResumeText.length < 100) {
      toast.error(
        "Resume text is too short or empty. Please make sure your resume has content.",
      );
      return;
    }

    setIsProcessing(true);

    try {
      toast.loading("Running ATS analysis...");
      const atsResult = await analyzeResume(selectedResumeText);
      toast.dismiss();

      if (!atsResult) {
        toast.error("ATS analysis failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      toast.success(
        "ATS analysis completed! Now generating interview questions...",
      );
      await generateInterviewQuestions(
        selectedResumeText,
        difficulty,
        questionCount,
        atsResult,
      );
    } catch (err) {
      console.error("Generation failed:", err);
      toast.error("Failed to generate questions. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (resumesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" message="Loading resumes..." />
      </div>
    );
  }

  const isLoading = isInterviewLoading || isAnalyzing || isProcessing;

  // Helper function to extract question text from different formats
  const getQuestionText = (q: any): string => {
    if (typeof q === "string") return q;
    if (q.question) return q.question;
    if (q.text) return q.text;
    return JSON.stringify(q);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Interview Questions
        </h1>
        <button
          onClick={() => navigate("/resumes")}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Resumes
        </button>
      </div>

      {/* Select Resume */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Interview Questions
        </h2>
        <div className="flex flex-col gap-4">
          <select
            value={selectedResumeId}
            onChange={(e) => handleResumeSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a resume...</option>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.title} {resume.isDefault ? "(Default)" : ""}
              </option>
            ))}
          </select>

          {selectedResumeText && (
            <div className="text-sm text-gray-500">
              Resume text loaded: {selectedResumeText.length} characters
              {selectedResumeText.length < 100 && (
                <span className="ml-2 text-red-500">
                  (Too short - please add more content to your resume)
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value as "easy" | "medium" | "hard")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Questions
              </label>
              <input
                type="number"
                min={3}
                max={10}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={!selectedResumeId || isLoading}
              className="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Generate Questions"}
            </button>
            {interviewQuestions && (
              <button
                onClick={resetInterview}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Results
              </button>
            )}
          </div>

          {isLoading && (
            <div className="text-sm text-purple-600">
              {isAnalyzing
                ? "Running ATS analysis..."
                : isInterviewLoading
                  ? "Generating interview questions..."
                  : "Processing..."}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          {interviewQuestions && (
            <div className="text-sm text-green-600">
              ✅ Questions generated successfully!
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {interviewQuestions && (
        <div className="space-y-6">
          {/* Technical Questions */}
          {interviewQuestions.technicalQuestions &&
            interviewQuestions.technicalQuestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-blue-700 mb-3">
                  💻 Technical Questions
                </h2>
                <ul className="list-decimal list-inside space-y-3">
                  {interviewQuestions.technicalQuestions.map(
                    (q: any, i: number) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {getQuestionText(q)}
                        {q.topic && (
                          <span className="block text-xs text-gray-400 mt-1">
                            Topic: {q.topic}
                          </span>
                        )}
                        {q.difficulty && (
                          <span
                            className={`block text-xs mt-1 ${
                              q.difficulty === "easy"
                                ? "text-green-600"
                                : q.difficulty === "medium"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            Difficulty: {q.difficulty}
                          </span>
                        )}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

          {/* Project Questions */}
          {interviewQuestions.projectQuestions &&
            interviewQuestions.projectQuestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-green-700 mb-3">
                  📁 Project Questions
                </h2>
                <ul className="list-decimal list-inside space-y-3">
                  {interviewQuestions.projectQuestions.map(
                    (q: any, i: number) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {getQuestionText(q)}
                        {q.topic && (
                          <span className="block text-xs text-gray-400 mt-1">
                            Topic: {q.topic}
                          </span>
                        )}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

          {/* Behavioral Questions */}
          {interviewQuestions.behavioralQuestions &&
            interviewQuestions.behavioralQuestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-orange-700 mb-3">
                  🧠 Behavioral Questions
                </h2>
                <ul className="list-decimal list-inside space-y-3">
                  {interviewQuestions.behavioralQuestions.map(
                    (q: any, i: number) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {getQuestionText(q)}
                        {q.topic && (
                          <span className="block text-xs text-gray-400 mt-1">
                            Topic: {q.topic}
                          </span>
                        )}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

          {/* HR Questions */}
          {interviewQuestions.hrQuestions &&
            interviewQuestions.hrQuestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-purple-700 mb-3">
                  👤 HR Questions
                </h2>
                <ul className="list-decimal list-inside space-y-3">
                  {interviewQuestions.hrQuestions.map((q: any, i: number) => (
                    <li key={i} className="text-gray-700 text-sm">
                      {getQuestionText(q)}
                      {q.topic && (
                        <span className="block text-xs text-gray-400 mt-1">
                          Topic: {q.topic}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Follow-up Questions */}
          {interviewQuestions.followUpQuestions &&
            interviewQuestions.followUpQuestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-pink-700 mb-3">
                  🔄 Follow-up Questions
                </h2>
                <ul className="list-decimal list-inside space-y-3">
                  {interviewQuestions.followUpQuestions.map(
                    (q: any, i: number) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {getQuestionText(q)}
                        {q.topic && (
                          <span className="block text-xs text-gray-400 mt-1">
                            Topic: {q.topic}
                          </span>
                        )}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

          {/* Preparation Tips */}
          {interviewQuestions.preparationTips &&
            interviewQuestions.preparationTips.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  📝 Preparation Tips
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {interviewQuestions.preparationTips.map(
                    (tip: string, i: number) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {tip}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
        </div>
      )}

      {!interviewQuestions && !isLoading && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500">
            Select a resume and click "Generate Questions" to get interview
            questions
          </p>
          <p className="text-sm text-gray-400 mt-2">
            AI will generate questions based on your resume content
          </p>
        </div>
      )}
    </div>
  );
}
