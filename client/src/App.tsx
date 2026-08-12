import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";
import { PageLoading } from "@/components/comman/LoadingSpinner";
import { PageTransition } from "@/components/PageTransition";

// Lazy load pages
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const Resumes = lazy(() => import("@/pages/Resumes"));
const ResumeDetail = lazy(() => import("@/pages/ResumeDetail"));
const ResumeUpload = lazy(() => import("@/pages/ResumeUpload"));
const AIReview = lazy(() => import("@/pages/AIReview"));
const Interview = lazy(() => import("@/pages/Interview"));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "12px 16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
            duration: 3000,
          }}
        />
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={
                    <PageTransition>
                      <Dashboard />
                    </PageTransition>
                  }
                />
                <Route
                  path="/resumes"
                  element={
                    <PageTransition>
                      <Resumes />
                    </PageTransition>
                  }
                />
                <Route
                  path="/resumes/:id"
                  element={
                    <PageTransition>
                      <ResumeDetail />
                    </PageTransition>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <PageTransition>
                      <ResumeUpload />
                    </PageTransition>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PageTransition>
                      <Profile />
                    </PageTransition>
                  }
                />
                <Route
                  path="/ai-review"
                  element={
                    <PageTransition>
                      <AIReview />
                    </PageTransition>
                  }
                />
                <Route
                  path="/interview"
                  element={
                    <PageTransition>
                      <Interview />
                    </PageTransition>
                  }
                />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
