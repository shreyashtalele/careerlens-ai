import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Resumes from "@/pages/Resumes";
import ResumeDetail from "@/pages/ResumeDetail";
import ResumeUpload from "@/pages/ResumeUpload";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";

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
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/resumes/:id" element={<ResumeDetail />} />
              <Route path="/upload" element={<ResumeUpload />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
