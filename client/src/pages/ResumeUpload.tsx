import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUpload } from "@/hooks/useUpload";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { Upload, X, FileCheck, AlertCircle } from "lucide-react";
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
      return;
    }
    try {
      const result = await uploadResume(file);
      setExtractedText(result.text);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleAnalyze = async () => {
    if (!extractedText) {
      toast.error("No text to analyze. Please upload a resume first.");
      return;
    }

    // ✅ Check if JD is empty when toggle is on
    if (showJDInput && !jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    try {
      if (showJDInput && jobDescription) {
        await analyzeWithJobDescription(extractedText, jobDescription);
      } else {
        await analyzeResume(extractedText);
      }
    } catch (err) {
      console.error("Analysis failed:", err);
    }
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Analysis</h1>
          <p className="text-gray-500 mt-1">Upload and analyze your resume</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/resumes")}>
          ← Back to Resumes
        </Button>
      </div>

      {/* Upload Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upload Resume
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={isUploading}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={!file || isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                  {!isUploading && <Upload className="w-4 h-4 ml-2" />}
                </Button>
                {uploadResult && (
                  <Button variant="outline" onClick={handleReset}>
                    <X className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {uploadResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-green-800 font-medium">
                    Upload successful: {uploadResult.fileName}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Words: {uploadResult.wordCount} | Characters:{" "}
                    {uploadResult.characterCount}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Extracted Text Preview */}
      {extractedText && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Extracted Text Preview
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {extractedText.slice(0, 500)}
                {extractedText.length > 500 && "..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Section */}
      {extractedText && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ATS Analysis
            </h2>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showJDInput}
                  onChange={(e) => setShowJDInput(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                Include Job Description (for match analysis)
              </label>

              {showJDInput && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste the job description here..."
                  />
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                variant="success"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
              </Button>

              {/* Analysis Results */}
              {analysisResult && (
                <div className="mt-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-blue-700">
                        ATS Score: {analysisResult.score?.overallScore || 0}%
                      </span>
                      <Badge
                        variant={
                          (analysisResult.score?.overallScore || 0) >= 80
                            ? "success"
                            : (analysisResult.score?.overallScore || 0) >= 60
                              ? "warning"
                              : "danger"
                        }
                      >
                        {(analysisResult.score?.overallScore || 0) >= 80
                          ? "✅ Good"
                          : (analysisResult.score?.overallScore || 0) >= 60
                            ? "⚠️ Needs Improvement"
                            : "❌ Needs Work"}
                      </Badge>
                    </div>
                  </div>

                  {analysisResult.skills &&
                    analysisResult.skills.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Detected Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.skills.map((skill, i) => (
                            <Badge key={i} variant="default">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {analysisResult.score?.missingSections &&
                    analysisResult.score.missingSections.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Missing Sections
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.score.missingSections.map(
                            (section, i) => (
                              <Badge key={i} variant="warning">
                                {section}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  {analysisResult.score?.recommendations &&
                    analysisResult.score.recommendations.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Recommendations
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                          {analysisResult.score.recommendations.map(
                            (rec, i) => (
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

              {/* JD Match Results */}
              {analysisWithJDResult && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-purple-700">
                        Match:{" "}
                        {analysisWithJDResult.skillMatch?.matchPercentage || 0}%
                      </span>
                      <Badge
                        variant={
                          (analysisWithJDResult.skillMatch?.matchPercentage ||
                            0) >= 70
                            ? "success"
                            : (analysisWithJDResult.skillMatch
                                  ?.matchPercentage || 0) >= 50
                              ? "warning"
                              : "danger"
                        }
                      >
                        {(analysisWithJDResult.skillMatch?.matchPercentage ||
                          0) >= 70
                          ? "✅ Strong Match"
                          : (analysisWithJDResult.skillMatch?.matchPercentage ||
                                0) >= 50
                            ? "⚠️ Partial Match"
                            : "❌ Weak Match"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {analysisWithJDResult.skillMatch?.matchedSkills &&
                      analysisWithJDResult.skillMatch.matchedSkills.length >
                        0 && (
                        <div>
                          <h3 className="text-sm font-medium text-green-700 mb-2">
                            ✅ Matched Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {analysisWithJDResult.skillMatch.matchedSkills.map(
                              (skill, i) => (
                                <Badge key={i} variant="success">
                                  {skill}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    {analysisWithJDResult.skillMatch?.missingSkills &&
                      analysisWithJDResult.skillMatch.missingSkills.length >
                        0 && (
                        <div>
                          <h3 className="text-sm font-medium text-red-700 mb-2">
                            ❌ Missing Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {analysisWithJDResult.skillMatch.missingSkills.map(
                              (skill, i) => (
                                <Badge key={i} variant="danger">
                                  {skill}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
