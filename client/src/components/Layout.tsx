import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

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
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold text-blue-600">
                CareerLens AI
              </span>
              <Link
                to="/dashboard"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Profile
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
