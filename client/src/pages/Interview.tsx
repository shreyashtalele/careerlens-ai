import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAI } from "@/hooks/useAI";
import { useResume } from "@/hooks/useResume";
import { useUpload } from "@/hooks/useUpload";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { Brain, TrendingUp, CheckCircle2, Clock } from "lucide-react";

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

  useEffect(() => {
    if (selectedResumeId) {
      loadResume(selectedResumeId);
    }
  }, [selectedResumeId]);

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
      return;
    }

    if (!selectedResumeText || selectedResumeText.length < 100) {
      return;
    }

    setIsProcessing(true);

    try {
      const atsResult = await analyzeResume(selectedResumeText);

      if (!atsResult) {
        setIsProcessing(false);
        return;
      }

      await generateInterviewQuestions(
        selectedResumeText,
        difficulty,
        questionCount,
        atsResult,
      );
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (resumesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const isLoading = isInterviewLoading || isAnalyzing || isProcessing;

  // Helper function to extract question text
  const getQuestionText = (q: any): string => {
    if (typeof q === "string") return q;
    if (q.question) return q.question;
    if (q.text) return q.text;
    return JSON.stringify(q);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Interview Questions
          </h1>
          <p className="text-gray-500 mt-1">
            Generate personalized interview questions
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/resumes")}>
          ← Back to Resumes
        </Button>
      </div>

      {/* Select Resume Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <select
              value={selectedResumeId}
              onChange={(e) => handleResumeSelect(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <span className="ml-2 text-red-500">(Too short)</span>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value as "easy" | "medium" | "hard")
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Questions
                </label>
                <input
                  type="number"
                  min={3}
                  max={10}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleGenerate}
                disabled={!selectedResumeId || isLoading}
              >
                {isLoading ? "Processing..." : "Generate Questions"}
                {!isLoading && <Brain className="w-4 h-4 ml-2" />}
              </Button>
              {interviewQuestions && (
                <Button variant="outline" onClick={resetInterview}>
                  Clear Results
                </Button>
              )}
            </div>

            {isLoading && (
              <div className="text-sm text-purple-600">
                {isAnalyzing
                  ? "Running ATS analysis..."
                  : isInterviewLoading
                    ? "Generating questions..."
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
        </CardContent>
      </Card>

      {/* Results */}
      {interviewQuestions && (
        <div className="space-y-6">
          {/* Technical Questions */}
          {interviewQuestions.technicalQuestions &&
            interviewQuestions.technicalQuestions.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Technical Questions
                  </h2>
                  <ul className="list-decimal list-inside space-y-3">
                    {interviewQuestions.technicalQuestions.map((q, i) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {getQuestionText(q)}
                        {q.topic && (
                          <span className="block text-xs text-gray-400 mt-1">
                            Topic: {q.topic}
                          </span>
                        )}
                        {q.difficulty && (
                          <Badge
                            variant={
                              q.difficulty === "easy"
                                ? "success"
                                : q.difficulty === "medium"
                                  ? "warning"
                                  : "danger"
                            }
                            className="mt-1"
                          >
                            {q.difficulty}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

          {/* Project Questions */}
          {interviewQuestions.projectQuestions &&
            interviewQuestions.projectQuestions.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Project Questions
                  </h2>
                  <ul className="list-decimal list-inside space-y-3">
                    {interviewQuestions.projectQuestions.map((q, i) => (
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
                </CardContent>
              </Card>
            )}

          {/* Behavioral Questions */}
          {interviewQuestions.behavioralQuestions &&
            interviewQuestions.behavioralQuestions.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    🧠 Behavioral Questions
                  </h2>
                  <ul className="list-decimal list-inside space-y-3">
                    {interviewQuestions.behavioralQuestions.map((q, i) => (
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
                </CardContent>
              </Card>
            )}

          {/* HR Questions */}
          {interviewQuestions.hrQuestions &&
            interviewQuestions.hrQuestions.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    👤 HR Questions
                  </h2>
                  <ul className="list-decimal list-inside space-y-3">
                    {interviewQuestions.hrQuestions.map((q, i) => (
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
                </CardContent>
              </Card>
            )}

          {/* Follow-up Questions */}
          {interviewQuestions.followUpQuestions &&
            interviewQuestions.followUpQuestions.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Follow-up Questions
                  </h2>
                  <ul className="list-decimal list-inside space-y-3">
                    {interviewQuestions.followUpQuestions.map((q, i) => (
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
                </CardContent>
              </Card>
            )}

          {/* Preparation Tips */}
          {interviewQuestions.preparationTips &&
            interviewQuestions.preparationTips.length > 0 && (
              <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    📝 Preparation Tips
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    {interviewQuestions.preparationTips.map((tip, i) => (
                      <li key={i} className="text-gray-700 text-sm">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
        </div>
      )}

      {!interviewQuestions && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Select a resume and click "Generate Questions"
            </p>
            <p className="text-sm text-gray-400 mt-2">
              AI will generate questions based on your resume content
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
