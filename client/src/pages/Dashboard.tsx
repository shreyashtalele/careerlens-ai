import { useAuthStore } from "@/stores/authStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
} from "@/components/ui";
import { useResume } from "@/hooks/useResume";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { resumes } = useResume();
  const navigate = useNavigate();

  const totalResumes = resumes?.length || 0;
  const defaultResume = resumes?.find((r) => r.isDefault);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.fullName || user?.email}!
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your career
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={() => navigate("/upload")}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Resume
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Resumes
              </CardTitle>
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {totalResumes}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {totalResumes === 0
                ? "No resumes yet"
                : `${totalResumes} resume${totalResumes > 1 ? "s" : ""} saved`}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Default Resume
              </CardTitle>
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-gray-900 truncate">
              {defaultResume?.title || "Not set"}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {defaultResume
                ? "Default resume selected"
                : "Set a default resume"}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                AI Features
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-gray-900">Ready</div>
            <p className="text-sm text-gray-500 mt-1">
              Get AI-powered insights
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => navigate("/resumes")}
            >
              <span>View Resumes</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => navigate("/upload")}
            >
              <span>Upload New Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => navigate("/ai-review")}
            >
              <span>Get AI Review</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto"
              onClick={() => navigate("/interview")}
            >
              <span>Practice Interview</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity / Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-700">Account active</span>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-700">Resumes</span>
              </div>
              <Badge variant="default">{totalResumes} total</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-gray-700">AI Features</span>
              </div>
              <Badge variant="purple">Available</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
