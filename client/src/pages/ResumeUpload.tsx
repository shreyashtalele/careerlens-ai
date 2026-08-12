import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUpload } from "@/hooks/useUpload";
import { toast } from "@/lib/toast";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJDInput, setShowJDInput] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadResult,
    analysisResult,
    analysisWithJDResult,
    isUploading,
    isAnalyzing,
    error,
    uploadResume,
    analyzeResume,
    analyzeWithJobDescription,
    reset,
  } = useUpload();

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    try {
      const result = await uploadResume(file);
      setExtractedText(result.text);
      toast.success("Resume uploaded successfully");
    } catch (err) {
      //error handeled by hook
    }
  };

  const handleAnalyze = async () => {
    if (!extractedText) {
      toast.error("No text to analyze. Please upload a resume first.");
      return;
    }

    try {
      if (showJDInput && jobDescription) {
        await analyzeWithJobDescription(extractedText, jobDescription);
      } else {
        await analyzeResume(extractedText);
      }
    } catch (err) {}
  };

  const handleReset = () => {
    reset();
    setFile(null);
    setExtractedText("");
    setJobDescription("");
    setShowJDInput(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Resume Analysis</h1>
        <button
          onClick={() => navigate("/resumes")}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Resumes
        </button>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Upload Resume
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isUploading}
            />
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            {uploadResult && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {uploadResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                ✅ Upload successful: {uploadResult.fileName}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Words: {uploadResult.wordCount} | Characters:{" "}
                {uploadResult.characterCount}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Extracted Text Preview */}
      {extractedText && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Extracted Text Preview
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {extractedText.slice(0, 500)}
              {extractedText.length > 500 && "..."}
            </p>
          </div>
        </div>
      )}

      {/* Analysis Section */}
      {extractedText && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ATS Analysis
          </h2>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={showJDInput}
                onChange={(e) => setShowJDInput(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              Include Job Description (for match analysis)
            </label>
          </div>

          {showJDInput && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paste the job description here..."
              />
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </button>

          {/* Analysis Results - Updated to match new API response */}
          {analysisResult && (
            <div className="mt-6 space-y-4">
              {/* Score */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-blue-700">
                    ATS Score: {analysisResult.score?.overallScore || 0}%
                  </span>
                  <span className="text-sm text-gray-600">
                    {(analysisResult.score?.overallScore || 0) >= 80
                      ? "✅ Good"
                      : (analysisResult.score?.overallScore || 0) >= 60
                        ? "⚠️ Needs Improvement"
                        : "❌ Needs Work"}
                  </span>
                </div>
              </div>

              {/* Skills */}
              {analysisResult.skills && analysisResult.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Detected Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.skills.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Sections */}
              {analysisResult.score?.missingSections &&
                analysisResult.score.missingSections.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Missing Sections
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.score.missingSections.map(
                        (section: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm"
                          >
                            {section}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* Recommendations */}
              {analysisResult.score?.recommendations &&
                analysisResult.score.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Recommendations
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.score.recommendations.map(
                        (rec: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600">
                            {rec}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
            </div>
          )}

          {/* Analysis with JD Results */}
          {analysisWithJDResult && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-purple-700">
                    Match:{" "}
                    {analysisWithJDResult.skillMatch?.matchPercentage || 0}%
                  </span>
                  <span className="text-sm text-gray-600">
                    {analysisWithJDResult.skillMatch?.matchPercentage >= 70
                      ? "✅ Strong Match"
                      : analysisWithJDResult.skillMatch?.matchPercentage >= 50
                        ? "⚠️ Partial Match"
                        : "❌ Weak Match"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {analysisWithJDResult.skillMatch?.matchedSkills &&
                  analysisWithJDResult.skillMatch.matchedSkills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-green-700 mb-2">
                        ✅ Matched Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisWithJDResult.skillMatch.matchedSkills.map(
                          (skill: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                {analysisWithJDResult.skillMatch?.missingSkills &&
                  analysisWithJDResult.skillMatch.missingSkills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-red-700 mb-2">
                        ❌ Missing Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisWithJDResult.skillMatch.missingSkills.map(
                          (skill: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Also show ATS score breakdown for context */}
              {analysisWithJDResult.score && (
                <div className="mt-4 text-sm text-gray-500">
                  ATS Score: {analysisWithJDResult.score.overallScore}%
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
