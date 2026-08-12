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
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/Animated";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { resumes } = useResume();
  const navigate = useNavigate();

  const totalResumes = resumes?.length || 0;
  const defaultResume = resumes?.find((r) => r.isDefault);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.fullName || user?.email || "User"}!
            </h1>
            <p className="text-gray-500 mt-1">
              Here's what's happening with your career
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/upload")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Resume
          </Button>
        </div>
      </FadeIn>

      {/* Stats Grid with Stagger */}
      <StaggerChildren>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Resumes */}
          <motion.div variants={StaggerItem}>
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
          </motion.div>

          {/* Default Resume */}
          <motion.div variants={StaggerItem}>
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
          </motion.div>

          {/* AI Features */}
          <motion.div variants={StaggerItem}>
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
          </motion.div>
        </div>
      </StaggerChildren>

      {/* Quick Actions */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "View Resumes", icon: FileText, path: "/resumes" },
                { label: "Upload New Resume", icon: Upload, path: "/upload" },
                { label: "Get AI Review", icon: Sparkles, path: "/ai-review" },
                {
                  label: "Practice Interview",
                  icon: TrendingUp,
                  path: "/interview",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="flex items-center justify-between p-4 h-auto w-full"
                    onClick={() => navigate(item.path)}
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Status Section */}
      <FadeIn delay={0.3}>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-700">Account active</span>
                </div>
                <Badge variant="success">Verified</Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-gray-700">Resumes</span>
                </div>
                <Badge variant="default">{totalResumes} total</Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-gray-700">AI Features</span>
                </div>
                <Badge variant="purple">Available</Badge>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
