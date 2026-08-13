import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAI } from "@/hooks/useAI";
import { useResume } from "@/hooks/useResume";
import { useUpload } from "@/hooks/useUpload";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";

export default function AIReview() {
  const navigate = useNavigate();
  const {
    resumes,
    isLoading: resumesLoading,
    loadResume,
    selectedResume,
  } = useResume();
  const { getResumeReview, reviewResult, isLoading, error, resetReview } =
    useAI();
  const { analyzeResume, isAnalyzing } = useUpload();
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [selectedResumeText, setSelectedResumeText] = useState<string>("");
  const [isRunningFullAnalysis, setIsRunningFullAnalysis] = useState(false);

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

  const handleAnalyze = async () => {
    if (!selectedResumeId) {
      return;
    }

    if (!selectedResumeText || selectedResumeText.length < 100) {
      return;
    }

    setIsRunningFullAnalysis(true);

    try {
      const atsResult = await analyzeResume(selectedResumeText);

      if (!atsResult) {
        setIsRunningFullAnalysis(false);
        return;
      }

      await getResumeReview(selectedResumeText, atsResult);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setIsRunningFullAnalysis(false);
    }
  };

  if (resumesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const isProcessing = isLoading || isAnalyzing || isRunningFullAnalysis;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Resume Review</h1>
          <p className="text-gray-500 mt-1">
            Get AI-powered feedback on your resume
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/resumes")}>
          ← Back to Resumes
        </Button>
      </div>

      {/* Select Resume Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedResumeId}
              onChange={(e) => handleResumeSelect(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a resume...</option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title} {resume.isDefault ? "(Default)" : ""}
                </option>
              ))}
            </select>
            <Button
              onClick={handleAnalyze}
              disabled={!selectedResumeId || isProcessing}
            >
              {isProcessing ? "Processing..." : "Analyze Resume"}
              {!isProcessing && <Sparkles className="w-4 h-4 ml-2" />}
            </Button>
            {reviewResult && (
              <Button variant="outline" onClick={resetReview}>
                Clear Results
              </Button>
            )}
          </div>

          {selectedResumeText && (
            <div className="mt-3 text-sm text-gray-500">
              Resume text loaded: {selectedResumeText.length} characters
              {selectedResumeText.length < 100 && (
                <span className="ml-2 text-red-500">(Too short)</span>
              )}
            </div>
          )}

          {isProcessing && (
            <div className="mt-4 text-sm text-blue-600">
              {isAnalyzing
                ? "Running ATS analysis..."
                : isLoading
                  ? "Getting AI review..."
                  : "Processing..."}
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {reviewResult && (
            <div className="mt-4 text-sm text-green-600">
              ✅ Review completed successfully!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {reviewResult && (
        <div className="space-y-6">
          {/* Overall Review */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Overall Review
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {reviewResult.overallReview}
              </p>
            </CardContent>
          </Card>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Strengths
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {reviewResult.strengths.map((strength, i) => (
                    <li key={i} className="text-gray-700 text-sm">
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Weaknesses
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {reviewResult.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-gray-700 text-sm">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Section Suggestions */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Section Suggestions
              </h2>
              <div className="space-y-3">
                {reviewResult.sectionSuggestions.summary && (
                  <div>
                    <h4 className="font-medium text-gray-700">Summary</h4>
                    <p className="text-sm text-gray-600">
                      {reviewResult.sectionSuggestions.summary}
                    </p>
                  </div>
                )}
                {reviewResult.sectionSuggestions.experience && (
                  <div>
                    <h4 className="font-medium text-gray-700">Experience</h4>
                    <p className="text-sm text-gray-600">
                      {reviewResult.sectionSuggestions.experience}
                    </p>
                  </div>
                )}
                {reviewResult.sectionSuggestions.projects && (
                  <div>
                    <h4 className="font-medium text-gray-700">Projects</h4>
                    <p className="text-sm text-gray-600">
                      {reviewResult.sectionSuggestions.projects}
                    </p>
                  </div>
                )}
                {reviewResult.sectionSuggestions.skills && (
                  <div>
                    <h4 className="font-medium text-gray-700">Skills</h4>
                    <p className="text-sm text-gray-600">
                      {reviewResult.sectionSuggestions.skills}
                    </p>
                  </div>
                )}
                {reviewResult.sectionSuggestions.education && (
                  <div>
                    <h4 className="font-medium text-gray-700">Education</h4>
                    <p className="text-sm text-gray-600">
                      {reviewResult.sectionSuggestions.education}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recruiter Feedback & Improved Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-3">
                  Recruiter Feedback
                </h3>
                <p className="text-gray-700 text-sm">
                  {reviewResult.recruiterFeedback}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-3">
                  Improved Summary
                </h3>
                <p className="text-gray-700 text-sm">
                  {reviewResult.improvedSummary}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Keyword Suggestions & Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold text-blue-700 mb-3">
                  💡 Keyword Suggestions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {reviewResult.keywordSuggestions.map((keyword, i) => (
                    <Badge key={i} variant="default">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold text-purple-700 mb-3">
                  🚀 Next Steps
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {reviewResult.nextSteps.map((step, i) => (
                    <li key={i} className="text-gray-700 text-sm">
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!reviewResult && !isProcessing && (
        <Card>
          <CardContent className="p-12 text-center">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Select a resume and click "Analyze Resume" to get AI feedback
            </p>
            <p className="text-sm text-gray-400 mt-2">
              This will run ATS analysis first, then use AI to provide detailed
              feedback
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
