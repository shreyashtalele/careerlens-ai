import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { MobileNav } from "./layout/MobileNav";

export function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="text-xl font-bold text-blue-600 flex-shrink-0"
            >
              CareerLens AI
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to="/resumes"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Resumes
              </Link>
              <Link
                to="/upload"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Upload
              </Link>
              <Link
                to="/ai-review"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                AI Review
              </Link>
              <Link
                to="/interview"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Interview
              </Link>
              <Link
                to="/profile"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
