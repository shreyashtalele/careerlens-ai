import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAI } from "@/hooks/useAI";
import { useResume } from "@/hooks/useResume";
import { useUpload } from "@/hooks/useUpload";
import { LoadingSpinner } from "@/components/comman";
import { toast } from "@/lib/toast";

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
  const { analyzeResume, isAnalyzing } = useUpload(); // ← Removed analysisResult
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [selectedResumeText, setSelectedResumeText] = useState<string>("");
  const [isRunningFullAnalysis, setIsRunningFullAnalysis] = useState(false);

  // ... rest of the code remains the same

  // Load resume content when selected
  useEffect(() => {
    if (selectedResumeId) {
      loadResume(selectedResumeId);
    }
  }, [selectedResumeId]);

  // Update text when resume is loaded
  useEffect(() => {
    if (selectedResume) {
      // Combine all resume sections into one text
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
      toast.error("Please select a resume first");
      return;
    }

    if (!selectedResumeText || selectedResumeText.length < 100) {
      toast.error(
        "Resume text is too short or empty. Please make sure your resume has content.",
      );
      return;
    }

    setIsRunningFullAnalysis(true);

    try {
      // Step 1: Run ATS Analysis first
      toast.loading("Running ATS analysis...");
      const atsResult = await analyzeResume(selectedResumeText);
      toast.dismiss();

      if (!atsResult) {
        toast.error("ATS analysis failed. Please try again.");
        setIsRunningFullAnalysis(false);
        return;
      }

      toast.success("ATS analysis completed! Now running AI review...");

      // Step 2: Pass the ATS result to AI review
      await getResumeReview(selectedResumeText, atsResult);
    } catch (err) {
      console.error("Analysis failed:", err);
      toast.error("Failed to complete analysis. Please try again.");
    } finally {
      setIsRunningFullAnalysis(false);
    }
  };

  if (resumesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" message="Loading resumes..." />
      </div>
    );
  }

  const isProcessing = isLoading || isAnalyzing || isRunningFullAnalysis;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Resume Review</h1>
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
          Select Resume
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedResumeId}
            onChange={(e) => handleResumeSelect(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a resume...</option>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.title} {resume.isDefault ? "(Default)" : ""}
              </option>
            ))}
          </select>
          <button
            onClick={handleAnalyze}
            disabled={!selectedResumeId || isProcessing}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Analyze Resume"}
          </button>
          {reviewResult && (
            <button
              onClick={resetReview}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Results
            </button>
          )}
        </div>

        {selectedResumeText && (
          <div className="mt-3 text-sm text-gray-500">
            Resume text loaded: {selectedResumeText.length} characters
            {selectedResumeText.length < 100 && (
              <span className="ml-2 text-red-500">
                (Too short - please add more content to your resume)
              </span>
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
      </div>

      {/* Results */}
      {reviewResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Overall Review
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {reviewResult.overallReview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-md font-semibold text-green-700 mb-3">
                ✅ Strengths
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {reviewResult.strengths.map((strength, i) => (
                  <li key={i} className="text-gray-700 text-sm">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-md font-semibold text-red-700 mb-3">
                ❌ Weaknesses
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {reviewResult.weaknesses.map((weakness, i) => (
                  <li key={i} className="text-gray-700 text-sm">
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-md font-semibold text-gray-900 mb-3">
                Recruiter Feedback
              </h3>
              <p className="text-gray-700 text-sm">
                {reviewResult.recruiterFeedback}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-md font-semibold text-gray-900 mb-3">
                Improved Summary
              </h3>
              <p className="text-gray-700 text-sm">
                {reviewResult.improvedSummary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-md font-semibold text-blue-700 mb-3">
                💡 Keyword Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {reviewResult.keywordSuggestions.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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
            </div>
          </div>
        </div>
      )}

      {!reviewResult && !isProcessing && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500">
            Select a resume and click "Analyze Resume" to get AI feedback
          </p>
          <p className="text-sm text-gray-400 mt-2">
            This will run ATS analysis first, then use AI to provide detailed
            feedback
          </p>
        </div>
      )}
    </div>
  );
}
